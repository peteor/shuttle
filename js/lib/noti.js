/**
  * Noti
  * Module to show notifications to users
  */

var Noti = {
  /*
    Notification object 
    {
      type:"default",
      text: "This is a default notification",
    }
  */
  oNoti : {},
    /**
     * setNoti
     * @param {object} obj an object containing the text for the alert, and it's type
     */
    setNoti : function (obj) {
      console.log("setNoti called");
      this.oNoti = obj;
    },
    /**
     * renderNoti 
     * Renders a notification to page
     */
    renderNoti : function () {
      console.log("Rendering notification");
      // underscore template
        var template = $("#noti-template").html();
        $(".app--body").prepend(_.template(template, this.oNoti));
        $(".notification").fadeIn();
    },
    /**
     * clearNoti
     * Clears a notification
     */
    clearNoti : function () {
      this.oNoti = {};
    },
    /**
     * runNoti
     * If a notification is present then display and clear data. 
     */
    runNoti : function () {
      console.log("Run Noti called");
      console.log(this.oNoti);
      if (this.oNoti.text !== undefined && this.oNoti.type !== undefined)
      {
        this.renderNoti();
        this.clearNoti();
      }
  
    }
};


// Tests 


/*
Noti.runNoti();
console.log("---------------------------");
console.log("Clearing Notifications, expect empty object");
Noti.clearNoti();
console.log(Noti.oNoti.text);
Noti.runNoti();
console.log("---------------------------");
*/

