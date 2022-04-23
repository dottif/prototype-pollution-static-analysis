import * as m from "./mergeForEach.js";
var obj = {};
var payload = '{"__proto__": {"polluted": "Yes polluted"}}'
console.log("Before : " + {}.polluted);
m.mergeKeys(obj, JSON.parse(payload));
console.log("After : " + {}.polluted);
