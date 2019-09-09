$(function() {
	// 首页轮播
	if ($('#indexbanner').length) {
		var indexbanner = new Swiper('#indexbanner', {
			autoplay: true, // 可选选项，自动滑动
			loop: true, // 循环播放
			pagination: {
			    el: '.swiper-pagination',
			},
		});
	};
	// 隐藏轮播
	$('#hiddenbanner').on('click', function() {
	    $('#indexbanner').hide();
	    $('#showbanner').show();
	});
	// 展示轮播
	$('#showbanner').on('click', function() {
	    $('#indexbanner').show();
	    $('#showbanner').hide();
	});

	// 首页切换
	$('.game-nav').on('click', '.item', function() {
		console.log(11)
		$(this).addClass('active').siblings('.item').removeClass('active');
		$('.casino-cont').hide().eq($(this).index()).show();
	})
});