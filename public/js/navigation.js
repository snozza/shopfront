$(document).on('ready', function() {

  $('.navbar-brand').on('click', function(event) {
    event.preventDefault();
    $('#blurb').fadeOut('slow', function() {
      $('#shopping-cart').fadeOut('slow', function() {
        $('#categories').fadeIn('slow');
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
        $('#shopping-cart').fadeIn('slow');
      });
    });
  });
});