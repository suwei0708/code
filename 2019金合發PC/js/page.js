$(function() {
	$('.bell').on('mouseover', function() {
		$('.notify-pop').show();
	});
	$('.notify-pop').on('mouseover', function() {
	    $(this).show();
	}).on('mouseout', function() {
	    $(this).hide();
	});

	$('.eyes').on('click', function() {
		if($(this).hasClass('open')) {
			$(this).removeClass('open');
			$(this).prevAll('.pword')[0].type = "password";
		}
		else {
			$(this).addClass('open');
			$(this).prevAll('.pword')[0].type = "text";
		}
	})
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
    // 首页banner
    if ($('#sld2').length) {
        $('#sld2').slides({
            generatePagination: true,
            generateNextPrev: false,
            play: 3000,
            pause: 2500,
            hoverPause: true,
        });
    };

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

});