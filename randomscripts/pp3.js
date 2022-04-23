function foo(key1, key2, value) {
  var target = {};
  var mid = target[key1];
  mid[key2] = value;
}

module.exports = {foo}
