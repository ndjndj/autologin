
function initializeJson() {
    const json = {};
    return json
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

function editJson(jsonObj, key, value) {
    jsonObj[key] = value;
    return jsonObj
}

export default editJson;
