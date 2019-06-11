/**
 * app 模块
 *
 * @namespace
 */
var app = {};
var resultNum = 0;
var isClick = 1;
app.width;
app.height;
app.loop = false; // 循环展示
app.DEFAULT_WIDTH = 750;
app.DEFAULT_HEIGHT = 1334;
app.baseUrl = 'static/img/';
app.music = $('#bg')[0];
app.audio = $('#audio')[0];

app.mxuanwo = 'static/music/xuanwo.mp3';
app.mmijing = 'static/music/mijing.mp3';
app.maicao = 'static/music/aicao.mp3';
app.mxiangnang = 'static/music/xiangnang.mp3';
app.mzhiyuan = 'static/music/zhiyuan.mp3';
app.mzongzi = 'static/music/zongzi.mp3';
app.mlongzhou = 'static/music/longzhou.mp3';

app.init = function() {
    //微信下兼容音乐处理
	if (app.audio) { app.audio.play() }
	document.addEventListener('WeixinJSBridgeReady', function() {
	    app.audio.play();
	}, false);

    // 加载完成后隐藏loading
	var the_images = [app.baseUrl + 'a-loading.png', app.baseUrl + 'start.png', app.baseUrl + 'a-chuan.png', app.baseUrl + 'a-gu.png', app.baseUrl + 'a-laoren.png', app.baseUrl + 'a-xiangnang.png', app.baseUrl + 'a-zongzi.png', app.baseUrl + 'a-fengzheng1.png', app.baseUrl + 'a-fengzheng2.png', app.baseUrl + 'a-fengzheng3.png', app.baseUrl + 'a-longzhou.png', app.baseUrl + 'haibao1.jpg', app.baseUrl + 'haibao2.jpg', app.baseUrl + 'haibao3.jpg', app.baseUrl + 'haibao4.jpg', app.baseUrl + 'haibao5.jpg'];

    $.each($('#content img'), function() {
        the_images.push($(this).attr('src'));
    });
    $.imgpreload(the_images, {
        all: function() {
            setTimeout(function() {
				$('.loading').fadeOut();
				$('.page1').show();
				if (app.audio) { app.audio.play() }
				document.addEventListener('WeixinJSBridgeReady', function() {
					app.audio.play();
				}, false);
				$('.page1').find('.p1-msg1').fadeIn(400, function() {
					$('.page1').find('.p1-msg1').delay(1500).fadeOut();
					$('.page1').find('.p1-msg2').delay(1500).fadeIn(400, function() {
						$('.page1').find('.p1-msg2').delay(1000).fadeOut();
						$('.page1').find('.p1-msg3').delay(1000).fadeIn(400, function() {
							$('.page1').find('.p1-bq').addClass('cur');
							$('.page1').find('.p1-hand').delay(500).fadeIn(500, function() {
								app.audio.pause();
							});
						});
					});
				});
            }, 500);
        }
    });
    // 初始化音乐按钮
    // initMusic();
};

/**
 * ==============================
 * 页面主要JS逻辑交互
 * ===============================
 */
$(function() {
	app.init();
    initPageEvents();
});

/**
 * 页面交互事件的初始化写这里
 */
var result = [];

