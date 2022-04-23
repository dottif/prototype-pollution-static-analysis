//Does not detect sinks inside catch/finally ??

function exploit(string, input, val){
    try {
        var obj = {};
        obj[string][input] = val; //detected
        throw s; 
    }
    catch (exception_var) {
    }
}

function exploit2(string, input, val){
    try {
        var obj = {};
        throw s;
    }
    catch (exception_var) {
        obj[string][input] = val; //FN
    }
}

function exploit3(string, input, val){
    try {
        var obj = {};
        throw s;
    }
    catch (exception_var) {
    }
    finally {
        obj[string][input] = val; //FN
    }
}

function exploit4(string, input, val){
    try {
        var obj = {};
        throw s;
    }
    catch (exception_var) {
    }
    obj[string][input] = val; //detected
}

function exploit5(string, input, val){
    try {
        throw s; 
    }
    catch (exception_var) {
        var obj = {};
    }
    obj[string][input] = val; //detected
}
function exploit6(string, input, val){
    try {
        throw s; 
    }
    catch (exception_var) {
        var obj = {};
        obj[string][input] = val; //FN
    }
}

module.exports = {exploit,exploit2,exploit3,exploit4,exploit5,exploit6};
