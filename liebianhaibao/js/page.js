(function() {　　
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {　　
        handleFontSize();　　
    } else {　　
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        }
        else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);            　　　　
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);            　　
        }
    }

    function handleFontSize() {
        /*设置网页字体为默认大小*/ 　　
        WeixinJSBridge.invoke('setFontSizeCallback', {            　　
            'fontSize': 0            　　
        });
        /*重写设置网页字体大小的事件*/ 　　
        WeixinJSBridge.on('menu:setfont', function() {            　　　　
            WeixinJSBridge.invoke('setFontSizeCallback', {                　　　　　　
                'fontSize': 0                　　　　
            });            　　
        });        　　
    }
})();

$(function() {
    // 倒计时
    if($('#times').length) {
        var downcount = $('#times').data('downcount');
        $('#times').downCount({
            date: downcount,
            offset: +8
        }, function () {
            alert('倒计时结束!');
        });

    };

    var draw = false;
    $('.fixed-coin').on('click', function() {
        if(!draw) {
            var sampleImage = document.getElementById('ringoImage'),
                ecode = document.getElementById('ecode'),
                avatar = document.getElementById('avatar'),
                name = $('#name').val(),
                canvas = convertImageToCanvas(sampleImage, ecode, avatar, name);

            // canvas画图
            document.getElementById('canvasHolder').appendChild(canvas);
            document.getElementById('pngHolder').appendChild(convertCanvasToImage(canvas));
            draw = true;
        }
        $('.popup-poster').show();
    });

    $('.popup').on('click', function() {
        $(this).hide();
    });
    $('.popup-box').on('click', function() {
        return false;
    });

});

// Converts image to canvas; returns new canvas element
function convertImageToCanvas(image, ecode, avatar, name) {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    ctx.save();//保存状态

    ctx.drawImage(image, 0, 0);

    circleImg(ctx, avatar, 21, 23, 50);

    ctx.drawImage(ecode, 371, 692, 148, 148);

    ctx.fillStyle = '#ffeaca';   // 文字填充颜色
    ctx.font = '32px Microsoft Yahei';
    ctx.fillText(name, 135, 66);
    ctx.fillText('邀你一起组团学习', 135, 110);
    ctx.restore();//恢复状态

    ctx.stroke();

    return canvas;
}

// Converts canvas to an image
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.crossOrigin='anonymous';
    image.src = canvas.toDataURL('image/png');
    return image;
}

function circleImg(ctx, img, x, y, r) {
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;

    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);

    ctx.restore();
}

// 倒计时插件
(function($){$.fn.downCount=function(options,callback){var settings=$.extend({date:null,offset:null},options);if(!settings.date){$.error('Date is not defined.');}
if(!Date.parse(settings.date)){$.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');}
var container=this;var currentDate=function(){var date=new Date();var utc=date.getTime()+(date.getTimezoneOffset()*60000);var new_date=new Date(utc+(3600000*settings.offset))
return new_date;};function countdown(){var target_date=new Date(settings.date),current_date=currentDate();var difference=target_date-current_date;if(difference<0){clearInterval(interval);if(callback&&typeof callback==='function')callback();return;}
var _second=1000,_minute=_second*60,_hour=_minute*60,_day=_hour*24;var days=Math.floor(difference/_day),hours=Math.floor((difference%_day)/_hour),minutes=Math.floor((difference%_hour)/_minute),seconds=Math.floor((difference%_minute)/_second);days=(String(days).length>=2)?days:'0'+days;hours=(String(hours).length>=2)?hours:'0'+hours;minutes=(String(minutes).length>=2)?minutes:'0'+minutes;seconds=(String(seconds).length>=2)?seconds:'0'+seconds;var ref_days=(days===1)?'day':'days',ref_hours=(hours===1)?'hour':'hours',ref_minutes=(minutes===1)?'minute':'minutes',ref_seconds=(seconds===1)?'second':'seconds';container.find('.days').text(days);container.find('.hours').text(hours);container.find('.minutes').text(minutes);container.find('.seconds').text(seconds);container.find('.days_ref').text(ref_days);container.find('.hours_ref').text(ref_hours);container.find('.minutes_ref').text(ref_minutes);container.find('.seconds_ref').text(ref_seconds);};var interval=setInterval(countdown,1000);};})(jQuery);