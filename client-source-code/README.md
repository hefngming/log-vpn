# LogVPN 客户端开发指南

## 项目概述

LogVPN 是基于 v2rayN 二次开发的商业 VPN 加速器客户端，集成了以下核心功能：

- ✅ **品牌定制**：LogVPN 名称和图标
- ✅ **自动登录**：OAuth 2.0 集成，无需手动输入账号密码
- ✅ **节点获取**：自动从后端 API 获取加密节点列表
- ✅ **一键连接**：支持 VLESS/Trojan/Shadowsocks/VMess 协议
- ✅ **流量统计**：实时监控上传/下载流量并上报到服务器
- ✅ **设备指纹**：防止免费试用滥用
- ✅ **防共享**：一个账号同时只能在一台设备登录
- ✅ **自动更新**：启动时检查新版本并自动下载安装

## 技术栈

- **开发语言**：C# (.NET Framework 4.8)
- **UI 框架**：WPF (Windows Presentation Foundation)
- **核心组件**：v2ray-core
- **构建工具**：MSBuild + NSIS
- **CI/CD**：GitHub Actions

## 项目结构

```
client-source-code/
├── .github/
│   └── workflows/
│       └── build-and-deploy.yml    # GitHub Actions 自动编译工作流
├── Services/
│   ├── DeviceFingerprintService.cs # 设备指纹识别服务
│   ├── AntiSharingService.cs       # 防共享服务
│   ├── AutoUpdateService.cs        # 自动更新服务
│   └── LogVPNApiClient.cs          # API 客户端服务
├── Forms/
│   └── (WPF 窗体文件，需要从 v2rayN 复制)
├── Models/
│   └── (数据模型文件，需要从 v2rayN 复制)
├── Resources/
│   └── (图标、图片等资源文件)
├── LogVPN_Installer.nsi            # NSIS 安装程序脚本
└── README.md                       # 本文件
```

## 快速开始

### 1. 准备开发环境

#### 1.1 安装 Visual Studio 2022

