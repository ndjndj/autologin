const { ipcRenderer } = require('electron');

ipcRenderer.send('json-send');
ipcRenderer.on('json-return', (event, arg) => {
    const site = document.getElementById('site');
    let hrefTag;
    for(let [key, value] of Object.entries(arg)) {
        hrefTag = document.createElement('a');
        hrefTag.innerText = value['title'];
        hrefTag.href = value['url'];
        hrefTag.id = key;

        site.appendChild(hrefTag);


    }
});
