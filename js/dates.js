/** 
 * Dates.js
 * Handles creating and manipulating stops
 */

/**
 * Returns a date object when passed an hour and minute; 
 */
function createStop(hours, minutes) {

  var stop = new Date();

  //console.log("Hours passed: " + hours);
  //console.log("Minutes passed:" + minutes);

  if (!isValidHour(hours)) {
    throw ("Hour needs to be between 0 and 23: " + hours + " supplied");
  }
  if (!isValidMinute(minutes)) {
    throw ("Minute needs to be between 0 and 60: " + minutes + " supplied");
  }

  // All is good
  stop.setHours(hours, minutes, 0);
  //console.log("Date created: " + stop.toString());
  return stop;
}