// =================================== MAIN ===================================

/**
 * JSUtils main object
 * @module JSUtils
 */
(function (global) {
  "use strict";

  var JSUtils = global.JSUtils,
      // Private variables
      internal = {
        global: global,
      };

  // Check that JSUtils is not already defined.
  if (global.JSUtils) {
    return;
  }

  JSUtils = {

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
     *                    false otherwise.
     */
    isGlobal : function(elem) {
      return elem === internal.global;
    },

    /**
     * Stores a private variable to JSUtils. 
     * If the variable was already defined, it will be overridden.
     * This variable can be used through the getVariable method.
     * @param  {String} name  The variable's name.
     * @param  {Any}    value Value stored in the given variable.
     * @return {Bool}         True if the variable was successfully stored,
     *                        false otherwise.
     */
    storeVariable : function(name, value) {
      if (JSUtils.isString(name)) {
        internal[name] = value;
        return internal[name];
      } else {
        throw new TypeError("You must specify a variable name");
      }
    },

    /**
     * Given its name, returns the value stored in a private variable of the JSUtils module.
     * Returns undefined if the variable was not defined previously.
     * @param  {String} name Internal variable name.
     * @return {Any}         Value stored in the private variable, if found.
     */
    getVariable : function(name) {
      if (JSUtils.isString(name)) {
        return internal[name];
      } else {
        throw new TypeError("You must specify a variable name");
      }
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
      if (!JSUtils.isObject(obj)) {
        throw new TypeError("Invalid object");
      }
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys;
    },

    /**
     * Concise and efficient forEach implementation.
     * @memberOf JSUtils.Main
     * @param  {Object} obj     Elements to be iterated.
     * @param  {Function} func  Function applied to the elements in obj.
     * @param  {Object} context Context for func.
     */
    forEach : function(obj, func, context) {
      var i, len, keys;
      if (JSUtils.isObject(obj)) {
        keys = JSUtils.getKeys(obj);
        for (i=0, len=keys.length; i<len; i+=1) {
          func.call(context, obj[keys[i]], keys[i], obj);
        }
      } else {
        for (i=0, len=obj.length; i<len; i+=1) {
          func.call(context, obj[i], i, obj);
        }
      }
    },

    /**
     * Checks if the given element is an array.
     * @memberOf JSUtils.Main
     * @param  {Any}     arr Element to be checked.
     * @return {Boolean}     True if the given element is an array,
     *                       false otherwise.
     */
    isArray : function(arr) {
      return Object.prototype.toString.call(arr) == "[object Array]";
    },

    /**
     * Checks if the given element is an object (includes arrays but not functions).
     * @memberOf JSUtils.Main
     * @param  {Any}     obj Element to be checked.
     * @return {Boolean}     True if the given element is an array,
     *                       false otherwise.
     */
    isObject : function(obj) {
      return obj === Object(obj) && !JSUtils.isFunction(obj);
    },

    /**
     * Checks if the given element is an object (does not include arrays and functions).
     * @memberOf JSUtils.Main
     * @param  {Any}     obj Element to be checked.
     * @return {Boolean}     True if the given element is only an object,
     *                       false otherwise.
     */
    isOnlyObject : function(obj) {
      return JSUtils.isObject(obj) && !JSUtils.isArray(obj);
    },

    /**
     * Checks if the given element is boolean.
     * @memberOf JSUtils.Main
     * @param  {Any}     bool Element to be checked.
     * @return {Boolean}      True if the given element is a boolean value,
     *                        false otherwise.
     */
    isBoolean : function(bool) {
      return bool === true || bool === false;
    },

    isString : function(str) {
      // TODO: Tests and doc
      return Object.prototype.toString.call(str) === "[object String]";
    },

    isFunction : function(fun) {
      // TODO: Tests and doc
      return Object.prototype.toString.call(fun) === "[object Function]";
    },

    isUndefined : function(obj) {
      // TODO: Tests and doc
      return typeof obj === "undefined";
    },

    isNumber : function(num){
      // TODO: Tests and doc
      return !isNaN(parseFloat(num)) && isFinite(num);
    },
  };
  
  global.JSUtils = JSUtils;
  
}(this));