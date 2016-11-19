Function.prototype.bind = function() {
    var self = this, // 保存原函数
        context = [].shift.call(arguments),
        args = [].slice.call(arguments);
    return function() { // 返回一个新的函数
        // 需要绑定的 this 上下文 // 剩余的参数转成数组
        return self.apply(context, [].concat.call(args, [].slice.call(arguments))); // 执行新的函数的时候,会把之前传入的 context 当作新函数体内的 this
        // 并且组合两次分别传入的参数,作为新函数的参数
    }
};
var obj = {
    name: 'sven'
};
var func = function(a, b, c, d) {
    console.log(this.name); // 输出:sven
    console.log([a, b, c, d]) // 输出:[ 1, 2, 3, 4 ]
}.bind(obj, 1, 2);
func(3, 4);


// shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
// slice() 方法可从已有的数组中返回选定的元素。



var cache = {};
var mult = function() {

    var args = Array.prototype.join.call(arguments, ',');
    if (cache[args]) {
        return cache[args];
    }
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return cache[args] = a;
};
var test = mult(1, 2, 3);
console.log(test);




var report = (function() {
    var imgs = [];
    return function(src) {
        var img = new Image();
        imgs.push(img);
        img.src = src;
    }
})();

// report( 'http://xxx.com/getUserInfo' );
