$(function() {
    // 首页轮播
    if($('.swiper1').find('.swiper-slide').length > 1) {
        var mySwiper = new Swiper('.swiper1',{
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            loop : true
        })
    };

    // 下拉
    $('.header-menu').on('click', function(e) {
        if ($('.header-menu-sub').is(':visible')) {
            $('.header-menu-sub').slideUp();
        }
        else {
            $('.header-menu-sub').slideDown();
        }
        e.stopPropagation()
    });
    $('body').on('click', function() {
        if ($('.header-menu-sub').is(':visible')) {
            $('.header-menu-sub').slideUp();
        }
    })
});