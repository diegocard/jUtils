/*! JSUtils 2014-02-21 */
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
      if (JSUtils.isStrictlyObject(obj)) {
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
    isStrictlyObject : function(obj) {
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

    /**
     * Checks if the given element is a string.
     * @memberOf JSUtils.Main
     * @param  {Any}     str Element to be checked.
     * @return {Boolean}     True if the given element is a string,
     *                       false otherwise.
     */
    isString : function(str) {
      return Object.prototype.toString.call(str) === "[object String]";
    },

    /**
     * Checks if the given element is a function.
     * @memberOf JSUtils.Main
     * @param  {Any}     fun Element to be checked.
     * @return {Boolean}     True if the given element is a function,
     *                       false otherwise.
     */
    isFunction : function(fun) {
      return Object.prototype.toString.call(fun) === "[object Function]";
    },

    /**
     * Checks if the given element is undefined.
     * @memberOf JSUtils.Main
     * @param  {Any}     obj Element to be checked.
     * @return {Boolean}     True if the given element is undefined,
     *                       false otherwise.
     */
    isUndefined : function(obj) {
      return typeof obj === "undefined";
    },

    /**
     * Checks if the given element is a number.
     * @memberOf JSUtils.Main
     * @param  {Any}     num Element to be checked.
     * @return {Boolean}     True if the given element is a number,
     *                       false otherwise.
     */
    isNumeric : function(num){
      return !isNaN(parseFloat(num)) && isFinite(num);
    },
  };
  
  global.JSUtils = JSUtils;
  
}(this));
// ================================== ARRAYS ==================================

/* global JSUtils:true */

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
  // TODO: Doc, test
  JSUtils.forEach(array, function(value, index, object) {
    if (!condition || condition(value, index, object)) {
      array[index] = element;
    }
  });
  return array;
};

JSUtils.slugify = function(str) {
  //TODO: Doc, test
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;",
      to   = "aaaaaeeeeeiiiiooooouuuunc------",
      i, len;

  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  for (i=0, len=from.length ; i<len ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};


// ================================= FUNCTIONS ================================

/* global JSUtils:true */

JSUtils.storeConstant = function() {
  //TODO: implement
};
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
    throw new TypeError("Invalid object");
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
// ============================ REGULAR EXPRESSIONS ===========================

/* global JSUtils:true */

JSUtils.emailRegExp = function(email) {
  // TODO: Doc and test
  return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
// ================================== STRINGS =================================

/* global JSUtils:true */

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

// =============================== MISCELANEOUS ===============================

/* global JSUtils:true */

/**
 * Rounds the number to the given precision (amount of decimal digits).
 * @memberOf JSUtils.Misc
 * @param {Numeric} number    The given number.
 * @param {Numeric} precision The given precision.
 * @return {Numeric}          The new number with adjusted precision.
 */
JSUtils.setPrecision = function(number, precision) {
  var isNumeric = JSUtils.isNumeric,
      prec;
  if (isNumeric(number) && isNumeric(precision)) {
    prec = Math.pow(10, precision);
    return Math.round(number*prec) / prec;
  } else {
    throw new TypeError("You must specify a numeric number and precision");
  }
};