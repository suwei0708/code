var arrdata = [{
    "headimg": "http://zkres.myzaker.com/img_upload/cms/article_img/10146/up_10146_15456602552018.jpg",
    "message": "积分打2秒前购买了课程",
    "vote": 3
}, {
    "headimg": "http://zkres.myzaker.com/img_upload/cms/article_img/10146/up_10146_15456602552018.jpg",
    "message": "积分打2秒前购买了课程",
    "vote": 21
}, {
    "headimg": "http://zkres.myzaker.com/img_upload/cms/article_img/10146/up_10146_15456602552018.jpg",
    "message": "积分打2秒前购买了课程",
    "vote": 2
}, {
    "headimg": "http://zkres.myzaker.com/img_upload/cms/article_img/10146/up_10146_15456602552018.jpg",
    "message": "积分打2秒前购买了课程",
    "vote": 2
}]
var locaScreen = [60, 130, 300, 370, 460];
var num = -1;
var timer;
var olN = 0;
if($('#danmu-box').length) {
    initScreen();
}

function initScreen() {
    timer = setInterval(function() {
        num++;
        if (num > arrdata.length - 1) {
            num = 0
        }
        $('#danmu-box').append(createScreenPraise(arrdata[num].headimg, arrdata[num].message, arrdata[num].vote, arrdata[num].state, arrdata[num].id));
    }, 1000);
}

function createScreenPraise(heading, message) {
    var div = document.createElement("div");
    var divContent = document.createElement("div");
    divContent.className = "danmu-content";
    divContent.innerHTML = '<span class="headimg"><img src="' + heading + '" /></span>' + message;
    div.className = "danmu";
    div.appendChild(divContent);
    createScreen(div)
    return div;
}

function createScreen(elem) {
    var _top = 0;
    var _left = $(window).width();
    var _height = $(window).height();
    var lN = Math.floor(5 * Math.random());
    if (olN == lN) {
        lN++;
        if (lN > locaScreen.length - 1) {
            lN = 0;
        }
    }
    olN = lN;
    _top = locaScreen[lN];
    $(elem).css({
        left: _left,
        top: _top,
        color: "#333"
    });
    var time = 6800;
    $(elem).animate({
        left: "-" + _left + "px"
    }, time, function() {
        var docum = document.getElementById('danmu-box');
        docum.removeChild(this);
    });
}