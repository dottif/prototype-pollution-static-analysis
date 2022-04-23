var pattern = /(\w+)\[(\d+)\]/;

var decode = function(str) {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (e) {
    return str;
  }
}

exports.parse = function(str){
  if ('string' != typeof str) return {};

  str = str.trim();
  if ('' == str) return {};
  if ('?' == str.charAt(0)) str = str.slice(1);

  var obj = {};
  var pairs = str.split('&'); 
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('='); 
    //[ '__proto__[1337]', 'polluted' ]
    var key = decode(parts[0]);
    //'__proto__[1337]'
    var m;

    if (m = pattern.exec(key)) {
    //m 
    //   [
    //      '__proto__[1337]',
    //      '__proto__',
    //      '1337',
    //      index: 0,
    //      input: '__proto__[1337]',
    //      groups: undefined
    //    ]
      obj[m[1]] = obj[m[1]] || [];
      obj[m[1]][m[2]] = decode(parts[1]); //Triggers the Prototype pollution
    //{}.__proto__.1337 = 'polluted';
      continue;
    }

    obj[parts[0]] = null == parts[1]
      ? ''
      : decode(parts[1]);
  }

  return obj;
};
