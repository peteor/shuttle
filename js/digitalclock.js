// Module to show the time Todo - fix crappy module implementation

// http://javascript.info/tutorial/all-one-constructor-pattern

function DigitalClock (classHook){
  // private variables and functions
  function updateTime(classHook) {
    //console.log("running");
    //console.log("updateTime");
    var appTime = document.getElementsByClassName(classHook); // Todo - chage to id?
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var currentMin = currentTime.getMinutes();
    var minutes = (currentMin < 10) ? "0" + currentMin : currentMin;
    var formattedTime = hours + ":" + minutes;
    //console.log(formattedTime + " -" +appTime.length );
    for (var i = 0; i < appTime.length; i++) {
      appTime[i].innerText = formattedTime;
    }
  } 

  // Public functions
  this.showTime = function () {
    updateTime(classHook);
    window.setInterval(function() {
      updateTime(classHook);
    }, 1000);
  };
}


