$(function() {
	// 导航滑动
	if($('#dspw').length) {
		fixedObj('.zt-nav', '.zt-banner', 80);
		$('.zt-nav').on('click', 'a', function() {
		    if ($(this).attr('href').indexOf('html#') > -1) {
		        if ($($(this).attr('href').replace('index.html', '')).length) {
		            $('html, body').animate({
		                'scrollTop': $($(this).attr('href').replace('index.html', '')).offset().top - 100
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

	// 点击回复
	$('.ct-comment').on('click', '.btn-replay', function() {
	    var replayForm = $(this).parents('.com-box').find('.reply-form');
	    if (replayForm.is(':visible')) {
	        $('.ct-comment .reply-form').hide();
	    } else {
	        $('.ct-comment .reply-form').hide();
	        replayForm.show();
	    }
	});
	// 点击取消
	$('.ct-comment').on('click', '.btn-cancel', function() {
	    var replayForm = $(this).parents('.reply-form');
	    replayForm.hide();
	});

	// 回复内容 250180921
	$('.ct-comment').on('click', '.btn-sure', function() {
	    // 判断文本内容非空
	    if ($(this).hasClass('dis')) {
	        return false;
	    }
	    // 判断回复盒子是否存在，不存在创造追加
	    if (!$(this).parents('li').find('.reply-box').length) {
	        $(this).parents('li').append('<div class="reply-box"></div>');
	    }

	    var msgHtml = '<div class="com-box">' +
	        '<a href="#" class="fll avatar">' +
	        '<img src="images/avatar.gif" height="30" width="30">' +
	        '</a>' +
	        '<div class="info"><strong><a href="#">痞先森</a></strong>  回复 <strong><a href="#">木白的白目</a></strong><span class="time">8小时前</span></div>' +
	        '<div class="info">' +
	        '梵高展的时候有看过油画动画的部分展示，很遗憾没认真仔细的去研究。' +
	        '<div class="btn-box">' +
	        '<a href="javascript:;" class="btn-replay"><span class="icon-comment"></span><span class="btn-replay-txt"> 回复</span></a>' +
	        '<a href="javascript:;" class="btn-praise"><span class="icon-praise2"></span> 赞</a>' +
	        '<a href="javascript:;" class="btn-selected">精选</a>' +
	        '<a href="javascript:;" class="btn-report report"><span class="icon-jubao"></span> 举报</a>' +
	        '<a href="javascript:;" class="btn-del">删除</a>' +
	        '</div>' +
	        '</div>' +
	        '<div class="reply-form" style="display: none;">' +
	        '<textarea class="text" placeholder="回复 痞先森 :"></textarea>' +
	        '<div class="btn-box">' +
	        '<div class="fr">' +
	        '<a href="javascript:;" class="btn btn-sure">回复</a>' +
	        '</div>' +
	        '</div>' +
	        '</div>' +
	        '</div>';
	    $(this).parents('li').find('.reply-box').append(msgHtml).scrollTop(999999);
	    $(this).parents('.reply-form').find('.text').val('');
	});

	// 判断评论框字数是否输入
	$('.ct-comment-box .textarea').bind('input propertychange', function() {
	    var _this = $(this);
	    if (_this.val().length > 0) {
	        _this.css('background', '#fff');
	        _this.parents('.ct-comment-box').find('.btn-comment').removeClass('dis');
	    } else {
	        _this.css('background', '#f7f8fa');
	        _this.parents('.ct-comment-box').find('.btn-comment').addClass('dis');
	    }
	});
	// 判断回复框字数是否输入
	$.each($('.ct-comment').find('.text'), function(index, val) {
	    var _this = $(this);
	    _this.bind('input propertychange', function() {
	        if (_this.val().length > 0) {
	            _this.parents('.reply-form').find('.btn-sure').removeClass('dis');
	        } else {
	            _this.parents('.reply-form').find('.btn-sure').addClass('dis');
	        }
	    });
	});

	// 监听input字数
	if ($('.ct-comment-box .textarea').length) {
	    monitorVal('.ct-comment-box .textarea', 500, 'minus');
	    $.each($('.ct-comment .text'), function(i) {
	        monitorVal($(this), 500, 'minus');
	    });
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