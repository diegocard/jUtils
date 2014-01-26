/* ================================== MAIN ================================= */

/**
 * JSUtils.getGlobal and JSUtils.isGLobal tests.
 * @memberOf Tests
 */
test("getGlobal and isGLobal", function() {
  ok(JSUtils.isGlobal(JSUtils.getGlobal()), "getGlobal and isGlobal: working together");
});

/**
 * JSUtils.storeVariable and JSUtils.getVariale tests.
 * @memberOf Tests
 */
test("JSUtils.storeVariable and JSUtils.getVariale", function() {
  var obj1 = {a: 1, b: "str"},
      obj2 = "string test",
      obj3 = [1,2,3],
      obj4; // undefined
  throws(JSUtils.getVariable, TypeError, "getVariale: no name specified");
  throws(JSUtils.storeVariable, TypeError, "getVariale: no name specified");
  ok(
    function() {
      JSUtils.storeVariable("var1", obj1);
      return JSUtils.getVariable("var1") === obj1;
    },
    "storeVariable and getVariable: Working together with objects"
  );
  ok(
    function() {
      JSUtils.storeVariable("var2", obj2);
      return JSUtils.getVariable("var2") === obj2;
    },
    "storeVariable and getVariable: Working together with strings"
  );
  ok(
    function() {
      JSUtils.storeVariable("var3", obj3);
      return JSUtils.getVariable("var3") === obj3;
    },
    "storeVariable and getVariable: Working together with arrays"
  );
  ok(
    function() {
      JSUtils.storeVariable("var4", obj4);
      return JSUtils.getVariable("var4") === obj4;
    },
    "storeVariable and getVariable: Working together with undefined parameters"
  );
});

/**
 * JSUtils.getKeys tests.
 * @memberOf Tests
 */
test("getKeys", function() {
  var obj1 = {},
      obj2 = {
        prop1: 1,
        prop2: {},
        prop3: [1,2,3],
        prop4: function() {return null;},
      },
      obj2Props = ['prop1', ];
  ok(JSUtils.getKeys(obj1).length === 0, "getKeys: Empty object");
  ok(function() {
    var result2 = JSUtils.getKeys(obj2);
    return (
      result2[0] === 'prop1' &&
      result2[1] === 'prop2' &&
      result2[2] === 'prop3' &&
      result2[3] === 'prop4'
    );
  }, "getKeys: Several types of properties");
  throws(JSUtils.getKeys([]), TypeError, "getKeys: Not an object");
});

/**
 * JSUtils.forEach tests.
 * @memberOf Tests
 */
test("forEach", function() {
  var arr = [1,2,3,4],
      sum1 = 0,
      sum2 = 0,
      obj = {
        a: 1,
        b: 2,
        c: 3,
      };
  JSUtils.forEach(arr, function(val){
    sum1 += val;
  });
  JSUtils.forEach(obj, function(val){
    sum2 += val;
  });
  ok(sum1 === 10, "forEach: numeric array");
  ok(sum2 === 6, "forEach: object properties");
});

/**
 * JSUtils.isArray tests.
 * @memberOf Tests
 */
test("isArray", function() {
  var test1 = [],
      test2 = [1,2,3],
      test3 = ["a", "b", "c"],
      invalidTests = [NaN, 1, {}, {a: 1}, undefined, function() { return 1; }],
      i, len;
  ok(JSUtils.isArray(test1), "isArray: empty array");
  ok(JSUtils.isArray(test2), "isArray: numeric array");
  ok(JSUtils.isArray(test3), "isArray: string array");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!JSUtils.isArray(invalidTests[i]));
  }
});

/**
 * JSUtils.isObject tests.
 * @memberOf Tests
 */
test("isObject", function() {
  var test1 = {},
      test2 = {a: 1, b: {c: 2}},
      test3 = {a: 1, b: function() {
        return 1;
      }},
      test4 = [],
      test5 = [1,2,3],
      invalidTests = [NaN, 1, "str", undefined, function() { return 1; }],
      i, len;
  ok(JSUtils.isObject(test1), "isObject: empty object");
  ok(JSUtils.isObject(test2), "isObject: nested objects");
  ok(JSUtils.isObject(test3), "isObject: includes a function");
  ok(JSUtils.isObject(test3), "isObject: empty array");
  ok(JSUtils.isObject(test3), "isObject: array with elements");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!JSUtils.isObject(invalidTests[i]));
  }
});

/**
 * JSUtils.isOnlyObject tests.
 * @memberOf Tests
 */
test("isOnlyObject", function() {
  var test1 = {},
      test2 = {a: 1, b: {c: 2}},
      test3 = {a: 1, b: function() {
        return 1;
      }},
      invalidTests = [NaN, 1, "str", undefined, [], [1,2,3], function() { return 1; }],
      i, len;
  ok(JSUtils.isOnlyObject(test1), "isOnlyObject: empty object");
  ok(JSUtils.isOnlyObject(test2), "isOnlyObject: nested objects");
  ok(JSUtils.isOnlyObject(test3), "isOnlyObject: includes a function");
  ok(JSUtils.isOnlyObject(test3), "isOnlyObject: empty array");
  ok(JSUtils.isOnlyObject(test3), "isOnlyObject: array with elements");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!JSUtils.isOnlyObject(invalidTests[i]));
  }
});

/**
 * JSUtils.isBoolean tests.
 * @memberOf Tests
 */
