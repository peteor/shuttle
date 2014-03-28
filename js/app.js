// App module

// Attempting to namespace the app, and allow it to call a method on load to get the data from localstorage.
// Module pattern: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#designpatternsjavascript
// Augamented http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

var ShuttleApp = (function (my) {
   // What to do when the app is refocussed
   // Todo: this may need reworking.... 
    my.reFocus = function () {
        my.render.destinations();
    };
   // The module to return 
    my.init = function() {
      console.log("initialising...");
      Backbone.history.start();
      handleReFocus(my.reFocus); // set up what to do when tab gain focus
      new FastClick(document.body);
    };
  return my;
}(ShuttleApp || {}));

// Run the app 
$(function() {
  // Initialise app, get data
  ShuttleApp.init();
});

