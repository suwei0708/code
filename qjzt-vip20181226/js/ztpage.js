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

    // 倒计时
    if($('#times').length) {
        var downcount = $('#times').data('downcount');
        $('#times').downCount({
            date: downcount
        });
    };
});

// 倒计时插件
(function ($) {
    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
                date: '11/11/2090 00:00:00',
                offset: +8
            }, options);
        if (!settings.date) {
            $.error('Date is not defined.');
        }
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
        }
        var container = this;
        var currentDate = function () {
            var date = new Date();
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            var new_date = new Date(utc + (3600000*settings.offset))
            return new_date;
        };
        function countdown () {
            var target_date = new Date(settings.date), // set target date
                current_date = currentDate(); // get fixed current date
            var difference = target_date - current_date;
            if (difference < 0) {
                clearInterval(interval);
                if (callback && typeof callback === 'function') callback();
                return;
            }
            // basic math variables
            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;
            // calculate dates
            var days = Math.floor(difference / _day).toString(),
                hours = Math.floor((difference % _day) / _hour).toString(),
                minutes = Math.floor((difference % _hour) / _minute).toString(),
                seconds = Math.floor((difference % _minute) / _second).toString();
                // fix dates so that it will show two digets
                days = (days.length >= 2) ? days : '0' + days;
                hours = (hours.length >= 2) ? hours : '0' + hours;
                minutes = (minutes.length >= 2) ? minutes : '0' + minutes;
                seconds = (seconds.length >= 2) ? seconds : '0' + seconds;

            container.find('.num-bg:eq(0)').html('<span class="num' + days.slice(days.length-2,days.length-1) + '"></span>');
            container.find('.num-bg:eq(1)').html('<span class="num' + days.slice(days.length-1,days.length) + '"></span>');
            container.find('.num-bg:eq(2)').html('<span class="num' + hours.slice(hours.length-2,hours.length-1) + '"></span>');
            container.find('.num-bg:eq(3)').html('<span class="num' + hours.slice(hours.length-1,hours.length) + '"></span>');
            container.find('.num-bg:eq(4)').html('<span class="num' + minutes.slice(minutes.length-2,minutes.length-1) + '"></span>');
            container.find('.num-bg:eq(5)').html('<span class="num' + minutes.slice(minutes.length-1,minutes.length) + '"></span>');
            container.find('.num-bg:eq(6)').html('<span class="num' + seconds.slice(seconds.length-2,seconds.length-1) + '"></span>');
            container.find('.num-bg:eq(7)').html('<span class="num' + seconds.slice(seconds.length-1,seconds.length) + '"></span>');
        };
        // start
        var interval = setInterval(countdown, 1000);
    };
})(jQuery);