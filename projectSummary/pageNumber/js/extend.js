// jq的extend()方法能很方便的实现扩展对象方法，语法如下：$.extend(obj1,boj2,obj3);

function cloneObj(oldObj) { //复制对象方法
	if (typeof(oldObj) != 'object') return oldObj;
	if (oldObj == null) return oldObj;
	var newObj = new Object();
	for (var i in oldObj)
		newObj[i] = cloneObj(oldObj[i]);
	return newObj;
};

function extendObj() { //扩展对象
	var args = arguments;
	if (args.length < 2) return;
	var temp = cloneObj(args[0]); //调用复制对象方法
	for (var n = 1; n < args.length; n++) {
		for (var i in args[n]) {
			temp[i] = args[n][i];
		}
	}
	return temp;
}
// var t = extendObj(o1, o2, o3);