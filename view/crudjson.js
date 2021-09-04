
function initializeJson() {
    return
}

function deleteJson() {
    return
}

function importJson() {
    const fs = require('fs');
    const json = fs.readFileSync('sample.json', 'utf-8');
    const jsonObj = JSON.parse(json);
    return jsonObj
}

function editJson() {
    return
}

export default editJson;
