/**
 * JSUtils main object
 * @module JSUtils
 */
(function (global) {
  "use strict";

  // Check that JSUtils is not already defined.
  if (global.JSUtils) {
    return;
  }

  // Private variables
  var internal = {
    global: global,
    namespaces: {},
  };

  global.JSUtils = {

    /**
     * Returns the global object.
     * @memberOf JSUtils.Main
     * @return {Object} The global object.
     */
    getGlobal : function() {
      return internal.global;
    },

    /**
     * Checks if the given object is equal to the global object.
     * @memberOf JSUtils.Main
     * @param  {Any} elem A given element.
     * @return {Boolean}  True if the given element is equal to the global object,
     *                    False otherwise.
     */
    isGlobal : function(elem) {
      return elem === internal.global;
    },

    /**
     * Returns an array with the property names for the given object.
     * If obj is not an object, then an exception is thrown.
     * @memberOf JSUtils.Main
     * @param  {Object} obj The given object.
     * @return {Array}      Array of property names.
     */
    getKeys : function(obj) {
      var keys = [],
          key;
      if (!this.isObject(obj)) {
        throw new TypeError('Invalid object');
      }
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys;
    },

    propertyCount : function(obj) {
      // TODO: Tests and doc
      if (obj !== Object(obj)) {
        throw new TypeError('Invalid object');
      } else {
        return this.getKeys(obj).length;
      }
    },

    isArray : function(arr) {
      // TODO: Tests and doc
      return toString.call(arr) == '[object Array]';
    },

    isObject : function(obj) {
      // TODO: Tests and doc
      return obj === Object(obj);
    },

    isBoolean : function(bool) {
      // TODO: Tests and doc
      return bool === true || bool === false;
    },

    isString : function(str) {
      // TODO: Tests and doc
      return toString.call(str) == '[object String]';
    },

    isUndefined : function(obj) {
      // TODO: Tests and doc
      return typeof obj === "undefined";
    },

    isNumber : function(num){
      // TODO: Tests and doc
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
  };
  
}(this));