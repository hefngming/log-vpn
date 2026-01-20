/**
 * Electron Main Process
 * Integrates auto-update, traffic monitoring, and onboarding modules
 */

import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { initAutoUpdate, getAppVersion } from './autoUpdate';
import { TrafficMonitor, setupTrafficMonitorIPC } from './trafficMonitor';

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
      preload: path.join(__dirname, 'preload.ts'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
    },
    icon: path.join(__dirname, '../assets/icon.png'),
  });

  // Load the app URL
  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
    if (trafficMonitor) {
      trafficMonitor.stop();
    }
  });

  // Create application menu
  createMenu();
}

/**
 * Create application menu
 */
function createMenu(): void {
  const template: any[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Log VPN',
          click: () => {
            dialog.showMessageBox(mainWindow!, {
              type: 'info',
              title: 'About Log VPN',
              message: 'Log VPN',
              detail: `Version ${getAppVersion()}\n\nA fast, secure, and reliable VPN service.`,
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
      checkInterval: 60000, // Check every 1 minute
      warningThreshold: 80,
      criticalThreshold: 95,
    },
    mainWindow
  );

  // Setup IPC handlers
  setupTrafficMonitorIPC(trafficMonitor);

  // Start monitoring (will fetch traffic data from API)
  trafficMonitor.start(async () => {
    try {
      // Get auth token from renderer process
      const authToken = await mainWindow?.webContents.executeJavaScript(
        'localStorage.getItem("auth_token")'
      );

      if (!authToken) {
        console.log('[TrafficMonitor] No auth token found');
        return null;
      }

      // Fetch traffic usage from backend API
      const apiUrl = process.env.VITE_FRONTEND_FORGE_API_URL || 'https://dj.siumingho.dpdns.org/api/trpc';
      const response = await fetch(`${apiUrl}/traffic.getUsage`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        console.error('[TrafficMonitor] Failed to fetch traffic usage:', response.status);
        return null;
      }

      const data = await response.json();

      // Handle tRPC response format
      if (data.result && data.result.data) {
        return data.result.data;
      }

      return data;
    } catch (error) {
      console.error('[TrafficMonitor] Error fetching traffic usage:', error);
      return null;
    }
  });

  console.log('[Main] Traffic monitoring initialized');
}

/**
 * Handle app ready event
 */
app.on('ready', () => {
  createWindow();

  // Initialize auto-update checking
  initAutoUpdate();

  // Initialize traffic monitoring
  if (mainWindow) {
    initializeTrafficMonitoring();
  }
});

/**
 * Handle window all closed event
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * Handle app activate event (macOS)
 */
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * IPC Handlers for Onboarding
 */

// Get onboarding status
ipcMain.handle('get-onboarding-status', async () => {
  try {
    const userDataPath = app.getPath('userData');
    const onboardingFile = path.join(userDataPath, 'onboarding-status.json');

    if (fs.existsSync(onboardingFile)) {
      const data = JSON.parse(fs.readFileSync(onboardingFile, 'utf-8'));
      return data;
    }

    return {
      completed: false,
      currentStep: 0,
      skipped: false,
    };
  } catch (error) {
    console.error('[IPC] Error reading onboarding status:', error);
    return {
      completed: false,
      currentStep: 0,
      skipped: false,
    };
  }
});

// Update onboarding status
ipcMain.handle('update-onboarding-status', async (_, status) => {
  try {
    const userDataPath = app.getPath('userData');
    const onboardingFile = path.join(userDataPath, 'onboarding-status.json');

    // Ensure directory exists
    if (!fs.existsSync(userDataPath)) {
      fs.mkdirSync(userDataPath, { recursive: true });
    }

    fs.writeFileSync(onboardingFile, JSON.stringify(status, null, 2));
    console.log('[IPC] Onboarding status updated:', status);
    return { success: true };
  } catch (error) {
    console.error('[IPC] Error updating onboarding status:', error);
    return { success: false, error: (error as Error).message };
  }
});

// Skip onboarding
ipcMain.handle('skip-onboarding', async () => {
  try {
    const userDataPath = app.getPath('userData');
    const onboardingFile = path.join(userDataPath, 'onboarding-status.json');

    const status = {
      completed: false,
      currentStep: 0,
      skipped: true,
      skippedAt: new Date().toISOString(),
    };

    fs.writeFileSync(onboardingFile, JSON.stringify(status, null, 2));
    console.log('[IPC] Onboarding skipped');
    return { success: true };
  } catch (error) {
    console.error('[IPC] Error skipping onboarding:', error);
    return { success: false, error: (error as Error).message };
  }
});

/**
 * IPC Handlers for App Info
 */

// Get app version
ipcMain.handle('get-app-version', async () => {
  return {
    version: getAppVersion(),
    platform: process.platform,
    arch: process.arch,
  };
});

// Get app path
ipcMain.handle('get-app-path', async (_, name: string) => {
  return app.getPath(name as any);
});

/**
 * Handle any uncaught exceptions
 */
process.on('uncaughtException', (error) => {
  console.error('[Main] Uncaught exception:', error);
  if (mainWindow) {
    dialog.showErrorBox('Error', 'An unexpected error occurred. Please restart the application.');
  }
});

export { mainWindow, trafficMonitor };
