import * as m from "./merge-try.js";
var obj = {};
var payload = '{"__proto__": {"polluted": "Yes polluted"}}'
var payload2 = '{"__proto__": {"polluted2": "Yes2 polluted"}}'
var payload3 = '{"__proto__": {"polluted3": "Yes3 polluted"}}'
console.log("Before : " + {}.polluted);
console.log("Before : " + {}.polluted2);
console.log("Before : " + {}.polluted3);
m.mergeFinally(obj, JSON.parse(payload));
m.mergeTryCatch({}, JSON.parse(payload2));
m.mergeTry({}, JSON.parse(payload3));
console.log("After : " + {}.polluted);
console.log("After : " + {}.polluted2);
console.log("After : " + {}.polluted3);
