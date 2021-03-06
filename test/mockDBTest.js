var expect = require('chai').expect;
var mockDB = require('../mockDB');
var db;

describe('#Mock Database', function() {

  beforeEach(function(done) {
    db = new mockDB();
    done();
  });

  it('has a database of items', function(done) {
    expect(db.db['1']).to.be.ok;
    done();
  });

  it('can take an item from the database and add to cart', function(done) {
    expect(db.takeItem('1')).to.be.ok;
    expect(db.cart['1']).to.exist;
    done();
  });

   it('can return an item to database', function(done) {
    var startStock = db.takeItem('1').stock;
    db.returnItem('1');
    expect(db.db['1'].stock).to.be.above(startStock);
    expect(db.cart).to.be.empty;
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

  it('can return the contents of shopping cart', function(done) {
    db.takeItem('1');
    db.takeItem('2');
    expect(Object.keys(db.showCart()).length).to.eql(2);
    done();
  });

  it('can empty the cart', function(done) {
    db.takeItem('1');
    db.takeItem('2');
    db.emptyCart();
    expect(db.cart).to.be.empty();
    done();
  });
});