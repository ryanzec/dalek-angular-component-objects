module.exports = {
  //you can reference back to to see that list: https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element/:id/value
  specialCharacters:  {
    nbsp: '\u00a0',
    null: '\uE000',
    cancel: '\uE001',
    help: '\uE002',
    backspace: '\uE003',
    tab: '\uE004',
    clear: '\uE005',
    return: '\uE006',
    enter: '\uE007',
    shift: '\uE008',
    control: '\uE009',
    alt: '\uE00A',
    pause: '\uE00B',
    escape: '\uE00C',
    space: '\uE00D',
    pageUp: '\uE00E',
    pageDown: '\uE00F',
    end: '\uE010',
    home: '\uE011',
    leftArrow: '\uE012',
    upArrow: '\uE013',
    rightArrow: '\uE0014',
    downArrow: '\uE015',
    insert: '\uE016',
    delete: '\uE017',
    semiColon: '\uE018',
    equals: '\uE019',
    numpad0: '\uE01A',
    numpad1: '\uE01B',
    numpad2: '\uE01C',
    numpad3: '\uE01D',
    numpad4: '\uE01E',
    numpad5: '\uE01F',
    numpad6: '\uE020',
    numpad7: '\uE021',
    numpad8: '\uE022',
    numpad9: '\uE0023',
    multiply: '\uE024',
    add: '\uE025',
    seperator: '\uE026',
    subtract: '\uE027',
    decimal: '\uE028',
    divide: '\uE029',
    f1: '\uE031',
    f2: '\uE032',
    f3: '\uE033',
    f4: '\uE034',
    f5: '\uE035',
    f6: '\uE036',
    f7: '\uE037',
    f8: '\uE038',
    f9: '\uE039',
    f10: '\uE03A',
    f11: '\uE03B',
    f12: '\uE03C',
    command: '\uE03D'
  },

  repeatKey: function (key, count) {
    var x;
    var repeatedKey = '';

    for(x = count; x > 0; x -= 1) {
      repeatedKey += key;
    }

    return repeatedKey;
  }
};