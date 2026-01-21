# LogVPN GitHub 编译测试完整教程

本教程将指导您在 GitHub 上进行完整的编译测试，并自动部署到服务器。

---

## 📋 前置条件

### 1. GitHub 账号
- 拥有 GitHub 账号
- 具有创建仓库的权限

### 2. 本地环境（用于初始推送）
- Git 已安装
- Node.js 18+ 已安装
- npm 或 pnpm 已安装

### 3. 服务器信息
- 服务器地址：155.94.160.248
- 服务器用户：ubuntu
- SSH 密钥已配置

---

## 🚀 第一步：创建 GitHub 仓库

### 1.1 在 GitHub 上创建新仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `logvpn-client`
   - **Description**: LogVPN - Secure, Fast, Global VPN Client
   - **Visibility**: Public（如果要使用 GitHub Actions 免费额度）
3. 点击 "Create repository"

### 1.2 获取仓库 URL

创建完成后，您将看到仓库 URL：
```
https://github.com/YOUR_USERNAME/logvpn-client.git
```

记下这个 URL，稍后会用到。

---

## 🔑 第二步：配置 GitHub Secrets

GitHub Actions 需要以下密钥来自动部署到服务器。

### 2.1 生成 SSH 密钥对

如果您还没有 SSH 密钥，在本地运行：

```bash
# 生成 SSH 密钥
ssh-keygen -t rsa -b 4096 -f ~/.ssh/logvpn_deploy -N ""

# 查看公钥
cat ~/.ssh/logvpn_deploy.pub

# 查看私钥
cat ~/.ssh/logvpn_deploy
```

### 2.2 配置服务器上的公钥

在服务器上（155.94.160.248）运行：

```bash
# 登录服务器
ssh ubuntu@155.94.160.248

# 添加公钥到 authorized_keys
echo "YOUR_PUBLIC_KEY_CONTENT" >> ~/.ssh/authorized_keys

# 验证权限
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### 2.3 在 GitHub 上配置 Secrets

1. 访问您的仓库：https://github.com/YOUR_USERNAME/logvpn-client
2. 点击 "Settings" → "Secrets and variables" → "Actions"
3. 点击 "New repository secret"，添加以下密钥：

| 密钥名称 | 值 | 说明 |
|---------|-----|------|
| `SSH_PRIVATE_KEY` | 您的私钥内容 | 用于连接服务器 |
| `SERVER_HOST` | 155.94.160.248 | 服务器地址 |
| `SERVER_USER` | ubuntu | 服务器用户名 |

**添加 SSH_PRIVATE_KEY 的步骤**：

1. 点击 "New repository secret"
2. Name: `SSH_PRIVATE_KEY`
3. Secret: 粘贴您的私钥内容（从 `-----BEGIN RSA PRIVATE KEY-----` 到 `-----END RSA PRIVATE KEY-----`）
4. 点击 "Add secret"

**添加 SERVER_HOST 的步骤**：

1. 点击 "New repository secret"
2. Name: `SERVER_HOST`
3. Secret: `155.94.160.248`
4. 点击 "Add secret"

**添加 SERVER_USER 的步骤**：

1. 点击 "New repository secret"
2. Name: `SERVER_USER`
3. Secret: `ubuntu`
4. 点击 "Add secret"

---

## 📤 第三步：推送源代码到 GitHub

### 3.1 在本地克隆仓库

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/logvpn-client.git
cd logvpn-client
```

### 3.2 复制 LogVPN 源代码

将以下文件复制到仓库根目录：

```bash
# 复制源代码文件
cp -r /home/ubuntu/log-vpn/logvpn-custom-client/* ./

# 验证关键文件
ls -la package.json
ls -la electron-builder.json
ls -la .github/workflows/electron-build.yml
```

### 3.3 创建必要的目录结构

