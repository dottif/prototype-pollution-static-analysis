function exploit(string, input, val){
    var inner = string + "";
    var lin = input + "12";
    var link = lin + "3";
    var obj = {};
    var v = val + "111";
    obj[inner][link] = val;
}

function exp2(string, input, val){
    var obj = {};
    obj[string][input] = {prop: val};
    obj[string][input] = {prop: val}.prop;
}
module.exports = {exp2,exploit};
