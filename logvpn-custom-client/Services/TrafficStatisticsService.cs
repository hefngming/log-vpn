using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace LogVPN.Services
{
    /// <summary>
    /// 流量统计服务
    /// 负责收集、统计和上报客户端的流量使用情况
    /// </summary>
    public class TrafficStatisticsService
    {
        private readonly string _apiBaseUrl;
        private readonly OAuthLoginService _loginService;
        private readonly HttpClient _httpClient;

        private long _uploadBytes = 0;
        private long _downloadBytes = 0;
        private DateTime _sessionStartTime;
        private string _currentNodeId;

        public event EventHandler<TrafficEventArgs> TrafficUpdated;
        public event EventHandler<TrafficEventArgs> TrafficReportFailed;

        public TrafficStatisticsService(string apiBaseUrl, OAuthLoginService loginService)
        {
            _apiBaseUrl = apiBaseUrl;
            _loginService = loginService;
            _httpClient = new HttpClient();
            _sessionStartTime = DateTime.UtcNow;
        }

        /// <summary>
        /// 更新流量数据
        /// </summary>
        public void UpdateTraffic(long uploadBytes, long downloadBytes)
        {
            _uploadBytes = uploadBytes;
            _downloadBytes = downloadBytes;

            TrafficUpdated?.Invoke(this, new TrafficEventArgs
            {
                UploadBytes = uploadBytes,
                DownloadBytes = downloadBytes,
                TotalBytes = uploadBytes + downloadBytes,
                UploadSpeed = CalculateSpeed(uploadBytes),
                DownloadSpeed = CalculateSpeed(downloadBytes),
                SessionDuration = DateTime.UtcNow - _sessionStartTime
            });
        }

        /// <summary>
        /// 设置当前连接的节点 ID
        /// </summary>
        public void SetCurrentNode(string nodeId)
        {
            _currentNodeId = nodeId;
        }

        /// <summary>
        /// 上报流量数据到服务器
        /// </summary>
        public async Task<bool> ReportTrafficAsync()
        {
            try
            {
                var token = await _loginService.GetValidAccessTokenAsync();
                if (string.IsNullOrEmpty(token))
                {
                    TrafficReportFailed?.Invoke(this, new TrafficEventArgs
                    {
                        Message = "未登录或令牌已过期"
                    });
                    return false;
                }

                _httpClient.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                var trafficReport = new
                {
                    nodeId = _currentNodeId,
                    uploadBytes = _uploadBytes,
                    downloadBytes = _downloadBytes,
                    totalBytes = _uploadBytes + _downloadBytes,
                    sessionDuration = (long)(DateTime.UtcNow - _sessionStartTime).TotalSeconds,
                    timestamp = DateTime.UtcNow.ToString("O"),
                    deviceId = DeviceFingerprintService.GetDeviceFingerprint()
                };

                var content = new StringContent(
                    JsonConvert.SerializeObject(trafficReport),
                    Encoding.UTF8,
                    "application/json"
                );

                var response = await _httpClient.PostAsync(
                    $"{_apiBaseUrl}/api/trpc/traffic.log",
                    content
                );

                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                else
                {
                    TrafficReportFailed?.Invoke(this, new TrafficEventArgs
                    {
                        Message = "流量上报失败"
                    });
                    return false;
                }
            }
            catch (Exception ex)
            {
                TrafficReportFailed?.Invoke(this, new TrafficEventArgs
                {
                    Message = $"流量上报异常: {ex.Message}"
                });
                return false;
            }
        }

        /// <summary>
        /// 获取流量统计信息
        /// </summary>
        public async Task<TrafficStats> GetTrafficStatsAsync()
        {
            try
            {
                var token = await _loginService.GetValidAccessTokenAsync();
                if (string.IsNullOrEmpty(token))
                    return null;

                _httpClient.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.GetAsync(
                    $"{_apiBaseUrl}/api/trpc/traffic.getStats"
                );

                var responseContent = await response.Content.ReadAsStringAsync();
                var statsResponse = JsonConvert.DeserializeObject<TrafficStatsResponse>(responseContent);

                return statsResponse?.Result?.Data;
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// 计算速度（字节/秒）
        /// </summary>
        private string CalculateSpeed(long bytes)
        {
            var seconds = (DateTime.UtcNow - _sessionStartTime).TotalSeconds;
            if (seconds <= 0) return "0 B/s";

            var speed = bytes / seconds;
            return FormatBytes(speed) + "/s";
        }

        /// <summary>
        /// 格式化字节数
        /// </summary>
        public static string FormatBytes(double bytes)
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

        /// <summary>
        /// 重置流量统计
        /// </summary>
        public void Reset()
        {
            _uploadBytes = 0;
            _downloadBytes = 0;
            _sessionStartTime = DateTime.UtcNow;
        }
    }

    // ========== 数据模型 ==========

    public class TrafficStatsResponse
    {
        [JsonProperty("result")]
        public TrafficStatsResult Result { get; set; }
    }

    public class TrafficStatsResult
    {
        [JsonProperty("data")]
        public TrafficStats Data { get; set; }

        [JsonProperty("error")]
        public ErrorInfo Error { get; set; }
    }

    public class TrafficStats
    {
        [JsonProperty("todayUsage")]
        public long TodayUsage { get; set; }

        [JsonProperty("monthlyUsage")]
        public long MonthlyUsage { get; set; }

        [JsonProperty("monthlyLimit")]
        public long MonthlyLimit { get; set; }

        [JsonProperty("dailyLimit")]
        public long DailyLimit { get; set; }

        [JsonProperty("remainingDaily")]
        public long RemainingDaily { get; set; }

        [JsonProperty("remainingMonthly")]
        public long RemainingMonthly { get; set; }

        [JsonProperty("resetTime")]
        public DateTime ResetTime { get; set; }

        [JsonProperty("lastReportTime")]
        public DateTime LastReportTime { get; set; }
    }

    public class TrafficEventArgs : EventArgs
    {
        public long UploadBytes { get; set; }
        public long DownloadBytes { get; set; }
        public long TotalBytes { get; set; }
        public string UploadSpeed { get; set; }
        public string DownloadSpeed { get; set; }
        public TimeSpan SessionDuration { get; set; }
        public string Message { get; set; }
    }
}
