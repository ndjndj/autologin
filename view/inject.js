const { closeSync } = require("original-fs");
const { ipcRenderer } = require('electron');

console.log('injection successed!!!');

document.addEventListener(
    'click',
    function(e) {
        console.log(getXPath(e.target));
        inputValue(getXPath(e.target));
    }
);

ipcRenderer.on('browserWindow-send', (event, arg) => {
    console.log(arg);
});

function inputValue(xpath) {
    let xpathResult = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    );
    console.log(xpath);
    console.log(xpathResult);
    console.log(xpathResult.singleNodeValue);
    console.log(xpathResult.singleNodeValue.value);
    ipcRenderer.send('browserView-send', xpath);
    xpathResult.singleNodeValue.value = 'auto input';
}

function getXPath(element) {
    if (element && element.parentNode) {
        var xpath = getXPath(element.parentNode) + '/' + element.tagName;
        let s = [];

        for (var i = 0; i < element.parentNode.childNodes.length; i++) {
            var e = element.parentNode.childNodes[i];
            if (e.tagName == element.tagName) {
                s.push(e);
            }
        }

        if (1 < s.length) {
            for (var i = 0; i < s.length; i++) {
                if (s[i] === element) {
                    xpath += '[' + String(i+1) + ']'
                    break;
                }
            }
        }

        return xpath.toLowerCase();

    } else {
        return '';
    }
}
