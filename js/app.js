// App module

/*
var ShuttleApp = {
    arDestinations: []
};
*/


//   arDestinations: [royalView, tseunWanMTR]

// Run the app





// Attempting to namespace the app, and allow it to call a method on load to get the data from localstorage.
// Module pattern: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#designpatternsjavascript
// Augamented http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

var ShuttleApp = (function (my) {
    // A public function utilizing privates
    my.init = function() {
      console.log("initialising");
      handleReFocus(renderDestinations);
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

