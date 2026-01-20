# LogVPN 客户端开发指南

基于 v2rayN 二次开发 LogVPN Windows 客户端的完整指南。

---

## 📋 目录

1. [项目概述](#项目概述)
2. [开发环境准备](#开发环境准备)
3. [品牌定制](#品牌定制)
4. [功能实现](#功能实现)
5. [编译和打包](#编译和打包)
6. [部署和分发](#部署和分发)

---

## 项目概述

**LogVPN 客户端**是基于开源项目 [v2rayN](https://github.com/2dust/v2rayN) 进行二次开发的 Windows VPN 客户端，实现以下核心功能：

- ✅ **品牌定制**：LogVPN 名称、图标、启动画面
- ✅ **自动登录**：集成 Manus OAuth 认证
- ✅ **节点自动获取**：从服务器 API 获取加密节点列表
- ✅ **一键连接**：自动配置并连接最优节点
- ✅ **流量统计**：实时统计并上报流量使用情况
- ✅ **自动更新**：检查并安装客户端更新

---

## 开发环境准备

### 1. 系统要求

- **操作系统**：Windows 10/11 64-bit
- **开发工具**：Visual Studio 2022（Community 版本即可）
- **运行时**：.NET 8.0 SDK
- **版本控制**：Git

### 2. 克隆 v2rayN 源代码

```bash
git clone https://github.com/2dust/v2rayN.git
cd v2rayN
```

### 3. 安装依赖

```bash
# 恢复 NuGet 包
dotnet restore

# 构建项目
dotnet build
```

---

## 品牌定制

### 1. 修改应用程序名称

**文件路径**：`v2rayN/Properties/AssemblyInfo.cs`

```csharp
[assembly: AssemblyTitle("LogVPN")]
[assembly: AssemblyDescription("LogVPN - 安全、快速、全球的 VPN 服务")]
[assembly: AssemblyProduct("LogVPN")]
[assembly: AssemblyCompany("LogVPN Team")]
```

### 2. 替换应用程序图标

**图标文件**：
- 主图标：`v2rayN/Resources/logo.ico` (256x256)
- 托盘图标：`v2rayN/Resources/NotifyIcon.ico` (16x16, 32x32)

**图标要求**：
- 格式：ICO
- 尺寸：16x16, 32x32, 48x48, 256x256（多尺寸 ICO）
- 背景：透明

### 3. 修改启动画面

**文件路径**：`v2rayN/Forms/SplashForm.cs`

```csharp
// 修改启动画面标题
this.Text = "LogVPN 正在启动...";

// 修改欢迎文本
lblWelcome.Text = "欢迎使用 LogVPN";
```

### 4. 修改主窗口标题

**文件路径**：`v2rayN/Forms/MainForm.cs`

```csharp
// 在 MainForm 构造函数中
this.Text = "LogVPN - 安全上网";
```

---

## 功能实现

### 1. 自动登录功能

#### 1.1 添加 OAuth 登录窗口

**文件路径**：`v2rayN/Forms/LoginForm.cs`（新建）

```csharp
using System;
using System.Windows.Forms;
using System.Net.Http;
using System.Text.Json;

namespace v2rayN.Forms
{
    public partial class LoginForm : Form
    {
        private const string OAUTH_URL = "https://your-domain.com/api/oauth/authorize";
        private const string API_BASE_URL = "https://your-domain.com/api/trpc";
        
        private WebBrowser webBrowser;
        private string accessToken;
        
        public LoginForm()
        {
            InitializeComponent();
            InitializeWebBrowser();
        }
        
        private void InitializeWebBrowser()
        {
            webBrowser = new WebBrowser
            {
                Dock = DockStyle.Fill,
                ScriptErrorsSuppressed = true
            };
            
            webBrowser.Navigated += WebBrowser_Navigated;
            this.Controls.Add(webBrowser);
            
            // 导航到登录页面
            webBrowser.Navigate(OAUTH_URL);
        }
        
        private void WebBrowser_Navigated(object sender, WebBrowserNavigatedEventArgs e)
        {
            // 检查是否是回调 URL
            if (e.Url.AbsolutePath.Contains("/oauth/callback"))
            {
                // 从 Cookie 中获取 token
                string cookies = webBrowser.Document.Cookie;
                if (cookies.Contains("session="))
                {
                    accessToken = ExtractSessionToken(cookies);
                    this.DialogResult = DialogResult.OK;
                    this.Close();
                }
            }
        }
        
        private string ExtractSessionToken(string cookies)
        {
            // 提取 session cookie
            var parts = cookies.Split(';');
            foreach (var part in parts)
            {
                if (part.Trim().StartsWith("session="))
                {
                    return part.Trim().Substring(8);
                }
            }
            return null;
        }
        
        public string GetAccessToken()
        {
            return accessToken;
        }
    }
}
```

#### 1.2 在主程序中集成登录

**文件路径**：`v2rayN/Forms/MainForm.cs`

```csharp
private async void MainForm_Load(object sender, EventArgs e)
{
    // 检查是否已登录
    if (string.IsNullOrEmpty(Config.AccessToken))
    {
        // 显示登录窗口
        using (var loginForm = new LoginForm())
        {
            if (loginForm.ShowDialog() == DialogResult.OK)
            {
                Config.AccessToken = loginForm.GetAccessToken();
                SaveConfig();
                
                // 登录成功后获取节点
                await FetchNodesFromServer();
            }
            else
            {
                // 用户取消登录，退出程序
                Application.Exit();
                return;
            }
        }
    }
    else
    {
        // 已登录，直接获取节点
        await FetchNodesFromServer();
    }
}
```

### 2. 节点自动获取

#### 2.1 创建 API 客户端

**文件路径**：`v2rayN/Services/ApiClient.cs`（新建）

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace v2rayN.Services
{
    public class ApiClient
    {
        private const string API_BASE_URL = "https://your-domain.com/api/trpc";
        private readonly HttpClient httpClient;
        private string accessToken;
        
        public ApiClient(string token)
        {
            this.accessToken = token;
            httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Cookie", $"session={accessToken}");
        }
        
        public async Task<NodeListResponse> GetEncryptedNodes()
        {
            try
            {
                var response = await httpClient.GetAsync($"{API_BASE_URL}/nodes.getEncrypted");
                response.EnsureSuccessStatusCode();
                
                var content = await response.Content.ReadAsStringAsync();
                var apiResponse = JsonSerializer.Deserialize<TrpcResponse<NodeListResponse>>(content);
                
                return apiResponse?.Result?.Data?.Json;
            }
            catch (Exception ex)
            {
                throw new Exception($"获取节点失败: {ex.Message}");
            }
        }
        
        public async Task LogTraffic(long upload, long download, int? nodeId = null)
        {
            try
            {
                var payload = new
                {
                    upload = upload,
                    download = download,
                    nodeId = nodeId
                };
                
                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                
                var response = await httpClient.PostAsync($"{API_BASE_URL}/traffic.log", content);
                response.EnsureSuccessStatusCode();
            }
            catch (Exception ex)
            {
                // 流量上报失败不影响使用
                Console.WriteLine($"流量上报失败: {ex.Message}");
            }
        }
    }
    
    // API 响应模型
    public class TrpcResponse<T>
    {
        public TrpcResult<T> Result { get; set; }
    }
    
    public class TrpcResult<T>
    {
        public TrpcData<T> Data { get; set; }
    }
    
    public class TrpcData<T>
    {
        public T Json { get; set; }
    }
    
    public class NodeListResponse
    {
        public bool Success { get; set; }
        public List<EncryptedNode> Nodes { get; set; }
        public int Count { get; set; }
        public long Timestamp { get; set; }
    }
    
    public class EncryptedNode
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string EncryptedData { get; set; }
    }
}
```

#### 2.2 解密节点配置

**文件路径**：`v2rayN/Services/NodeDecryptor.cs`（新建）

```csharp
using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace v2rayN.Services
{
    public class NodeDecryptor
    {
        private const string ENCRYPTION_KEY = "your-32-byte-encryption-key-here"; // 与服务器端一致
        
        public static DecryptedNode DecryptNode(EncryptedNode encryptedNode)
        {
            try
            {
                var decryptedJson = Decrypt(encryptedNode.EncryptedData, ENCRYPTION_KEY);
                var node = JsonSerializer.Deserialize<DecryptedNode>(decryptedJson);
                node.Id = encryptedNode.Id;
                node.Name = encryptedNode.Name;
                return node;
            }
            catch (Exception ex)
            {
                throw new Exception($"节点解密失败: {ex.Message}");
            }
        }
        
        private static string Decrypt(string encryptedBase64, string key)
        {
            var encryptedBytes = Convert.FromBase64String(encryptedBase64);
            var keyBytes = Encoding.UTF8.GetBytes(key.PadRight(32).Substring(0, 32));
            
            using (var aes = Aes.Create())
            {
                aes.Key = keyBytes;
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;
                
                // IV 是密文的前 16 字节
                var iv = new byte[16];
                Array.Copy(encryptedBytes, 0, iv, 0, 16);
                aes.IV = iv;
                
                // 实际密文是剩余字节
                var cipherText = new byte[encryptedBytes.Length - 16];
                Array.Copy(encryptedBytes, 16, cipherText, 0, cipherText.Length);
                
                using (var decryptor = aes.CreateDecryptor())
                {
                    var decryptedBytes = decryptor.TransformFinalBlock(cipherText, 0, cipherText.Length);
                    return Encoding.UTF8.GetString(decryptedBytes);
                }
            }
        }
    }
    
    public class DecryptedNode
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Protocol { get; set; }
        public string Address { get; set; }
        public int Port { get; set; }
        public string Country { get; set; }
        public string CountryCode { get; set; }
        public JsonElement Settings { get; set; }
    }
}
```

#### 2.3 在主程序中获取并导入节点

**文件路径**：`v2rayN/Forms/MainForm.cs`

```csharp
private async Task FetchNodesFromServer()
{
    try
    {
        ShowStatus("正在获取节点列表...");
        
        var apiClient = new ApiClient(Config.AccessToken);
        var nodeList = await apiClient.GetEncryptedNodes();
        
        if (nodeList == null || nodeList.Nodes == null || nodeList.Nodes.Count == 0)
        {
            MessageBox.Show("未找到可用节点", "提示", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }
        
        // 清空现有节点
        config.vmess.Clear();
        
        // 解密并导入节点
        foreach (var encryptedNode in nodeList.Nodes)
        {
            try
            {
                var node = NodeDecryptor.DecryptNode(encryptedNode);
                ImportNode(node);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"导入节点失败 ({encryptedNode.Name}): {ex.Message}");
            }
        }
        
        // 刷新节点列表显示
        RefreshServers();
        
        ShowStatus($"成功导入 {nodeList.Nodes.Count} 个节点");
    }
    catch (Exception ex)
    {
        MessageBox.Show($"获取节点失败: {ex.Message}", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
    }
}

private void ImportNode(DecryptedNode node)
{
    // 根据协议类型导入节点
    switch (node.Protocol.ToLower())
    {
        case "vmess":
            ImportVMessNode(node);
            break;
        case "vless":
            ImportVLESSNode(node);
            break;
        case "trojan":
            ImportTrojanNode(node);
            break;
        case "shadowsocks":
            ImportShadowsocksNode(node);
            break;
        default:
            Console.WriteLine($"不支持的协议: {node.Protocol}");
            break;
    }
}

private void ImportVMessNode(DecryptedNode node)
{
    var vmessItem = new VmessItem
    {
        remarks = node.Name,
        address = node.Address,
        port = node.Port,
        id = node.Settings.GetProperty("id").GetString(),
        alterId = node.Settings.GetProperty("alterId").GetInt32(),
        security = node.Settings.GetProperty("security").GetString(),
        network = node.Settings.GetProperty("network").GetString(),
        headerType = "none",
        requestHost = "",
        path = node.Settings.GetProperty("path").GetString(),
        streamSecurity = "",
        allowInsecure = "",
        configType = (int)EConfigType.VMess,
        configVersion = 2,
        testResult = ""
    };
    
    config.vmess.Add(vmessItem);
}

// 类似地实现 ImportVLESSNode, ImportTrojanNode, ImportShadowsocksNode
```

### 3. 一键连接功能

**文件路径**：`v2rayN/Forms/MainForm.cs`

```csharp
private void btnQuickConnect_Click(object sender, EventArgs e)
{
    // 选择最优节点（延迟最低）
    var bestNode = FindBestNode();
    
    if (bestNode == null)
    {
        MessageBox.Show("没有可用节点", "提示", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        return;
    }
    
    // 设置为活动节点
    SetActiveServer(bestNode);
    
    // 启动代理
    StartProxy();
    
    ShowStatus($"已连接到 {bestNode.remarks}");
}

private VmessItem FindBestNode()
{
    VmessItem bestNode = null;
    int lowestDelay = int.MaxValue;
    
    foreach (var node in config.vmess)
    {
        // 解析延迟（从 testResult 中提取）
        if (int.TryParse(node.testResult, out int delay))
        {
            if (delay > 0 && delay < lowestDelay)
            {
                lowestDelay = delay;
                bestNode = node;
            }
        }
    }
    
    // 如果没有延迟数据，返回第一个节点
    return bestNode ?? (config.vmess.Count > 0 ? config.vmess[0] : null);
}
```

### 4. 流量统计和上报

**文件路径**：`v2rayN/Services/TrafficMonitor.cs`（新建）

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

namespace v2rayN.Services
{
    public class TrafficMonitor
    {
        private readonly ApiClient apiClient;
        private long totalUpload = 0;
        private long totalDownload = 0;
        private int? currentNodeId = null;
        private Timer reportTimer;
        
        public TrafficMonitor(ApiClient client)
        {
            this.apiClient = client;
            
            // 每 5 分钟上报一次流量
            reportTimer = new Timer(ReportTraffic, null, TimeSpan.FromMinutes(5), TimeSpan.FromMinutes(5));
        }
        
        public void UpdateTraffic(long upload, long download, int? nodeId)
        {
            totalUpload += upload;
            totalDownload += download;
            currentNodeId = nodeId;
        }
        
        private async void ReportTraffic(object state)
        {
            if (totalUpload == 0 && totalDownload == 0)
            {
                return;
            }
            
            try
            {
                await apiClient.LogTraffic(totalUpload, totalDownload, currentNodeId);
                
                // 重置计数器
                totalUpload = 0;
                totalDownload = 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"流量上报失败: {ex.Message}");
            }
        }
        
        public void Dispose()
        {
            reportTimer?.Dispose();
            
            // 程序退出时上报剩余流量
            if (totalUpload > 0 || totalDownload > 0)
            {
                apiClient.LogTraffic(totalUpload, totalDownload, currentNodeId).Wait();
            }
        }
    }
}
```

**在主程序中集成流量监控**：

```csharp
private TrafficMonitor trafficMonitor;

private void MainForm_Load(object sender, EventArgs e)
{
    // ... 登录和获取节点 ...
    
    // 初始化流量监控
    var apiClient = new ApiClient(Config.AccessToken);
    trafficMonitor = new TrafficMonitor(apiClient);
    
    // 启动流量统计定时器
    var statsTimer = new Timer(1000); // 每秒更新一次
    statsTimer.Elapsed += (s, args) => UpdateTrafficStats();
    statsTimer.Start();
}

private void UpdateTrafficStats()
{
    // 从 v2ray 核心获取流量统计
    var stats = GetV2RayStats();
    
    if (stats != null)
    {
        // 更新 UI 显示
        UpdateTrafficUI(stats.Upload, stats.Download);
        
        // 上报到服务器
        trafficMonitor.UpdateTraffic(stats.Upload, stats.Download, GetCurrentNodeId());
    }
}

private void MainForm_FormClosing(object sender, FormClosingEventArgs e)
{
    // 清理资源
    trafficMonitor?.Dispose();
}
```

---

## 编译和打包

### 1. 编译项目

```bash
# Release 模式编译
dotnet build --configuration Release

# 输出目录
# bin/Release/net8.0-windows/
```

### 2. 准备发布文件

```bash
# 发布为单文件可执行程序
dotnet publish --configuration Release --runtime win-x64 --self-contained true /p:PublishSingleFile=true
```

### 3. 使用 NSIS 创建安装程序

**安装 NSIS**：
- 下载：https://nsis.sourceforge.io/Download
- 安装到默认路径

**创建 NSIS 脚本**：

**文件路径**：`installer.nsi`

```nsis
; LogVPN 安装脚本

!define PRODUCT_NAME "LogVPN"
!define PRODUCT_VERSION "1.0.0"
!define PRODUCT_PUBLISHER "LogVPN Team"
!define PRODUCT_WEB_SITE "https://your-domain.com"
!define PRODUCT_DIR_REGKEY "Software\Microsoft\Windows\CurrentVersion\App Paths\LogVPN.exe"
!define PRODUCT_UNINST_KEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}"

SetCompressor lzma

; MUI Settings
!include "MUI2.nsh"
!define MUI_ABORTWARNING
!define MUI_ICON "logo.ico"
!define MUI_UNICON "logo.ico"

; Welcome page
!insertmacro MUI_PAGE_WELCOME
; License page
!insertmacro MUI_PAGE_LICENSE "LICENSE.txt"
; Directory page
!insertmacro MUI_PAGE_DIRECTORY
; Instfiles page
!insertmacro MUI_PAGE_INSTFILES
; Finish page
!define MUI_FINISHPAGE_RUN "$INSTDIR\LogVPN.exe"
!insertmacro MUI_PAGE_FINISH

; Uninstaller pages
!insertmacro MUI_UNPAGE_INSTFILES

; Language files
!insertmacro MUI_LANGUAGE "SimpChinese"

Name "${PRODUCT_NAME} ${PRODUCT_VERSION}"
OutFile "LogVPN_${PRODUCT_VERSION}_Setup.exe"
InstallDir "$PROGRAMFILES64\LogVPN"
ShowInstDetails show
ShowUnInstDetails show

Section "MainSection" SEC01
  SetOutPath "$INSTDIR"
  SetOverwrite ifnewer
  
  ; 复制主程序
  File "bin\Release\net8.0-windows\publish\LogVPN.exe"
  File "bin\Release\net8.0-windows\publish\*.dll"
  
  ; 复制 v2ray 核心
  File /r "bin\Release\net8.0-windows\publish\v2ray-core\"
  
  ; 创建快捷方式
  CreateDirectory "$SMPROGRAMS\LogVPN"
  CreateShortCut "$SMPROGRAMS\LogVPN\LogVPN.lnk" "$INSTDIR\LogVPN.exe"
  CreateShortCut "$DESKTOP\LogVPN.lnk" "$INSTDIR\LogVPN.exe"
  
  ; 写入注册表
  WriteRegStr HKLM "${PRODUCT_DIR_REGKEY}" "" "$INSTDIR\LogVPN.exe"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "DisplayName" "$(^Name)"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "UninstallString" "$INSTDIR\uninst.exe"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "DisplayIcon" "$INSTDIR\LogVPN.exe"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "DisplayVersion" "${PRODUCT_VERSION}"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "URLInfoAbout" "${PRODUCT_WEB_SITE}"
  WriteRegStr HKLM "${PRODUCT_UNINST_KEY}" "Publisher" "${PRODUCT_PUBLISHER}"
SectionEnd

Section -Post
  WriteUninstaller "$INSTDIR\uninst.exe"
SectionEnd

Section Uninstall
  Delete "$INSTDIR\uninst.exe"
  Delete "$INSTDIR\LogVPN.exe"
  Delete "$INSTDIR\*.dll"
  
  Delete "$SMPROGRAMS\LogVPN\LogVPN.lnk"
  Delete "$DESKTOP\LogVPN.lnk"
  
  RMDir /r "$INSTDIR\v2ray-core"
  RMDir "$INSTDIR"
  RMDir "$SMPROGRAMS\LogVPN"
  
  DeleteRegKey HKLM "${PRODUCT_UNINST_KEY}"
  DeleteRegKey HKLM "${PRODUCT_DIR_REGKEY}"
SectionEnd
```

**编译安装程序**：

```bash
# 使用 NSIS 编译
"C:\Program Files (x86)\NSIS\makensis.exe" installer.nsi

# 输出文件
# LogVPN_1.0.0_Setup.exe
```

---

## 部署和分发

### 1. 上传到服务器

```bash
# 使用 SCP 或 FTP 上传
scp LogVPN_1.0.0_Setup.exe user@dj.siumingho.dpdns.org:/var/www/downloads/

# 或者使用 Web 管理界面上传
```

### 2. 更新下载页面配置

确保下载页面的链接正确：

```typescript
downloadUrl: "https://dj.siumingho.dpdns.org/downloads/LogVPN_1.0.0_Setup.exe"
```

### 3. 测试安装流程

1. 从网站下载安装程序
2. 运行安装程序
3. 完成安装
4. 启动 LogVPN
5. 登录账号
6. 自动获取节点
7. 一键连接
8. 验证科学上网功能

---

## 📝 注意事项

1. **加密密钥**：确保客户端和服务器使用相同的加密密钥（`ENCRYPTION_KEY`）
2. **API 地址**：将所有 `https://your-domain.com` 替换为实际的服务器地址
3. **证书验证**：生产环境中启用 SSL 证书验证
4. **错误处理**：添加完善的错误处理和日志记录
5. **自动更新**：实现客户端自动更新功能（调用 `version.check` API）

---

## 🔗 相关资源

- [v2rayN GitHub](https://github.com/2dust/v2rayN)
- [v2ray-core 文档](https://www.v2ray.com/)
- [NSIS 文档](https://nsis.sourceforge.io/Docs/)
- [.NET 8.0 文档](https://learn.microsoft.com/zh-cn/dotnet/)

---

## 📞 技术支持

如有问题，请联系：
- 邮箱：siuminghe@gmail.com
- Telegram：@logvvpnbot
