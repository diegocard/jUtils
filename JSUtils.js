/*! JSUtils 2014-01-12 */
// =================================== MAIN ===================================

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
      }
      return false;
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
      }
      return undefined;
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
        throw new TypeError('Invalid object');
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
// ================================== COMMON ==================================

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
// ================================== ARRAYS ==================================

/**
 * Returns the position of the first element in the array that fulfills
 * the given condition.
 * @method firstIndex
 * @memberOf JSUtils.Arrays
 * @param  {Array} array    Array of items.
 * @param  {Function} func  Condition (returns yes or no).
 * @return {Integer}        Array position is the element was found, -1 otherwise.
 */
JSUtils.firstIndex = function(array, func) {
  for (var i=0, len=array.length; i<len; i+=1) {
    if (func(array[i])) {
      return i;
    }
  }
  return -1;
};

JSUtils.replace = function(array, element, condition) {
  //TODO: Issue with JSUtils.replace([1,2,3], 2, function(elem, index){return index === 2});
  JSUtils.forEach(array, function(value, index, object) {
    if (!condition || condition(value, index, object)) {
      array[index] = element;
    }
  });
  return array;
};


// ================================= FUNCTIONS ================================

JSUtils.storeConstant = function() {
  //TODO: implement
};

// ================================== STRINGS =================================

/**
 * Format a string in a similar way to Java or C#.
 * @method format
 * @memberOf JSUtils.Strings
 * @param  {string} str Pre-format string.
 * @return {string}     Formatted string.
 */
JSUtils.format = function (str) {
  var args = Array.prototype.slice.call(arguments, 1),
      sprintfRegex = /\{(\d+)\}/g;

  return str.replace(sprintfRegex, function(match, number) {
    return number in args ? args[number] : match;
  });
};

JSUtils.microTemplate = function(str, obj) {
  // TODO: Implement, test
  for(var prop in obj) {
    str=str.replace(new RegExp('{{'+prop+'}}','g'), obj[prop]);
  }
  return str;
};

JSUtils.hashCode = function(str){
  //TODO: Doc, test
  var hash = 0,
      i, len, c;
  if (str.length === 0) return hash;
  for (i=0, len=str.length; i<len; i++) {
      c     = str.charCodeAt(i);
      hash  = ((hash<<5)-hash)+c;
      hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/**
 * Stored and returns text translations.
 * @requires JUtils.hashCode
 * @param  {String} str         Text to be translated.
 * @param  {String} lang        The language.
 * @param  {String} translation If specified, stores the translation.
 * @return {String}             Translated text.
 */
JSUtils.translate = function(str, lang, translation) {
  var translations = JSUtils.getVariable('translations'),
      strHash;
  if (!translations) translations = JSUtils.storeVariable('translations', {});
  if (JSUtils.isString(str) && JSUtils.isString(lang)) {
    strHash = JSUtils.hashCode(str + lang);
    if (JSUtils.isString(translation)) {
      // Store the translation
      translations[strHash] = translation;
      return translation;
    } else {
      // Return the translation
      return translations[strHash];
    }
  } else {
    throw new TypeError('You must provide at least a string and language');
  }
};
