(function($) {
    $(function() {
        var index_div_pro = [{
            sx: 0,
            sy: 0,
            mw: 3,
            mh: 1,
            bx: 8.4,
            by: 10.4,
            rx: -0.6
        }, {
            sx: 0,
            sy: 0,
            mw: 3,
            mh: 0.5,
            bx: 8.4,
            by: 8.4,
            rx: -0.5
        }];

        var ePageX = null;
        var ePageY = null;

        function getMousePos(expression) {
            if (ePageX == null || ePageY == null) return null;
            var _x = $(expression).position().left;
            _x += ePageX - $(expression).parent().position().left;
            var _y = $(expression).position().top;
            _y += ePageY - $(expression).parent().position().top;
            return {
                x: _x,
                y: _y
            }
        };

        var index_xh = setInterval(function() {
            var mousepos = getMousePos(".top-img");
            if (mousepos != null) {
                var left = parseInt($(".top-img").css("left")) - 40;
                console.log(left);
                var l = left + (index_div_pro[1].sx + index_div_pro[1].mw - (mousepos.x - 100) / index_div_pro[1].bx * index_div_pro[1].rx - left) * 0.2;
                $(".top-img").css({
                    left: l
                })
            }
        },
        15);

        $("body").mousemove(function(event) {
            event = event || window.event;
            ePageX = event.pageX;
            ePageY = event.pageY;
        });
    });
})(jQuery);