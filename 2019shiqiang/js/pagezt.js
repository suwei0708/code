(function($) {
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
            // 参选成功弹窗提示
            $.ztMsg.Alert('gou', '参与成功！开始为自己拉票吧~', '进入我的参赛主页', '个人拉票页.html#navlink');
            // 参选成功文字变化和增加链接
            $('.ztbtn-canxuan').html('我的主页<span class="zticon"></span>').removeClass('ztbtn-canxuan').attr('href', '个人拉票页.html#navlink');
            return false;
        }
        else {
            // 参选失败弹窗提示
            $.ztMsg.Confirm('tan', '需要 3 个或以上原创作品才能参加哟~', '去上传', 'http://www.zhisheji.com/zuopin/product/add/2/0');
        }
    });

    /*
     * 参选设计师
    */
    var voteNum =1; //投票次数
    $('.list-election').on('click', '.ztbtn', function() {
        if(!$(this).hasClass('ztbtn-dis')) {
            if(voteNum == 0) {
                // 投票次数用完
                $.ztMsg.Alert('tan', '今天的投票数用完啦！明天再来哦~');
            }
            else {
                $(this).addClass('ztbtn-dis').html('投票成功');
                // 投票次数减1
                voteNum--;
                // 票数加1
                $(this).parents('li').find('.num').html(+$(this).parents('li').find('.num').html() + 1);
                voteTips('suc', '您今天还可以投 <span class="num">' + voteNum + ' </span>票');
            }
        };
    });

    /*
     * 竞猜
    */
    // 点击竞猜
    var selectBox;  // 弹窗取消时保留变量
    $('.list-myelection').on('click', '.ztbtn', function() {
        selectBox = $(this);
        var imgSrc = selectBox.parents('li').find('img').attr('src');
        // 竞猜个数判断，由于分页需要后台判断，这里前端做个展示
        var guessNum = $('.list-myelection').find('.ztbtn-dis').length;;
        // 竞猜数已有10个,不能竞猜直接提示
        if(guessNum == 10) {
            $.ztMsg.Alert('tan', '竞猜人数已满足十位，请等待结果公布。');
            return false;
        }

        if(!$(this).hasClass('ztbtn-dis')) {
            // 竞猜列表竞猜成功
            $(this).addClass('ztbtn-dis').html('竞猜成功');

            // 底部浮窗增加dom
            var dom = '<img src="' + imgSrc + '" alt="" myid="' + selectBox.attr('myid') + '"><span class="icon-fail"></span>'
            $('.fixed-guess').find('.img').eq(guessNum).html(dom);
        }
        else {
            // 竞猜列表取消竞猜
            $(this).removeClass('ztbtn-dis').html('竞猜TA');

            // 判断myid相同，底部悬浮删除img
            $.each($('.fixed-guess .img'), function(i) {
                if($(this).find('img').attr('myid') == selectBox.attr('myid')) {
                    $(this).html('');
                    $(this).parents('.img-box').append($(this));
                }
            });

            // 竞猜选中为0,底部悬浮隐藏
            if(guessNum - 1 == 0) {
                $('.fixed-guess').hide();
            }
        };

        // 竞猜个数判断，由于分页需要后台判断，这里前端做个展示
        guessNum = $('.list-myelection').find('.ztbtn-dis').length;;
        $('.zt-election .tit').find('.num').html(guessNum);
        $('.fixed-guess').find('.num').html(guessNum);

        // 选中10个弹出确定弹窗
        if(guessNum == 10) {
            // 展示图像直接copy底部悬浮头像
            $('.ztpopup-guess').find('.img-box').html($('.fixed-guess').find('.img-box').html());
            // 弹出弹窗
            $('.ztpopup-guess').show();
            // 选中10个底部悬浮展示确定按钮
            $('.fixed-guess .fixed-guess-btn').show();
            // 提示框居中
            var _widht = document.documentElement.clientWidth; //屏幕宽
            var _height = document.documentElement.clientHeight; //屏幕高
            var boxWidth = $('.ztpopup-guess .ztpopup-box').outerWidth();
            var boxHeight = $('.ztpopup-guess .ztpopup-box').outerHeight();
            $('.ztpopup-guess .ztpopup-box').css({
                top: (_height - boxHeight) / 2 + 'px',
                left: (_widht - boxWidth) / 2 + 'px'
            });
        }
        // 选中1个显示底部浮窗
        else if(guessNum == 1) {
            $('.fixed-guess').show();
        }
        else {
            $('.fixed-guess .fixed-guess-btn').hide();
        }
    });

    // 竞猜10位确定
    $('body').on('click', '.ztpopup-guess .ztbtn-sure', function() {
        $.ztMsg.Alert('gou', '竞猜成功，请等待结果公布。');
        $('.ztpopup-guess').hide();
        $('.fixed-guess').hide();
    })
    // 竞猜10位取消
    .on('click', '.ztpopup-guess .ztbtn-cancel', function() {
        // 判断myid相同，竞猜列表取消选中
        selectBox.removeClass('ztbtn-dis').html('竞猜TA');
        // 底部悬浮删除img
        $('.fixed-guess').find('.img').last().html('');
        // 选中个数修改
        $('.zt-election .tit').find('.num').html('9');
        $('.fixed-guess').find('.num').html('9');
        // 竞猜弹窗隐藏
        $('.ztpopup-guess').hide();
        // 选中不为10,底部悬浮确定按钮隐藏
        $('.fixed-guess .fixed-guess-btn').hide();
    })
    // 底部悬浮竞猜取消
    .on('click', '.fixed-guess .icon-fail', function() {
        var _this = $(this);
        // 判断myid相同，列表取消选中
        $.each($('.list-myelection .ztbtn-dis'), function(i) {
            if($(this).attr('myid') == _this.parents('.img').find('img').attr('myid')) {
                $(this).removeClass('ztbtn-dis').html('竞猜TA');
            }
        });
        // 底部悬浮删除img
        _this.parents('.img-box').append(_this.parents('.img').html(''));
        // 选中个数修改
        var guessNum = $('.fixed-guess').find('.img img').length;
        $('.zt-election .tit').find('.num').html(guessNum);
        $('.fixed-guess').find('.num').html(guessNum);
        // 选中为0,底部悬浮隐藏
        if(guessNum == 0) {
            $('.fixed-guess').hide();
        }
        // 选中不为10,底部悬浮确定按钮隐藏
        $('.fixed-guess .fixed-guess-btn').hide();
    })
    // 底部悬浮竞猜确认
    .on('click', '.fixed-guess .ztbtn-sure', function() {
        $.ztMsg.Alert('gou', '竞猜成功，请等待结果公布。');
        $('.ztpopup-guess').hide();
        $('.fixed-guess').hide();
    });

    /*
     * 个人拉票页
    */
    // 复制拉票链接
    $('#contents').css('opacity', 0);
    $('.vote-copy').on('click', function() {
        $('#contents').val('我正在参加2018年度十强设计师竞选，求支持~ ' + window.location.href);
        copyToClipboard();
        tipSave('suc', '复制成功');
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
            if(voteNum == 0) {
                // 投票次数用完
                $.ztMsg.Alert('tan', '今天的投票数用完啦！明天再来哦~');
            }
            else {
                $(this).addClass('ztbtn-dis').find('p').html('投票成功');
                // 投票次数减1
                voteNum--;
                // 票数加1
                $(this).parents('.zt-personal').find('.info .num').html(+$(this).parents('.zt-personal').find('.info .num').html() + 1);
                // TA的支持者增加头像和昵称
                var html = '<li>'
                               +'<a href="#" target="_blank"><img src="http://www.zhisheji.com/uc_server/data/avatar/000/14/64/10_avatar_middle.jpg" width="78" height="78" alt=""></a>'
                               +'<p><a href="#" target="_blank">新出炉小笼包</a></p>'
                           +'</li>';
                $('.supporter .list ul').find('li:last').remove();
                $('.supporter .list ul').prepend(html);
                // 滚动通知增加
                var html = '新增点击 刚刚给 狂奔的蜗牛 投了宝贵的一票';
                $('.notices ul').find('li').eq($('.notices').find('li').length - 2).html(html);
            }
        }
    });


    // 公布结果保存地址
    $('.zt-publish').on('click', '.address .btn', function() {
        var len = 0;
        $.each($(this).parents('.address').find('.input'), function(i) {
            if(!$.trim($(this).val())) {
                $.ztMsg.Alert('tan', $(this).parents('dl').find('dt').text() + '不能为空');
                return false;
            }
            len++;
        });
        if(len == $(this).parents('.address').find('.input').length) {
            $.ztMsg.Alert('gou', '提交成功');
        }
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

	// 招聘通用下拉
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
    jQuery('body').append('<div class="vote-tips">' + '<span class="icon icon-' + icon + '"></span>' + '<span class="text">' + cont + '</span>' + '</div>');
    jQuery('.vote-tips').css({
        'margin-left': -jQuery('.vote-tips').outerWidth() / 2
    }).show();
    if(tipTimeout) {
        clearTimeout(tipTimeout);
    }
    tipTimeout = setTimeout(function() {
        jQuery('.vote-tips').remove();
    }, time);
};