```bash
# 创建源代码目录
mkdir -p src
mkdir -p assets

# 创建主程序文件
cat > src/main.ts << 'EOF'
import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../index.html'));
  mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
EOF

# 创建预加载脚本
cat > src/preload.ts << 'EOF'
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openExternalLink: (url: string) => ipcRenderer.invoke('open-external', url)
});
EOF

# 创建 HTML 入口
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>LogVPN</title>
    <style>
      body {
        margin: 0;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        background: #1a1a2e;
        color: #fff;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
      h1 {
        color: #a855f7;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>LogVPN Client</h1>
      <p>欢迎使用 LogVPN 客户端</p>
    </div>
  </body>
</html>
EOF
```

### 3.4 配置 TypeScript 编译

创建 `tsconfig.json`：

```bash
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
EOF
```

### 3.5 推送到 GitHub

```bash
# 添加所有文件
git add .

# 创建初始提交
git commit -m "Initial commit: LogVPN Electron client setup"

# 推送到 GitHub
git push -u origin main
```

---

## ⚙️ 第四步：验证 GitHub Actions 工作流

### 4.1 查看工作流状态

1. 访问您的仓库：https://github.com/YOUR_USERNAME/logvpn-client
2. 点击 "Actions" 标签
3. 您应该看到一个正在运行的工作流

### 4.2 监控编译过程

1. 点击最新的工作流运行
2. 查看 "build" 任务的详细日志
3. 预期的步骤：
   - ✓ Checkout code
   - ✓ Setup Node.js
   - ✓ Install dependencies
   - ✓ Build TypeScript
   - ✓ Verify dist directory
   - ✓ Build Electron app
   - ✓ Verify build output
   - ✓ Calculate checksums
   - ✓ Upload artifact
   - ✓ Deploy to server

### 4.3 检查编译结果

工作流完成后：

1. 点击 "Summary" 查看摘要
2. 在 "Artifacts" 部分下载 `logvpn-setup`
3. 验证包含以下文件：
   - `LogVPN_Setup.exe` (100+ MB)
   - `checksums.txt` (MD5 和 SHA256)

---

## 🔄 第五步：强制执行编译步骤

### 5.1 手动触发工作流

如果需要手动触发编译：

1. 访问 https://github.com/YOUR_USERNAME/logvpn-client/actions
2. 点击 "Electron Build and Release" 工作流
3. 点击 "Run workflow" 按钮
4. 选择分支（main）
5. 点击 "Run workflow"

### 5.2 通过提交触发编译

任何推送到 `main` 或 `develop` 分支的提交都会自动触发编译：

```bash
# 修改代码
echo "// Update" >> src/main.ts

# 提交并推送
git add .
git commit -m "Update: minor improvements"
git push origin main

# 工作流将自动开始
```

### 5.3 通过标签发布版本

创建版本发布：

```bash
# 创建标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送标签
git push origin v1.0.0

# 工作流将自动编译并创建 Release
```

---

## 📊 第六步：验证编译结果

### 6.1 检查服务器上的文件

编译完成后，文件应该自动上传到服务器：

```bash
# 在服务器上检查
ssh ubuntu@155.94.160.248
ls -lh /home/ubuntu/log-vpn/client/public/downloads/LogVPN_Setup.exe

# 应该看到类似的输出：
# -rw-r--r-- 1 ubuntu ubuntu 120M Jan 21 12:00 LogVPN_Setup.exe
```

### 6.2 验证下载链接

在浏览器中访问：
```
https://dj.siumingho.dpdns.org/downloads/LogVPN_Setup.exe
```

应该能够下载安装程序。

### 6.3 检查文件完整性

验证 MD5 校验和：

```bash
# 从 GitHub Actions 工作流日志中获取 MD5
# 或从 checksums.txt 文件中获取

# 在本地验证
certutil -hashfile LogVPN_Setup.exe MD5

# 应该与工作流日志中的 MD5 相匹配
```

---

## 🔧 第七步：自定义编译配置

### 7.1 修改版本号

