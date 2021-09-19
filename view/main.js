const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const BrowserView = electron.BrowserView;
const path = require('path');
const { ipcMain } = require("electron");
const crudJson = require("./crudjson");

let mainWindow = null;
app.on('ready', () => {
    // mainWindow を作成
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    // html を指定
    let fileName = 'file://' + __dirname + '/index.html';
    mainWindow.loadURL(fileName);

    const view = new BrowserView(
        {
            webPreferences: {
                preload: path.join(app.getAppPath(), 'inject.js'),
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
                nativeWindowOpen: true
            }
        }
    );

    // developper tool を開く
    // mainWindow.webContents.openDevTools();
    ipcMain.on('test-send', (event, arg) => {
        console.log('massage received.');
        console.log(arg);
        view.webContents.loadURL(arg);
        event.reply('test-reply', )
      });

    ipcMain.on('visit-webview', (event, arg) => {
        console.log("visit-webview");

        view.webContents.openDevTools();
        view.webContents.loadURL('https://www.google.com/');
        mainWindow.setBrowserView(view);
        view.setBounds(
            {
                x: 600,
                y: 0,
                width: 600,
                height: 600
            }
        );
        mainWindow.setBrowserView(view);
    });

    ipcMain.on('unload-webview', (event, arg) => {
        mainWindow.removeBrowserView(view);
    });

    ipcMain.on('browserView-send', (event, arg) => {
        console.log(arg);
        mainWindow.webContents.send('browserWindow-send', arg);
    });

    ipcMain.on('json-send', (event, arg) => {
        const json = crudJson.importJson();
        mainWindow.webContents.send('json-return', json);
    });

    ipcMain.on('save-json', (event, arg) => {
        event.returnValue = true;
    })

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
