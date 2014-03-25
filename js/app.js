// App module

// Attempting to namespace the app, and allow it to call a method on load to get the data from localstorage.
// Module pattern: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#designpatternsjavascript
// Augamented http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

var ShuttleApp = (function (my) {
   // The mmodule to return 
    my.init = function() {
      console.log("initialising");
      handleReFocus(my.render.destinations);
      Backbone.history.start();
      new FastClick(document.body);
    }
  return my;
}(ShuttleApp || {}));



// Run the app 
$(function() {
  // Initialise app, get data
  ShuttleApp.init();
});

