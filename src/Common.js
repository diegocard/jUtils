/**
 * Concise and efficient forEach implementation.
 * @memberOf JSUtils.Base
 * @param  {Object} obj     Elements to be iterated.
 * @param  {Function} func  Function applied to the elements in obj.
 * @param  {Object} context Context for func.
 */
JSUtils.forEach = function(obj, func, context) {
  var i, len, keys;
  if (this.isObject(obj)) {
    keys = this.getKeys(obj);
    for (i=0, len=keys.length; i<len; i+=1) {
      func.call(context, obj[keys[i]], keys[i], obj);
    }
  } else {
    for (i=0, len=obj.length; i<len; i+=1) {
      func.call(context, obj[i], i, obj);
    }
  }
};

JSUtils.shallowCopy = function(obj) {
  // TODO: TEST, DOC
  var copy, prop;
  if (!this.isObject(obj)) return obj;
  copy = obj.constructor();
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) copy[prop] = obj[prop];
  }
  return copy;
};

JSUtils.deepCopy = function(obj) {
  // TODO: TEST, DOC
  var out, i, len, prop;
  if (this.isArray(obj)) {
    out = [];
    for (i=0, len = obj.length; i<len; i+=1) {
      out[i] = this.deepCopy(obj[i]);
    }
    return out;
  }
  if (this.isObject(obj)) {
    out = {};
    for (prop in obj) {
      out[prop] = this.deepCopy(obj[prop]);
    }
    return out;
  }
  return obj;
};