/**
 * These methods handle drawing the pages of the app
 */

var ShuttleApp = (function(my) {
    // The module to return 
    my.render = {};

    /**
     * @destinations
     * Render the destinations page, and show the time on it. 
     */
    my.render.destinations = function() {
        // Hacky....
        // Only draw this page if we are currently on the homepage
        if (Backbone.history.fragment !== "") {
            return false;
        }

        console.log("Rendering destinations");
        my.render.view("#destination-template", {
            arDestinations: my.pickupPoints
        },runTimers);
        
        /* Helper function to make sure both timers are rendered after the destination page */
         function runTimers() {
            var digClock = new DigitalClock("js-time");
            digClock.showTime();
            var theCount = new StartCountdown(my.render.destinations);
            theCount.count();
         }
    };

    /**
     * @addDestination
     *
     */
    my.render.addDestination = function() {
        console.log("Rendering add destination");
        my.render.view("#add-destination-template", {});
    };

    /**
     * @stop
     *
     */
    my.render.stop = function(id) {
        console.log("rendering stop");
        // Prepare data
        var nextStops = my.pickupPoints[id].stops;
        var stopName = my.pickupPoints[id].name;
        // Render
        my.render.view("#stop-template", {
            arCurrentStops: nextStops,
            stopName: stopName
        });
    };

    /**
     * @view
     *
     */
    my.render.view = function(templateId, data, callback) {
        $div = $('<div></div>');
        $("body").append($div);
        var template = $(templateId).html();
        $div.html(_.template(template, data));
        my.slider.slidePage($div);
        if (typeof callback !== 'undefined') {
            callback();
        };
    };

    return my;
}(ShuttleApp || {}));