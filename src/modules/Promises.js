// ================================== PROMISES ================================

/* global $:true */

$.when = function() {
  // Cached so the syntax of code within the function is more readable
  var self = this;

  // Return new instance of itself
  if (!(this instanceof $.when)) {
    return new $.when(arguments);
  }

  // Convert arguments passed in to array
  self.pending = Array.prototype.slice.call(arguments[0]);
  // Cache length of the arguments array
  self.pending_length = self.pending.length;
  // Container for results of async functions
  self.results = {
    length: 0
  };

  (function() {
    // Define pass() within this context so that the outer scope of self(this) is available when pass() is executed within the user's async functions
    self.pass = function() {

      // self.results.push(arguments); //push async results to cache array
      self.results[arguments[0]] = arguments[1];
      self.results.length += 1;

      // If all async functions have finished, pass the results to .then(), which has been redefined to the user's completion function
      if (self.results.length === self.pending_length) {
        self.then.call(self, self.results);
      }
    };
  })();
};

$.when.prototype = {
  then: function() {

    // Reassign .then() to the user-defined function that is executed on completion. Also ensures that this() can only be called once per usage of when()
    this.then = arguments[0];

    while (this.pending[0]) {
      // Execute all functions user passed into when()
      this.pending.shift().call(this, this.pass);
    }

  }
};