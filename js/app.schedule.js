/**
 * app.schedule
 * Handles  interaction with the app for schedule page
 * todo - deep dive this as I've just copied it from the pickup points...
 */

$("body").on( "blur", ".js-add-schedule", function() {

});


$("body").on( "change", ".js-add-schedule", function() {
  var scheduleToAdd = $(".js-add-schedule").val();
  console.log("Add schedule time value has changed" + scheduleToAdd);
  handleSchedule.submitSchedule(scheduleToAdd);
});

/** 
 * Add new schedule item
 * Re-validate
 * Save
 * Re-draw page
 */
$("body").on( "click", ".js-save-schedule", function() {
  var scheduleToAdd = $(".js-add-schedule").val();
  // Perform validation again to make sure
  if (!handleSchedule.validateSchedule(scheduleToAdd).passed)
  {
    console.log("Did not pass save validation");
    return false;
  }
  handleSchedule.renderSaveSchedule(scheduleToAdd);
  handleSchedule.saveStopTime(scheduleToAdd);
});


/** 
 * Delete a schedule time
 * Todo - abstract into method, 
 */

$("body").on( "click", ".js-delete-schedule-time", function() {
  console.log("Deleting schedule time");
  var arPickupPointId = Backbone.history.fragment.split("/").reverse();
  var pickupPointId = arPickupPointId[0];
  // Find which item in the list has been clicked
  var $foo = $( "li" );
  var $baz =  $(this).parents('.topcoat-list__item');
  var indexToRemove =  $foo.index($baz) - 1;
  // Delete from array
   ShuttleApp.pickupPoints[pickupPointId].stops.splice(indexToRemove, 1);
   // Re save the app data back to local storage
  localStorage.setItem("pickupPoints",JSON.stringify(ShuttleApp.pickupPoints));
  // Re-render 
  ShuttleApp.render.stop(pickupPointId);
});

$("body").on( "click", ".js-delete-pickup-point", function() {
  console.log("Deleting Pickup point");
  var arPickupPointId = Backbone.history.fragment.split("/").reverse();
  var pickupPointId = arPickupPointId[0];
  
   ShuttleApp.pickupPoints.splice(pickupPointId, 1);

   // Re save the app data back to local storage
  localStorage.setItem("pickupPoints",JSON.stringify(ShuttleApp.pickupPoints));
  // Back to destinations page 
  ShuttleApp.router.navigate('#/', {trigger: true});
 
});


var handleSchedule = {
   prevValue : "",
   resetForm : function (){
      $(".js-save-schedule").attr("disabled","true");
   },
   /* Submits point for validation/submission */
   submitSchedule : function (scheduleToAdd) {
      var validated = this.validateSchedule(scheduleToAdd);
      // If an object is returned we either have a pass or a fail here
      if (validated) {
      if (validated.passed) {
        this.renderPassesValidation();
      } else {
         this.renderFailsValidation(validated.msg);
      }
  }
   },

  /**
   * Validate schedule point
   * schedule point needs to be a string, not empty and not same as before
   */
   validateSchedule : function  (point) {
    // Prepare response
    var response = {
      passed : true,
      msg : ""
    };
     // If  nothing has been entered then go no further
    if ( point === "")
    {
       return false;
    }
    // Attempt to parse date

    var parsedTime = ShuttleApp.stop.parseStopTime(point);

    if (!parsedTime)
    {
      response.passed = false;
      response.msg = "Bad date supplied";
    }
    // Success
    return response;
   },
   /**
    * Add a new stop time to the schedule array and re save data. 
    * Create a stop object, then add it to the array of schedule itmes for the pickup point
    * Replace the old schedule array
    * Save points back to storage
    */
   saveStopTime: function (stopTime) {
    var newStopTime = {time : stopTime};
    // Get url fragment > turn to array > reverse it > greab last param
    var arPickupPointId = Backbone.history.fragment.split("/").reverse();
    var pickupPointId = arPickupPointId[0];
    // Add the stop the the schedule in the pickup point
    ShuttleApp.pickupPoints[pickupPointId].stops.push(newStopTime);
    console.log(ShuttleApp.pickupPoints[pickupPointId]);
    // Sort the stops by time
    ShuttleApp.pickupPoints[pickupPointId].stops = ShuttleApp.stop.sortByTime(ShuttleApp.pickupPoints[pickupPointId].stops);

    // Re save the app data back to local storage
    localStorage.setItem("pickupPoints",JSON.stringify(ShuttleApp.pickupPoints));

    // Re-render
    ShuttleApp.render.stop(pickupPointId);

    // console.log("Saving new stop: " + stopTime + "Fragment " +   pickupPointId);
    // Need to identify the correct array to update
    
    // 
   },
   /**
    * What to do if it fails validation
    */
   renderfailsValidation : function (msg) {
    console.log("You've failed validation" + msg);
   },
   /**
    * What to do if it passes validation
    */
   renderPassesValidation : function () {
    console.log("Passed Validation");
    $(".js-save-schedule").removeAttr("disabled");
   },
   /**
    * renderSaveschedule
    */
    renderSaveSchedule : function (schedule) {
       $(".js-save-schedule").text("Saving...");
      setTimeout(function(){
         // ShuttleApp.router.navigate('#/', {trigger: true});
      },1000);
    
    }
};
