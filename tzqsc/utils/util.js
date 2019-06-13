//url相关
const BASE_URL = "https://api.xmxservice.laoren.com/";
const projectName = "退休族体质轻松测";
const wxAppid = 'wx494da24124922a05';
const appkey = '4C3DB1669B2242B6A411D07672D13DD0';

const versionName = '1.0';                          // versionName为小程序的用户可见版本号；
const versionCode = '1.0';                          // versionCode为小程序的内部版本号，便于版本管理
const getLocation = false;                          // 默认不获取用户位置
const autoOnPullDownRefresh = false;                // 默认不统计下拉刷新数据
const autoOnReachBottom = false;                    // 默认不统计页面触底数据

function formatTime(number, format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {
    BASE_URL: BASE_URL,
    projectName: projectName,
    wxAppid: wxAppid,
    appkey: appkey,
    versionName: versionName,
    versionCode: versionCode,
    getLocation: getLocation,
    autoOnPullDownRefresh: autoOnPullDownRefresh,
    autoOnReachBottom: autoOnReachBottom,
    formatTime: formatTime
}
