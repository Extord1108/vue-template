const logger = require("electron-log");
const { app } = require("electron");

logger.transports.file.level = "debug";
logger.transports.file.maxSize = 1002430; // 10M
logger.transports.file.format =
  "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}";
let date = new Date();
date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
logger.transports.file.resolvePathFn = () =>
  app.getPath("userData") + "\\logs\\" + date + ".log";
export default {
  info(...params) {
    logger.info(params);
  },
  warn(...params) {
    logger.warn(params);
  },
  error(...params) {
    logger.error(params);
  },
  debug(...params) {
    logger.debug(params);
  },
  verbose(...params) {
    logger.verbose(params);
  },
  silly(...params) {
    logger.silly(params);
  },
};
