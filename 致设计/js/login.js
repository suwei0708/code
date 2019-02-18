$('input[type="password"]').bind("input propertychange", function(event) {
	var thisLength = $(this).val();
	if (thisLength.length >= 6 && thisLength.length <= 20) {
		$('.cwTips').text('')
	} else if (thisLength.length == 0) {
		$('.cwTips').text('')
	} else {
		$('.cwTips').text('密码长度必须6位以上或者20位以下')
	}
})

//循环 判断删除按钮显示
mui('.loginContMain').each(function() {
	$(this).find('input').bind("input propertychange", function(event) {
		if ($(this).val() != '') {
			$(this).siblings('.icon').show();
		} else {
			$(this).siblings('.icon').hide();
		}
	});
	$(this).find('.icon-qingchu').on('tap', function() {
		$(this).siblings('input').val('');
		$(this).hide();
	})
});
//添加焦点
$('input.inputS').focus(function() {
	$(this).parent().css('border-color', '#0084FF');
});
$('input.inputS').blur(function() {
	$(this).parent().css('border-color', '#eee');
});


//60 验证吗
var countdown = 60;

function settime(obj) { //发送验证码倒计时
	var obj = $("#code");
	if (countdown == 0) {
		obj.attr('disabled', false);
		//obj.removeattr("disabled"); 
		obj.val("重新发送");
		obj.css({
			background: '#2ed25d',
			color: '#fff',
			borderColor: '#2ed25d'
		});
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val(countdown + 's' + " 重新发送");
		obj.css({
			background: '#eee',
			color: '#333',
			borderColor: '#eee'
		});
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
}
