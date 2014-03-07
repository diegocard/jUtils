// =================================== MAIN ===================================

/* global HTMLElement:false */

/**
 * jUtils main object
 * @module jUtils
 */
(function (global) {
  "use strict";

  var jUtils = global.jUtils,
      // Private variables
      internal = {
        global: global,
      };

  // Check that jUtils is not already defined.
  if (global.jUtils) {
    return;
  }

  jUtils = {

    /**
     * Returns the global object.
     * @memberOf jUtils.Main
     * @return {Object} The global object.
     */
    getGlobal : function() {
      return internal.global;
    },

    /**
     * Checks if the given object is equal to the global object.
     * @memberOf jUtils.Main
     * @param  {Any} elem A given element.
     * @return {Boolean}  True if the given element is equal to the global object,
     *                    false otherwise.
     */
    isGlobal : function(elem) {
      return elem === internal.global;
    },

    /**
     * Stores a private variable to jUtils. 
     * If the variable was already defined, it will be overridden.
     * This variable can be used through the getVariable method.
     * @param  {String} name  The variable's name.
     * @param  {Any}    value Value stored in the given variable.
     * @return {Bool}         True if the variable was successfully stored,
     *                        false otherwise.
     */
    storeVariable : function(name, value) {
      if (jUtils.isString(name)) {
        internal[name] = value;
        return internal[name];
      } else {
        throw new TypeError("You must specify a variable name");
      }
    },

    /**
     * Given its name, returns the value stored in a private variable of the jUtils module.
     * Returns undefined if the variable was not defined previously.
     * @param  {String} name Internal variable name.
     * @return {Any}         Value stored in the private variable, if found.
     */
    getVariable : function(name) {
      if (jUtils.isString(name)) {
        return internal[name];
      } else {
        throw new TypeError("You must specify a variable name");
      }
    },

    /**
     * Returns an array with the property names for the given object.
     * If obj is not an object, then an exception is thrown.
     * @memberOf jUtils.Main
     * @param  {Object} obj The given object.
     * @return {Array}      Array of property names.
     */
    getKeys : function(obj) {
      var keys = [],
          key;
      if (!jUtils.isObject(obj)) {
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
     * @memberOf jUtils.Main
     * @param  {Object} obj     Elements to be iterated.
     * @param  {Function} func  Function applied to the elements in obj.
     * @param  {Object} context Context for func.
     */
    forEach : function(obj, func, context) {
      var i, len, keys;
      if (jUtils.isStrictlyObject(obj)) {
        keys = jUtils.getKeys(obj);
        for (i=0, len=keys.length; i<len; i+=1) {
          func.call(context, obj[keys[i]], keys[i], obj);
        }
      } else {
        for (i=0, len=obj.length; i<len; i+=1) {
          func.call(context, obj[i], i, obj);
        }
      }
    },
    
    first : function(obj, cond, context) {
      // TODO: DOC
      var i, len, keys;
      if (jUtils.isStrictlyObject(obj)) {
        keys = jUtils.getKeys(obj);
        for (i=0, len=keys.length; i<len; i+=1) {
          if (cond.call(context, obj[keys[i]], keys[i], obj)) {
            return  { element:obj[keys[i]], key:keys[i] };
          }
        }
      } else {
        for (i=0, len=obj.length; i<len; i+=1) {
          if (cond.call(context, obj[i], i, obj)) {
            return { element:obj[i], index:i };
          }
        }
      }
    },
    
    /**
     * Checks if the given element is an array.
     * @memberOf jUtils.Main
     * @param  {Any}     arr Element to be checked.
     * @return {Boolean}     True if the given element is an array,
     *                       false otherwise.
     */
    isArray : function(arr) {
      return Object.prototype.toString.call(arr) == "[object Array]";
    },

    /**
     * Checks if the given element is an object (includes arrays but not functions).
     * @memberOf jUtils.Main
     * @param  {Any}     obj Element to be checked.
     * @return {Boolean}     True if the given element is an array,
     *                       false otherwise.
     */
    isObject : function(obj) {
      return obj === Object(obj) && !jUtils.isFunction(obj);
    },

    /**
     * Checks if the given element is an object (does not include arrays and functions).
     * @memberOf jUtils.Main
     * @param  {Any}     obj Element to be checked.
     * @return {Boolean}     True if the given element is only an object,
     *                       false otherwise.
     */
    isStrictlyObject : function(obj) {
      return jUtils.isObject(obj) && !jUtils.isArray(obj);
    },

    /**
     * Checks if the given element is boolean.
     * @memberOf jUtils.Main
     * @param  {Any}     bool Element to be checked.
     * @return {Boolean}      True if the given element is a boolean value,
     *                        false otherwise.
     */
    isBoolean : function(bool) {
      return bool === true || bool === false;
    },

    /**
     * Checks if the given element is a string.
     * @memberOf jUtils.Main
     * @param  {Any}     str Element to be checked.
     * @return {Boolean}     True if the given element is a string,
     *                       false otherwise.
     */
    isString : function(str) {
      return Object.prototype.toString.call(str) === "[object String]";
    },

    /**
     * Checks if the given element is a function.
     * @memberOf jUtils.Main
     * @param  {Any}     fun Element to be checked.
     * @return {Boolean}     True if the given element is a function,
     *                       false otherwise.
     */
    isFunction : function(fun) {
      return Object.prototype.toString.call(fun) === "[object Function]";
    },

    /**
     * Checks if the given element is undefined.
     * @memberOf jUtils.Main
     * @param  {Any}     obj Element to be checked.
     * @return {Boolean}     True if the given element is undefined,
     *                       false otherwise.
     */
    isUndefined : function(obj) {
      return typeof obj === "undefined";
    },

    /**
     * Checks if the given element is a number.
     * @memberOf jUtils.Main
     * @param  {Any}     num Element to be checked.
     * @return {Boolean}     True if the given element is a number,
     *                       false otherwise.
     */
    isNumeric : function(num){
      return !isNaN(parseFloat(num)) && isFinite(num);
    },
    
    /**
     * Checks if the given element is an HTML element.
     * @memberOf jUtils.Main
     * @param  {Any}     element Element to be checked.
     * @return {Boolean}         True if the given element is an HTML element,
     *                           false otherwise.
     */
    isHtmlElement : function(element){
      return element instanceof HTMLElement;
    },
  };
  
  global.jUtils = jUtils;
  
}(this));