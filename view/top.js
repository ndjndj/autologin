const { ipcRenderer } = require('electron');

ipcRenderer.send('json-send');
ipcRenderer.on('json-return', (event, arg) => {
    const site = document.getElementById('site');
    let siteUrl;
    let siteTitle;
    let hrefTag;
    for(let [key, value] of Object.entries(arg)) {
        steUrl = value['url'];
        siteTitle = value['title'];

        hrefTag = document.createElement('a');
        hrefTag.innerText = siteTitle;
        hrefTag.href = siteUrl;
        hrefTag.id = key;

        site.appendChild(hrefTag);


    }
});
