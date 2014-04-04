

var ShuttleApp = (function (my) {

  my.clearData = function () {
    localStorage.removeItem("pickupPoints");
    window.location.reload();
  };


  var getPickupPoints = function () {

    var storedPickupPoints = localStorage.getItem("pickupPoints");
    console.log(storedPickupPoints);
  
    if (storedPickupPoints)
    {
      // console.log("Found pickup points in local storage");
      // console.log(localStorage.getItem("pickupPoints"));
      pickupPoints = JSON.parse(localStorage["pickupPoints"]); // array of objects
    }
    else
    {
      // No points in local storage - lets set some up
      // defaultPickupPoints = [royalView, tseunWanMTR]; // royalView, tseunWanMTR
      // localStorage.setItem("pickupPoints", JSON.stringify(defaultPickupPoints));
      // console.log("Seting default pickup points");
       pickupPoints =[];
    }
    // var dest =  [royalView, tseunWanMTR];
    return pickupPoints;
  };

  /** 
   * Save a pickup point to local storage
   */

   my.addPickupPoint = function (nameOfPoint) {
    console.log("Adding a new pickup point: " + nameOfPoint);
    // Creata a new point object
    var newPoint = {
      name: nameOfPoint,
      stops: []
    };
    // Add it to the array of points
    my.pickupPoints.push(newPoint);
    localStorage.setItem("pickupPoints",JSON.stringify(my.pickupPoints));
    // save to local storage
  };

 /** 
  * Delete a pickup point
  */
  var deletePickupPoint = function (id) {
    console.log("Attempting to delete ID:" + id);

    // my.pickupPoints

    // save to local storage
  };

  my.pickupPoints = getPickupPoints();

 return my;

}(ShuttleApp || {}));
