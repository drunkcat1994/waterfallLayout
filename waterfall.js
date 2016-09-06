var data = {
	href:[
		'21.jpg',
		'22.jpg',
		'23.jpg',
		'24.jpg',
		'25.jpg',
		'26.jpg',
		'27.jpg',
		'28.jpg',
		'29.jpg',
		'30.jpg'
	]
};
function getEleByClass(parent,name){
	var elements = parent.getElementsByTagName('div');
	var boxs = [];
	for(var i = 0; i < elements.length;i++) {
		if(elements[i].className === name) {
			boxs.push(elements[i]);
		}
	}
	return boxs;
}
function getIndex(array,elem) {
	for( var i in array) {
		if(array[i] === elem ) {
			return i;
		}
	}
}
//判断是否加载
function whetherOnload(array) {
	var lastElem = array[array.length - 1];
	//取得浏览器的滚动高度和浏览器的窗口高度，以及最后一个元素距离页面顶端的top
	var scrollHeight = document.body.scrollTop || document.bodyElement.scrollTop;
	var clientHeight = document.body.clientHeight || document.bodyElement.clientHeight;
	var wholeHeight = scrollHeight + clientHeight;
	var topValue = lastElem.style.top;
	console.log(topValue);
	if(topValue < wholeHeight) {
		return true; 
	} else {
		return false;
	}
}
function waterfall() {
	//获取main下的所有box
	var mainbox = document.getElementById('main');
	var boxs = getEleByClass(mainbox,'box');
	var len = boxs.length;
	//console.log(len);
	//获取浏览器窗口宽度和box的宽度，计算显示的列数
	//clientwidth是实时动态的宽度
	var windowWidth = document.body.clientWidth || document.bodyElement.clientWidth;
	var boxWidth = boxs[0].offsetWidth;
	var rowNumber = Math.floor(windowWidth / boxWidth);
	//console.log(rowNumber);
	var mainWidth = Math.floor(rowNumber * boxWidth);
	mainbox.style.width = mainWidth + 'px';
	//用一个数组firstRow存放一行的box
	var firstRowH = [];
	for(var i =0; i < rowNumber;i++) {
		var width = i * boxWidth;
		boxs[i].style.cssText = 'position:absolute;';
		boxs[i].style.cssText ='top:0;right:' + width +'px;';
		firstRowH.push(boxs[i].offsetHeight);
	}
	
	//将下一个元素的position设置为最小高度的元素的top和left
	for(var i = rowNumber;i < boxs.length;i++) {
		var minH = Math.min.apply(null,firstRowH);
		//console.log(minH);
		var index = getIndex(firstRowH,minH);
		console.log(index);
		var rightWidth = index * boxWidth;
		boxs[i].style.cssText = 'position:absolute;';
		boxs[i].style.cssText ="top:" + minH + 'px;right:' + rightWidth +'px;';
		firstRowH[index] = Math.floor(boxs[i].offsetHeight + minH);	
		console.log(firstRowH[index]);
	}
		//每重新放置一次，就改变存放fistRow内元素的值
	//写一个函数getIndex来获取数组内特定元素的下标
	for(var i = 0; i < data.href.length;i++) {
		if(whetherOnload(boxs)) {
			var newBox = document.createElement('div');
			newBox.className = 'box';
			mainbox.appendChild(newBox);
			var newImg = document.createElement('img');
			newImg.className = data.href[i];
			newBox.appendChild(newImg);
		}
	}
	
}
window.onload = function() {
	//var x = Math.min.apply(null,n);
	//console.log(x);
	waterfall();
}