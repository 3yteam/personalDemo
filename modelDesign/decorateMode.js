// // 单例模式
Function.prototype.after = function(afterfn) {
    var __self = this;
    return function() {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

// var getSingle = function(fn) {
// 	var result;
//     return function() {
//         return result || (result = fn.apply(this, arguments));
//     }
// }

// var createLoginLayer = function() {
// 	var div = document.createElement('div');
// 	var body=document.documentElement || document.body;
// 	// var body = document.getElementsByTagName('body');
// 	div.innerHTML = 'testing';
// 	body.children[1].appendChild(div);
// 	console.log(div);
// 	return div;
// }

//装饰者模式
var showLogin = function() {
    console.log('􏷴􏶻􏽾􏽿􏾀􏶸打开登陆浮层');
    // var createSingleLoginLayer = getSingle(createLoginLayer);

	// var loginLayer1 = createSingleLoginLayer();
};
var log = function() {
    console.log('􏷬􏷒􏵂􏽵􏲙上报标签为: ' + this.getAttribute('tag'));
};
window.onload=function() {
	document.getElementById('button').onclick=showLogin.after(log);
}
 
