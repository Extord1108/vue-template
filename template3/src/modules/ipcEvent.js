const ipcMain = require("electron").ipcMain;
const fs = require("fs");
import logger from "../utils/log";

export default function () {
  ipcMain.handle("mkdir", (event, arg) => {
    fs.mkdir("./" + arg, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("创建成功");
      }
    });
    logger.info("创建成功");
  });
}
