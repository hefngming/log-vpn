# GitHub Actions 分步配置指南

本指南将带您一步步完成 GitHub Actions 的配置，从创建仓库到验证编译结果。

---

## 📋 准备工作

### 需要的账号和工具

- ✅ GitHub 账号
- ✅ Git 已安装（用于推送代码）
- ✅ 服务器访问权限（155.94.160.248）
- ✅ Windows PowerShell（用于运行自动化脚本）

### 预计时间

- **总时间**：30-45 分钟
- **步骤 1-3**：10 分钟
- **步骤 4-5**：5 分钟
- **步骤 6**：15-30 分钟（编译时间）

---

## 🚀 步骤 1：在 GitHub 上创建仓库

### 1.1 访问 GitHub 创建仓库页面

打开浏览器，访问：
```
https://github.com/new
```

### 1.2 填写仓库信息

| 字段 | 值 | 说明 |
|------|-----|------|
| **Repository name** | `logvpn-client` | 仓库名称 |
| **Description** | LogVPN - Secure, Fast, Global VPN Client | 仓库描述 |
| **Visibility** | Public | 公开仓库（免费使用 GitHub Actions） |
| **Initialize this repository** | 不勾选任何选项 | 我们会手动推送代码 |

### 1.3 创建仓库

点击 **"Create repository"** 按钮。

### 1.4 记录仓库 URL

创建完成后，您将看到类似的页面：

```
Quick setup — if you've done this kind of thing before
https://github.com/YOUR_USERNAME/logvpn-client.git
```

**记下这个 URL**，稍后会用到。

---

## 🔑 步骤 2：运行自动化配置脚本

### 2.1 打开 PowerShell

1. 按 `Win + X`
2. 选择 **"Windows PowerShell (Admin)"** 或 **"终端 (管理员)"**

### 2.2 导航到项目目录

```powershell
cd C:\path\to\logvpn-custom-client
```

**注意**：将 `C:\path\to\` 替换为您实际的项目路径。

### 2.3 运行自动化脚本

```powershell
.\setup-github-automation.ps1 -GitHubUsername YOUR_USERNAME
```

**注意**：将 `YOUR_USERNAME` 替换为您的 GitHub 用户名。

### 2.4 按照提示操作

脚本将执行以下步骤：

1. ✅ 生成 SSH 密钥对
2. ✅ 配置服务器公钥（需要输入服务器密码）
3. ✅ 测试 SSH 连接
4. ✅ 生成 GitHub Secrets 配置文件
5. ✅ 初始化 Git 仓库
6. ✅ 准备必要文件
7. ✅ 提交代码

**重要提示**：
- 当提示输入服务器密码时，输入：`YOUR_SERVER_PASSWORD`
- 脚本会自动打开 `github-secrets-config.txt` 文件

---

## 📝 步骤 3：配置 GitHub Secrets

### 3.1 访问 Secrets 配置页面

打开浏览器，访问：
```
https://github.com/YOUR_USERNAME/logvpn-client/settings/secrets/actions
```

**注意**：将 `YOUR_USERNAME` 替换为您的 GitHub 用户名。

### 3.2 添加 SSH_PRIVATE_KEY

1. 点击 **"New repository secret"** 按钮

2. 填写信息：
   - **Name**: `SSH_PRIVATE_KEY`
   - **Secret**: 从 `github-secrets-config.txt` 文件中复制私钥内容

3. 点击 **"Add secret"** 保存

**提示**：私钥内容包括：
```
-----BEGIN OPENSSH PRIVATE KEY-----
...（很长的内容）...
-----END OPENSSH PRIVATE KEY-----
```

### 3.3 添加 SERVER_HOST

1. 再次点击 **"New repository secret"**

2. 填写信息：
   - **Name**: `SERVER_HOST`
   - **Secret**: `155.94.160.248`

3. 点击 **"Add secret"** 保存

### 3.4 添加 SERVER_USER

1. 再次点击 **"New repository secret"**

2. 填写信息：
   - **Name**: `SERVER_USER`
   - **Secret**: `ubuntu`

3. 点击 **"Add secret"** 保存

### 3.5 验证 Secrets

刷新页面，您应该看到三个 Secrets：

- ✅ SSH_PRIVATE_KEY
- ✅ SERVER_HOST
- ✅ SERVER_USER

---

## 📤 步骤 4：推送代码到 GitHub

### 4.1 返回 PowerShell

回到之前打开的 PowerShell 窗口。

### 4.2 推送代码

```powershell
git push -u origin main
```

**如果提示需要认证**：

**方式 1：使用 Personal Access Token（推荐）**

1. 访问：https://github.com/settings/tokens/new
2. 勾选 `repo` 权限
3. 生成 Token
4. 在 PowerShell 中输入：
   - Username: 您的 GitHub 用户名
   - Password: 粘贴刚才生成的 Token

**方式 2：使用 SSH**

```powershell
git remote set-url origin git@github.com:YOUR_USERNAME/logvpn-client.git
git push -u origin main
```

### 4.3 验证推送成功

推送成功后，您应该看到类似的输出：

```
Enumerating objects: 50, done.
Counting objects: 100% (50/50), done.
...
To https://github.com/YOUR_USERNAME/logvpn-client.git
 * [new branch]      main -> main
