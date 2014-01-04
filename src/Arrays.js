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

