/********************************/
/********* EXAMPLE FILE *********/
/********************************/

var HomePage = require('./lib/objects/pages/home');

module.exports = {
  name: 'live chat component',

  'should open new window when live chat is clicked': function(test) {
    var homePage = HomePage.new(test);
    var liveChatComponent = homePage.getLiveChatComponent();
    
    liveChatComponent.clickLiveChat();
    
    homePage.liveChatWindowOpened();
    
    homePage.done();
  }
};