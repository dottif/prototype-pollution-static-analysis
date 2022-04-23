function b(e) {
    return e.replace('?', '').split('&').reduce(function (e, t) {
        var n = t.split('='),
            r = n[0],
            i = n[1],
            o = r.split('.');
        return o.reduce(function (e, t, n) {
            return n === o.length - 1 ? e[t] = 'string' == typeof i ? unescape(i.replace('+', ' ')) : i || '' : e[t] = e[t] || {
            },
                e[t]
        }, e),
            e
    }, {
    })
}
 module.exports = {b};
