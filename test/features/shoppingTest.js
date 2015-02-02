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

    it('see a list of all products', function(done) {
      client.elements('.product', function(err, val) {
        expect(val.value.length).to.be.above(10);
      })
      .call(done);
    });

    it('add a product to shopping cart', function(done) {
      client
        .click('.btn')
        .click('#cart')
        .waitForVisible('.itemName', 1000)
        .getText('.itemName', function(err, text) {
          expect(text[0]).to.contain("Almond Toe Court Shoes")
        })
        .call(done);
    });
  });
});

