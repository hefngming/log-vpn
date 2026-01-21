using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Diagnostics;

namespace LogVPN.Services
{
    /// <summary>
    /// 自动更新检查服务
    /// 负责检查新版本、下载和安装更新
    /// </summary>
    public class AutoUpdateService
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        private const string VERSION_CHECK_URL = "https://dj.siumingho.dpdns.org/downloads/version.json";
        private const string DOWNLOAD_URL_BASE = "https://dj.siumingho.dpdns.org/downloads/";
        private const string CURRENT_VERSION = "1.0.0";
        
        public event EventHandler<UpdateCheckEventArgs> UpdateCheckCompleted;
        public event EventHandler<UpdateDownloadEventArgs> UpdateDownloadProgress;
        public event EventHandler<UpdateErrorEventArgs> UpdateCheckFailed;

        /// <summary>
        /// 检查是否有新版本
        /// </summary>
        public async Task<bool> CheckForUpdatesAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync(VERSION_CHECK_URL);
                
                if (!response.IsSuccessStatusCode)
                {
                    RaiseUpdateCheckFailed("无法连接到更新服务器");
                    return false;
                }

                var content = await response.Content.ReadAsStringAsync();
                var versionInfo = JsonSerializer.Deserialize<VersionInfo>(content);

                if (versionInfo == null)
                {
                    RaiseUpdateCheckFailed("版本信息格式错误");
                    return false;
                }

                var hasUpdate = CompareVersions(versionInfo.Version, CURRENT_VERSION) > 0;
                
                RaiseUpdateCheckCompleted(versionInfo, hasUpdate);
                
                return hasUpdate;
            }
            catch (Exception ex)
            {
                RaiseUpdateCheckFailed($"检查更新失败: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// 下载更新文件
        /// </summary>
        public async Task<bool> DownloadUpdateAsync(string filename, string destinationPath)
        {
            try
            {
                var downloadUrl = DOWNLOAD_URL_BASE + filename;
                var downloadPath = Path.Combine(destinationPath, filename);

                using (var response = await _httpClient.GetAsync(downloadUrl, HttpCompletionOption.ResponseHeadersRead))
                {
                    if (!response.IsSuccessStatusCode)
                    {
                        RaiseUpdateCheckFailed($"下载失败: HTTP {response.StatusCode}");
                        return false;
                    }

                    var totalBytes = response.Content.Headers.ContentLength ?? -1L;
                    var canReportProgress = totalBytes != -1;

                    using (var contentStream = await response.Content.ReadAsStreamAsync())
                    using (var fileStream = new FileStream(downloadPath, FileMode.Create, FileAccess.Write, FileShare.None, 8192, true))
                    {
                        var totalRead = 0L;
                        var buffer = new byte[8192];
                        int read;

                        while ((read = await contentStream.ReadAsync(buffer, 0, buffer.Length)) != 0)
                        {
                            await fileStream.WriteAsync(buffer, 0, read);
                            totalRead += read;

                            if (canReportProgress)
                            {
                                var progressPercentage = (int)((totalRead * 100) / totalBytes);
                                RaiseUpdateDownloadProgress(progressPercentage, totalRead, totalBytes);
                            }
                        }
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                RaiseUpdateCheckFailed($"下载更新失败: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// 验证下载文件的完整性
        /// </summary>
        public bool VerifyDownloadedFile(string filePath, string expectedMd5)
        {
            try
            {
                var actualMd5 = CalculateMd5(filePath);
                return actualMd5.Equals(expectedMd5, StringComparison.OrdinalIgnoreCase);
            }
            catch (Exception ex)
            {
                RaiseUpdateCheckFailed($"验证文件失败: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// 安装更新
        /// </summary>
        public bool InstallUpdate(string installerPath)
        {
            try
            {
                if (!File.Exists(installerPath))
                {
                    RaiseUpdateCheckFailed("安装程序文件不存在");
                    return false;
                }

                // 启动安装程序
                var processInfo = new ProcessStartInfo
                {
                    FileName = installerPath,
                    Arguments = "/S",  // 静默安装
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true
                };

                using (var process = Process.Start(processInfo))
                {
                    process?.WaitForExit();
                    return process?.ExitCode == 0;
                }
            }
            catch (Exception ex)
            {
                RaiseUpdateCheckFailed($"安装更新失败: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// 比较版本号
        /// </summary>
        /// <returns>
        /// 返回值：
        /// > 0：newVersion 更新
        /// = 0：版本相同
        /// < 0：newVersion 更旧
        /// </returns>
        private int CompareVersions(string newVersion, string currentVersion)
        {
            var newParts = newVersion.Split('.');
            var currentParts = currentVersion.Split('.');

            var maxLength = Math.Max(newParts.Length, currentParts.Length);

            for (int i = 0; i < maxLength; i++)
            {
                var newPart = i < newParts.Length && int.TryParse(newParts[i], out var n) ? n : 0;
                var currentPart = i < currentParts.Length && int.TryParse(currentParts[i], out var c) ? c : 0;

                if (newPart > currentPart) return 1;
                if (newPart < currentPart) return -1;
            }

            return 0;
        }

        /// <summary>
        /// 计算文件 MD5 校验和
        /// </summary>
        private string CalculateMd5(string filePath)
        {
            using (var md5 = System.Security.Cryptography.MD5.Create())
            using (var stream = File.OpenRead(filePath))
            {
                var hash = md5.ComputeHash(stream);
                return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
            }
        }

        // 事件触发方法
        private void RaiseUpdateCheckCompleted(VersionInfo versionInfo, bool hasUpdate)
        {
            UpdateCheckCompleted?.Invoke(this, new UpdateCheckEventArgs
            {
                VersionInfo = versionInfo,
                HasUpdate = hasUpdate
            });
        }

        private void RaiseUpdateDownloadProgress(int percentage, long downloadedBytes, long totalBytes)
        {
            UpdateDownloadProgress?.Invoke(this, new UpdateDownloadEventArgs
            {
                ProgressPercentage = percentage,
                DownloadedBytes = downloadedBytes,
                TotalBytes = totalBytes
            });
        }

        private void RaiseUpdateCheckFailed(string errorMessage)
        {
            UpdateCheckFailed?.Invoke(this, new UpdateErrorEventArgs
            {
                ErrorMessage = errorMessage
            });
        }
    }

    /// <summary>
    /// 版本信息类
    /// </summary>
    public class VersionInfo
    {
        public string Version { get; set; }
        public string Filename { get; set; }
        public double SizeMb { get; set; }
        public string Md5 { get; set; }
        public string Sha256 { get; set; }
        public string DownloadUrl { get; set; }
        public string ReleaseNotes { get; set; }
        public string ReleaseDate { get; set; }
        public bool Required { get; set; }
    }

    /// <summary>
    /// 更新检查完成事件参数
    /// </summary>
    public class UpdateCheckEventArgs : EventArgs
    {
        public VersionInfo VersionInfo { get; set; }
        public bool HasUpdate { get; set; }
    }

    /// <summary>
    /// 更新下载进度事件参数
    /// </summary>
    public class UpdateDownloadEventArgs : EventArgs
    {
        public int ProgressPercentage { get; set; }
        public long DownloadedBytes { get; set; }
        public long TotalBytes { get; set; }
    }

    /// <summary>
    /// 更新错误事件参数
    /// </summary>
    public class UpdateErrorEventArgs : EventArgs
    {
        public string ErrorMessage { get; set; }
    }
}
