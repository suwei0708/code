$(function() {
	// 头部提醒
	$('.bell').on('mouseover', function() {
		$('.notify-pop').show();
	});
	$('.notify-pop').on('mouseover', function() {
	    $(this).show();
	}).on('mouseout', function() {
	    $(this).hide();
	});

	// 头部密码展示与隐藏
	$('.eyes').on('click', function() {
		if($(this).hasClass('open')) {
			$(this).removeClass('open');
			$(this).prevAll('.pword')[0].type = "password";
		}
		else {
			$(this).addClass('open');
			$(this).prevAll('.pword')[0].type = "text";
		}
	});

    // 首页banner
    if($('#sld').length) {
        $('#sld').slides({
            generatePagination: true,
            generateNextPrev: false,
            play: 3000,
            pause: 2500,
            hoverPause: true,
		});
	};

    // 首页轮播2
    if ($('#sld2').length) {
        $('#sld2').slides({
            generatePagination: true,
            generateNextPrev: false,
            play: 3000,
            pause: 2500,
            hoverPause: true,
        });
    };

	// 首页轮播3
	if ($('.slider-box1').length) {
	    //回调函数计数
	    var callbackIndex = 0;
	    $('.slider-box1').mySilder({
	        width: 190, //容器的宽度 必选参数!!!!!!
	        height: 180, //容器的高度 必选参数!!!!!!
	        auto: true, //是否自动滚动
	        autoTime: 5, //自动滚动时，时间间隙，即多长滚动一次,单位(秒)
	        direction: 'x', //滚动方向,默认X方向
	        autoType: 'left', //滚动方向，auto为true时生效
	        few: 1, //一次滚动几个，默认滚动1张
	        showFew: 4, //显示几个,就不用调css了,默认显示一个
	        clearance: 10, //容器之间的间隙，默认为 0
	        silderMode: 'linear', //滚动方式
	        timeGap: 500, //动画间隙，完成一次动画需要多长时间，默认700ms
	        buttonPre: '.btl', //上一个，按钮
	        buttonNext: '.play-next1', //下一个，按钮
	        jz: true, //点击时，是否等待动画完成
	        runEnd: function() { //回调函数
	            callbackIndex++;
	            // $('.cj em').text(callbackIndex);
	        }
	    });
	}
	// 首页轮播4
	if ($('.slider-box2').length) {
	    //回调函数计数
	    var callbackIndex2 = 0;
	    $('.slider-box2').mySilder({
	        width: 190, //容器的宽度 必选参数!!!!!!
	        height: 180, //容器的高度 必选参数!!!!!!
	        auto: true, //是否自动滚动
	        autoTime: 5, //自动滚动时，时间间隙，即多长滚动一次,单位(秒)
	        direction: 'x', //滚动方向,默认X方向
	        autoType: 'left', //滚动方向，auto为true时生效
	        few: 1, //一次滚动几个，默认滚动1张
	        showFew: 4, //显示几个,就不用调css了,默认显示一个
	        clearance: 10, //容器之间的间隙，默认为 0
	        silderMode: 'linear', //滚动方式
	        timeGap: 500, //动画间隙，完成一次动画需要多长时间，默认700ms
	        buttonPre: '.btl2', //上一个，按钮
	        buttonNext: '.play-next2', //下一个，按钮
	        jz: true, //点击时，是否等待动画完成
	        runEnd: function() { //回调函数
	            callbackIndex2++;
	            // $('.cj em').text(callbackIndex);
	        }
	    });
	}

	// 返回顶部
	if ($(window).scrollTop() > 200) {
	    $('#totop2').fadeIn();
	} else {
	    $('#totop2').stop().fadeOut();
	}
	$(window).on('scroll', function() {
	    if ($(window).scrollTop() > 200) {
	        $('#totop2').fadeIn();
	    } else {
	        $('#totop2').stop().fadeOut();
	    }
	});
	$('#totop2').on('click', function() {
	    $('html, body').animate({ scrollTop: 0 }, "slow");
	});

	// 右侧交互
	$(".phonetab").mouseenter(function() {
	    $(".sidebarcontact").css('z-index', 9999);
	    $(".sidebarcontact").css('width', '250px');
	    if ($(".sidebarcontact").hasClass("sclose")) {

	        $(".sidebarcontact").animate({
	            right: 0,
	        }, 300, function() {
	            $(this).removeClass("sclose");

	        });
	    }
	});
	$(".sidebarcontact").mouseleave(function() {
	    $(".sidebarcontact").css('width', '250px');
	    $(".sidebarcontact").css('z-index', 99)
	    $(this).css("left", "inherit");

	    $(".sidebarcontact").animate({
	        right: "-170px",
	    }, 300, function() {
	        $(this).addClass("sclose");

	    });
	});

	// 优惠活动切换
	$('.hd-sidebar').on('click', 'li', function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		$('.hd-section').find('.promo').hide();
		$('.hd-section').find('.' + $(this).find('a').attr('data-page')).show();
	});

	// 注册密码展示与隐藏
	$('.eye').on('click', function() {
	    if ($(this).hasClass('open')) {
	        $(this).removeClass('open');
	        $(this).prevAll('input')[0].type = "password";
	    } else {
	        $(this).addClass('open');
	        $(this).prevAll('input')[0].type = "text";
	    }
	});

	// 银行切换
	$('#bank').on('click', 'a', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});

	// 复制
	$('.membercenter').on('click', '.copy-btn', function() {
		copyToClipboard($(this).attr('id'));
	});

	// 查看正面照片范本
	$('.viewSample').on('click', 'a', function() {
		if ($('#picSample').hasClass('hidden')) {
			$('#picSample').removeClass('hidden');
		}
		else {
			$('#picSample').addClass('hidden');
		}
	});
});

/*复制代码到剪切板*/
function copyToClipboard(obj) {
    var e = document.getElementById(obj + '-cont'); //对象是contents
    e.select(); //选择对象
    document.execCommand("Copy"); //执行浏览器复制命令
};