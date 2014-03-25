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
    var arStopsFiltered = arStops.filter(isAfterTime);
    return arStopsFiltered;
}

/* 
    parseStopTimes
    stopTime = 13:00 
    converts a human readable time {12:22}  to a timestamp 
*/

function parseStopTime(stopTime) {
    try 
    {
     var arStopTime = stopTime.split(":");
    } 
    catch(err)
    {
        console.log(err)
        return false; 
    }
    var dStop = createStop(arStopTime[0], arStopTime[1]);
    return dStop.getTime();
}

/* 
    nextBusAt: returns the time of the next bus
*/
function nextBusAt(arStops) {
    var arNextStop = getNextStops(arStops);
    var nextBus = "";
    try 
    {
        nextBus = arNextStop[0].time;
        console.log(nextBus);
    } 
    catch (err)
    {
        nextBus = "";
    }
    return nextBus;
}


function upcomingTimes(arStops) {
    var arNextStop = getNextStops(arStops);
    var arNextBus = [];
    var nextTime = "";
    if (arNextStop.length == 0)
    {
        nextTime = ": No more busses today";
    } 
    else
    {
        try
        { 
            for (i = 0; i < arNextStop.length; i++) 
            {
                arNextBus.push(arNextStop[i].time);
            }
            nextTime = "<div class=\"horiz--scroll\"><ul class=\"nextbusses--grid\">";
            for (i = 0; i < arNextBus.length; i++)
            {
                nextTime += "<li class=\"nextbusses--grid--item\">" + arNextBus[i] + "</li>";
            }
            nextTime += "</ul></div>";
        } 
        catch (err)
        {
            console.log(err);
        }
    }
    return nextTime;
}