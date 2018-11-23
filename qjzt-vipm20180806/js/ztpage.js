$(function() {
    if($('#scrollDiv').length) {
        $('#scrollDiv').Scroll({line:1,speed:500,timer:3000,up:'but_up',down:'but_down'});
    };

    if($('#sld-zt').length) {
        $('#sld-zt').slides({
            generatePagination: true,
            generateNextPrev: false,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
    }

    showSideBar();
    $(window).on('scroll', function() {
        showSideBar();
    });
});

function showSideBar() {
    if($(window).scrollTop() > $(window).height()) {
        $('.btn-talk').show();
    }
    else {
        $('.btn-talk').hide();
    }
}