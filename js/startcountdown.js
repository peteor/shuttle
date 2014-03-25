/**
 *  startCountdown
 *  Shows minutes/seconds to go from current time to the target time in  elements classed js-countdown
 *  requires http://countdownjs.org/
 *  Does it need this? Todo: rebuild with no library
 *  Todo - put in a module
 *  https://mindgrader.com/tutorials/1-how-to-create-a-simple-javascript-countdown-timer
 */

function startCountdown() {
    $(".js-countdown:contains(':')").each(function() {
        var $theCountdown = $(this);
        var arTimeToCountDownFrom = $theCountdown.html().split(":");
        var deadline = {};
        // Sometimes the element with the target time has not been rendered yet, so if it errors
        // then wait and try again. Todo: fix
        try {
            var deadline = createStop(arTimeToCountDownFrom[0], arTimeToCountDownFrom[1]);
        } catch (err) {
            setTimeout(function() {
                doCountDown
            }, 3000);
            return;
        }
        var cnt = countdown(deadline, null, countdown.MINUTES | countdown.SECONDS);
        var cntToDisplay = formatCountdown(cnt);
        $theCountdown.html(cntToDisplay);

        // Update the coundown values every second
        setInterval(function() {
            var cnt = countdown(deadline, null, countdown.MINUTES | countdown.SECONDS);
            var  cntToDisplay = formatCountdown(cnt);
            $theCountdown.html(cntToDisplay);
            // If we reach zero second then re-render the destinations page
            if (cnt.seconds == 0) {
                console.log("Re-rendering home page because timer hit zero");
                ShuttleApp.render.destinations(); // move to callback 
            }
        }, 1000);
    });
}

/*
    Takes a timestamp object and returns string to display
    If more than one minute is left it displays in minutes, if not it displays seconds
*/

function formatCountdown(cnt) {
    var cntToDisplay = (cnt.minutes >= 1) ? cnt.minutes + " min" : cnt.seconds + " sec";
    return cntToDisplay
}
