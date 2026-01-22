import { app, BrowserWindow, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    const possiblePath1 = path.join(__dirname, '../dist/index.html');
    const possiblePath2 = path.join(__dirname, 'dist/index.html');
    const possiblePath3 = path.join(process.resourcesPath, 'app.asar/dist/index.html');
    
    let finalPath = '';
    if (fs.existsSync(possiblePath1)) finalPath = possiblePath1;
    else if (fs.existsSync(possiblePath2)) finalPath = possiblePath2;
    else if (fs.existsSync(possiblePath3)) finalPath = possiblePath3;
    
    if (!finalPath) {
      // 如果三个路径都找不到，弹出大白话报错
      dialog.showErrorBox('文件缺失', `在以下路径都没找到网页文件:\n1: ${possiblePath1}\n2: ${possiblePath2}\n3: ${possiblePath3}`);
    } else {
      win.loadFile(finalPath);
    }
  } else {
    win.loadURL('http://localhost:5173');
  }

  // Enable DevTools
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
