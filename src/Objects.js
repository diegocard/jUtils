// ================================= OBJECTS =================================

/* global JSUtils:true */

JSUtils.propertyCount = function(obj) {
  // TODO: Tests and doc
  if (obj !== Object(obj)) {
    throw new TypeError('Invalid object');
  } else {
    return JSUtils.getKeys(obj).length;
  }
};