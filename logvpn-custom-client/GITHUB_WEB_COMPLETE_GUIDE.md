# GitHub 网页完整操作指南

**完全在 GitHub 网页上完成所有操作，无需本地环境**

---

## 📋 概述

本指南将教您如何完全在 GitHub 网页上完成：
1. 上传源代码文件
2. 配置 GitHub Actions
3. 配置 Secrets
4. 触发自动编译
5. 下载安装程序

**预计时间**：40-50 分钟

---

## 📦 步骤 1：下载源代码包

### 1.1 下载完整的源代码包

访问以下链接下载源代码包：

```
https://dj.siumingho.dpdns.org/downloads/LogVPN_GitHub_Upload_Package.tar.gz
```

**文件大小**：约 50 KB  
**文件格式**：tar.gz 压缩包

### 1.2 解压文件

**Windows 用户**：
- 使用 7-Zip 或 WinRAR 解压
- 下载 7-Zip：https://www.7-zip.org/

**Mac/Linux 用户**：
```bash
tar -xzf LogVPN_GitHub_Upload_Package.tar.gz
```

解压后您会看到 `logvpn-custom-client/` 目录。

---

## 🌐 步骤 2：在 GitHub 上创建文件结构

### 2.1 访问您的仓库

打开浏览器，访问：
```
https://github.com/YOUR_USERNAME/logvpn-client
```

### 2.2 创建 .github/workflows 目录

#### 1. 点击 "Add file" → "Create new file"

在仓库页面，点击右上角的 "Add file" 按钮，选择 "Create new file"。

#### 2. 输入文件路径

在文件名输入框中输入：
```
.github/workflows/electron-build.yml
```

**注意**：输入 `/` 时，GitHub 会自动创建目录。

#### 3. 粘贴工作流内容

打开解压后的文件：
```
logvpn-custom-client/.github/workflows/electron-build.yml
```

复制全部内容，粘贴到 GitHub 的编辑器中。

#### 4. 提交文件

滚动到页面底部，点击 "Commit new file"。

---

### 2.3 创建其他必要文件

按照以下顺序创建文件（每个文件都使用 "Add file" → "Create new file"）：

#### 文件 1：package.json

**路径**：
```
package.json
```

**内容来源**：
```
logvpn-custom-client/package.json.example
```

复制内容并粘贴，然后点击 "Commit new file"。

---

#### 文件 2：electron-builder.json

**路径**：
```
electron-builder.json
```

**内容来源**：
```
logvpn-custom-client/electron-builder.json
```

复制内容并粘贴，然后提交。

---

#### 文件 3：tsconfig.json

**路径**：
```
tsconfig.json
```

**内容**：
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

提交文件。

---

#### 文件 4：src/main.ts

**路径**：
```
src/main.ts
```

**内容**：
```typescript
import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    title: 'LogVPN',
    icon: path.join(__dirname, '../resources/icon.png')
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

  // 开发模式下打开开发者工具
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
```

提交文件。

---

#### 文件 5：src/preload.js

**路径**：
```
src/preload.js
```

**内容**：
```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // 在这里添加需要暴露给渲染进程的 API
});
```

提交文件。

---

#### 文件 6：renderer/index.html

**路径**：
```
renderer/index.html
```

**内容**：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LogVPN</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="../resources/logo.png" alt="LogVPN Logo" class="logo">
            <h1>LogVPN</h1>
        </div>
        <div class="content">
            <h2>欢迎使用 LogVPN</h2>
            <p>安全、快速、全球覆盖的 VPN 服务</p>
            <button id="loginBtn" class="btn-primary">登录</button>
        </div>
    </div>
    <script src="renderer.js"></script>
</body>
</html>
```

提交文件。

---

#### 文件 7：renderer/styles.css

**路径**：
```
renderer/styles.css
```

**内容**：
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 500px;
    width: 90%;
}

.header {
    margin-bottom: 30px;
}

.logo {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
}

h1 {
    color: #667eea;
    font-size: 32px;
    margin-bottom: 10px;
}

.content h2 {
    color: #333;
    margin-bottom: 15px;
}

.content p {
    color: #666;
    margin-bottom: 30px;
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px 60px;
    font-size: 18px;
    border-radius: 30px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.btn-primary:active {
    transform: translateY(0);
}
```

提交文件。

---

#### 文件 8：renderer/renderer.js

