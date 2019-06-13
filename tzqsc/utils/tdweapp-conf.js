var Util = require('./util.js');
exports.config = {
    appkey: Util.appkey,
    appName: Util.projectName,
    versionName: Util.versionName,
    versionCode: Util.versionCode,
    wxAppid: Util.wxAppid,
    getLocation: Util.getLocation,
    autoOnPullDownRefresh: Util.autoOnPullDownRefresh,
    autoOnReachBottom: Util.autoOnReachBottom
};