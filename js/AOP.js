Function.prototype.before = function(beforefn) {
    var __self = this; // 保存原函数的引用

    // 返回包含了原函数和新函数的"代理"函数
    return function() {
        var check = beforefn.apply(this, arguments); // 执行新函数,修正 this
        if(check) {
            //在表单验证的时候游泳，在errormsg有值，说明表单验证未通过
            return;
        }
        var ret2 = __self.apply(this, arguments); // 执行原函数
        return ret2;
    }
};

Function.prototype.after = function(afterfn) {

    var __self = this;  //保存原函数的引用，这里指向before里的回调部分

    return function() {

        var ret = __self.apply(this, arguments);  //执行原函数,这里指向before里的回调部分
        afterfn.apply(this, arguments);  //执行新函数
        return ret;
    }
};

var func = function(param) {
    console.log(2);
    console.log(param);
};
var funcInit = func.before(function(param) {
    console.log(param);
    param.b = 'b';
    console.log(1);

}).after(function() {

    console.log(3);
});

funcInit({a: 'a'});

