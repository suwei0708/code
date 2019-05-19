const newLocal = $(this).nextAll('.ct');
$(function() {
    // 首页轮播
    if($('.swiper1').find('.swiper-slide').length > 1) {
        var mySwiper = new Swiper('.swiper1',{
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            loop : true
        })
    };

    // 下拉
    $('.header-menu').on('click', function(e) {
        if ($('.header-menu-sub').is(':visible')) {
            $('.header-menu-sub').slideUp();
        }
        else {
            $('.header-menu-sub').slideDown();
        }
        e.stopPropagation()
    });
    $('body').on('click', function() {
        if ($('.header-menu-sub').is(':visible')) {
            $('.header-menu-sub').slideUp();
        }
    });

	// 公告滚动
	if($('.header-scroll').length) {
		$('.header-scroll').txtscroll({ 'speed': 10 });
    };

    // 登入
    $('.login').find('.text').on('focus', function() {
        $('.err-tips').hide();
    });
    $('.login').on('click', '.btn', function() {
        var i = 0;
        if(!$('.err-tips').length) {
            $('.login').find('.text:last()').after('<div class="err-tips"></div>');
        }
        $.each($('.login').find('.text'), function () {
            if(!$.trim($(this).val())) {
                $('.err-tips').html('帳號或密碼不能為空！').show();
                return false;
            }
            i++;
            if(i == $('.login').find('.text').length) {
                $('.login').find('.text').val('');
                console.log('登入成功')
            }
        });
    });

    // 公告展开收缩
    $('.gg-list').on('click', '.tit', function() {
        var $dom = $(this).parents('.gg-list-item').find('.ct');
        var _this = $(this);
        if($dom.is(':hidden')) {
            $('.gg-list').find('.tit').removeClass('cur');
            $(this).addClass('cur');
            $('.gg-list').find('.ct').slideUp();
            $dom.slideDown(400, function() {
                $('html, body').animate({
                    scrollTop: _this.parents('.gg-list-item').offset().top - $('.header').outerHeight()
                }, 500);
            });
        }
        else {
            $(this).removeClass('cur');
            $dom.slideUp();
        }
    });

    // 转换公告字体大小
    if($('.gg-list').length) {
        pxToRem($('.gg-list'));
    };

    /** 储值流程 start */
    // 判断点数储值是否输入
    $('.chuzhi .text').bind('input propertychange', function() {
        var _this = $(this);
        var minNum = +_this.parents('.chuzhi').find('.condition span').html().replace(',', '');
        if (_this.val().length > 0 && +$.trim(_this.val()) >= minNum) {
            _this.parents('.chuzhi').find('.btn-sure').removeClass('dis');
        }
        else {
            _this.parents('.chuzhi').find('.btn-sure').addClass('dis');
        }
    });

    // 第二步
    $('.chuzhi').on('click', '.btn-sure', function() {
        if(!$(this).hasClass('dis')) {
            $('.chuzhi').find('.steps > div:eq(1)').addClass('cur');
            $('.chuzhi').find('.steps-ct').removeClass('show').eq(1).addClass('show');
        }
    });
    // 返回上一步
    $('.chuzhi').on('click', '.btn-prev', function() {
        $('.chuzhi').find('.steps > div:eq(1)').removeClass('cur');
        $('.chuzhi').find('.steps-ct').removeClass('show').eq(0).addClass('show');
    });
    // 申请充值
    $('.chuzhi').on('click', '.btn-chongzhi', function() {
        if(!$(this).hasClass('dis')) {
            $('.chuzhi').find('.steps > div:eq(2)').addClass('cur');
            $('.chuzhi').find('.steps-ct').removeClass('show').eq(2).addClass('show');
        }
    });
    // 判断是否选中充值方式
    $('.chuzhi').on('click', '.radio', function() {
        $('.chuzhi').find('.btn-chongzhi').removeClass('dis');
    });

    /** 储值流程 end */
});

function pxToRem(dom) {
    var str = dom.html();
    var reg = /(\:|: )+(\d)+(px)/gi;
    var newStr= str.replace(reg, function(_x){
        _x = _x.replace(/(\:|: )/,'').replace(/px/i,'');
        return ':' + parseFloat(_x) * 2 / 75 + 'rem';
    });
    dom.html(newStr);
}

// 无缝滚动插件
;(function($){"use strict";$.fn.txtscroll=function(options){var settings=$.extend({'speed':50},options);return this.each(function(){var $this=$(this);var $settings=settings;var scrollbox=$('.scrollbox',$this);var txt_begin=$('.txt',$this);var txt_end=$('<div class="txt-clone"></div>');var scrollVaue=0;function marquee(){if(txt_end.width()-scrollbox.scrollLeft()<=0){scrollVaue=scrollbox.scrollLeft()-txt_begin.width();scrollbox.scrollLeft(scrollVaue);}else{scrollVaue=scrollVaue+1;scrollbox.scrollLeft(scrollVaue);}}
if(txt_begin.width()>scrollbox.width()){txt_end.html(txt_begin.html());scrollbox.append(txt_end);var setmarquee=setInterval(marquee,$settings.speed);$this.on('mouseover',function(){clearInterval(setmarquee);});$this.on('mouseout',function(){setmarquee=setInterval(marquee,$settings.speed);});}});};})(jQuery);