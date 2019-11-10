$(function() {
    /*
     * 首页
    */
    // 大赛时间
    var nowDate = new Date();
    var year = nowDate.getFullYear(); //得到年份
    var month = nowDate.getMonth() + 1;//得到月份
    month = month < 10 ? '0' + month : month;
    var date = nowDate.getDate();//得到日期
    date = date < 10 ? '0' + date : date;
    var today = year + '' + month + '' + date;
    $.each($('.zt-times .list li'), function(i) {
        if(today == $(this).data('time') || (today >= $(this).data('start') && today <= $(this).data('end'))) {
            $(this).addClass('cur');
        }
    });

    // 参选
    $('.ztbtn-canxuan').on('click', function() {
        var cxStatus = rnd(0, 1); //随机生成0，1
        if(cxStatus == 0) {
            $('.ztbtn-canxuan').off('click');
            // 参选成功
            $.ztMsg.Alert('gou', '报名成功！开始为自己拉票吧~', '去拉票', '个人主页.html');
            // 参选成功文字变化和增加链接
            $('.ztbtn-canxuan').html('我的主页').removeClass('ztbtn-canxuan').attr('href', '个人主页.html');
            return false;
        }
        else {
            // 参选失败
            $.ztMsg.Confirm('tan', '需要 3 个或以上原创作品<br>才能参加哦');
        }
    });

    /*
     * 参选设计师
    */
    var voteNum = 10; //投票次数
    $('.list-election').on('click', '.ztbtn', function() {
        if (!$(this).hasClass('ztbtn-dis')) {
            // 投票结束弹窗
            // voteTips('fail', '<span class="yellow">投票已经结束</span>');

            if (voteNum == 0) {
                // 投票次数用完
                voteTips('suc', '<span class="yellow">明天再来吧,</span>今天的投票次数已用完。');
            } else {
                // 投票次数减1
                voteNum--;
                if (voteNum == 9) {
                    // 第一票弹窗
                    $.ztMsg.Alert('gou', '<span class="yellow f18">投票成功</span><br>连续投票7天、15天、25天、即可获得奖励');
                } else if (voteNum == 0) {
                    // 最后一票投完
                    voteTips('suc', '<span class="yellow">明天再来吧,</span>今天的投票次数已用完。');
                } else {
                    voteTips('suc', '您今天还可以投 <span class="yellow">' + voteNum + ' </span>票');
                }
                $(this).html('再投一票');
                // 票数加1
                $(this).parents('li').find('.num').html(+$(this).parents('li').find('.num').html() + 1);
            }
        };
    });

    /*
     * 个人主页
    */
    // 投票
    $('.vote-box').on('click', '.ztbtn', function() {
        if (!$(this).hasClass('ztbtn-dis')) {
            // 投票结束弹窗
            // voteTips('fail', '<span class="yellow">投票已经结束</span>');

            if (voteNum == 0) {
                // 投票次数用完
                voteTips('suc', '<span class="yellow">明天再来吧,</span>今天的投票次数已用完。');
            } else {
                // 投票次数减1
                voteNum--;
                if (voteNum == 9) {
                    // 第一票弹窗
                    $.ztMsg.Alert('gou', '<span class="yellow f18">投票成功</span><br>连续投票7天、15天、25天、即可获得奖励');
                } else if (voteNum == 0) {
                    // 最后一票投完
                    voteTips('suc', '<span class="yellow">明天再来吧,</span>今天的投票次数已用完。');
                } else {
                    voteTips('suc', '您今天还可以投 <span class="yellow">' + voteNum + ' </span>票');
                }
				// 个人拉票页
				$(this).find('p').html('再投一票');
				$('.rank').find('.num').html(+$('.rank').find('.num').text() + 1);
            }
        }
    });

	/*
	 * 十强公布
	 */
	// 公布结果保存地址
	$('.zt-address .input').bind('input propertychange', function() {
	    var len = 0;
	    var _this = $(this);
	    $.each(_this.parents('.list').find('.input'), function(i) {
	        if (!$.trim($(this).val())) {
	            return false;
	        }
	        len++;
	    });
	    if (len == _this.parents('.list').find('.input').length) {
	        $('.zt-address').find('.btn').removeClass('btn-dis').addClass('btn-submit');
	    }
	});

	$('.zt-address').on('blur', '.input', function() {
	    var len = 0;
	    var _this = $(this);
	    $.each(_this.parents('.list').find('.input'), function(i) {
	        if (!$.trim($(this).val())) {
	            return false;
	        }
	        len++;
	    });
	    if (len == _this.parents('.list').find('.input').length) {
	        console.log('==')
	        $('.zt-address').find('.btn').removeClass('btn-dis').addClass('btn-submit');
	    }
	});

	$('.zt-address').on('click', '.btn', function() {
	    if ($(this).hasClass('btn-dis')) {
	        return false;
	    }
	    voteTips('suc', '保存成功')
	    return false;
	});
});

