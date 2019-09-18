$(function() {
    // 首页轮播
    if ($('#indexbanner').length) {
        var indexbanner = new Swiper('#indexbanner', {
            autoplay: true, // 可选选项，自动滑动
            loop: true, // 循环播放
            pagination: {
                el: '.swiper-pagination',
            },
        });
    };
    // 隐藏轮播
    $('#hiddenbanner').on('click', function() {
        $('#indexbanner').hide();
        $('#showbanner').show();
    });
    // 展示轮播
    $('#showbanner').on('click', function() {
        $('#indexbanner').show();
        $('#showbanner').hide();
    });

    // 首页切换
    $('.game-nav').on('click', '.item', function() {
        $(this).addClass('active').siblings('.item').removeClass('active');
        $('.casino-cont').hide().eq($(this).index()).show();
    });

    // 顶部微信
    $('.my-call, #forgotPass, .my-service').on('click', function() {
        $('.customer-service').animate({
            'bottom': 0
        }, 300);
        $('.dd-blur').addClass('show');
    });
    $('.customer-service').on('click', 'ul', function(e) {
        e.stopPropagation();
    });
    $('.customer-service').on('click', function() {
        $('.customer-service').animate({
            'bottom': '-100%'
        }, 300);
        $('.dd-blur').removeClass('show');
    });

    // 注册
    $("#registerbtn").click(function() {
        if (checkLoginname() && check_passwd() && check_passwdconfirm() && checkRealName() && checkPhone() && check_email() && checkCaptcha()) {
            console.log('註冊');
        }
	});

	// 登入
	$("#btnLogin").click(function() {
	    if (checkLoginname() && check_passwd()) {
	        console.log('登入');
	    }
	});

	// 登入是否顯示密碼
	$(".icon-eye").click(function() {
	    $(this).toggleClass("active");
	    if ($(".password").attr("type") == "password") {
	        $(".password").attr("type", "text");
	    } else {
	        $(".password").attr("type", "password");
	    }
	});

	// 公告展开收缩
	$('.promotion-list').on('click', '.tt', function() {
	    var _this = $(this);
	    var $dom = _this.parents('li').find('.ct');
		$('.promotion-list').find('.tt').show();
		_this.hide();
		$('.promotion-list').find('.ct').hide();
		$dom.slideDown(100, function() {
			$('html, body').animate({
				scrollTop: _this.parents('li').offset().top - $('.header').outerHeight() - $('.nav-tab').outerHeight()
			}, 500);
		});
	});

	// 托售绑定身份示例
	$('.viewSample-js').on('click', 'a', function() {
		$('#picSample').toggleClass('hidden');
	});

	// 弹窗关闭
	$('body').on('click', '.popup-close, .popup-box', function() {
	    $('.popup-box').hide();
		$(this).parents('.popup-box').find('.steps-ct').removeClass('show').eq(0).addClass('show');
	});
	$('body').on('click', '.popup', function(e) {
	    e.stopPropagation();
	});

	/** 储值流程 start */
	$('.btn-chuzhi').on('click', function() {
	    $('.popup-chuzhi').show();
	})
	// 判断点数储值是否输入
	$('.chuzhi .text').bind('input propertychange', function() {
	    var _this = $(this);
	    var minNum = +_this.parents('.chuzhi').find('.condition span').html().replace(',', '');
	    if (_this.val().length > 0 && +$.trim(_this.val()) >= minNum) {
	        _this.parents('.chuzhi').find('.btn-sure').removeClass('dis');
	    } else {
	        _this.parents('.chuzhi').find('.btn-sure').addClass('dis');
	    }
	});

	// 第二步
	$('.chuzhi').on('click', '.btn-sure', function() {
	    if (!$(this).hasClass('dis')) {
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
	    if (!$(this).hasClass('dis')) {
	        $('.chuzhi').find('.steps > div:eq(2)').addClass('cur');
	        $('.chuzhi').find('.steps-ct').removeClass('show').eq(2).addClass('show');
	    }
	});
	// 判断是否选中充值方式
	$('.chuzhi').on('click', '.radio', function() {
	    $('.chuzhi').find('.btn-chongzhi').removeClass('dis');
	});
	/** 储值流程 end */

	/** 託售流程 start */
	$('.btn-tuoshou').on('click', function() {
	    $('.popup-tuoshou').show();
	});
	/** 託售流程 end */

	// 一键转回
	$('.onechang').on('click', '.btn', function() {
	    var r = confirm('確定後將會幫您把其他錢包的點數轉至主錢包， 您確定執行嗎 ?');
	    if (r) {
	        console.log('轉回成功');
	    }
	});

	// 转入转出弹窗
	$('.clients_list').on('click', '.btn', function() {
	    $('.popup-zhuandian').find('.steps-ct').removeClass('show').eq(0).addClass('show');
	    if ($(this).attr('data-type')) {
	        if ($(this).attr('data-type') == 'in') {
	            // 转入
	            $('.popup-zhuandian').find('select[name=sFrom]').val(1);
	            $('.popup-zhuandian').find('select[name=sTo]').val($(this).attr('data-id'));
	        } else {
	            // 转出
	            $('.popup-zhuandian').find('select[name=sFrom]').val($(this).attr('data-id'));
	            $('.popup-zhuandian').find('select[name=sTo]').val('');
	        }
	        $('.popup-zhuandian').show();
	    }
	});

	// 电子钱包记录切换
	$('.jilu').on('click', '.user-list li', function() {
	    $(this).find('a').addClass('cur').parent().siblings().find('a').removeClass('cur');
	    $(this).parents('.jilu').find('.user-box').hide().eq($(this).index()).show();
	});
});
//帐号
function checkLoginname() {
    var frm = $("#loginname").val();
    if ($.trim(frm).length < 5) {
        G.toast("请输入5-11位用户名");
        return false;
    }
    if ($.trim(frm).length > 11) {
        G.toast("请输入5-11位用户名");
        return false;
    }
    return true;
}

function check_passwd() {
    var password = $('#password').val();
    if (password == '') {
        G.toast("请输入8-16位密码");
        return false;
	}
	else if (password.length < 8 || password.length > 16) {
        G.toast("请输入8-16位密码");
        return false;
    }
    return true;
}

function check_passwdconfirm() {
    var password = $('#password').val();
    var passwordConfirm = $("#passwordConfirm").val();
    if (password != passwordConfirm) {
        G.toast("两次密码不一致");
        return false;
    }
    return true;
}

function check_email() {
    var regEmail = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    var emailValue = $("#email").val();
    if (emailValue.trim() == '') {
        G.toast('请输入正确的电子邮件');
        return false;
    }
    if (!regEmail.test(emailValue)) {
        G.toast('请输入正确的电子邮件');
        return false;
    }
    return true;
}

function checkPhone() {
    var isphone = /^\d{9}$/,
        ex = /^0/;
    var phone_value = $("#phone_re").val();
    if (!isphone.test(phone_value)) {
        G.toast("请输入正确的手机号码");
        return false;
    }
    if (ex.test(phone_value)) {
        G.toast("请输入正确的手机号码");
        return false;
    }
    if (phone_value == '') {
        G.toast("请输入正确的手机号码");
        return false;
    }

    return true;
}

function checkCaptcha() {
    var captcha = $("#captcha").val();
    if (!captcha || captcha.length != 4) {
        G.toast('请输入正确的验证码');
        return false;
    }
    return true;
}
function checkRealName() {
    var $thisval = $('#realName').val();
    // 检查有没有空格
    if (!$thisval) {
        G.toast('真实姓名不能为空');
        return false;
    }
    return true;
}

var G = {};
G.timer = new Function();
G.toast = function(msg) {
	$('.modal.exp-msg').show().find('p').html(msg);
	clearTimeout(G.timer)
	G.timer = setTimeout(function() {
		$('.modal.exp-msg').fadeOut();
	}, 2000);
}