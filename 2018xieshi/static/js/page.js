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
    if(app.music) {app.music.play()}
    document.addEventListener('WeixinJSBridgeReady', function () {
        app.music.play();
    }, false);

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
    document.body.addEventListener('touchmove', bodyScroll, {passive: false});

    // 分享
    $('body').on('click', function() {
        if($('.share-box').is(':visible')) {
            $('.share-box').hide();
        }
    });
    if(localStorage.getItem('author')) {
        $('#form input[name=author]').val(localStorage.getItem('author'));
    }
    $('.page0').on('click', function() {
        app.swiper.slideTo(1, 0, false);
        hanldeAnimate(1);
    });

    $('.page0').on('click', '.btn', function() {
        app.swiper.slideTo(2, 0, false);
        hanldeAnimate(2);
        return false;
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

    // 换模版
    var temp = 1;
    $('.btn-switch').on('click', function() {
        var newTemp = rnd(1, 31);
        if(newTemp == temp) {
            if(newTemp == 31) {
                newTemp = 1;
            }
            else {
                newTemp++
            }
        }
        temp = newTemp;
        $('#ringoImage').attr('src', 'static/img/temp/temp' + temp + '.jpg');
    });

    // 我的作品
    var worksList = [];
    $('.page2').on('click', '.btn1', function() {
        if(!isClick) {return false;}

        $.ajax({
            url: 'https://m.xinliling.com/poems/list',
            type: 'GET',
            dataType: 'json',
            data: {
                uid: localStorage.getItem('uid')
            }
        })
        .done(function(res) {
            if(res.list.length == 0) {
                alert('您暂未发布作品！');
                return false;
            }
            worksList = res.list;
            var dom = '';
            for (var i = 0; i < worksList.length; i++) {
                var newList = worksList[i].content.split('::');
                dom += '<li><img src="static/img/temp/temp' + newList[3] + '.jpg" alt=""><p>' + worksList[i].title + '</p></li>'
            }
            $('.page4 .list ul').html(dom);

            document.body.removeEventListener('touchmove', bodyScroll, {passive: false});
            app.swiper.slideTo(4, 0, false);
            hanldeAnimate(4);
        })
        .fail(function() {
            alert('网络错误，请稍后重试');
        })
        .always(function() {
            isClick = 1;
        });
    });

    // form提交
    $('.page2').on('click', '.btn2', function() {
        if(!isClick) {return false;}

        var title = $.trim($('#form input[name=title]').val()),
            text1 = $.trim($('#form input[name=text1]').val()),
            text2 = $.trim($('#form input[name=text2]').val()),
            text3 = $.trim($('#form input[name=text3]').val()),
            author = $.trim($('#form input[name=author]').val()),
            sampleImage = document.getElementById('ringoImage'),
            bg = document.getElementById('bg'),
            ecode = document.getElementById('ecode');
        if(!$.trim(title)) {
            alert('标题不能为空！');
            return false;
        }
        else if(!$.trim(text1)) {
            alert('第一行字不能为空！');
            return false;
        }
        else if(!$.trim(text2)) {
            alert('第二行字不能为空！');
            return false;
        }
        else if(!$.trim(text3)) {
            alert('第三行字不能为空！');
            return false;
        }
        else if(!$.trim(author)) {
            alert('作者不能为空！');
            return false;
        }

        $('#form input[name=uid]').val(localStorage.getItem('uid'));
        var text = text1 + '::' + text2 + '::' + text3 + '::' + temp;
        $('#form input[name=text]').val(text);
        isClick = 0;

        $('#form input[name=title]').focus();

        $.ajax({
            url: 'https://m.xinliling.com/poems',
            type: 'POST',
            dataType: 'json',
            data: $('#form').serialize()
        })
        .done(function(res) {
            var path = window.location.href;
            var baseUrl = path.substr(0, path.lastIndexOf('/') + 1);
            var wxData = {
                title: $.trim($('#form input[name=author]').val()) + '，2019，为长沙写首诗 ',
                imgUrl: baseUrl + $('#ringoImage').attr('src'),
                desc: '诗意狂欢，和一座城市跨年'
            };
            weixin.bindData(wxData);
            weixin.bindShareInfo();

            localStorage.setItem('uid', res.uid);
            localStorage.setItem('author', author);

            var canvas = convertImageToCanvas(bg, sampleImage, ecode, title, text1, text2, text3, author);

            // canvas画图
            document.getElementById('canvasHolder').appendChild(canvas);
            document.getElementById('pngHolder').appendChild(convertCanvasToImage(canvas));

            $('#form input[name=title]').blur();
            alert('发布成功！');
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

    // 点击查看作品
    $('.page4').on('click', 'li', function() {
        document.body.addEventListener('touchmove', bodyScroll, {passive: false});

        var dom;
        var i = $(this).index();
        var newList = worksList[i].content.split('::');

        var title = worksList[i].title,
            text1 = newList[0],
            text2 = newList[1],
            text3 = newList[2],
            author = worksList[i].author,
            sampleImage = document.getElementById('ringoImage'),
            bg = document.getElementById('bg'),
            ecode = document.getElementById('ecode');
        sampleImage.src = 'static/img/temp/temp' + newList[3] + '.jpg'
        var path = window.location.href;
        var baseUrl = path.substr(0, path.lastIndexOf('/') + 1);
        var wxData = {
            title: $.trim($('#form input[name=author]').val()) + '，2019，为长沙写首诗 ',
            imgUrl: baseUrl + $('#ringoImage').attr('src'),
            desc: '诗意狂欢，和一座城市跨年'
        };
        weixin.bindData(wxData);
        weixin.bindShareInfo();

        var canvas = convertImageToCanvas(bg, sampleImage, ecode, title, text1, text2, text3, author);

        // canvas画图
        document.getElementById('canvasHolder').appendChild(canvas);
        document.getElementById('pngHolder').appendChild(convertCanvasToImage(canvas));
        app.swiper.slideTo(3, 0, false);
    });
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
function convertImageToCanvas(bg, image, ecode, title, text1, text2, text3, author) {
    var canvas = document.createElement('canvas');
    canvas.width = bg.width;
    canvas.height = bg.height;
    var ctx = canvas.getContext('2d');
    ctx.save();//保存状态

    ctx.drawImage(bg, 0, 0);

    ctx.drawImage(image, 48, 70, 654, 558);

    ctx.drawImage(ecode, 569, 1046, 135, 135);

    // ctx.translate(90, 180);//设置画布上的(0,0)位置，也就是旋转的中心点
    ctx.fillStyle = '#2e3192';   // 文字填充颜色
    ctx.font = '60px Microsoft Yahei';
    ctx.fillText(title, 100, 756);
    ctx.font = '30px Microsoft Yahei';
    ctx.fillText(text1, 105, 833);
    ctx.fillText(text2, 105, 869);
    ctx.fillText(text3, 105, 905);
    ctx.font = '21px Microsoft Yahei';
    ctx.fillText(author, 105, 970);
    ctx.fillStyle = '#999';   // 文字填充颜色
    ctx.font = '18px Microsoft Yahei';
    ctx.fillText('*长按保存图片', 105, 1042);
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

function rnd(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n)
};

function bodyScroll(event) {
    event.preventDefault();
}
