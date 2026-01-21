# GitHub Actions CI/CD 完整配置指南

本指南详细说明如何配置 GitHub Actions 实现 LogVPN 的自动编译、打包和部署。

---

## 📋 目录

1. [前置条件](#前置条件)
2. [生成 SSH 密钥对](#生成-ssh-密钥对)
3. [配置 GitHub Secrets](#配置-github-secrets)
4. [创建 GitHub 仓库](#创建-github-仓库)
5. [上传源代码](#上传源代码)
6. [监控和调试](#监控和调试)

---

## ✅ 前置条件

- ✅ GitHub 账号（https://github.com）
- ✅ Git 已安装
- ✅ SSH 密钥对（用于服务器连接）
- ✅ 服务器访问权限（155.94.160.248）

---

## 🔑 生成 SSH 密钥对

### 步骤 1：在本地生成密钥对

打开 PowerShell 或命令行，执行以下命令：

```bash
# 生成 SSH 密钥对（用于 GitHub Actions）
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_deploy -N ""

# 验证密钥已生成
dir ~/.ssh/github_deploy*
```

### 步骤 2：将公钥添加到服务器

```bash
# 方式 1：使用 ssh-copy-id（推荐）
ssh-copy-id -i ~/.ssh/github_deploy.pub root@155.94.160.248

# 方式 2：手动添加
# 1. 复制公钥内容
type ~/.ssh/github_deploy.pub | clip

# 2. SSH 连接到服务器
ssh root@155.94.160.248

# 3. 在服务器上执行
cat >> ~/.ssh/authorized_keys << 'EOF'
<粘贴公钥内容>
EOF

chmod 600 ~/.ssh/authorized_keys
```

### 步骤 3：测试 SSH 连接

```bash
# 测试是否可以无密码连接
ssh -i ~/.ssh/github_deploy root@155.94.160.248 "echo 'SSH 连接成功'"
```

---

## 🔐 配置 GitHub Secrets

### 步骤 1：复制 SSH 私钥

```powershell
# 在 PowerShell 中复制私钥内容
Get-Content ~/.ssh/github_deploy | Set-Clipboard

# 或使用 clip 命令
type ~/.ssh/github_deploy | clip
```

### 步骤 2：在 GitHub 中添加 Secrets

1. 访问您的 GitHub 仓库
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret** 按钮
4. 添加以下 Secrets：

#### Secret 1: SSH_PRIVATE_KEY

| 字段 | 值 |
|-----|-----|
| **Name** | `SSH_PRIVATE_KEY` |
| **Secret** | 粘贴之前复制的私钥内容 |

**私钥内容示例**：
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA2x5...
...（中间省略）...
-----END RSA PRIVATE KEY-----
```

#### Secret 2: SERVER_HOST

| 字段 | 值 |
|-----|-----|
| **Name** | `SERVER_HOST` |
| **Secret** | `155.94.160.248` |

#### Secret 3: SERVER_USER

| 字段 | 值 |
|-----|-----|
| **Name** | `SERVER_USER` |
| **Secret** | `root` |

### 步骤 3：验证 Secrets 已添加

1. 在 **Secrets and variables** → **Actions** 页面
2. 应该看到三个 Secrets：
   - ✓ SSH_PRIVATE_KEY
   - ✓ SERVER_HOST
   - ✓ SERVER_USER

---

## 📦 创建 GitHub 仓库

### 步骤 1：在 GitHub 上创建新仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `logvpn-client`
   - **Description**: `LogVPN Client - v2rayN Customization`
   - **Visibility**: 选择 **Public** 或 **Private**
   - **Initialize this repository with**: 不选择任何选项
3. 点击 **Create repository**

### 步骤 2：获取仓库 URL

创建完成后，您会看到类似的 URL：
```
https://github.com/YOUR_USERNAME/logvpn-client.git
```

---

## 📤 上传源代码

### 步骤 1：在本地初始化 Git 仓库

```bash
# 进入项目目录
cd C:\Projects\logvpn-client

# 初始化 Git 仓库
git init

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/logvpn-client.git

# 验证远程仓库
git remote -v
```

### 步骤 2：添加所有文件

```bash
# 添加所有文件
git add .

# 查看待提交的文件
git status

# 提交更改
git commit -m "Initial commit: LogVPN client customization"
```

### 步骤 3：推送到 GitHub

```bash
# 推送到 main 分支
git push -u origin main

# 验证推送成功
# 访问 https://github.com/YOUR_USERNAME/logvpn-client
```

### 步骤 4：添加 v2rayN 作为子模块（可选）

```bash
# 添加 v2rayN 作为子模块
git submodule add https://github.com/2dust/v2rayN.git v2rayN

# 提交子模块
git commit -m "Add v2rayN as submodule"

# 推送
git push origin main
```

---

## 🚀 触发自动编译

### 方式 1：通过 Git Tag 触发（推荐）

```bash
# 创建版本标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送标签到 GitHub
git push origin v1.0.0

# GitHub Actions 会自动开始编译和部署
```

### 方式 2：通过 Push 触发

```bash
# 直接推送到 main 分支
git push origin main

# GitHub Actions 会自动开始编译
```

### 方式 3：手动触发

1. 访问仓库的 **Actions** 标签
2. 选择 **Build and Release LogVPN Client** 工作流
3. 点击 **Run workflow** 按钮
4. 选择分支并点击 **Run workflow**

---

## 📊 监控编译进度

### 步骤 1：访问 GitHub Actions

1. 访问您的仓库
2. 点击 **Actions** 标签
3. 查看最新的工作流运行

### 步骤 2：查看编译日志

1. 点击最新的工作流运行
2. 点击 **build** 或 **deploy** 任务
3. 查看详细的编译日志

### 步骤 3：常见的工作流状态

| 状态 | 说明 |
|-----|-----|
| 🟡 **Queued** | 等待中 |
| 🟠 **In progress** | 正在编译 |
| 🟢 **Completed** | 编译完成 |
| 🔴 **Failed** | 编译失败 |

---

## 🔧 调试和故障排除

### 问题 1：SSH 连接失败

**错误信息**：
```
Permission denied (publickey)
```

**解决方案**：
1. 验证 SSH 私钥是否正确添加到 GitHub Secrets
2. 验证公钥是否已添加到服务器 `~/.ssh/authorized_keys`
3. 检查服务器防火墙设置

### 问题 2：编译失败 - MSBuild 错误

**错误信息**：
```
MSBuild : error : The specified solution configuration "Release|x64" is not valid.
```

**解决方案**：
1. 检查 v2rayN 项目配置
2. 确保 Visual Studio 已正确安装
3. 清除 NuGet 缓存

### 问题 3：部署失败 - 文件上传错误

**错误信息**：
```
scp: command not found
```

**解决方案**：
1. 确保 OpenSSH 已在 GitHub Actions 运行器上安装
2. 工作流已包含 SSH 设置步骤，应该自动处理

### 问题 4：GitHub Actions 超时

**错误信息**：
```
The job running on runner has exceeded the maximum execution time of 360 minutes.
```

**解决方案**：
1. 编译通常需要 10-15 分钟
2. 如果超时，检查是否有编译错误
3. 查看编译日志找出瓶颈

---

## 📝 工作流文件说明

GitHub Actions 工作流文件位置：`.github/workflows/build-release.yml`

### 主要步骤

1. **Checkout code** - 克隆源代码
2. **Setup MSBuild** - 配置编译环境
3. **Restore NuGet packages** - 恢复依赖包
4. **Build solution** - 编译项目
5. **Install NSIS** - 安装打包工具
6. **Build installer** - 打包安装程序
7. **Upload to server** - 上传到服务器
8. **Create release** - 创建 GitHub Release

---

## 🎯 最佳实践

### 版本管理

使用 Semantic Versioning（语义化版本）：

```bash
# 主版本更新（不兼容的更改）
git tag -a v2.0.0 -m "Major release"

# 次版本更新（新功能）
git tag -a v1.1.0 -m "Minor release"

# 补丁版本更新（bug 修复）
git tag -a v1.0.1 -m "Patch release"
```

### 分支管理

```bash
# 创建开发分支
git checkout -b develop

# 进行开发
# ...

# 合并到 main 分支
git checkout main
git merge develop

# 创建发布标签
git tag -a v1.0.0 -m "Release"

# 推送
git push origin main
git push origin v1.0.0
```

### 提交信息规范

```bash
# 好的提交信息
git commit -m "feat: Add auto-update check functionality"
git commit -m "fix: Resolve login timeout issue"
git commit -m "docs: Update compilation guide"

# 不好的提交信息
git commit -m "update"
git commit -m "fix bug"
```

---

## 📞 获取帮助

- **GitHub Actions 文档**：https://docs.github.com/en/actions
- **GitHub Secrets 文档**：https://docs.github.com/en/actions/security-guides/encrypted-secrets
- **SSH 密钥配置**：https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

## ✅ 配置检查清单

- [ ] SSH 密钥对已生成
- [ ] 公钥已添加到服务器
- [ ] GitHub Secrets 已配置（SSH_PRIVATE_KEY、SERVER_HOST、SERVER_USER）
- [ ] GitHub 仓库已创建
- [ ] 源代码已上传到 GitHub
- [ ] GitHub Actions 工作流文件已添加
- [ ] 已测试手动触发工作流
- [ ] 编译日志已验证
- [ ] 安装程序已成功上传到服务器
- [ ] 下载页面已更新

---

**祝您配置顺利！🚀**
