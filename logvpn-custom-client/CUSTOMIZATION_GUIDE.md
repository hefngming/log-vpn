# LogVPN 定制版本开发指南

本指南详细说明如何将 LogVPN 定制功能集成到 v2rayN 项目中，并编译成可独立运行的 LogVPN 客户端。

---

## 📋 目录

1. [环境准备](#环境准备)
2. [项目结构](#项目结构)
3. [集成步骤](#集成步骤)
4. [品牌定制](#品牌定制)
5. [编译和打包](#编译和打包)
6. [测试和部署](#测试和部署)

---

## 🛠️ 环境准备

### 系统要求

- **操作系统**：Windows 10/11 64位
- **开发工具**：Visual Studio 2022 Community（免费）
- **框架**：.NET Framework 4.8 SDK
- **其他工具**：NSIS 3.x（用于打包安装程序）

### 安装步骤

#### 1. 安装 Visual Studio 2022

1. 下载：https://visualstudio.microsoft.com/zh-hans/downloads/
2. 选择 "Community" 版本（免费）
3. 安装时选择以下工作负载：
   - ✅ .NET 桌面开发
   - ✅ .NET Framework 4.8 开发工具

#### 2. 安装 .NET Framework 4.8 SDK

```bash
# 从官方网站下载并安装
https://dotnet.microsoft.com/download/dotnet-framework/net48
```

#### 3. 安装 NSIS

1. 下载：https://nsis.sourceforge.io/Download
2. 安装到默认路径：`C:\Program Files (x86)\NSIS`

---

## 📁 项目结构

```
logvpn-custom-client/
├── Services/                    # 核心服务类
│   ├── OAuthLoginService.cs     # OAuth 登录服务
│   ├── AutoSubscriptionService.cs # 自动订阅服务
│   ├── TrafficStatisticsService.cs # 流量统计服务
│   ├── DeviceFingerprintService.cs # 设备指纹服务
│   ├── AntiSharingService.cs    # 防共享服务
│   ├── AutoUpdateService.cs     # 自动更新服务
│   └── EncryptionService.cs     # 加密服务
├── UI/                          # 用户界面
│   ├── LoginWindow.xaml         # 登录窗口（XAML）
│   ├── LoginWindow.xaml.cs      # 登录窗口代码
│   └── MainWindow.xaml.cs       # 主窗口修改
├── Config/                      # 配置管理
│   └── ConfigManager.cs         # 配置管理器
├── Resources/                   # 资源文件
│   ├── Logos/                   # Logo 和图标
│   ├── Themes/                  # 主题文件
│   └── Strings/                 # 本地化字符串
├── CUSTOMIZATION_GUIDE.md       # 本文件
└── README.md                    # 项目说明
```

---

## 🔧 集成步骤

### 步骤 1：克隆 v2rayN 源代码

```bash
# 克隆官方 v2rayN 仓库
git clone https://github.com/2dust/v2rayN.git
cd v2rayN

# 切换到特定版本（推荐 v6.60）
git checkout v6.60
```

### 步骤 2：复制 LogVPN 定制文件

```bash
# 将 LogVPN 定制文件复制到 v2rayN 项目
cp -r logvpn-custom-client/Services v2rayN/v2rayN/
cp -r logvpn-custom-client/UI v2rayN/v2rayN/
cp -r logvpn-custom-client/Config v2rayN/v2rayN/
cp -r logvpn-custom-client/Resources v2rayN/v2rayN/
```

### 步骤 3：在 Visual Studio 中打开项目

1. 打开 Visual Studio 2022
2. 点击 **文件** → **打开** → **项目/解决方案**
3. 选择 `v2rayN/v2rayN.sln`
4. 等待项目加载完成

### 步骤 4：添加 NuGet 包

在 Visual Studio 中打开 **包管理器控制台**（Tools → NuGet Package Manager → Package Manager Console），执行以下命令：

```powershell
# 安装必要的 NuGet 包
Install-Package Newtonsoft.Json -Version 13.0.3
Install-Package System.Management
```

### 步骤 5：添加 LogVPN 源文件

1. 在 Visual Studio 中，右键点击 **v2rayN** 项目
2. 选择 **添加** → **现有项**
3. 选择 `Services/` 目录下的所有 `.cs` 文件
4. 重复上述步骤，添加 `UI/` 和 `Config/` 目录下的文件

### 步骤 6：修改主窗口

编辑 `v2rayN/MainWindow.xaml.cs`，在应用启动时显示登录窗口：

```csharp
// 在 MainWindow 的构造函数中添加
public MainWindow()
{
    InitializeComponent();

    // 检查是否已登录
    var config = ConfigManager.LoadConfig();
    if (string.IsNullOrEmpty(config?.AccessToken))
    {
        // 显示登录窗口
        var loginService = new OAuthLoginService("https://dj.siumingho.dpdns.org");
        var loginWindow = new LoginWindow(loginService);
        
        if (loginWindow.ShowDialog() == true)
        {
            // 登录成功，初始化自动订阅
            InitializeAutoSubscription();
        }
        else
        {
            // 登录失败，关闭应用
            Application.Current.Shutdown();
        }
    }
}
```

### 步骤 7：修改 AssemblyInfo.cs

编辑 `v2rayN/Properties/AssemblyInfo.cs`，修改程序信息：

```csharp
[assembly: AssemblyTitle("LogVPN")]
[assembly: AssemblyDescription("LogVPN - 安全、快速、全球")]
[assembly: AssemblyCompany("LogVPN")]
[assembly: AssemblyProduct("LogVPN")]
[assembly: AssemblyCopyright("Copyright © 2024 LogVPN")]
[assembly: AssemblyVersion("1.0.0.0")]
[assembly: AssemblyFileVersion("1.0.0.0")]
```

---

## 🎨 品牌定制

### 1. 替换应用图标

1. 准备一个 256×256 像素的 PNG 图标
2. 使用在线工具转换为 `.ico` 格式：https://convertio.co/png-ico/
3. 替换 `v2rayN/v2rayN.ico`

### 2. 修改窗口标题

编辑 `v2rayN/MainWindow.xaml`：

```xml
<Window x:Class="v2rayN.MainWindow"
        Title="LogVPN - 安全、快速、全球"
        ...>
```

### 3. 应用紫色主题

编辑 `v2rayN/MainWindow.xaml`，修改颜色：

```xml
<!-- 修改主题颜色为紫色 -->
<SolidColorBrush x:Key="PrimaryBrush" Color="#9C27B0"/>
<SolidColorBrush x:Key="AccentBrush" Color="#7B1FA2"/>
<SolidColorBrush x:Key="BackgroundBrush" Color="#1E1E1E"/>
```

### 4. 自定义启动画面

创建 `v2rayN/Resources/SplashScreen.xaml`：

```xml
<Window x:Class="v2rayN.SplashScreen"
        Title="LogVPN" Height="300" Width="400"
        WindowStyle="None" AllowsTransparency="True"
        Background="Transparent" WindowStartupLocation="CenterScreen">
    <Grid Background="#1E1E1E">
        <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="LogVPN" FontSize="48" FontWeight="Bold" 
                       Foreground="#9C27B0" TextAlignment="Center"/>
            <TextBlock Text="正在启动..." FontSize="14" 
                       Foreground="#AAAAAA" TextAlignment="Center" Margin="0,20,0,0"/>
            <ProgressBar Height="3" Background="#9C27B0" Margin="0,20,0,0" IsIndeterminate="True"/>
        </StackPanel>
    </Grid>
</Window>
```

---

## 🔨 编译和打包

### 步骤 1：编译项目

1. 在 Visual Studio 中，点击 **生成** → **生成解决方案**（或按 `Ctrl+Shift+B`）
2. 等待编译完成，检查输出窗口是否有错误

### 步骤 2：验证编译结果

编译完成后，检查输出目录：

```
v2rayN/bin/Release/
├── v2rayN.exe           # 主程序
├── v2rayN.exe.config    # 配置文件
├── v2rayUpgrade.exe     # 升级工具
└── ...其他依赖文件
```

### 步骤 3：准备安装程序脚本

使用提供的 `LogVPN_Installer.nsi` 文件（已在 `client-source-code/` 目录中）。

### 步骤 4：编译安装程序

1. 右键点击 `LogVPN_Installer.nsi`
2. 选择 **Compile NSIS Script**
3. 等待编译完成，生成 `LogVPN_Setup.exe`

### 步骤 5：验证安装程序

```bash
# 测试安装程序
LogVPN_Setup.exe

# 验证安装结果
# 应该在 C:\Program Files\LogVPN 目录下生成文件
```

---

## ✅ 测试和部署

### 功能测试清单

- [ ] **登录功能**
  - [ ] 使用正确的邮箱和密码登录
  - [ ] 使用错误的密码尝试登录
  - [ ] 记住密码功能
  - [ ] 自动登录功能

- [ ] **订阅功能**
  - [ ] 自动获取节点列表
  - [ ] 手动更新订阅
  - [ ] 节点显示正确
  - [ ] 节点延迟测试

- [ ] **连接功能**
  - [ ] 选择节点并连接
  - [ ] 切换不同节点
  - [ ] 断开连接
  - [ ] 连接状态显示

- [ ] **流量统计**
  - [ ] 实时流量显示
  - [ ] 流量上报到服务器
  - [ ] 流量统计准确性

- [ ] **界面风格**
  - [ ] 紫色主题应用正确
  - [ ] 登录窗口显示正常
  - [ ] 主窗口布局合理
  - [ ] 暗色主题适配

### 部署步骤

#### 1. 上传到服务器

```bash
# 通过 SCP 上传安装程序
scp LogVPN_Setup.exe root@155.94.160.248:/home/ubuntu/log-vpn/client/public/downloads/

# SSH 连接到服务器
ssh root@155.94.160.248

# 运行部署脚本
cd /home/ubuntu/log-vpn
./deploy-client.sh
```

#### 2. 更新下载页面

前端下载页面会自动从 `version.json` 读取最新版本信息。

#### 3. 通知用户

在网站上发布更新通知，告知用户下载新版本。

---

## 🚀 GitHub Actions 自动化

### 配置 GitHub Actions

创建 `.github/workflows/build-and-deploy.yml`：

```yaml
name: Build and Deploy LogVPN Client

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  build:
    runs-on: windows-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup .NET Framework
      uses: microsoft/setup-msbuild@v1
    
    - name: Build Solution
      run: msbuild v2rayN/v2rayN.sln /p:Configuration=Release
    
    - name: Build Installer
      run: |
        choco install nsis -y
        "C:\Program Files (x86)\NSIS\makensis.exe" LogVPN_Installer.nsi
    
    - name: Upload to Server
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        source: "LogVPN_Setup.exe"
        target: "/home/ubuntu/log-vpn/client/public/downloads/"
    
    - name: Deploy
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /home/ubuntu/log-vpn
          ./deploy-client.sh
```

### 配置 GitHub Secrets

在 GitHub 仓库的 **Settings** → **Secrets and variables** → **Actions** 中添加：

- `SSH_PRIVATE_KEY`：服务器 SSH 私钥
- `SERVER_HOST`：155.94.160.248
- `SERVER_USER`：root

---

## 📝 常见问题

### Q1: 编译时出现"找不到 v2rayN 项目"

**解决方案**：
1. 确保已克隆 v2rayN 源代码
2. 检查项目路径是否正确
3. 在 Visual Studio 中重新加载解决方案

### Q2: NuGet 包安装失败

**解决方案**：
1. 检查网络连接
2. 清除 NuGet 缓存：`nuget locals all -clear`
3. 更新 NuGet：`nuget update -self`

### Q3: 安装程序编译失败

**解决方案**：
1. 确保已安装 NSIS
2. 检查 NSIS 路径是否正确
3. 验证 `.nsi` 文件语法

### Q4: 登录窗口不显示

**解决方案**：
1. 检查 `LoginWindow.xaml` 是否正确添加到项目
2. 验证 `MainWindow.xaml.cs` 中的登录逻辑
3. 查看调试输出是否有错误信息

---

## 📚 参考资源

- **v2rayN 官方仓库**：https://github.com/2dust/v2rayN
- **v2rayN 文档**：https://github.com/2dust/v2rayN/wiki
- **NSIS 文档**：https://nsis.sourceforge.io/Docs/
- **WPF 教程**：https://docs.microsoft.com/en-us/dotnet/desktop/wpf/

---

## 📞 技术支持

如有问题，请联系：

- **邮箱**：siuminghe@gmail.com
- **Telegram**：@logvvpnbot

---

**最后更新**：2024-01-20

**版本**：1.0.0

感谢您的使用！🚀
