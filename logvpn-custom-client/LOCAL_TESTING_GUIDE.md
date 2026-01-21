# LogVPN 本地编译测试完整指南

本指南提供了在 Windows 本地环境中进行完整编译测试的详细步骤。

---

## 📋 目录

1. [前置条件检查](#前置条件检查)
2. [环境准备](#环境准备)
3. [源代码准备](#源代码准备)
4. [编译测试](#编译测试)
5. [测试验证](#测试验证)
6. [故障排除](#故障排除)

---

## ✅ 前置条件检查

在开始测试前，请确保您的 Windows 系统满足以下条件：

| 项目 | 要求 | 检查方法 |
|-----|-----|--------|
| **操作系统** | Windows 10/11 64位 | 右键 "此电脑" → 属性 |
| **磁盘空间** | 至少 50 GB 可用空间 | 右键 C: 盘 → 属性 |
| **内存** | 至少 8 GB RAM | 任务管理器 → 性能 |
| **网络** | 稳定的互联网连接 | 测试网络连接 |

---

## 🛠️ 环境准备

### 步骤 1：安装 Visual Studio 2022 Community

**如果已安装，跳过此步骤**

1. 访问 https://visualstudio.microsoft.com/zh-hans/downloads/
2. 下载 Visual Studio 2022 Community 版本
3. 运行安装程序
4. 选择工作负载：
   - ✅ **.NET 桌面开发**
   - ✅ **.NET Framework 4.8 开发工具**
5. 点击"安装"并等待完成（约 30-60 分钟）

**验证安装**：
```powershell
# 打开 PowerShell（管理员）
$vsPath = "C:\Program Files\Microsoft Visual Studio\2022\Community"
Test-Path $vsPath
# 应该返回 True
```

### 步骤 2：安装 .NET Framework 4.8 SDK

**如果已安装，跳过此步骤**

1. 访问 https://dotnet.microsoft.com/download/dotnet-framework/net48
2. 下载 .NET Framework 4.8 Runtime
3. 运行安装程序并完成安装

**验证安装**：
```powershell
# 打开 PowerShell
[System.Runtime.InteropServices.RuntimeInformation]::FrameworkDescription
# 应该显示 .NET Framework 4.x.x
```

### 步骤 3：安装 NSIS

**如果已安装，跳过此步骤**

1. 访问 https://nsis.sourceforge.io/Download
2. 下载 NSIS 3.x 版本
3. 运行安装程序，安装到默认路径：`C:\Program Files (x86)\NSIS`

**验证安装**：
```powershell
# 打开 PowerShell
$nsisPath = "C:\Program Files (x86)\NSIS\makensis.exe"
Test-Path $nsisPath
# 应该返回 True
```

### 步骤 4：安装 Git

**如果已安装，跳过此步骤**

1. 访问 https://git-scm.com/download/win
2. 下载 Git for Windows
3. 运行安装程序，使用默认设置

**验证安装**：
```powershell
# 打开 PowerShell
git --version
# 应该显示版本信息
```

---

## 📦 源代码准备

### 步骤 1：创建工作目录

```powershell
# 打开 PowerShell（管理员）

# 创建工作目录
New-Item -ItemType Directory -Path "C:\LogVPN_Build" -Force
cd C:\LogVPN_Build
```

### 步骤 2：克隆 v2rayN 源代码

```powershell
# 克隆 v2rayN 仓库
git clone https://github.com/2dust/v2rayN.git
cd v2rayN

# 切换到特定版本（推荐 v6.60）
git checkout v6.60

# 验证克隆成功
dir
# 应该看到 v2rayN 文件夹
```

### 步骤 3：复制 LogVPN 定制文件

```powershell
# 返回工作目录
cd C:\LogVPN_Build

# 从您下载的 LogVPN 源代码中复制文件
# 假设您已解压到 C:\LogVPN_Source

# 复制服务类文件
Copy-Item "C:\LogVPN_Source\logvpn-custom-client\Services\*.cs" `
          "C:\LogVPN_Build\v2rayN\v2rayN\Services\" -Force

# 复制 UI 文件
Copy-Item "C:\LogVPN_Source\logvpn-custom-client\UI\*.xaml*" `
          "C:\LogVPN_Build\v2rayN\v2rayN\UI\" -Force

# 复制配置文件
Copy-Item "C:\LogVPN_Source\logvpn-custom-client\Config\*.cs" `
          "C:\LogVPN_Build\v2rayN\v2rayN\Config\" -Force

# 复制编译脚本
Copy-Item "C:\LogVPN_Source\logvpn-custom-client\build.ps1" `
          "C:\LogVPN_Build\v2rayN\" -Force

Copy-Item "C:\LogVPN_Source\logvpn-custom-client\test-build.ps1" `
          "C:\LogVPN_Build\v2rayN\" -Force

# 复制 NSIS 脚本
Copy-Item "C:\LogVPN_Source\logvpn-custom-client\LogVPN_Installer_Enhanced.nsi" `
          "C:\LogVPN_Build\v2rayN\" -Force

# 验证文件复制成功
dir "C:\LogVPN_Build\v2rayN\Services\" | grep -i logvpn
```

### 步骤 4：验证项目结构

```powershell
# 检查项目结构
cd C:\LogVPN_Build\v2rayN

# 应该看到以下文件
Test-Path ".\v2rayN.sln"              # 应该返回 True
Test-Path ".\build.ps1"                # 应该返回 True
Test-Path ".\test-build.ps1"           # 应该返回 True
Test-Path ".\LogVPN_Installer_Enhanced.nsi"  # 应该返回 True
```

---

## 🔨 编译测试

### 步骤 1：运行环境验证

```powershell
# 进入项目目录
cd C:\LogVPN_Build\v2rayN

# 运行环境验证脚本
.\test-build.ps1 -Action verify

# 预期输出：
# [14:30:45] [Info] LogVPN 编译环境检查
# [14:30:46] [Success] ✓ Visual Studio 2022 Community 已安装
# [14:30:47] [Success] ✓ MSBuild 已安装
# [14:30:48] [Success] ✓ NSIS 已安装
# [14:30:49] [Success] 环境检查完成：所有必需组件已安装 ✓
```

**如果环境验证失败**：
- 检查是否所有必需软件都已安装
- 查看 [故障排除](#故障排除) 部分

### 步骤 2：编译项目

```powershell
# 方式 A：仅编译（不打包）
.\build.ps1 -Action compile -Configuration Release -Platform x64

# 或者方式 B：编译 + 打包（推荐）
.\build.ps1 -Action package -Configuration Release -Platform x64

# 预期输出：
# [14:35:20] [Info] 开始编译项目...
# [14:35:25] [Info] 清理之前的编译文件...
# [14:35:30] [Info] 编译 Release 配置...
# [14:36:00] [Success] 编译成功 ✓
# [14:36:05] [Info] 打包安装程序...
# [14:36:30] [Success] 安装程序打包成功 ✓
```

**编译时间预期**：
- 首次编译：10-15 分钟（包括依赖下载）
- 后续编译：5-10 分钟

### 步骤 3：检查编译输出

```powershell
# 检查编译输出目录
dir ".\v2rayN\bin\Release\x64\"

# 应该看到以下文件：
# v2rayN.exe              (15-20 MB)
# v2rayN.exe.config       (2-3 KB)
# v2rayUpgrade.exe        (8-10 MB)
# 以及多个 .dll 文件

# 检查安装程序
dir ".\LogVPN_Setup.exe"

# 应该看到：
# LogVPN_Setup.exe        (40-50 MB)
```

---

## ✅ 测试验证

### 步骤 1：验证编译输出

```powershell
# 运行编译输出验证
.\test-build.ps1 -Action output

# 预期输出：
# [14:40:10] [Success] ✓ v2rayN.exe (15.2 MB)
# [14:40:11] [Success] ✓ v2rayN.exe.config (2.1 KB)
# [14:40:12] [Success] ✓ v2rayUpgrade.exe (8.5 MB)
# [14:40:13] [Success] ✓ 找到 25 个 DLL 文件
# [14:40:14] [Success] 编译输出检查完成 ✓
```

### 步骤 2：验证安装程序

```powershell
# 运行安装程序验证
.\test-build.ps1 -Action installer

# 预期输出：
# [14:45:10] [Info] 文件大小: 45.5 MB
# [14:45:11] [Success] ✓ 文件大小正常
# [14:45:12] [Verbose] MD5: abc123def456...
# [14:45:13] [Verbose] SHA256: def456abc123...
# [14:45:14] [Success] 安装程序检查完成 ✓
```

**记录以下信息**（用于后续验证）：
- 文件大小：___________ MB
- MD5 校验和：___________________________
- SHA256 校验和：_________________________

### 步骤 3：测试安装

```powershell
# 运行安装测试
.\test-build.ps1 -Action install

# 预期输出：
# [14:50:30] [Info] 运行安装程序（静默模式）...
# [14:50:35] [Success] ✓ 应用程序已安装
# [14:50:36] [Success] 安装测试完成 ✓
```

**验证安装结果**：
```powershell
# 检查应用是否已安装
Test-Path "C:\LogVPN_InstallTest\v2rayN.exe"
# 应该返回 True

# 检查快捷方式
Test-Path "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\LogVPN\LogVPN.lnk"
# 应该返回 True

# 检查桌面快捷方式
Test-Path "$env:USERPROFILE\Desktop\LogVPN.lnk"
# 应该返回 True
```

### 步骤 4：运行完整测试

```powershell
# 运行所有测试
.\test-build.ps1 -Action all

# 这会依次执行：
# 1. 环境验证
# 2. 编译输出检查
# 3. 安装程序验证
# 4. 安装测试
# 5. 生成测试报告

# 预期总时间：15-20 分钟
```

### 步骤 5：查看测试报告

```powershell
# 查看生成的测试报告
type ".\build-test-report.txt"

# 应该包含以下内容：
# LogVPN 编译测试报告
# 生成时间: 2024-01-20 14:55:30
# 
# 系统信息:
#   操作系统: Windows 11 Pro
#   处理器: Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz
#   内存: 16 GB
#
# 编译配置:
#   配置: Release
#   平台: x64
```

---

## 🧪 功能测试

### 测试 1：应用启动

```powershell
# 启动应用
& "C:\LogVPN_InstallTest\v2rayN.exe"

# 预期结果：
# ✓ 应用窗口打开
# ✓ 显示登录界面
# ✓ 应用响应正常
```

### 测试 2：登录功能

1. 打开应用
2. 输入测试账号和密码
3. 点击登录

**预期结果**：
- ✓ 登录成功
- ✓ 显示节点列表
- ✓ 自动获取订阅

### 测试 3：节点连接

1. 选择一个节点
2. 点击连接

**预期结果**：
- ✓ 连接状态变为"已连接"
- ✓ 显示连接信息
- ✓ 流量开始计数

### 测试 4：流量统计

1. 连接节点后等待 30 秒
2. 查看流量统计

**预期结果**：
- ✓ 显示上传/下载流量
- ✓ 流量数值不为零
- ✓ 流量数据准确

### 测试 5：设置界面

1. 打开设置
2. 查看各个选项

**预期结果**：
- ✓ 所有选项正常显示
- ✓ 设置可以修改
- ✓ 设置可以保存

---

## 🔧 故障排除

### 问题 1：编译失败 - "找不到 MSBuild"

**错误信息**：
```
MSBuild : error : The specified solution configuration "Release|x64" is not valid.
```

**解决方案**：
1. 检查 Visual Studio 是否正确安装
2. 运行 `.\test-build.ps1 -Action verify` 验证环境
3. 重新启动 PowerShell（管理员）
4. 检查 MSBuild 路径：
   ```powershell
   $msbuildPath = "C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin\MSBuild.exe"
   Test-Path $msbuildPath
   ```

### 问题 2：编译失败 - "NuGet 包未找到"

**错误信息**：
```
NuGet package 'Newtonsoft.Json' version '13.0.3' not found
```

**解决方案**：
1. 在 Visual Studio 中打开包管理器控制台
2. 运行：`Update-Package -Reinstall`
3. 或清除 NuGet 缓存：`nuget locals all -clear`
4. 重新编译

### 问题 3：NSIS 打包失败

**错误信息**：
```
NSIS error: Script syntax error
```

**解决方案**：
1. 检查 NSIS 是否已安装到 `C:\Program Files (x86)\NSIS`
2. 验证 `.nsi` 文件语法
3. 尝试手动运行 NSIS：
   ```powershell
   $nsisPath = "C:\Program Files (x86)\NSIS\makensis.exe"
   & $nsisPath ".\LogVPN_Installer_Enhanced.nsi"
   ```

### 问题 4：安装测试失败

**错误信息**：
```
安装程序安装失败
```

**解决方案**：
1. 检查磁盘空间是否充足
2. 检查是否有其他应用占用文件
3. 尝试以管理员身份运行
4. 查看 Windows 事件查看器中的错误日志

### 问题 5：应用启动失败

**错误信息**：
```
应用程序无法启动
```

**解决方案**：
1. 检查 .NET Framework 4.8 是否已安装
2. 检查依赖 DLL 文件是否完整
3. 查看 Windows 事件查看器中的错误日志
4. 尝试重新安装应用

---

## 📝 测试结果记录

请在测试完成后填写以下信息：

```
测试日期：_____________
测试人员：_____________
Windows 版本：_____________
Visual Studio 版本：_____________

环境验证：□ 通过  □ 失败
编译测试：□ 通过  □ 失败
输出验证：□ 通过  □ 失败
安装程序验证：□ 通过  □ 失败
安装测试：□ 通过  □ 失败

文件大小：_____________
MD5 校验和：_____________
SHA256 校验和：_____________

功能测试：
- 应用启动：□ 通过  □ 失败
- 登录功能：□ 通过  □ 失败
- 节点连接：□ 通过  □ 失败
- 流量统计：□ 通过  □ 失败
- 设置界面：□ 通过  □ 失败

备注：
_____________________________________________
_____________________________________________
_____________________________________________
```

---

## 📞 获取帮助

如果遇到问题，请：

1. 查看 [故障排除](#故障排除) 部分
2. 查看 `build-test-report.txt` 中的详细日志
3. 检查 Windows 事件查看器中的错误信息
4. 联系技术支持：siuminghe@gmail.com

---

**祝您测试顺利！🚀**
