using System;
using System.Windows;
using System.IO;
using System.Threading.Tasks;
using LogVPN.Services;

namespace LogVPN.UI
{
    /// <summary>
    /// 更新提示窗口代码后台
    /// </summary>
    public partial class UpdateNotificationWindow : Window
    {
        private AutoUpdateService _updateService;
        private VersionInfo _versionInfo;
        private string _downloadPath;

        public UpdateNotificationWindow(VersionInfo versionInfo)
        {
            InitializeComponent();
            _versionInfo = versionInfo;
            _updateService = new AutoUpdateService();
            _downloadPath = Path.Combine(Path.GetTempPath(), "LogVPN_Updates");

            InitializeUI();
            SubscribeToEvents();
        }

        /// <summary>
        /// 初始化界面
        /// </summary>
        private void InitializeUI()
        {
            if (_versionInfo != null)
            {
                NewVersionText.Text = $"新版本: {_versionInfo.Version}";
                FileSizeText.Text = $"文件大小: {_versionInfo.SizeMb} MB";
                ReleaseDateText.Text = $"发布时间: {_versionInfo.ReleaseDate}";
                ReleaseNotesBox.Text = _versionInfo.ReleaseNotes ?? "暂无更新说明";
            }

            // 创建下载目录
            if (!Directory.Exists(_downloadPath))
            {
                Directory.CreateDirectory(_downloadPath);
            }
        }

        /// <summary>
        /// 订阅事件
        /// </summary>
        private void SubscribeToEvents()
        {
            _updateService.UpdateDownloadProgress += UpdateService_UpdateDownloadProgress;
            _updateService.UpdateCheckFailed += UpdateService_UpdateCheckFailed;
        }

        /// <summary>
        /// 立即更新按钮点击事件
        /// </summary>
        private async void UpdateButton_Click(object sender, RoutedEventArgs e)
        {
            UpdateButton.IsEnabled = false;
            LaterButton.IsEnabled = false;
            ProgressPanel.Visibility = Visibility.Visible;

            try
            {
                // 下载更新
                var downloadSuccess = await _updateService.DownloadUpdateAsync(
                    _versionInfo.Filename,
                    _downloadPath);

                if (!downloadSuccess)
                {
                    MessageBox.Show("下载更新失败，请稍后重试", "更新失败", MessageBoxButton.OK, MessageBoxImage.Error);
                    UpdateButton.IsEnabled = true;
                    LaterButton.IsEnabled = true;
                    ProgressPanel.Visibility = Visibility.Collapsed;
                    return;
                }

                // 验证文件完整性
                var installerPath = Path.Combine(_downloadPath, _versionInfo.Filename);
                var verifySuccess = _updateService.VerifyDownloadedFile(installerPath, _versionInfo.Md5);

                if (!verifySuccess)
                {
                    MessageBox.Show("文件验证失败，可能已损坏", "更新失败", MessageBoxButton.OK, MessageBoxImage.Error);
                    UpdateButton.IsEnabled = true;
                    LaterButton.IsEnabled = true;
                    ProgressPanel.Visibility = Visibility.Collapsed;
                    return;
                }

                // 安装更新
                var installSuccess = _updateService.InstallUpdate(installerPath);

                if (installSuccess)
                {
                    MessageBox.Show("更新安装成功，应用将在重启后生效", "更新成功", MessageBoxButton.OK, MessageBoxImage.Information);
                    this.Close();
                }
                else
                {
                    MessageBox.Show("安装更新失败，请手动安装", "更新失败", MessageBoxButton.OK, MessageBoxImage.Error);
                    UpdateButton.IsEnabled = true;
                    LaterButton.IsEnabled = true;
                    ProgressPanel.Visibility = Visibility.Collapsed;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"更新过程出错: {ex.Message}", "错误", MessageBoxButton.OK, MessageBoxImage.Error);
                UpdateButton.IsEnabled = true;
                LaterButton.IsEnabled = true;
                ProgressPanel.Visibility = Visibility.Collapsed;
            }
        }

        /// <summary>
        /// 稍后更新按钮点击事件
        /// </summary>
        private void LaterButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        /// <summary>
        /// 下载进度事件处理
        /// </summary>
        private void UpdateService_UpdateDownloadProgress(object sender, UpdateDownloadEventArgs e)
        {
            Dispatcher.Invoke(() =>
            {
                DownloadProgress.Value = e.ProgressPercentage;
                ProgressText.Text = $"{e.ProgressPercentage}% ({FormatBytes(e.DownloadedBytes)} / {FormatBytes(e.TotalBytes)})";
            });
        }

        /// <summary>
        /// 更新检查失败事件处理
        /// </summary>
        private void UpdateService_UpdateCheckFailed(object sender, UpdateErrorEventArgs e)
        {
            Dispatcher.Invoke(() =>
            {
                MessageBox.Show($"更新出错: {e.ErrorMessage}", "错误", MessageBoxButton.OK, MessageBoxImage.Error);
                UpdateButton.IsEnabled = true;
                LaterButton.IsEnabled = true;
                ProgressPanel.Visibility = Visibility.Collapsed;
            });
        }

        /// <summary>
        /// 格式化字节大小
        /// </summary>
        private string FormatBytes(long bytes)
        {
            string[] sizes = { "B", "KB", "MB", "GB", "TB" };
            double len = bytes;
            int order = 0;

            while (len >= 1024 && order < sizes.Length - 1)
            {
                order++;
                len = len / 1024;
            }

            return $"{len:0.##} {sizes[order]}";
        }
    }
}
