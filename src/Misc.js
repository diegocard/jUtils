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