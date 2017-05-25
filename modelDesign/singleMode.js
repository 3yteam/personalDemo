// 单例模式

var getSingle = function(fn) {
	var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}

var createLoginLayer = function() {
	var div = document.createElement('div');
	var body=document.documentElement || document.body;
	// var body = document.getElementsByTagName('body');
	div.innerHTML = 'testing';
	body.children[1].appendChild(div);
	console.log(div);
	return div;
}

window.onload=function() {
	var createSingleLoginLayer = getSingle(createLoginLayer);

	var loginLayer1 = createSingleLoginLayer();
	console.log(loginLayer1);

	var loginLayer2 = createSingleLoginLayer();
	console.log(loginLayer2);
}

