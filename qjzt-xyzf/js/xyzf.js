$(function() {
    // 右侧悬浮选中
    setTimeout(function() {
        if(!$('.xyzf-talk').find('.hover').length) {
            $('.xyzf-talk').find('.cur').removeClass('cur').addClass('hover');
        }
    }, 2000);
    $('.xyzf-talk').on('mouseover', 'li', function() {
        if(!$('.xyzf-talk').find('.hover').length) {
            $('.xyzf-talk').find('.cur').removeClass('cur');
        }
        $(this).find('a').addClass('hover').parent().siblings('li').find('a').removeClass('hover');
    });

    // 右侧悬浮电话弹窗
    $('.xyzf-talk').on('click', 'li', function() {
        if($(this).index() == 2) {
            $('.popup-xyphone, .mask').show();
        }
    })

    $('.xyzf-banner-big').find('li').hide().eq(0).show();
    $('.xyzf-banner-small').find('li').eq(0).addClass('cur');
    $('.xyzf-banner-small').on('mouseover', 'li', function() {
        if($(this).hasClass('cur')) {
            return false;
        }
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.xyzf-banner-big').find('li').fadeOut().eq($(this).index()).fadeIn();
    });

    if($('#xyzf-sld1').length) {
        $('#xyzf-sld1').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            next: 'izf-fanyer',
            prev: 'izf-fanyel'
        });
    }

    if($('#xyzf-sld2').length) {
        $('#xyzf-sld2').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            next: 'izf-fanyer',
            prev: 'izf-fanyel',
            animationComplete: function(i) {
                $('.tab-xyzp > li').eq(i - 1).addClass('cur').siblings().removeClass('cur');
            }
        });
        $('.tab-xyzp > li').on('click', function() {
            $(this).addClass('cur').siblings().removeClass('cur');
            $('#xyzf-sld2 .pagination > li').eq($(this).index()).find('a').click();
        });
    }

    if($('#xyzf-sld3').length) {
        $('#xyzf-sld3').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            next: 'izf-fanyer',
            prev: 'izf-fanyel'
        });
    }
});