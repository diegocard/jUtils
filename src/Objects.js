// ================================= OBJECTS =================================

/* global jUtils:true */

/**
 * Counts the amount of properties in an object (keys).
 * Not that this method only counts own properties.
 * @param  {Object} obj The givne object.
 * @return {Int}        Amount of properties.
 */
jUtils.propertyCount = function(obj) {
  if (obj !== Object(obj)) {
    throw new TypeError("Invalid object");
  } else {
    return jUtils.getKeys(obj).length;
  }
};

jUtils.shallowCopy = function(obj) {
  // TODO: TEST, DOC
  var copy, prop;
  if (!jUtils.isObject(obj)) return obj;
  copy = obj.constructor();
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) copy[prop] = obj[prop];
  }
  return copy;
};

jUtils.deepCopy = function(obj) {
  // TODO: TEST, DOC
  var out, i, len, prop;
  if (jUtils.isArray(obj)) {
    out = [];
    for (i=0, len = obj.length; i<len; i+=1) {
      out[i] = jUtils.deepCopy(obj[i]);
    }
    return out;
  }
  if (jUtils.isObject(obj)) {
    out = {};
    for (prop in obj) {
      out[prop] = jUtils.deepCopy(obj[prop]);
    }
    return out;
  }
  return obj;
};