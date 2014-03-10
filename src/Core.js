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
$.isNumeric = function(num){
  return !isNaN(parseFloat(num)) && isFinite(num);
};

/**
 * Checks if the given element is an HTML element.
 * @memberOf jUtils.Main
 * @param  {Any}     element Element to be checked.
 * @return {Boolean}         True if the given element is an HTML element,
 *                           false otherwise.
 */
$.isHtmlElement = function(element){
  return element instanceof HTMLElement;
};