$(function() {
    if($('#sld-zt').length) {
        $('#sld-zt').slides({
            generatePagination: false,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    }
    if($('#sld-zt2').length) {
        $('#sld-zt2').slides({
            generatePagination: false,
            generateNextPrev: true,
            play: false,
            pause: 2500,
            hoverPause: true,
            effect: 'fade'
        });
    }

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

    showCur();
    $(window).on('scroll', function() {
        showCur();
    });

    // 导航跳转
    if($('#scroll1').length) {
        $('.zt-nav').on('click', 'li', function() {
            var index = +$(this).index();
            $('html, body').animate({
                scrollTop: $('#scroll' + index).offset().top - $('.zt-header').height()
            }, 300);
        });
    };


    // 点击小图显示大图
    jQuery_New("a[rel^='gallery1[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});
    jQuery_New("a[rel^='gallery2[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});

});

function showCur() {
    if($('#scroll1').length) {
        $.each($('.zt-nav li'), function(i) {
            if($(window).scrollTop() >= $('#scroll' + i).offset().top  - $('.zt-header').height()) {
                $('.zt-nav li').removeClass('cur').eq(i).addClass('cur');
            }
            else if ($(window).scrollTop() < $('#scroll0').offset().top  - $('.zt-header').height()) {
                $('.zt-nav li').removeClass('cur');
            }
        });
    }
}