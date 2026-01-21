using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace LogVPN.Services
{
    /// <summary>
    /// 自动订阅服务
    /// 负责自动获取、更新和管理订阅节点列表
    /// </summary>
    public class AutoSubscriptionService
    {
        private readonly string _apiBaseUrl;
        private readonly OAuthLoginService _loginService;
        private readonly HttpClient _httpClient;
        private List<NodeInfo> _nodeList;

        public event EventHandler<SubscriptionEventArgs> SubscriptionUpdated;
        public event EventHandler<SubscriptionEventArgs> SubscriptionFailed;

        public AutoSubscriptionService(string apiBaseUrl, OAuthLoginService loginService)
        {
            _apiBaseUrl = apiBaseUrl;
            _loginService = loginService;
            _httpClient = new HttpClient();
            _nodeList = new List<NodeInfo>();
        }

        /// <summary>
        /// 自动获取订阅（登录后自动调用）
        /// </summary>
        public async Task<bool> AutoFetchSubscriptionAsync()
        {
            try
            {
                var token = await _loginService.GetValidAccessTokenAsync();
                if (string.IsNullOrEmpty(token))
                {
                    SubscriptionFailed?.Invoke(this, new SubscriptionEventArgs
                    {
                        Message = "未登录或令牌已过期"
                    });
                    return false;
                }

                _httpClient.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                // 获取加密的节点列表
                var response = await _httpClient.GetAsync(
                    $"{_apiBaseUrl}/api/trpc/nodes.getEncrypted"
                );

                if (!response.IsSuccessStatusCode)
                {
                    SubscriptionFailed?.Invoke(this, new SubscriptionEventArgs
                    {
                        Message = "获取订阅失败"
                    });
                    return false;
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                var subscriptionResponse = JsonConvert.DeserializeObject<SubscriptionResponse>(responseContent);

                if (subscriptionResponse?.Result?.Data != null)
                {
                    // 解密节点数据
                    var decryptedNodes = DecryptNodeData(subscriptionResponse.Result.Data.EncryptedNodes);
                    _nodeList = decryptedNodes;

                    SubscriptionUpdated?.Invoke(this, new SubscriptionEventArgs
                    {
                        NodeCount = _nodeList.Count,
                        Message = $"成功获取 {_nodeList.Count} 个节点"
                    });

                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                SubscriptionFailed?.Invoke(this, new SubscriptionEventArgs
                {
                    Message = $"获取订阅异常: {ex.Message}"
                });
                return false;
            }
        }

        /// <summary>
        /// 手动更新订阅
        /// </summary>
        public async Task<bool> ManualUpdateSubscriptionAsync()
        {
            return await AutoFetchSubscriptionAsync();
        }

        /// <summary>
        /// 获取所有节点
        /// </summary>
        public List<NodeInfo> GetAllNodes()
        {
            return _nodeList ?? new List<NodeInfo>();
        }

        /// <summary>
        /// 按地区获取节点
        /// </summary>
        public List<NodeInfo> GetNodesByRegion(string region)
        {
            return _nodeList?
                .Where(n => n.Region.Equals(region, StringComparison.OrdinalIgnoreCase))
                .ToList() ?? new List<NodeInfo>();
        }

        /// <summary>
        /// 获取延迟最低的节点
        /// </summary>
        public NodeInfo GetLowestLatencyNode()
        {
            return _nodeList?.OrderBy(n => n.Latency).FirstOrDefault();
        }

        /// <summary>
        /// 获取推荐节点
        /// </summary>
        public NodeInfo GetRecommendedNode()
        {
            // 优先选择负载较低且延迟较低的节点
            return _nodeList?
                .Where(n => n.Load < 80)
                .OrderBy(n => n.Latency)
                .FirstOrDefault() ?? GetLowestLatencyNode();
        }

        /// <summary>
        /// 解密节点数据
        /// </summary>
        private List<NodeInfo> DecryptNodeData(string encryptedData)
        {
            try
            {
                // 使用 AES-256-CBC 解密
                var decrypted = EncryptionService.DecryptAES256CBC(encryptedData);
                return JsonConvert.DeserializeObject<List<NodeInfo>>(decrypted);
            }
            catch
            {
                return new List<NodeInfo>();
            }
        }

        /// <summary>
        /// 获取订阅链接（用于 v2rayN 订阅）
        /// </summary>
        public async Task<string> GetSubscriptionUrlAsync()
        {
            try
            {
                var token = await _loginService.GetValidAccessTokenAsync();
                if (string.IsNullOrEmpty(token))
                    return null;

                return $"{_apiBaseUrl}/api/trpc/nodes.getSubscription?token={token}";
            }
            catch
            {
                return null;
            }
        }
    }

    // ========== 数据模型 ==========

    public class SubscriptionResponse
    {
        [JsonProperty("result")]
        public SubscriptionResult Result { get; set; }
    }

    public class SubscriptionResult
    {
        [JsonProperty("data")]
        public SubscriptionData Data { get; set; }

        [JsonProperty("error")]
        public ErrorInfo Error { get; set; }
    }

    public class SubscriptionData
    {
        [JsonProperty("encryptedNodes")]
        public string EncryptedNodes { get; set; }

        [JsonProperty("updateTime")]
        public DateTime UpdateTime { get; set; }
    }

    public class NodeInfo
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("region")]
        public string Region { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }

        [JsonProperty("port")]
        public int Port { get; set; }

        [JsonProperty("protocol")]
        public string Protocol { get; set; }

        [JsonProperty("latency")]
        public int Latency { get; set; }

        [JsonProperty("load")]
        public int Load { get; set; }

        [JsonProperty("speed")]
        public string Speed { get; set; }

        [JsonProperty("flag")]
        public string Flag { get; set; }

        [JsonProperty("isFavorite")]
        public bool IsFavorite { get; set; }
    }

    public class SubscriptionEventArgs : EventArgs
    {
        public int NodeCount { get; set; }
        public string Message { get; set; }
    }
}
