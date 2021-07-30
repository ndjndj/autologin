const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const BrowserView = electron.BrowserView;

let mainWindow = null;
app.on('ready', () => {
    // mainWindow を作成
    mainWindow = new BrowserWindow({width: 400, height: 400});

    // html を指定
    let path = 'file://' + __dirname + '/index.html';
    mainWindow.loadURL(path);

    const view = new BrowserView();
    view.webContents.loadURL('https://www.google.com/');
    mainWindow.setBrowserView(view);
    view.setBounds(
        {
            x: 200,
            y: 150,
            width: 300,
            height: 150
        }
    );
    // developper tool を開く
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
