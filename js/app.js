/*
*/

// Create app data

var tseunWanMTRStops = [
    {time: "07:10"},
    {time: "07:30"},
    {time: "07:50"},
    {time: "08:10"},
    {time: "08:25"},
    {time: "08:40"},
    {time: "08:55"},
    {time: "09:10"},
    {time: "09:25"},
    {time: "09:55"},
    {time: "10:25"},
    {time: "10:55"},
    {time: "11:25"},
    {time: "11:55"},
    {time: "12:10"},
    {time: "12:40"},
    {time: "13:10"},
    {time: "13:25"},
    {time: "13:40"},
    {time: "13:55"},
    {time: "14:10"},
    {time: "14:25"},
    {time: "14:55"},
    {time: "15:25"},
    {time: "15:55"},
    {time: "16:25"},
    {time: "16:55"},
    {time: "17:10"},
    {time: "17:40"},
    {time: "18:10"},
    {time: "18:30"},
    {time: "18:50"},
    {time: "19:10"},
    {time: "19:30"},
    {time: "19:50"},
    {time: "20:10"},
    {time: "20:25"},
    {time: "20:40"},
    {time: "20:55"},
    {time: "21:10"},
    {time: "21:25"},
    {time: "21:40"},
    {time: "22:10"},
    {time: "22:35"},
    {time: "22:40"}
  ];

var royalViewStops = [
    {time: "07:00"},
    {time: "07:20"},
    {time: "07:40"},
    {time: "08:00"},
    {time: "08:15"},
    {time: "08:30"},
    {time: "08:45"},
    {time: "09:00"},
    {time: "09:15"},
    {time: "10:15"},
    {time: "10:45"},
    {time: "11:15"},
    {time: "11:45"},
    {time: "12:00"},
    {time: "12:30"},
    {time: "13:00"},
    {time: "13:15"},
    {time: "13:30"},
    {time: "13:45"},
    {time: "14:00"},
    {time: "14:15"},
    {time: "14:45"},
    {time: "16:15"},
    {time: "16:40"},
    {time: "17:00"},
    {time: "17:30"},
    {time: "18:00"},
    {time: "18:20"},
    {time: "18:40"},
    {time: "19:00"},
    {time: "19:20"},
    {time: "19:40"},
    {time: "20:00"},
    {time: "20:15"},
    {time: "20:30"},
    {time: "20:45"},
    {time: "21:00"},
    {time: "21:15"},
    {time: "21:30"},
    {time: "22:00"},
    {time: "22:30"},
  ];

var tseunWanMTR = {
    name: "Tseun Wan MTR",
    route: "tsuen-wan-mtr",
    stops: tseunWanMTRStops
    };

var royalView = {
    name: "Royal View Hotel",
    route: "royal-view",
    stops: royalViewStops
    };

// Populate app data structure

var arDestinations = [tseunWanMTR, royalView];


// loop through the stops and find  the next one
// put all stops into an array 



/*
  isAfterTime
  filter function which compares the time of the current stop to the current date
*/

function isAfterTime(element, index, array) {
    var date = new Date();
    var milliseconds = date.getTime();
    return parseStopTime(element.time) > milliseconds;
}

/*
  getNextStops
  filters the array of stop objects to find ones after the current time
*/

function getNextStops(arStops) {
    var arStopsFiltered =  arStops.filter(isAfterTime);
    return arStopsFiltered;
}

/* 
    parseStopTimes: converts a stop time to timestamp 
*/

function parseStopTime(stopTime) {
    var arStopTime = stopTime.split(":");
    var dStop   = createStop(arStopTime[0],arStopTime[1]);
    // console.log("parseStopTime: " + dStop.getTime());
    return dStop.getTime();
}

// Run the app

$(function () {
    var oCurrentDestination = arDestinations[0];
    var arCurrentStops = oCurrentDestination["stops"];
    arCurrentStops =  getNextStops(arCurrentStops); // This gets the stops that are after now.

    var stopsTemplate = $("#stop-template").html();
    var destinationsTemplate = $("#destination-template").html();

    $("#stop-container").html(_.template(stopsTemplate, {arCurrentStops:arCurrentStops}));   
    $("#destination-container").html(_.template(destinationsTemplate, {arDestinations:arDestinations}));

    // bunging everything on page so app is usable quickly

    // Royal View stop
     $("#rv-stop-container").html(_.template(stopsTemplate, {arCurrentStops:  getNextStops(royalViewStops)}));

});