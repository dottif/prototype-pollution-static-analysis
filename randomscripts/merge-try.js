//Does not detect sinks inside catch/finally ??
const isObject = obj => obj && obj.constructor && obj.constructor === Object;

function mergeFinally(a, b) {
    for (var attr in b) {
        if (isObject(a[attr]) && isObject(b[attr])) {
            mergeFinally(a[attr], b[attr]);
        } else {
            try {
                throw 'myException'; // generates an exception
            } catch (e){
            }
            finally{
                a[attr] = b[attr];
            }
        }
    }
    return a;
}

function mergeTryCatch(a, b) {
    for (var attr in b) {
        if (isObject(a[attr]) && isObject(b[attr])) {
            mergeTryCatch(a[attr], b[attr]);
        } else {
            try {
                throw 'myException'; // generates an exception
            } catch (e){
                a[attr] = b[attr];
            }
        }
    }
    return a;
}

function mergeTry(a, b) {
    for (var attr in b) {
        if (isObject(a[attr]) && isObject(b[attr])) {
            mergeTry(a[attr], b[attr]);
        } else {
            try {
                a[attr] = b[attr]; //detected
                throw 'myException'; // generates an exception
            } catch (e){
            }
        }
    }
    return a;
}

module.exports = {mergeTryCatch,mergeTry,mergeFinally};
