# LogVPN 三步完整实现指南

本指南提供了三个关键步骤的完整实现方案：
1. **本地编译测试** - 验证编译环境和编译结果
2. **GitHub Actions CI/CD** - 自动化编译和部署
3. **安装程序优化** - 自动启动、快捷方式、自动更新

---

## 📋 目录

1. [步骤 1：本地编译测试](#步骤-1本地编译测试)
2. [步骤 2：GitHub Actions CI/CD](#步骤-2github-actions-cicd)
3. [步骤 3：安装程序优化](#步骤-3安装程序优化)
4. [完整工作流](#完整工作流)

---

## 🔨 步骤 1：本地编译测试

### 1.1 环境验证

在 Windows 环境中运行验证脚本：

```powershell
# 进入项目目录
cd C:\Projects\logvpn-client

# 运行环境验证
.\test-build.ps1 -Action verify

# 输出示例：
# [14:30:45] [Info] LogVPN 编译环境检查
# [14:30:46] [Success] ✓ Visual Studio 2022 Community 已安装
# [14:30:47] [Success] ✓ MSBuild 已安装
# [14:30:48] [Success] ✓ NSIS 已安装
# [14:30:49] [Success] 环境检查完成：所有必需组件已安装 ✓
```

### 1.2 编译项目

```powershell
# 运行编译脚本
.\build.ps1 -Action compile -Configuration Release -Platform x64

# 或者一键打包（编译 + 打包）
.\build.ps1 -Action package -Configuration Release -Platform x64
```

### 1.3 验证编译输出

```powershell
# 检查编译输出
.\test-build.ps1 -Action output

# 输出示例：
# [14:35:20] [Success] ✓ v2rayN.exe (15.2 MB)
# [14:35:21] [Success] ✓ v2rayN.exe.config (2.1 KB)
# [14:35:22] [Success] ✓ v2rayUpgrade.exe (8.5 MB)
# [14:35:23] [Success] ✓ 找到 25 个 DLL 文件
```

### 1.4 验证安装程序

```powershell
# 检查安装程序
.\test-build.ps1 -Action installer

# 输出示例：
# [14:40:10] [Info] 文件大小: 45.5 MB
# [14:40:11] [Success] ✓ 文件大小正常
# [14:40:12] [Verbose] MD5: abc123def456...
# [14:40:13] [Verbose] SHA256: def456abc123...
```

### 1.5 测试安装

```powershell
# 运行安装测试
.\test-build.ps1 -Action install

# 输出示例：
# [14:45:30] [Info] 运行安装程序（静默模式）...
# [14:45:35] [Success] ✓ 应用程序已安装
# [14:45:36] [Success] 安装测试完成 ✓
```

### 1.6 完整测试

```powershell
# 运行所有测试
.\test-build.ps1 -Action all

# 这会依次执行：
# 1. 环境验证
# 2. 编译输出检查
# 3. 安装程序验证
# 4. 安装测试
# 5. 生成测试报告
```

---

## 🚀 步骤 2：GitHub Actions CI/CD

### 2.1 生成 SSH 密钥对

```bash
# 生成 SSH 密钥对
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_deploy -N ""

# 将公钥添加到服务器
ssh-copy-id -i ~/.ssh/github_deploy.pub root@155.94.160.248

# 测试连接
ssh -i ~/.ssh/github_deploy root@155.94.160.248 "echo 'SSH 连接成功'"
```

### 2.2 配置 GitHub Secrets

1. 访问 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 添加以下 Secrets：

```
SSH_PRIVATE_KEY = <复制 ~/.ssh/github_deploy 的内容>
SERVER_HOST = 155.94.160.248
SERVER_USER = root
```

### 2.3 创建 GitHub 仓库

```bash
# 初始化本地 Git 仓库
cd C:\Projects\logvpn-client
git init

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/logvpn-client.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: LogVPN client customization"

# 推送
git push -u origin main
```

### 2.4 触发自动编译

#### 方式 A：通过 Git Tag（推荐）

```bash
# 创建版本标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送标签
git push origin v1.0.0

# GitHub Actions 会自动开始编译和部署
```

#### 方式 B：通过 Push

```bash
# 直接推送到 main 分支
git push origin main

# GitHub Actions 会自动开始编译
```

#### 方式 C：手动触发

1. 访问 GitHub 仓库 → **Actions**
2. 选择 **Build and Release LogVPN Client**
3. 点击 **Run workflow** → **Run workflow**

### 2.5 监控编译进度

1. 访问 GitHub 仓库 → **Actions**
2. 查看最新的工作流运行
3. 点击工作流查看详细日志

### 2.6 验证部署

```bash
# SSH 连接到服务器
ssh -i ~/.ssh/github_deploy root@155.94.160.248

# 检查文件是否已上传
ls -lh /home/ubuntu/log-vpn/client/public/downloads/LogVPN_Setup.exe

# 输出示例：
# -rw-r--r-- 1 root root 45.5M Jan 20 14:50 LogVPN_Setup.exe
```

---

## 🎨 步骤 3：安装程序优化

### 3.1 自动启动功能

**文件**：`LogVPN_Installer_Enhanced.nsi`

在安装程序中添加了自动启动选项：

```nsi
; 用户可以在安装时选择是否自动启动
${NSD_CreateCheckbox} 10 40 100% 12 "安装后自动启动 LogVPN"
Pop $AutoStart
${NSD_SetState} $AutoStart ${BST_CHECKED}

; 安装完成后自动启动
Function .onInstSuccess
    ${If} $AutoStart == 1
        ExecShell "open" "$INSTDIR\v2rayN.exe"
    ${EndIf}
FunctionEnd
```

### 3.2 快捷方式优化

```nsi
; 创建开始菜单快捷方式
CreateDirectory "$SMPROGRAMS\$StartMenuFolder"
CreateShortCut "$SMPROGRAMS\$StartMenuFolder\LogVPN.lnk" "$INSTDIR\v2rayN.exe"

; 创建桌面快捷方式（可选）
${If} $CreateDesktopShortcut == 1
    CreateShortCut "$DESKTOP\LogVPN.lnk" "$INSTDIR\v2rayN.exe"
${EndIf}
```

### 3.3 自动更新检查

**文件**：`Services/AutoUpdateService.cs`

核心功能：

```csharp
// 检查新版本
public async Task<bool> CheckForUpdatesAsync()
{
    var response = await _httpClient.GetAsync(VERSION_CHECK_URL);
    var versionInfo = JsonSerializer.Deserialize<VersionInfo>(content);
    var hasUpdate = CompareVersions(versionInfo.Version, CURRENT_VERSION) > 0;
    return hasUpdate;
}

// 下载更新
public async Task<bool> DownloadUpdateAsync(string filename, string destinationPath)
{
    // 下载文件并报告进度
}

// 验证文件完整性
public bool VerifyDownloadedFile(string filePath, string expectedMd5)
{
    var actualMd5 = CalculateMd5(filePath);
    return actualMd5.Equals(expectedMd5);
}

// 安装更新
public bool InstallUpdate(string installerPath)
{
    // 启动安装程序
}
```

### 3.4 更新提示窗口

**文件**：
- `UI/UpdateNotificationWindow.xaml` - 界面设计
- `UI/UpdateNotificationWindow.xaml.cs` - 逻辑处理

功能特性：

- ✅ 显示新版本信息
- ✅ 显示发布说明
- ✅ 实时下载进度
- ✅ 文件完整性验证
- ✅ 自动安装更新

### 3.5 集成自动更新到主窗口

在应用启动时检查更新：

```csharp
// 在 App.xaml.cs 或 MainWindow.xaml.cs 中
private async void CheckForUpdates()
{
    var updateService = new AutoUpdateService();
    var hasUpdate = await updateService.CheckForUpdatesAsync();
    
    if (hasUpdate)
    {
        var window = new UpdateNotificationWindow(versionInfo);
        window.ShowDialog();
    }
}

// 在应用启动时调用
public partial class App : Application
{
    protected override void OnStartup(StartupEventArgs e)
    {
        base.OnStartup(e);
        CheckForUpdates();
    }
}
```

---

## 🔄 完整工作流

### 开发流程

```
1. 本地开发
   ↓
2. 本地编译测试（.\build.ps1 -Action package）
   ↓
3. 验证编译结果（.\test-build.ps1 -Action all）
   ↓
4. 提交到 Git
   git add .
   git commit -m "feat: Add new feature"
   ↓
5. 推送到 GitHub
   git push origin main
   ↓
6. 创建版本标签
   git tag -a v1.0.1 -m "Release"
   git push origin v1.0.1
   ↓
7. GitHub Actions 自动编译
   ↓
8. 自动部署到服务器
   ↓
9. 用户从下载页面获取最新版本
```

### 版本管理

```bash
# 查看所有标签
git tag

# 创建新版本
git tag -a v1.0.1 -m "Bug fix release"

# 推送标签
git push origin v1.0.1

# 删除本地标签
git tag -d v1.0.1

# 删除远程标签
git push origin --delete v1.0.1
```

---

## ✅ 完整检查清单

### 本地编译测试
- [ ] 环境验证通过
- [ ] 编译成功完成
- [ ] 编译输出文件完整
- [ ] 安装程序生成成功
- [ ] 安装测试通过
- [ ] 所有测试报告已生成

### GitHub Actions CI/CD
- [ ] SSH 密钥对已生成
- [ ] 公钥已添加到服务器
- [ ] GitHub Secrets 已配置
- [ ] GitHub 仓库已创建
- [ ] 源代码已上传
- [ ] 工作流文件已添加
- [ ] 手动触发工作流成功
- [ ] 自动编译成功
- [ ] 自动部署成功

### 安装程序优化
- [ ] 自动启动功能正常
- [ ] 快捷方式创建正确
- [ ] 卸载前确认对话框显示
- [ ] 自动更新检查功能正常
- [ ] 更新提示窗口显示正确
- [ ] 文件完整性验证正常
- [ ] 自动安装更新成功

---

## 📊 性能指标

| 指标 | 目标 | 实际 |
|-----|-----|------|
| 本地编译时间 | < 5 分钟 | - |
| GitHub Actions 编译时间 | < 15 分钟 | - |
| 安装程序大小 | 40-50 MB | - |
| 安装时间 | < 2 分钟 | - |
| 更新下载速度 | > 1 MB/s | - |

---

## 🔧 故障排除

### 编译失败
- 检查 Visual Studio 是否正确安装
- 运行 `.\test-build.ps1 -Action verify` 验证环境
- 查看编译日志找出具体错误

### GitHub Actions 失败
- 检查 GitHub Secrets 是否正确配置
- 验证 SSH 密钥对是否有效
- 查看 Actions 日志找出具体错误

### 更新功能不工作
- 检查 version.json 文件是否存在
- 验证下载 URL 是否正确
- 检查文件 MD5 校验和是否匹配

---

## 📞 获取帮助

- **编译指南**：查看 `BUILD_AND_DEPLOY_GUIDE.md`
- **GitHub Actions 指南**：查看 `GITHUB_ACTIONS_SETUP.md`
- **快速开始**：查看 `QUICK_START.md`

---

**祝您实现顺利！🚀**
