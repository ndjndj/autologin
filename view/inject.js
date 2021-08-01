console.log('injection successed!!!');

document.addEventListener(
    'click',
    function(e) {
        console.log(getXPath(e.target));
    }
);


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
