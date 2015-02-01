var expect = require('chai').expect;
var mockDB = require('../mockDB');
var db;

describe('#Mock Database', function() {

  beforeEach(function(done) {
    db = new mockDB();
    done();
  });

  it('has existing example items', function(done) {
    expect(db.db['1']).to.be.ok;
    done();
  });

  it('can return an item to database', function(done) {
    var startStock = db.db['1'].stock;
    expect(db.returnItem('1')).to.be.above(startStock);
    done();
  });
});