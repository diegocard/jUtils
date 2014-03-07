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

