const { ipcRenderer } = require('electron');

ipcRenderer.send('json-send');
ipcRenderer.on('json-return', (event, arg) => {
    console.log(arg);
});
