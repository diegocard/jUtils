// =============================== MISCELANEOUS ===============================

/* global JSUtils:true */

/**
 * Rounds the number to the given precision (amount of decimal digits).
 * @memberOf JSUtils.Misc
 * @param {Numeric} number    The given number.
 * @param {Numeric} precision The given precision.
 * @return {Numeric}          The new number with adjusted precision.
 */
JSUtils.setPrecision = function(number, precision) {
  var isNumeric = JSUtils.isNumeric,
      prec;
  if (isNumeric(number) && isNumeric(precision)) {
    prec = Math.pow(10, precision);
    return Math.round(number*prec) / prec;
  } else {
    throw new TypeError("You must specify a numeric number and precision");
  }
};