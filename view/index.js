console.log("index.js")
//ipcRendererモジュールをインポート
const { ipcRenderer } = window.native;

//メインプロセスのipcMain.on("test-send")に変数dataを送る



function onClickURL() {
    const id = document.getElementById("url");
    console.log(id.value);
    ipcRenderer.send("test-send", id.value);
    return id.value
}

window.addEventListener(
    "load",
    () => {
        const submit = document.getElementById("submit");
        submit.addEventListener("click", onClickURL);

    }
);
