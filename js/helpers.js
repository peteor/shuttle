/** 
 * Helpers.js
 * Contains helpful methods that are to be used elsewhere in the project 
 */

/**
 * Validation - returns true if a number is within the required range
 */
function isInRange (input, lowerLimit,higherLimit) {
  return ((input >= lowerLimit) && (input <= higherLimit));
}

function isValidHour (input) {
  return (isInRange(input, 0, 23)); 
}

function isValidMinute (input) {
  return (isInRange(input, 0, 59)); 
}
