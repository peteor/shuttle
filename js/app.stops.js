/**
 * ShuttleApp.stops
 * Methods relating to stop data handling/manipulation here
 */

var ShuttleApp = (function (my) {
   
   my.stop = {};

   /**
    * isAfterTime
    * filter function which compares the time of the current stop to the current date
    */
   my.stop.isAfterTime = function (element, index, array) {
    var date = new Date();
    var milliseconds = date.getTime();
    return my.stop.parseStopTime(element.time) > milliseconds;
    };

   /**
    * getNextStops
    * filters the array of stop objects using isAfterTime to find ones after the current time
    */
   my.stop.getNextStops = function(arStops) {
    var arStopsFiltered = arStops.filter(my.stop.isAfterTime);
    return arStopsFiltered;
   };

   my.stop.sortByTime = function(arStops) {
    var arSortedStopTimes = _.sortBy(arStops, function(o) { return o.time; });
    console.log("sorted");
    console.log(arSortedStopTimes);
    return arSortedStopTimes;
   };

   /**
    * parseStopTimes
    * stopTime = 13:00 
    * converts a human readable time {12:22}  to a timestamp 
    */
    
    my.stop.parseStopTime = function (stopTime) {
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
    };

    /** 
     *   nextBusAt: returns the time of the next bus
     */
     my.stop.nextBusAt = function(arStops) {
        var arNextStop = my.stop.getNextStops(arStops);
        var nextBus = (arNextStop.length >= 1 ) ? arNextStop[0].time : "";
        return nextBus;
    };

    /** 
     *   @upcomingTimes
     */
    my.stop.upcomingTimes = function (arStops) {
    var arNextStop = my.stop.getNextStops(arStops);
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
  return my;
}(ShuttleApp || {}));


