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

    if($('#xyzf-sld2-1').length) {
        $('#xyzf-sld2-1').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            next: 'izf-fanyer',
            prev: 'izf-fanyel'
        });

        $('.tab-works').find('li').attr('data-click', false).eq(0).attr('data-click', true);

        $('.tab-works').on('click', 'li', function() {
            if($(this).hasClass('cur')) {
                return false
            };
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.xyzf-sld2').hide().eq($(this).index()).show();
            if($(this).attr('data-click') == 'false') {
                $('#xyzf-sld2-' + (+$(this).index() + 1)).slides({
                    generatePagination: true,
                    generateNextPrev: true,
                    play: 3000,
                    pause: 2500,
                    hoverPause: true,
                    next: 'izf-fanyer',
                    prev: 'izf-fanyel'
                });
                $(this).attr('data-click', true);
            }
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