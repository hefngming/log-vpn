using System;
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using System.Windows;
using Newtonsoft.Json;

namespace LogVPN.Services
{
    /// <summary>
    /// 自动更新服务
    /// 检查并下载新版本的客户端程序
    /// </summary>
    public class AutoUpdateService
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        private const string UPDATE_CHECK_URL = "https://dj.siumingho.dpdns.org/api/trpc/system.getLatestVersion";
        private const string DOWNLOAD_BASE_URL = "https://dj.siumingho.dpdns.org/downloads";
        
        /// <summary>
        /// 检查更新
        /// </summary>
        /// <returns>更新信息</returns>
        public static async Task<UpdateInfo> CheckForUpdatesAsync()
        {
            try
            {
                var currentVersion = GetCurrentVersion();
                
                var response = await _httpClient.GetAsync(UPDATE_CHECK_URL);
                var responseText = await response.Content.ReadAsStringAsync();
                
                if (response.IsSuccessStatusCode)
                {
                    var result = JsonConvert.DeserializeObject<VersionResponse>(responseText);
                    var latestVersion = result.result.data.version;
                    
                    if (IsNewerVersion(currentVersion, latestVersion))
                    {
                        return new UpdateInfo
                        {
                            HasUpdate = true,
                            CurrentVersion = currentVersion,
                            LatestVersion = latestVersion,
                            DownloadUrl = $"{DOWNLOAD_BASE_URL}/{result.result.data.fileName}",
                            ReleaseNotes = result.result.data.releaseNotes,
                            FileSize = result.result.data.fileSize,
                            PublishDate = result.result.data.publishDate
                        };
                    }
                }
                
                return new UpdateInfo
                {
                    HasUpdate = false,
                    CurrentVersion = currentVersion,
                    LatestVersion = currentVersion
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"检查更新失败: {ex.Message}");
                return new UpdateInfo
                {
                    HasUpdate = false,
                    CurrentVersion = GetCurrentVersion(),
                    ErrorMessage = ex.Message
                };
            }
        }
        
        /// <summary>
        /// 下载并安装更新
        /// </summary>
        /// <param name="downloadUrl">下载地址</param>
        /// <param name="progress">下载进度回调</param>
        /// <returns>是否成功</returns>
        public static async Task<bool> DownloadAndInstallAsync(string downloadUrl, IProgress<int> progress = null)
        {
            try
            {
                var tempPath = Path.Combine(Path.GetTempPath(), "LogVPN_Update.exe");
                
                // 下载文件
                using (var response = await _httpClient.GetAsync(downloadUrl, HttpCompletionOption.ResponseHeadersRead))
                {
                    response.EnsureSuccessStatusCode();
                    
                    var totalBytes = response.Content.Headers.ContentLength ?? -1L;
                    var canReportProgress = totalBytes != -1 && progress != null;
                    
                    using (var contentStream = await response.Content.ReadAsStreamAsync())
                    using (var fileStream = new FileStream(tempPath, FileMode.Create, FileAccess.Write, FileShare.None, 8192, true))
                    {
                        var totalRead = 0L;
                        var buffer = new byte[8192];
                        var isMoreToRead = true;
                        
                        do
                        {
                            var read = await contentStream.ReadAsync(buffer, 0, buffer.Length);
                            if (read == 0)
                            {
                                isMoreToRead = false;
                            }
                            else
                            {
                                await fileStream.WriteAsync(buffer, 0, read);
                                
                                totalRead += read;
                                
                                if (canReportProgress)
                                {
                                    var progressPercentage = (int)((totalRead * 100) / totalBytes);
                                    progress.Report(progressPercentage);
                                }
                            }
                        }
                        while (isMoreToRead);
                    }
                }
                
                // 启动安装程序
                var startInfo = new ProcessStartInfo
                {
                    FileName = tempPath,
                    UseShellExecute = true,
                    Verb = "runas" // 请求管理员权限
                };
                
                Process.Start(startInfo);
                
                // 退出当前程序
                Application.Current.Shutdown();
                
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"下载更新失败: {ex.Message}");
                MessageBox.Show($"下载更新失败: {ex.Message}", "更新失败", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }
        }
        
        /// <summary>
        /// 获取当前版本号
        /// </summary>
        private static string GetCurrentVersion()
        {
            var assembly = Assembly.GetExecutingAssembly();
            var version = assembly.GetName().Version;
            return $"{version.Major}.{version.Minor}.{version.Build}";
        }
        
        /// <summary>
        /// 比较版本号
        /// </summary>
        private static bool IsNewerVersion(string currentVersion, string latestVersion)
        {
            try
            {
                var current = new Version(currentVersion);
                var latest = new Version(latestVersion);
                
                return latest > current;
            }
            catch
            {
                return false;
            }
        }
    }
    
    /// <summary>
    /// 更新信息
    /// </summary>
    public class UpdateInfo
    {
        public bool HasUpdate { get; set; }
        public string CurrentVersion { get; set; }
        public string LatestVersion { get; set; }
        public string DownloadUrl { get; set; }
        public string ReleaseNotes { get; set; }
        public long FileSize { get; set; }
        public DateTime PublishDate { get; set; }
        public string ErrorMessage { get; set; }
    }
    
    /// <summary>
    /// API 响应模型
    /// </summary>
    internal class VersionResponse
    {
        public VersionResultData result { get; set; }
    }
    
    internal class VersionResultData
    {
        public VersionData data { get; set; }
    }
    
    internal class VersionData
    {
        public string version { get; set; }
        public string fileName { get; set; }
        public string releaseNotes { get; set; }
        public long fileSize { get; set; }
        public DateTime publishDate { get; set; }
    }
}