test("isBoolean", function() {
  var invalidTests = [{}, {a: 1}, NaN, 1, -1, 0, "str", undefined, [], [1,2,3], function() { return 1; }],
      i, len;
  ok(JSUtils.isBoolean(true), "isOnlyObject: true");
  ok(JSUtils.isBoolean(false), "isOnlyObject: false");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!JSUtils.isBoolean(invalidTests[i]));
  }
});

/**
 * JSUtils.isString tests.
 * @memberOf Tests
 */
test("isString", function() {
  var invalidTests = [{}, {a: 1}, NaN, 1, -1, 0, true, false, undefined, [], [1,2,3], function() { return 1; }],
      i, len;
  ok(JSUtils.isString(""), "isString: empty string");
  ok(JSUtils.isString('test1'), "isString: single quotes");
  ok(JSUtils.isString("test2"), "isString: double quotes");
  ok(JSUtils.isString(new String("asd")), "isString: String constructor");
  ok(JSUtils.isString(new String()), "isString: Empty string constructor");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!JSUtils.isString(invalidTests[i]));
  }
});

/**
 * JSUtils.isFunction tests.
 * @memberOf Tests
 */
test("isFunction", function() {
  var invalidTests = [{}, {a: 1}, NaN, 1, -1, 0, true, false, undefined, [], [1,2,3], "str"],
      func = function func(a) {
        return a+1;
      },
      i, len;
  ok(JSUtils.isFunction(function(a, b){return a + b;}), "isFunction: anonymous function");
  ok(JSUtils.isFunction(func), "isFunction: names function");
  ok(JSUtils.isFunction(new Function()), "isFunction: Empty function constructor");
  ok(JSUtils.isFunction(new Function("x", "y", "return x+y;")), "isFunction: Empty function constructor");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!JSUtils.isFunction(invalidTests[i]));
  }
});

/**
 * JSUtils.isUndefined tests.
 * @memberOf Tests
 */
test("isUndefined", function() {
  var invalidTests = [{}, {a: 1}, NaN, 1, -1, 0, true, false, [], [1,2,3], "str", function() { return 1; }],
      undef, i, len;
  ok(JSUtils.isUndefined(undef), "isUndefined: Uninitialized variable");
  ok(JSUtils.isUndefined(undefined), "isUndefined: Undefined pseudo-reserved word");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!JSUtils.isUndefined(invalidTests[i]));
  }
});

/**
 * JSUtils.isNumeric tests.
 * @memberOf Tests
 */
test("isNumeric", function() {
  var invalidTests = [{}, {a: 1}, NaN, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY , undefined, true, false, [], [1,2,3], "str", function() { return 1; }],
      i, len;
  ok(JSUtils.isNumeric(-25), "isNumeric: Negative integer number");
  ok(JSUtils.isNumeric(4), "isNumeric: Positive integer number");
  ok(JSUtils.isNumeric(0), "isNumeric: Zero");
  ok(JSUtils.isNumeric(-10.15), "isNumeric: Negative float number");
  ok(JSUtils.isNumeric(1.15), "isNumeric: Positive float number");
  ok(JSUtils.isNumeric(Number.MAX_VALUE), "isNumeric: Max number");
  ok(JSUtils.isNumeric(Number.MIN_VALUE), "isNumeric: Min number");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!JSUtils.isNumeric(invalidTests[i]));
  }
});

/* ================================ STRINGS ================================ */

/**
 * JSUtils.format tests.
 * @memberOf Tests
 */
test("format", function() {
  var format1 = JSUtils.format('a{0}c{1}e{2}g','b', 'd', 'f');
  ok(format1 === "abcdefg", "format: test with multiple arguments");
});

/**
 * JSUtils.translate tests.
 * @memberOf Tests
 */
test("translate", function() {
  var translation1,
      translation2;
  ok(JSUtils.translate("Not defined", "Italian") === undefined, "translate: text not previously defined");
  JSUtils.translate("This is a translation test", "Spanish", "Esta es una prueba de traducción");
  translation1 = JSUtils.translate("This is a translation test", "Spanish");
  ok(translation1 === "Esta es una prueba de traducción", "translate: successful translation");
});

/* ================================= ARRAYS ================================ */

/**
 * JSUtils.firstIndex tests.
 * @memberOf Tests
 */
test("firstIndex", function() {
  var firstIndex = JSUtils.firstIndex,
      array1 = [1,2,3,4],
      cond1 = function(elem) {
        return elem === 2;
      },
      array2 = ['a', 'bb', 'ccc', 'dddd'],
      cond2 = function(elem) {
        return elem.length === 3;
      };

  ok(firstIndex(array1, cond1) === 1, "firstIndex: Numeric array");
  ok(firstIndex(array2, cond2) === 2, "firstIndex: String array");
});

/* ================================ OBJECTS ================================ */

/**
 * JSUtils.propertyCount tests.
 * @memberOf Tests
 */
test("propertyCount", function() {
  var propertyCount = JSUtils.propertyCount;
  ok(propertyCount({}) === 0, "propertyCount: Empty array");
  ok(propertyCount({a: 1}) === 1, "propertyCount: One property");
  throws(function() {
    propertyCount();
  }, TypeError, "propertyCount: No arguments");
  throws(function() {
    propertyCount(1);
  }, TypeError, "propertyCount: Numeric argument");
  throws(function() {
    propertyCount("str");
  }, TypeError, "propertyCount: String argument");
});