var Router = Backbone.Router.extend({
  routes: {
    'stop/:id': 'getStop',
    'destination/add': 'addDestination',
    ''            : 'home'
  } ,
   initialize: function () {
       ShuttleApp.slider = new PageSlider($("#container"));
    }
});

ShuttleApp.router = new Router();

ShuttleApp.router.on('route:home', function () {
  console.log("home");
  // Do we have any destinations? 
  if (ShuttleApp.arDestinations.length < 1) {   
    console.log("New here ....");
    ShuttleApp.router.navigate('destination/add', {trigger: true});
    return true;
  } 
  ShuttleApp.render.destinations();
});


ShuttleApp.router.on('route:getStop', function (id) {
  console.log("Load stop: " + id);
  ShuttleApp.render.stop(id);
});

ShuttleApp.router.on('route:addDestination', function () {
  ShuttleApp.render.addDestination();
});

