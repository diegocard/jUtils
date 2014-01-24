// ================================= OBJECTS =================================

/* global JSUtils:true */

/**
 * Counts the amount of properties in an object (keys).
 * Not that this method only counts own properties.
 * @param  {Object} obj The givne object.
 * @return {Int}        Amount of properties.
 */
JSUtils.propertyCount = function(obj) {
  if (obj !== Object(obj)) {
    throw new TypeError('Invalid object');
  } else {
    return JSUtils.getKeys(obj).length;
  }
};

JSUtils.shallowCopy = function(obj) {
  // TODO: TEST, DOC
  var copy, prop;
  if (!JSUtils.isObject(obj)) return obj;
  copy = obj.constructor();
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) copy[prop] = obj[prop];
  }
  return copy;
};

JSUtils.deepCopy = function(obj) {
  // TODO: TEST, DOC
  var out, i, len, prop;
  if (JSUtils.isArray(obj)) {
    out = [];
    for (i=0, len = obj.length; i<len; i+=1) {
      out[i] = JSUtils.deepCopy(obj[i]);
    }
    return out;
  }
  if (JSUtils.isObject(obj)) {
    out = {};
    for (prop in obj) {
      out[prop] = JSUtils.deepCopy(obj[prop]);
    }
    return out;
  }
  return obj;
};