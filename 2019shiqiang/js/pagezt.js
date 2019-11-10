(function($) {
$(function() {
    /*
     * 首页
    */

	// 导航 十强竞猜、十强公布未开始
	$('.zt-nav').on('click', '.notimes', function() {
		if($(this).text() == '竞猜十强') {
			voteTips('fail', '<span class="yellow">竞猜十强未开始，过几天再来吧</span>')
		}
		else {
			voteTips('fail', '<span class="yellow">十强设计师还未公布，过几天再来吧</span>')
		}
		return false;
	});
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

	showCur();
	var timer;
	$(window).on('scroll', function() {
	    clearInterval(timer);
	    timer = setTimeout(showCur, 100);
	});

	function showCur() {
	    if ($(window).scrollTop() > $(window).height()) {
	        $('.zt-talk').show();
	    } else {
	        $('.zt-talk').hide();
	    };
	}

    // 报名
    $('.ztbtn-canxuan').on('click', function() {
		var cxStatus = rnd(0, 2); //随机生成0~2
        if(cxStatus == '0') {
			// 参与成功
            $('.ztbtn-canxuan').off('click');
            // 参选成功弹窗提示
            $.ztMsg.Alert('gou', '<span class="yellow f18">报名成功</span><br>可以去为自己拉票啦', '去拉票', '个人拉票页.html#navlink');
            // 参选成功文字变化和增加链接
            $('.ztbtn-canxuan').html('个人主页').removeClass('ztbtn-canxuan').attr('href', '个人拉票页.html#navlink');
            return false;
		}
		else if (cxStatus == '1') {
			voteTips('fail', '报名已经结束了，明年早点来哦！');
		}
        else {
            // 参选失败弹窗提示
			$.ztMsg.Alert('tan', '需要 <span class="yellow f18">3</span> 个或以上原创<br>作品才能参加哟~', '上传作品', 'http://www.zhisheji.com/zuopin/product/add/2/0');
        }
    });

    /*
     * 参赛设计师投票
    */
    var voteNum = 10; //投票次数
    $('.list-election').on('click', '.ztbtn', function() {
        if(!$(this).hasClass('ztbtn-dis')) {
			// 投票结束弹窗
			// voteTips('fail', '<span class="yellow">投票已经结束</span>');

            if(voteNum == 0) {
                // 投票次数用完
                voteTips('suc', '<span class="yellow">明天再来吧,</span>今天的投票次数已用完。');
            }
            else {
                // 投票次数减1
                voteNum--;
                if (voteNum == 9) {
					// 第一票弹窗
					$.ztMsg.Alert('gou', '<span class="yellow f18">投票成功</span><br>连续投票7天、15天、25天、即可获得丰厚奖励', '确定');
				}
				else if (voteNum == 0) {
					// 最后一票投完
					voteTips('suc', '<span class="yellow">明天再来吧,</span>今天的投票次数已用完。');
				}
				else {
					voteTips('suc', '您今天还可以投 <span class="yellow">' + voteNum + ' </span>票');
				}
                $(this).html('再投一票');
                // 票数加1
                $(this).parents('li').find('.num').html(+$(this).parents('li').find('.num').html() + 1);
            }
        };
	});

	/*
	 * 投票送豪礼
	*/
	// 兑换记录
	$('.btn-duihuan').on('click', function() {
		var dhStatus = rnd(0, 1); //随机生成0~1
		if (dhStatus == '0') {
			// 没有兑换
			voteTips('fail', '你还没有兑换过奖品');
		}
		else {
			// 兑换记录
			$('.ztpopup-lucydraw').show();
			centerObj('.ztpopup-lucydraw .ztpopup-box');
		}
	});

	// 当前日期
	if ($('.vote-date').length) {
		function getDates(currentTime) { //JS获取当前周从星期一到星期天的日期
		    var currentDate = new Date(currentTime)
		    var timesStamp = currentDate.getTime();
		    var currenDay = currentDate.getDate();
		    var dates = [];
		    for (var i = 0; i < 7; i++) {
		        var nowDay = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 11) % 7)).toLocaleDateString().replace(/\//g, '-');
		        nowDay = nowDay.substring(nowDay.lastIndexOf("-")).replace('-', '');
		        nowDay = nowDay.substring(nowDay.lastIndexOf("月")).replace('月', '').replace('日', '');
		        today = nowDay >= 10 ? nowDay : '0' + nowDay;
		        dates.push(today);
		    }
		    return dates
		}
		var now = new Date();
		var daysOfThisWeek = getDates(now);
		$.each(daysOfThisWeek, function(i) {
			if (today == daysOfThisWeek[i]) {
				$('.vote-date').find('dl').eq(i).find('dd').html('<span class="today">' + daysOfThisWeek[i] + '</span>')
			}
			else {
				$('.vote-date').find('dl').eq(i).find('dd').html('<span>' + daysOfThisWeek[i] + '</span>')
			}
		});
	}

	// 是否展示兑换记录（其他页面跳转）
	if ($('.btn-duihuan').length) {
		if (getQueryString('popup') == 1) {
			$('.ztpopup-lucydraw').show();
			centerObj('.ztpopup-lucydraw .ztpopup-box');
		}
	}

    /*
     * 竞猜
    */

	// 是否有竞猜
	if ($('.zt-supporter').find('li').length > 0) {
		$('.zt-supporter').show();
	}

	// 点击竞猜
    $('.list-myelection').on('click', '.ztbtn-vote', function() {
		if($(this).hasClass('ztbtn-dis')) {
			$('.zt-supporter').find('.li' + $(this).attr('data-id')).remove();
			$(this).removeClass('ztbtn-dis').html('猜TA入围');
			if ($('.zt-supporter').find('li').length == '0') {
				$('.zt-supporter').hide();
			}
			return false;
		}
		var $num = $('.zt-supporter').find('li').length;
		if($num < 10) {
			var selectBox = '<li class="li' + $(this).attr('data-id') + '"><a href="个人拉票页.html#navlink" target="_blank"><img src="http://www.zhisheji.com/uc_server/data/avatar/000/14/64/10_avatar_middle.jpg" width="78" height="78" alt=""></a><p><a href="个人拉票页.html#navlink" target="_blank">' + $(this).parents('li').find('h2').text() + '</a></p></li>';
			$('.zt-supporter').show().find('.list ul').append(selectBox);
			$(this).addClass('ztbtn-dis').html('取消');
		}
		else {
			voteTips('fail', '只能选择10位');
		}
    });

    /*
     * 个人拉票页
    */
    // 复制拉票链接
    $('#contents').css('opacity', 0);
    $('.vote-copy').on('click', function() {
        $('#contents').val('我正在参加2018年度十强设计师竞选，求支持~ ' + window.location.href);
        copyToClipboard();
        voteTips('suc', '复制成功');
    });

    // 个人拉票页通知滚动
	// 无缝滚动
	if ($('.notices').length) {
	    $('.notices').rollNoInterval().left();
	};
	if ($('.notices2').length) {
		setTimeout(function() {
			$('.notices2').rollNoInterval().left();
		}, 3000);
	};

    // 个人拉票页投票
    $('.vote-box').on('click', '.ztbtn', function() {
        if(!$(this).hasClass('ztbtn-dis')) {
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
                    $.ztMsg.Alert('gou', '<span class="yellow f18">投票成功</span><br>连续投票7天、15天、25天、即可获得丰厚奖励', '确定');
                } else if (voteNum == 0) {
                    // 最后一票投完
                    voteTips('suc', '<span class="yellow">明天再来吧,</span>今天的投票次数已用完。');
                } else {
                    voteTips('suc', '您今天还可以投 <span class="yellow">' + voteNum + ' </span>票');
				}
				if ($(this).find('.icon-praise2').length) {
					// 个人拉票页
					$(this).find('p').html('再投一票');
					$('.rank').find('.num').html(+$('.rank').find('.num').text() + 1);
				}
				else {
					// 列表页
					$(this).html('再投一票');
				}
                // 票数加1
                $(this).parents('li').find('.num').html(+$(this).parents('li').find('.num').html() + 1);
            }
        }
	});

	// 修改宣言
	$('.zt-personal').on('click', '.icon-feedback', function() {
		$('.ztpopup-xuanyan').find('.textarea').val($('.zt-personal').find('.xuanyan').html())
		numbox();
		$('.ztpopup-xuanyan').show();
	});
	// 保存宣言
	$('.ztpopup-xuanyan').on('click', '.btn', function() {
		if (!$('.ztpopup-xuanyan').find('.textarea').val()) {
			voteTips('fail', '参赛宣言不能为空！');
			return false;
		}
		$('.zt-personal').find('.xuanyan').html($('.ztpopup-xuanyan').find('.textarea').val());
		voteTips('suc', '保存成功');
		$('.ztpopup-xuanyan').hide();
	});

	// 字数判断
	function numbox() {
	    if ($('.num-box').length) {
	        $.each($('.num-box'), function(i) {
	            monitorVal($(this).parent().find('.input'), $(this).find('.num').text(), 'minus');
	        });
	    }
	}

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
		if($(this).hasClass('btn-dis')) {
			return false;
		}
		voteTips('suc', '保存成功')
        return false;
	});
});
})(jQuery);

