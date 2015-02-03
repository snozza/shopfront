function popupButton() {
	var pop = $('body').find('.popbtn');
	var row = $('body').find('.row:not(:first):not(:last)');
	var body = $('body');
	var popoverContent = function(id) {
		var html = '<a href="#"><span data-id=' + id + ' class="glyphicon glyphicon-pencil"></span></a>' +
							 '<a href="#"><span data-id=' + id + ' class="glyphicon glyphicon-remove"></span></a>'
		return html;
	};

	pop.popover({
		trigger: 'manual',
		html: true,
		container: 'body',
		placement: 'bottom',
		animation: false,
		content: function() {	
			var id = $(this).attr('data-id')
			$('.glyphicon-remove').attr('data-id', id);
			return popoverContent(id);
		}
	});

	pop.on('click', function(e) {
		pop.popover('toggle');
	});

	$(window).on('resize', function() {
		pop.popover('hide');
	});

	row.on('touchend', function(e) {
		$(this).find('.popbtn').popover('toggle');
		row.not(this).find('.popbtn').popover('hide');
		return false;
	});

	body.on('click', function (e) {
    $('[data-original-title]').each(function () {
      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && 
        $('.popover').has(e.target).length === 0) {
        $(this).popover('toggle');
        $(this).popover('hide');
      }
    });
  });
}