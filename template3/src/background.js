const { app, protocol, BrowserWindow, Menu } = require("electron");
const { createProtocol } = require("vue-cli-plugin-electron-builder/lib");
const WinState = require("electron-win-state").default;
import initIpcEvent from "./modules/ipcEvent";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

//禁用菜单栏
Menu.setApplicationMenu(null);

const createWindow = async () => {
  const winState = new WinState({
    defaultWidth: 800,
    defaultHeight: 600,
  });
  // 创建窗口
  const win = new BrowserWindow({
    ...winState.winOptions,
    webPreferences: {
      preload: __dirname + "/preload.js",
    },
  });

  //挂载vue页面
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  // 打开开发者工具,打包时需要关闭
  win.webContents.openDevTools();

  //使用winState管理窗口，会自动保存窗口的位置和大小
  winState.manage(win);

  //禁止安全警告
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
};

//初始化主进程监听事件
initIpcEvent();

app.on("ready", async () => {
  createWindow();
  app.on("activate", () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
