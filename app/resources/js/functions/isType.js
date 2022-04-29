window.isString = function(param) {
    return (typeof param === "string" || param instanceof String);
}

window.isObject = function(param) {
    return (typeof param === "object" || param instanceof Object);
}

window.isNumeric = function(param) {
    return (!isNaN(param) && typeof param === 'number' || param instanceof Number );
}

window.isArray = function(arr) {
    return Array.isArray(arr)
}

window.isset = function(val) {
    return typeof(val) != "undefined" && val !== null
}

window.isEmptyObject = function(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}
