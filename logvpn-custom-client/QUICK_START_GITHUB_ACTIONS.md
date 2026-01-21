# GitHub Actions 快速启动指南

**目标**：在 30 分钟内完成 GitHub Actions 配置并获得可安装的 LogVPN 客户端。

---

## 🚀 快速开始（5 个步骤）

### 步骤 1：创建 GitHub 仓库（2 分钟）

访问 https://github.com/new 并创建仓库：
- 仓库名称：`logvpn-client`
- 可见性：Public
- 点击 "Create repository"

### 步骤 2：运行自动化脚本（3 分钟）

打开 PowerShell (管理员) 并运行：

```powershell
cd C:\path\to\logvpn-custom-client
.\setup-github-automation.ps1 -GitHubUsername YOUR_USERNAME
```

按照提示输入服务器密码，等待脚本完成。

### 步骤 3：配置 GitHub Secrets（5 分钟）

访问 `https://github.com/YOUR_USERNAME/logvpn-client/settings/secrets/actions` 并添加三个 Secrets：

1. **SSH_PRIVATE_KEY**：从 `github-secrets-config.txt` 复制私钥内容
2. **SERVER_HOST**：`155.94.160.248`
3. **SERVER_USER**：`ubuntu`

### 步骤 4：推送代码（2 分钟）

在 PowerShell 中运行：

```powershell
git push -u origin main
```

如果需要认证，生成 Personal Access Token：https://github.com/settings/tokens/new

### 步骤 5：等待编译完成（15-30 分钟）

访问 `https://github.com/YOUR_USERNAME/logvpn-client/actions` 监控编译进度。

编译完成后，从以下位置下载安装程序：
- **GitHub Artifacts**：在 Actions 页面下载 `logvpn-setup`
- **服务器**：https://dj.siumingho.dpdns.org/downloads/LogVPN_Setup.exe

---

## 📋 详细文档

需要更详细的说明？参考以下文档：

- **STEP_BY_STEP_SETUP.md**：完整的分步配置指南
- **SETUP_CHECKLIST.md**：配置检查清单
- **GITHUB_SECRETS_SETUP.md**：GitHub Secrets 配置详解
- **TROUBLESHOOTING_GUIDE.md**：故障排除指南

---

## 🎯 关键提示

1. **SSH 密钥**：确保完整复制私钥内容（包括开头和结尾）
2. **服务器密码**：运行脚本时需要输入一次
3. **编译时间**：首次编译需要 15-30 分钟，请耐心等待
4. **文件大小**：安装程序应该在 100-150 MB 之间

---

## ✅ 验证成功

编译成功的标志：
- ✅ GitHub Actions 工作流状态为 "Success"
- ✅ 可以从服务器下载 LogVPN_Setup.exe
- ✅ 安装程序大小在 100-150 MB 之间
- ✅ 可以正常安装和启动客户端

---

**准备好了吗？开始配置吧！🚀**
