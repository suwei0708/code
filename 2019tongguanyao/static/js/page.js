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
				$('.page1').show();
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
var result = [];

function initPageEvents() {
	// 防止拖动出现黑块
	// document.body.addEventListener('touchmove', bodyScroll, { passive: false });
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
		console.log($('#form').serialize())
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

	document.body.addEventListener("focusout", () => {
	    //软键盘收起的事件处理
	    setTimeout(() => {
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

function hanldeAnimate(curIndex) {
    // 找到有[data-anim]属性的DOM元素，分别给它们加上data-anim设定的动画classname
    $('.page').find('[data-anim]').each(function() {
        $(this).removeClass($(this).data('anim'));
    });
    $('.page').eq(curIndex).find('[data-anim]').each(function() {
        $(this).addClass($(this).data('anim'));
    });
}