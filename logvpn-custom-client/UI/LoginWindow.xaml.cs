using System;
using System.Windows;
using LogVPN.Services;
using LogVPN.Config;

namespace LogVPN.UI
{
    /// <summary>
    /// LogVPN 登录窗口
    /// 提供账号密码登录界面
    /// </summary>
    public partial class LoginWindow : Window
    {
        private readonly OAuthLoginService _loginService;
        private bool _isLoading = false;

        public LoginWindow(OAuthLoginService loginService)
        {
            InitializeComponent();
            _loginService = loginService;

            // 订阅登录事件
            _loginService.LoginSucceeded += LoginService_LoginSucceeded;
            _loginService.LoginFailed += LoginService_LoginFailed;

            // 加载保存的邮箱（如果启用了记住密码）
            LoadSavedEmail();
        }

        /// <summary>
        /// 登录按钮点击事件
        /// </summary>
        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            if (_isLoading) return;

            var email = EmailTextBox.Text.Trim();
            var password = PasswordBox.Password;

            // 验证输入
            if (string.IsNullOrEmpty(email))
            {
                ShowError("请输入邮箱地址");
                return;
            }

            if (string.IsNullOrEmpty(password))
            {
                ShowError("请输入密码");
                return;
            }

            if (!IsValidEmail(email))
            {
                ShowError("邮箱地址格式不正确");
                return;
            }

            // 显示加载状态
            SetLoading(true);
            ErrorMessage.Text = "";

            try
            {
                var response = await _loginService.LoginAsync(email, password);

                if (response?.Result?.Data != null)
                {
                    // 保存邮箱（如果启用了记住密码）
                    if (RememberPasswordCheckBox.IsChecked == true)
                    {
                        SaveEmail(email);
                    }

                    // 登录成功，关闭窗口
                    DialogResult = true;
                    Close();
                }
                else
                {
                    ShowError(response?.Result?.Error?.Message ?? "登录失败");
                }
            }
            catch (Exception ex)
            {
                ShowError($"登录异常: {ex.Message}");
            }
            finally
            {
                SetLoading(false);
            }
        }

        /// <summary>
        /// 注册按钮点击事件
        /// </summary>
        private void RegisterButton_Click(object sender, RoutedEventArgs e)
        {
            // 打开注册窗口或导航到网站
            System.Diagnostics.Process.Start("https://dj.siumingho.dpdns.org/register");
        }

        /// <summary>
        /// 忘记密码按钮点击事件
        /// </summary>
        private void ForgotPasswordButton_Click(object sender, RoutedEventArgs e)
        {
            // 打开找回密码页面
            System.Diagnostics.Process.Start("https://dj.siumingho.dpdns.org/forgot-password");
        }

        /// <summary>
        /// 关闭按钮点击事件
        /// </summary>
        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
            Close();
        }

        /// <summary>
        /// 登录成功事件处理
        /// </summary>
        private void LoginService_LoginSucceeded(object sender, LoginEventArgs e)
        {
            Dispatcher.Invoke(() =>
            {
                MessageBox.Show($"欢迎 {e.Email}！登录成功。", "LogVPN", MessageBoxButton.OK, MessageBoxImage.Information);
            });
        }

        /// <summary>
        /// 登录失败事件处理
        /// </summary>
        private void LoginService_LoginFailed(object sender, LoginEventArgs e)
        {
            Dispatcher.Invoke(() =>
            {
                ShowError(e.Message);
            });
        }

        /// <summary>
        /// 显示错误信息
        /// </summary>
        private void ShowError(string message)
        {
            ErrorMessage.Text = message;
            ErrorMessage.Visibility = Visibility.Visible;
        }

        /// <summary>
        /// 设置加载状态
        /// </summary>
        private void SetLoading(bool isLoading)
        {
            _isLoading = isLoading;
            LoginButton.IsEnabled = !isLoading;
            LoadingProgress.IsIndeterminate = isLoading;

            if (isLoading)
            {
                LoginButton.Content = "登录中...";
            }
            else
            {
                LoginButton.Content = "登录";
            }
        }

        /// <summary>
        /// 验证邮箱格式
        /// </summary>
        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// 加载保存的邮箱
        /// </summary>
        private void LoadSavedEmail()
        {
            try
            {
                var config = ConfigManager.LoadConfig();
                if (config != null && !string.IsNullOrEmpty(config.Email))
                {
                    EmailTextBox.Text = config.Email;
                    RememberPasswordCheckBox.IsChecked = config.RememberPassword;
                }
            }
            catch { }
        }

        /// <summary>
        /// 保存邮箱
        /// </summary>
        private void SaveEmail(string email)
        {
            try
            {
                var config = ConfigManager.LoadConfig() ?? new ClientConfig();
                config.Email = email;
                config.RememberPassword = true;
                ConfigManager.SaveConfig(config);
            }
            catch { }
        }
    }
}
