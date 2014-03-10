// ================================= OBJECTS =================================

/* global jUtils:true */

(function($) {
  
  /**
   * Counts the amount of properties in an object (keys).
   * Not that this method only counts own properties.
   * @param  {Object} obj The given object.
   * @return {Int}        Amount of properties.
   */
  $.propertyCount = function(obj) {
    return $.getKeys(obj).length;
  };

  $.shallowCopy = function(obj) {
    // TODO: TEST, DOC
    var copy, prop;
    if (!$.isObject(obj)) return obj;
    copy = obj.constructor();
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) copy[prop] = obj[prop];
    }
    return copy;
  };

  $.deepCopy = function(obj) {
    // TODO: TEST, DOC
    var out, i, len, prop;
    if ($.isArray(obj)) {
      out = [];
      for (i=0, len = obj.length; i<len; i+=1) {
        out[i] = $.deepCopy(obj[i]);
      }
      return out;
    }
    if ($.isObject(obj)) {
      out = {};
      for (prop in obj) {
        out[prop] = $.deepCopy(obj[prop]);
      }
      return out;
    }
    return obj;
  };

}(jUtils));

