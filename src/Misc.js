// =============================== MISCELANEOUS ===============================

/* global jUtils:true */

/**
 * Rounds the number to the given precision (amount of decimal digits).
 * @memberOf jUtils.Misc
 * @param {Numeric} number    The given number.
 * @param {Numeric} precision The given precision.
 * @return {Numeric}          The new number with adjusted precision.
 */
jUtils.setPrecision = function(number, precision) {
  var isNumeric = jUtils.isNumeric,
      prec;
  if (isNumeric(number) && isNumeric(precision)) {
    prec = Math.pow(10, precision);
    return Math.round(number*prec) / prec;
  } else {
    throw new TypeError("You must specify a numeric number and precision");
  }
};

jUtils.equals = function(/* args */) {
  // TODO: Finish, compress, doc, test based on underscore tests
  var args = Array.prototype.slice.call(arguments),
      equal2 = function(obj1, obj2) {
        if (typeof obj1 !== typeof obj2) {
          return false;
        } else {
          if (jUtils.isFunction(obj1)) {
            return obj1.toString === obj2.toString();
          } else {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
          }
        }
        return equal && jUtils.equals(obj2, rest);
      };
  return jUtils.all(args, function(elem, index) {
    // All arguments are equal to the previous one
    if (index > 0) {
      return equal2(elem, args[index - 1]);
    } else {
      return true;
    }
  });
};