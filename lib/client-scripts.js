module.exports = {
  angular: function() {
    var element = document.querySelector('html');
    var done = false;

    var callback = function(e) {
      done = true;
    };

    try {
      angular.element(element).injector().get('$browser').notifyWhenNoOutstandingRequests(callback);
    } catch (e) {
      callback(e);
    }

    return done;
  }
};