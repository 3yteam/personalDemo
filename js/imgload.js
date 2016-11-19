// 虚拟代理实现图片预加载
var myImage = (function() {
    var imgNode = document.createElement('img');
    var body =document.body || document.documentElement;
    body.appendChild(imgNode);
    return {
        setSrc: function(src) {
            imgNode.src = src;
        }
    }
})();
var proxyImage = (function() {
    var img = new Image;
    img.onload = function() {
    	setTimeout(function() {
			myImage.setSrc(this.src);
    	}.bind(this),1000);
    }
    return {
        setSrc: function(src) {
            myImage.setSrc('images/loading.gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('https://static.tuotiansudai.com//upload/20160708/96541467975330119.jpg');


// 缓存代理
var mult = function() {
    console.log('开始计算乘积');
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
};


// mult( 2, 3 );

// mult( 2, 3, 4);

var proxyMult = (function() {
    var cache = {};
    return function() {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = mult.apply(this, arguments);
    }
})();


proxyMult( 1, 2, 3, 4 );
proxyMult( 1, 2, 3, 4 );
proxyMult( 1, 2, 3, 4 );