import * as fs from 'fs';

function setValueByPathfixed (object, path, value) {
    const pathArray = path.split(".");
    const attributeToSet = pathArray.pop();
    let objectToModify = object;
    for (const attr of pathArray) {
        // Ignore attributes which resolve to object prototype
        if (attr === "__proto__" || attr === "constructor" || attr === "prototype") {
            continue;
        }
        if (typeof objectToModify[attr] !== "object") {
            objectToModify[attr] = {};
        }
        objectToModify = objectToModify[attr];
    }
    objectToModify[attributeToSet] = value;
    return object;
}


module.exports = {setValueByPathfixed};
