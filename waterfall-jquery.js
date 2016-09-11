var data = {
	href:[
		'1.jpg',
		'2.jpg',
		'3.jpg',
		'4.jpg',
		'5.jpg',
		'6.jpg',
		'7.jpg',
		'8.jpg',
		'9.jpg',
		'10.jpg',
		'11.jpg',
		'12.jpg',
		'13.jpg',
		'14.jpg',
		'15.jpeg',
		'16.jpg',
		'17.jpg',
		'18.jpg',
		'19.jpg',
		'20.jpg',
		'21.jpg',
		'22.jpg',
		'23.jpg',
		'24.jpg',
		'25.jpg',
		'26.jpg',
		'27.jpg',
		'28.jpg',
		'29.jpg',
		'30.jpg',
		'31.jpg',
		'32.jpg',
		'33.jpg',
		'34.jpg',
		'35.jpeg',
		'36.jpg',
		'37.jpg',
		'38.jpg',
		'39.jpg',
		'40.jpg'
	]
};

$(window).on('load',function() {
	waterfall();
	$(window).on('scroll',function() {//jquery方法只能由jquery对象使用
		if(checkScrollslide) {
			$.each(data.href,function(index,value){
				var $newbox = $('<div>').addClass('box').appendTo($('#main'));
				$('<img>').attr('src','images/' + value).appendTo($newbox);
				//console.log(value);
			})
			waterfall();
		}
	});

});
function checkScrollslide() {
	var $lastbox = $('#main > box').last();
	var maxHeight = $lastbox.offset().top;
	var scrollHeight = $(window).scrollTop();
	var height = $(window).height();
	if(maxHeight < scrollHeight + height /2 ) {
		return true;
	} else {
		return false;
	}
}
function waterfall() {
	var $boxs = $('#main > div');
	var singleWidth = $boxs.eq(0).outerWidth();//width and outerWidth
	var mainWidth = $(window).width();
	var colNum = Math.floor(mainWidth / singleWidth);
	$('#main').width(singleWidth * colNum).css('margin','0 auto');//width()内不需要单位
	var heightArray = [];
	$boxs.each(function(index,value) {//value是一个dom对象,需要将value转换成jquery对象
		var boxHeight = $boxs.eq(index).outerHeight();
		//console.log(boxHeight);
		if(index < colNum) {
			heightArray.push(boxHeight);
		} else {
			var minHeight = Math.min.apply(null,heightArray);
			//console.log(minHeight);
			var minHIndex = $.inArray(minHeight,heightArray);//jquery的获取数组下标的方法
			//console.log(minHIndex);
			$(value).css({
				'position':'absolute',
				'top': minHeight + 'px',
				'left': singleWidth*minHIndex + 'px'});
			heightArray[minHIndex] = minHeight + boxHeight;	
		}
	})

}
/*
$(document).ready(function() {
	waterfall();
});
*/