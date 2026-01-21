/**
 * Electron Main Process
 * Integrates auto-update, traffic monitoring, and onboarding modules
 * Fixed for production paths and resource loading
 */

import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { initAutoUpdate, getAppVersion } from './autoUpdate.js'; // 生产环境使用 .js
import { TrafficMonitor, setupTrafficMonitorIPC } from './trafficMonitor.js';

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine if running in development
const isDev = process.env.NODE_ENV === 'development' || process.env.VITE_DEV_SERVER_HOST;

// Global reference to main window
let mainWindow: BrowserWindow | null = null;

// Global traffic monitor instance
let trafficMonitor: TrafficMonitor | null = null;

/**
 * Create the main application window
 */
function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      // 修复：生产环境引用编译后的 .js 文件
      preload: path.join(__dirname, isDev ? 'preload.ts' : 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
    },
    // 修复：引用 client/public 下的图标，确保打包后路径正确
    icon: path.join(__dirname, isDev ? '../client/public/favicon.ico' : '../dist/public/favicon.ico'),
  });

  // 修复：根据 vite.config.ts 的输出路径加载 index.html
  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../dist/public/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (trafficMonitor) {
      trafficMonitor.stop();
    }
  });

  createMenu();
}

/**
 * Create application menu
 */
function createMenu(): void {
  const template: any[] = [
    {
      label: '文件',
      submenu: [
        {
          label: '退出',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo', label: '撤销' },
        { role: 'redo', label: '重做' },
        { type: 'separator' },
        { role: 'cut', label: '剪切' },
        { role: 'copy', label: '复制' },
        { role: 'paste', label: '粘贴' },
      ],
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload', label: '刷新' },
        { role: 'forceReload', label: '强制刷新' },
        { role: 'toggleDevTools', label: '开发者工具' },
      ],
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于 Log VPN',
          click: () => {
            dialog.showMessageBox(mainWindow!, {
              type: 'info',
              title: '关于 Log VPN',
              message: 'Log VPN',
              detail: `版本 ${getAppVersion()}\n\n极速、安全、可靠的 VPN 服务。`,
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

/**
 * Initialize traffic monitoring
 */
function initializeTrafficMonitoring(): void {
  if (!mainWindow) {
    return;
  }

  trafficMonitor = new TrafficMonitor(
    {
      checkInterval: 60000,
      warningThreshold: 80,
      criticalThreshold: 95,
    },
    mainWindow
  );

  setupTrafficMonitorIPC(trafficMonitor);

  trafficMonitor.start(async () => {
    try {
      const authToken = await mainWindow?.webContents.executeJavaScript(
        'localStorage.getItem("auth_token")'
      );

      if (!authToken) {
        return null;
      }

      const apiUrl = process.env.VITE_FRONTEND_FORGE_API_URL || 'https://dj.siumingho.dpdns.org/api/trpc';
      const response = await fetch(`${apiUrl}/traffic.getUsage`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      if (data.result && data.result.data) {
        return data.result.data;
      }
      return data;
    } catch (error) {
      console.error('[TrafficMonitor] Error:', error);
      return null;
    }
  });
}

app.on('ready', () => {
  createWindow();
  initAutoUpdate();
  if (mainWindow) {
    initializeTrafficMonitoring();
  }
});

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

// Onboarding IPC Handlers
ipcMain.handle('get-onboarding-status', async () => {
  try {
    const userDataPath = app.getPath('userData');
    const onboardingFile = path.join(userDataPath, 'onboarding-status.json');
    if (fs.existsSync(onboardingFile)) {
      return JSON.parse(fs.readFileSync(onboardingFile, 'utf-8'));
    }
    return { completed: false, currentStep: 0, skipped: false };
  } catch (error) {
    return { completed: false, currentStep: 0, skipped: false };
  }
});

ipcMain.handle('update-onboarding-status', async (_, status) => {
  try {
    const userDataPath = app.getPath('userData');
    const onboardingFile = path.join(userDataPath, 'onboarding-status.json');
    if (!fs.existsSync(userDataPath)) {
      fs.mkdirSync(userDataPath, { recursive: true });
    }
    fs.writeFileSync(onboardingFile, JSON.stringify(status, null, 2));
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});

ipcMain.handle('get-app-version', async () => {
  return {
    version: getAppVersion(),
    platform: process.platform,
    arch: process.arch,
  };
});

ipcMain.handle('get-app-path', async (_, name: string) => {
  return app.getPath(name as any);
});

process.on('uncaughtException', (error) => {
  console.error('[Main] Uncaught exception:', error);
});

export { mainWindow, trafficMonitor };
