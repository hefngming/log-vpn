/**
 * Auto Update Module for Electron Client
 * Handles version checking and automatic updates
 */

import { ipcMain, ipcRenderer, app, dialog } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

const APP_VERSION = app?.getVersion?.() || '1.0.0';
const UPDATE_CHECK_INTERVAL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const LAST_UPDATE_CHECK_FILE = path.join(app?.getPath?.('userData') || '', 'last-update-check.json');

interface UpdateCheckResult {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  updateInfo?: {
    version: string;
    releaseDate: string;
    downloadUrl: string;
    releaseNotes: string;
    mandatory: boolean;
  };
}

/**
 * Get the timestamp of the last update check
 */
function getLastUpdateCheckTime(): number {
  try {
    if (fs.existsSync(LAST_UPDATE_CHECK_FILE)) {
      const data = JSON.parse(fs.readFileSync(LAST_UPDATE_CHECK_FILE, 'utf-8'));
      return data.timestamp || 0;
    }
  } catch (error) {
    console.error('Error reading last update check:', error);
  }
  return 0;
}

/**
 * Save the current timestamp as the last update check time
 */
function saveLastUpdateCheckTime(): void {
  try {
    const data = { timestamp: Date.now() };
    fs.writeFileSync(LAST_UPDATE_CHECK_FILE, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving last update check time:', error);
  }
}

/**
 * Check if enough time has passed since the last update check
 */
function shouldCheckForUpdate(): boolean {
  const lastCheckTime = getLastUpdateCheckTime();
  const now = Date.now();
  return now - lastCheckTime >= UPDATE_CHECK_INTERVAL;
}

/**
 * Check for updates from the API server
 */
async function checkForUpdateFromServer(): Promise<UpdateCheckResult> {
  try {
    const apiUrl = process.env.VITE_FRONTEND_FORGE_API_URL || 'https://dj.siumingho.dpdns.org/api/trpc';
    
    const response = await fetch(`${apiUrl}/version.check?input=${encodeURIComponent(JSON.stringify({ currentVersion: APP_VERSION }))}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle tRPC response format
    if (data.result && data.result.data) {
      return data.result.data;
    }

    return data;
  } catch (error) {
    console.error('Error checking for updates:', error);
    return {
      hasUpdate: false,
      currentVersion: APP_VERSION,
      latestVersion: APP_VERSION,
    };
  }
}

/**
 * Handle the update check and show dialog if update is available
 */
async function handleUpdateCheck(): Promise<void> {
  // Check if enough time has passed since last check
  if (!shouldCheckForUpdate()) {
    console.log('Update check skipped - checked recently');
    return;
  }

  console.log('Checking for updates...');
  const result = await checkForUpdateFromServer();
  
  // Save the check time
  saveLastUpdateCheckTime();

  if (result.hasUpdate && result.updateInfo) {
    const { updateInfo } = result;
    
    // Show update notification
    const options = {
      type: 'info' as const,
      title: 'Log VPN 更新可用',
      message: `发现新版本 ${updateInfo.version}`,
      detail: `${updateInfo.releaseNotes}\n\n点击"下载"立即更新。`,
      buttons: updateInfo.mandatory ? ['下载'] : ['下载', '稍后提醒'],
      defaultId: 0,
      cancelId: 1,
    };

    if (ipcMain) {
      // Main process
      const mainWindow = require('electron').BrowserWindow.getFocusedWindow();
      if (mainWindow) {
        const response = await dialog.showMessageBox(mainWindow, options);
        
        if (response.response === 0) {
          // User clicked "Download"
          require('electron').shell.openExternal(updateInfo.downloadUrl);
          
          if (updateInfo.mandatory) {
            // For mandatory updates, quit the app after a delay
            setTimeout(() => {
              app.quit();
            }, 3000);
          }
        }
      }
    } else if (ipcRenderer) {
      // Renderer process
      ipcRenderer.send('show-update-dialog', { options, updateInfo });
    }
  }
}

/**
 * Initialize auto-update checking
 */
export function initAutoUpdate(): void {
  if (ipcMain) {
    // Main process initialization
    
    // Check for updates when app starts
    if (app.isReady()) {
      handleUpdateCheck().catch(console.error);
    } else {
      app.on('ready', () => {
        handleUpdateCheck().catch(console.error);
      });
    }

    // Set up periodic checks (weekly)
    setInterval(() => {
      handleUpdateCheck().catch(console.error);
    }, UPDATE_CHECK_INTERVAL);

    // Handle IPC messages from renderer
    ipcMain.on('check-for-updates', async (event) => {
      const result = await checkForUpdateFromServer();
      event.reply('update-check-result', result);
    });

    ipcMain.on('show-update-dialog', async (event, { options, updateInfo }) => {
      const mainWindow = require('electron').BrowserWindow.getFocusedWindow();
      if (mainWindow) {
        const response = await dialog.showMessageBox(mainWindow, options);
        
        if (response.response === 0) {
          require('electron').shell.openExternal(updateInfo.downloadUrl);
          
          if (updateInfo.mandatory) {
            setTimeout(() => {
              app.quit();
            }, 3000);
          }
        }
      }
    });
  }
}

/**
 * Manually trigger update check from renderer process
 */
export function requestUpdateCheck(): void {
  if (ipcRenderer) {
    ipcRenderer.send('check-for-updates');
  }
}

/**
 * Get current app version
 */
export function getAppVersion(): string {
  return APP_VERSION;
}

/**
 * Get last update check time
 */
export function getLastUpdateCheckTimeFormatted(): string {
  const timestamp = getLastUpdateCheckTime();
  if (timestamp === 0) {
    return '从未检查';
  }
  return new Date(timestamp).toLocaleString();
}
