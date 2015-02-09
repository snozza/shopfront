function DB(cBack) {
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
                category: "Women's Casualwear", price: 167.00, stock: 6},
              '7': {id: '7', name: "Cotton Shorts, Medium Red, Black",
                category: "Women's Casualwear", price: 30.00, stock: 5},
              '8': {id: '8', name: "Fine Stripe Short Sleeve Shirt, Grey",
                category: "Men's Casualwear", price: 49.99, stock: 9},
              '9': {id: '9', name: "Fine Stripe Short Sleeve Shirt, Green",
                category: "Men's Casualwear", price: 49.99, stock: 9},
              '10': {id: '10', name: "Sharkskin Waistcoat, Charcoal",
                category: "Men's Formalwear", price: 75.00, stock: 2},
              '11': {id: '11', name: "Lightweight Patch Pocket Blazer, Deer",
                category: "Men's Formalwear", price: 175.00, stock: 1},
              '12': {id: '12', name: "Lightweight Patch Pocket Blazer, Deer",
                category: "Women's Formalwear", price: 270.00, stock: 10},
              '13': {id: '13', name: "￼Mid Twist Cut-Out Dress, Pink",
                category: "Women's Formalwear", price: 540.00, stock: 5}
            };
  this.cart = {};
  this.vouchers = {};
  this.voucherCodes = {'GIVEMEFIVEOFF': {price: -5, category: 'Voucher'}};
  this.fiftyDiscount = -10.00;
  this.seventyFiveDiscount = -15.00;
  this.itemDiscount = ["Men's Footwear", "Women's Footwear"];
  var cBack = (cBack || function() {})();
}

DB.prototype._increaseStock = function(id) {
  return this.db[id].stock += this.cart[id].length;;
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
  else return 0;
};

DB.prototype.returnItem = function(id) {
  this._increaseStock(id);
  return this.removeFromCart(id);
};

DB.prototype.allItems = function() {
  var items = [];
  for (var id in this.db) {
    items.push(this.db[id]);
  }
  return items.sort(function(a, b) { return a.id - b.id });
};

DB.prototype.filteredItems = function(category) {
  if(category === "All Products") return this.allItems();
  var items = [];
  for (var id in this.db) {
    if(this.db[id].category === category) items.push(this.db[id])
  }
  return items.sort(function(a, b) { return a.id - b.id }); 
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
  var keys;
  delete this.cart[id];
  if(Object.keys(this.cart).length === 0) {
    this.vouchers = {};
  }
};

DB.prototype.emptyCart = function() {
  for(var item in this.cart) {
    this.returnItem(this.cart[item][0].id)
  }
};

DB.prototype.showCart = function() {
  return {cart: this.cart, calc: this.calculateTotal()};
};

DB.prototype.applyVoucher = function(code) {
  if(Object.keys(this.cart).length === 0) return false
  if(this.voucherCodes[code] && !this.vouchers[code]) {
    this.vouchers[code] = this.voucherCodes[code];
    return true;
  }
};

DB.prototype.calculateTotal = function() {
  var total = 0;
  var discountItem = false;
  for(var item in this.cart) {
    total += (this.cart[item][0].price * this.cart[item].length)
    if(this.itemDiscount.indexOf(this.cart[item][0].category) > -1)
      discountItem = true;
  }
  return this.applyDiscounts(total, discountItem);
};

DB.prototype.applyDiscounts = function(total, discountItem) {
  var discount = 0;
  if(total > 50.00) discount += this.fiftyDiscount;
  if(total > 75.00 && discountItem) discount += this.seventyFiveDiscount;
  for(var voucher in this.vouchers)
    discount += this.vouchers[voucher].price;
  return {subtotal: total, discount: discount, total: total + discount}
};

DB.prototype.cartSize = function() {
  var size = 0;
  for(var i in this.cart)
    size += this.cart[i].length
  return size;
}

DB.prototype.removeVoucher = function(code) {
  return delete this.vouchers[code];
}

module.exports = DB;