$(function() {

    fixedObj('.nav-zt', '.img2', 86);

    if($('#sld-zt').length) {
        $('#sld-zt').slides({
            generatePagination: false,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            next: 'icon-youjiantou',
            prev: 'icon-zuojiantou'
        });
    }

    // 讲师轮播
    if ($('.silder-box-zt').length) {
        //回调函数计数
        var callbackIndex = 0;
        $('.silder-box-zt').mySilder({
            width: 325, //容器的宽度 必选参数!!!!!!
            height: 490, //容器的高度 必选参数!!!!!!
            auto: true, //是否自动滚动
            autoTime: 5, //自动滚动时，时间间隙，即多长滚动一次,单位(秒)
            direction: 'x', //滚动方向,默认X方向
            autoType: 'left', //滚动方向，auto为true时生效
            few: 1, //一次滚动几个，默认滚动1张
            showFew: 4, //显示几个,就不用调css了,默认显示一个
            clearance: -27, //容器之间的间隙，默认为 0
            silderMode: 'linear', //滚动方式
            timeGap: 650, //动画间隙，完成一次动画需要多长时间，默认700ms
            buttonPre: '.left1', //上一个，按钮
            buttonNext: '.right1', //下一个，按钮
            jz: true, //点击时，是否等待动画完成
            runEnd: function() { //回调函数
                // callbackIndex++;
                // $('.cj em').text(callbackIndex);
                $('.silder-box-zt').find('li').css({
                    'position': 'static',
                    'z-index': 1
                });
                $('.silder-box-zt').find('li:lt(4)').css({
                    'position': 'relative',
                    'z-index': 5
                });
            }
        });
    }

    // 导航滑动
    $('#nav-zt').on('click', 'a', function() {
        if($(this).attr('href').indexOf('#ds') > -1) {
            if($($(this).attr('href')).length) {
                $('html, body').animate({
                    'scrollTop': $($(this).attr('href')).offset().top
                }, 500);
                return false;
            }
        }
    });
});

function fixedObj(box, obj, distance) {
    var position = $(box).offset().top;
    judgeFix(box, obj, position, distance);

    $(window).on('scroll', function() {
        judgeFix(box, obj, position, distance);
    });
}

function judgeFix(box, obj, position, distance) {
    if(distance) {
        num = distance
    }
    else {
        num = 0
    }
    if($(window).scrollTop() > position) {
        $(box).addClass('pos-fixed');
        if(obj) {
            $(obj).css( {
                'margin-top': num
            });
        }
    }
    else {
        $(box).removeClass('pos-fixed');
        if(obj) {
            $(obj).css( {
                'margin-top': 0
            });
        }
    }

}