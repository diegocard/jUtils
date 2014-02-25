// ============================= DOM MANIPULATION =============================

/* global JSUtils:true, document:false */

/**
 * IE 8+
 */
JSUtils.find = function(selector) {
  // TODO: Doc, test
  var selection = document.querySelectorAll(selector);
  if (!selection || !selection.length) {
    return null;
  } else if (selection.length === 1) {
    return selection[0];
  } else {
    return selection;
  }
};

/**
 * IE 8+
 */
JSUtils.addClass = function(element, className) {
  // TODO: Doc, test
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
JSUtils.after = function(element, htmlString) {
  // TODO: Doc, test
  // TODO: If htmlString is a DOM element, convert it to string
  element.insertAdjacentHTML('afterend', htmlString);
  return element;
};

/**
 * IE 8+
 */
JSUtils.appendChild = function(parent, element) {
  // TODO: Doc, test
  parent.appendChild(element);
  return element;
};

//TODO: Wrap results and give partial application to allow method chaining
//TODO: Add isHtmlNode, isTextNode