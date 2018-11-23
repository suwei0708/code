$(function() {
    $('.week-l').on('click', 'li', function() {
        $(this).addClass('cur').siblings('li').removeClass('cur');
        $('.week-r').find('img').hide().eq($(this).index()).show();
        clearInterval(Timer);
    });

    $('.img2 .wraps').hover(function() {
        clearInterval(Timer);
    }, function() {
        tabs($(this).find('.cur').index());
    });

    $('.tab-teacher').on('click', '.tab', function() {
        $(this).addClass('cur').siblings('.tab').removeClass('cur');
        $('.teacher-ct').hide().eq($(this).index()).show();
    });

    countUp();
    $(window).scroll(function(){
        countUp();
    });

    var Timer;
    tabs(0);
    function tabs(j) {
        clearInterval(Timer);
        var i = j;

        Timer = setInterval(function() {
            if(i == $('.week-l').find('li').length - 1) {
                i = 0
            }
            else {
                i++
            }
            $('.week-l').find('li').eq(i).addClass('cur').siblings('li').removeClass('cur');
            $('.week-r').find('img').hide().eq(i).show();
        }, 3000);
    }


    // 点击小图显示大图
    jQuery_New("a[rel^='gallery1[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});
    jQuery_New("a[rel^='gallery2[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});

});

var options = {
    useEasing : true,
    useGrouping : true,
    separator : ',',
    decimal : '.',
    prefix : '',
    suffix : ''
};
var demo = new CountUp("myTargetElement", 0, 60, 0, 2.5, options);
var demo2 = new CountUp("myTargetElement2", 0, 30, 0, 2.5, options);
var demo3 = new CountUp("myTargetElement3", 0, 4, 0, 2.5, options);
var demo4 = new CountUp("myTargetElement4", 0, 100, 0, 2.5, options);
function countUp() {
    if($(window).scrollTop() + $(window).height() >= $('#myTargetElement').offset().top && $(window).scrollTop() <= $('#myTargetElement').offset().top){
        demo.start();
        demo2.start();
        demo3.start();
        demo4.start();
    }
};