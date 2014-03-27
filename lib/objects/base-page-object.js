require('string-format-js');
var BaseComponent = require('./base-component');

var BasePageObject = BaseComponent.extend({
  initialize: function(test, urlAppend, angularSupportEnabled) {
    BaseComponent.initialize.call(this, test, angularSupportEnabled);
    this.open(urlAppend);
  },

  open: function(append) {
    var url = append ? this.baseUrl + '&' + append : this.baseUrl;
    this.test.open(url);
    this.waitForAngular();
  }
});

module.exports = BasePageObject;