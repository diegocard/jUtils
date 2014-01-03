/**
 * Format a string in a similar way to Java or C#.
 * @method format
 * @memberOf JSUtils.Strings
 * @param  {string} str Pre-format string.
 * @return {string}     Formatted string.
 */
JSUtils.format = function (str) {
  var args = Array.prototype.slice.call(arguments, 1),
      sprintfRegex = /\{(\d+)\}/g;

  return str.replace(sprintfRegex, function(match, number) {
    return number in args ? args[number] : match;
  });
};

JSUtils.microTemplate = function(str, obj) {
  // TODO: Implement, test
  for(var prop in obj) {
    str=str.replace(new RegExp('{{'+prop+'}}','g'), obj[prop]);
  }
  return str;
};
