var Router = Backbone.Router.extend({
  routes: {
    'stops/:id'   : 'getStop',
    'stops'       : 'getAllStops',
    'location/:id': 'getLocation',
    ''            : 'home'
  } 
});

var router = new Router();

router.on('route:home', function () {
  console.log("home");
});

router.on('route:getLocation', function (id) {
  console.log("get locaiton");
});

router.on('route:getAllStops', function () {
 console.log("get all stops");
});

router.on('route:getStop', function (id) {
  console.log("get stop");
});



Backbone.history.start();

