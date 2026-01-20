using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace LogVPN.Services
{
    /// <summary>
    /// LogVPN API 客户端
    /// 处理所有与后端 API 的通信
    /// </summary>
    public class LogVPNApiClient
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        private const string API_BASE_URL = "https://dj.siumingho.dpdns.org/api/trpc";
        private const string OAUTH_URL = "https://dj.siumingho.dpdns.org/api/oauth/login";
        
        private static string _authToken = null;
        
        /// <summary>
        /// 设置认证令牌
        /// </summary>
        public static void SetAuthToken(string token)
        {
            _authToken = token;
            _httpClient.DefaultRequestHeaders.Clear();
            if (!string.IsNullOrEmpty(token))
            {
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
            }
        }
        
        /// <summary>
        /// 获取 OAuth 登录 URL
        /// </summary>
        public static string GetOAuthLoginUrl()
        {
            return OAUTH_URL;
        }
        
        /// <summary>
        /// 获取当前用户信息
        /// </summary>
        public static async Task<UserInfo> GetCurrentUserAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync($"{API_BASE_URL}/auth.me");
                var responseText = await response.Content.ReadAsStringAsync();
                
                if (response.IsSuccessStatusCode)
                {
                    var result = JsonConvert.DeserializeObject<UserResponse>(responseText);
                    return result.result.data;
                }
                
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"获取用户信息失败: {ex.Message}");
                return null;
            }
        }
        
        /// <summary>
        /// 获取加密的节点列表
        /// </summary>
        public static async Task<List<VpnNode>> GetEncryptedNodesAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync($"{API_BASE_URL}/nodes.getEncrypted");
                var responseText = await response.Content.ReadAsStringAsync();
                
                if (response.IsSuccessStatusCode)
                {
                    var result = JsonConvert.DeserializeObject<NodesResponse>(responseText);
                    return DecryptNodes(result.result.data.encryptedData, result.result.data.iv);
                }
                
                return new List<VpnNode>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"获取节点列表失败: {ex.Message}");
                return new List<VpnNode>();
            }
        }
        
        /// <summary>
        /// 解密节点数据
        /// </summary>
        private static List<VpnNode> DecryptNodes(string encryptedData, string iv)
        {
            try
            {
                // 使用 AES-256-CBC 解密
                var decrypted = AesDecrypt(encryptedData, "your-32-byte-encryption-key-here", iv);
                return JsonConvert.DeserializeObject<List<VpnNode>>(decrypted);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"解密节点数据失败: {ex.Message}");
                return new List<VpnNode>();
            }
        }
        
        /// <summary>
        /// AES 解密
        /// </summary>
        private static string AesDecrypt(string encryptedText, string key, string iv)
        {
            using (var aes = System.Security.Cryptography.Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = Convert.FromBase64String(iv);
                aes.Mode = System.Security.Cryptography.CipherMode.CBC;
                aes.Padding = System.Security.Cryptography.PaddingMode.PKCS7;
                
                using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
                {
                    var encryptedBytes = Convert.FromBase64String(encryptedText);
                    var decryptedBytes = decryptor.TransformFinalBlock(encryptedBytes, 0, encryptedBytes.Length);
                    return Encoding.UTF8.GetString(decryptedBytes);
                }
            }
        }
        
        /// <summary>
        /// 上报流量使用情况
        /// </summary>
        public static async Task<bool> ReportTrafficAsync(long uploadBytes, long downloadBytes)
        {
            try
            {
                var request = new
                {
                    uploadBytes = uploadBytes,
                    downloadBytes = downloadBytes,
                    timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
                };
                
                var json = JsonConvert.SerializeObject(request);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                
                var response = await _httpClient.PostAsync($"{API_BASE_URL}/traffic.log", content);
                
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"上报流量失败: {ex.Message}");
                return false;
            }
        }
        
        /// <summary>
        /// 获取用户订阅信息
        /// </summary>
        public static async Task<SubscriptionInfo> GetSubscriptionAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync($"{API_BASE_URL}/subscription.getCurrent");
                var responseText = await response.Content.ReadAsStringAsync();
                
                if (response.IsSuccessStatusCode)
                {
                    var result = JsonConvert.DeserializeObject<SubscriptionResponse>(responseText);
                    return result.result.data;
                }
                
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"获取订阅信息失败: {ex.Message}");
                return null;
            }
        }
    }
    
    /// <summary>
    /// 用户信息
    /// </summary>
    public class UserInfo
    {
        public int id { get; set; }
        public string email { get; set; }
        public string role { get; set; }
    }
    
    /// <summary>
    /// VPN 节点
    /// </summary>
    public class VpnNode
    {
        public int id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public int port { get; set; }
        public string protocol { get; set; }
        public string uuid { get; set; }
        public string password { get; set; }
        public string encryption { get; set; }
        public string network { get; set; }
        public string security { get; set; }
        public string sni { get; set; }
        public string path { get; set; }
    }
    
    /// <summary>
    /// 订阅信息
    /// </summary>
    public class SubscriptionInfo
    {
        public string planName { get; set; }
        public long totalTraffic { get; set; }
        public long usedTraffic { get; set; }
        public long dailyLimit { get; set; }
        public long dailyUsed { get; set; }
        public DateTime? endDate { get; set; }
        public bool isActive { get; set; }
    }
    
    /// <summary>
    /// API 响应模型
    /// </summary>
    internal class UserResponse
    {
        public UserResultData result { get; set; }
    }
    
    internal class UserResultData
    {
        public UserInfo data { get; set; }
    }
    
    internal class NodesResponse
    {
        public NodesResultData result { get; set; }
    }
    
    internal class NodesResultData
    {
        public EncryptedNodesData data { get; set; }
    }
    
    internal class EncryptedNodesData
    {
        public string encryptedData { get; set; }
        public string iv { get; set; }
    }
    
    internal class SubscriptionResponse
    {
        public SubscriptionResultData result { get; set; }
    }
    
    internal class SubscriptionResultData
    {
        public SubscriptionInfo data { get; set; }
    }
}
