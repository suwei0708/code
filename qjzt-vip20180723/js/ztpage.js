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
});