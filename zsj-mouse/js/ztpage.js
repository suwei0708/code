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
	}
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