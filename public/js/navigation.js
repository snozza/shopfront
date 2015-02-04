function Navigation() {
  this.itemHTML = function(item) {
      var html = 
      '<div class="col-sm-4 col-lg-4 col-md-4 product">' + 
      '<div class="thumbnail">' +
      '<img src="img/example_clothing.jpg" alt="">' +
      '<div class="caption">' +
      '<h4 class="pull-right price">£' + Number(item.price).toFixed(2) + '</h4>' +
      '<h4><a href="#">' + item.name + '</a></h4>' +
      '<p>Random Description</p>' +
      '</div>' +
      '<div class="stock">' +
      '<p class="pull-right">' + item.stock + ' in stock</p>' +                   
      '<p><button data-id=' + item.id + ' class="add btn btn-primary" href="#">Add to Cart</button></p>' +                         
      '</div>' +
      '</div>' +
      '</div>'
      return html;
  };
  this.cartHTML = function(item, quantity) {
      var html = 
      '<li class="row whited">' +
      '<span class="quantity">' + quantity + '</span>' +
      '<span class="itemName">' + item.name + '</span>' +
      '<span class="popbtn" data-id=' + item.id + '><a class="arrow"></a></span>' +
      '<span class="price">£' + Number(item.price * quantity).toFixed(2) +'</span></li>'
      return html;
  };
  this.totalHTML = function(total, discount) {
      var html =
      '<li class="row totals">' + 
      '<span class="itemName"><p>Subtotal:</p>' +
      '<p>Discount:</p>' +
      '<p>Total:</p></span>' + 
      '<span class="price">£' + Number(total).toFixed(2) + '</p>' + 
      '<p>£' + Number(discount).toFixed(2) + '</p>' +
      '<p>£' + Number(total + discount).toFixed(2) + '</p></span>' +
      
      
      '<span class="order"> <a class="text-center">ORDER</a></span></li>'
      return html;
  };
};

Navigation.prototype.getAllItems = function() {
  $('#products').empty();
  _this = this;
  $.get('http://localhost:3000/items', function(data) {
    $.each(data, function(index, item) {
      $('#products').append(_this.itemHTML(item));
    });
  });
}

Navigation.prototype.addToCart = function(id) {
  $.post('items', {id: id}, function(data) {
  });
};

Navigation.prototype.removeFromCart = function(id) {
  _this = this;
  $.ajax({
    url: 'items',
    type: 'DELETE',
    data: {id: id},
    success: function() {
      _this.showCart();
    }
  });
};

Navigation.prototype.showCart = function() {
  $('#cartList').empty();
  _this = this;
  var total = 0;
  var discount = 0;
  $.get('http://localhost:3000/showcart', function(data) {
    $.each(data, function(index, item) {
      total += item[0].price * item.length;
      if(item[0].category !== 'Voucher')
        $('#cartList').append(_this.cartHTML(item[0], item.length));
      else discount += item[0].price;
    });
    _this.addTotal(total, discount);    
  });
};

Navigation.prototype.addTotal = function(total, discount) {
  $('#cartList').append(_this.totalHTML(total, discount));
  popupButton();
};

Navigation.prototype.applyDiscount = function(code) {
  _this = this;
  var discount = $('#discount').val();
  $.post('vouchers', {code: discount}, function(data) {
    _this.showCart();
  });
};

$(document).on('ready', function() {

  (function() {
    var navigation = new Navigation();
    navigation.getAllItems();
    window['navigation'] = navigation;
  }());

  $('.navbar-brand').on('click', function(event) {
    event.preventDefault();
    $('#blurb').fadeOut('fast', function() {
      $('#shopping-cart').fadeOut('fast', function() {
        $('#categories').fadeIn('fast', function() {
          navigation.getAllItems();
        });
      });
    });
  });

  $('#about').on('click', function(event) {
    event.preventDefault();
    $('#categories').fadeOut('fast', function() {
      $('#shopping-cart').fadeOut('fast', function() {
        $('#blurb').fadeIn('fast');
      });
    });
  });

  $('#cart').on('click', function(event) {
    event.preventDefault();
    $('#categories').fadeOut('fast', function() {
      $('#blurb').fadeOut('fast', function() {
        $('#shopping-cart').fadeIn('fast', function() {
          navigation.showCart()
        });
      });
    });
  });

  $('body').on('click', 'h4', function(event) {
    event.preventDefault();
  });

  $('body').on('click', '.add', function() {
    navigation.addToCart($(this).attr('data-id'));
  });

  $('body').on('click', '.glyphicon-remove', function() {
    $(this).closest('.popover').popover('toggle');
    navigation.removeFromCart($(this).attr('data-id'));  
  });

  $('body').on('click', '.glyphicon-pencil', function() {
    $(this).closest('.popover').popover('toggle');
  });

  $('body').on('click', '#applyDiscount', function() {
    var code = $('#discount').val();
    navigation.applyDiscount(code);
  });
});