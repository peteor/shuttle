/**
 * app.pickUpPoints
 * Handle interaction with the app
 */

// Event Handlers

$("body").on( "focus", ".js-add-pickup-point", function() {
  console.log("Add destination has gained focus" + $(".js-add-pickup-point").val());
  handlePickUpPoint.prevValue =  $(".js-add-pickup-point").val();
  handlePickUpPoint.resetForm();
});

// If enter is pressed then submit
$("body").on( "keypress", ".js-add-pickup-point", function(e) {
   var pointToAdd = $(".js-add-pickup-point").val();
    if(e.which == 13) {

        $(".js-add-pickup-point").blur();
        /*
        var validationResponse = handlePickUpPoint.validatePickupPoint(pointToAdd);

        if (validationResponse)
        {
         if (validationResponse.passed === true)
         {
            ShuttleApp.addPickupPoint(pointToAdd);
            handlePickUpPoint.renderSavePickup();
         }
         else
         {
          handlePickUpPoint.failsValidation(validationResponse.msg);

         }
       }
       */
    }
});

$("body").on( "blur", ".js-add-pickup-point", function() {
  console.log("Add destination has lost focus" + $(".js-add-pickup-point").val());
  handlePickUpPoint.submitPoint();
});

$("body").on( "click", ".js-save-pickup", function() {
  var pointToAdd = $(".js-add-pickup-point").val();
  ShuttleApp.addPickupPoint(pointToAdd);
  handlePickUpPoint.renderSavePickup();
});

// Methods called by Handlers

// Pickup point handling 
var handlePickUpPoint = {
   prevValue : "",
   addPickupPoint : function (pointToAdd) {
    console.log("Add: " + pointToAdd);
   },
   resetForm : function (){
      $(".js-save-pickup").attr("disabled","true");
   },
   /* Submits point for validation/submission */
   submitPoint : function () {
    var pointToAdd = $(".js-add-pickup-point").val();
    var validated = this.validatePickupPoint(pointToAdd);
  // If an object is returned we either have a pass or a fail here
       if (validated) {
      // console.log(validated); // log it
      if (validated.passed) {
        this.passesValidation();
      } else {
         this.failsValidation(validated.msg);
      }
  }
   },

  /**
   * Validate pickup point
   * Pickup point needs to be a string, not empty and not same as before
   */
   validatePickupPoint : function  (point) {
    // Prepare response
    var response = {
      passed : true,
      msg : ""
    };
     // If  nothing has been entered then go no further
    if ( point === "")
    {
       // console.log(this.prevValue + " - old | new : " + point );
       // console.log("Same point as before!");
       return false;
    }
    // Success
    return response;
   },
   /**
    * What to do if it fails validation
    */
   failsValidation : function (msg) {
    console.log("You've failed validation" + msg);
   },
   /**
    * What to do if it passes validation
    */
   passesValidation : function () {
    console.log("Passed Validation");
    $(".js-save-pickup").removeAttr("disabled");
   },
   /**
    * renderSavePickup
    */
    renderSavePickup : function (pointName) {
       $(".js-save-pickup").text("Saving...");
      setTimeout(function(){
          ShuttleApp.router.navigate('#/', {trigger: true});
      },1000);
    
    }
};