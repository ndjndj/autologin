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

function createDOM(arg, className){
    const clickedPath = document.getElementById('clicked-path');
    const p = document.createElement('p');
    p.innerText = arg;
    p.className = className;
    clickedPath.appendChild(p);
}

function addClick() {
    const tex = "CLICK";
    createDOM(tex, 'click');
}

function addInput() {
    const tex = "INPUT";
    createDOM(tex, 'input');
}

function doSave() {
    const question = confirm('save it?');
    if(!question) { return };

    try {
        const path = document.getElementById('clicked-path').childNodes;
        const crudJson = require('./crudjson');
        let storedJson = crudJson.importJson();
        const storedJsonSize = Number(Object.keys(storedJson).length) + 1;

        let saveJson = {};
        saveJson['title'] = 'title sample'; // サイトのタイトルを取得
        saveJson['url'] = document.getElementById('url').innerText;
        saveJson['elements'] = [];

        storedJson[String(storedJsonSize)] = saveJson;

        let saveFlg = ipcRenderer.sendSync('save-json', storedJson);
        
        window.alert('success.');
    } catch(e) {
        window.alert('falied save.');
    }
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

        const save = document.getElementById('save');
        save.addEventListener('click', doSave);
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
    createDOM(arg, 'focus');
});
