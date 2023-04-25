const { app, protocol, BrowserWindow, Menu } = require("electron");
const { createProtocol } = require("vue-cli-plugin-electron-builder/lib");
import initIpcEvent from "./modules/ipcEvent";
const path = require("path");

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

//禁用菜单栏
Menu.setApplicationMenu(null);

//定义多个窗口
var win1 = null;
var win2 = null;

const createWindow = async (devPath, prodPath) => {
  // 创建窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "../public/logo.png"),
    webPreferences: {
      preload: __dirname + "/preload.js",
    },
  });

  //挂载vue页面
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL+devPath);
    win.webContents.openDevTools();
  } else {
    // Load the index.html when not in development
    win.loadURL(`app://./${prodPath}`);
  }

  //禁止安全警告
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
  return win;
};

app.on("ready", async () => {
  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    createProtocol("app");
  }
  createWindow("window1", "index1.html").then((res) => {
    win1 = res;
  });

  //初始化主进程监听事件
  initIpcEvent();
});
app.on("activate", () => {
  // 在 macOS 系统内, 如果没有已开启的应用窗口
  // 点击托盘图标时通常会重新创建一个新窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow("window1", "index1.html").then((res) => {
      win1 = res;
    });
  }
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态,
// 直到用户使用 Cmd + Q 明确退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
