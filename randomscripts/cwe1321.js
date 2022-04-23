function setValueByPath (object, path, value) {
    const pathArray = path.split(".");
    const attributeToSet = pathArray.pop();
    let objectToModify = object;
    for (const attr of pathArray) {
        if (typeof objectToModify[attr] !== 'object') {
            objectToModify[attr] = {};
        }

        objectToModify = objectToModify[attr];
    }

    objectToModify[attributeToSet] = value;
    return object;
}

module.exports = {setValueByPath};
