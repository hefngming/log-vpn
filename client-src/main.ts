import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

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

  if (!isPackaged && process.env.NODE_ENV === 'development') {
    // 开发模式：加载 Vite 开发服务器
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // 生产模式：直接加载绝对路径
    // 注意：dist 文件夹应该在 dist_electron 的同级目录
    const indexPath = path.join(__dirname, '../dist/public/index.html');
    console.log('[LogVPN] Loading HTML from:', indexPath);
    console.log('[LogVPN] __dirname:', __dirname);
    console.log('[LogVPN] app.isPackaged:', app.isPackaged);
    mainWindow.loadFile(indexPath).catch((err) => {
      console.error('[LogVPN] 无法加载页面:', err);
      console.error('[LogVPN] 尝试的路径:', indexPath);
    });
  }

  // 窗口准备好后再显示，解决你看到的“有进程没界面”问题
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    mainWindow?.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 初始化应用
app.whenReady().then(() => {
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
