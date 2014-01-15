/* ================================== MAIN ================================= */

/**
 * JSUtils.getGlobal and JSUtils.isGLobal tests.
 * @memberOf Tests
 */
test("getGlobal and isGLobal", function() {
  ok(JSUtils.isGlobal(JSUtils.getGlobal()), "getGlobal and isGlobal: working together");
});

/**
 * JSUtils.storeVariable and JSUtils.getVatiable tests.
 * @memberOf Tests
 */
test("storeVariable and getVariable", function() {
  var obj1 = {};
  throws(JSUtils.storeVariable(), TypeError, "storeVariable: No name specified");
  throws(JSUtils.getVariable(), TypeError, "getVariable: No name specified");
  // TODO: Continue
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


/* ================================= COMMON ================================ */

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