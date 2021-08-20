console.log("index.js")
//ipcRendererモジュールをインポート
//const { ipcRenderer } = require("electron");

//var sampleValue = "sample1";

//メインプロセスのipcMain.on("test-send")に変数dataを送る
//ipcRenderer.send("test-send", sampleValue);


function onClickURL() {
    const id = document.getElementById("url");
    console.log(id.value);
    return id.value
}

window.addEventListener(
    "load",
    () => {
        const submit = document.getElementById("submit");
        submit.addEventListener("click", onClickURL);

    }
);
