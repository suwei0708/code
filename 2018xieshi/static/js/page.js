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
app.loop = false;  // 循环展示
app.DEFAULT_WIDTH = 750;
app.DEFAULT_HEIGHT = 1218;
app.baseUrl = 'static/img/';
app.music = $('audio')[0];

app.init = function () {
    //微信下兼容音乐处理
    // if(app.music) {app.music.play()}
    // document.addEventListener('WeixinJSBridgeReady', function () {
    //     app.music.play();
    // }, false);

    app.loop = getUrlParameterByName('loop') || false;

    // 加载完成后隐藏loading
    var the_images = [];
    $.each($('#content img'), function(index) {
        the_images.push($(this).attr('src'));
    });
    $.imgpreload(the_images,{
        each: function(i) {
            var status = $(this).data('loaded') ? 'success' : 'error';
            if (status == 'success') {
            }
        },
        all: function() {
            setTimeout(function() {
                $('.loading').hide();
                hanldeAnimate(0);
            }, 500);
        }
    });

    var initialSlide = 0;
    var swiperH = $(window).height() > app.DEFAULT_HEIGHT ? $(window).height() : app.DEFAULT_HEIGHT;
    app.swiper = new Swiper('.swiper-container', {
        direction: 'vertical',  // 是竖排还是横排滚动，不填时默认是横排
        loop: app.loop,  // 循环展示
        allowTouchMove: false,
        longSwipesRatio: 0.1,
        initialSlide: initialSlide,   // 初始展示页是第几页（从0开始
        preventClicks: true,
        preventClicksPropagation: true,
        width: app.DEFAULT_WIDTH,
        height: swiperH,
        noSwiping : true
    });

    // 初始化音乐按钮
    // initMusic();
};

/**
 * 获取URL中的参数
 *
 * @param {string} name 参数名
 * @return {string} 参数值
 */
function getUrlParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
    return results === null ? '': decodeURIComponent(results[1].replace(/\+/g, ' '))
}

/**
 * ==============================
 * 页面主要JS逻辑交互
 * ===============================
 */
$(function () {
    app.init();
    initPageEvents();
});

/**
 * 页面交互事件的初始化写这里
 */
var result = [];
function initPageEvents() {
    // 防止拖动出现黑块
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, {passive: false});

    // 分享
    $('body').on('click', function() {
        if($('.share-box').is(':visible')) {
            $('.share-box').hide();
        }
    });

    $('.page0').on('click', function() {
        app.swiper.slideTo(1, 0, false);
        hanldeAnimate(1);
    });

    $('.page1').on('click', '.btn1', function() {
        $('.rule-box').fadeIn();
    });

    $('.page1').on('click', '.btn2', function() {
        app.swiper.slideTo(2, 0, false);
        hanldeAnimate(2);
    });

    $('.rule-box').on('click', function() {
        $(this).hide();
    });

    // form提交
    $('.page2').on('click', '.btn', function() {
        if(!isClick) {return false;}
        if(!$.trim($('#form input[name=name]').val())) {
            alert('姓名不能为空！');
            return false;
        }

        isClick = 0;

        $('#form input[name=name]').focus();

        $.ajax({
            url: 'https://m.xinliling.com/trees?type=3',
            type: 'POST',
            dataType: 'json',
            data: $('#form').serialize()
        })
        .done(function(res) {
            var wxData = {
                title: $.trim($('#form input[name=name]').val()) + '，2019，为长沙写首诗 ',
                desc: '诗意狂欢，和一座城市跨年'
            };
            weixin.bindData(wxData);
            weixin.bindShareInfo();

            var name = $.trim($('#form input[name=name]').val());
            $('.page8').find('.name').html(name);
            var sampleImage = document.getElementById('ringoImage'),
                ecode = document.getElementById('ecode'),
                canvas = convertImageToCanvas(sampleImage, ecode, name);

            // canvas画图
            document.getElementById('canvasHolder').appendChild(canvas);
            document.getElementById('pngHolder').appendChild(convertCanvasToImage(canvas));

            $('#form input[name=name]').blur();
            alert('报名成功！');
            app.swiper.slideTo(3, 0, false);
        })
        .fail(function(res) {
            if(res.status == 422) {
                alert(res.responseText);
            }
            else {
                alert('网络错误，请稍后重试');
            }
        })
        .always(function() {
            isClick = 1;
        });

        return false;
    });
}
/**
 * 返回是否是PC页面
 *
 * @return {boolean} true / false
 */
function checkIsPC() {
    var system = {
        win: false,
        mac: false,
        xll: false
    };
    var p = navigator.platform;
    system.win = p.indexOf('Win') == 0;
    system.mac = p.indexOf('Mac') == 0;
    system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0);
    var winWidth = $(window).width();
    if (winWidth > app.DEFAULT_WIDTH && (system.win || system.mac || system.xll)) {
        return true;
    }
    else {
        return false;
    }
}

function hanldeAnimate(curIndex) {
    // 找到有[data-anim]属性的DOM元素，分别给它们加上data-anim设定的动画classname
    $('.swiper-slide').find('[data-anim]').each(function () {
        $(this).removeClass($(this).data('anim'));
    });
    $('.swiper-slide').eq(curIndex).find('[data-anim]').each(function () {
        $(this).addClass($(this).data('anim'));
    });
}

function isIOS() {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
　　　　return true;
    }
    else {
        return false;
    }
}

// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image, ecode, name) {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    ctx.save();//保存状态

    ctx.drawImage(image, 0, 0);

    ctx.drawImage(ecode, 499, 933, 160, 160);

    ctx.translate(90, 180);//设置画布上的(0,0)位置，也就是旋转的中心点
    ctx.fillStyle = '#2c225e';   // 文字填充颜色
    ctx.font = 'bold 42px Microsoft Yahei';
    ctx.fillText(name, 0, 0);
    ctx.restore();//恢复状态

    ctx.stroke();

    return canvas;
}

// Converts canvas to an image
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.crossOrigin='anonymous';
    image.src = canvas.toDataURL('image/png');
    return image;
}