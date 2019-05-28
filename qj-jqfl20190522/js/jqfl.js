$(function () {
    // 复制
    $('.ct-copy').on('click', '.btn', function () {
        copyToClipboard();
        tipSave('suc', '复制成功!');
    });
    // 修改价格
    $('.ct-price').on('click', '.btn', function () {
        var val = $.trim($('.txt-price').val());
        if (val && val >= 0 && val <= 98) {
            var txt = '专注于 PS AI C4D高精教程的巧匠VIP ,在我这里购买可以优惠' + val + '元';
            var link = 'http://www.qiaojiang.tv/fl/111'
            console.log(txt)
            $('.ct-copy').find('.txt').html(txt);  // 显示的文字
            $('#contents').val(txt + ' ' + link); // 复制的文字

            tipSave('suc', '修改成功!');
        }
        else {
            tipSave('fail', '优惠价格错误');
        }
    });
    $('.txt-price').on('change', function () {
        var val = $.trim($(this).val());
        if (!val || val < 0) {
            $(this).val(0);
        }
        else if(val > 98) {
            $(this).val(98);
        }
    });

    // 菜单切换
    $('.jqfl-nav').on('click', 'li', function() {
        $(this).addClass('cur').siblings('li').removeClass('cur');
        $('.tab-cont').hide().eq($(this).index()).show();
    });
    // 菜单横线动画
    if($('.jqfl-nav').length) {
        $('.jqfl-nav').moveline({
            color:'#ff8d01',
            height: 2,
            animateType: '',
            click:function(ret){
                ret.ele.addClass('cur').siblings().removeClass('cur');
                ret.ele.parents('.jqfl-nav').find('.tab-cont').hide().eq(ret.index).show();
            }
        });
    }

    // 点击提现弹窗
    $('.btn-tx').on('click', function() {
        $('.popup-withdrawals').show();
        $('.mask').show();
    });

    // 提现非空判断
    $('.popup-withdrawals').on('click', '.btn', function() {
        var text1 = $(this).parents('.popup-withdrawals').find('.text').eq(0);
        var text2 = $(this).parents('.popup-withdrawals').find('.text').eq(1);
        if(!$.trim(text1.val())) {
            alert('请输入提现金额！')
            text1.focus();
            return false;
        }
        if(!$.trim(text2.val())) {
            alert('请输入支付宝账号！')
            text2.focus();
            return false;
        }
        $('.popup-withdrawals').hide().find('.text').val('');
        $('.popup-withdrawals-suc').show();
	});

	// 价格切换
	$('.jqfl-main2').on('click', '.price li', function() {
		$(this).addClass('cur').siblings().removeClass('cur');
		$('.jqfl-main2 .info').find('strong').html($(this).find('.fr strong').text());
		$('.jqfl-main2 .info').find('span').html($(this).find('.fr span').text());
	});
});

// 保存成功失败 status为suc或者fail，cont为提示的内容
function tipSave(status, cont) {
    if(!$('.user-tip').size()) {
        $('body').append('<div class="user-tip">'
            + '<span class="user-ico ico-' + status + '"></span>'
            + '<span class="text">' + cont + '</span>'
        +'</div>');
    }
    else {
        $('.user-tip').find('.user-ico').attr('class', 'user-ico ico-' + status);
        $('.user-tip').find('.text').html(cont);
    }
    $('.user-tip').show();
    $('.mask').show();
    setTimeout(function() {
        $('.user-tip').hide();
        $('.mask').hide();
    }, 1500);
}