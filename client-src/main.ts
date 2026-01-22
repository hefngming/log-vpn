import { app, BrowserWindow } from 'electron';
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
    // Try multiple paths with diagnostic logging
    const pathsToTry = [
      path.join(__dirname, '..', 'dist', 'index.html'),
      path.join(__dirname, 'dist', 'index.html'),
    ];

    let loaded = false;
    for (const htmlPath of pathsToTry) {
      if (fs.existsSync(htmlPath)) {
        console.log(`[Main] Found index.html at: ${htmlPath}`);
        win.loadFile(htmlPath).catch((err) => {
          console.error(`[Main] Failed to load ${htmlPath}:`, err);
        });
        loaded = true;
        break;
      } else {
        console.warn(`[Main] Path does not exist: ${htmlPath}`);
      }
    }

    if (!loaded) {
      // Show diagnostic error page
      const errorHtml = `
        <html>
          <body style="font-family: sans-serif; padding: 20px;">
            <h1>Failed to load index.html</h1>
            <p>__dirname: ${__dirname}</p>
            <p>Tried paths:</p>
            <ul>
              ${pathsToTry.map((p) => `<li>${p}</li>`).join('')}
            </ul>
          </body>
        </html>
      `;
      win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(errorHtml)}`);
    }
  } else {
    win.loadURL('http://localhost:5173');
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
