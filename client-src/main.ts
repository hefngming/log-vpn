import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  console.log('[Main] Creating window...');
  
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    show: true, // 立即显示窗口
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // 如果需要 preload 脚本
    },
    title: 'LogVPN',
    icon: path.join(__dirname, '..', 'resources', 'icon-1024.png'), // 应用图标
  });
  
  console.log('[Main] Window created successfully');

  // 加载前端页面
  if (process.env.NODE_ENV === 'development') {
    console.log('[Main] Loading development server...');
    // 开发模式：加载 Vite 开发服务器
    mainWindow.loadURL('http://localhost:5173');
    // 打开开发者工具
    mainWindow.webContents.openDevTools();
  } else {
    // 生产模式：加载打包后的 HTML 文件
    const indexPath = path.join(__dirname, '..', 'dist', 'public', 'index.html');
    console.log('[Main] Loading production HTML from:', indexPath);
    console.log('[Main] __dirname:', __dirname);
    
    // 检查文件是否存在
    const fs = require('fs');
    if (fs.existsSync(indexPath)) {
      console.log('[Main] index.html found, loading...');
      mainWindow.loadFile(indexPath).catch(err => {
        console.error('[Main] Failed to load file:', err);
      });
    } else {
      console.error('[Main] index.html NOT FOUND at:', indexPath);
      // 尝试备用路径
      const altPath = path.join(process.resourcesPath, 'app', 'dist', 'index.html');
      console.log('[Main] Trying alternative path:', altPath);
      if (fs.existsSync(altPath)) {
        console.log('[Main] Alternative path found, loading...');
        mainWindow.loadFile(altPath).catch(err => {
          console.error('[Main] Failed to load from alternative path:', err);
        });
      } else {
        console.error('[Main] Alternative path also NOT FOUND');
      }
    }
  }
  
  // 监听页面加载事件
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('[Main] Page loaded successfully');
  });
  
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('[Main] Page failed to load:', errorCode, errorDescription);
  });

  // 窗口关闭时的处理
  mainWindow.on('closed', () => {
    console.log('[Main] Window closed');
    mainWindow = null;
  });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用
app.whenReady().then(() => {
  createWindow();

  // 在 macOS 上，当点击 dock 图标且没有其他窗口打开时，重新创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 当所有窗口都被关闭时退出应用（Windows 和 Linux）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC 通信示例：处理来自渲染进程的消息
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-app-path', () => {
  return app.getPath('userData');
});

// 防止应用多次启动
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // 当运行第二个实例时，聚焦到已存在的窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
