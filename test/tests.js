/**
 * JSUtils.format tests.
 * @memberOf Tests
 */
test("format", function() {
  var format1 = JSUtils.Strings.format('a{0}c{1}e{2}g','b', 'd', 'f');
  ok(format1 == "abcdefg", "Format: test with multiple arguments");
});