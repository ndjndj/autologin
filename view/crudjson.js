
exports.initializeJson = () => {
    const json = {};
    return json
}

exports.deleteJson = (jsonObj, key) => {
    jsonObj[key] = null;
    return jsonObj
}

exports.importJson = () => {
    const fs = require('fs');
    const json = fs.readFileSync('sample.json', 'utf-8');
    const jsonObj = JSON.parse(json);
    return jsonObj
}

exports.editJson = (jsonObj, key, value) => {
    jsonObj[key] = value;
    return jsonObj
}

