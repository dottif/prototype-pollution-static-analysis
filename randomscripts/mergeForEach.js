const isObject = obj => obj && obj.constructor && obj.constructor === Object;

module.exports = function mergeKeys(a, b) {
    Object.keys(b).forEach(attr => {
        if (isObject(a[attr]) && isObject(b[attr])) {
            mergeKeys(a[attr], b[attr]);
        } else {
            a[attr] = b[attr];
        }
    });
    return a;
}

//module.exports = {mergeKeys};
