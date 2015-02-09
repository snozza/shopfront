var webdriverio = require('webdriverio');
var expect = require('chai').expect;

describe('#Alerts', function() {

  var client = {};

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'}});
    client.init(done);
  });

  beforeEach(function(done) {
    client
      .url('http://localhost:3000')
      .call(done);
  });

  after(function(done) {
    client.end(done)
  });

  describe('#Adding items to cart', function(done) {

    it('alerts the item name when successfully added to cart', function(done) {
      client.  
        click('//*[@data-id="6"]')
        .waitForVisible('.sticky', 2000)
        .getText('.sticky', function(err, text) {
          expect(text).to.contain('Gold Button Cardigan')
        })
        .call(done);
    });
  });
});