/**
 * String utilities
 * @namespace
 * @memberOf JSUtils
 */
JSUtils.String = JSUtils.String || {};


/**
 * Format a string in a similar way to Java or C#.
 * @method format
 * @memberOf JSUtils.String
 * @param  {string} str Pre-format string.
 * @return {string}     Formatted string.
 */
JSUtils.String.format = function (str) {

  var args = Array.prototype.slice.call(arguments, 1),
      sprintfRegex = /\{(\d+)\}/g;

  return str.replace(sprintfRegex, function(match, number) {
    return number in args ? args[number] : match;
  });
};
