// ============================= DOM MANIPULATION =============================

/* global JSUtils:true, XMLHttpRequest:false */

JSUtils.getJSON = function(url, success, error) {
  // TODO: Doc, test, add extra parameters
  var request, data;
  request = new XMLHttpRequest();
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
};