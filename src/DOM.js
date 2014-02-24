// ============================= DOM MANIPULATION =============================

/* global JSUtils:true, document:false */

/**
 * IE 8+
 */
JSUtils.findInDOM = function(selector) {
  // TODO: Doc, test
  if (!JSUtils.isString(selector)) {
    throw new TypeError("The given selector must be a string");
  } else {
    return document.querySelectorAll(selector);
  }
};

/**
 * IE 8+
 */
JSUtils.addClassDOM = function(element, className) {
  // TODO: Doc, test, add type check
  if (element.classList) {
    element.classList.add(className);
  }else {
    element.className += " " + className;
  }
  return element;
};

/**
 * IE 8+
 */
JSUtils.afterDOM = function(element, htmlString) {
  // TODO: Doc, test, add type check
  // TODO: If htmlString is a DOM element, convert it to string
  element.insertAdjacentHTML('afterend', htmlString);
  return element;
};

//TODO: Add isHtmlNode, isTextNode