var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// client-src/main.ts
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
var mainWindow = null;
function createWindow() {
  console.log("[Main] Creating window...");
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    show: true,
    // 立即显示窗口
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
      // 如果需要 preload 脚本
    },
    title: "LogVPN",
    icon: path.join(__dirname, "..", "resources", "icon-1024.png")
    // 应用图标
  });
  console.log("[Main] Window created successfully");
  if (process.env.NODE_ENV === "development") {
    console.log("[Main] Loading development server...");
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, "..", "dist", "index.html");
    console.log("[Main] Loading production HTML from:", indexPath);
    console.log("[Main] __dirname:", __dirname);
    const fs = __require("fs");
    if (fs.existsSync(indexPath)) {
      console.log("[Main] index.html found, loading...");
      mainWindow.loadFile(indexPath).catch((err) => {
        console.error("[Main] Failed to load file:", err);
      });
    } else {
      console.error("[Main] index.html NOT FOUND at:", indexPath);
      const altPath = path.join(process.resourcesPath, "app", "dist", "index.html");
      console.log("[Main] Trying alternative path:", altPath);
      if (fs.existsSync(altPath)) {
        console.log("[Main] Alternative path found, loading...");
        mainWindow.loadFile(altPath).catch((err) => {
          console.error("[Main] Failed to load from alternative path:", err);
        });
      } else {
        console.error("[Main] Alternative path also NOT FOUND");
      }
    }
  }
  mainWindow.webContents.on("did-finish-load", () => {
    console.log("[Main] Page loaded successfully");
  });
  mainWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    console.error("[Main] Page failed to load:", errorCode, errorDescription);
  });
  mainWindow.on("closed", () => {
    console.log("[Main] Window closed");
    mainWindow = null;
  });
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});
ipcMain.handle("get-app-path", () => {
  return app.getPath("userData");
});
var gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
