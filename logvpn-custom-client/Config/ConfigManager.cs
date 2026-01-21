using System;
using System.IO;
using Newtonsoft.Json;

namespace LogVPN.Config
{
    /// <summary>
    /// 配置管理器
    /// 负责读写客户端配置文件
    /// </summary>
    public static class ConfigManager
    {
        private static readonly string ConfigPath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
            "LogVPN",
            "config.json"
        );

        static ConfigManager()
        {
            // 确保配置目录存在
            var configDir = Path.GetDirectoryName(ConfigPath);
            if (!Directory.Exists(configDir))
            {
                Directory.CreateDirectory(configDir);
            }
        }

        /// <summary>
        /// 加载配置
        /// </summary>
        public static ClientConfig LoadConfig()
        {
            try
            {
                if (!File.Exists(ConfigPath))
                {
                    return new ClientConfig();
                }

                var json = File.ReadAllText(ConfigPath);
                return JsonConvert.DeserializeObject<ClientConfig>(json) ?? new ClientConfig();
            }
            catch
            {
                return new ClientConfig();
            }
        }

        /// <summary>
        /// 保存配置
        /// </summary>
        public static void SaveConfig(ClientConfig config)
        {
            try
            {
                var json = JsonConvert.SerializeObject(config, Formatting.Indented);
                File.WriteAllText(ConfigPath, json);
            }
            catch (Exception ex)
            {
                throw new Exception($"保存配置失败: {ex.Message}");
            }
        }

        /// <summary>
        /// 删除配置
        /// </summary>
        public static void DeleteConfig()
        {
            try
            {
                if (File.Exists(ConfigPath))
                {
                    File.Delete(ConfigPath);
                }
            }
            catch { }
        }
    }

    /// <summary>
    /// 客户端配置类
    /// </summary>
    public class ClientConfig
    {
        [JsonProperty("apiBaseUrl")]
        public string ApiBaseUrl { get; set; } = "https://dj.siumingho.dpdns.org";

        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }

        [JsonProperty("refreshToken")]
        public string RefreshToken { get; set; }

        [JsonProperty("tokenExpiryTime")]
        public DateTime TokenExpiryTime { get; set; }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("rememberPassword")]
        public bool RememberPassword { get; set; }

        [JsonProperty("autoLogin")]
        public bool AutoLogin { get; set; }

        [JsonProperty("autoUpdateSubscription")]
        public bool AutoUpdateSubscription { get; set; } = true;

        [JsonProperty("subscriptionUpdateInterval")]
        public int SubscriptionUpdateInterval { get; set; } = 3600; // 秒

        [JsonProperty("autoReportTraffic")]
        public bool AutoReportTraffic { get; set; } = true;

        [JsonProperty("trafficReportInterval")]
        public int TrafficReportInterval { get; set; } = 300; // 秒

        [JsonProperty("theme")]
        public string Theme { get; set; } = "dark"; // dark, light

        [JsonProperty("primaryColor")]
        public string PrimaryColor { get; set; } = "#9C27B0"; // 紫色

        [JsonProperty("language")]
        public string Language { get; set; } = "zh-CN";

        [JsonProperty("autoStartup")]
        public bool AutoStartup { get; set; }

        [JsonProperty("minimizeToTray")]
        public bool MinimizeToTray { get; set; } = true;

        [JsonProperty("lastSelectedNodeId")]
        public string LastSelectedNodeId { get; set; }

        [JsonProperty("favoriteNodes")]
        public string[] FavoriteNodes { get; set; } = new string[0];

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [JsonProperty("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
