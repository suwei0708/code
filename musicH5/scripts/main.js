var window_w = $(window).width();
var isPlay = true;
var score = 0,
	$r_img = $('#result'),
	$sr_img = $('#shareImg'),
	r_type = 1;
$('html').css({
	'font-size':(window_w > 750 ? 750 : window_w)/10+'px'
})
window.addEventListener('resize',function () {
	window_w = $(window).width()
	$('html').css({
		'font-size':(window_w > 750 ? 750 : window_w)/10+'px'
	})
});
$('document').ready(function () {
	var music = $('#bgm')[0];
	var _me = $('#music-icon');
	if (music) { music.play(); }
	document.addEventListener("WeixinJSBridgeReady", function() {
	    if (_me.hasClass('closeState')) {
	        music.pause();
	    } else {
	        music.play();
	    }
	}, false);
	var bgm = document.querySelector('#bgm');
	bgm.addEventListener('play',function () {
		$('#music-icon').removeClass('closeState');
	})
	bgm.addEventListener('pause',function () {
		$('#music-icon').addClass('closeState');
	})
	$('#music-icon').on('click',function () {
		if ($(this).hasClass('closeState')){
			bgm.play();
			isPlay = true;
		}else {
			bgm.pause();
			isPlay = false;
		}
	});
	function loadAssets(updating,callBack) {
		var imgs = [
			'imgs/bg.png',
			'imgs/poster/poster_btn.png',
			'imgs/poster/poster_icons.png',
			'imgs/poster/poster_title.png',
			'imgs/poster/next.png',
			'imgs/question/a.png',
			'imgs/question/b.png',
			'imgs/question/c.png',
			'imgs/question/pic_box.png',
			'imgs/question/girl.png',
			'imgs/question/boy.png',
			'imgs/question/q1.png',
			'imgs/question/q2.png',
			'imgs/question/q3.png',
			'imgs/question/question_box.png',
			'imgs/result/link.png',
			'imgs/result/r1.png',
			'imgs/result/r2.png',
			'imgs/result/r3.png',
			'imgs/result/r4.png',
			'imgs/result/r5.png',
			'imgs/result/r6.png',
			'imgs/result/sr_1.jpg',
			'imgs/result/sr_2.jpg',
			'imgs/result/sr_3.jpg',
			'imgs/result/sr_4.jpg',
			'imgs/result/sr_5.jpg',
			'imgs/result/sr_6.jpg',
			'imgs/result/restart.png',
			'imgs/result/share.png'
		];
		function loadImage(src, callback) {
			var image = new Image();
			image.onload = callback;
			image.src = src;
		}
		var imgLoadCount = 0;
		imgs.map(function (item) {
			loadImage(item,function () {
				imgLoadCount++;
			})
		});
		var complete = setInterval(function() {
			if(imgLoadCount === imgs.length){
				clearInterval(complete);
				callBack && callBack();
			}
			else {
				var num = parseInt(imgLoadCount*100/imgs.length);
				if(num<100){
					updating && updating(num);
				}
			}
		},20);
	}

	function logic() {

		var mainSwiper = new Swiper ('#mainSwiper', {
			direction: 'horizontal', // 垂直切换选项
			loop: false, // 循环模式选项
		})

		var swiper06 = new Swiper ('#swiper06', {
			direction: 'horizontal', // 垂直切换选项
			loop: true, // 循环模式选项,
			autoplay:{
				delay: 2000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			}
		})

		var swiper07 = new Swiper ('#swiper07', {
			direction: 'horizontal', // 垂直切换选项
			loop: true, // 循环模式选项,
			autoplay:{
				delay: 2000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			}
		})

		var swiper09 = new Swiper ('#swiper09', {
			direction: 'horizontal', // 垂直切换选项
			loop: true, // 循环模式选项,
			autoplay:{
				delay: 2000,
				stopOnLastSlide: false,
				disableOnInteraction: true,
			}
		})
		var audio = 'imgs/bingbian.mp3';
		var audio1 = 'imgs/zengxi.mp3';
		var audio2 = 'imgs/luotuo.mp3';
		var $audio = $('#audio');
		$('#play').on('click',function () {
			$(this).hide();
			$audio.attr('src', audio)[0].play();
			bgm.pause();
		});
		$('#play1').on('click', function() {
		    $(this).hide();
			$audio.attr('src', audio1)[0].play();
			bgm.pause();
		});
		$('#play2').on('click', function() {
		    $(this).hide();
			$audio.attr('src', audio2)[0].play();
			bgm.pause();
		});
		$audio[0].addEventListener('ended', function() {
			$('.play').show();
			if (isPlay) {
			    bgm.play();
			}
		})
		$('#restart').on('click',function () {
			$('.play').show();
			$('.answer').removeClass('selected');
			score = 0;
			$sr_img.attr('src','');
			mainSwiper.slideTo(0, 0, false);
		});

		$('#share').on('click',function () {
			$sr_img.attr('src','imgs/result/sr_'+r_type+'.jpg')
			$('#shareModal').show();
		});

		$('#close').on('click',function () {
			$('#shareModal').hide();
		});

		$('#start').on('click',function () {
			mainSwiper.slideNext()
		});

		$('.answer').on('click',function () {
			$(this).addClass('selected').siblings().removeClass('selected')
		})

		$('.next-btn').on('click',function () {
			var selected = $(this).parent().find('.answer-box .answer.selected'),
				s = selected.attr('data-score');

			if (selected.length == 0){
				alert('请选择答案');
				return;
			}else {
				score += parseInt(s);
				if (score <= 15){
					r_type = 4
					$r_img.attr('src','imgs/result/r4.png')
				}else if (score > 15 && score <=25){
					r_type = 5
					$r_img.attr('src','imgs/result/r5.png')
				}else if (score > 115 && score <=125){
					r_type = 3
					$r_img.attr('src','imgs/result/r3.png')
				}else if (score > 125){
					r_type = 1
					$r_img.attr('src','imgs/result/r1.png')
				}else if (score > 25 && score<100 ){
					r_type = 2
					$r_img.attr('src','imgs/result/r2.png')
				}else if (score >= 100 && score <= 115){
					r_type = 6
					$r_img.attr('src','imgs/result/r6.png')
				}
				mainSwiper.slideNext();
				$audio[0].pause();
				if(isPlay) {
					bgm.play();
				}
			}
		})

		$('#back').on('click',function () {
			mainSwiper.slidePrev();
		});
	}

	loadAssets(function (percent) {
		$('#loading').find('.modal-inner').html(percent+'%')
	},function () {
		$('#loading').find('.modal-inner').html(100+'%');
		$('#loading').fadeOut();
		$('#mainSwiper').show();
//		$('#danmu').addClass('move');

		setTimeout(function () {
			$('#start').fadeIn();
			logic();
		},0);
	})
});