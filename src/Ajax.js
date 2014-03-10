// =================================== AJAX ===================================

/* global jUtils:true, XMLHttpRequest:false */

(function($) {
  
  /*
   * RESTRICTION: IE8+
   */
  $.getJSON = function(url, success, error) {
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
    return $;
  };


  /*
   * RESTRICTION: IE8+
   */
  $.ajaxPost = function(url, data) {
    // TODO: Doc, test, add extra parameters, check if success and error functions can be added as parameters
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.send(data);
    return $;
  };

  /*
   * RESTRICTION: IE9+
   */
  $.ajaxGet = function(url, success, error) {
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

}(jUtils));

// TODO: Check if method chaining works, add to other methods
// TODO: Combine getJSON, ajaxPost and ajaxGet into a single ajax function?
