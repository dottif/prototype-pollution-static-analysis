function exp(string, input, val){
    var obj = {};
    obj[string.trim()][input] = val; //detected by objlup
}

function exploit(string, input, val){
    var inner = string + "";
    var obj = {};
    obj[inner.trim()][input] = val; //not detected  by objlup
}

module.exports = {exp,exploit};
