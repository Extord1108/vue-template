const { ipcRenderer, contextBridge } = require("electron");
const handleMkdir = () => {
  ipcRenderer.invoke("mkdir", "test").then((res) => {
    console.log(res);
  });
};

contextBridge.exposeInMainWorld("electron", {
  handleMkdir,
});
