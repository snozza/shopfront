var webdriverio = require('webdriverio');
var expect = require('chai').expect;

describe('#Shopping', function() {

  var client = {};

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome'} });
    client.init(done);
  });

  beforeEach(function(done) {
    this.timeout(99999)
    client
      .url('http://localhost:3000')
      .call(done);
  });

  after(function(done) {
    client.end(done);
  });

  describe('A user can', function() {

    it('see a list of all products', function(done) {
      client
        .elements('.product', function(err, val) {
          expect(val.value.length).to.be.above(10);
      })
      .call(done);
    });

    it('see the price of products', function(done) {
      client
        .getText('.price', function(err, price) {
          expect(price[0]).to.eql('£99.00');
        })
        .call(done);
    })

    it('add a product to shopping cart', function(done) {
      this.timeout(10000);
      client
        .click('.btn')
        .click('#cart')
        .waitForExist('.itemName', 3000)
        .getText('.itemName', function(err, text) {
          expect(text[0]).to.contain("Black High Heel")
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
            expect(text[1]).to.not.contain("Adidas Sneakers")
        })
        .call(done);
    });

    it('view the total price of the shopping cart', function(done) {
      this.timeout(10000);
      var total;
      client
        .click('//*[@data-id="1"]')
        .click('//*[@data-id="2"]')
        .click('#cart')
        .waitForExist('.arrow', 3000)
        .getText('.price', function(err, price) {
          total = price.length-1
          expect(price[total]).to.contain('£141.00');
        })
        .call(done);
    });

    it('delete items in the shopping cart', function(done) {
      this.timeout(10000);
      var total;
      client
        .click('//*[@data-id="2"]')
        .click('#cart')
        .waitForExist('.itemName', 3000)
        .click('.popbtn')
        .waitForVisible('.glyphicon-remove', 3000)
        .click('.glyphicon-remove')
        .getText('.price', function(err, price) {
          total = price.length-1
          expect(price[total]).to.contain('£0.00');
        })
        .call(done);
    });
  });

  describe('#Vouchers and discounts', function() {

    it('can enter a discount code and see new total', function(done) {
      this.timeout(10000);
      client
        .click('//*[@data-id="2"]')
        .click('#cart')
        .waitForExist('.itemName', 3000)
        .getText('.price', function(err, price) {
          expect(price[price.length-1]).to.contain('£42.00');
        })
        .setValue('#discount', 'GIVEMEFIVEOFF')
        .click('#applyDiscount')
        .waitForExist('.itemName', 3000)
        .getText('.price', function(err, price) {
          expect(price[price.length-1]).to.contain('£37.00')
        })
        .call(done)
    });
  
    it('receive an automatic discount when order is over £50', function(done) {
      this.timeout(10000);
      client
        .click('//*[@data-id="3"]')
        .click('//*[@data-id="2"]')
        .click('#cart')
        .waitForExist('.itemName', 3000)
        .getText('.price', function(err, price) {
          expect(price[price.length-1]).to.contain('£51.00')
        })
        .call(done)
    });
  });

  describe('#Item Stock', function() {

    describe('Stock levels', function() {

      it('go down when customer adds to cart', function(done) {
        client
          .getText('.stock .pull-right', function(err, price) {
            expect(price[3]).to.contain('6');
          })
          .click('//*[@data-id="4"]')
          .getText('.stock .pull-right', function(err, price) {
            expect(price[3]).to.contain('5');
          })
          .call(done);
      });
    });
  });
});

