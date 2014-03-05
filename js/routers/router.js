var Router = Backbone.Router.extend({
  routes: {
    'stop/:id': 'getStop',
    ''            : 'home'
  } 
});

var router = new Router();

router.on('route:home', function () {
  console.log("home");
  renderDestinations();
});


router.on('route:getStop', function (id) {
  console.log("Load stop: " + id);
  renderStop(id);
});





