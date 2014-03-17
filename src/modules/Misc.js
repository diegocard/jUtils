// =============================== MISCELANEOUS ===============================

/* global $:true */

/**
 * Rounds the number to the given precision (amount of decimal digits).
 * @memberOf jUtils.Misc
 * @param {Numeric} number    The given number.
 * @param {Numeric} precision The given precision.
 * @return {Numeric}          The new number with adjusted precision.
 */
$.setPrecision = function(number, precision) {
  var isNumeric = $.isNumeric,
      prec;
  if (isNumeric(number) && isNumeric(precision)) {
    prec = Math.pow(10, precision);
    return Math.round(number*prec) / prec;
  } else {
    throw new TypeError("You must specify a numeric number and precision");
  }
};

$.equals = function(/* args */) {
  // TODO: Finish, compress, doc, test based on underscore tests
  var args = Array.prototype.slice.call(arguments),
      equal = function(obj1, obj2) {
        if (typeof obj1 !== typeof obj2) {
          return false;
        } else {
          if ($.isFunction(obj1)) {
            return obj1.toString === obj2.toString();
          } else {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
          }
        }
        return equal && $.equals(obj2, rest);
      };
  return $.all(args, function(elem, index) {
    // All arguments are equal to the previous one
    if (index > 0) {
      return equal(elem, args[index - 1]);
    } else {
      return true;
    }
  });
};