**路径**：
```
renderer/renderer.js
```

**内容**：
```javascript
document.getElementById('loginBtn').addEventListener('click', () => {
    console.log('Login button clicked');
    // 在这里添加登录逻辑
    alert('登录功能开发中...');
});
```

提交文件。

---

#### 文件 9：.gitignore

**路径**：
```
.gitignore
```

**内容**：
```
# Dependencies
node_modules/

# Build output
dist/
out/
build/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Environment
.env
.env.local

# Package files
*.tgz

# SSH keys
*.pem
*_deploy_key
*_deploy_key.pub
```

提交文件。

---

#### 文件 10：README.md

**路径**：
```
README.md
```

**内容**：
```markdown
# LogVPN Client

LogVPN - Secure, Fast, Global VPN Client

## Features

- 🔐 Secure encryption
- ⚡ Fast connection
- 🌍 Global coverage
- 🎨 Modern UI
- 🔄 Auto-update

## Build

This project uses GitHub Actions for automatic building.

## License

MIT
```

提交文件。

---

## 🔑 步骤 3：配置 GitHub Secrets

### 3.1 生成 SSH 密钥对

由于我们完全在网页上操作，您需要使用已经生成好的 SSH 密钥。

打开解压后的文件：
```
logvpn-custom-client/logvpn_deploy_key
```

这是完整的 SSH 私钥内容。

### 3.2 访问 Secrets 配置页面

```
https://github.com/YOUR_USERNAME/logvpn-client/settings/secrets/actions
```

### 3.3 添加三个 Secrets

按照之前教您的方法，添加三个 Secrets：

1. **SSH_PRIVATE_KEY**：从 `logvpn_deploy_key` 文件复制完整内容
2. **SERVER_HOST**：`155.94.160.248`
3. **SERVER_USER**：`ubuntu`

---

## ⚙️ 步骤 4：配置服务器公钥

### 4.1 获取公钥内容

打开文件：
```
logvpn-custom-client/logvpn_deploy_key.pub
```

复制完整内容（一行很长的文本）。

### 4.2 登录服务器

使用 SSH 客户端登录服务器：
```bash
ssh ubuntu@155.94.160.248
```

### 4.3 添加公钥到服务器

```bash
mkdir -p ~/.ssh
echo "粘贴公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

**替换 "粘贴公钥内容" 为实际的公钥内容。**

---

## 🚀 步骤 5：触发 GitHub Actions

### 5.1 创建一个小的修改触发工作流

在 GitHub 仓库页面，编辑 README.md 文件：

1. 点击 README.md 文件
2. 点击右上角的铅笔图标（编辑）
3. 添加一行文字，例如：
   ```
   ## Version 1.0.0
   ```
4. 点击 "Commit changes"

### 5.2 查看 GitHub Actions 状态

访问：
```
https://github.com/YOUR_USERNAME/logvpn-client/actions
```

您应该看到一个正在运行的工作流。

### 5.3 监控编译进度

点击工作流名称查看详细日志。

**预计时间**：15-30 分钟

---

## 📥 步骤 6：下载编译结果

### 方式 1：从 GitHub Artifacts 下载

1. 在 Actions 页面，点击已完成的工作流
2. 滚动到底部，找到 "Artifacts" 部分
3. 点击 "logvpn-setup" 下载

### 方式 2：从服务器下载

访问：
```
https://dj.siumingho.dpdns.org/downloads/LogVPN_Setup.exe
```

---

## ✅ 完成！

恭喜！您已经完全在 GitHub 网页上完成了所有配置。

### 后续更新

每次修改代码后，只需：
1. 在 GitHub 网页上编辑文件
2. 提交更改
3. GitHub Actions 自动编译
4. 自动部署到服务器

---

## 🐛 故障排除

### 问题 1：工作流失败

查看详细日志，找到错误信息。

### 问题 2：SSH 连接失败

检查：
1. SSH_PRIVATE_KEY 是否完整
2. 服务器公钥是否正确配置
3. 服务器是否可访问

### 问题 3：编译失败

检查：
1. package.json 是否正确
2. tsconfig.json 是否正确
3. 所有必要文件是否都已创建

---

## 📞 获取帮助

如果遇到问题，请参考：
- `TROUBLESHOOTING_GUIDE.md`
- GitHub Actions 工作流日志

---

**祝您配置成功！🚀**
