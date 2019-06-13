const app = getApp();
const Util = require('../../utils/util.js');
const globalPath = Util.BASE_URL;

Component({
    properties: {
        content: {
            type: String,
            value: '标题',
            observer: function (val) {
                console.log(val, 'val')
                this.setData({
                    showAuthorize: val
                });
                if (val) {
                    countDown(this, 14, 9);
                }                
            }
        }
    },
    data: {
        showAuthorize: false,                     // 授权
        change: true,                             // 显示授权
        counttime: 14,
        countsecond: 9,
        date1: '',
        date2: '',
    },
    methods: {
        onTap: function () {
            var myEventDetail = { 'showTips': false } // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('myevent', myEventDetail, myEventOption)
        },
        getUserInfo: function (e) {
            if (e.detail.iv) {
                this.setData({
                    showAuthorize: false,
                    change: false
                });
                wx.showToast({
                    title: '加载中...',
                    icon: 'loading',
                    duration: 10000
                });
                app.getInfo();
            }

        },
        closeauth() {
            this.setData({
                showAuthorize: false
            });
        }
    },
    ready: function (options) {    
        var _this = this;
        _this.setData({
            date1: getNowFormatDate(),
            date2: getNowFormatDate(30)
        });
        // var timer = setInterval(function () {
        //     if (app.globalData.jwt) {
        //         clearInterval(timer);
        //         _this.setData({
        //             // 20190613
        //             showAuthorize: false
        //         });
        //     }
        //     else {
        //         if (_this.data.change) {
        //             _this.setData({
        //                 showAuthorize: true
        //             });
        //             wx.hideToast();
        //             countDown(_this, _this.data.counttime, _this.data.countsecond) 
        //         }                
        //     }
        // }, 1000);

    } 
});

//倒计时秒
var timer;
function countDown(that, count, countsecond) {
    clearTimeout(timer);
    console.log(count);
    if (count == 0 && countsecond == 0) {
        that.setData({
            counttime: count,
            countsecond: countsecond
        })
        return;
    }
    else if (countsecond < 0) {
        count = +count - 1;
        count < 10 ? count = '0' + count : count;
        countsecond = 9;
    }
    that.setData({
        counttime: count,
        countsecond: countsecond
    })
    timer = setTimeout(function () {
        countsecond--;
        countDown(that, count, countsecond);
    }, 100);
}
function getNowFormatDate(data) {
    var date;
    var date1 = new Date();
    var date2 = new Date(date1);

    if(data) {
        date2.setDate(date1.getDate() + data);
        date = date2;
    }
    else {
        date = new Date()
    }
    var seperator1 = ".";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = month + seperator1 + strDate;
    return currentdate;
}