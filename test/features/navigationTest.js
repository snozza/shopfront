var webdriverio = require('webdriverio');
var expect = require('chai').expect;

describe('#Navigating', function() {

  var client = {};

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities : {browserName: 'chrome'} });
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

  describe('Visiting the main page', function() {
    this.timeout(99999999);

    it('has a title', function(done) {
      client
        .getTitle(function(err, title) {
          expect(err).to.not.be.true;
          expect(title).to.eql('El Clothing Shopo')
        })
        .call(done);
    });

    it('has a product category list', function(done) {
      client
        .getText('.list-group-item', function(err, text) {
          expect(text[0]).to.eql('All Products');
        })
        .call(done);
    });

    it('filters products by category', function(done) {
      client
        .click('//*[@id="categories"]/div[2]/div[1]/div/a[4]')
        .waitForExist('.price', 2000)
        .getText('//*[@id="products"]/div[1]/div/div[1]/h4[2]/a', function(err, text) {
          expect(text).to.eql('Fancy Dress');
        })
        .call(done);
    });

    it('has products listed', function(done) {
      client.
        isExisting('#products', function(err, val) {
          expect(val).to.be.true;
        }).
        call(done);
    });
  });

  describe('Visting about section', function() {
    this.timeout(99999999);

    beforeEach(function(done) {
      client
        .click('#about')
        .waitForVisible('#blurb', 1000)
        .call(done);
    });

    it('has a visible blurb', function (done) {
      client
        .isVisible('#blurb', function(err, val) {
          expect(val).to.be.true;
        })
        .call(done);
    });

    it('company blurb has text', function(done) {
      client
        .getText('h2', function(err, text) {
          expect(text).to.eql('About Us');
        })
        .call(done);
    });

    it('does not have and products visible', function(done) {
      client
        .waitForVisible('#categories', 1000, true)
        .isVisible('#categories', function(err, val) {
          expect(val).to.be.false;
        })
        .call(done);
    });
  });

  describe('Visiting shopping cart', function() {
    this.timeout(9999999);

    beforeEach(function(done) {
      client
        .click('#cart')
        .waitForVisible('#shopping-cart', 1000)
        .call(done);
    });

    it('has a shopping cart', function(done) {
      client
        .isVisible('#shopping-cart', function(err, val) {
          expect(val).to.be.true;
        })
        .call(done);
    });
  });
});