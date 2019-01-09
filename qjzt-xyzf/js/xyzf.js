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
            next: 'qj-fanyezuobianjiantou',
            prev: 'qj-fanyeyoubianjiantou'
        });
    }
});