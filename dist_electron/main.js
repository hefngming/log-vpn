// client-src/main.ts
import { app, BrowserWindow, dialog } from "electron";
import path from "path";
import fs from "fs";
var isDev = process.env.NODE_ENV === "development";
var isPackaged = app.isPackaged;
console.log("============================================================");
console.log("[LogVPN] Application Starting...");
console.log("[LogVPN] isPackaged:", isPackaged);
console.log("[LogVPN] isDev:", isDev);
console.log("[LogVPN] __dirname:", __dirname);
console.log("[LogVPN] process.cwd():", process.cwd());
console.log("[LogVPN] app.getAppPath():", app.getAppPath());
console.log("[LogVPN] process.resourcesPath:", process.resourcesPath);
console.log("============================================================");
var mainWindow = null;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    },
    // 设置图标（开发和生产环境自适应）
    icon: isPackaged ? path.join(process.resourcesPath, "icon.png") : path.join(__dirname, "../resources/icon.png")
  });
  console.log("[LogVPN] \u{1F527} EXTREME DEBUG MODE: Opening DevTools...");
  mainWindow.webContents.openDevTools();
  if (!isPackaged && isDev) {
    console.log("[LogVPN] Loading from Vite dev server: http://localhost:5173");
    mainWindow.loadURL("http://localhost:5173");
  } else {
    const possiblePaths = [
      path.join(__dirname, "../dist/public/index.html"),
      path.join(__dirname, "../dist/index.html"),
      path.join(__dirname, "../../dist/public/index.html"),
      path.join(__dirname, "dist/public/index.html"),
      path.join(app.getAppPath(), "dist/public/index.html"),
      path.join(app.getAppPath(), "dist/index.html"),
      path.join(process.resourcesPath, "app.asar/dist/public/index.html"),
      path.join(process.resourcesPath, "app/dist/public/index.html"),
      path.join(process.cwd(), "dist/public/index.html")
    ];
    console.log("[LogVPN] ============================================================");
    console.log("[LogVPN] \u{1F50D} EXTREME DEBUG: Checking all possible paths...");
    console.log("[LogVPN] ============================================================");
    let foundPath = null;
    const pathResults = [];
    for (let i = 0; i < possiblePaths.length; i++) {
      const testPath = possiblePaths[i];
      const exists = fs.existsSync(testPath);
      const result = `${i + 1}. ${exists ? "\u2705 EXISTS" : "\u274C NOT FOUND"}: ${testPath}`;
      console.log(`[LogVPN] ${result}`);
      pathResults.push(result);
      if (exists && !foundPath) {
        foundPath = testPath;
        console.log(`[LogVPN] \u{1F3AF} FOUND VALID PATH: ${foundPath}`);
      }
    }
    console.log("[LogVPN] ============================================================");
    if (foundPath) {
      console.log(`[LogVPN] \u2705 Loading HTML from: ${foundPath}`);
      mainWindow.loadFile(foundPath).catch((err) => {
        console.error("[LogVPN] \u274C loadFile() failed:", err);
        dialog.showErrorBox(
          "LogVPN - Load Error",
          `Failed to load HTML file!

Path: ${foundPath}

Error: ${err.message}

Check console for details.`
        );
      });
    } else {
      const errorMessage = [
        "\u274C CRITICAL ERROR: Cannot find index.html!",
        "",
        "Tried paths:",
        ...pathResults,
        "",
        "Environment:",
        `- __dirname: ${__dirname}`,
        `- app.getAppPath(): ${app.getAppPath()}`,
        `- process.resourcesPath: ${process.resourcesPath}`,
        `- process.cwd(): ${process.cwd()}`,
        "",
        "Please report this error with the above information."
      ].join("\n");
      console.error("[LogVPN] " + errorMessage);
      dialog.showErrorBox("LogVPN - Critical Error", errorMessage);
      mainWindow.loadURL(
        `data:text/html;charset=utf-8,${encodeURIComponent(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>LogVPN - Error</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px;
                margin: 0;
              }
              .container {
                max-width: 800px;
                margin: 0 auto;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 40px;
                backdrop-filter: blur(10px);
              }
              h1 { font-size: 32px; margin-bottom: 20px; }
              pre {
                background: rgba(0, 0, 0, 0.3);
                padding: 20px;
                border-radius: 10px;
                overflow-x: auto;
                white-space: pre-wrap;
                word-wrap: break-word;
                font-size: 12px;
                line-height: 1.6;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>\u274C LogVPN - Critical Error</h1>
              <p>Cannot find index.html file!</p>
              <pre>${errorMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
              <p>Please check the console (F12) for more details.</p>
            </div>
          </body>
          </html>
        `)}`
      );
    }
  }
  mainWindow.webContents.on("did-finish-load", () => {
    console.log("[LogVPN] \u2705 Page loaded successfully!");
  });
  mainWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL) => {
    console.error("[LogVPN] \u274C Page failed to load!");
    console.error("[LogVPN] Error code:", errorCode);
    console.error("[LogVPN] Error description:", errorDescription);
    console.error("[LogVPN] Validated URL:", validatedURL);
    dialog.showErrorBox(
      "LogVPN - Load Failed",
      `Failed to load page!

URL: ${validatedURL}
Error Code: ${errorCode}
Description: ${errorDescription}`
    );
  });
  mainWindow.once("ready-to-show", () => {
    console.log("[LogVPN] \u2705 Window ready to show");
    mainWindow?.show();
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.whenReady().then(() => {
  console.log("[LogVPN] App is ready, creating window...");
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
