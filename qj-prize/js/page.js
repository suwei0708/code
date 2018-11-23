$(function() {
    // 抽奖
    luck.init('luck');
    $('#luck-num').html(luck.num);

    $("#prize-btn").on('click', function(){
        if(luck.num > 0) {
            // 抽奖次数大于0
            luck.num--;
            $('#luck-num').html(luck.num);
            luck.speed = 100;
            roll();
            return false;
        }
        else {
            // 抽奖次数用完
            $('.popup-prize').find('.tit').html('抱歉(┬＿┬)您的抽奖次数已经用完了');
            $('.popup-prize').find('.text').html('');
            $('.popup-prize').find('.popup-btn').find('a').attr('class', 'btn-add');
            $('.popup-prize').show();
            center('.popup-prize');
            mask.show();
        }
    });

    // 关闭弹窗
    $('.popup-close').on('click', function() {
        $('.popup').hide();
        mask.hide();
        if($('.suc').size()) {
            $('.suc').hide();
        }
    });
    $('.popup').on('click', '.btn-add', function() {
        $('.btn-invite').click();
    });

    // 无缝滚动
    $('.myscroll').myScroll({
        speed: 50, //数值越大，速度越慢
        rowHeight: 31 //li的高度
    });

    // 邀请好友
    $('.btn-invite').on('click', function() {
        center('.popup-invite');
        $('.popup-invite').show();
        mask.show();
    });

    // 复制内容
    $('.btn-copy').on('click', function() {
        var txt2 = document.querySelector('.copy-cont');
        copyToClipboard(txt2);
        $('.suc').show();
    });

    // 查看奖品
    $('.btn-check').on('click', function() {
        center('.popup-check');
        $('.popup-check').show();
        mask.show();
    });

    // 赠送提示
    $('.btn-give').on('click', function() {
        $(this).parent('.popup-btn').hide();
        $('.popup-give').find('.text').show();
        $('.popup-give').find('.tit').html('赠送成功 真挚的友情+1');  // 赠送结果文字
        // $('.popup-give').find('.tit').html('赠送失败(┬＿┬) 您已经赠送过一次了哦');
        center('.popup-give');
        var time = 5;
        timer = setInterval(function() {
            time--;
            $('.popup-give').find('.time').html(time);
            if(time == 0) {
                clearInterval(timer);
                $('.popup-give').hide();
                mask.hide();
            }
        }, 1000);
    });

    center('.popup-give');

    // 分享
    $('.popup').on('click', '.btn-share', function() {
        $('.bds_qzone').trigger('click');
        $(".bdsharebuttonbox a.bds_qzone").on('click');
        $('#qzone')[0].click();
    });

});

// 抽奖js
var luck = {
    index: -1,   // 当前转动到哪个位置，起点位置
    count: 8,    // 总共有多少个位置
    timer: 0,    // setTimeout的ID，用clearTimeout清除
    speed: 20,   // 初始转动速度
    times: 5,    // 转动次数
    cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
    num: 1,      // 抽奖次数
    prize: parseInt(Math.random() * 8),   //中奖位置
    // prize: 0,   //中奖位置
    prizeData: [
        '50元优惠券',
        'VIP3天',
        '谢谢参与',
        'VIP1天',
        'VIP7天',
        '100元优惠券',
        'VIP1天',
        '谢谢参与',
    ],
    init:function(id){
        if ($("#"+id).find(".luck-unit").length > 0) {
            $luck = $("#"+id);
            $units = $luck.find(".luck-unit");
            this.obj = $luck;
            this.count = $units.length;
            $luck.find(".luck-unit-"+this.index).addClass("active");
        };
    },

    roll:function(){
        var index = this.index;
        var count = this.count;
        var luck = this.obj;
        $(luck).find(".luck-unit-"+index).removeClass("active");
        index += 1;
        if (index > count) {
            index = 0;
        };
        $(luck).find(".luck-unit-" + index).addClass("active");
        this.index = index;
        return false;
    },
    stop:function(index){
        // this.prize = index;
        return false;
    }
};

var mask = $('#mask');
function roll(){
    luck.times += 1;
    luck.roll();
    if (luck.times > luck.cycle + 10 && luck.prize == luck.index) {
        clearTimeout(luck.timer);
        luck.times = 0;
        // 中奖弹出窗
        if(luck.prize == 2 || luck.prize == 7) {
            // 没有中奖
            $('.popup-prize').find('.tit').html(luck.prizeData[luck.prize]);
            $('.popup-prize').find('.text').html('什么？还没抽到永久VIP 就没机会了？快让好友送你抽奖机会把');
            $('.popup-prize').find('.popup-btn').find('a').attr('class', 'btn-continue');
            $('.popup-prize').show();
            center('.popup-prize');
            mask.show();
        }
        else if(luck.prize == 0 || luck.prize == 5) {
            // 中优惠券
            $('.popup-prize-quan').find('.text').html('恭喜您，获得' + luck.prizeData[luck.prize]);
            $('.popup-prize-quan').show();
            center('.popup-prize-quan');
            mask.show();
        }
        else {
            // 中奖
            $('.popup-prize').find('.tit').html('恭喜获得' + luck.prizeData[luck.prize] +'，已经入账');
            $('.popup-prize').find('.text').html('注释：如VIP 标识没有显示，可以试着重新登录下哦');
            // if(luck.prize == 5) {
            //     $('.popup-prize').find('.popup-btn').find('a').attr('class', 'btn-share');
            // }
            // else {
            //     $('.popup-prize').find('.popup-btn').find('a').attr('class', 'btn-sure');
            // }
            $('.popup-prize').show();
            center('.popup-prize');
            mask.show();
        }
    }else{
        if (luck.times < luck.cycle) {
            luck.speed -= 10;
        }else if(luck.times == luck.cycle) {
            var index = Math.random()*(luck.count)|0;
            // luck.prize = index;
        }else{
            if(luck.times > luck.cycle + 10 && ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index + 1)) {
                luck.speed += 110;
            }else {
                luck.speed += 20;
            }
        }
        if (luck.speed < 40) {
            luck.speed = 40;
        };

        luck.timer = setTimeout(roll,luck.speed);
    }
    return false;
}

// 弹窗居中
function center(obj) {
    $(obj).css({
        'margin-top': -($('.popup-pos').height() - $(obj).height()) / 2
    });
}

// 无缝滚动js
(function($){
    $.fn.myScroll = function(options){
    //默认配置
    var defaults = {
        speed:40,  //滚动速度,值越大速度越慢
        rowHeight:24 //每行的高度
    };

    var opts = $.extend({}, defaults, options),intId = [];

    function marquee(obj, step){

        obj.find("ul").animate({
            marginTop: '-=1'
        },0,function(){
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if(s >= step){
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function(i){
            var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
            intId[i] = setInterval(function(){
                if(_this.find("ul").height()<=_this.height()){
                    clearInterval(intId[i]);
                }else{
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function(){
                clearInterval(intId[i]);
            },function(){
                intId[i] = setInterval(function(){
                    if(_this.find("ul").height()<=_this.height()){
                        clearInterval(intId[i]);
                    }else{
                        marquee(_this, sh);
                    }
                }, speed);
            });
        });
    }
})(jQuery);

/*复制代码到剪切板*/
function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    // target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        // currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}