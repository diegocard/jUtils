/* ================================== MAIN ================================= */

/* global jUtils:false, ok:false, test:false, throws:false*/

/**
 * jUtils.getGlobal and jUtils.isGLobal tests.
 * @memberOf Tests
 */
test("getGlobal and isGLobal", function() {
  ok(jUtils.isGlobal(jUtils.getGlobal()), "getGlobal and isGlobal: working together");
});

/**
 * jUtils.storeVariable and jUtils.getVariale tests.
 * @memberOf Tests
 */
test("jUtils.storeVariable and jUtils.getVariale", function() {
  var obj1 = {a: 1, b: "str"},
      obj2 = "string test",
      obj3 = [1,2,3],
      obj4; // undefined
  throws(jUtils.getVariable, TypeError, "getVariale: no name specified");
  throws(jUtils.storeVariable, TypeError, "getVariale: no name specified");
  ok(
    function() {
      jUtils.storeVariable("var1", obj1);
      return jUtils.getVariable("var1") === obj1;
    },
    "storeVariable and getVariable: Working together with objects"
  );
  ok(
    function() {
      jUtils.storeVariable("var2", obj2);
      return jUtils.getVariable("var2") === obj2;
    },
    "storeVariable and getVariable: Working together with strings"
  );
  ok(
    function() {
      jUtils.storeVariable("var3", obj3);
      return jUtils.getVariable("var3") === obj3;
    },
    "storeVariable and getVariable: Working together with arrays"
  );
  ok(
    function() {
      jUtils.storeVariable("var4", obj4);
      return jUtils.getVariable("var4") === obj4;
    },
    "storeVariable and getVariable: Working together with undefined parameters"
  );
});

/**
 * jUtils.getKeys tests.
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
  ok(jUtils.getKeys(obj1).length === 0, "getKeys: Empty object");
  ok(function() {
    var result2 = jUtils.getKeys(obj2);
    return (
      result2[0] === 'prop1' &&
      result2[1] === 'prop2' &&
      result2[2] === 'prop3' &&
      result2[3] === 'prop4'
    );
  }, "getKeys: Several types of properties");
  throws(jUtils.getKeys([]), TypeError, "getKeys: Not an object");
});

/**
 * jUtils.forEach tests.
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
  jUtils.forEach(arr, function(val){
    sum1 += val;
  });
  jUtils.forEach(obj, function(val){
    sum2 += val;
  });
  ok(sum1 === 10, "forEach: numeric array");
  ok(sum2 === 6, "forEach: object properties");
});

/**
 * jUtils.isArray tests.
 * @memberOf Tests
 */
test("isArray", function() {
  var test1 = [],
      test2 = [1,2,3],
      test3 = ["a", "b", "c"],
      invalidTests = [NaN, 1, {}, {a: 1}, undefined, function() { return 1; }],
      i, len;
  ok(jUtils.isArray(test1), "isArray: empty array");
  ok(jUtils.isArray(test2), "isArray: numeric array");
  ok(jUtils.isArray(test3), "isArray: string array");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!jUtils.isArray(invalidTests[i]));
  }
});

/**
 * jUtils.isObject tests.
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
  ok(jUtils.isObject(test1), "isObject: empty object");
  ok(jUtils.isObject(test2), "isObject: nested objects");
  ok(jUtils.isObject(test3), "isObject: includes a function");
  ok(jUtils.isObject(test3), "isObject: empty array");
  ok(jUtils.isObject(test3), "isObject: array with elements");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!jUtils.isObject(invalidTests[i]));
  }
});

/**
 * jUtils.isStrictlyObject tests.
 * @memberOf Tests
 */
test("isStrictlyObject", function() {
  var test1 = {},
      test2 = {a: 1, b: {c: 2}},
      test3 = {a: 1, b: function() {
        return 1;
      }},
      invalidTests = [NaN, 1, "str", undefined, [], [1,2,3], function() { return 1; }],
      i, len;
  ok(jUtils.isStrictlyObject(test1), "isStrictlyObject: empty object");
  ok(jUtils.isStrictlyObject(test2), "isStrictlyObject: nested objects");
  ok(jUtils.isStrictlyObject(test3), "isStrictlyObject: includes a function");
  ok(jUtils.isStrictlyObject(test3), "isStrictlyObject: empty array");
  ok(jUtils.isStrictlyObject(test3), "isStrictlyObject: array with elements");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!jUtils.isStrictlyObject(invalidTests[i]));
  }
});

/**
 * jUtils.isBoolean tests.
 * @memberOf Tests
 */
test("isBoolean", function() {
  var invalidTests = [{}, {a: 1}, NaN, 1, -1, 0, "str", undefined, [], [1,2,3], function() { return 1; }],
      i, len;
  ok(jUtils.isBoolean(true), "isStrictlyObject: true");
  ok(jUtils.isBoolean(false), "isStrictlyObject: false");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!jUtils.isBoolean(invalidTests[i]));
  }
});

/**
 * jUtils.isString tests.
 * @memberOf Tests
 */
test("isString", function() {
  var invalidTests = [{}, {a: 1}, NaN, 1, -1, 0, true, false, undefined, [], [1,2,3], function() { return 1; }],
      i, len;
  ok(jUtils.isString(""), "isString: empty string");
  ok(jUtils.isString('test1'), "isString: single quotes");
  ok(jUtils.isString("test2"), "isString: double quotes");
  ok(jUtils.isString(new String("asd")), "isString: String constructor");
  ok(jUtils.isString(new String()), "isString: Empty string constructor");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!jUtils.isString(invalidTests[i]));
  }
});

/**
 * jUtils.isFunction tests.
 * @memberOf Tests
 */
