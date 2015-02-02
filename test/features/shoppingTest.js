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
      this.timeout(10000);
      client
        .click('.btn')
        .click('#cart')
        .waitForExist('.itemName', 3000)
        .getText('.itemName', function(err, text) {
          expect(text[0]).to.contain("Almond Toe Court Shoes")
        })
        .call(done);
    });

    it('not add an out of stock product to the shopping cart', function(done) {
      this.timeout(10000);
      client
        .click('//*[@data-id="5"]')
        .click('#cart')
        .waitForExist('.itemName', 3000)
        .getText('.itemName', function(err, text) {
            expect(text[1]).to.not.contain("Flip Flops, Blue")
        })
        .call(done);
    });

    it('view the total price of the shopping cart', function(done) {
      this.timeout(10000);
      client
        .click('//*[@data-id="2"]')
        .click('#cart')
        .waitForExist('.itemName', 3000)
        .getText('.price', function(err, price) {
          expect(price[2]).to.eql('£141.00');
        })
        .call(done);
    });



  });
});

