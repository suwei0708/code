//index.js
//获取应用实例
const app = getApp();
const Util = require('../../utils/util.js');
const globalPath = Util.BASE_URL;

Page({
    data: {
        swiperCur: 0,
        len: '',
        animation: [],
        maxVal: 156,
        minVal: 51,
        popup: 0,
        showGif: false,
        receiveNum: 11268,
        showAuthorize: false,
        scrollList: [],
        avatarList: [],
        nameList: [
            '梦之旅',
            '飞雪',
            '王晓华',
            '桂仁',
            '小草',
            '彩虹',
            '孙丽芳',
            '知足常乐',
            '萧杭香',
            '孙琢',
            '99馨芙露',
            '五阿姐',
            '郭淑贞老师',
            '俞维纫',
            '司号员',
            '万祥',
            '乔俊英',
            '贵娣' 
        ]
    },
    onLoad: function () {
        var _this = this;
        wx.setNavigationBarTitle({
            title: Util.projectName
        });
        // 轮播弹幕内容
        var arr1 = _this.getNum(5, _this.data.nameList.length);
        var newArr1 = [];
        for(var i = 0; i < arr1.length; i++) {
            newArr1.push(_this.data.nameList[arr1[i]])
        }
        _this.setData({
            scrollList: newArr1,
            avatarList: _this.getNum(9, 20)
        });

        // 领取数量随机变化
        wx.getStorage({
            key: 'receiveNum',
            success(res) {
                var num = +res.data + _this.randomNum(1, 20);
                _this.setData({
                    receiveNum: num
                });
                wx.setStorage({
                    key: 'receiveNum',
                    data: num
                })
            },
            fail(res) {
                wx.setStorage({
                    key: 'receiveNum',
                    data: _this.data.receiveNum
                })
            }
        })

        _this.show_num(_this.data.maxVal);
        var timer = setInterval(function () {
            var num = _this.data.maxVal - _this.randomNum(0, 3);
            if (num <= _this.data.minVal) {
                num = _this.data.minVal;
                clearInterval(timer);
            }
            _this.setData({
                maxVal: num
            });
            _this.show_num(num);
        }, 3000);

        _this.login();

        app.jwtReadyCallback = res => {

            app.globalData.jwt = res.data.jwt;
            app.globalData.showGif = res.data.showGif;
            _this.setData({
                showGif: res.data.showGif
            });
            var popup = 0;
            if (_this.data.showGif) {
                popup = 1;
            }
            _this.setData({
                popup: popup
            });
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '送你一张免费体质自测券，速抢，仅剩' + this.data.maxVal + '张！',
            path: '/pages/index/index',
            imageUrl: '/images/share.png',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    bindchange(e) {
        this.setData({
            swiperCur: e.detail.current
        })
    },
    prev() {
        this.setData({
            swiperCur: this.data.swiperCur - 1 < 0 ? 1 : this.data.swiperCur - 1
        });
    },
    next() {
        this.setData({
            swiperCur: this.data.swiperCur + 1 >= 2 ? 0 : this.data.swiperCur + 1
        })
    },
    show_num(n) {
        var len = String(n).length;
        this.setData({
            len: len,
        })
        var char = String(n).split("")
        // h存储数字块高度
        var h = ''
        let self = this
        // 创造节点选择器
        wx.createSelectorQuery().select('.unit-num').boundingClientRect(function (rect) {
            h = rect.height
            // 这里用数组存储所有动画 方便for循环出来的view绑定不同animation
            var animate = []
            for (var i = 0; i < len; i++) {
                animate[i] = wx.createAnimation()
                animate[i].top(-parseInt(h) * char[i]).step({
                    duration: 800
                })
                // 这里数组变量赋值 
                var deletedtodo = 'animation[' + i + ']';
                self.setData({
                    //输出动画
                    [deletedtodo]: animate[i].export()
                })
            }
        }).exec()
    },
    randomNum(Min, Max) {
        let Range = Max - Min;
        let Rand = Math.random();
        let num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    },
    popup(e) {
        let popup = e.currentTarget.dataset.popup
        console.log(app.globalData.jwt, 'jwt');

        let times = Util.formatTime(new Date() / 1000, 'Y-M-D h:m:s');
        if (e.currentTarget.dataset.id == 1) {
            app.td_app_sdk.event({
                id: '点击立即激活',
                label: '立即激活',
                params: {
                    times: times
                }
            })
        }
        else if (e.currentTarget.dataset.id == 2) {
            app.td_app_sdk.event({
                id: '点击体质自测咨询',
                label: '体质自测咨询',
                params: {
                    times: times
                }
            })
        }
        else if (e.currentTarget.dataset.id == 3) {
            app.td_app_sdk.event({
                id: '点击免费领取体质自测券',
                label: '免费领取体质自测券',
                params: {
                    times: times
                }
            })
        }

        var _this = this;
        if (app.globalData.jwt) {
            console.log('set')
            this.setData({
                showAuthorize: true
            });
            setTimeout(function() {
                _this.setData({
                    showAuthorize: false
                });
            }, 1);
        }
        else {
            this.setData({
                showAuthorize: false
            });
            setTimeout(function () {
                _this.setData({
                    showAuthorize: true
                });
            }, 1);
            return false;
        }
        this.setData({
            popup: popup
        });
    },
    handleContact(e) {
        let times = Util.formatTime(new Date() / 1000, 'Y-M-D h:m:s');
        if(e.currentTarget.dataset.id == 1) {
            app.td_app_sdk.event({
                id: '点击立即激活',
                label: '立即激活',
                params: {
                    times: times
                }
            })
        }
        else if (e.currentTarget.dataset.id == 2) {
            app.td_app_sdk.event({
                id: '点击体质自测咨询',
                label: '体质自测咨询',
                params: {
                    times: times
                }
            })
        }
        else if (e.currentTarget.dataset.id == 3) {
            app.td_app_sdk.event({
                id: '点击免费领取体质自测券',
                label: '免费领取体质自测券',
                params: {
                    times: times
                }
            })
        }
    },
    getNum(n, m) {
        var arrNum = [];
        for(var i = 0 ; i<n ; i++){
            var val = Math.floor(Math.random() * m);
            // 过滤重复方式一
            if (arrNum.indexOf(val) === -1) {
                arrNum.push(val)
            } else {
                i--;
            }
        }
        return arrNum;
    },
    login() {
        // 登录
        var url = Util.BASE_URL + 'v1/users';
        var _this = this;
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    //TODO
                    wx.request({
                        url: url,
                        data: {
                            code: res.code
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                            console.log(res,'res2')
                            // if (res.data.showGif) {
                            //     app.globalData.jwt = res.data.jwt;
                            //     _this.setData({
                            //         showGif: res.data.showGif,
                            //         showAuthorize: false
                            //     });
                            // }
                            // else {
                            //     app.globalData.session_key = res.data.session_key;
                            //     _this.setData({
                            //         showAuthorize: true
                            //     });
                            // }
                            app.globalData.session_key = 'asdkjkfljsakldf';
                            _this.setData({
                                showAuthorize: true
                            });
                                                       
                        },
                        fail: function (res) {
                            wx.showToast({
                                title: '网络错误',
                                icon: 'loading',
                                duration: 10000
                            });
                        }
                    });
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        })
    }    
});