var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// client-src/main.ts
import { app as app2, BrowserWindow as BrowserWindow2, ipcMain as ipcMain3, dialog as dialog3, Menu } from "electron";
import * as path2 from "path";
import * as fs2 from "fs";
import { fileURLToPath } from "url";

// client-src/autoUpdate.ts
import { ipcMain, ipcRenderer, app, dialog } from "electron";
import * as fs from "fs";
import * as path from "path";
var APP_VERSION = app?.getVersion?.() || "1.0.0";
var UPDATE_CHECK_INTERVAL = 7 * 24 * 60 * 60 * 1e3;
var LAST_UPDATE_CHECK_FILE = path.join(app?.getPath?.("userData") || "", "last-update-check.json");
function getLastUpdateCheckTime() {
  try {
    if (fs.existsSync(LAST_UPDATE_CHECK_FILE)) {
      const data = JSON.parse(fs.readFileSync(LAST_UPDATE_CHECK_FILE, "utf-8"));
      return data.timestamp || 0;
    }
  } catch (error) {
    console.error("Error reading last update check:", error);
  }
  return 0;
}
function saveLastUpdateCheckTime() {
  try {
    const data = { timestamp: Date.now() };
    fs.writeFileSync(LAST_UPDATE_CHECK_FILE, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving last update check time:", error);
  }
}
function shouldCheckForUpdate() {
  const lastCheckTime = getLastUpdateCheckTime();
  const now = Date.now();
  return now - lastCheckTime >= UPDATE_CHECK_INTERVAL;
}
async function checkForUpdateFromServer() {
  try {
    const apiUrl = process.env.VITE_FRONTEND_FORGE_API_URL || "https://dj.siumingho.dpdns.org/api/trpc";
    const response = await fetch(`${apiUrl}/version.check?input=${encodeURIComponent(JSON.stringify({ currentVersion: APP_VERSION }))}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.result && data.result.data) {
      return data.result.data;
    }
    return data;
  } catch (error) {
    console.error("Error checking for updates:", error);
    return {
      hasUpdate: false,
      currentVersion: APP_VERSION,
      latestVersion: APP_VERSION
    };
  }
}
async function handleUpdateCheck() {
  if (!shouldCheckForUpdate()) {
    console.log("Update check skipped - checked recently");
    return;
  }
  console.log("Checking for updates...");
  const result = await checkForUpdateFromServer();
  saveLastUpdateCheckTime();
  if (result.hasUpdate && result.updateInfo) {
    const { updateInfo } = result;
    const options = {
      type: "info",
      title: "Log VPN \u66F4\u65B0\u53EF\u7528",
      message: `\u53D1\u73B0\u65B0\u7248\u672C ${updateInfo.version}`,
      detail: `${updateInfo.releaseNotes}

\u70B9\u51FB"\u4E0B\u8F7D"\u7ACB\u5373\u66F4\u65B0\u3002`,
      buttons: updateInfo.mandatory ? ["\u4E0B\u8F7D"] : ["\u4E0B\u8F7D", "\u7A0D\u540E\u63D0\u9192"],
      defaultId: 0,
      cancelId: 1
    };
    if (ipcMain) {
      const mainWindow2 = __require("electron").BrowserWindow.getFocusedWindow();
      if (mainWindow2) {
        const response = await dialog.showMessageBox(mainWindow2, options);
        if (response.response === 0) {
          __require("electron").shell.openExternal(updateInfo.downloadUrl);
          if (updateInfo.mandatory) {
            setTimeout(() => {
              app.quit();
            }, 3e3);
          }
        }
      }
    } else if (ipcRenderer) {
      ipcRenderer.send("show-update-dialog", { options, updateInfo });
    }
  }
}
function initAutoUpdate() {
  if (ipcMain) {
    if (app.isReady()) {
      handleUpdateCheck().catch(console.error);
    } else {
      app.on("ready", () => {
        handleUpdateCheck().catch(console.error);
      });
    }
    setInterval(() => {
      handleUpdateCheck().catch(console.error);
    }, UPDATE_CHECK_INTERVAL);
    ipcMain.on("check-for-updates", async (event) => {
      const result = await checkForUpdateFromServer();
      event.reply("update-check-result", result);
    });
    ipcMain.on("show-update-dialog", async (event, { options, updateInfo }) => {
      const mainWindow2 = __require("electron").BrowserWindow.getFocusedWindow();
      if (mainWindow2) {
        const response = await dialog.showMessageBox(mainWindow2, options);
        if (response.response === 0) {
          __require("electron").shell.openExternal(updateInfo.downloadUrl);
          if (updateInfo.mandatory) {
            setTimeout(() => {
              app.quit();
            }, 3e3);
          }
        }
      }
    });
  }
}
function getAppVersion() {
  return APP_VERSION;
}

// client-src/trafficMonitor.ts
import { ipcMain as ipcMain2, dialog as dialog2 } from "electron";
var TrafficMonitor = class {
  config;
  checkTimer = null;
  lastWarningTime = 0;
  warningCooldown = 6e4;
  // 1 分钟内不重复警告
  mainWindow = null;
  constructor(config = {}, mainWindow2) {
    this.config = {
      checkInterval: config.checkInterval || 6e4,
      // 默认 1 分钟检查一次
      warningThreshold: config.warningThreshold || 80,
      criticalThreshold: config.criticalThreshold || 95
    };
    this.mainWindow = mainWindow2 || null;
  }
  /**
   * 启动流量监控
   */
  start(getTrafficUsage) {
    if (this.checkTimer) {
      console.warn("[TrafficMonitor] Monitor already running");
      return;
    }
    console.log("[TrafficMonitor] Starting traffic monitor");
    this.checkTraffic(getTrafficUsage);
    this.checkTimer = setInterval(() => {
      this.checkTraffic(getTrafficUsage);
    }, this.config.checkInterval);
  }
  /**
   * 停止流量监控
   */
  stop() {
    if (this.checkTimer) {
      clearInterval(this.checkTimer);
      this.checkTimer = null;
      console.log("[TrafficMonitor] Traffic monitor stopped");
    }
  }
  /**
   * 检查流量并发送警告
   */
  async checkTraffic(getTrafficUsage) {
    try {
      const usage = await getTrafficUsage();
      if (!usage) {
        return;
      }
      const now = Date.now();
      const shouldWarn = (usage.dailyPercentage >= this.config.warningThreshold || usage.monthlyPercentage >= this.config.warningThreshold) && now - this.lastWarningTime > this.warningCooldown;
      if (shouldWarn) {
        this.lastWarningTime = now;
        this.showWarning(usage);
      }
      if (this.mainWindow && !this.mainWindow.isDestroyed()) {
        this.mainWindow.webContents.send("traffic-update", usage);
      }
    } catch (error) {
      console.error("[TrafficMonitor] Error checking traffic:", error);
    }
  }
  /**
   * 显示流量警告
   */
  showWarning(usage) {
    const message = this.getWarningMessage(usage);
    if (!message) {
      return;
    }
    console.log("[TrafficMonitor] Showing warning:", message);
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      dialog2.showMessageBox(this.mainWindow, {
        type: "warning",
        title: "\u6D41\u91CF\u4F7F\u7528\u63D0\u9192",
        message,
        buttons: ["\u786E\u5B9A", "\u67E5\u770B\u8BE6\u60C5"]
      });
    }
  }
  /**
   * 生成警告消息
   */
  getWarningMessage(usage) {
    if (usage.isDailyLimitReached) {
      return `\u26A0\uFE0F \u4ECA\u5929\u7684\u6D41\u91CF\u5DF2\u7528\u5B8C\uFF01
\u5DF2\u4F7F\u7528\uFF1A${usage.dailyUsed.toFixed(2)}GB / ${usage.dailyLimit}GB
\u8BF7\u7B49\u5F85\u660E\u5929\u91CD\u7F6E\u3002`;
    }
    if (usage.isMonthlyLimitReached) {
      return `\u26A0\uFE0F \u672C\u6708\u7684\u6D41\u91CF\u5DF2\u7528\u5B8C\uFF01
\u5DF2\u4F7F\u7528\uFF1A${usage.monthlyUsed.toFixed(2)}GB / ${usage.monthlyLimit}GB
\u8BF7\u7B49\u5F85\u4E0B\u6708\u91CD\u7F6E\u3002`;
    }
    if (usage.dailyPercentage >= this.config.criticalThreshold) {
      return `\u26A0\uFE0F \u4ECA\u5929\u6D41\u91CF\u5373\u5C06\u7528\u5B8C\uFF01
\u5DF2\u4F7F\u7528\uFF1A${usage.dailyUsed.toFixed(2)}GB / ${usage.dailyLimit}GB (${usage.dailyPercentage}%)
\u5269\u4F59\uFF1A${usage.dailyRemaining.toFixed(2)}GB`;
    }
    if (usage.monthlyPercentage >= this.config.criticalThreshold) {
      return `\u26A0\uFE0F \u672C\u6708\u6D41\u91CF\u5373\u5C06\u7528\u5B8C\uFF01
\u5DF2\u4F7F\u7528\uFF1A${usage.monthlyUsed.toFixed(2)}GB / ${usage.monthlyLimit}GB (${usage.monthlyPercentage}%)
\u5269\u4F59\uFF1A${usage.monthlyRemaining.toFixed(2)}GB`;
    }
    if (usage.dailyPercentage >= this.config.warningThreshold) {
      return `\u{1F4A1} \u4ECA\u5929\u6D41\u91CF\u4F7F\u7528\u5DF2\u8FBE ${usage.dailyPercentage}%
\u5DF2\u4F7F\u7528\uFF1A${usage.dailyUsed.toFixed(2)}GB / ${usage.dailyLimit}GB
\u5269\u4F59\uFF1A${usage.dailyRemaining.toFixed(2)}GB`;
    }
    if (usage.monthlyPercentage >= this.config.warningThreshold) {
      return `\u{1F4A1} \u672C\u6708\u6D41\u91CF\u4F7F\u7528\u5DF2\u8FBE ${usage.monthlyPercentage}%
\u5DF2\u4F7F\u7528\uFF1A${usage.monthlyUsed.toFixed(2)}GB / ${usage.monthlyLimit}GB
\u5269\u4F59\uFF1A${usage.monthlyRemaining.toFixed(2)}GB`;
    }
    return null;
  }
  /**
   * 设置主窗口
   */
  setMainWindow(mainWindow2) {
    this.mainWindow = mainWindow2;
  }
  /**
   * 获取配置
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * 更新配置
   */
  updateConfig(config) {
    this.config = { ...this.config, ...config };
  }
};
function setupTrafficMonitorIPC(trafficMonitor2) {
  ipcMain2.handle("get-traffic-usage", async () => {
    return null;
  });
  ipcMain2.handle("start-traffic-monitor", async () => {
    console.log("[IPC] Starting traffic monitor");
    return { success: true };
  });
  ipcMain2.handle("stop-traffic-monitor", async () => {
    trafficMonitor2.stop();
    console.log("[IPC] Traffic monitor stopped");
    return { success: true };
  });
  ipcMain2.handle("get-traffic-config", async () => {
    return trafficMonitor2.getConfig();
  });
  ipcMain2.handle("update-traffic-config", async (_, config) => {
    trafficMonitor2.updateConfig(config);
    console.log("[IPC] Traffic monitor config updated:", config);
    return { success: true };
  });
}

// client-src/main.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path2.dirname(__filename);
var isDev = process.env.NODE_ENV === "development" || process.env.VITE_DEV_SERVER_HOST;
var mainWindow = null;
var trafficMonitor = null;
function createWindow() {
  mainWindow = new BrowserWindow2({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      // 修复：生产环境引用编译后的 .js 文件
      preload: path2.join(__dirname, isDev ? "preload.ts" : "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true
    },
    // 修复：引用 client/public 下的图标，确保打包后路径正确
    icon: path2.join(__dirname, isDev ? "../client/public/favicon.ico" : "../dist/public/favicon.ico")
  });
  const startUrl = isDev ? "http://localhost:3000" : `file://${path2.join(__dirname, "../dist/public/index.html")}`;
  mainWindow.loadURL(startUrl);
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
    if (trafficMonitor) {
      trafficMonitor.stop();
    }
  });
  createMenu();
}
function createMenu() {
  const template = [
    {
      label: "\u6587\u4EF6",
      submenu: [
        {
          label: "\u9000\u51FA",
          accelerator: "CmdOrCtrl+Q",
          click: () => {
            app2.quit();
          }
        }
      ]
    },
    {
      label: "\u7F16\u8F91",
      submenu: [
        { role: "undo", label: "\u64A4\u9500" },
        { role: "redo", label: "\u91CD\u505A" },
        { type: "separator" },
        { role: "cut", label: "\u526A\u5207" },
        { role: "copy", label: "\u590D\u5236" },
        { role: "paste", label: "\u7C98\u8D34" }
      ]
    },
    {
      label: "\u89C6\u56FE",
      submenu: [
        { role: "reload", label: "\u5237\u65B0" },
        { role: "forceReload", label: "\u5F3A\u5236\u5237\u65B0" },
        { role: "toggleDevTools", label: "\u5F00\u53D1\u8005\u5DE5\u5177" }
      ]
    },
    {
      label: "\u5E2E\u52A9",
      submenu: [
        {
          label: "\u5173\u4E8E Log VPN",
          click: () => {
            dialog3.showMessageBox(mainWindow, {
              type: "info",
              title: "\u5173\u4E8E Log VPN",
              message: "Log VPN",
              detail: `\u7248\u672C ${getAppVersion()}

\u6781\u901F\u3001\u5B89\u5168\u3001\u53EF\u9760\u7684 VPN \u670D\u52A1\u3002`
            });
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
function initializeTrafficMonitoring() {
  if (!mainWindow) {
    return;
  }
  trafficMonitor = new TrafficMonitor(
    {
      checkInterval: 6e4,
      warningThreshold: 80,
      criticalThreshold: 95
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
      const apiUrl = process.env.VITE_FRONTEND_FORGE_API_URL || "https://dj.siumingho.dpdns.org/api/trpc";
      const response = await fetch(`${apiUrl}/traffic.getUsage`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
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
      console.error("[TrafficMonitor] Error:", error);
      return null;
    }
  });
}
app2.on("ready", () => {
  createWindow();
  initAutoUpdate();
  if (mainWindow) {
    initializeTrafficMonitoring();
  }
});
app2.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app2.quit();
  }
});
app2.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
ipcMain3.handle("get-onboarding-status", async () => {
  try {
    const userDataPath = app2.getPath("userData");
    const onboardingFile = path2.join(userDataPath, "onboarding-status.json");
    if (fs2.existsSync(onboardingFile)) {
      return JSON.parse(fs2.readFileSync(onboardingFile, "utf-8"));
    }
    return { completed: false, currentStep: 0, skipped: false };
  } catch (error) {
    return { completed: false, currentStep: 0, skipped: false };
  }
});
ipcMain3.handle("update-onboarding-status", async (_, status) => {
  try {
    const userDataPath = app2.getPath("userData");
    const onboardingFile = path2.join(userDataPath, "onboarding-status.json");
    if (!fs2.existsSync(userDataPath)) {
      fs2.mkdirSync(userDataPath, { recursive: true });
    }
    fs2.writeFileSync(onboardingFile, JSON.stringify(status, null, 2));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
ipcMain3.handle("get-app-version", async () => {
  return {
    version: getAppVersion(),
    platform: process.platform,
    arch: process.arch
  };
});
ipcMain3.handle("get-app-path", async (_, name) => {
  return app2.getPath(name);
});
process.on("uncaughtException", (error) => {
  console.error("[Main] Uncaught exception:", error);
});
export {
  mainWindow,
  trafficMonitor
};
