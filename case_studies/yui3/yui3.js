function pieceParser (eq) {
    return function parsePiece (key, val) {

        var sliced, numVal, head, tail, ret;

        if (arguments.length !== 2) {
            // key=val, called from the map/reduce
            key = key.split(eq);
            return parsePiece(
                customunescape(key.shift()),
                customunescape(key.join(eq))
            );
        }
        key = key.replace(/^\s+|\s+$/g, '');
        if (isString(val)) {
            val = val.replace(/^\s+|\s+$/g, '');
            // convert numerals to numbers
            if (!isNaN(val)) {
                numVal = +val;
                if (val === numVal.toString(10)) {
                    val = numVal;
                }
            }
        }
        sliced = /(.*)\[([^\]]*)\]$/.exec(key);
        if (!sliced) {
            ret = {};
            if (key) {
                ret[key] = val;
            }
            return ret;
        }
        // ["foo[][bar][][baz]", "foo[][bar][]", "baz"]
        tail = sliced[2];
        head = sliced[1];

        // array: key[]=val
        if (!tail) {
            return parsePiece(head, [val]);
        }

        // obj: key[subkey]=val
        ret = {};
        ret[tail] = val;
        return parsePiece(head, ret);
    };
}

// the reducer function that merges each query piece together into one set of params
function mergeParams (params, addition) {
    return (
        // if it's uncontested, then just return the addition.
        (!params) ? addition
        // if the existing value is an array, then concat it.
        : (Array.isArray(params)) ? params.concat(addition)
        // if the existing value is not an array, and either are not objects, arrayify it.
        : (!isObject(params) || !isObject(addition)) ? [params].concat(addition)
        // else merge them as objects, which is a little more complex
        : mergeObjects(params, addition)
    );
}

// Merge two *objects* together. If this is called, we've already ruled
// out the simple cases, and need to do the for-in business.
function mergeObjects (params, addition) {
    for (var i in addition) {
        if (i && addition.hasOwnProperty(i)) {
            params[i] = mergeParams(params[i], addition[i]); //prototype pollution codeql
        }
    }
    return params;
}

/**
 * Accept Query Strings and return native JavaScript objects.
 *
 * @method parse
 * @param qs {String} Querystring to be parsed into an object.
 * @param sep {String} (optional) Character that should join param k=v pairs together. Default: "&"
 * @param eq  {String} (optional) Character that should join keys to their values. Default: "="
 * @public
 * @static
 */
function parse (qs, sep, eq) {
    // wouldn't Y.Array(qs.split()).map(pieceParser(eq)).reduce(mergeParams) be prettier?
    return arrayReduce(
        arrayMap(
            qs.split(sep || "&"),
            pieceParser(eq || "=")
        ),
        {},
        mergeParams
    );
}         

function isObject (o, failfn) {
    var t = typeof o;
    return (o && (t === 'object' ||
        (!failfn && (t === 'function' || L.isFunction(o))))) || false;
}

function isString (o) {
    return typeof o === 'string';
}

function arrayReduce (a, init, f, o) {
    var i      = 0,
        len    = a.length,
        result = init;

    for (; i < len; ++i) {
        if (i in a) {
            result = f.call(o, result, a[i], i, a);
        }
    }

    return result;
}

function arrayMap (a, f, o) {
    var i       = 0,
        len     = a.length,
        results = Array.prototype.concat.call(a);

    for (; i < len; ++i) {
        if (i in a) {
            results[i] = f.call(o, a[i], i, a);
        }
    }

    return results;
}

function customunescape (s) {
    return decodeURIComponent(s.replace(/\+/g, ' '));
};

module.exports = {parse};
