// ============================= DOM MANIPULATION =============================

/* global JSUtils:true, document:false */

JSUtils.findInDOM = function(selector) {
  // TODO: Doc, test
  if (!JSUtils.isString(selector)) {
    throw new TypeError("The given selector must be a string");
  } else {
    return document.querySelectorAll(selector);
  }
};

JSUtils.addClass = function(element, className) {
  // TODO: Doc, test, add type check
  if (element.classList) {
    element.classList.add(className);
  }else {
    element.className += " " + className;
  }
  return element;
};

//TODO: Add isHtmlNode, isTextNode