// alert和confirm美化，调用方法
// icon根据提示符号显示，有gou(勾),tan(叹号),zan(赞),liwu(礼物); msg为提示信息，btntxt为按钮文字，不填无按钮
// $.ztMsg.Alert('icon', 'msg', 'btntxt', 'btnlink');
// $.ztMsg.Confirm('icon', 'msg', 'btntxt', 'btnlink', func);
(function() {
    jQuery.ztMsg = {
        Alert: function(icon, msg, btntxt, btnlink, callback) {
            GenerateHtml('alert', icon, msg, btntxt, btnlink);
            btnOk(callback);
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
        var _html = '<div id="ztpopup" class="ztpopup ztpopup-' + icon + '"><div id="ztpopup-box" class="ztpopup-box"><a href="javascript:;" class="ztpopup-close" id="zt-close"><span class="icon-fail"></span></a>';
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
        GenerateCss();
    }

    //生成css
    var GenerateCss = function() {
        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高
        var boxWidth = jQuery('#ztpopup-box').outerWidth();
        var boxHeight = jQuery('#ztpopup-box').outerHeight();
        //让提示框居中
        jQuery('#ztpopup-box').css({
            top: (_height - boxHeight) / 2 + 'px',
            left: (_widht - boxWidth) / 2 + 'px'
        });
    }
    //确定按钮事件
    var btnOk = function(callback) {
        jQuery('#zt-ok').on('click', function() {
            jQuery('#ztpopup').remove();
            if (typeof(callback) == 'function') {
                callback();
            }
        });
        jQuery('#ztpopup').on('click', function() {
            $(this).remove();
        });
        jQuery('#ztpopup').on('click', '.ztpopup-box', function(e) {
            e.stopPropagation();
        });
    }
    //取消按钮事件
    var btnNo = function() {
        jQuery('#zt-no, #zt-close').on('click', function() {
            jQuery('#ztpopup').remove();
        });
	}

	// 通用下拉
	$('body').on('mouseover', '.item-select dd', function() {
		if ($(this).find('.select-list').is(':hidden')) {
			$('.select-list').hide();
			$('.item-select').css('z-index', 'auto');
			$(this).parents('.item-select').css('z-index', '980');
			$(this).find('.select-list').show();
		}
		return false;
	})
	.on('click', '.select-list li', function() {
		var txtDom = $(this).parents('.item-select').find('.input');
		if (txtDom.is('input')) {
			txtDom.val($(this).text());
		} else {
			txtDom.html($(this).text());
		}
		txtDom.focus().blur();
		$(this).parents('.select-list').hide();
		$('.item-select').css('z-index', 'auto');
		return false;
	})
	.on('mouseout', '.item-select dd', function() {
		if ($('.select-list').is(':visible')) {
			$('.select-list').hide();
		}
	});
})();

function rnd(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n)
};

function copyToClipboard(){
    var e=document.getElementById('contents');//对象是contents
    e.select(); //选择对象
    document.execCommand('Copy'); //执行浏览器复制命令
}

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
    if(tipTimeout) {
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