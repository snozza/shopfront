function DB() {
  this.db = { '1': {id: '1', name: "Almond Toe Court Shoes, Patent Black",
                category: "Women's Footwear", price: 99.00, stock: 5},
              '2': {id: '2', name: "Suede Shoes, Blue",
                category: "Women's Footwear", price: 42.00, stock: 4},
              '3': {id: '3', name: "Leather Driver Saddle Loafers, Tan",
                category: "Men's Footwear", price: 34.00, stock: 12},
              '4': {id: '4', name: "Flip Flops, Red",
                category: "Men's Footwear", price: 19.00, stock: 6},
              '5': {id: '5', name: "Flip Flops, Blue",
                category: "Men's Footwear", price: 19.00, stock: 0},
              '6': {id: '6', name: "Gold Button Cardigan, Black",
                category: "Women’s Casualwear", price: 167.00, stock: 6},
              '7': {id: '7', name: "Cotton Shorts, Medium Red, Black",
                category: "Women’s Casualwear", price: 30.00, stock: 5},
              '8': {id: '8', name: "Fine Stripe Short Sleeve Shirt, Grey",
                category: "Men’s Casualwear", price: 49.99, stock: 9},
              '9': {id: '9', name: "Fine Stripe Short Sleeve Shirt, Green",
                category: "Men’s Casualwear", price: 49.99, stock: 9},
              '10': {id: '10', name: "Sharkskin Waistcoat, Charcoal",
                category: "Men’s Formalwear", price: 75.00, stock: 2},
              '11': {id: '11', name: "Lightweight Patch Pocket Blazer, Deer",
                category: "Men’s Formalwear", price: 175.00, stock: 1},
              '12': {id: '12', name: "Lightweight Patch Pocket Blazer, Deer",
                category: "Women’s Formalwear", price: 270.00, stock: 10},
              '13': {id: '13', name: "￼Mid Twist Cut-Out Dress, Pink",
                category: "Women’s Formalwear", price: 540.00, stock: 5}
            };
  this.cart = {}
  this.id = Object.keys(this.db).length;
}

DB.prototype.increaseStock = function(id) {
  return ++this.db[id].stock;
};

DB.prototype._decreaseStock = function(id) {
  --this.db[id].stock;
};

DB.prototype.takeItem = function(id) {
  if(this.db[id].stock > 0) {
    this.addToCart(id);
    this._decreaseStock(id);
    return this.db[id];
  }
  else return null;
};

DB.prototype.returnItem = function(id) {
    this.removeFromCart(id);
    return this.increaseStock(id);
};

DB.prototype.allItems = function() {
  var items = [];
  for (var id in this.db) {
    items.push(this.db[id]);
  }
  return items.sort(function(a, b) { return a.id - b.id });
};

DB.prototype.filteredItems = function(category) {
  var items = [];
  for (var id in this.db) {
    if(this.db[id].category === category) items.push(this.db[id])
  }
  return items.sort(function(a, b) { return a.id = b.id }); 
};

DB.prototype.addToCart = function(id) {
  if(this.cart[id])
    this.cart[id].push(this.db[id]);
  else {  
    this.cart[id] = [this.db[id]];
  }
  return this.cart[id];
};

DB.prototype.removeFromCart = function(id) {
  delete this.cart[id];
};

DB.prototype.showCart = function() {
  return this.cart;
};

module.exports = DB;