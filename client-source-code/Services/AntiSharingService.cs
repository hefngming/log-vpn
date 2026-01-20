using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

namespace LogVPN.Services
{
    /// <summary>
    /// 防共享服务
    /// 确保一个账号同时只能在一台设备上登录
    /// </summary>
    public class AntiSharingService
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        private const string API_BASE_URL = "https://dj.siumingho.dpdns.org/api/trpc";
        
        /// <summary>
        /// 检查设备是否被允许登录
        /// </summary>
        /// <param name="token">用户登录令牌</param>
        /// <param name="deviceFingerprint">设备指纹</param>
        /// <returns>是否允许登录</returns>
        public static async Task<DeviceCheckResult> CheckDeviceAsync(string token, string deviceFingerprint)
        {
            try
            {
                var request = new
                {
                    deviceFingerprint = deviceFingerprint
                };
                
                var json = JsonConvert.SerializeObject(request);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                
                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
                
                var response = await _httpClient.PostAsync($"{API_BASE_URL}/device.check", content);
                var responseText = await response.Content.ReadAsStringAsync();
                
                if (response.IsSuccessStatusCode)
                {
                    var result = JsonConvert.DeserializeObject<DeviceCheckResponse>(responseText);
                    
                    return new DeviceCheckResult
                    {
                        IsAllowed = result.result.data.allowed,
                        Message = result.result.data.message,
                        NeedRelogin = result.result.data.needRelogin
                    };
                }
                else
                {
                    return new DeviceCheckResult
                    {
                        IsAllowed = false,
                        Message = "设备验证失败，请重新登录",
                        NeedRelogin = true
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"设备检查失败: {ex.Message}");
                return new DeviceCheckResult
                {
                    IsAllowed = false,
                    Message = "网络连接失败，请检查网络设置",
                    NeedRelogin = false
                };
            }
        }
        
        /// <summary>
        /// 绑定设备到用户账号
        /// </summary>
        /// <param name="token">用户登录令牌</param>
        /// <param name="deviceFingerprint">设备指纹</param>
        /// <returns>是否绑定成功</returns>
        public static async Task<bool> BindDeviceAsync(string token, string deviceFingerprint)
        {
            try
            {
                var request = new
                {
                    deviceFingerprint = deviceFingerprint
                };
                
                var json = JsonConvert.SerializeObject(request);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                
                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
                
                var response = await _httpClient.PostAsync($"{API_BASE_URL}/device.bind", content);
                
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"设备绑定失败: {ex.Message}");
                return false;
            }
        }
        
        /// <summary>
        /// 解绑设备
        /// </summary>
        /// <param name="token">用户登录令牌</param>
        /// <returns>是否解绑成功</returns>
        public static async Task<bool> UnbindDeviceAsync(string token)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
                
                var response = await _httpClient.PostAsync($"{API_BASE_URL}/device.unbind", null);
                
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"设备解绑失败: {ex.Message}");
                return false;
            }
        }
    }
    
    /// <summary>
    /// 设备检查结果
    /// </summary>
    public class DeviceCheckResult
    {
        public bool IsAllowed { get; set; }
        public string Message { get; set; }
        public bool NeedRelogin { get; set; }
    }
    
    /// <summary>
    /// API 响应模型
    /// </summary>
    internal class DeviceCheckResponse
    {
        public DeviceCheckResultData result { get; set; }
    }
    
    internal class DeviceCheckResultData
    {
        public DeviceCheckData data { get; set; }
    }
    
    internal class DeviceCheckData
    {
        public bool allowed { get; set; }
        public string message { get; set; }
        public bool needRelogin { get; set; }
    }
}
