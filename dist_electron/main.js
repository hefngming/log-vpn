// client-src/main.ts
import { app, BrowserWindow, dialog } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (app.isPackaged) {
    const htmlPath = path.join(__dirname, "../dist/index.html");
    console.log("[Electron] Loading:", htmlPath);
    console.log("[Electron] File exists:", fs.existsSync(htmlPath));
    if (fs.existsSync(htmlPath)) {
      win.loadFile(htmlPath);
    } else {
      dialog.showErrorBox("Error", `Cannot find index.html at: ${htmlPath}`);
    }
  } else {
    win.loadURL("http://localhost:5173");
  }
  win.webContents.openDevTools();
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
