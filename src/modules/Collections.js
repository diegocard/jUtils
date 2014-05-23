// ================================ COLLECTIONS ===============================

/* global $:true */

/**
 * Returns an array with the property names for the given object.
 * If obj is not an object, then an exception is thrown.
 * @memberOf jUtils.Main
 * @param  {Object} obj The given object.
 * @return {Array}      Array of property names.
 */
$.getKeys = function (obj) {
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
$.forEach = function (obj, func, context) {
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
$.first = function (obj, cond, context) {
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
$.replace = function (col, replaceWith, condition) {
  $.forEach(col, function (value, index, object) {
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

$.map = function (col, func, context) {
  // TODO: Doc, Test
  var results = [];
  $.forEach(col, function (elem, index, obj) {
    results.push(func.call(context, elem, index, obj));
  });
  return results;
};

$.reduce = function (col, func, context) {
  // TODO: Doc, Test
  var initial = false,
      memo;
  $.each(col, function (value, index, list) {
    if (!initial) {
      memo = value;
      initial = true;
    } else {
      memo = func.call(context, memo, value, index, list);
    }
  });
};

/**
 * @method indexes
 * @memberOf jUtils.Collections
 * @param {Collection} col Collection of items.
 * @param {Function} cond  Condition that returned elements must satisfy.
 * @return {Collection}    Indexes of the found items.
 */
$.indexes = function (col, cond, context) {
  // TODO: Test, use mapReduce
  var results = [];
  $.forEach(col, function (elem, index, obj) {
    if (cond.call(context, elem, index, obj)) {
      results.push(index);
    }
  });
  return results;
};

$.findAll = function (col, cond, context) {
  //TODO: Doc, test, use mapReduce
  var results = [];
  $.forEach(col, function (elem, index, obj) {
    if (cond.call(context, elem, index, obj)) {
      results.push(elem);
    }
  });
  return results;
};

$.all = function (col, cond, context) {
  //TODO: Doc, test
  return $.indexes(col, cond, context).length === col.length;
};

$.any = function (col, cond, context) {
  //TODO: Doc, test
  var first = $.first(col, cond, context);
  return $.isObject(first);
};