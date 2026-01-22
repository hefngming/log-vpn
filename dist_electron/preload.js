// client-src/preload.ts
import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electron", {
  // Auto-update APIs
  checkForUpdates: () => ipcRenderer.send("check-for-updates"),
  onUpdateCheckResult: (callback) => {
    ipcRenderer.on("update-check-result", (_, result) => callback(result));
  },
  // Traffic monitoring APIs
  getTrafficUsage: () => ipcRenderer.invoke("get-traffic-usage"),
  startTrafficMonitor: () => ipcRenderer.invoke("start-traffic-monitor"),
  stopTrafficMonitor: () => ipcRenderer.invoke("stop-traffic-monitor"),
  getTrafficConfig: () => ipcRenderer.invoke("get-traffic-config"),
  updateTrafficConfig: (config) => ipcRenderer.invoke("update-traffic-config", config),
  onTrafficUpdate: (callback) => {
    ipcRenderer.on("traffic-update", (_, usage) => callback(usage));
  },
  // Onboarding APIs
  getOnboardingStatus: () => ipcRenderer.invoke("get-onboarding-status"),
  updateOnboardingStatus: (status) => ipcRenderer.invoke("update-onboarding-status", status),
  skipOnboarding: () => ipcRenderer.invoke("skip-onboarding"),
  // App info APIs
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
  getAppPath: (name) => ipcRenderer.invoke("get-app-path", name),
  // Utility APIs
  openExternal: (url) => ipcRenderer.invoke("open-external", url),
  showMessageBox: (options) => ipcRenderer.invoke("show-message-box", options)
});
console.log("[Preload] Electron APIs exposed to renderer process");