function initPageEvents() {
	// 防止拖动出现黑块
	document.body.addEventListener('touchmove', bodyScroll, { passive: false });

	var chuanTop = +$('.qj-chuan').offset().top;
	$('.p1-msg3, .p1-hand').on('click', function() {
		$('.page-start').show();
		app.audio.src = app.mxuanwo;
		app.audio.play();
		app.music.play();
		setTimeout(function() {
			$('.page-start').fadeOut();
			$('.page1').hide();
			$('.page-noswiper').show();

			document.body.removeEventListener('touchmove', bodyScroll, { passive: false });
			$('.page2').fadeIn(400, function() {
				chuanTop = +$('.qj-chuan').offset().top;
				$('.qj-hand').show();
				$('.qj-drop').animate({
				    'left': '-10px'
				}, 1500, function() {
				    $('.qj-drop').fadeOut(400, function() {
						app.audio.src = app.mmijing;
						app.audio.play();
						$('.qj-chuan').addClass('a-chuan');
						$('.page-noswiper').hide();
				    });
				});
			});
		}, 500);
	});

	$('.scroll').on('scroll', function() {
		$('.qj-hand').fadeOut(1000);
		var $pos = $('.scroll').scrollTop();
		$('.qj-chuan').css({
			top: $pos + chuanTop
		});
		if ($pos >= 12100) {
			if (app.audio.src.match(/2019duanwu\/(\S*)/)[1] != app.mlongzhou) {
			    app.audio.src = app.mlongzhou;
			    app.audio.play();
			}
			else {
			    if (app.audio.pause) {
			        app.audio.play();
			    }
			}
		}
		else if ($pos >= 10530 && $pos < 11800) {
			if (app.audio.src.match(/2019duanwu\/(\S*)/)[1] != app.mzongzi) {
			    app.audio.src = app.mzongzi;
			    app.audio.play();
			}
			else {
			    if (app.audio.pause) {
			        app.audio.play();
			    }
			}
		}
		else if ($pos >= 8200 && $pos < 9000) {
			if (app.audio.src.match(/2019duanwu\/(\S*)/)[1] != app.mzhiyuan) {
			    app.audio.src = app.mzhiyuan;
			    app.audio.play();
			}
			else {
			    if (app.audio.pause) {
			        app.audio.play();
			    }
			}
		}
		else if ($pos >= 5300 && $pos < 6720) {
			if (app.audio.src.match(/2019duanwu\/(\S*)/)[1] != app.mxiangnang) {
			    app.audio.src = app.mxiangnang;
			    app.audio.play();
			}
			else {
			    if (app.audio.pause) {
			        app.audio.play();
			    }
			}
		}
		else if ($pos >= 3530 && $pos < 5070) {
			if (app.audio.src.match(/2019duanwu\/(\S*)/)[1] != app.maicao) {
			    app.audio.src = app.maicao;
			    app.audio.play();
			}
			else {
			    if (app.audio.pause) {
			        app.audio.play();
			    }
			}
		}
		else if ($pos < 1530) {
			if (app.audio.src.match(/2019duanwu\/(\S*)/)[1] != app.mmijing) {
				app.audio.src = app.mmijing;
				app.audio.play();
			}
			else {
				if (app.audio.pause) {
				    app.audio.play();
				}
			}
		}
		else {
			app.audio.pause();
		}
	});

	$('.btn-duanwu').on('click', function() {
	    $('.page2').hide();
		$('.page3').fadeIn();
	});

	$('.btn-tongyi').on('click', function() {
		document.body.addEventListener('touchmove', bodyScroll, { passive: false });
	    $('.page3').hide();
	    $('.page4').fadeIn();
	});

	$('.btn-tslx').on('click', function() {
	    $('.page4').hide();
	    $('.page5').fadeIn();
	});

	$('.btn-fanhui').on('click', function() {
	    $('.page5').hide();
	    $('.page4').fadeIn();
	});

	$('.dot').on('click', function() {
		$(this).prev('.tips').fadeIn();
	});
	$('.tips').on('click', function() {
		$(this).fadeOut();
	});
	$('.tips-an').on('touchstart', function() {
		$(this).hide();
		return false;
	});
	$('.tips-an').on('click', function() {
		$(this).hide();
		return false;
	});

	// 预览
	$('.btn-yulan').on('click', function() {
		if (!isClick) { return false; }
		if (!$.trim($('#form input[name=impression]:checked').val())) {
			alertTips('请选择端午印象！');
			return false;
		}
		if (!$.trim($('#form input[name=name]').val())) {
			alertTips('姓名不能为空！');
			return false;
		}
		if (!$.trim($('#form input[name=mobile]').val())) {
			alertTips('电话号码不能为空！');
			return false;
		}
		if (!(/^1\d{10}$/.test($.trim($('#form input[name=mobile]').val())))) {
			alertTips('电话号码格式不正确');
			return false;
		}
		if (!$.trim($('#form select[name=date] option:selected').val())) {
			alertTips('日期不能为空！');
			return false;
		}
		isClick = 0;

		$('.spinner-box').show();
		$('#ringoImage').attr('src', './static/img/haibao' + $('#form input[name = impression]:checked').val() + '.jpg ')

		setTimeout(function() {
			// canvas画图
			var sampleImage = document.getElementById('ringoImage'),
			    ecode = document.getElementById('ecode'),
			    name = $.trim($('#form input[name=name]').val()),
			    times = $.trim($('#form select[name=date] option:selected').val()),
			    canvas = convertImageToCanvas(sampleImage, ecode, name, times);
			document.getElementById('canvasHolder').appendChild(canvas);
			document.getElementById('pngHolder').appendChild(convertCanvasToImage(canvas));
			$('.tips-an').show();
			$('.page6').fadeIn();
			$('.spinner-box, .page4').hide();
			isClick = 1;
		}, 500);
	});

    // form提交
    $('.btn-tijiao').on('click', function() {
        if (!isClick) { return false; }
        if (!$.trim($('#form input[name=impression]:checked').val())) {
            alertTips('请选择端午印象！');
            return false;
        }
        if (!$.trim($('#form input[name=name]').val())) {
            alertTips('姓名不能为空！');
            return false;
        }
        if (!$.trim($('#form input[name=mobile]').val())) {
            alertTips('电话号码不能为空！');
            return false;
        }
        if (!(/^1\d{10}$/.test($.trim($('#form input[name=mobile]').val())))) {
            alertTips('电话号码格式不正确');
            return false;
        }
        if (!$.trim($('#form select[name=date] option:selected').val())) {
            alertTips('日期不能为空！');
            return false;
		}
		alertTips('活动已经结束，感谢关注！');
        // isClick = 0;
		// $('.spinner-box').show();
        // $.ajax({
		// 	url: 'https://m.xinliling.com/trees?type=4',
		// 	type: 'POST',
		// 	dataType: 'json',
		// 	data: $('#form').serialize()
		// })
		// .done(function(res) {
		// 	alertTips('报名成功！');
		// })
		// .fail(function(res) {
		// 	if (res.status == 422) {
		// 		alertTips(res.responseText);
		// 	} else {
		// 		alertTips('网络错误，请稍后重试');
		// 	}
		// })
		// .always(function() {
		// 	isClick = 1;
		// 	$('.spinner-box').hide();
		// });
        return false;
	});

	$('.page6').on('click', function() {
		$(this).hide();
		$('.page4').show();
	});

	document.body.addEventListener("focusout", () => {
	    //软键盘收起的事件处理
	    setTimeout(() => {
			console.log(111)
	        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
	        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
	    }, 100);
	});

}

// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image, ecode, name, times) {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    ctx.save(); //保存状态
    ctx.drawImage(image, 0, 0, 750, 1334);

    ctx.drawImage(ecode, 55, 1183, 110, 110);
    ctx.fillStyle = '#000'; // 文字填充颜色
    ctx.font = '29px Microsoft Yahei';
    ctx.fillText(name, 320, 1085);
    ctx.font = '22px Microsoft Yahei';
    ctx.fillText('报名' + times + '时间， 端午假， 自驾去汨罗', 241, 1303);
    ctx.restore(); //恢复状态

    ctx.stroke();

    return canvas;
}

// Converts canvas to an image
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = canvas.toDataURL('image/png');
    return image;
}

function bodyScroll(event) {
    event.preventDefault();
}

var alertTimes;
function alertTips(txt, times) {
    if (!$('.alerttips-box').length) {
        $('#content').append('<div class="alerttips-box"><div class="alerttips"></div></div>');
        $('body').append();
    }
    $('.alerttips').html(txt);
    $('.alerttips-box').show();
    times ? time = times : time = 2000;
    clearTimeout(alertTimes);
    alertTimes = setTimeout(function() {
        $('.alerttips-box').hide();
    }, time);
}