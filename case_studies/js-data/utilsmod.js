const OBJECT_TAG = '[object Object]'
const objToString = Object.prototype.toString
const PATH = /^(.+)\.(.+)$/

const isPlainObject = function (value) {
    return !!value && typeof value === 'object' && value.constructor === Object
}

const isPrototypePolluted = function (key) {
  return ['__proto__', 'prototype', 'constructor'].includes(key)
}

const toStr = function (value) {
    return objToString.call(value)
}

//vulnerable
const mkdirP = function (object, path) {
    if (!path) {
        return object
    }
    const parts = path.split('.')
    parts.forEach(function (key) {
        if (!object[key]) {
            object[key] = {}
        }
        object = object[key] //object = object.__proto__
    })
    return object
}

function forOwn (obj, fn, thisArg) {
    const keys = Object.keys(obj)
    const len = keys.length
    let i
    for (i = 0; i < len; i++) {
        if (fn.call(thisArg, obj[keys[i]], keys[i], obj) === false) {
            break
        }
    }
}

function isObject (value) {
    return toStr(value) === OBJECT_TAG
}

//vulnerable
function deepFillIn (dest, source) {
    if (source) {
        forOwn(source, function (value, key) {
            const existing = dest[key]
            if (isPlainObject(value) && isPlainObject(existing)) {
                deepFillIn(existing, value)
            } else if (!Object.hasOwnProperty.call(dest, key) || dest[key] === undefined) {
                dest[key] = value //prototype pollution
            }
        })
    }
    return dest
}

//vulnerable
function set (object, path, value) {
    if (isObject(path)) {
        forOwn(path, function (value, _path) {
            set(object, _path, value)
        })
    } else {
        const parts = PATH.exec(path)
        if (parts) {
            mkdirP(object, parts[1])[parts[2]] = value //object.__proto__.property=value
        } else {
            object[path] = value
        }
    }
}

//non vuln
function deepMixIn (dest, source) {
    if (source) {
      for (var key in source) {
        if (isPrototypePolluted(key)) continue //fixed
        const value = source[key]
        const existing = dest[key]
        if (isPlainObject(value) && isPlainObject(existing)) {
          deepMixIn(existing, value)
        } else {
          dest[key] = value
        }
      }
    }
    return dest
  }

module.exports = {deepMixIn, deepFillIn, set};
