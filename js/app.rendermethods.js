/**
 * These methods handle drawing the pages of the app
 */

var ShuttleApp = (function(my) {
    // The module to return 

    my.render = {};

    /**
     * @destinations
     *
     */
    my.render.destinations = function() {
        console.log("Rendering destinations");
        my.render.view("#destination-template", {
            arDestinations: my.arDestinations
        }, startCountdown);
        ShowTheTime("js-time");
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
        var nextStops = my.arDestinations[id].stops;
        var stopName = my.arDestinations[id].name;
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