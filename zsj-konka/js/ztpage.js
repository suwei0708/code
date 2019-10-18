$(function() {
	// 导航滑动
	if($('#dspw').length) {
		fixedObj('.nav-zt', '.zt-banner', 86);
		$('#nav-zt').on('click', 'a', function() {
		    if ($(this).attr('href').indexOf('html#') > -1) {
		        console.log('aaa')
		        if ($($(this).attr('href')).length) {
		            $('html, body').animate({
		                'scrollTop': $($(this).attr('href')).offset().top
		            }, 500);
		            return false;
		        }
		    }
		});
	}

	// 无缝滚动
	if ($('.zt-dspw').length) {
	    $('.zt-dspw').rollSlide({
	        orientation: 'left',
	        num: 1,
	        v: 500,
	        space: 3000,
	        isRoll: true
	    });
	};
});

function fixedObj(box, obj, distance) {
    var position = $(box).offset().top;
    judgeFix(box, obj, position, distance);

    $(window).on('scroll', function() {
        judgeFix(box, obj, position, distance);
    });
}

function judgeFix(box, obj, position, distance) {
    if (distance) {
        num = distance
    } else {
        num = 0
    }
    if ($(window).scrollTop() > position) {
        $(box).addClass('pos-fixed');
        if (obj) {
            $(obj).css({
                'margin-bottom': num
            });
        }
    } else {
        $(box).removeClass('pos-fixed');
        if (obj) {
            $(obj).css({
                'margin-bottom': 0
            });
        }
    }

}