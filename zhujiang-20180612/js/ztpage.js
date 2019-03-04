$(function() {
    if($('#sld-zt').length) {
        $('#sld-zt').slides({
            generatePagination: false,
            generateNextPrev: true,
            effect: "slide",
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    }
    if($('#sld-zt1').length) {
        $('#sld-zt1').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            animationComplete: function(i) {
                $('.tab-xyzp > li').eq(i - 1).addClass('cur').siblings().removeClass('cur');
            }
        });
        $('.tab-xyzp > li').click(function() {
            $(this).addClass('cur').siblings().removeClass('cur');
            $('#sld-zt1 .pagination > li').eq($(this).index()).find('a').click();
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
    if($('#sld-zt3').length) {
        $('#sld-zt3').slides({
            generatePagination: false,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            effect: 'fade'
        });
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
    jQuery("a[rel^='gallery1[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});
    jQuery("a[rel^='gallery2[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});

});

function showCur() {
    if($(window).scrollTop() > $(window).height()) {
        $('.btn-talk').show();
    }
    else {
        $('.btn-talk').hide();
    };
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