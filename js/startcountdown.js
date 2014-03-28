/**
 *  startCountdown
 *  Shows minutes/seconds to go from current time to the target time in  elements classed js-countdown
 *  requires http://countdownjs.org/
 *  Does it need this? Todo: rebuild with no library
 *  Todo - put in a module - figure out modular fix todos
 *  https://mindgrader.com/tutorials/1-how-to-create-a-simple-javascript-countdown-timer
 */

function StartCountdown(completeCallback) {
    /**
     * @count
     * Actually runs the counting process
     */
    this.count = function() {
        $(".js-countdown:contains(':')").each(function() {
            var $theCountdown = $(this);
            var arTimeToCountDownFrom = $theCountdown.html().split(":");
            var deadline = createStop(arTimeToCountDownFrom[0], arTimeToCountDownFrom[1]);
            var cnt = countdown(deadline, null, countdown.MINUTES | countdown.SECONDS);
            var cntToDisplay = formatCountdown(cnt);
            $theCountdown.html(cntToDisplay);
            // Update the coundown values every second
            setInterval(function() {
                var cnt = countdown(deadline, null, countdown.MINUTES | countdown.SECONDS);
                var cntToDisplay = formatCountdown(cnt);
                $theCountdown.html(cntToDisplay);
                // If we reach zero second then re-render the destinations page
                if (cnt.minutes < 1 && cnt.seconds == 0  ) {
                    console.log("Timer has hit zero");
                    completeCallback(); // todo: protect if cb not supplied
                }
            }, 1000);
        });
    }


    /**
     * @formatCountdown
     * Helper function
     *  Takes a timestamp object and returns string to display
     *  If more than one minute is left it displays in minutes, if not it displays seconds
     */
    formatCountdown = function(cnt) {
        var cntToDisplay = (cnt.minutes >= 1) ? cnt.minutes + " min" : cnt.seconds + " sec";
        return cntToDisplay
    }
}