/**
 * app 模块
 *
 * @namespace
 */
var app = {};
var isClick = 1;
app.width;
app.height;
app.loop = false; // 循环展示
app.DEFAULT_WIDTH = 750;
app.DEFAULT_HEIGHT = 1334;
app.baseUrl = 'static/img/';
app.music = $('#bg')[0];
app.audio = $('#audio')[0];

app.init = function() {
    //微信下兼容音乐处理
	if (app.audio) { app.audio.play() }
	document.addEventListener('WeixinJSBridgeReady', function() {
	    app.audio.play();
	}, false);

    // 加载完成后隐藏loading
	var the_images = [];

    $.each($('#content img'), function() {
        the_images.push($(this).attr('src'));
    });
    $.imgpreload(the_images, {
		each: function(i) {
		    var status = $(this).data('loaded') ? 'success' : 'error';
		    if (status == 'success') {
		        var v = (i.length / the_images.length).toFixed(2);
		        $('.percentage span').width(Math.round(v * 100) + '%');
		        $('#percentage').html('loading ' + Math.round(v * 100) + '%');
		    }
		},
        all: function() {
            setTimeout(function() {
				$('.loading').fadeOut();
				$('.page2').show();
				hanldeAnimate(0);
				// if (app.audio) { app.audio.play() }
				// document.addEventListener('WeixinJSBridgeReady', function() {
				// 	app.audio.play();
				// }, false);
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
var arr = [];

function initPageEvents() {
	// 防止拖动出现黑块
	// document.body.addEventListener('touchmove', bodyScroll, { passive: false });
	$('.p1-btn').on('click', function() {
		$('.page').hide();
		$('.page2').show();
	});
	$('.p').css({
		'height': $(window).height()
	})
	// form提交
    $('.btn-tijiao').on('click', function() {
        if (!isClick) { return false; }
        if (!$.trim($('#form input[name=name]').val())) {
            alertTips('姓名不能为空！');
            return false;
        }
        if (!$.trim($('#form input[name=sex]:checked').val())) {
            alertTips('请选择性别！');
            return false;
		}

		isClick = 0;
		var name = $.trim($('#form input[name=name]').val());
		var data = {
			'p2': ['#6ad0e6', '#febb74', '#86a3dd', '#b36ec1'],
		    'p3': [name + '对一切冰凉的食物都充满占有欲', name + '对世界的认知只有“命是空调给的”', name + '对碳水饮料报以热枕', '天气一热，' + name + '的耐心会渐渐消失'],
		    'p4': ['发呆会让' + name + '感到心情愉悦', name + '是个天真无邪的物种，对人类没有防备心', name + '有点呆萌，但是偶尔为之', name + '的笑容会把空气变甜，小心被齁到'],
		    'p5': ['不要让' + name + '做选择，再难，TA也会挺过去', name + '为易胖体质，不自觉会频繁喂食', name + '是一种拥有强大自愈能力的稀有品种', name + '脑子里可能有矿，每天都能开放出不同宝藏'],
		    'p6': [name + '依靠吃来恢复精力，要给TA足够的空间哦', name + '除了睡觉时间不睡觉，其余时间都想睡觉', name + '有时会背对人类，静静思考', name + '宅在家里会长蘑菇，记得常常带TA出去溜达'],
		    'p7': [name + '是一个看起来高冷，被关怀后温暖呆萌的物种', name + '这种神奇生物总能找到一件事，令TA喜悦的部分，并将之放大', name + '喜欢安静，请给TA安置一个清净小窝', '宅在家里会长蘑菇，记得常常带TA出去溜达', name + '本物种天下仅此一只，要正确温柔的对待TA哦', name + '心情不好的时候，就给TA讲个冷笑话吧', name + '可爱极易令人上瘾，可能引发“一天不吸，浑身难受”症状', name + '的孩子气让TA拥有与年龄不符的长相，请不要感到惊讶']
		};
		console.log(data);
		$('.spinner-box').show();
		// $('#ringoImage').attr('src', './static/img/result' + arr[0] + '.jpg ');

		setTimeout(function() {
		    // canvas画图
		    var sampleImage = document.getElementById('ringoImage'),
		        ecode = document.getElementById('ecode'),
		        canvas = convertImageToCanvas(sampleImage, ecode, name, data);
		    document.getElementById('canvasHolder').appendChild(canvas);
		    document.getElementById('pngHolder').appendChild(convertCanvasToImage(canvas));
		    $('.spinner-box, .page').hide();
		    $('.page4').fadeIn();
		    isClick = 1;
		}, 500);
        return false;
	});

	arr.length = $('.page2').find('.p').length - 1;

	// 选中
	$('.box').on('click', 'img', function() {
	    var _this = $(this);
		if(_this.parents('.p').hasClass('p8')) {
			if(_this.parents('.box').find('.cur').length < 6) {
				if(_this.hasClass('cur')) { return false}
				$.each($('.select').find('div'), function() {
					if (!$(this).html()) {
						$(this).html('<img src="./static/img/p8-' + _this.attr('data-option') + '.png">' + '<img class="text" src="./static/img/p8-t' + _this.attr('data-option') + '.png">' + '<div class="close" data-option="' + _this.attr('data-option') + '">X</div>');
						return false;
					}
				});
				_this.parents('.box').find('[data-option=' + _this.attr('data-option') + ']').addClass('cur');
			}
		}
		else {
			var index = _this.parents('.p').index();
			$(this).addClass('cur').siblings().removeClass('cur');
			arr[index] = _this.attr('data-option');
		}
	});

	$('.select').on('click', '.close', function() {
		var _this = $(this);
		$.each($('.p8').find('.cur'), function() {
			if ($(this).attr('data-option') == _this.attr('data-option')) {
				$(this).removeClass('cur');
			}
		});
		$(this).parent('div').html('');
	})
	.on('click', '.btn', function() {
		var i = 0;
		$.each($('.select > div'), function(j) {
			if ($(this).html()) {
				i++;
			}
		});
		var option = 0;
		if(i == 3) {
			// $.each(arr, function (i) {
			// 	if(typeof(arr[i]) == 'undefined') {
			// 		$('.scroll').animate({
			// 			scrollTop: i * $(window).height()
			// 		}, 200);
			// 		alertTips('这道题还没答哦~')
			// 		return false;
			// 	}
			// 	else {
			// 		option++
			// 	}
			// });
			// if (option == arr.length) {
			// 	$('.page').hide();
			// 	$('.page3').show();
			// }
			$('.page').hide();
			$('.page3').show();
		}
		else {
			alertTips('请选择3种消夏食物');
		}
	})

	document.body.addEventListener("focusout", function() {
	    //软键盘收起的事件处理
	    setTimeout(function() {
	        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
	        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
	    }, 100);
	});

}

// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image, ecode, name, data) {
	console.log(arr);
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    ctx.save(); //保存状态
    ctx.drawImage(image, 0, 0, 750, 1212);
	ctx.drawImage(ecode, 545, 1033, 88, 88);
	var img11 = $('.select').children('div:eq(0)').find('img:eq(0)')[0];
	var img21 = $('.select').children('div:eq(1)').find('img:eq(0)')[0];
	var img31 = $('.select').children('div:eq(2)').find('img:eq(0)')[0];
	var cw = 170,
	    ch = 165,
		dw = (cw - img11.width) / 2,
		dh = (ch - img11.height) / 2;
		console.log(cw / ch, img11.width / img11.height)
		console.log(cw / ch, img21.width / img21.height)
		console.log(cw / ch, img31.width / img31.height)
	if (cw / ch > img11.width / img11.height) {
	}
	ctx.drawImage(img11, -dw, -dh, cw, img11.height * ch / img11.width, 122, 414, cw, ch);
	ctx.drawImage(img21, -dw, -dh, cw, ch, 297, 414, img21.width, img21.height);
	ctx.drawImage(img31, dw, dh, cw, ch, 471, 414, img31.width, img31.height);
	console.log(img11.width, img11.height);

    ctx.fillStyle = '#333'; // 文字填充颜色
    ctx.font = '34px Microsoft Yahei';
	ctx.fillText(name, 548, 198);

    ctx.font = '38px Microsoft Yahei';
	ctx.fillText(name, 120, 313);

    ctx.font = '16px Microsoft Yahei';
    ctx.fillText(data.p3[1], 149, 698);
    ctx.fillText(data.p4[1], 149, 730);
	ctx.fillText(data.p5[1], 149, 764);

	ctx.fillText(data.p6[1], 149, 898);
	ctx.fillText(data.p7[6], 149, 930);

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

function hanldeAnimate(curIndex) {
    // 找到有[data-anim]属性的DOM元素，分别给它们加上data-anim设定的动画classname
    $('.page').find('[data-anim]').each(function() {
        $(this).removeClass($(this).data('anim'));
    });
    $('.page').eq(curIndex).find('[data-anim]').each(function() {
        $(this).addClass($(this).data('anim'));
    });
}