//app.js
// 公共文件
var Util = require('./utils/util.js');
// 登录
var url = Util.BASE_URL + 'v1/users';
// 统计
var tdweapp = require('./utils/tdweapp.js');
App({
    onLaunch: function () {
        // 获取小程序更新机制兼容
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function () {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    });
                    updateManager.onUpdateFailed(function () {
                        // 新的版本下载失败
                        wx.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                        })
                    });
                }
            })
        } else {
            // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },
    getInfo: function () {
        wx.getUserInfo({
            success: res2 => {
                Login(res2);
            },
            fail: function () {
                wx.showModal({
                    title: '用户未授权',
                    content: '如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
                    showCancel: false,
                    success: function (resbtn) {
                        if (resbtn.confirm) {
                            wx.openSetting({
                                success: function success(resopen) {
                                    //  获取用户数据
                                    this.checkSettingStatu();
                                }
                            });
                        }
                    }
                })
            }
        });
    },
    globalData: {
        userInfo: null,
        jwt: '',
        showGif: '',
        session_key: '',
        projectName: Util.projectName
    },
});

function Login(res) {
    wx.showToast({
        title: '授权中...',
        icon: 'loading',
        duration: 10000
    });
    wx.request({
        url: url + '/1', //仅为示例，并非真实的接口地址
        data: {
            encryptedData: res.encryptedData,
            iv: res.iv,
            session_key: getApp().globalData.session_key
        },
        method: 'PUT',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            wx.hideToast();
            if (res.statusCode != 200) {
                wx.showToast({
                    title: '授权失败',
                    icon: 'loading',
                    duration: 3000
                });
                // 模拟成功
                var suc = { data: { jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIyMyJ9.LNdxoyAZNYie75ZZeQBMdeW0j1BJA2T2svTT1l2gxE8", showGif: true }}
                getApp().globalData.jwt = 'kljklfjaslkdjfkl;';
                if (getApp().jwtReadyCallback) {
                    getApp().jwtReadyCallback(suc)
                }
            }
            else {
                getApp().globalData.jwt = res.data.jwt;
                if (getApp().jwtReadyCallback) {
                    getApp().jwtReadyCallback(res)
                }
            }
        },
        fail: function (res) {
            wx.showToast({
                title: '授权失败',
                icon: 'loading',
                duration: 3000
            });
        }
    })
}