test("isFunction", function() {
  var invalidTests = [{}, {a: 1}, NaN, 1, -1, 0, true, false, undefined, [], [1,2,3], "str"],
      func = function func(a) {
        return a+1;
      },
      i, len;
  ok(jUtils.isFunction(function(a, b){return a + b;}), "isFunction: anonymous function");
  ok(jUtils.isFunction(func), "isFunction: names function");
  ok(jUtils.isFunction(new Function()), "isFunction: Empty function constructor");
  ok(jUtils.isFunction(new Function("x", "y", "return x+y;")), "isFunction: Empty function constructor");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!jUtils.isFunction(invalidTests[i]));
  }
});

/**
 * jUtils.isUndefined tests.
 * @memberOf Tests
 */
test("isUndefined", function() {
  var invalidTests = [{}, {a: 1}, NaN, 1, -1, 0, true, false, [], [1,2,3], "str", function() { return 1; }],
      undef, i, len;
  ok(jUtils.isUndefined(undef), "isUndefined: Uninitialized variable");
  ok(jUtils.isUndefined(undefined), "isUndefined: Undefined pseudo-reserved word");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!jUtils.isUndefined(invalidTests[i]));
  }
});

/**
 * jUtils.isNumeric tests.
 * @memberOf Tests
 */
test("isNumeric", function() {
  var invalidTests = [{}, {a: 1}, NaN, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY , undefined, true, false, [], [1,2,3], "str", function() { return 1; }],
      i, len;
  ok(jUtils.isNumeric(-25), "isNumeric: Negative integer number");
  ok(jUtils.isNumeric(4), "isNumeric: Positive integer number");
  ok(jUtils.isNumeric(0), "isNumeric: Zero");
  ok(jUtils.isNumeric(-10.15), "isNumeric: Negative float number");
  ok(jUtils.isNumeric(1.15), "isNumeric: Positive float number");
  ok(jUtils.isNumeric(Number.MAX_VALUE), "isNumeric: Max number");
  ok(jUtils.isNumeric(Number.MIN_VALUE), "isNumeric: Min number");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!jUtils.isNumeric(invalidTests[i]));
  }
});

/* ================================ STRINGS ================================ */

/**
 * jUtils.format tests.
 * @memberOf Tests
 */
test("format", function() {
  var format1 = jUtils.format('a{0}c{1}e{2}g','b', 'd', 'f');
  ok(format1 === "abcdefg", "format: test with multiple arguments");
});

/**
 * jUtils.translate tests.
 * @memberOf Tests
 */
test("translate", function() {
  var translation1,
      translation2;
  ok(jUtils.translate("Not defined", "Italian") === undefined, "translate: text not previously defined");
  jUtils.translate("This is a translation test", "Spanish", "Esta es una prueba de traducción");
  translation1 = jUtils.translate("This is a translation test", "Spanish");
  ok(translation1 === "Esta es una prueba de traducción", "translate: successful translation");
});

/* ================================= ARRAYS ================================ */

/**
 * jUtils.firstIndex tests.
 * @memberOf Tests
 */
test("firstIndex", function() {
  var firstIndex = jUtils.firstIndex,
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

/**
 * jUtils.replace tests.
 * @memberOf Tests
 */
test("replace", function() {
  var replace = jUtils.replace,
      equalArrays = function(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
      },
      double = function(elem) {
        return 2*elem;
      },
      is2 = function(elem) {
        return elem === 2;
      },
      multiplyIndexAndLength = function(elem, index, array) {
        return index*(array.length);
      },
      length2 = function(elem) {
        return elem.length === 2;
      };

  ok(
    equalArrays(
      replace([1,2,3,4], double), 
      [2,4,6,8]
    ), "replace: No condition specified");
  ok(
    equalArrays(
      replace([1,2,3,4], double, is2), 
      [1,4,3,4]
    ), "replace: Condition and function element specified");
  ok(
    equalArrays(
      replace([1,2,3,4], multiplyIndexAndLength),
      [0,4,8,12]
    ), "replace: Condition and complex function element specified");
  ok(
    equalArrays(
      replace(['a', 'bb', 'ccc', 'dddd'], 'z', length2),
      ['a', 'z', 'ccc', 'dddd']
    ),"replace: Specific element given");
  ok(
    equalArrays(
      replace(['a', 'bb', [1, 2], 'dddd'], 'z', length2),
      ['a', 'z', 'z', 'dddd']
    ), "replace: Different types of elements in array");
  ok(
    equalArrays(
      replace([], 'z', length2), 
      []
    ), "replace: Empty array");
  ok(
    equalArrays(
      replace([], 'z'), 
      []
    ), "replace: Empty array");
});

/* ================================ OBJECTS ================================ */

/**
 * jUtils.propertyCount tests.
 * @memberOf Tests
 */
test("propertyCount", function() {
  var propertyCount = jUtils.propertyCount;
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

// =============================== MISCELANEOUS ===============================

/**
 * jUtils.setPrecision tests.
 * @memberOf Tests
 */
test("setPrecision", function() {
  ok(jUtils.setPrecision(1.16, 1) === 1.2, "setPrecision: Truncate 1 digit and round correctly");
  ok(jUtils.setPrecision(-1.16, 1) === -1.2, "setPrecision: Negative numbers");
  ok(jUtils.setPrecision(3.45, 2) === 3.45, "setPrecision: Exact amount of digits");
  ok(jUtils.setPrecision(4.1, 3) === 4.1, "setPrecision: Extra digits");
  ok(jUtils.setPrecision(123.4567, 3) === 123.457, "setPrecision: Bigger number with more digits");
  throws(function() {
    jUtils.setPrecision({}, 2);
  }, TypeError, "Invalid first parameter");
  throws(function() {
    jUtils.setPrecision(3, NaN);
  }, TypeError, "Invalid second parameter");
});