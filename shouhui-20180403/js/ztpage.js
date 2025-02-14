$(function() {
    if($('#sld-zt').size()) {
        $('#sld-zt').slides({
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
        $('#sld-zt .pagination > li').eq($(this).index()).find('a').click();
    });

    // 点击小图显示大图
    jQuery_New("a[rel^='gallery[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});
    jQuery_New("a[rel^='gallery2[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});
    jQuery_New("a[rel^='gallery3[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});
    jQuery_New("a[rel^='gallery4[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});
    jQuery_New("a[rel^='gallery5[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});

});