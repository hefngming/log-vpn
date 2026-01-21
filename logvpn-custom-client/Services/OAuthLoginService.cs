using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace LogVPN.Services
{
    /// <summary>
    /// OAuth 登录服务
    /// 负责处理用户账号登录、令牌管理和会话维护
    /// </summary>
    public class OAuthLoginService
    {
        private readonly string _apiBaseUrl;
        private readonly HttpClient _httpClient;
        private string _accessToken;
        private string _refreshToken;
        private DateTime _tokenExpiryTime;

        public event EventHandler<LoginEventArgs> LoginSucceeded;
        public event EventHandler<LoginEventArgs> LoginFailed;
        public event EventHandler<EventArgs> LogoutSucceeded;

        public OAuthLoginService(string apiBaseUrl)
        {
            _apiBaseUrl = apiBaseUrl;
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("User-Agent", "LogVPN/1.0.0");
        }

        /// <summary>
        /// 用户登录（账号密码）
        /// </summary>
        public async Task<LoginResponse> LoginAsync(string email, string password)
        {
            try
            {
                var loginRequest = new
                {
                    email = email,
                    password = password,
                    deviceId = DeviceFingerprintService.GetDeviceFingerprint()
                };

                var content = new StringContent(
                    JsonConvert.SerializeObject(loginRequest),
                    Encoding.UTF8,
                    "application/json"
                );

                var response = await _httpClient.PostAsync(
                    $"{_apiBaseUrl}/api/trpc/auth.login",
                    content
                );

                var responseContent = await response.Content.ReadAsStringAsync();
                var loginResponse = JsonConvert.DeserializeObject<LoginResponse>(responseContent);

                if (response.IsSuccessStatusCode && loginResponse?.Result?.Data != null)
                {
                    var data = loginResponse.Result.Data;
                    _accessToken = data.AccessToken;
                    _refreshToken = data.RefreshToken;
                    _tokenExpiryTime = DateTime.UtcNow.AddSeconds(data.ExpiresIn);

                    // 保存令牌到本地存储
                    SaveTokensToStorage(_accessToken, _refreshToken);

                    LoginSucceeded?.Invoke(this, new LoginEventArgs
                    {
                        Email = email,
                        UserId = data.UserId,
                        SubscriptionStatus = data.SubscriptionStatus,
                        Message = "登录成功"
                    });

                    return loginResponse;
                }
                else
                {
                    LoginFailed?.Invoke(this, new LoginEventArgs
                    {
                        Email = email,
                        Message = loginResponse?.Result?.Error?.Message ?? "登录失败"
                    });

                    return loginResponse;
                }
            }
            catch (Exception ex)
            {
                LoginFailed?.Invoke(this, new LoginEventArgs
                {
                    Email = email,
                    Message = $"登录异常: {ex.Message}"
                });

                return new LoginResponse
                {
                    Result = new LoginResult
                    {
                        Error = new ErrorInfo { Message = ex.Message }
                    }
                };
            }
        }

        /// <summary>
        /// 用户注册
        /// </summary>
        public async Task<RegisterResponse> RegisterAsync(string email, string password, string confirmPassword)
        {
            try
            {
                if (password != confirmPassword)
                {
                    return new RegisterResponse
                    {
                        Result = new RegisterResult
                        {
                            Error = new ErrorInfo { Message = "两次输入的密码不一致" }
                        }
                    };
                }

                var registerRequest = new
                {
                    email = email,
                    password = password,
                    deviceId = DeviceFingerprintService.GetDeviceFingerprint()
                };

                var content = new StringContent(
                    JsonConvert.SerializeObject(registerRequest),
                    Encoding.UTF8,
                    "application/json"
                );

                var response = await _httpClient.PostAsync(
                    $"{_apiBaseUrl}/api/trpc/auth.register",
                    content
                );

                var responseContent = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<RegisterResponse>(responseContent);
            }
            catch (Exception ex)
            {
                return new RegisterResponse
                {
                    Result = new RegisterResult
                    {
                        Error = new ErrorInfo { Message = ex.Message }
                    }
                };
            }
        }

        /// <summary>
        /// 发送验证码
        /// </summary>
        public async Task<SendCodeResponse> SendVerificationCodeAsync(string email, string type = "login")
        {
            try
            {
                var request = new { email = email, type = type };
                var content = new StringContent(
                    JsonConvert.SerializeObject(request),
                    Encoding.UTF8,
                    "application/json"
                );

                var response = await _httpClient.PostAsync(
                    $"{_apiBaseUrl}/api/trpc/auth.sendVerificationCode",
                    content
                );

                var responseContent = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<SendCodeResponse>(responseContent);
            }
            catch (Exception ex)
            {
                return new SendCodeResponse
                {
                    Result = new SendCodeResult
                    {
                        Error = new ErrorInfo { Message = ex.Message }
                    }
                };
            }
        }

        /// <summary>
        /// 刷新令牌
        /// </summary>
        public async Task<bool> RefreshTokenAsync()
        {
            try
            {
                if (string.IsNullOrEmpty(_refreshToken))
                    return false;

                var refreshRequest = new { refreshToken = _refreshToken };
                var content = new StringContent(
                    JsonConvert.SerializeObject(refreshRequest),
                    Encoding.UTF8,
                    "application/json"
                );

                var response = await _httpClient.PostAsync(
                    $"{_apiBaseUrl}/api/trpc/auth.refreshToken",
                    content
                );

                var responseContent = await response.Content.ReadAsStringAsync();
                var refreshResponse = JsonConvert.DeserializeObject<LoginResponse>(responseContent);

                if (response.IsSuccessStatusCode && refreshResponse?.Result?.Data != null)
                {
                    var data = refreshResponse.Result.Data;
                    _accessToken = data.AccessToken;
                    _refreshToken = data.RefreshToken;
                    _tokenExpiryTime = DateTime.UtcNow.AddSeconds(data.ExpiresIn);

                    SaveTokensToStorage(_accessToken, _refreshToken);
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// 退出登录
        /// </summary>
        public async Task<bool> LogoutAsync()
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _accessToken);

                var response = await _httpClient.PostAsync(
                    $"{_apiBaseUrl}/api/trpc/auth.logout",
                    new StringContent("")
                );

                if (response.IsSuccessStatusCode)
                {
                    _accessToken = null;
                    _refreshToken = null;
                    ClearTokensFromStorage();
                    LogoutSucceeded?.Invoke(this, EventArgs.Empty);
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// 获取当前用户信息
        /// </summary>
        public async Task<UserInfo> GetCurrentUserAsync()
        {
            try
            {
                if (string.IsNullOrEmpty(_accessToken))
                    return null;

                _httpClient.DefaultRequestHeaders.Authorization =
                    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _accessToken);

                var response = await _httpClient.GetAsync(
                    $"{_apiBaseUrl}/api/trpc/auth.me"
                );

                var responseContent = await response.Content.ReadAsStringAsync();
                var userResponse = JsonConvert.DeserializeObject<UserResponse>(responseContent);

                return userResponse?.Result?.Data;
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// 检查令牌是否过期
        /// </summary>
        public bool IsTokenExpired()
        {
            return DateTime.UtcNow >= _tokenExpiryTime;
        }

        /// <summary>
        /// 获取有效的访问令牌
        /// </summary>
        public async Task<string> GetValidAccessTokenAsync()
        {
            if (IsTokenExpired())
            {
                await RefreshTokenAsync();
            }

            return _accessToken;
        }

        /// <summary>
        /// 从本地存储加载令牌
        /// </summary>
        public void LoadTokensFromStorage()
        {
            try
            {
                var config = ConfigManager.LoadConfig();
                if (config != null && !string.IsNullOrEmpty(config.AccessToken))
                {
                    _accessToken = config.AccessToken;
                    _refreshToken = config.RefreshToken;
                    _tokenExpiryTime = config.TokenExpiryTime;
                }
            }
            catch { }
        }

        /// <summary>
        /// 保存令牌到本地存储
        /// </summary>
        private void SaveTokensToStorage(string accessToken, string refreshToken)
        {
            try
            {
                var config = ConfigManager.LoadConfig() ?? new ClientConfig();
                config.AccessToken = accessToken;
                config.RefreshToken = refreshToken;
                config.TokenExpiryTime = _tokenExpiryTime;
                ConfigManager.SaveConfig(config);
            }
            catch { }
        }

        /// <summary>
        /// 清除本地存储的令牌
        /// </summary>
        private void ClearTokensFromStorage()
        {
            try
            {
                var config = ConfigManager.LoadConfig();
                if (config != null)
                {
                    config.AccessToken = null;
                    config.RefreshToken = null;
                    ConfigManager.SaveConfig(config);
                }
            }
            catch { }
        }
    }

    // ========== 数据模型 ==========

    public class LoginResponse
    {
        [JsonProperty("result")]
        public LoginResult Result { get; set; }
    }

    public class LoginResult
    {
        [JsonProperty("data")]
        public LoginData Data { get; set; }

        [JsonProperty("error")]
        public ErrorInfo Error { get; set; }
    }

    public class LoginData
    {
        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }

        [JsonProperty("refreshToken")]
        public string RefreshToken { get; set; }

        [JsonProperty("expiresIn")]
        public int ExpiresIn { get; set; }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("subscriptionStatus")]
        public string SubscriptionStatus { get; set; }
    }

    public class RegisterResponse
    {
        [JsonProperty("result")]
        public RegisterResult Result { get; set; }
    }

    public class RegisterResult
    {
        [JsonProperty("data")]
        public object Data { get; set; }

        [JsonProperty("error")]
        public ErrorInfo Error { get; set; }
    }

    public class SendCodeResponse
    {
        [JsonProperty("result")]
        public SendCodeResult Result { get; set; }
    }

    public class SendCodeResult
    {
        [JsonProperty("data")]
        public object Data { get; set; }

        [JsonProperty("error")]
        public ErrorInfo Error { get; set; }
    }

    public class UserResponse
    {
        [JsonProperty("result")]
        public UserResult Result { get; set; }
    }

    public class UserResult
    {
        [JsonProperty("data")]
        public UserInfo Data { get; set; }

        [JsonProperty("error")]
        public ErrorInfo Error { get; set; }
    }

    public class UserInfo
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("role")]
        public string Role { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }
    }

    public class ErrorInfo
    {
        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("code")]
        public string Code { get; set; }
    }

    public class LoginEventArgs : EventArgs
    {
        public string Email { get; set; }
        public string UserId { get; set; }
        public string SubscriptionStatus { get; set; }
        public string Message { get; set; }
    }
}
