// ============================= DOM MANIPULATION =============================

/* global JSUtils:true, XMLHttpRequest:false */

/*
 * RESTRICTION: IE9+
 */
JSUtils.getJSON = function(url, success, error) {
  // TODO: Doc, test, add extra parameters
  var request = new XMLHttpRequest(),
      data;
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success
      data = JSON.parse(request.responseText);
      success(data);
    } else {
      // We reached our target server, but it returned an error
      error();
    }
  };

  request.onerror = function() {
    error();
  };

  request.send();
  return JSUtils;
};


/*
 * RESTRICTION: IE8+
 */
JSUtils.ajaxPost = function(url, data) {
  // TODO: Doc, test, add extra parameters, check if success and error functions can be added as parameters
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.send(data);
  return JSUtils;
};


// TODO: Check if method chaining works, add to other methods
// TODO: Combine getJSON, ajaxPost and ajaxGet into a single ajax function?
// TODO: Create a full element selector engine?