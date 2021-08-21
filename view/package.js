console.log('preload was successful.');

const { ipcRenderer } = require('electron');

process.once(
    'loaded',
    () => {
        global.native = {
            ipcRenderer: ipcRenderer,
        }
    }
)
