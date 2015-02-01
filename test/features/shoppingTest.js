var webdriverio = require('webdriverio');
var expect = require('chai').expect;

describe('#Shopping', function() {

  var client = {};

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome'} });
    client.init(done);
  });

  beforeEach(function(done) {
    client
      .url('http://localhost:3000')
      .call(done);
  });

  after(function(done) {
    client.end(done);
  });

  describe('A user can', function() {

    it('add a product to shopping cart', function(done) {
      client
        .click('.btn')
        .click('#cart')
        .waitForVisible('.itemName', 1000)
        .getText('.itemName', function(err, text) {
          expect(text[0]).to.eql('Suede Shoes, Blue')
        })
        .call(done);
    });
  });
});
