const { ipcRenderer } = require('electron');

ipcRenderer.send('json-send');
ipcRenderer.on('json-return', (event, arg) => {
    for(let [key, value] of Object.entries(arg)) {
        steUrl = value['url'];
        siteTitle = value['title'];


    }
});
