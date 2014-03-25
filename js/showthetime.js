// Module to show the time

/*
  ShowTheTime
  Main function
*/

var ShowTheTime = function (classNameToUpdate) {
  console.log("Showing time");
  window.setInterval(ShowTheTime.updateTime(classNameToUpdate), 1000);
};

/*
  ShowTheTime.updateTime  
  Updates the current time
*/

ShowTheTime.updateTime = function (classNameToUpdate) {
  var appTime = document.getElementsByClassName(classNameToUpdate); // Todo - chage to id?
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var currentMin = currentTime.getMinutes();
  var minutes = (currentMin < 10) ? "0" + currentMin : currentMin;
  var formattedTime = hours + ":" + minutes; 
  console.log(formattedTime + appTime.length );
  for (var i =0; i < appTime.length; i++)
  {
    appTime[i].innerText = formattedTime;
  }
};