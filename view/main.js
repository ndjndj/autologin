const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const BrowserView = electron.BrowserView;
const path = require('path');
const { ipcMain } = require("electron");
const crudJson = require("./crudjson");

let mainWindow = null;
let child = null;
app.on('ready', () => {
    // mainWindow を作成
    mainWindow = new BrowserWindow({
        width: 600,
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

    ipcMain.on('test-send', (event, arg) => {
        console.log('massage received.');
        console.log(arg);
        view.webContents.loadURL(arg);
        event.reply('test-reply', )
      });

    ipcMain.on('visit-webview', (event, arg) => {
        child = new BrowserWindow({
            width: 600,
            height: 600,
            parent: mainWindow,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            }
        });

        console.log("visit-webview");
        child.loadURL(fileName);
        view.webContents.openDevTools();
        view.webContents.loadURL('https://www.google.com/');
        view.setBounds(
            {
                x: 0,
                y: 0,
                width: 600,
                height: 600
            }
        );
        child.setBrowserView(view);
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

        try {
            const fs = require('fs');
            fs.writeFileSync('sample.json', JSON.stringify(arg, null, '    '));
            event.returnValue = true;
        } catch(e) {
            console.log(e.message);
            event.returnValue = false;
        }

    })

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
