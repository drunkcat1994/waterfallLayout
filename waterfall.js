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
		if(array[i] == elem ) {
			return i;
		}
	}
}
//判断是否加载
function checkScrollslide() {
	var mainbox = document.getElementById('main');
	var boxs = getEleByClass(mainbox,'box');
	var lastElem = boxs[boxs.length - 1];
	//取得浏览器的滚动高度和浏览器的窗口高度，以及最后一个元素距离页面顶端的top
	var scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
	var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
	var wholeHeight = scrollHeight + clientHeight;
	var topValue = lastElem.offsetTop;
	if(topValue < wholeHeight) {
		return true; 
	} else {
		return false;
	}
}
function createBox(boxParent,data) {
	var newBox = document.createElement('div');
	newBox.className = 'box';
	boxParent.appendChild(newBox);
	var newImg = document.createElement('img');
	newImg.src = 'images/' + data;
	newBox.appendChild(newImg);
}
function waterfall() {
	var sumTopValue = []
	var mainbox = document.getElementById('main');
	var boxs = getEleByClass(mainbox,'box');
	//var len = boxs.length;
	//取得单个box的宽度和浏览器的宽度，求得一行有多少值
	var singleBoxW = boxs[0].offsetWidth;
	var windowWidth = document.body.clientWidth || document.bodyElement.clientWidth;
	var	rowNumber = Math.floor(windowWidth / singleBoxW);
	var mainboxW = Math.floor(rowNumber * singleBoxW);
	mainbox.style.width = mainboxW + 'px';
	for(var i = 0;i < boxs.length; i++) {
		if(i < rowNumber) {
			sumTopValue.push(boxs[i].offsetHeight);//第一行不参与定位
		} else {
			var minH = Math.min.apply(null,sumTopValue);
			var minindex = getIndex(sumTopValue,minH);
			//var rightValue = index * singleBoxW;//第一次为0
			var rightValue = boxs[minindex].offsetLeft;
			boxs[i].style.position ='absolute';//设置绝对位移
	        boxs[i].style.top = minH + 'px';
	        boxs[i].style.left = rightValue + 'px';
			sumTopValue[minindex] += boxs[i].offsetHeight;
		}
		
	}


}
window.onload = function() {
	waterfall();
	window.onscroll=function(){
		if(checkScrollslide()) {
			var mainbox = document.getElementById('main');
			for(var i = 0; i < data.href.length;i++) {
				createBox(mainbox,data.href[i]);
			}
			waterfall(); 
		}
	}
	
}