```

---

## ⚙️ 步骤 5：验证 GitHub Actions 工作流

### 5.1 访问 GitHub Actions 页面

打开浏览器，访问：
```
https://github.com/YOUR_USERNAME/logvpn-client/actions
```

### 5.2 查看工作流状态

您应该看到一个正在运行的工作流：

- **名称**：Electron Build and Release
- **状态**：🟡 In progress（进行中）
- **触发方式**：push

### 5.3 查看详细日志

1. 点击工作流名称
2. 点击 **"build"** 任务
3. 查看详细的执行日志

**预期的步骤**：

1. ✅ Checkout code
2. ✅ Setup Node.js
3. ✅ Install dependencies
4. ✅ Build TypeScript
5. ✅ Verify dist directory
6. ✅ Build Electron app
7. ✅ Verify build output
8. ✅ Calculate checksums
9. ✅ Upload artifact
10. ✅ Deploy to server

### 5.4 等待编译完成

**预计时间**：15-30 分钟

您可以：
- ✅ 监控日志输出
- ✅ 查看每个步骤的执行时间
- ✅ 检查是否有错误

---

## ✅ 步骤 6：验证编译结果

### 6.1 检查工作流状态

编译完成后，工作流状态应该变为：

- **状态**：✅ Success（成功）
- **执行时间**：约 15-30 分钟

### 6.2 下载编译结果（方式 1：从 Artifacts）

1. 在工作流详情页面，找到 **"Artifacts"** 部分
2. 点击 **"logvpn-setup"** 下载
3. 解压 ZIP 文件
4. 您将看到：
   - `LogVPN_Setup.exe`（安装程序）
   - `checksums.txt`（MD5 和 SHA256 校验和）

### 6.3 下载编译结果（方式 2：从服务器）

访问：
```
https://dj.siumingho.dpdns.org/downloads/LogVPN_Setup.exe
```

**如果能够下载**，说明自动部署成功！

### 6.4 验证文件完整性

**检查文件大小**：

- **预期大小**：100-150 MB
- **如果小于 50 MB**：可能编译不完整

**验证 MD5 校验和**：

在 PowerShell 中运行：

```powershell
certutil -hashfile LogVPN_Setup.exe MD5
```

对比 `checksums.txt` 文件中的 MD5 值。

### 6.5 测试安装程序

1. 双击 `LogVPN_Setup.exe`
2. 按照安装向导完成安装
3. 启动 LogVPN 客户端
4. 测试登录和连接功能

---

## 🎉 完成！

恭喜！您已经成功配置了 GitHub Actions 自动编译和部署。

### 后续操作

**每次更新代码**：

```powershell
git add .
git commit -m "feat: 更新描述"
git push origin main
```

GitHub Actions 将自动：
1. 编译新版本
2. 上传到服务器
3. 创建 Release（如果推送了 tag）

**创建版本发布**：

```powershell
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## 🐛 故障排除

### 问题 1：工作流失败 - SSH 连接错误

**症状**：
```
Permission denied (publickey)
```

**解决方案**：
1. 检查 SSH_PRIVATE_KEY 是否完整复制
2. 检查服务器上的公钥是否正确配置
3. 重新运行 `setup-github-automation.ps1`

### 问题 2：工作流失败 - TypeScript 编译错误

**症状**：
```
error TS2339: Property 'xxx' does not exist
```

**解决方案**：
1. 检查 `src/main.ts` 是否存在
2. 检查 `tsconfig.json` 配置是否正确
3. 本地运行 `npm run build` 测试

### 问题 3：工作流失败 - Electron 打包错误

**症状**：
```
Error: dist directory not found
```

**解决方案**：
1. 检查 TypeScript 编译是否成功
2. 检查 `dist/main.js` 是否存在
3. 查看详细的编译日志

### 问题 4：文件未上传到服务器

**症状**：
```
https://dj.siumingho.dpdns.org/downloads/LogVPN_Setup.exe
404 Not Found
```

**解决方案**：
1. 检查 SSH 连接是否成功
2. 检查服务器路径是否正确
3. 手动登录服务器验证文件

---

## 📞 获取帮助

如果遇到问题：

1. 查看 GitHub Actions 工作流日志
2. 参考 `TROUBLESHOOTING_GUIDE.md`
3. 参考 `GITHUB_SECRETS_SETUP.md`

---

**祝您配置成功！🚀**
