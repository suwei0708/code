// 是否有微信API
var weixinChecked;

var weixin = (function () {
    window.jQuery || document.write(''
        + '<script src="http://s1.bdstatic.com/r/www/cache/static/jquery/jquery-1.10.2.min_f2fb5194.js">'
        + '<' + '/script>');


    window.wx || document.write(''
        + '<script src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js">'
        + '<' + '/script>');

    var exports = $({});

    // 微信分享默认DATA
    var _wxData = {
        imgUrl: '',
        link: window.location.href,
        title: document.title,
        desc: '-'
    }

    // 网络类型
    var _networkType;

    var wxSdk = 'http://wxs.xxcb.cn/wechat/js.html';
    $.ajax({
        url: wxSdk,
        type: 'GET',
        dataType: 'json'
    })
    .done(function(data) {
        if (data.timestamp && data.nonceStr && data.signature) {
            if (!window.wx) {
                $.getScript('http://res.wx.qq.com/open/js/jweixin-1.4.0.js', function () {
                    weixinInit(data);
                });
            }
            else {
                weixinInit(data);
            }

        }
    })
    .fail(function() {
        // alert('网络错误，请稍候再试');
    });

    function weixinInit(data) {
        wx.config(data);

        /**
         * 初始化微信分享信息
         */
        wx.ready(function () {
            exports.trigger('ready');
            weixinChecked = 1;

            wx.getNetworkType({
                success: function (res) {
                    _networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                }
            });

            bindShareInfo();
        });
    }

    function bindData(data) {
        _wxData = $.extend(_wxData, data);
    }

    function bindShareInfo() {
        if (!weixinChecked) {
            console.log('weixin API hasnt been inited~~');
            return;
        }

        var shareInfo = $.extend({
            success: function () {},
            cancel: function () {}
        }, _wxData);

        // 分享朋友圈默认回调函数
        var sharesuc1 = {}
        typeof(wxData1) == 'undefined' ? Timeline = $.extend({}, sharesuc1, _wxData) : Timeline = $.extend({}, _wxData, wxData1);

        // 分享朋友默认回调函数
        var sharesuc2 = {}

        typeof(wxData2) == 'undefined' ? AppMessage = $.extend({}, sharesuc2, _wxData) : AppMessage = $.extend({}, _wxData, wxData2);

        wx.onMenuShareTimeline(Timeline);
        wx.onMenuShareAppMessage(AppMessage);
        wx.onMenuShareQQ(shareInfo);
        wx.onMenuShareWeibo(shareInfo);
    }

    exports.bindData = bindData;
    exports.bindShareInfo = bindShareInfo;

    return exports;
})();