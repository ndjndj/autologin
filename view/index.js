console.log("index.js")
//ipcRendererモジュールをインポート
const { ipcRenderer } = require('electron');

//メインプロセスのipcMain.on("test-send")に変数dataを送る



function onClickURL() {
    const id = document.getElementById("url");
    console.log(id.value);
    ipcRenderer.send("test-send", id.value);
    return id.value
}

function createDOM(arg){
    const clickedPath = document.getElementById('clicked-path');
    const p = document.createElement('p');
    p.innerText = arg;
    clickedPath.appendChild(p);
}

function addClick() {
    return
}

window.addEventListener(
    "load",
    () => {
        const submit = document.getElementById("submit");
        submit.addEventListener("click", onClickURL);
        ipcRenderer.send("visit-webview");
    }
);

window.addEventListener(
    "beforeunload",
    () => {
        ipcRenderer.send("unload-webview");
    }
);

ipcRenderer.on('browserWindow-send', (event, arg) => {
    console.log(arg);
    createDOM(arg);
});
