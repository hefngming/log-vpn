/**
 * Electron Main Process Integration Example
 * This shows how to integrate the auto-update module into your Electron main process
 */

import { app, BrowserWindow } from 'electron';
import { initAutoUpdate } from './autoUpdate';

// Initialize auto-update when app is ready
app.on('ready', () => {
  // Initialize auto-update checking
  initAutoUpdate();

  // Create your main window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the app
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../dist/index.html')}`);

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Re-create window when app is activated (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    // Recreate window
  }
});
