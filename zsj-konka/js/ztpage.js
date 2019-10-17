$(function() {
	// 导航跳转
	if ($('#scroll0').length) {
		showCur();
		var timer;
	    $(window).on('scroll', function() {
			clearInterval(timer);
			timer = setTimeout(showCur, 100);
	    });
		$('.zt-nav').on('click', 'li', function() {
			var index = +$(this).index();
			if (index == 0) {
				$('html, body').animate({
					scrollTop: $('.zt-banner').offset().top
				}, 300);
			}
			else {
				$('html, body').animate({
					scrollTop: $('#scroll' + index).offset().top - $('.zt-nav').height()
				}, 300);
			}
		});
	};

	function showCur() {
		// 导航显示
		if ($(window).scrollTop() > $('.zt-banner').offset().top + $('.zt-banner').height()) {
			$('.zt-nav').css({
				'position': 'fixed'
			});
			$('.zt-slogan').css({
				'margin-top': $('.zt-nav').outerHeight()
			});
		}
		else {
			$('.zt-nav').css({
				'position': 'static'
			});
			$('.zt-slogan').css({
				'margin-top': 0
			});
		};

		$.each($('.zt-nav li'), function(i) {
			if (i == 0) {
				$('.zt-nav li').removeClass('cur').eq(0).addClass('cur');
			}
			else if ($(window).scrollTop() >= $('#scroll' + i).offset().top - $('.zt-nav').height()) {
				$('.zt-nav li').removeClass('cur').eq(i).addClass('cur');
			}
		});

		if ($(window).scrollTop() > $(window).height()) {
		    $('.zt-talk').show();
		}
		else {
		    $('.zt-talk').hide();
		};
	}
});