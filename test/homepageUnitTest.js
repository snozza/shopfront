var expect = require('chai').expect;
var http = require('http');

describe('Pages of site', function() {

  describe('Homepage', function() {

    it('responds with an ok status code', function(done) {
      http.get('http://localhost:3000', function(res) {
        expect(res.statusCode).to.eql(200);
        done();
      });
    });
  });

  describe('Unknown page', function() {

    it('responds with an error status code', function(done) {
      http.get('http://localhost:3000/foobar', function(res) {
        expect(res.statusCode).to.eql(200);
        done();
      });
    });
  });
});