/*复制代码到剪切板*/
function copyToClipboard(){
    var e = document.getElementById('contents');//对象是contents
    e.select(); //选择对象
    document.execCommand('Copy'); //执行浏览器复制命令
}

// alert和confirm美化，调用方法
// icon根据提示符号显示，有gou(勾),tan(叹号),zan(赞),liwu(礼物); msg为提示信息，btntxt为按钮文字，不填无按钮
// $.ztMsg.Alert('icon', 'msg', 'btntxt', 'btnlink');
// $.ztMsg.Confirm('icon', 'msg', 'btntxt', 'btnlink', func);
(function() {
    jQuery.ztMsg = {
        Alert: function(icon, msg, btntxt, btnlink) {
            GenerateHtml('alert', icon, msg, btntxt, btnlink);
            btnOk();
            btnNo();
        },
        Confirm: function(icon, msg, btntxt, btnlink, callback) {
            GenerateHtml('confirm', icon, msg, btntxt, btnlink);
            btnOk(callback);
            btnNo();
        }
    }
    //生成Html
    var GenerateHtml = function(type, icon, msg, btntxt, btnlink) {
        var _html = '<div id="ztpopup" class="ztpopup ztpopup-' + icon + '"><div id="ztpopup-box" class="ztpopup-box"><a href="javascript:;" class="ztpopup-close" id="zt-close"><span class="icon-guanbi1"></span></a>';
        _html += '<div class="ztpopup-ct"><span class="tipicon tipicon-' + icon + '"></span><p>' + msg + '</p></div>';
        if(!btnlink) {
            btnlink = 'javascript:;'
        }
        if(!btntxt) {
            btntxt = '确定'
        }
        else {
            if (type == 'alert') {
                _html += '<div class="ztpopup-btn"><a class="ztbtn" id="zt-ok" href="' + btnlink + '">' + btntxt +'</a></div>';
            }
            else if (type == 'confirm') {
                _html += '<div class="ztpopup-btn"><a class="ztbtn-sure" id="zt-ok" href="' + btnlink + '">' + btntxt +'</a>';
                _html += '<a class="ztbtn-cancel" id="zt-no" href="javascript:;">再看看</a></div>';
            }
        }
        _html += '</div></div>';
        //必须先将_html添加到body，再设置Css样式
        jQuery('body').append(_html);
    }

    //确定按钮事件
    var btnOk = function(callback) {
        jQuery('#zt-ok').on('click', function() {
            jQuery('#ztpopup').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
    }
    //取消按钮事件
    var btnNo = function() {
        jQuery('#zt-no, #zt-close').on('click', function() {
            jQuery('#ztpopup').remove();
        });
    }
})();

function rnd(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n)
};

// 保存成功失败 status为suc或者fail，cont为提示的内容
var tipTimeout;

function voteTips(status, cont, times) {
    var time;
    if (status == 'suc') {
        icon = 'gou'
    }
    if (status == 'fail') {
        icon = 'fail'
    }
    times ? time = times : time = 1000
    $('body').append('<div class="vote-tips-mask"><div class="vote-tips">' + '<span class="icon icon-' + icon + '"></span>' + '<span class="text">' + cont + '</span>' + '</div></div>');
    $('.vote-tips').css({
        'margin-left': -$('.vote-tips').outerWidth() / 2
    }).show();
    if (tipTimeout) {
        clearTimeout(tipTimeout);
    }
    tipTimeout = setTimeout(function() {
        $('.vote-tips-mask').remove();
    }, time);
};

function getQueryString(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}