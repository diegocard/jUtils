// ================================ COLLECTIONS ===============================

/* global jUtils:true */

(function($){
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

$.indexes = function(col, cond, context) {
  //TODO: Doc, test
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
  
  
}(jUtils));

