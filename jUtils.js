/*! jUtils 2014-03-07 */
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
// =================================== AJAX ===================================

/* global jUtils:true, XMLHttpRequest:false */

/*
 * RESTRICTION: IE8+
 */
jUtils.getJSON = function(url, success, error) {
  //TODO: Doc, test, add extra parameters
  var request = new XMLHttpRequest(),
      data;
  request.open('GET', url, true);

  request.onreadystatechange = function() {
    if (this.readyState === 4){
      if (this.status >= 200 && this.status < 400){
        data = JSON.parse(this.responseText);
        success(data);
      } else {
        error();
      }
    }
  };

  request.send();
  request = null;
  return jUtils;
};


/*
 * RESTRICTION: IE8+
 */
jUtils.ajaxPost = function(url, data) {
  // TODO: Doc, test, add extra parameters, check if success and error functions can be added as parameters
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.send(data);
  return jUtils;
};

/*
 * RESTRICTION: IE9+
 */
jUtils.ajaxGet = function(url, success, error) {
  // TODO: Doc, test
  var request = new XMLHttpRequest(),
      resp;
  request.open('GET', url, true);

  request.onreadystatechange = function() {
    if (this.readyState === 4){
      if (this.status >= 200 && this.status < 400){
        resp = this.responseText;
        success(resp);
      } else {
        error();
      }
    }
  };

  request.send();
  request = null;
};

// TODO: Check if method chaining works, add to other methods
// TODO: Combine getJSON, ajaxPost and ajaxGet into a single ajax function?

// ================================== ARRAYS ==================================

/* global jUtils:true */

/**
 * Returns the position of the first element in the array that fulfills
 * the given condition.
 * @method firstIndex
 * @memberOf jUtils.Arrays
 * @param  {Array} array    Array of items.
 * @param  {Function} cond  Condition (returns yes or no).
 * @return {Integer}        Array position is the element was found, -1 otherwise.
 */
jUtils.firstIndex = function(array, cond) {
  for (var i=0, len=array.length; i<len; i+=1) {
    if (cond(array[i])) {
      return i;
    }
  }
  return -1;
};

/**
 * Replaces all array components that satisfy the given condition.
 * @method replace
 * @memberOf jUtils.Arrays
 * @param  {Array} array      Array of items.
 * @param  {Any} replaceWith  Array elements that satisfy the given condition will be replaced by this.
 * @return {Array}            The resulting array after replacing.
 */
jUtils.replace = function(array, replaceWith, condition) {
  jUtils.forEach(array, function(value, index, object) {
    if (!condition || condition(value, index, object)) {
      if (jUtils.isFunction(replaceWith)) {
        array[index] = replaceWith(array[index], index, array);  
      } else {
        array[index] = replaceWith;
      }
    }
  });
  return array;
};

jUtils.slugify = function(str) {
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

/* global jUtils:true */

jUtils.storeConstant = function() {
  //TODO: implement
};
// =============================== MISCELANEOUS ===============================

/* global jUtils:true */

/**
 * Rounds the number to the given precision (amount of decimal digits).
 * @memberOf jUtils.Misc
 * @param {Numeric} number    The given number.
 * @param {Numeric} precision The given precision.
 * @return {Numeric}          The new number with adjusted precision.
 */
jUtils.setPrecision = function(number, precision) {
  var isNumeric = jUtils.isNumeric,
      prec;
  if (isNumeric(number) && isNumeric(precision)) {
    prec = Math.pow(10, precision);
    return Math.round(number*prec) / prec;
  } else {
    throw new TypeError("You must specify a numeric number and precision");
  }
};

jUtils.equals = function(/* args */) {
  // TODO: Finish, compress, doc, test based on underscore tests
  var args = Array.prototype.slice.call(arguments),
      equal2 = function(obj1, obj2) {
        if (typeof obj1 !== typeof obj2) {
          return false;
        } else {
          if (jUtils.isFunction(obj1)) {
            return obj1.toString === obj2.toString();
          } else {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
          }
        }
        return equal && jUtils.equals(obj2, rest);
      };
  return jUtils.all(args, function(elem, index) {
    // All arguments are equal to the previous one
    if (index > 0) {
      return equal2(elem, args[index - 1]);
    } else {
      return true;
    }
  });
};
// ================================= OBJECTS =================================

/* global jUtils:true */

/**
 * Counts the amount of properties in an object (keys).
 * Not that this method only counts own properties.
 * @param  {Object} obj The given object.
 * @return {Int}        Amount of properties.
 */
jUtils.propertyCount = function(obj) {
  return jUtils.getKeys(obj).length;
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
// ============================ REGULAR EXPRESSIONS ===========================

/* global jUtils:true */

jUtils.emailRegExp = function(email) {
  // TODO: Doc and test
  return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
// ================================== STRINGS =================================

/* global jUtils:true */

/**
 * Format a string in a similar way to Java or C#.
 * @method format
 * @memberOf jUtils.Strings
 * @param  {string} str Pre-format string.
 * @return {string}     Formatted string.
 */
jUtils.format = function (str) {
  var args = Array.prototype.slice.call(arguments, 1),
      sprintfRegex = /\{(\d+)\}/g;

  return str.replace(sprintfRegex, function(match, number) {
    return number in args ? args[number] : match;
  });
};

jUtils.microTemplate = function(str, obj) {
  // TODO: Implement, test
  for(var prop in obj) {
    str=str.replace(new RegExp('{{'+prop+'}}','g'), obj[prop]);
  }
  return str;
};

jUtils.hashCode = function(str){
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
jUtils.translate = function(str, lang, translation) {
  var translations = jUtils.getVariable('translations'),
      strHash;
  if (!translations) translations = jUtils.storeVariable('translations', {});
  if (jUtils.isString(str) && jUtils.isString(lang)) {
    strHash = jUtils.hashCode(str + lang);
    if (jUtils.isString(translation)) {
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
