const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const BrowserView = electron.BrowserView;
const path = require('path');

let mainWindow = null;
app.on('ready', () => {
    // mainWindow を作成
    mainWindow = new BrowserWindow({width: 400, height: 600});

    // html を指定
    let fileName = 'file://' + __dirname + '/index.html';
    mainWindow.loadURL(fileName);

    const view = new BrowserView(
        {
            webPreferences: {
                preload: path.join(app.getAppPath(), 'inject.js')
            }
        }

    );
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
    console.log(view.getFocusedWebContents());
    // developper tool を開く
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
