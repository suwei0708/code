(function($) {
$(function() {
    /*
     * 旅游频道
    */
    // 轮播图banner
    if($('.ly-sldbanner').length) {
        var mySwiper = new Swiper('.ly-sldbanner', {
            autoplay: true,//可选选项，自动滑动
            // mousewheel: true,
            width: 1200,
            loop : true,
            effect : 'fade',
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
        })
    };

    // 轮播图banner
    if($('.ly-video-list').length) {
        var mySwiper = new Swiper('.ly-video-list', {
            autoplay: true,//可选选项，自动滑动
            // mousewheel: true,
            // width: 1200,
            slidesPerView : 3,
            spaceBetween : 30,
            loop : true,
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
        })
    };

    // 返回顶部
    $('.ly-talk').on('click', '.back', function() {
        $('body, html').animate({
            scrollTop: 0
        }, 200);
        return false;
    });
});
})(jQuery);