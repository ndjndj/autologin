console.log("index.js")
//ipcRendererモジュールをインポート
const { ipcRenderer } = require("electron");

var sampleValue = "sample1";

//メインプロセスのipcMain.on("test-send")に変数dataを送る
ipcRenderer.send("test-send", sampleValue);
