# GitHub Actions 配置检查清单

使用此清单确保每个步骤都正确完成。

---

## ✅ 步骤 1：创建 GitHub 仓库

- [ ] 访问 https://github.com/new
- [ ] 仓库名称：`logvpn-client`
- [ ] 可见性：Public
- [ ] 不勾选任何初始化选项
- [ ] 点击 "Create repository"
- [ ] 记录仓库 URL：`https://github.com/YOUR_USERNAME/logvpn-client.git`

---

## ✅ 步骤 2：运行自动化脚本

- [ ] 打开 PowerShell (管理员)
- [ ] 导航到项目目录：`cd C:\path\to\logvpn-custom-client`
- [ ] 运行脚本：`.\setup-github-automation.ps1 -GitHubUsername YOUR_USERNAME`
- [ ] 输入服务器密码（当提示时）
- [ ] 等待脚本完成
- [ ] 确认 `github-secrets-config.txt` 文件已打开

---

## ✅ 步骤 3：配置 GitHub Secrets

- [ ] 访问：`https://github.com/YOUR_USERNAME/logvpn-client/settings/secrets/actions`
- [ ] 添加 Secret：`SSH_PRIVATE_KEY`
  - [ ] 从 `github-secrets-config.txt` 复制私钥内容
  - [ ] 包括 `-----BEGIN OPENSSH PRIVATE KEY-----` 和 `-----END OPENSSH PRIVATE KEY-----`
- [ ] 添加 Secret：`SERVER_HOST`
  - [ ] 值：`155.94.160.248`
- [ ] 添加 Secret：`SERVER_USER`
  - [ ] 值：`ubuntu`
- [ ] 刷新页面，确认三个 Secrets 都已添加

---

## ✅ 步骤 4：推送代码到 GitHub

- [ ] 返回 PowerShell 窗口
- [ ] 运行：`git push -u origin main`
- [ ] 如果需要认证：
  - [ ] 生成 Personal Access Token：https://github.com/settings/tokens/new
  - [ ] 或配置 SSH：`git remote set-url origin git@github.com:YOUR_USERNAME/logvpn-client.git`
- [ ] 确认推送成功（看到 "new branch main -> main"）

---

## ✅ 步骤 5：验证 GitHub Actions

- [ ] 访问：`https://github.com/YOUR_USERNAME/logvpn-client/actions`
- [ ] 确认工作流正在运行（状态：🟡 In progress）
- [ ] 点击工作流查看详细日志
- [ ] 确认以下步骤都成功：
  - [ ] Checkout code
  - [ ] Setup Node.js
  - [ ] Install dependencies
  - [ ] Build TypeScript
  - [ ] Verify dist directory
  - [ ] Build Electron app
  - [ ] Verify build output
  - [ ] Calculate checksums
  - [ ] Upload artifact
  - [ ] Deploy to server
- [ ] 等待工作流完成（预计 15-30 分钟）
- [ ] 确认工作流状态：✅ Success

---

## ✅ 步骤 6：验证编译结果

- [ ] 在 GitHub Actions 页面下载 Artifacts：`logvpn-setup`
- [ ] 解压 ZIP 文件
- [ ] 确认文件存在：
  - [ ] `LogVPN_Setup.exe`（100-150 MB）
  - [ ] `checksums.txt`
- [ ] 验证 MD5 校验和：`certutil -hashfile LogVPN_Setup.exe MD5`
- [ ] 访问：`https://dj.siumingho.dpdns.org/downloads/LogVPN_Setup.exe`
- [ ] 确认可以下载安装程序
- [ ] 测试安装程序：
  - [ ] 双击 `LogVPN_Setup.exe`
  - [ ] 完成安装
  - [ ] 启动 LogVPN 客户端
  - [ ] 测试登录功能
  - [ ] 测试连接功能

---

## 🎉 完成！

如果所有项目都已勾选，恭喜您成功配置了 GitHub Actions！

---

## 📊 故障排除快速参考

| 问题 | 检查项 | 解决方案文档 |
|------|--------|--------------|
| SSH 连接失败 | SSH_PRIVATE_KEY 是否完整 | GITHUB_SECRETS_SETUP.md |
| TypeScript 编译错误 | src/main.ts 是否存在 | TROUBLESHOOTING_GUIDE.md |
| Electron 打包错误 | dist/main.js 是否存在 | TROUBLESHOOTING_GUIDE.md |
| 文件未上传到服务器 | SSH 连接是否成功 | GITHUB_SECRETS_SETUP.md |
| 工作流未触发 | .github/workflows/electron-build.yml 是否存在 | STEP_BY_STEP_SETUP.md |

---

**需要帮助？** 参考 `STEP_BY_STEP_SETUP.md` 获取详细说明。
