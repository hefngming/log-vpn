import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// 解决 ES 模块下 __dirname 丢失的问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    show: false, // 先隐藏，等准备好了再显示，防止白屏
    webPreferences: {
      nodeIntegration: false, // 安全性：禁用 node 集成
      contextIsolation: true,  // 安全性：启用上下文隔离
      preload: path.join(__dirname, 'preload.js'), 
    },
    title: 'LogVPN',
    // 图标路径（开发和生产环境自适应）
    icon: app.isPackaged 
      ? path.join(process.resourcesPath, 'icon.png')
      : path.join(__dirname, '../resources/icon.png'), 
  });

  // 【核心修复：判断是否打包环境】
  const isPackaged = app.isPackaged;
  const isDev = process.env.NODE_ENV === 'development';

  console.log('='.repeat(60));
  console.log('[LogVPN] Application Starting...');
  console.log('[LogVPN] isPackaged:', isPackaged);
  console.log('[LogVPN] isDev:', isDev);
  console.log('[LogVPN] __dirname:', __dirname);
  console.log('[LogVPN] process.resourcesPath:', process.resourcesPath);
  console.log('[LogVPN] app.getAppPath():', app.getAppPath());
  console.log('='.repeat(60));

  if (!isPackaged && isDev) {
    // 开发模式：加载 Vite 开发服务器
    console.log('[LogVPN] Loading from Vite dev server: http://localhost:5173');
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // 生产模式：加载打包后的 HTML 文件
    // 
    // 关键理解：
    // 1. electron-builder 会将 dist/ 和 dist_electron/ 打包进 app.asar
    // 2. __dirname 在打包后指向 app.asar/dist_electron
    // 3. HTML 文件在 app.asar/dist/public/index.html
    // 4. 所以相对路径是 ../dist/public/index.html
    //
    // 路径计算：
    // __dirname = /path/to/app.asar/dist_electron
    // indexPath = /path/to/app.asar/dist/public/index.html
    
    const indexPath = path.join(__dirname, '../dist/public/index.html');
    
    console.log('[LogVPN] Attempting to load HTML file...');
    console.log('[LogVPN] Calculated path:', indexPath);
    
    // 检查文件是否存在（仅用于调试）
    try {
      const exists = fs.existsSync(indexPath);
      console.log('[LogVPN] File exists:', exists);
      
      if (!exists) {
        // 尝试列出可能的路径
        const possiblePaths = [
          path.join(__dirname, '../dist/public/index.html'),
          path.join(__dirname, '../dist/index.html'),
          path.join(__dirname, '../../dist/public/index.html'),
          path.join(app.getAppPath(), 'dist/public/index.html'),
          path.join(process.resourcesPath, 'app.asar/dist/public/index.html'),
        ];
        
        console.log('[LogVPN] Trying alternative paths:');
        possiblePaths.forEach((p, i) => {
          const exists = fs.existsSync(p);
          console.log(`[LogVPN]   ${i + 1}. ${p} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
        });
      }
    } catch (err) {
      console.error('[LogVPN] Error checking file existence:', err);
    }
    
    // 加载文件
    mainWindow.loadFile(indexPath).catch((err) => {
      console.error('[LogVPN] ❌ Failed to load page!');
      console.error('[LogVPN] Error:', err);
      console.error('[LogVPN] Attempted path:', indexPath);
      
      // 显示错误页面
      mainWindow?.loadURL(`data:text/html;charset=utf-8,
        <!DOCTYPE html>
        <html>
        <head>
          <title>LogVPN - Error</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: #f5f5f5;
            }
            .error-container {
              background: white;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              max-width: 600px;
            }
            h1 { color: #e74c3c; }
            code {
              background: #f8f8f8;
              padding: 2px 6px;
              border-radius: 3px;
              font-family: monospace;
            }
            pre {
              background: #f8f8f8;
              padding: 15px;
              border-radius: 5px;
              overflow-x: auto;
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1>⚠️ LogVPN 启动失败</h1>
            <p>无法加载应用程序界面。</p>
            <p><strong>错误信息：</strong></p>
            <pre>${err.message}</pre>
            <p><strong>尝试的路径：</strong></p>
            <code>${indexPath}</code>
            <p style="margin-top: 20px; color: #666;">
              请联系技术支持或重新安装应用程序。
            </p>
          </div>
        </body>
        </html>
      `);
    });
  }

  // 窗口准备好后再显示
  mainWindow.once('ready-to-show', () => {
    console.log('[LogVPN] ✅ Window ready to show');
    mainWindow?.show();
    mainWindow?.focus();
  });

  // 监听加载完成事件
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('[LogVPN] ✅ Page loaded successfully');
  });

  // 监听加载失败事件
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('[LogVPN] ❌ Page failed to load');
    console.error('[LogVPN] Error code:', errorCode);
    console.error('[LogVPN] Error description:', errorDescription);
    console.error('[LogVPN] URL:', validatedURL);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 初始化应用
app.whenReady().then(() => {
  console.log('[LogVPN] App ready, creating window...');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 退出应用处理
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC 通信处理
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-app-path', () => {
  return app.getPath('userData');
});

// 单实例锁定
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
