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
 * JSUtils.isCommonObject tests.
 * @memberOf Tests
 */
test("isCommonObject", function() {
  var test1 = {},
      test2 = {a: 1, b: {c: 2}},
      test3 = {a: 1, b: function() {
        return 1;
      }},
      invalidTests = [NaN, 1, "str", undefined, [], [1,2,3], function() { return 1; }],
      i, len;
  ok(JSUtils.isCommonObject(test1), "isCommonObject: empty object");
  ok(JSUtils.isCommonObject(test2), "isCommonObject: nested objects");
  ok(JSUtils.isCommonObject(test3), "isCommonObject: includes a function");
  ok(JSUtils.isCommonObject(test3), "isCommonObject: empty array");
  ok(JSUtils.isCommonObject(test3), "isCommonObject: array with elements");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!JSUtils.isCommonObject(invalidTests[i]));
  }
});

/**
 * JSUtils.isBoolean tests.
 * @memberOf Tests
 */
test("isBoolean", function() {
  var invalidTests = [{}, {a: 1}, NaN, 1, -1, 0, "str", undefined, [], [1,2,3], function() { return 1; }],
      i, len;
  ok(JSUtils.isBoolean(true), "isCommonObject: true");
  ok(JSUtils.isBoolean(false), "isCommonObject: false");
  for (i=0, len=invalidTests.length; i<len; i++) {
    ok(!JSUtils.isBoolean(invalidTests[i]));
  }
});


/* ================================= COMMON ================================ */



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