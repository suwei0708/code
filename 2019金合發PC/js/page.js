$(function() {
	$('.bell').on('click', function() {
		$('.notify-pop').show();
	});
	$('.notify-pop').on('mouseover', function() {
	    $(this).show();
	}).on('mouseout', function() {
	    $(this).hide();
	});

	$('.eyes').on('click', function() {
		if($(this).hasClass('open')) {
			$(this).removeClass('open');
			$(this).prevAll('.pword')[0].type = "password";
		}
		else {
			$(this).addClass('open');
			$(this).prevAll('.pword')[0].type = "text";
		}
	})
    // 首页banner
    if($('#sld').length) {
        $('#sld').slides({
            generatePagination: true,
            generateNextPrev: false,
            play: 3000,
            pause: 2500,
            hoverPause: true,
		});
    };

});