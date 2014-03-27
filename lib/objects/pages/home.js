/********************************/
/********* EXAMPLE FILE *********/
/********************************/

var BasePageObject = require('../base-page-object');
var LiveChatComponent = require('../components/live-chat');

var HomePage = BasePageObject.extend({
  initialize: function(test, urlAppend) {
    this.baseUrl = '/home?uiTestingMode=true';
        
    BasePageObject.initialize.call(this, test, urlAppend);
  },
  
  getLiveChatComponent: function() {
    return LiveChatComponent.new(this.test, '.page > header .support');
  },
    
  liveChatWindowOpened: function() {
    this.test.toWindow('live-chat-window');
    this.test.assert.url().to.match(/livechat\.example\.com/, 'live chat window opened')
    this.test.toParentWindow();
  },
});

module.exports = HomePage;