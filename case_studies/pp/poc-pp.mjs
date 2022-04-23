import {pp} from './pp.js';

console.log({}.admin);
pp("__proto__","admin","polluted");
console.log({}.admin);
