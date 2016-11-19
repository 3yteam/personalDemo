// 函数节流
var throttle = function(fn, interval) {
    var __self = fn, // 保存需要被延迟执行的函数引用 
        timer, // 定时器
        firstTime = true; // 是否是第一次调用
    return function() {
        var __me = this;
        if (firstTime) {
            // 如果是第一次调用,不需延迟执行 
            __self.apply(__me);
            return firstTime = false;
        }
        if (timer) {
            // 如果定时器还在,说明前一次延迟执行还没有完成 
            return false;
        }
        timer = setTimeout(function() {
            // 延迟一段时间执行 
            clearTimeout(timer);
            timer = null;
            __self.apply(__me);
        }, interval || 500);
    };
};

window.onresize = throttle(function() {
    console.log(1);
}, 500);


// 分时函数
var timeChunk = function(ary, fn, count) {
    var obj, t;
    var len = ary.length;

    var start = function() {
        for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
            var obj = ary.shift();
            fn(obj);
        }
    };

    return function() {
        t = setInterval(function() {
            if (ary.length === 0) { // 如果全部节点都已经被创建好
                return clearInterval(t);
            }
            start();
        }, 200); // 分批执行的时间间隔,也可以用参数的形式传入
    };
};


var ary = [];
for (var i = 1; i <= 10; i++) {
    ary.push(i);
};
var renderFriendList = timeChunk(ary, function(n) {
    var div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
}, 8);
renderFriendList();



// 惰性加载函数





