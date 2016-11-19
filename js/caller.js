function callerDemo() {
    if (callerDemo.caller) {
        var a = callerDemo.caller.toString();
        // alert(a);
    } else {
        // alert("this is a top function");
    }
}

function handleCaller() {
    callerDemo();
}
handleCaller()

 Function.prototype.bind2 = function (oThis) {
            if (typeof this !== "function") {
                throw new TypeError("error");
            }
            var aArgs = [],
               // 函数赋给fToBind
                fToBind = this, 
                // fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(oThis,aArgs.concat(Array.prototype.slice.call(arguments)));
                };
            // fNOP.prototype = this.prototype;
            // fBound.prototype = new fNOP();
            fBound.prototype=fToBind.prototype;
            return fBound;
        };

var test={
	name:'lanyan',
	age:'20'
}

function myfun() {
	console.log(this.name);
}

myfun.bind2(test)()


//ie8不支持bind方法，这里做兼容处理
    // if (!Function.prototype.bind) {
        Function.prototype.bind2 = function (oThis) {
            if (typeof this !== "function") {
                throw new TypeError("error");
            }
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                            ? this
                            : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        };
    // }



