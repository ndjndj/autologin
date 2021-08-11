
//ipcRendererモジュールをインポート
const { ipcRenderer } = require("electron");

//メインプロセスのipcMain.on("test-send")に変数dataを送る
ipcRenderer.send("test-send", data); 
