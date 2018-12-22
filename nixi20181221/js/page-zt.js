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
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    }
    if($('#sld-zt3').length) {
        $('#sld-zt3').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true,
            animationComplete: function(i) {
                $('.tab-xyzp > li').eq(i - 1).addClass('cur').siblings().removeClass('cur');
            }
        });
    }
    $('.tab-xyzp > li').click(function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        $('#sld-zt3 .pagination > li').eq($(this).index()).find('a').click();
    });

    if($('#sld-zt4').length) {
        $('#sld-zt4').slides({
            generatePagination: true,
            generateNextPrev: false,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    }

    // 点击小图显示大图
    jQuery_New("a[rel^='gallery[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});
    jQuery_New("a[rel^='gallery1[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});
    jQuery_New("a[rel^='gallery2[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});
    jQuery_New("a[rel^='gallery3[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});
    jQuery_New("a[rel^='gallery4[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});

});