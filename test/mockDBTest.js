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

  it('can take an item from the database', function(done) {
    expect(db.takeItem('1')).to.be.ok;
    done();
  });

  it('reduces the stock of item when taking from database', function(done) {
    var startStock = db.db['1'].stock;
    db.takeItem('1');
    expect(db.db['1'].stock).to.be.below(startStock);
    done();
  });

  it('can return all items from database', function(done) {
    expect(db.allItems().length).to.eql(Object.keys(db.db).length);
    done()
  });

  it('can return a filtered list of items', function(done) {
    var filteredList = db.filteredItems("Men's Footwear");
    expect(filteredList[0].category).to.eql("Men's Footwear");
    expect(filteredList.length).to.be.below(Object.keys(db.db).length);
    done();
  });


});