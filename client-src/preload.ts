/**
 * Preload Script
 * Provides secure IPC interface for renderer process
 */

import { contextBridge, ipcRenderer } from 'electron';

/**
 * Expose safe APIs to renderer process
 */
contextBridge.exposeInMainWorld('electron', {
  // Auto-update APIs
  checkForUpdates: () => ipcRenderer.send('check-for-updates'),
  onUpdateCheckResult: (callback: (result: any) => void) => {
    ipcRenderer.on('update-check-result', (_, result) => callback(result));
  },

  // Traffic monitoring APIs
  getTrafficUsage: () => ipcRenderer.invoke('get-traffic-usage'),
  startTrafficMonitor: () => ipcRenderer.invoke('start-traffic-monitor'),
  stopTrafficMonitor: () => ipcRenderer.invoke('stop-traffic-monitor'),
  getTrafficConfig: () => ipcRenderer.invoke('get-traffic-config'),
  updateTrafficConfig: (config: any) => ipcRenderer.invoke('update-traffic-config', config),
  onTrafficUpdate: (callback: (usage: any) => void) => {
    ipcRenderer.on('traffic-update', (_, usage) => callback(usage));
  },

  // Onboarding APIs
  getOnboardingStatus: () => ipcRenderer.invoke('get-onboarding-status'),
  updateOnboardingStatus: (status: any) => ipcRenderer.invoke('update-onboarding-status', status),
  skipOnboarding: () => ipcRenderer.invoke('skip-onboarding'),

  // App info APIs
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getAppPath: (name: string) => ipcRenderer.invoke('get-app-path', name),

  // Utility APIs
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),
  showMessageBox: (options: any) => ipcRenderer.invoke('show-message-box', options),
});

/**
 * Preload script initialization
 */
console.log('[Preload] Electron APIs exposed to renderer process');
