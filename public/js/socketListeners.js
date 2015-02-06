var socket = io();

socket.on('update-stock', function(data) {
  $($("#products").find("[data-id='" + data.id + "']")
      .closest('.stock').children()[0]).text(data.stock + ' in stock')
});
