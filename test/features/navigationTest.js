var webdriverio = require('webdriverio');
var expect = require('chai').expect;

describe('Navigating the site', function() {

  var client = {};

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities : {browserName: 'chrome'} });
    client.init(done);
  });

  after(function(done) {
    client.end(done);
  });

  describe('Visiting the main page', function() {
    this.timeout(99999999);

    beforeEach(function(done) {
      client.url('http://localhost:3000')
      .call(done);
    });

    it('has a title', function(done) {
      client
        .getTitle(function(err, title) {
          expect(err).to.not.be.true;
          expect(title).to.eql('Clothinator Store')
        })
        .call(done);
    });

    it('has a product category list', function(done) {
      client.
        getText('.lead', function(err, text) {
          expect(text).to.eql('Categories');
        })
        .call(done);
    });

  });
});