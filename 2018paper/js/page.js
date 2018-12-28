/**
 * app 模块
 *
 * @namespace
 */
var app = {};
app.width;
app.height;
app.loop = false;  // 循环展示
app.DEFAULT_WIDTH = 750;
app.DEFAULT_HEIGHT = 1218;
app.music1 = $('audio')[0];

app.init = function () {

    app.loop = getUrlParameterByName('loop') || false;

    // 加载完成后隐藏loading
    var the_images = [];
    $.each($('#content img'), function(index) {
        the_images.push($(this).attr('src'));
    });
    $.imgpreload(the_images,{
        each: function(i) {
            var status = $(this).data('loaded') ? 'success' : 'error';
            if (status == "success") {
                var v = (i.length / the_images.length).toFixed(2);
                $("#percentage").width(Math.round(v * 100) + '%');
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
    var swiperH = $(window).height();
    app.swiper = new Swiper('.swiper-container', {
        direction: 'vertical',  // 是竖排还是横排滚动，不填时默认是横排
        loop: app.loop,  // 循环展示
        longSwipesRatio: 0.1,
        initialSlide: initialSlide,   // 初始展示页是第几页（从0开始
        preventClicks: true,
        preventClicksPropagation: true,
        width: app.DEFAULT_WIDTH,
        height: swiperH,
        noSwiping : true,
        allowSlidePrev : false
    });
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
    //微信下兼容音乐处理
    initPageEvents();
});

/**
 * 页面交互事件的初始化写这里
 */
function initPageEvents() {
    // 防止拖动出现黑块
    document.body.addEventListener('touchmove', bodyScroll, {passive: false});

    $('.page1').on('click', function() {
        app.swiper.slideTo(1, 0, false);
        video1.play();
    });

    $('.page3').on('click', '.btn2', function() {
        video2.pause();
        $('#video2').css('background', '#000').find('video').hide();
        $('.share-msg').show();
    });

    $('.share-msg').on('click', function() {
        $('#video2').css('background', 'none').find('video').show();
        $('.share-msg').hide();
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

function bodyScroll(event) {
    event.preventDefault();
}