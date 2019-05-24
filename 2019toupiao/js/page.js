$(function() {
	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
	    handleFontSize();
	} else {
	    if (document.addEventListener) {
	        document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
	    } else if (document.attachEvent) {
	        document.attachEvent("WeixinJSBridgeReady", handleFontSize);
	        document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
	    }
	}

	function handleFontSize() {
	    /*设置网页字体为默认大小*/
	    WeixinJSBridge.invoke('setFontSizeCallback', {
	        'fontSize': 0
	    });
	    /*重写设置网页字体大小的事件*/
	    WeixinJSBridge.on('menu:setfont', function() {
	        WeixinJSBridge.invoke('setFontSizeCallback', {
	            'fontSize': 0
	        });
	    });
	}
	var isClick = true;
	$('body').on('click', '.btn-vote', function() {
		var voteUrl = '/xapi/vote/create.html';
		var _this = $(this);
		var id = _this.attr('data-id');
		if (!isClick) { return false; }
		isClick = false;
		$.ajax({
			url: voteUrl,
			type: 'POST',
			dataType: 'json',
			async: false,
			data: {
				id: id
			}
		})
		.done(function(res) {
			if (res.status == '0') {
				var $num = _this.parents('.vote-box').find('.num');
				$num.html(+$num.html() + 1);
				popup('suc', '投票成功！', '感谢您对本报社的支持~');
			}
			else {
				popup('fail', '投票失败！', '每人只能投一次，谢谢支持...');
			}
		})
		.fail(function() {
			alert('网络错误，请稍候再试');
		})
		.always(function() {
			isClick = true;
		});
	});


    $('body').on('click', '.popup-box', function() {
        $(this).remove();
	})
	.on('click', '.popup', function(e) {
	    e.stopPropagation();
	})
	.on('click', '.popup .btn', function() {
	    $(this).parents('.popup-box').remove();
	});
});

function popup(status, txt1, txt2) {
    var $dom = '<div class="popup-box popup-' + status + '">'
					+'<div class="popup">'
						+'<div class="icon"></div>'
						+'<div class="txt">' + txt1 + '</div>'
						+'<div class="tips">' + txt2 + '</div>'
						+'<div class="btn-box">'
							+'<button class="btn" type="button">知道了</button>'
						+'</div>'
					+'</div>'
				+'</div>'
	$('body').append($dom);
}