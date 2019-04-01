/**
 * app 模块
 *
 * @namespace
 */
var app = {};
app.width;
app.height;
app.loop = false;  // 循环展示
app.DEFAULT_WIDTH = 750;
app.DEFAULT_HEIGHT = 1212;
app.baseUrl = 'https://m.xinliling.com';

app.init = function () {

    app.loop = getUrlParameterByName('loop') || false;

    // 加载完成后隐藏loading
    var the_images = [];
    $.each($('#content img'), function(index) {
        the_images.push($(this).attr('src'));
    });

    // 请求授权
    oauth();
    function oauth() {
        $.ajax({
            url: app.baseUrl + '/oauth',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(res) {
            if(res.status=="401"){
                oauth();
                return false;
            }
            app.userInfo = res.data;
            $('.page4 .user').find('img').attr('src', app.userInfo.avatar);
            $('.page4 .user').find('p').html(app.userInfo.nickname + '的作品');
            // 加载图片
            $.imgpreload(the_images,{
                each: function(i) {
                    var status = $(this).data('loaded') ? 'success' : 'error';
                    if (status == "success") {
                        var v = (i.length / the_images.length).toFixed(2);
                        $("#percentage").width(Math.round(v * 100) + '%');
                    }
                },
                all: function() {
                    setTimeout(function() {
                        $('.loading').remove();
                        // 未关注跳转到关注页
                        if(!app.userInfo.subscribe) {
                            app.swiper.slideTo(5, 0, false);
                        }
                        // 已结束跳转页
                        // app.swiper.slideTo(6, 0, false);
                    }, 500);
                }
            });

            // 初始化
            var initialSlide = 0;
            var swiperH = $(window).height() > app.DEFAULT_HEIGHT ? $(window).height() : app.DEFAULT_HEIGHT;
            app.swiper = new Swiper('.swiper-container', {
                direction: 'vertical',  // 是竖排还是横排滚动，不填时默认是横排
                loop: app.loop,  // 循环展示
                longSwipesRatio: 0.1,
                initialSlide: initialSlide,   // 初始展示页是第几页（从0开始
                preventClicks: true,
                preventClicksPropagation: true,
                width: app.DEFAULT_WIDTH,
                height: swiperH,
                noSwiping : true
            });
        })
        .fail(function() {
            // alert('网络错误，请稍候再试！');

            // 加载图片
            $.imgpreload(the_images,{
                each: function(i) {
                    var status = $(this).data('loaded') ? 'success' : 'error';
                    if (status == "success") {
                        var v = (i.length / the_images.length).toFixed(2);
                        $("#percentage").width(Math.round(v * 100) + '%');
                    }
                },
                all: function() {
                    setTimeout(function() {
                        $('.loading').remove();
                    }, 500);
                }
            });

            // 初始化
            var initialSlide = 0;
            var swiperH = $(window).height() > app.DEFAULT_HEIGHT ? $(window).height() : app.DEFAULT_HEIGHT;
            app.swiper = new Swiper('.swiper-container', {
                direction: 'vertical',  // 是竖排还是横排滚动，不填时默认是横排
                loop: app.loop,  // 循环展示
                longSwipesRatio: 0.1,
                initialSlide: initialSlide,   // 初始展示页是第几页（从0开始
                preventClicks: true,
                preventClicksPropagation: true,
                width: app.DEFAULT_WIDTH,
                height: swiperH,
                noSwiping : true
            });
        });
    };
    // 初始化音乐按钮
    // initMusic();
};

/**
 * 获取URL中的参数
 *
 * @param {string} name 参数名
 * @return {string} 参数值
 */
function getUrlParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
    return results === null ? '': decodeURIComponent(results[1].replace(/\+/g, ' '))
}

/**
 * ==============================
 * 页面主要JS逻辑交互
 * ===============================
 */
$(function () {
    app.init();
    //微信下兼容音乐处理
    // if(app.music1) {app.music1.play();}
    // document.addEventListener("WeixinJSBridgeReady", function () {
    //     app.music1.play();
    // }, false);
    initPageEvents();
});

/**
 * 页面交互事件的初始化写这里
 */
