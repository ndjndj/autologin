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

    const view = new BrowserView(
        {
            webPreferences: {
                preload: path.resolve(__dirname, 'inject.js')
            }
        }

    );
    view.webContents.openDevTools();
    view.webContents.loadURL('https://www.google.com/');
    mainWindow.setBrowserView(view);
    view.setBounds(
        {
            x: 0,
            y: 0,
            width: 400,
            height: 400
        }
    );
    // developper tool を開く
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
