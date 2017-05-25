// 在不支持 Object.create方法的老JavaScript引擎中，可以使用一个"polyfill"
if(!Object.create) {
	Object.prototype.create2=function(proto) {
		function ctor() { }
	    ctor.prototype = proto;
	    return new ctor();
	}
}

function A(name,from,age,sex) {
	this.name=name;
	this.from=from;
	this.age=age;
	this.sex=sex;
}

A.prototype.say=function() {
	console.log('I AM '+ this.name+', I am '+this.age);
}

function B(name,from,age,sex) {
	A.apply(this,arguments);
}

B.prototype=Object.create(A.prototype);
B.prototype.say=function() {
	console.log('testing '+this.name);
}

var Aex=new A('lanyan','HUbei','36','female');

var Bex=new B('lanyan2','HUbei2','362','female2');

Bex.say();

