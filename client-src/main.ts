import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { spawn, ChildProcess } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let v2rayProcess: ChildProcess | null = null;
let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (app.isPackaged) {
    const htmlPath = path.join(__dirname, '../dist/index.html');
    console.log('[Electron] Loading:', htmlPath);
    console.log('[Electron] File exists:', fs.existsSync(htmlPath));
    
    if (fs.existsSync(htmlPath)) {
      mainWindow.loadFile(htmlPath);
    } else {
      dialog.showErrorBox('Error', `Cannot find index.html at: ${htmlPath}`);
    }
  } else {
    mainWindow.loadURL('http://localhost:5173');
  }

  // Open DevTools for debugging
  mainWindow.webContents.openDevTools();
}

// IPC 处理：连接 VPN
ipcMain.handle('connect-vpn', async (event, nodeId: number) => {
  try {
    // 获取节点配置
    const response = await fetch(`https://dj.siumingho.dpdns.org/api/trpc/nodes.getEncrypted`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        json: { userId: 1 } // TODO: 从登录状态获取真实 userId
      }),
    });

    const data = await response.json();
    const nodes = data.result?.data?.json || [];
    const node = nodes.find((n: any) => n.id === nodeId);

    if (!node) {
      return { success: false, message: '节点不存在' };
    }

    // 解密节点配置（这里假设后端已经返回解密后的配置）
    const config = JSON.parse(node.config);

    // 生成 v2ray 配置文件
    const v2rayConfigPath = path.join(app.getPath('userData'), 'v2ray-config.json');
    const v2rayConfig = {
      inbounds: [
        {
          port: 10808,
          protocol: 'socks',
          settings: {
            udp: true
          }
        }
      ],
      outbounds: [
        {
          protocol: config.protocol || 'vless',
          settings: config.settings,
          streamSettings: config.streamSettings
        }
      ]
    };

    fs.writeFileSync(v2rayConfigPath, JSON.stringify(v2rayConfig, null, 2));

    // 启动 v2ray
    const v2rayPath = app.isPackaged
      ? path.join(process.resourcesPath, 'v2ray-core', 'v2ray.exe')
      : path.join(__dirname, '../v2ray-core', 'v2ray.exe');

    if (!fs.existsSync(v2rayPath)) {
      return { success: false, message: 'v2ray 核心文件不存在' };
    }

    // 停止之前的进程
    if (v2rayProcess) {
      v2rayProcess.kill();
    }

    v2rayProcess = spawn(v2rayPath, ['-config', v2rayConfigPath]);

    v2rayProcess.on('error', (error) => {
      console.error('[v2ray] Error:', error);
      mainWindow?.webContents.send('vpn-error', error.message);
    });

    v2rayProcess.on('exit', (code) => {
      console.log('[v2ray] Exited with code:', code);
      mainWindow?.webContents.send('vpn-disconnected');
    });

    return { success: true, message: '连接成功' };
  } catch (error: any) {
    console.error('[connect-vpn] Error:', error);
    return { success: false, message: error.message };
  }
});

// IPC 处理：断开 VPN
ipcMain.handle('disconnect-vpn', async () => {
  try {
    if (v2rayProcess) {
      v2rayProcess.kill();
      v2rayProcess = null;
      return { success: true, message: '已断开连接' };
    }
    return { success: false, message: '未连接' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
});

// IPC 处理：获取流量统计
ipcMain.handle('get-traffic-stats', async () => {
  try {
    // TODO: 实现流量统计功能
    return {
      success: true,
      data: {
        upload: 0,
        download: 0,
        total: 0
      }
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // 退出前停止 v2ray
  if (v2rayProcess) {
    v2rayProcess.kill();
  }
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
