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
		if ($('.footer .cz-list').is(':visible')) {
			$('.footer .cz-list').slideUp();
		}
    });

	// 公告滚动
	if($('.header-scroll').length) {
		$('.header-scroll').txtscroll({ 'speed': 10 });
	};

	// 底部储值
	$('.ft-cz').on('click', function(e) {
		var $dom = $(this).find('.cz-list');
		if ($dom.is(':visible')) {
			$(this).find('.cz-list').slideUp();
		}
		else {
			$(this).find('.cz-list').slideDown();
		}
		e.stopPropagation();
	});

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

	// 会员中心
	$('.form-user').on('click', '.btn', function() {
	    var i = 0;
	    $.each($('.form-user').find('.text'), function(j) {
	        if (!$.trim($(this).val())) {
	            $.msgBox.Alert(null, $(this).prevAll('label').html() + '不能为空！')
	            return false;
			}
			if (j == 0) {
			    if ($.trim($(this).val()).length > 10) {
			        $.msgBox.Alert(null, '请输入正确暱稱！');
			        return false;
			    }
			}
			if (j == 1) {
			    if ($.trim($(this).val()).length < 6 || $.trim($(this).val()).length > 10) {
			        $.msgBox.Alert(null, '请输入正确新帳號密碼！');
			        return false;
			    }
			}
			if (j == 2) {
			    if ($.trim($(this).val()).length < 6 || $.trim($(this).val()).length > 10) {
			        $.msgBox.Alert(null, '请输入正确確認新帳號密碼！');
			        return false;
				}
				if ($.trim($(this).val()) != $.trim($('.form-user').find('.text:eq(1)').val())) {
					$.msgBox.Alert(null, '兩次密碼不壹致！');
					return false;
				}
			}
	        i++;
	        if (i == $('.form-user').find('.text').length) {
	            $('.form-user').find('.text:gt(0)').val('');
	            console.log('修改成功');
	        }
	    });
	});

	// 存款专区
	$('.form-cunkuan').on('change', 'input[type=radio]', function() {
		if($(this).val() == '0') {
			$('.form-cunkuan').find('.text:last()').attr('disabled', false);
		}
		else {
			$('.form-cunkuan').find('.text:last()').attr('disabled', true);
		}
	});

	// 获取二维码
	$('.game-list').on('click', '.getcode', function() {
		$('body').append('<div class="popup-ecode"><img src="' + $(this).attr('data-ecode') + '" alt=""></div>');
		$('.popup-ecode').on('click', function() {
			$(this).remove();
		});
		$('.popup-ecode').on('click', 'img', function() {
		    return false;
		});
	});
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

// alert和confirm美化
// 调用方法, 标题为null则不显示标题
// $.msgBox.Alert('title', 'msg');
// $.msgBox.Confirm('title', 'msg', funcOk, funcNo);
(function() {
    jQuery.msgBox = {
        Alert: function(title, msg) {
            GenerateHtml('alert', title, msg);
            btnOk();
            btnNo();
        },
        Confirm: function(title, msg, callback, callbackno) {
            GenerateHtml('confirm', title, msg);
            btnOk(callback);
            btnNo(callbackno);
        }
    }
    //生成Html
    var GenerateHtml = function(type, title, msg) {
        var _html = '<div id="sw-bg"><div id="sw-con"><a id="sw-close" href="javascript:;"><span class="icon icon-guanbi"></span></a>';
        if (title) {
            _html += '<div id="sw-tit">' + title + '</div>';
        }
        _html += '<div id="sw-msg">' + msg + '</div><div id="sw-btn-box">';

        if (type == 'alert') {
            _html += '<a id="sw-btn-ok" href="javascript:;">确定</a>';
        }
        if (type == 'confirm') {
            _html += '<a id="sw-btn-ok" href="javascript:;">确定</a>';
            _html += '<a id="sw-btn-no" href="javascript:;">取消</a>';
        }
        _html += '</div></div></div>';
        //必须先将_html添加到body，再设置Css样式
        jQuery('body').append(_html);
        GenerateCss();
    }

    //生成css
    var GenerateCss = function() {
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = jQuery('#sw-con').width();
        var boxHeight = jQuery('#sw-con').height();
        //让提示框居中
        jQuery('#sw-con').css({
            top: (_height - boxHeight) / 2 + 'px',
            left: (_widht - boxWidth) / 2 + 'px'
        });
    }
    //确定按钮事件
    var btnOk = function(callback) {
        jQuery('#sw-btn-ok').on('click', function() {
            jQuery('#sw-bg').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function(callback) {
        jQuery('#sw-btn-no, #sw-close').on('click', function() {
            jQuery('#sw-bg').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
})();