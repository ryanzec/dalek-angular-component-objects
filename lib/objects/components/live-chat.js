/********************************/
/********* EXAMPLE FILE *********/
/********************************/

var BaseComponent = require('../base-component');

var LiveChatComponent = BaseComponent.extend({
  initialize: function(test, baseSelector) {
    this.baseSelector = baseSelector; 
    this.selectors = {
      liveChat: '.live-chat',
    };

    BaseComponent.initialize.call(this, test);
  },

  clickLiveChat: function() {
    this.test.click(this.getSelector('liveChat'));
    this.waitForAngular();
  },
});

module.exports = LiveChatComponent;