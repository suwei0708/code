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

    // 点击小图显示大图
	$("a[rel^='gallery1[modal]']").prettyPhoto({theme: 'duotive-modal', opacity:0.5, show_title: false, overlay_gallery:true});

	showCur();
	$(window).on('scroll', function() {
	    showCur();
	});

});

function showCur() {
    if ($(window).scrollTop() > $(window).height()) {
        $('.btn-talk').show();
    } else {
        $('.btn-talk').hide();
    };
}