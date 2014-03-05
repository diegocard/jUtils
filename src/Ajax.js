// =================================== AJAX ===================================

/* global jUtils:true, XMLHttpRequest:false */

/*
 * RESTRICTION: IE8+
 */
jUtils.getJSON = function(url, success, error) {
  //TODO: Doc, test, add extra parameters
  var request = new XMLHttpRequest(),
      data;
  request.open('GET', url, true);

  request.onreadystatechange = function() {
    if (this.readyState === 4){
      if (this.status >= 200 && this.status < 400){
        data = JSON.parse(this.responseText);
        success(data);
      } else {
        error();
      }
    }
  };

  request.send();
  request = null;
  return jUtils;
};


/*
 * RESTRICTION: IE8+
 */
jUtils.ajaxPost = function(url, data) {
  // TODO: Doc, test, add extra parameters, check if success and error functions can be added as parameters
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.send(data);
  return jUtils;
};

/*
 * RESTRICTION: IE9+
 */
jUtils.ajaxGet = function(url, success, error) {
  // TODO: Doc, test
  var request = new XMLHttpRequest(),
      resp;
  request.open('GET', url, true);

  request.onreadystatechange = function() {
    if (this.readyState === 4){
      if (this.status >= 200 && this.status < 400){
        resp = this.responseText;
        success(resp);
      } else {
        error();
      }
    }
  };

  request.send();
  request = null;
};

// TODO: Check if method chaining works, add to other methods
// TODO: Combine getJSON, ajaxPost and ajaxGet into a single ajax function?
