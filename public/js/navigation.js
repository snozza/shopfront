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
      '<p><a data-id=' + item.id + ' data-role="button" class="add btn btn-primary" href="#">Add to Cart</a></p>' +                         
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
  this.totalHTML = function(calc) {
      var html =
      '<li class="row totals">' + 
      '<span class="itemName"><p>Subtotal:</p>' +
      '<p>Discount:</p>' +
      '<p>Total:</p></span>' + 
      '<span class="price">£' + Number(calc.subtotal).toFixed(2) + '</p>' + 
      '<p>£' + Number(calc.discount).toFixed(2) + '</p>' +
      '<p>£' + Number(calc.total).toFixed(2) + '</p></span>' +
      '<span class="order"> <a class="text-center">ORDER</a></span></li>'
      return html;
  };
  this.timeout;
};

Navigation.prototype.getAllItems = function() {
  $('#products').empty();
  var _this = this;
  $.get('/items', function(data) {
    $.each(data.items, function(index, item) {
      $('#products').append(_this.itemHTML(item));
    });
    _this.updateCartCount(data.cart);
  });
}

Navigation.prototype.addToCart = function(id) {
  _this = this;
  $.post('/items', {id: id}, function(data) {
    _this.updateCartCount(data.cart);
    if(!data.item) return _this.alert("Out of stock");
    _this.alert("Added " + data.item.name + " to cart");
  });
};

Navigation.prototype.removeFromCart = function(id) {
  var _this = this;
  $.ajax({
    url: '/items',
    type: 'DELETE',
    data: {id: id},
    success: function() {
      _this.showCart();
    }
  });
};

Navigation.prototype.showCart = function() {
  $('#cartList').empty();
  var _this = this;
  $.get('/showcart', function(data) {
    $.each(data.cart, function(index, item) {
      $('#cartList').append(_this.cartHTML(item[0], item.length));
    });
    _this.addTotal(data.calc);    
  });
};

Navigation.prototype.addTotal = function(calc) {
  $('#cartList').append(this.totalHTML(calc));
  popupButton();
};

Navigation.prototype.applyDiscount = function(code) {
  var _this = this;
  var discount = $('#discount').val();
  $.post('vouchers', {code: discount}, function(data) {
    _this.showCart();
    _this.alert(data.message);
  }).fail(function(data) {
    _this.alert(data.responseJSON.message);
  })
};

Navigation.prototype.updateCartCount = function(count) {
  $('#cart-count').text(count);
}

Navigation.prototype.alert = function(message) {
  clearTimeout(this.timeout);
  $(".alert").text(message).show();
  this.timeout = setTimeout(function() { $(".alert").hide(); }, 2000); 
};  

$(document).on('ready', function() {

  (function() { 
    var navigation = new Navigation();
    navigation.getAllItems();
    window['navigation'] = navigation;
  }());

  $(document).on('click', '.navbar-brand:not(.unclickable)', function(e) {
    e.preventDefault();
    var $this = $(this).addClass('unclickable')
    $('#shopping-cart').fadeOut('fast', function() {
      $('#blurb').fadeOut('fast', function() {
        $('#categories').fadeIn('fast', function() {
          navigation.getAllItems();
          $this.removeClass('unclickable');
        });
      });
    });
  });

  $(document).on('click', '#about:not(.unclickable)', function(e) {
    e.preventDefault();
    var $this = $(this).addClass('unclickable')
    $('#categories').fadeOut('fast', function() {
      $('#shopping-cart').fadeOut('fast', function() {
        $('#blurb').fadeIn('fast', function() {
          $this.removeClass("unclickable");
        });
      });
    });
  });

  $(document).on('click', '#cart:not(.unclickable)', function(e) {
    e.preventDefault();
    var $this = $(this).addClass('unclickable')
    $('#categories').fadeOut('fast', function() {
      $('#blurb').fadeOut('fast', function() {
        $('#shopping-cart').fadeIn('fast', function() {
          navigation.showCart();
          $this.removeClass('unclickable');
        });
      });
    });
  });

  $(document).on('click', 'h4', function(e) {
    e.preventDefault();
  });

  $(document).on('click touchstart', '.add', function(e) {
    e.preventDefault();
    navigation.addToCart($(this).attr('data-id'));
  });

  $(document).on('click', '.glyphicon-remove', function() {
    $(this).closest('.popover').popover('toggle');
    navigation.removeFromCart($(this).attr('data-id'));  
  });

  $(document).on('click', '.glyphicon-pencil', function() {
    $(this).closest('.popover').popover('toggle');
  });

  $(document).on('click', '#applyDiscount', function() {
    var code = $('#discount').val();
    navigation.applyDiscount(code);
  });

  $(document).on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });
});