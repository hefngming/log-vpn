import { app, BrowserWindow, dialog } from "electron";
import path from "path";
import fs from "fs";

const isDev = process.env.NODE_ENV === "development";
const isPackaged = app.isPackaged;

console.log("============================================================");
console.log("[LogVPN] Application Starting...");
console.log("[LogVPN] isPackaged:", isPackaged);
console.log("[LogVPN] isDev:", isDev);
console.log("[LogVPN] __dirname:", __dirname);
console.log("[LogVPN] process.cwd():", process.cwd());
console.log("[LogVPN] app.getAppPath():", app.getAppPath());
console.log("[LogVPN] process.resourcesPath:", process.resourcesPath);
console.log("============================================================");

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    // 设置图标（开发和生产环境自适应）
    icon: isPackaged
      ? path.join(process.resourcesPath, "icon.png")
      : path.join(__dirname, "../resources/icon.png"),
  });

  // ============================================================
  // 极限调试：强制打开 DevTools（即使在生产环境）
  // ============================================================
  console.log("[LogVPN] 🔧 EXTREME DEBUG MODE: Opening DevTools...");
  mainWindow.webContents.openDevTools();

  // 加载 HTML 文件
  if (!isPackaged && isDev) {
    console.log("[LogVPN] Loading from Vite dev server: http://localhost:5173");
    mainWindow.loadURL("http://localhost:5173");
  } else {
    // ============================================================
    // 极限调试：尝试所有可能的路径
    // ============================================================
    const possiblePaths = [
      path.join(__dirname, "../dist/public/index.html"),
      path.join(__dirname, "../dist/index.html"),
      path.join(__dirname, "../../dist/public/index.html"),
      path.join(__dirname, "dist/public/index.html"),
      path.join(app.getAppPath(), "dist/public/index.html"),
      path.join(app.getAppPath(), "dist/index.html"),
      path.join(process.resourcesPath, "app.asar/dist/public/index.html"),
      path.join(process.resourcesPath, "app/dist/public/index.html"),
      path.join(process.cwd(), "dist/public/index.html"),
    ];

    console.log("[LogVPN] ============================================================");
    console.log("[LogVPN] 🔍 EXTREME DEBUG: Checking all possible paths...");
    console.log("[LogVPN] ============================================================");

    let foundPath: string | null = null;
    const pathResults: string[] = [];

    for (let i = 0; i < possiblePaths.length; i++) {
      const testPath = possiblePaths[i];
      const exists = fs.existsSync(testPath);
      const result = `${i + 1}. ${exists ? "✅ EXISTS" : "❌ NOT FOUND"}: ${testPath}`;
      console.log(`[LogVPN] ${result}`);
      pathResults.push(result);

      if (exists && !foundPath) {
        foundPath = testPath;
        console.log(`[LogVPN] 🎯 FOUND VALID PATH: ${foundPath}`);
      }
    }

    console.log("[LogVPN] ============================================================");

    if (foundPath) {
      console.log(`[LogVPN] ✅ Loading HTML from: ${foundPath}`);
      
      mainWindow.loadFile(foundPath).catch((err) => {
        console.error("[LogVPN] ❌ loadFile() failed:", err);
        
        // 显示系统对话框错误
        dialog.showErrorBox(
          "LogVPN - Load Error",
          `Failed to load HTML file!\n\nPath: ${foundPath}\n\nError: ${err.message}\n\nCheck console for details.`
        );
      });
    } else {
      // ============================================================
      // 极限调试：没有找到任何有效路径，显示详细错误对话框
      // ============================================================
      const errorMessage = [
        "❌ CRITICAL ERROR: Cannot find index.html!",
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
        "Please report this error with the above information.",
      ].join("\n");

      console.error("[LogVPN] " + errorMessage);

      // 显示系统对话框
      dialog.showErrorBox("LogVPN - Critical Error", errorMessage);

      // 加载错误页面（内联 HTML）
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
              <h1>❌ LogVPN - Critical Error</h1>
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

  // 监听加载事件
  mainWindow.webContents.on("did-finish-load", () => {
    console.log("[LogVPN] ✅ Page loaded successfully!");
  });

  mainWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL) => {
    console.error("[LogVPN] ❌ Page failed to load!");
    console.error("[LogVPN] Error code:", errorCode);
    console.error("[LogVPN] Error description:", errorDescription);
    console.error("[LogVPN] Validated URL:", validatedURL);

    dialog.showErrorBox(
      "LogVPN - Load Failed",
      `Failed to load page!\n\nURL: ${validatedURL}\nError Code: ${errorCode}\nDescription: ${errorDescription}`
    );
  });

  // 窗口准备显示时
  mainWindow.once("ready-to-show", () => {
    console.log("[LogVPN] ✅ Window ready to show");
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
