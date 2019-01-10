$(function() {
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