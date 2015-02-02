function Navigation() {
  this.itemHTML = function(item) {
      var html = 
      '<div class="col-sm-4 col-lg-4 col-md-4 product">' + 
      '<div class="thumbnail">' +
      '<img src="img/example_clothing.jpg" alt="">' +
      '<div class="caption">' +
      '<h4 class="pull-right">£' + Number(item.price).toFixed(2) + '</h4>' +
      '<h4><a href="#">' + item.name + '</a></h4>' +
      '<p>Random Description</p>' +
      '</div>' +
      '<div class="stock">' +
      '<p class="pull-right">' + item.stock + ' in stock</p>' +                   
      '<p><button data-id=' + item.id + ' class="btn btn-primary" href="#">Add to Cart</button></p>' +                         
      '</div>' +
      '</div>' +
      '</div>'
      return html;
  };
  this.cartHTML = function(item) {
      var html = 
      '<li class="row whited">' +
      '<span class="quantity">1</span>' +
      '<span class="itemName">' + item.name + '</span>' +
      '<span class="popbtn"><a class="arrow"></a></span>' +
      '<span class="price">£' + Number(item.price * item.quantity).toFixed(2) +'</span></li>'
      return html;
  };
  this.totalHTML = function(total) {
      var html =
      '<li class="row totals">' + 
      '<span class="itemName">Total:</span>' + 
      '<span class="price">£' + Number(total).toFixed(2) + '</span>' +
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
  $.post('http://localhost:3000/addcart', {id: id}, function(data) {
    console.log(data);
  });
};

Navigation.prototype.showCart = function() {
  $('#cartList').empty();
  _this = this;
  var total = 0;
  $.get('http://localhost:3000/showcart', function(data) {
    $.each(data, function(index, item) {
      total += item.price * item.quantity;
      $('#cartList').append(_this.cartHTML(item));
    });
  }).then(function() {
    $('#cartList').append(_this.totalHTML(total));
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
    $('#blurb').fadeOut('slow', function() {
      $('#shopping-cart').fadeOut('slow', function() {
        $('#categories').fadeIn('slow', function() {
          navigation.getAllItems();
        });
      });
    });
  });

  $('#about').on('click', function(event) {
    event.preventDefault();
    $('#categories').fadeOut('slow', function() {
      $('#shopping-cart').fadeOut('slow', function() {
        $('#blurb').fadeIn('slow');
      });
    });
  });

  $('#cart').on('click', function(event) {
    event.preventDefault();
    $('#categories').fadeOut('slow', function() {
      $('#blurb').fadeOut('slow', function() {
        $('#shopping-cart').fadeIn('slow', function() {
          navigation.showCart()
        });
      });
    });
  });

  $('body').on('click', 'h4', function(event) {
    event.preventDefault();
  });

  $('body').on('click', 'button', function() {
    console.log($(this).attr('data-id'))
    navigation.addToCart($(this).attr('data-id'));
  });

});