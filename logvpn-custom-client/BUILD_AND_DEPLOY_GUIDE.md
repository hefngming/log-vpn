# LogVPN 编译和部署完整指南

本指南提供了三种方式来编译、打包和部署 LogVPN 客户端：

1. **本地编译**（Windows 本地环境）
2. **GitHub Actions 自动编译**（云端自动化）
3. **服务器部署**（上传到服务器供用户下载）

---

## 📋 目录

1. [环境准备](#环境准备)
2. [本地编译流程](#本地编译流程)
3. [GitHub Actions 配置](#github-actions-配置)
4. [服务器部署](#服务器部署)
5. [测试和验证](#测试和验证)
6. [故障排除](#故障排除)

---

## 🛠️ 环境准备

### Windows 本地环境

#### 1. 安装 Visual Studio 2022 Community

1. 访问 https://visualstudio.microsoft.com/zh-hans/downloads/
2. 下载 Visual Studio 2022 Community 版本
3. 运行安装程序，选择以下工作负载：
   - ✅ **.NET 桌面开发**
   - ✅ **.NET Framework 4.8 开发工具**
   - ✅ **C++ 桌面开发**（可选）

#### 2. 安装 .NET Framework 4.8 SDK

```bash
# 从官方网站下载
https://dotnet.microsoft.com/download/dotnet-framework/net48

# 或使用 Chocolatey
choco install dotnetfx -y
```

#### 3. 安装 NSIS（用于打包安装程序）

1. 访问 https://nsis.sourceforge.io/Download
2. 下载 NSIS 3.x 版本
3. 运行安装程序，安装到默认路径：`C:\Program Files (x86)\NSIS`

#### 4. 安装 OpenSSH（用于部署）

```bash
# Windows 10/11 内置 OpenSSH，无需额外安装
# 如果未安装，可通过以下方式安装：

# 方式 1：使用 Settings 应用
# Settings → Apps → Apps & features → Optional features → Add a feature → OpenSSH Client

# 方式 2：使用 PowerShell（管理员）
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

#### 5. 克隆 v2rayN 源代码

```bash
# 打开 PowerShell 或 Command Prompt
cd C:\Projects  # 或您的工作目录

# 克隆 v2rayN 仓库
git clone https://github.com/2dust/v2rayN.git
cd v2rayN

# 切换到特定版本（推荐 v6.60）
git checkout v6.60
```

---

## 🔨 本地编译流程

### 步骤 1：准备源代码

```bash
# 进入 v2rayN 项目目录
cd C:\Projects\v2rayN

# 复制 LogVPN 定制文件
# 将 logvpn-custom-client 目录中的文件复制到 v2rayN 项目中
copy logvpn-custom-client\Services\*.cs v2rayN\Services\
copy logvpn-custom-client\UI\*.xaml* v2rayN\UI\
copy logvpn-custom-client\Config\*.cs v2rayN\Config\
```

### 步骤 2：在 Visual Studio 中打开项目

1. 打开 Visual Studio 2022
2. 点击 **文件** → **打开** → **项目/解决方案**
3. 选择 `v2rayN\v2rayN.sln`
4. 等待项目加载完成

### 步骤 3：添加 NuGet 包

在 Visual Studio 中打开 **包管理器控制台**（Tools → NuGet Package Manager → Package Manager Console）：

```powershell
# 安装必要的 NuGet 包
Install-Package Newtonsoft.Json -Version 13.0.3
Install-Package System.Management
```

### 步骤 4：编译项目

#### 方式 A：使用 PowerShell 脚本（推荐）

```powershell
# 进入项目目录
cd C:\Projects\v2rayN

# 运行编译脚本
.\build.ps1 -Action compile -Configuration Release -Platform x64

# 或者打包成安装程序
.\build.ps1 -Action package -Configuration Release -Platform x64
```

#### 方式 B：使用 Visual Studio GUI

1. 在 Visual Studio 中，点击 **生成** → **生成解决方案**（或按 `Ctrl+Shift+B`）
2. 等待编译完成，检查输出窗口是否有错误

#### 方式 C：使用命令行 MSBuild

```bash
# 打开 Developer Command Prompt for Visual Studio 2022

# 编译项目
msbuild v2rayN\v2rayN.sln /p:Configuration=Release /p:Platform=x64 /m

# 验证编译结果
dir v2rayN\bin\Release\x64\
```

### 步骤 5：验证编译结果

编译完成后，检查输出目录中是否存在以下文件：

```
v2rayN\bin\Release\x64\
├── v2rayN.exe              ✓ 必需
├── v2rayN.exe.config       ✓ 必需
├── v2rayUpgrade.exe        ✓ 必需
├── Newtonsoft.Json.dll     ✓ 必需
└── ...其他依赖文件
```

---

## 📦 打包安装程序

### 步骤 1：使用 NSIS 打包

```powershell
# 进入项目目录
cd C:\Projects\v2rayN

# 使用 PowerShell 脚本打包
.\build.ps1 -Action package

# 或者手动使用 NSIS
$nsisPath = "C:\Program Files (x86)\NSIS\makensis.exe"
& $nsisPath LogVPN_Installer.nsi
```

### 步骤 2：验证安装程序

```powershell
# 检查文件大小（应该在 30-50 MB 之间）
(Get-Item "LogVPN_Setup.exe").Length / 1MB

# 计算 MD5 和 SHA256 校验和
(Get-FileHash "LogVPN_Setup.exe" -Algorithm MD5).Hash
(Get-FileHash "LogVPN_Setup.exe" -Algorithm SHA256).Hash
```

### 步骤 3：测试安装程序

```powershell
# 创建测试目录
New-Item -ItemType Directory -Path "C:\LogVPN_Test" -Force

# 运行安装程序（静默模式）
& "LogVPN_Setup.exe" /S /D="C:\LogVPN_Test"

# 验证安装结果
Test-Path "C:\LogVPN_Test\v2rayN.exe"

# 启动应用测试
& "C:\LogVPN_Test\v2rayN.exe"
```

---

## 🚀 GitHub Actions 配置

### 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库 `logvpn-client`
3. 克隆到本地：

```bash
git clone https://github.com/YOUR_USERNAME/logvpn-client.git
cd logvpn-client
```

### 步骤 2：上传源代码

```bash
# 复制所有源代码到仓库
cp -r logvpn-custom-client/* .

# 添加 v2rayN 作为子模块
git submodule add https://github.com/2dust/v2rayN.git v2rayN

# 提交并推送
git add .
git commit -m "Initial commit: LogVPN client customization"
git push origin main
```

### 步骤 3：配置 GitHub Secrets

1. 访问仓库的 **Settings** → **Secrets and variables** → **Actions**
2. 添加以下 Secrets：

| Secret 名称 | 值 | 说明 |
|-----------|-----|------|
| `SSH_PRIVATE_KEY` | 您的 SSH 私钥内容 | 用于连接服务器 |
| `SERVER_HOST` | `155.94.160.248` | 服务器 IP 地址 |
| `SERVER_USER` | `root` | 服务器用户名 |

#### 生成 SSH 密钥对

```bash
# 在本地生成 SSH 密钥
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_deploy

# 将公钥添加到服务器
ssh-copy-id -i ~/.ssh/github_deploy.pub root@155.94.160.248

# 复制私钥内容到 GitHub Secrets
cat ~/.ssh/github_deploy | clip  # Windows
cat ~/.ssh/github_deploy | pbcopy  # macOS
cat ~/.ssh/github_deploy | xclip -selection clipboard  # Linux
```

### 步骤 4：触发自动编译

#### 方式 A：通过 Git Tag 触发

```bash
# 创建版本标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送标签到 GitHub
git push origin v1.0.0

# GitHub Actions 会自动开始编译和部署
```

#### 方式 B：通过 Push 触发

```bash
# 直接推送到 main 分支
git push origin main

# GitHub Actions 会自动开始编译
```

#### 方式 C：手动触发

1. 访问仓库的 **Actions** 标签
2. 选择 **Build and Release LogVPN Client** 工作流
3. 点击 **Run workflow** 按钮

### 步骤 5：监控编译进度

1. 访问仓库的 **Actions** 标签
2. 查看最新的工作流运行
3. 点击工作流查看详细日志

---

## 📤 服务器部署

### 步骤 1：手动上传安装程序

```bash
# 从本地上传到服务器
scp -i ~/.ssh/id_rsa LogVPN_Setup.exe root@155.94.160.248:/home/ubuntu/log-vpn/client/public/downloads/

# 验证上传
ssh -i ~/.ssh/id_rsa root@155.94.160.248 "ls -lh /home/ubuntu/log-vpn/client/public/downloads/"
```

### 步骤 2：更新版本信息

```bash
# SSH 连接到服务器
ssh -i ~/.ssh/id_rsa root@155.94.160.248

# 进入下载目录
cd /home/ubuntu/log-vpn/client/public/downloads/

# 创建版本信息文件
cat > version.json << 'EOF'
{
  "version": "1.0.0",
  "filename": "LogVPN_Setup.exe",
  "size_mb": 45.5,
  "md5": "abc123def456...",
  "sha256": "def456abc123...",
  "download_url": "https://dj.siumingho.dpdns.org/downloads/LogVPN_Setup.exe",
  "release_notes": "首个正式版本发布",
  "release_date": "2024-01-20",
  "required": true
}
EOF

# 更新权限
chmod 644 version.json LogVPN_Setup.exe
```

### 步骤 3：更新前端下载页面

编辑 `client/src/pages/Download.tsx`，添加自动版本检查：

```typescript
import { useEffect, useState } from 'react';

export function DownloadPage() {
  const [versionInfo, setVersionInfo] = useState(null);

  useEffect(() => {
    // 从服务器获取版本信息
    fetch('/downloads/version.json')
      .then(res => res.json())
      .then(data => setVersionInfo(data));
  }, []);

  return (
    <div>
      <h1>下载 LogVPN</h1>
      {versionInfo && (
        <>
          <p>最新版本: {versionInfo.version}</p>
          <p>文件大小: {versionInfo.size_mb} MB</p>
          <p>MD5: {versionInfo.md5}</p>
          <a href={versionInfo.download_url}>
            立即下载 LogVPN_Setup.exe
          </a>
        </>
      )}
    </div>
  );
}
```

---

## ✅ 测试和验证

### 功能测试清单

- [ ] **登录功能**
  - [ ] 使用正确的邮箱和密码登录
  - [ ] 使用错误的密码尝试登录
  - [ ] 记住密码功能正常
  - [ ] 自动登录功能正常

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

### 性能测试

```bash
# 测试安装程序启动时间
time LogVPN_Setup.exe /S /D="C:\LogVPN_Perf"

# 测试应用启动时间
time "C:\LogVPN_Perf\v2rayN.exe"

# 监控内存使用
# 使用 Windows 任务管理器查看内存占用
```

---

## 🔧 故障排除

### 问题 1：编译失败 - "找不到 MSBuild"

**解决方案**：
1. 确保已安装 Visual Studio 2022
2. 检查 MSBuild 路径：`C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin\MSBuild.exe`
3. 在 PowerShell 中运行：`$env:Path += ";C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin"`

### 问题 2：编译失败 - "NuGet 包未找到"

**解决方案**：
1. 在 Visual Studio 中打开包管理器控制台
2. 运行：`Update-Package -Reinstall`
3. 或手动清除 NuGet 缓存：`nuget locals all -clear`

### 问题 3：NSIS 打包失败

**解决方案**：
1. 确保已安装 NSIS 3.x
2. 检查 NSIS 路径：`C:\Program Files (x86)\NSIS\makensis.exe`
3. 验证 `.nsi` 文件语法是否正确

### 问题 4：GitHub Actions 编译失败

**解决方案**：
1. 检查 GitHub Actions 日志
2. 确保所有 Secrets 已正确配置
3. 验证 SSH 密钥对是否有效

### 问题 5：部署失败 - SSH 连接错误

**解决方案**：
1. 验证 SSH 密钥权限：`chmod 600 ~/.ssh/id_rsa`
2. 测试 SSH 连接：`ssh -i ~/.ssh/id_rsa root@155.94.160.248`
3. 检查服务器防火墙设置

---

## 📚 参考资源

- **v2rayN 官方仓库**：https://github.com/2dust/v2rayN
- **Visual Studio 文档**：https://docs.microsoft.com/en-us/visualstudio/
- **NSIS 文档**：https://nsis.sourceforge.io/Docs/
- **GitHub Actions 文档**：https://docs.github.com/en/actions

---

## 📞 技术支持

如有问题，请联系：

- **邮箱**：siuminghe@gmail.com
- **Telegram**：@logvvpnbot
- **GitHub Issues**：https://github.com/YOUR_USERNAME/logvpn-client/issues

---

**最后更新**：2024-01-20

**版本**：1.0.0

祝您编译顺利！🚀
