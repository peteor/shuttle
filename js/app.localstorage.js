// check if ls supported
// is there an app data key in ls?
  // If not create empty one
    // render add destination screen
    // after destination added render add stop screen

// if so load it and use it to populate an array of destinations

var ShuttleApp = (function (my) {
  var getDestinations = function () {
    var dest =  [royalView, tseunWanMTR];
    return dest;
  };
  my.arDestinations = getDestinations();
 return my;
}(ShuttleApp || {}));
