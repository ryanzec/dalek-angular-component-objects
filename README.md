**Since I no longer use either DalekJS or AngularJS, I am no longer maintaining this project.  I recommend using ReactJS as a front library (https://github.com/facebook/react) and WebdriverIO (https://github.com/webdriverio/webdriverio/) as a browser runner for UI testing.**

# DalekJS/AngularJS Page/Component Object System

Core system is are this following files:

- dalek/lib/client-scripts.js
- dalek/lib/type-helper.js
- dalek/lib/objects/base-component.js
- dalek/lib/objects/base-page-object.js

Other files are provided as examples

It is recommended that if you need to add core functionality to BaseComponent or BasePageObject that you extend those class instead of directly modifying so that it will be easy to update those core system files if needed.

This basic documentation is pulled from my coding standard at : https://github.com/ryanzec/coding-standards

# Basic Documentation

The test files should never directly call any actions or assertions on the test object itself.  All interactions with the test object should be done through the use of a page or component object.  If you need a starting point for building page and component objects with DalekJS, use/look at this project:

https://github.com/ryanzec/dalek-angular-component-objects

So lets take a look at what a regular test file might look like for an application that uses angular:

```javascript
//file: /dalek/live-chat.js
var scripts = require('../client-scripts');

module.exports = {
  name: 'live chat component',

  'should open new window when live chat is clicked': function(test) {
    test.open('/home?uiTestingMode=true')
    .waitFor(scripts.angular);
    .click('.page > header .support .live-chat')
    .waitFor(scripts.angular);
    .toWindow('live-chat-window')
    .assert.url().to.match(/livechat\.example\.com/, 'live chat window opened')
    .toParentWindow()
    .done();
  }
};
```

Now lets rewrite this test with this base system:

```javascript
//file: /dalek/lib/objects/components/live-chat.js
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


//file: /dalek/lib/objects/pages/home.js
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


//file: /dalek/live-chat.js
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
```

When looking at the just the test, the biggest advantage that can be seen is it is a lot clearer on what the test is doing.  While the test name clearly states what functionality is being tested, now you can clearly see what it is doing in order to test the functionality.  There are other advantages that might not be as apparent with this example.

Using component objects make it easier to test the same functionality that might live on different pages.  If we take the live chat component example, that might live on every page however there might be an issue with it work on a specific page.  All you have to do is include the LiveChatComponent object in the other page test that is having issues so you don't have to duplicate all test code for that component.

This structure also makes it so all your selectors are stored at the top of the page/component objects.  This makes it easy to find selectors and make changes if needed.

You also have a place to normalize functionality that your application might need, for example with an AngularJS application.  In order to be able to test an AngularJS without having a bunch of ```wait()```'s or ```waitForElement()```'s is to be able to hook into AngularJS's ```$browser.notifyWhenNoOutstandingRequests()``` method.  Now you can have a place to normalize calling that so that if it changes, you can change one place instead of having it littered all across your test files.

While there this more code in this structure, it helps improve the stability and maintainability of tests which is more important.