function initPageEvents() {

    // 防止拖动出现黑块
    document.body.addEventListener('touchmove', bodyScroll, {passive: false});

    var isClicks = true;
    var imgNum = 0;
    /** 1p */
    // 点击规则显示
    $('.page1').on('click', '.btn-rule', function() {
        $('.popup-rule-box').show();
    })
    .on('click', '.logo1', function() {
        $('.popup-intro-box').show();
    })
    .on('click', '.logo3', function() {
        $('.popup-intro-box').show();
    });

    // 点击规则隐藏
    $('.popup').on('click', function(e) {
        return false;
    });
    $('.popup-box, .popup .close').on('click', function() {
        $('.popup-box').hide();
    });

    /** 2p */
    // 开始涂鸦
    $('.page1').on('click', '.btn', function () {
        app.swiper.slideTo(1, 0, false);
    });

    // 选择颜色
    $('.color-box').on('click', 'span', function () {
        $(this).addClass('cur').siblings().removeClass('cur');
    });

    // 图片切换
    $('.page2').on('click', '.prev', function () {
        imgNum--;
        if(imgNum < 0) {
            imgNum = data.length - 1;
        }
        changeDraw(imgNum);
    })
    .on('click', '.next', function () {
        imgNum++;
        if(imgNum > data.length - 1) {
            imgNum = 0;
        }
        changeDraw(imgNum);
    })
    // 完成
    .on('click', '.btn1', function () {
        $('.page3, .page4').find('.main').html(canvasToImage($('#boxRender').find('canvas')[0]));
        app.swiper.slideTo(2, 0, false);
    })
    // 看大家的
    .on('click', '.btn2', function () {
        if(!isClicks) {
            return false;
        }
        isClicks = false;
        $.ajax({
            url: app.baseUrl + '/draw/index',
            type: 'POST',
            dataType: 'json',
            data: {param1: 'value1'},
        })
        .done(function(res) {
            if(res.status == 200) {
                alert(res.data);
                return false;
            }
            for (var i = 0; i < res.data.length; i++) {
                var dom = '<li>'
                                + '<img class="img" src="' + res.data[i].image + '" alt="">'
                                + '<div class="btn">'
                                    + '<img src="static/img/p5/btn.png">'
                                    + '<div data-id="' + res.data[i].id + '""><span class="num">' + res.data[i].vote + '</span>票</div>'
                                + '</div>'
                            + '</li>';
            }
            $('.page5').find('ul').append(dom);
        })
        .fail(function() {
            alert('网络错误，请稍候再试！');
        })
        .always(function() {
            isClicks = true;
        });
        app.swiper.slideTo(4, 0, false);
        document.body.removeEventListener('touchmove', bodyScroll, {passive: false});
    })
    // 奖品展示
    .on('click', '.btn3', function () {
        app.swiper.slideTo(5, 0, false);
    })
    // 重画
    .on('click', '.btn4', function () {
        changeDraw(imgNum);
    });

    /** 3p */
    // 返回修改
    $('.page3').on('click', '.btn1', function () {
        app.swiper.slideTo(1, 0, false);
    })
    // 提交作品
    .on('click', '.btn2', function () {
        if(!isClicks) {
            return false;
        }
        isClicks = false;
        $.ajax({
            url: app.baseUrl + '/draw/save',
            type: 'POST',
            dataType: 'json',
            data: {param1: 'value1'},
        })
        .done(function() {
            if(res.status == 200) {
                alert(res.data);
                return false;
            }
            $('.page4').find('btn1').attr('data-id', res.data.id);
            $('.popup-suc-box').show();
        })
        .fail(function() {
            alert('网络错误，请稍候再试！');
        })
        .always(function() {
            isClicks = true;
        });
    });

    /** 弹窗 */
    // 去投票
    $('.popup-suc-box').on('click', '.btn-vote', function () {
        $('.popup-suc-box').hide();
        app.swiper.slideTo(3, 0, false);
    });

    /** 4p */
    // 点击规则显示
    $('.page4').on('click', '.btn-rule', function() {
        $('.popup-vote-box').show();
    })
    // 点击投票
    .on('click', '.btn1', function() {
        if(!isClicks) {
            return false;
        }
        isClicks = false;
        var _this = $(this);
        $.ajax({
            url: app.baseUrl + '/draw/save',
            type: 'POST',
            dataType: 'json',
            data: {id: _this.attr('data-id')},
        })
        .done(function() {
            if(res.status == 200) {
                alert(res.data);
                return false;
            }
            _this.find('.num').html(+_this.find('.num').html() + 1);
            alert('投票成功');

        })
        .fail(function() {
            alert('网络错误，请稍候再试！');
        })
        .always(function() {
            isClicks = true;
        });
    })
    // 点击分享
    .on('click', '.btn2', function() {
        $('.popup-share-box').show();
    });

    /** 5p */
    // 点击规则显示
    $('.page5').on('click', '.btn-rule', function() {
        $('.popup-vote-box').show();
    })
    // 点击投票
    .on('click', '.btn', function() {
        if(!isClicks) {
            return false;
        }
        isClicks = false;
        $(this).find('.num').html(+$(this).find('.num').html() + 1);
        alert('投票成功');
        isClicks = true;
    });

    $('.back').on('click', function() {
        document.body.addEventListener('touchmove', bodyScroll, {passive: false});
        app.swiper.slideTo(1, 0, false);
    });

    // 画图
    var canvas = new HGAME.canvas();
    var testBox = document.getElementById('boxRender');
    testBox.appendChild(canvas.dom);
    var animate = new HGAME.animate({
        action: function () {
            canvas.render();
        }
    });
    var colorObj = {
        r: 236,
        g: 137,
        b: 166
    };
    $('.color-box').on('click', 'span', function() {
        colorObj.r = $(this).attr("data-r");
        colorObj.g = $(this).attr("data-g");
        colorObj.b = $(this).attr("data-b");
    });
    /*创建img数据*/
    function changeImgColor(img, r, g, b) {
        var c = document.createElement("canvas");
        var txt = c.getContext("2d");
        c.width = img.width;
        c.height = img.height;
        txt.drawImage(img, 0, 0);
        var data = txt.getImageData(0, 0, c.width, c.height);
        for (var q = 0; q < data.data.length; q += 4) {
            if (data.data[q + 3] > 100) {
                data.data[q] = r;
                data.data[q + 1] = g;
                data.data[q + 2] = b;
            }
        }
        txt.putImageData(data, 0, 0);

        return c;
    }
    var div = document.createElement("div");

    function changeDraw(num) {
        /*加载数据*/
        var source = new HGAME.source({
            loadCall: function (num, allNum) {
                div.innerHTML = "加载资源" + num + "/" + allNum;
                div.setAttribute("class", "tool");
                testBox.appendChild(div);
            },
            loaded: function () {
                testBox.removeChild(div);
                var img = new HGAME.Object2D({
                    img: this.data[0],
                    w: 647,
                    h: 693,
                    x: 0,
                    y: 0
                });
                canvas.child = new Array();
                canvas.add(img);

                var THIS = this;
                img.child = new Array();
                each(this.data, function (intX) {
                    if (intX >= 1) {
                        img.add(new HGAME.Object2D({
                            x: whxyInfo[num][intX - 1].x,
                            y: whxyInfo[num][intX - 1].y,
                            w: whxyInfo[num][intX - 1].w,
                            h: whxyInfo[num][intX - 1].h,
                            img: THIS.data[intX],
                            isClick: true,
                            clickFun: function () {
                                if (typeof this.bufferImg == "undefined") {
                                    this.bufferImg = this.img;
                                    this.img = changeImgColor(this.bufferImg, colorObj.r, colorObj.g, colorObj.b);
                                }
                                else {
                                    this.img = changeImgColor(this.bufferImg, colorObj.r, colorObj.g, colorObj.b);
                                }
                            }
                        }));
                    }
                });
                animate.stop();
                animate.run();
            },
            data: data[num]
        });

    }
    changeDraw(imgNum);

    // 上拉加载
    var curpage = 1;  // 页数
    var totalpage = 5; // 总页数
    // dropload
    var dropload = $("#wrapper").dropload({
        scrollArea: this,
        domDown: {
            domClass: 'dropload-down',
            domRefresh: '<div class="dropload-refresh">上拉加载更多</div>',
            domLoad: '<div class="dropload-load"><div class="loading"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div>正在加载</div>',
            domNoData: '<div class="dropload-noData">已无数据</div>'
        },
        loadDownFn: function (me) {
            // 判断是否只有一页或者加载完毕
            if(totalpage <= 1 || curpage == totalpage) {
                me.lock();
                me.noData();
                me.resetload();
                return;
            }
            // 加载页面
            setTimeout(function () {
                console.log(curpage)
                var li;
                for (i=0; i<6; i++) {
                    li = `<li class="bdr10">afas</li>`;
                    $("#wrapper ul").append(li);
                }
                curpage = parseInt(curpage) + 1;
                me.resetload();
            }, 500);
        }
    });
}
/**
 * 返回是否是PC页面
 *
 * @return {boolean} true / false
 */
function checkIsPC() {
    var system = {
        win: false,
        mac: false,
        xll: false
    };
    var p = navigator.platform;
    system.win = p.indexOf('Win') == 0;
    system.mac = p.indexOf('Mac') == 0;
    system.x11 = (p == 'X11') || (p.indexOf('Linux') == 0);
    var winWidth = $(window).width();
    if (winWidth > app.DEFAULT_WIDTH && (system.win || system.mac || system.xll)) {
        return true;
    }
    else {
        return false;
    }
}

function hanldeAnimate(curIndex) {
    // 找到有[data-anim]属性的DOM元素，分别给它们加上data-anim设定的动画classname
    $('.swiper-slide').find('[data-anim]').each(function () {
        $(this).removeClass($(this).data('anim'));
    });
    $('.swiper-slide').eq(curIndex).find('[data-anim]').each(function () {
        $(this).addClass($(this).data('anim'));
    });
}

function bodyScroll(event) {
    event.preventDefault();
}

function canvasToImage(canvas) {
    var image = new Image();
    image.crossOrigin='anonymous';
    image.src = canvas.toDataURL('image/png');
    return image;
}