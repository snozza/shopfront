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
        .getText('.sticky ', function(err, text) {
          expect(text).to.contain('Gold Button Cardigan');
        })
        .call(done);
    });

    it('alerts Out of Stock when adding item with no stock', function(done) {
      client
        .click('//*[@data-id="5"]')
        .waitForVisible('.sticky', 2000)
        .getText('.sticky', function(err, text) {
          expect(text).to.contain('Out of stock');
        })
        .call(done);
    });
  });

  describe('#Applying voucher', function(done) {

    it('alerts when a valid voucher is applied to the cart', function(done) {
      client
        .click('//*[@data-id="1"]')
        .click('#cart')
        .waitForExist('.itemName', 3000)
        .setValue('#discount', 'GIVEMEFIVEOFF')
        .click('#applyDiscount')
        .waitForExist('.alert', 2000)
        .getText('.alert', function(err, text) {
          expect(text).to.contain('Voucher applied');
        })
        .call(done)
    });

    it('alerts when voucher is invalid', function(done) {
      client
        .click('//*[@data-id="1"]')
        .click('#cart')
        .waitForExist('.itemName', 3000)
        .setValue('#discount', 'GIVEMEAZILLIONOFF')
        .click('#applyDiscount')
        .waitForExist('.alert', 2000)
        .getText('.alert', function(err, text) {
          expect(text[1]).to.contain('Invalid voucher');
        })
        .call(done)
    });
  });
});