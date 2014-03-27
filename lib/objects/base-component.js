var scripts = require('../client-scripts');
var selfish = require('selfish').Base;
var _ = require('lodash');

var BaseComponent = selfish.extend({
  initialize: function(test, angularSupportEnabled) {
    this.angularSupportEnabled = _.isBoolean(angularSupportEnabled) ? angularSupportEnabled : false;
    this.test = test;
    this.baseSelector = this.baseSelector || '';
    this.selectors = this.selectors || {};
  },

  waitForAngular: function() {
    //this configuration allow this base system to be used with non-angular applications
    if(this.angularSupportEnabled === true) {
      this.test.waitFor(scripts.angular);
    }
  },

  sendKeysToPage: function(keys) {
    this.test.sendKeys('body', keys);
    this.waitForAngular();
  },

  clickBody: function() {
    this.test.click('body');
  },

  getSelector: function(name, withBase) {
    withBase = _.isBoolean(withBase) ? withBase : true;
    var selector = '';

    if(name && this.selectors[name]) {
      selector = this.selectors[name];
    }

    if(withBase && this.baseSelector) {
      selector = this.baseSelector + ' ' + selector;
    }

    return selector;
  },

  done: function() {
    this.test.done();
  }
});

module.exports = BaseComponent;