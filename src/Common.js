// ================================== COMMON ==================================

/* global JSUtils:true */

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