$(function() {
	// logo下拉
	if ($('.logo').length) {
		var l = $('.logo');
		if (l.length < 1)
		    return;
		var a = l.find('.arrow');
		if (a.length < 1)
		    return;
		var b = l.find('.subnav');
		if (b.length < 1)
		    return;

		function arrow_toggle() {
		    if (a.hasClass('hover')) {
		        a.removeClass('hover');
		        b.removeClass('show');
		    } else {
		        a.addClass('hover');
		        b.addClass('show');
		    }
		}
		// if ($.md()) {
		//     l.find('.arrow').on('mouseenter', function() {
		//         a.addClass('hover');
		//         b.addClass('show');
		//     });
		// }
		l.find('.arrow').on('click', arrow_toggle);
		l.on('mouseleave', function() {
		    a.removeClass('hover');
		    b.removeClass('show');
		});
	}
	// 导航搜索
	if ($('.so-box').length) {
		var $sobox = $('.so-box');
		var $form = $sobox.find('.form');
		var $sVal = $form.find('.input').val();
		$('.so-selects li').on('click', function() {
		    var $span = $(this).find('span');
		    if ($span.length) {
		        $(this).addClass('cur').siblings().removeClass('cur');
		        $form.addClass('hide').eq($(this).index() - 1).removeClass('hide').find('.input').trigger('focus');
		    }
		});
		$form.find('.input').on('focusin', function() {
		    if ($.trim($(this).val()) == $sVal) {
		        $(this).val('');
		    }
		})
		$form.find('.input').on('focusout', function() {
		    var v = $(this).val();
		    if (!$.trim(v)) {
		        v = $sVal;
		    }
		    $form.find('.input').val(v);
		});
	};

	// 左侧悬浮
	sidebar('.sidebar', '.box', 24);

	// 点击收藏
	$('.add-fav').on('click', function(e) {
	    try {
	        if (window.netscape) {
	            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");

	            Components.classes['@mozilla.org/preferences-service;1']
	                .getService(Components.interfaces.nsIPrefBranch)
	                .setCharPref('browser.startup.homepage', window.location.href);

	            alert('成功设为首页');

	        } else if (window.external) {
	            document.body.style.behavior = 'url(#default#homepage)';
	            document.body.setHomePage(location.href);
	        } else {
	            throw 'NOT_SUPPORTED';
	        }
	    } catch (err) {
	        alert('您的浏览器不支持自动收藏，请使用Ctrl+D进行收藏');
	    }
	    e.preventDefault();
	});

	// 推荐滚动
	if ($('.scroll-focus').length) {
		var $focus = $('.scroll-focus');
		if ($focus.length < 1)
		    return;
		var $a = $focus.children('a');
		if ($a.length < 1)
		    return;
		$a.each(function(i) {
		    var s = i % 4;
		    $(this).css('animation-delay', s * 0.1 + 's');
		});
		function ainit() {
		    $a.toggleClass('hide');
		    setTimeout(ainit, 5000);
		}
		setTimeout(ainit, 5000);
	}

	// 返回顶部
	$('#back').on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 200);
	});
});

// 侧边栏滚动时固定
function sidebar(dom, box, offsetNum) {
	var posNum = 0;
	if (offsetNum) {
		posNum = offsetNum;
	}
    var dl = $(dom).children();
    if (dl.length < 1) return;
    var $box = $(box);
    if ($box.length < 1) return;
    var arr = [];
    $box.each(function() {
        var title = $(this).attr('data-title');
        var id = $(this).attr('id');
        if (title && id) {
            arr.push({
                title: title,
                id: id
            });
        }
    });
    var html = '';
    for (var i = 0; i < arr.length; i++) {
        html += '<li><a href="javascript:;' + arr[i].id + '" class="link-scroll">' + arr[i].title + '</a></li>';
    }
	dl.html(html);

	var domPos = $(dom).parent().offset().top + $(dom).parent().outerHeight() - $(dom).children().outerHeight();
	var pos = $(dom).offset().top;
	posNav();
	$(window).on('scroll', function() {
	    posNav();
	});
	$(dom).on('click', 'li', function() {
	    var _this = $(this);
		var index = +$(this).index();
	    $('html, body').animate({
	        scrollTop: parseInt($('#' + arr[index].id).offset().top) - posNum
	    }, 100);
	});

	function posNav() {
		if ($(window).scrollTop() > domPos) {
			$(dom).children().addClass('absolute').removeClass('fixed');
		}
	    else if ($(window).scrollTop() > pos) {
	        $(dom).children().addClass('fixed').removeClass('absolute');
		}
		else {
		    $(dom).children().removeClass('fixed').removeClass('absolute')
		}

		$.each(arr, function(i) {
		    if ($(window).scrollTop() >= parseInt($('#' + arr[i].id).offset().top) - posNum) {
		        $(dom).find('li').removeClass('cur').eq(i).addClass('cur');
		    }
		});
	}
}

