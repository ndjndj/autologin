const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const BrowserView = electron.BrowserView;
const path = require('path');
const { ipcMain } = require("electron");

let mainWindow = null;
app.on('ready', () => {
    // mainWindow を作成
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
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
                enableRemoteModule: true
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
                x: 0,
                y: 200,
                width: 400,
                height: 400
            }
        );
        mainWindow.setBrowserView(view);
    });

    ipcMain.on('unload-webview', (event, arg) => {
        mainWindow.removeBrowserView(view);
    });

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
