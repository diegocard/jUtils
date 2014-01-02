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
