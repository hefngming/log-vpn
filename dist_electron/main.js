// client-src/main.ts
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { spawn } from "child_process";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var v2rayProcess = null;
var mainWindow = null;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js")
    }
  });
  if (app.isPackaged) {
    const htmlPath = path.join(__dirname, "../dist/index.html");
    console.log("[Electron] Loading:", htmlPath);
    console.log("[Electron] File exists:", fs.existsSync(htmlPath));
    if (fs.existsSync(htmlPath)) {
      mainWindow.loadFile(htmlPath);
    } else {
      dialog.showErrorBox("Error", `Cannot find index.html at: ${htmlPath}`);
    }
  } else {
    mainWindow.loadURL("http://localhost:5173");
  }
  mainWindow.webContents.openDevTools();
}
ipcMain.handle("connect-vpn", async (event, nodeId) => {
  try {
    const response = await fetch(`https://dj.siumingho.dpdns.org/api/trpc/nodes.getEncrypted`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        json: { userId: 1 }
        // TODO: 从登录状态获取真实 userId
      })
    });
    const data = await response.json();
    const nodes = data.result?.data?.json || [];
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) {
      return { success: false, message: "\u8282\u70B9\u4E0D\u5B58\u5728" };
    }
    const config = JSON.parse(node.config);
    const v2rayConfigPath = path.join(app.getPath("userData"), "v2ray-config.json");
    const v2rayConfig = {
      inbounds: [
        {
          port: 10808,
          protocol: "socks",
          settings: {
            udp: true
          }
        }
      ],
      outbounds: [
        {
          protocol: config.protocol || "vless",
          settings: config.settings,
          streamSettings: config.streamSettings
        }
      ]
    };
    fs.writeFileSync(v2rayConfigPath, JSON.stringify(v2rayConfig, null, 2));
    const v2rayPath = app.isPackaged ? path.join(process.resourcesPath, "v2ray-core", "v2ray.exe") : path.join(__dirname, "../v2ray-core", "v2ray.exe");
    if (!fs.existsSync(v2rayPath)) {
      return { success: false, message: "v2ray \u6838\u5FC3\u6587\u4EF6\u4E0D\u5B58\u5728" };
    }
    if (v2rayProcess) {
      v2rayProcess.kill();
    }
    v2rayProcess = spawn(v2rayPath, ["-config", v2rayConfigPath]);
    v2rayProcess.on("error", (error) => {
      console.error("[v2ray] Error:", error);
      mainWindow?.webContents.send("vpn-error", error.message);
    });
    v2rayProcess.on("exit", (code) => {
      console.log("[v2ray] Exited with code:", code);
      mainWindow?.webContents.send("vpn-disconnected");
    });
    return { success: true, message: "\u8FDE\u63A5\u6210\u529F" };
  } catch (error) {
    console.error("[connect-vpn] Error:", error);
    return { success: false, message: error.message };
  }
});
ipcMain.handle("disconnect-vpn", async () => {
  try {
    if (v2rayProcess) {
      v2rayProcess.kill();
      v2rayProcess = null;
      return { success: true, message: "\u5DF2\u65AD\u5F00\u8FDE\u63A5" };
    }
    return { success: false, message: "\u672A\u8FDE\u63A5" };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
ipcMain.handle("get-traffic-stats", async () => {
  try {
    return {
      success: true,
      data: {
        upload: 0,
        download: 0,
        total: 0
      }
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (v2rayProcess) {
    v2rayProcess.kill();
  }
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