编辑 `package.json`：

```json
{
  "version": "1.0.1"
}
```

### 7.2 修改应用名称

编辑 `electron-builder.json`：

```json
{
  "productName": "LogVPN",
  "appId": "com.logvpn.app"
}
```

### 7.3 修改图标

将图标文件放在 `assets/` 目录：

```bash
# 复制图标文件
cp /path/to/icon.ico assets/icon.ico
cp /path/to/icon.png assets/icon.png
```

### 7.4 修改安装程序配置

编辑 `electron-builder.json` 中的 `nsis` 部分：

```json
{
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "LogVPN"
  }
}
```

---

## 🐛 第八步：故障排除

### 问题 1：工作流失败 - 找不到 dist 目录

**症状**：
```
Error: dist directory not found after build
```

**解决方案**：

1. 检查 `package.json` 中的 build 脚本
2. 确保 `tsconfig.json` 中的 `outDir` 设置为 `./dist`
3. 本地测试编译：
   ```bash
   npm install
   npm run build
   ls -la dist/
   ```

### 问题 2：工作流失败 - 找不到 main.js

**症状**：
```
Error: dist/main.js not found
```

**解决方案**：

1. 检查 `src/main.ts` 是否存在
2. 检查 TypeScript 编译是否成功
3. 查看工作流日志中的编译错误

### 问题 3：工作流失败 - 部署到服务器失败

**症状**：
```
Error: Permission denied (publickey)
```

**解决方案**：

1. 检查 SSH 私钥是否正确配置
2. 检查服务器上的 authorized_keys 是否包含公钥
3. 验证 SERVER_HOST 和 SERVER_USER 是否正确

### 问题 4：编译输出文件过小

**症状**：
```
Warning: File size is smaller than expected (< 100 MB)
```

**解决方案**：

1. 检查是否包含了所有必需的文件
2. 检查 `electron-builder.json` 中的 `files` 配置
3. 确保 `node_modules` 已包含在打包中

---

## 📝 第九步：自动更新配置

### 9.1 配置自动更新

编辑 `src/main.ts`，添加自动更新检查：

```typescript
import { autoUpdater } from 'electron-updater';

function checkForUpdates() {
  autoUpdater.checkForUpdatesAndNotify();
}

app.on('ready', () => {
  createWindow();
  checkForUpdates();
});

// 每小时检查一次更新
setInterval(checkForUpdates, 60 * 60 * 1000);
```

### 9.2 配置发布源

编辑 `electron-builder.json`：

```json
{
  "publish": {
    "provider": "github",
    "owner": "YOUR_USERNAME",
    "repo": "logvpn-client"
  }
}
```

---

## ✅ 完整的工作流总结

```
1. 创建 GitHub 仓库
   ↓
2. 配置 GitHub Secrets
   ↓
3. 推送源代码到 GitHub
   ↓
4. GitHub Actions 自动触发
   ↓
5. 编译 TypeScript → dist/
   ↓
6. 构建 Electron 应用
   ↓
7. 打包 NSIS 安装程序
   ↓
8. 计算文件校验和
   ↓
9. 上传到 GitHub Artifacts
   ↓
10. 部署到服务器
   ↓
11. 用户可从下载页面获取最新版本
```

---

## 🎯 常用命令

```bash
# 本地编译测试
npm install
npm run build
npm run dist:win

# 查看编译输出
ls -la dist/

# 推送代码并触发工作流
git add .
git commit -m "Update: description"
git push origin main

# 创建版本发布
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# 查看工作流状态
# 访问：https://github.com/YOUR_USERNAME/logvpn-client/actions
```

---

## 📞 获取帮助

如果遇到问题：

1. 查看 GitHub Actions 工作流日志
2. 参考 TROUBLESHOOTING_GUIDE.md
3. 检查 GitHub Secrets 配置
4. 验证服务器连接

---

**祝您编译成功！🚀**
