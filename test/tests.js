/* ================================ STRINGS ================================ */
/**
 * JSUtils.format tests.
 * @memberOf Tests
 */
test("format", function() {
  var format1 = JSUtils.Strings.format('a{0}c{1}e{2}g','b', 'd', 'f');
  ok(format1 === "abcdefg", "Format: test with multiple arguments");
});

/* ================================= ARRAYS ================================ */


/**
 * JSUtils.firstIndex tests.
 * @memberOf Tests
 */
test("firstIndex", function() {
  var firstIndex = JSUtils.Arrays.firstIndex,
      array1 = [1,2,3,4],
      cond1 = function(elem) {
        return elem === 2;
      },
      array2 = ['aaa', 'b', 'c', 'd'];

  ok(firstIndex(array1, cond1) === 1, "Format: Numeric array");
});