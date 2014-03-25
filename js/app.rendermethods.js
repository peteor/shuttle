/**
 * These methods handle drawing the pages of the app
 */
 
function renderDestinations() {
    console.log("Rendering destinations");
    renderView("#destination-template", {
        arDestinations: ShuttleApp.arDestinations
    },startCountdown);
    ShowTheTime("js-time");
}

function renderAddDestination() {
    console.log("Rendering add destination");
    renderView("#add-destination-template",{});
}


function renderStop(id) {
    console.log("rendering stop");
    // Prepare data
    var nextStops = ShuttleApp.arDestinations[id].stops;
    var stopName = ShuttleApp.arDestinations[id].name;
    // Render
    renderView("#stop-template", {
        arCurrentStops: nextStops,
        stopName: stopName
    });
}

function renderView(templateId, data, callback) {
    $div = $('<div></div>');
    $("body").append($div);
    var template = $(templateId).html();
    $div.html(_.template(template, data));
    ShuttleApp.slider.slidePage($div);
    if(typeof callback !== 'undefined'){
     callback();
   };
}