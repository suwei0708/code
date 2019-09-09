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
        console.log(11)
        $(this).addClass('active').siblings('.item').removeClass('active');
        $('.casino-cont').hide().eq($(this).index()).show();
    });

    // 顶部微信
    $('.my-call').on('click', function() {
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
        loginname = $("#loginname").val();
        password = $("#password").val();
        passwordConfirm = $("#passwordConfirm").val();
        captcha = $("#captcha").val();
        webtoken = $("#webtoken").val();
        phone_value = $("#phone_re").val();
        var realName = $("#realName").val();
        var verifyCode = 'n' + $("#loginname").val();
        var emailValue = $("#email").val();
        if (checkLoginname() && check_passwd() && check_passwdconfirm() && checkRealName() && checkPhone() && check_email() && checkCaptcha()) {
            console.log(111)
        }
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
    } else if (password.length < 8 || password.length > 16 || !(/[a-zA-Z]+/.test(password)) || !(/\d+/.test(password))) {
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