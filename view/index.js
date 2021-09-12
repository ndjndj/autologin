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

function addJson(js, attr) {
    js['path'].push(attr);
    return js
}

function createDOM(arg){
    const clickedPath = document.getElementById('clicked-path');
    const p = document.createElement('p');
    p.innerText = arg;
    clickedPath.appendChild(p);
}

function addClick() {
    const tex = "CLICK";
    createDOM(tex);
}

function addInput() {
    const tex = "INPUT";
    createDOM(tex);
}

window.addEventListener(
    "load",
    () => {
        const submit = document.getElementById("submit");
        submit.addEventListener("click", onClickURL);

        const click = document.getElementById("do-click");
        click.addEventListener("click", addClick);

        const input = document.getElementById("do-input");
        input.addEventListener("click", addInput);

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
