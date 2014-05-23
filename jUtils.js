/*! jUtils 2014-05-23 */
/**
 * jUtils main object
 * @module jUtils
 */
(function(global) {
  "use strict";

  // Private variables
  var $ = {},
    internal = {
      global: global,
    };

  // Check that jUtils is not already defined.
  if (global.jUtils) {
    return;
  }
  // =================================== MAIN ===================================

  /* global $:true, HTMLElement:false, internal:true */

  /**
   * Returns the global object.
   * @memberOf jUtils.Main
   * @return {Object} The global object.
   */
  $.getGlobal = function() {
    return internal.global;
  };

  /**
   * Checks if the given object is equal to the global object.
   * @memberOf jUtils.Main
   * @param  {Any} elem A given element.
   * @return {Boolean}  True if the given element is equal to the global object,
   *                    false otherwise.
   */
  $.isGlobal = function(elem) {
    return elem === internal.global;
  };

  /**
   * Stores a private variable to jUtils.
   * If the variable was already defined, it will be overridden.
   * This variable can be used through the getVariable method.
   * @param  {String} name  The variable's name.
   * @param  {Any}    value Value stored in the given variable.
   * @return {Bool}         True if the variable was successfully stored,
   *                        false otherwise.
   */
  $.storeVariable = function(name, value) {
    if ($.isString(name)) {
      internal[name] = value;
      return internal[name];
    } else {
      throw new TypeError("You must specify a variable name");
    }
  };

  /**
   * Given its name, returns the value stored in a private variable of the jUtils module.
   * Returns undefined if the variable was not defined previously.
   * @param  {String} name Internal variable name.
   * @return {Any}         Value stored in the private variable, if found.
   */
  $.getVariable = function(name) {
    if ($.isString(name)) {
      return internal[name];
    } else {
      throw new TypeError("You must specify a variable name");
    }
  };

  /**
   * Checks if the given element is an array.
   * @memberOf jUtils.Main
   * @param  {Any}     arr Element to be checked.
   * @return {Boolean}     True if the given element is an array,
   *                       false otherwise.
   */
  $.isArray = function(arr) {
    return Object.prototype.toString.call(arr) == "[object Array]";
  };

  /**
   * Checks if the given element is an object (includes arrays but not functions).
   * @memberOf jUtils.Main
   * @param  {Any}     obj Element to be checked.
   * @return {Boolean}     True if the given element is an array,
   *                       false otherwise.
   */
  $.isObject = function(obj) {
    return obj === Object(obj) && !$.isFunction(obj);
  };

  /**
   * Checks if the given element is an object (does not include arrays and functions).
   * @memberOf jUtils.Main
   * @param  {Any}     obj Element to be checked.
   * @return {Boolean}     True if the given element is only an object,
   *                       false otherwise.
   */
  $.isStrictlyObject = function(obj) {
    return $.isObject(obj) && !$.isArray(obj);
  };

  /**
   * Checks if the given element is boolean.
   * @memberOf jUtils.Main
   * @param  {Any}     bool Element to be checked.
   * @return {Boolean}      True if the given element is a boolean value,
   *                        false otherwise.
   */
  $.isBoolean = function(bool) {
    return bool === true || bool === false;
  };

  /**
   * Checks if the given element is a string.
   * @memberOf jUtils.Main
   * @param  {Any}     str Element to be checked.
   * @return {Boolean}     True if the given element is a string,
   *                       false otherwise.
   */
  $.isString = function(str) {
    return Object.prototype.toString.call(str) === "[object String]";
  };

  /**
   * Checks if the given element is a function.
   * @memberOf jUtils.Main
   * @param  {Any}     fun Element to be checked.
   * @return {Boolean}     True if the given element is a function,
   *                       false otherwise.
   */
  $.isFunction = function(fun) {
    return Object.prototype.toString.call(fun) === "[object Function]";
  };

  /**
   * Checks if the given element is undefined.
   * @memberOf jUtils.Main
   * @param  {Any}     obj Element to be checked.
   * @return {Boolean}     True if the given element is undefined,
   *                       false otherwise.
   */
  $.isUndefined = function(obj) {
    return typeof obj === "undefined";
  };

  /**
   * Checks if the given element is a number.
   * @memberOf jUtils.Main
   * @param  {Any}     num Element to be checked.
   * @return {Boolean}     True if the given element is a number,
   *                       false otherwise.
   */
  $.isNumeric = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  };

  /**
   * Checks if the given element is an HTML element.
   * @memberOf jUtils.Main
   * @param  {Any}     element Element to be checked.
   * @return {Boolean}         True if the given element is an HTML element,
   *                           false otherwise.
   */
  $.isHtmlElement = function(element) {
    return element instanceof HTMLElement;
  };
  // ================================ COLLECTIONS ===============================

  /* global $:true */

  /**
   * Returns an array with the property names for the given object.
   * If obj is not an object, then an exception is thrown.
   * @memberOf jUtils.Main
   * @param  {Object} obj The given object.
   * @return {Array}      Array of property names.
   */
  $.getKeys = function(obj) {
    var keys = [],
      key;
    if (!$.isObject(obj)) {
      throw new TypeError("Invalid object");
    }
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  };

  /**
   * Concise and efficient forEach implementation.
   * @memberOf jUtils.Main
   * @param  {Object} obj     Elements to be iterated.
   * @param  {Function} func  Function applied to the elements in obj.
   * @param  {Object} context Optional: Context for func.
   */
  $.forEach = function(obj, func, context) {
    var i, len, keys;
    if ($.isStrictlyObject(obj)) {
      keys = $.getKeys(obj);
      for (i = 0, len = keys.length; i < len; i += 1) {
        func.call(context, obj[keys[i]], keys[i], obj);
      }
    } else {
      for (i = 0, len = obj.length; i < len; i += 1) {
        func.call(context, obj[i], i, obj);
      }
    }
  };

  /**
   * Returns the first element that fullfills the given condition, and its index.
   * @memberOf jUtils.Main
   * @param  {Object} obj     Elements to be iterated.
   * @param  {Function} cond  Condition checked until an element fullfills it.
   * @param  {Object} context Optional: Context for the condition.
   */
  $.first = function(obj, cond, context) {
    var i, len, keys;
    if ($.isStrictlyObject(obj)) {
      keys = $.getKeys(obj);
      for (i = 0, len = keys.length; i < len; i += 1) {
        if (cond.call(context, obj[keys[i]], keys[i], obj)) {
          return {
            element: obj[keys[i]],
            key: keys[i]
          };
        }
      }
    } else {
      for (i = 0, len = obj.length; i < len; i += 1) {
        if (cond.call(context, obj[i], i, obj)) {
          return {
            element: obj[i],
            index: i
          };
        }
      }
    }
  };

  /**
   * Replaces all collection components that satisfy the given condition.
   * @method replace
   * @memberOf jUtils.Collections
   * @param  {Collection} col  Collection of items.
   * @param  {Any} replaceWith Collection elements that satisfy the given condition will be replaced by this.
   * @param  {Function} cond   Optional condition that replaced elements must satisfy.
   * @return {Collection}      The resulting collection after replacing.
   */
  $.replace = function(col, replaceWith, condition) {
    $.forEach(col, function(value, index, object) {
      if (!condition || condition(value, index, object)) {
        if ($.isFunction(replaceWith)) {
          col[index] = replaceWith(col[index], index, col);
        } else {
          col[index] = replaceWith;
        }
      }
    });
    return col;
  };

  $.map = function(col, func, context) {

  }

  /**
   * @method indexes
   * @memberOf jUtils.Collections
   * @param {Collection} col Collection of items.
   * @param {Function} cond  Condition that returned elements must satisfy.
   * @return {Collection}    Indexes of the found items.
   */
  $.indexes = function(col, cond, context) {
    // TODO: Test
    var results = [];
    $.forEach(col, function(elem, index, obj) {
      if (cond.call(context, elem, index, obj)) {
        results.push(index);
      }
    });
    return results;
  };

  $.findAll = function(col, cond, context) {
    //TODO: Doc, test
    var results = [];
    $.forEach(col, function(elem, index, obj) {
      if (cond.call(context, elem, index, obj)) {
        results.push(elem);
      }
    });
    return results;
  };

  $.all = function(col, cond, context) {
    //TODO: Doc, test
    return $.indexes(col, cond, context).length === col.length;
  };

  $.any = function(col, cond, context) {
    //TODO: Doc, test
    var first = $.first(col, cond, context);
    return $.isObject(first);
  };
  // ================================= FUNCTIONS ================================

  /* global $:true */

  $.storeConstant = function() {
    //TODO: implement
  };

  // =============================== MISCELANEOUS ===============================

  /* global $:true */

  /**
   * Rounds the number to the given precision (amount of decimal digits).
   * @memberOf jUtils.Misc
   * @param {Numeric} number    The given number.
   * @param {Numeric} precision The given precision.
   * @return {Numeric}          The new number with adjusted precision.
   */
  $.setPrecision = function(number, precision) {
    var isNumeric = $.isNumeric,
      prec;
    if (isNumeric(number) && isNumeric(precision)) {
      prec = Math.pow(10, precision);
      return Math.round(number * prec) / prec;
    } else {
      throw new TypeError("You must specify a numeric number and precision");
    }
  };

  $.equals = function( /* args */ ) {
    // TODO: Finish, compress, doc, test based on underscore tests
    var args = Array.prototype.slice.call(arguments),
      equal = function(obj1, obj2) {
        if (typeof obj1 !== typeof obj2) {
          return false;
        } else {
          if ($.isFunction(obj1)) {
            return obj1.toString === obj2.toString();
          } else {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
          }
        }
        return equal && $.equals(obj2, rest);
      };
    return $.all(args, function(elem, index) {
      // All arguments are equal to the previous one
      if (index > 0) {
        return equal(elem, args[index - 1]);
      } else {
        return true;
      }
    });
  };
  // ================================= OBJECTS =================================

  /* global $:true */

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
      for (i = 0, len = obj.length; i < len; i += 1) {
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


  // ================================== PROMISES ================================

  /* global $:true */

  $.when = function() {
    // Cached so the syntax of code within the function is more readable
    var self = this;

    // Return new instance of itself
    if (!(this instanceof $.when)) {
      return new $.when(arguments);
    }

    // Convert arguments passed in to array
    self.pending = Array.prototype.slice.call(arguments[0]);
    // Cache length of the arguments array
    self.pending_length = self.pending.length;
    // Container for results of async functions
    self.results = {
      length: 0
    };

    (function() {
      // Define pass() within this context so that the outer scope of self(this) is available when pass() is executed within the user's async functions
      self.pass = function() {

        // self.results.push(arguments); //push async results to cache array
        self.results[arguments[0]] = arguments[1];
        self.results.length += 1;

        // If all async functions have finished, pass the results to .then(), which has been redefined to the user's completion function
        if (self.results.length === self.pending_length) {
          self.then.call(self, self.results);
        }
      };
    })();
  };

  $.when.prototype = {
    then: function() {

      // Reassign .then() to the user-defined function that is executed on completion. Also ensures that this() can only be called once per usage of when()
      this.then = arguments[0];

      while (this.pending[0]) {
        // Execute all functions user passed into when()
        this.pending.shift().call(this, this.pass);
      }

    }
  };
  // ============================ REGULAR EXPRESSIONS ===========================

  /* global $:true */

  $.emailRegExp = function(email) {
    // TODO: Doc and test
    return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  // ================================== STRINGS =================================

  /* global $:true */

  /**
   * Format a string in a similar way to Java or C#.
   * @method format
   * @memberOf jUtils.Strings
   * @param  {string} str Pre-format string.
   * @return {string}     Formatted string.
   */
  $.format = function(str) {
    var args = Array.prototype.slice.call(arguments, 1),
      sprintfRegex = /\{(\d+)\}/g;

    return str.replace(sprintfRegex, function(match, number) {
      return number in args ? args[number] : match;
    });
  };

  $.microTemplate = function(str, obj) {
    // TODO: Implement, test
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        str = str.replace(new RegExp('{{' + prop + '}}', 'g'), obj[prop]);
      }
    }
    return str;
  };

  $.hashCode = function(str) {
    //TODO: Doc, test
    var hash = 0,
      i, len, c;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
      c = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + c;
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
  $.translate = function(str, lang, translation) {
    var translations = $.getVariable('translations'),
      strHash;
    if (!translations) translations = $.storeVariable('translations', {});
    if ($.isString(str) && $.isString(lang)) {
      strHash = $.hashCode(str + lang);
      if ($.isString(translation)) {
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

  $.slugify = function(str) {
    //TODO: Doc, test
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;",
      to = "aaaaaeeeeeiiiiooooouuuunc------",
      i, len;

    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    for (i = 0, len = from.length; i < len; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

    return str;
  };

  global.jUtils = $;

}(this));
