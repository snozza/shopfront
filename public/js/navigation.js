$(document).on('ready', function() {

  $('.navbar-brand').on('click', function(event) {
    event.preventDefault();
    $('#categories').fadeIn('slow');
  });

  $('#about').on('click', function(event) {
    event.preventDefault();
    $('#categories').fadeOut('slow', function() {
      $('#blurb').fadeIn('slow');
    });
  });
});