1. 访问 [Visual Studio 官网](https://visualstudio.microsoft.com/zh-hans/downloads/)
2. 下载 **Visual Studio 2022 Community**（免费版）
3. 安装时选择以下工作负载：
   - ✅ .NET 桌面开发
   - ✅ .NET Framework 4.8 开发工具

#### 1.2 安装 Git

1. 访问 [Git 官网](https://git-scm.com/downloads)
2. 下载并安装 Git for Windows
3. 安装完成后打开命令提示符，验证安装：
   ```bash
   git --version
   ```

#### 1.3 安装 NSIS（用于打包安装程序）

1. 访问 [NSIS 官网](https://nsis.sourceforge.io/Download)
2. 下载并安装 NSIS 3.x 最新版本
3. 将 NSIS 安装目录添加到系统环境变量 PATH

### 2. 克隆 v2rayN 源代码

```bash
# 克隆 v2rayN 官方仓库
git clone https://github.com/2dust/v2rayN.git

# 进入项目目录
cd v2rayN
```

### 3. 集成 LogVPN 代码

#### 3.1 复制服务文件

将本项目的 `Services/` 目录复制到 v2rayN 项目的 `v2rayN/` 目录下：

```
v2rayN/
├── v2rayN/
│   ├── Services/          ← 复制到这里
│   │   ├── DeviceFingerprintService.cs
│   │   ├── AntiSharingService.cs
│   │   ├── AutoUpdateService.cs
│   │   └── LogVPNApiClient.cs
│   └── ...
```

#### 3.2 修改项目文件

在 Visual Studio 中打开 `v2rayN.sln`，然后：

1. 右键点击 `v2rayN` 项目 → **添加** → **现有项**
2. 选择 `Services/` 目录下的所有 `.cs` 文件
3. 点击**添加**

#### 3.3 安装 NuGet 包

在 Visual Studio 中打开**工具** → **NuGet 包管理器** → **程序包管理器控制台**，运行：

```powershell
Install-Package Newtonsoft.Json
Install-Package System.Management
```

### 4. 品牌定制

#### 4.1 修改程序名称

1. 打开 `Properties/AssemblyInfo.cs`
2. 修改以下内容：

```csharp
[assembly: AssemblyTitle("LogVPN")]
[assembly: AssemblyProduct("LogVPN")]
[assembly: AssemblyCompany("LogVPN Team")]
[assembly: AssemblyCopyright("Copyright © LogVPN Team 2024")]
[assembly: AssemblyVersion("1.0.0.0")]
[assembly: AssemblyFileVersion("1.0.0.0")]
```

#### 4.2 替换图标

1. 准备一个 256x256 的 PNG 图标
2. 使用在线工具（如 [ConvertICO](https://convertio.co/zh/png-ico/)）转换为 `.ico` 格式
3. 将图标文件命名为 `icon.ico`，放到 `Resources/` 目录
4. 在 Visual Studio 中：
   - 右键点击项目 → **属性**
   - 选择**应用程序**选项卡
   - 点击**图标和清单** → **图标** → **浏览**
   - 选择 `Resources/icon.ico`

#### 4.3 修改窗口标题

在主窗口代码（通常是 `MainWindow.xaml.cs`）中：

```csharp
public MainWindow()
{
    InitializeComponent();
    this.Title = "LogVPN - 全球加速专家";
}
```

### 5. 集成 LogVPN 功能

#### 5.1 在启动时检查更新

在 `App.xaml.cs` 的 `OnStartup` 方法中添加：

```csharp
protected override async void OnStartup(StartupEventArgs e)
{
    base.OnStartup(e);
    
    // 检查更新
    var updateInfo = await AutoUpdateService.CheckForUpdatesAsync();
    if (updateInfo.HasUpdate)
    {
        var result = MessageBox.Show(
            $"发现新版本 {updateInfo.LatestVersion}，是否立即更新？\n\n更新内容：\n{updateInfo.ReleaseNotes}",
            "发现新版本",
            MessageBoxButton.YesNo,
            MessageBoxImage.Information
        );
        
        if (result == MessageBoxResult.Yes)
        {
            await AutoUpdateService.DownloadAndInstallAsync(updateInfo.DownloadUrl);
        }
    }
}
```

#### 5.2 在登录时绑定设备

在登录成功后添加：

```csharp
private async void OnLoginSuccess(string token)
{
    // 设置认证令牌
    LogVPNApiClient.SetAuthToken(token);
    
    // 获取设备指纹
    var fingerprint = DeviceFingerprintService.GetDeviceFingerprint();
    
    // 检查设备是否被允许登录
    var checkResult = await AntiSharingService.CheckDeviceAsync(token, fingerprint);
    
    if (!checkResult.IsAllowed)
    {
        if (checkResult.NeedRelogin)
        {
            MessageBox.Show(
                checkResult.Message,
                "设备验证失败",
                MessageBoxButton.OK,
                MessageBoxImage.Warning
            );
            // 跳转到登录页面
            return;
        }
    }
    
    // 绑定设备
    await AntiSharingService.BindDeviceAsync(token, fingerprint);
    
    // 获取用户信息
    var userInfo = await LogVPNApiClient.GetCurrentUserAsync();
    
    // 获取节点列表
    var nodes = await LogVPNApiClient.GetEncryptedNodesAsync();
    
    // 显示主窗口
    var mainWindow = new MainWindow();
    mainWindow.Show();
}
```

#### 5.3 定时上报流量

在主窗口中添加定时器：

```csharp
private System.Timers.Timer _trafficReportTimer;

public MainWindow()
{
    InitializeComponent();
    
    // 每 5 分钟上报一次流量
    _trafficReportTimer = new System.Timers.Timer(5 * 60 * 1000);
    _trafficReportTimer.Elapsed += async (sender, e) =>
    {
        var uploadBytes = GetTotalUploadBytes();
        var downloadBytes = GetTotalDownloadBytes();
        
        await LogVPNApiClient.ReportTrafficAsync(uploadBytes, downloadBytes);
    };
    _trafficReportTimer.Start();
}

private long GetTotalUploadBytes()
{
    // 从 v2ray 核心获取上传流量
    // 实现细节取决于 v2rayN 的代码结构
    return 0;
}

private long GetTotalDownloadBytes()
{
    // 从 v2ray 核心获取下载流量
    // 实现细节取决于 v2rayN 的代码结构
    return 0;
}
```

### 6. 编译项目

#### 6.1 在 Visual Studio 中编译

1. 打开 Visual Studio
2. 点击菜单栏 **生成** → **生成解决方案**（或按 `Ctrl+Shift+B`）
3. 等待编译完成，输出窗口会显示编译结果
4. 编译成功后，可执行文件位于 `bin/Release/LogVPN.exe`

#### 6.2 使用命令行编译

打开**开发人员命令提示符**（在开始菜单搜索 "Developer Command Prompt"），然后运行：

```bash
cd path\to\v2rayN
msbuild v2rayN.sln /p:Configuration=Release /p:Platform="Any CPU"
```

### 7. 打包安装程序

#### 7.1 准备文件

1. 将编译好的所有文件复制到一个临时目录：
   ```
   temp/
   ├── LogVPN.exe
   ├── LogVPN.exe.config
   ├── v2ray.exe
   ├── v2ctl.exe
   ├── geoip.dat
   ├── geosite.dat
   ├── *.dll
   └── Resources/
       └── icon.ico
   ```

2. 将本项目的 `LogVPN_Installer.nsi` 复制到 `temp/` 目录

#### 7.2 生成安装程序

右键点击 `LogVPN_Installer.nsi`，选择 **Compile NSIS Script**

或者在命令行运行：

```bash
makensis LogVPN_Installer.nsi
```

生成的安装程序为 `LogVPN_Setup.exe`

### 8. 测试安装程序

1. 双击 `LogVPN_Setup.exe`
2. 按照安装向导完成安装
3. 启动 LogVPN，测试以下功能：
   - ✅ 自动更新检查
   - ✅ OAuth 登录
   - ✅ 节点列表获取
   - ✅ 一键连接
   - ✅ 流量统计显示

## GitHub Actions 自动化部署

### 1. 配置 GitHub Secrets

在 GitHub 仓库中，进入 **Settings** → **Secrets and variables** → **Actions**，添加以下 Secrets：

- `SSH_PRIVATE_KEY`：服务器 SSH 私钥
- `SERVER_HOST`：服务器地址（155.94.160.248）
- `SERVER_USER`：服务器用户名（root）

### 2. 推送代码触发自动编译

```bash
git add .
git commit -m "feat: 添加 LogVPN 功能"
git push origin main
```

GitHub Actions 会自动：
1. 编译 Windows 客户端
2. 打包安装程序
3. 上传到服务器 `/home/ubuntu/log-vpn/client/public/downloads/`
4. 更新版本信息

### 3. 创建 Release

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions 会自动创建 Release 并上传安装程序

## 前端下载页面集成

安装程序上传到服务器后，前端下载页面会自动显示最新版本：

- **下载链接**：`https://dj.siumingho.dpdns.org/downloads/LogVPN_Setup.exe`
- **版本信息**：`https://dj.siumingho.dpdns.org/downloads/version.json`

## 常见问题

### Q1: 编译时提示缺少 NuGet 包

**解决方案**：在 Visual Studio 中右键点击解决方案 → **还原 NuGet 程序包**

### Q2: 编译时提示 .NET Framework 版本不匹配

**解决方案**：
1. 右键点击项目 → **属性**
2. 选择**应用程序**选项卡
3. 将**目标框架**改为 **.NET Framework 4.8**

### Q3: NSIS 编译失败

**解决方案**：
1. 检查 NSIS 是否正确安装
2. 确保 `LogVPN_Installer.nsi` 中的文件路径正确
3. 确保所有引用的文件都存在

### Q4: 设备指纹获取失败

**解决方案**：
1. 确保程序以管理员权限运行
2. 检查 `System.Management` NuGet 包是否正确安装

### Q5: OAuth 登录失败

**解决方案**：
1. 检查后端 API 地址是否正确（`https://dj.siumingho.dpdns.org/api`）
2. 检查网络连接是否正常
3. 查看后端日志排查问题

## API 文档

### 后端 API 端点

- **OAuth 登录**：`GET /api/oauth/login`
- **获取当前用户**：`GET /api/trpc/auth.me`
- **获取加密节点列表**：`GET /api/trpc/nodes.getEncrypted`
- **上报流量**：`POST /api/trpc/traffic.log`
- **获取订阅信息**：`GET /api/trpc/subscription.getCurrent`
- **检查设备**：`POST /api/trpc/device.check`
- **绑定设备**：`POST /api/trpc/device.bind`
- **获取最新版本**：`GET /api/trpc/system.getLatestVersion`

### 加密算法

节点数据使用 **AES-256-CBC** 加密：

- **密钥**：32 字节（需要与后端配置一致）
- **IV**：随机生成，由后端返回
- **编码**：Base64

## 技术支持

如有问题，请联系：

- **邮箱**：siuminghe@gmail.com
- **Telegram**：@logvvpnbot
- **官网**：https://dj.siumingho.dpdns.org

## 许可证

本项目基于 v2rayN 开发，遵循 GPL-3.0 许可证。
