function foo(obj, a, b, val) {
    var obj = {__proto__ : null}
    obj[a][b] = val;
}
function foo2(obj, a, b, c, val) {
    obj[a][b][c] = val;
}
function foo3(prop, val) {
    Object.prototype[prop] = val;
}
let o = {};
function foo4(a, b, val) {
    o[a][b] = val;
}
function foo5(obj, a, b, val) {
    obj[a][a] = val;
}


module.exports = {foo};
