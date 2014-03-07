// ================================ COLLECTIONS ===============================

/* global jUtils:true */

/**
 * Replaces all collection components that satisfy the given condition.
 * @method replace
 * @memberOf jUtils.Collections
 * @param  {Collection} col  Collection of items.
 * @param  {Any} replaceWith Collection elements that satisfy the given condition will be replaced by this.
 * @return {Collection}      The resulting collection after replacing.
 */
jUtils.replace = function(col, replaceWith, condition) {
  jUtils.forEach(col, function(value, index, object) {
    if (!condition || condition(value, index, object)) {
      if (jUtils.isFunction(replaceWith)) {
        col[index] = replaceWith(col[index], index, col);  
      } else {
        col[index] = replaceWith;
      }
    }
  });
  return col;
};