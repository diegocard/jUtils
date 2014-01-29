// =============================== MISCELANEOUS ===============================

/* global JSUtils:true */

/**
 * Sets the precision for a given number.
 * @memberOf JSUtils.Misc
 * @param {Numeric} number    The given number.
 * @param {Numeric} precision The given precision.
 * @return {Numeric}          The new number with adjusted precision.
 */
JSUtils.setPrecision = function(number, precision) {
  // TODO: TEST
  var isNumeric = JSUtils.isNumeric,
      prec;
  if (isNumeric(number) && isNumeric(precision)) {
    prec = Math.pow(10, precision);
    return Math.round(number*prec) / prec;
  } else {
    throw new TypeError("You must specify a numeric number and precision");
  }
};