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
  //TODO: Issue with JSUtils.replace([1,2,3], 2, function(elem, index){return index === 2});
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

