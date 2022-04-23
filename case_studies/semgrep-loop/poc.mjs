import * as loop from "./prototype-pollution-loop.js"

console.log("Before " + {}.polluted)
loop.test1("__proto__.polluted","polluted")
//loop.test2({},"__proto__.polluted","polluted")
//loop.test3({},"__proto__.polluted","polluted")
//loop.test1for("__proto__.polluted","polluted")
console.log("After: " + {}.polluted)
