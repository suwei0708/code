$(function() {
	fixedObj('.zt-nav', '.bg', 90);

	showCur();
	var timer;
	$(window).on('scroll', function() {
	    clearInterval(timer);
	    timer = setTimeout(showCur, 100);
	});

	function showCur() {
	    if ($(window).scrollTop() > $(window).height()) {
	        $('.zt-talk').show();
	    } else {
	        $('.zt-talk').hide();
		};

		if ($('.zt-nav a[data-id]').length) {
			if ($(window).scrollTop() >= $('#' + $('.zt-nav a[data-id]').attr('data-id')).offset().top) {
				$('.zt-nav a').removeClass('cur');
				$('.zt-nav a[data-id]').addClass('cur');
			}
			else {
				$('.zt-nav a').removeClass('cur');
				$('.zt-nav a:eq(0)').addClass('cur');
			}
		}
	}

	// 导航滑动
	$('.zt-nav').on('click', 'a', function() {
		if ($(this).attr('data-id').length) {
			$('html, body').animate({
				'scrollTop': $('#' + $(this).attr('data-id')).offset().top
			}, 500);
			return false;
		}
	});
});

function fixedObj(box, obj, distance) {
    var position = $(box).offset().top;
    judgeFix(box, obj, position, distance);

    $(window).on('scroll', function() {
        judgeFix(box, obj, position, distance);
    });
}

function judgeFix(box, obj, position, distance) {
    if(distance) {
        num = distance
    }
    else {
        num = 0
    }
    if($(window).scrollTop() > position) {
        $(box).addClass('pos-fixed');
        if(obj) {
            $(obj).css( {
                'margin-top': num
            });
        }
    }
    else {
        $(box).removeClass('pos-fixed');
        if(obj) {
            $(obj).css( {
                'margin-top': 0
            });
        }
    }

}