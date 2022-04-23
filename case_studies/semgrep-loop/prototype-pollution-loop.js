const isObject = obj => obj && obj.constructor && obj.constructor === Object;

function test1(name, value) {
  let config = {};
  if (name.indexOf('.') === -1) {
    config[name] = value;
    return config;
  }

  name = name.split('.');

  const length = name.length;
  name.forEach((item, index) => {
    if (index === length - 1) {
      config[item] = value;
    } else {
      if (!isObject(config[item])) {
        config[item] = {};
      }
      // ruleid:prototype-pollution-loop
      config = config[item];
    }
  });
  return config;
}

function test2(obj, props, value) {
  if (typeof props == 'string') {
    props = props.split('.');
  }
  if (typeof props == 'symbol') {
    props = [props];
  }
  var lastProp = props.pop();
  if (!lastProp) {
    return false;
  }
  var thisProp;
  while ((thisProp = props.shift())) {
    if (typeof obj[thisProp] == 'undefined') {
      obj[thisProp] = {};
    }
    // ruleid:prototype-pollution-loop
    obj = obj[thisProp];
    if (!obj || typeof obj != 'object') {
      return false;
    }
  }
  obj[lastProp] = value;
  return true;
}

function test3(obj, prop, val) {
  const segs = prop.split('.');
  const last = segs.pop();
  while (segs.length) {
    const key = segs.shift();
    // ruleid:prototype-pollution-loop
    obj = obj[key] || (obj[key] = {});
  }
  obj[last] = val;
}

function okTest1(name) {
    let config = {};
  if (name.indexOf('.') === -1) {
    config[name] = value;
    return config;
  }
  name = name.split('.');
  const length = name.length;
  name.forEach((item, index) => {
    // ok:prototype-pollution-loop
    config = config[index];
  });
  return config;
}

function okTest2(name) {
  let config = {};
  name = name.split('.');

  const length = name.length;
  for (let i = 0; i < name.length; i++) {
    // ok:prototype-pollution-loop
    config = config[i];
  }
  return config;
}

function test1for(name, value) {
  let config = {};
  if (name.indexOf('.') === -1) {
    config[name] = value;
    return config;
  }

  name = name.split('.');

  const length = name.length;
  //name.forEach((item, index) => {
for (let index = 0; index < name.length; index++) {
    let item = name[index];
    if (index === length - 1) {
      config[item] = value; //pp assign
    } else {
      if (!isObject(config[item])) {
        config[item] = {};
      }
      // ruleid:prototype-pollution-loop
      config = config[item];
    }
}
  //});
  return config;
}

module.exports = {test1for,test1,test2,test3,okTest1,okTest2};
