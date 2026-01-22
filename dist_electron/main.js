// client-src/main.ts
import { app, BrowserWindow, dialog } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
function createWindow() {
  const win = new BrowserWindow({
    width: 1e3,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (app.isPackaged) {
    const possiblePath1 = path.join(__dirname, "../dist/index.html");
    const possiblePath2 = path.join(__dirname, "dist/index.html");
    const possiblePath3 = path.join(process.resourcesPath, "app.asar/dist/index.html");
    let finalPath = "";
    if (fs.existsSync(possiblePath1)) finalPath = possiblePath1;
    else if (fs.existsSync(possiblePath2)) finalPath = possiblePath2;
    else if (fs.existsSync(possiblePath3)) finalPath = possiblePath3;
    if (!finalPath) {
      dialog.showErrorBox("\u6587\u4EF6\u7F3A\u5931", `\u5728\u4EE5\u4E0B\u8DEF\u5F84\u90FD\u6CA1\u627E\u5230\u7F51\u9875\u6587\u4EF6:
1: ${possiblePath1}
2: ${possiblePath2}
3: ${possiblePath3}`);
    } else {
      win.loadFile(finalPath);
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
