
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
    parseStopTimes: converts a stop time to timestamp 
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



// App module

var shuttleApp = {
    arDestinations: [royalView, tseunWanMTR]
};


// handle rendering of HTML

function renderDestinations() {
    console.log("Rendering destinations");
    renderView("#destination-template", {
        arDestinations: shuttleApp.arDestinations
    },doCountDown);
    // Handle countdown
     function doCountDown () { 
        $(".js-countdown:contains(':')").each(function() {
        var $theCountdown = $(this);
        var arTimeToCountDownFrom = $theCountdown.html().split(":");
        // hacky hack
        try
        {
            var deadline = createStop(arTimeToCountDownFrom[0], arTimeToCountDownFrom[1]);
        } 
        catch (err)
        {
            setTimeout(function(){doCountDown},3000);
            return;
        }
        var cnt = countdown(deadline, null, countdown.MINUTES | countdown.SECONDS);

        if (cnt.minutes >= 1)
        {
            var cntToDisplay = cnt.minutes + " min";
        }
        else
        {
            var cntToDisplay = cnt.seconds + " sec";
        }

        $theCountdown.html(cntToDisplay);
        setInterval(function() {
      
            var cnt = countdown(deadline, null, countdown.MINUTES | countdown.SECONDS);
            if (cnt.minutes >= 1) {
                var cntToDisplay = cnt.minutes + " min";
            } else {
                var cntToDisplay = cnt.seconds + " sec";
                // hack to refresh app
                if (cnt.seconds == 0) {
                    console.log("re-rendering home page");
                    shouldrefresh = true; 
                    renderDestinations();
                }
            }

            $theCountdown.html(cntToDisplay);
        }, 1000);
    });
    }
}

function renderView(templateId, data, callback) {
    $div = $('<div></div>');
    $("body").append($div);
    var template = $(templateId).html();
    $div.html(_.template(template, data));
    shuttleApp.slider.slidePage($div);
    if(typeof callback !== 'undefined'){
     callback();
   };
}

function renderStop(id) {
    console.log("rendering stop");
    // Prepare data
    var nextStops = shuttleApp.arDestinations[id].stops;
    var stopName = shuttleApp.arDestinations[id].name;
    // Render
    renderView("#stop-template", {
        arCurrentStops: nextStops,
        stopName: stopName
    });
    // var myScroll = new IScroll('.app--body__scroll');
}


// Time methods

function initTime() {
    updateTime();
    window.setInterval(updateTime, 1000);
}


function updateTime() {
    var appTime = document.getElementsByClassName("js-time");
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var currentMin = currentTime.getMinutes();
    var minutes = (currentMin < 10) ? "0" + currentMin : currentMin;
    appTime[0].innerText = hours + " : " + minutes;
}

// Visibility toggle 

function getHiddenProp(){
    var prefixes = ['webkit','moz','ms','o'];
    
    // if 'hidden' is natively supported just return it
    if ('hidden' in document) return 'hidden';
    
    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++){
        if ((prefixes[i] + 'Hidden') in document) 
            return prefixes[i] + 'Hidden';
    }

    // otherwise it's not supported
    return null;
}
// use the property name to generate the prefixed event name
var visProp = getHiddenProp();
if (visProp) {
  var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
  document.addEventListener(evtname, visChange);
}

function isHidden() {
    var prop = getHiddenProp();
    if (!prop) return false;
    
    return document[prop];
}

function visChange() {

      if (!isHidden())
      {
        renderDestinations();
        initTime();
      }
}

////////////////////////////////////////////////////

// Run the app

if (window.applicationCache) {
    applicationCache.addEventListener('updateready', function() {
        if (confirm('An update is available. Reload now?')) {
            window.location.reload();
        }
    });
}


$(function() {
    Backbone.history.start();
    new FastClick(document.body);
    initTime();
});


