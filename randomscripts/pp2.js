function foo(key1, key2, value) {
  var target = {};
  var mid = target[key1];
  mid[key2] = value;
}

function pp(key1, key2, value) {
  foo(key1, key2, value);
}

module.exports = {pp};
