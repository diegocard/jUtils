/**
 * jUtils main object
 * @module jUtils
 */
(function (global) {
  "use strict";

  // Private variables
  var $ = {},
      internal = {
        global: global,
      };

  // Check that jUtils is not already defined.
  if (global.jUtils) {
    return;
  }