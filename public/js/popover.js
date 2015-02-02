function popupButton() {
	var pop = $('body').find('.popbtn');
	var row = $('body').find('.row:not(:first):not(:last)');

	pop.popover({
		trigger: 'manual',
		html: true,
		container: 'body',
		placement: 'bottom',
		animation: false,
		content: function() {	
		console.log($(pop).attr('data-id'));
		console.log($($('#popover').data('id', '1')))	
			return $('#popover').html();
		}
	});

	pop.on('click', function(e) {
		pop.popover('toggle');
		pop.not(this).popover('hide');
	});

	$(window).on('resize', function() {
		pop.popover('hide');
	});

	row.on('touchend', function(e) {
		$(this).find('.popbtn').popover('toggle');
		row.not(this).find('.popbtn').popover('hide');
		return false;
	});

}