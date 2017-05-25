
// 最简单Demo
    // 解决: 实现了最简单的发布订阅
    // 不足: 发布者将订阅者没有订阅的事件也发给了订阅者

(function() {
    var demo = {};
    demo.clientList = [];

    demo.listen = function(fn) { 
        this.clientList.push(fn); 
    };
    demo.trigger = function() {
        for (var i = 0, fn; fn = this.clientList[i++];) { 
            fn.apply(this, arguments); 
        } 
    };

    demo.listen(function(v1, v2) { 
        console.log("v1: " + v1);
        console.log("v2: " + v2); 
    });

    demo.trigger("v1", "v2"); 

    demo.trigger("v3",'v4'); 
}());

// 简单Demo
    // 解决: 增加一个标志 让订阅者只订阅自己感兴趣的事件
    // 不足: 当订阅者在每个发布者处订阅事件时 每一个发布者对象都要重复编写部分重复代码

    (function () {

        var demo = {};

        demo.clientList = {};

        demo.listen = function (key, fn) {

            if (!this.clientList[ key ]) {
                
                this.clientList[ key ] = [];
            }
            this.clientList[ key ].push(fn);
        };

        demo.trigger = function () {

            // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值

            var key = Array.prototype.shift.apply(arguments), 
                fns = this.clientList[ key ];

            if (!fns || fns.length === 0) { // 如果没有订阅者订阅事件 则返回
                return false;
            }

            for (var i = 0, fn; fn = fns[ i++ ];) {
                    fn.apply(this, arguments);
            }
        };

        demo.listen("demo1", function (v1) {

            console.log("v1: " + v1);
        });

        demo.listen("demo2", function (v1, v2) {

            console.log("v2: " + v1);
            console.log("v2: " + v2);
        });


        demo.trigger("demo1", "demo1Value");
        demo.trigger("demo2", "demo2Value1", "demo2Value2");

    }());    

    // 通用Demo
    // 解决: 把发布-订阅功能提取出来 放在一个单独的对象内(JavaScript可以进行动态的添加职责)
    // 不足: 1、给每个发布者对象都添加了listen和trigger方法 以及一个缓存列表clientList————资源浪费
    //      2、订阅者和发布者有一定的耦合性  订阅者至少要知道发布者的名字才能成功订阅事件

    (function () {

        var event = {
            clientList: {},
            listen: function (key, fn) {
                if (!this.clientList[ key ]) {
                    this.clientList[ key ] = [];
                }
                this.clientList[ key ].push(fn);
            },
            trigger: function () {
                var key = Array.prototype.shift.apply(arguments), 
                    fns = this.clientList[ key ];

                if (!fns || fns.length === 0) { // 如果没有订阅者订阅事件 则返回
                    return false;
                }

                for (var i = 0, fn; fn = fns[ i++ ];) {
                        fn.apply(this, arguments);
                }
            },
            remove: function(key, fn) {
                var fns = this.clientList[ key ];

                if (!fns) {
                    return false;
                }
                if (!fn) {
                    fns && (fns.length = 0); // 没有传入具体的fn就直接取消key对应事件的订阅
                }
                else {
                    for(var l = fns.length - 1; l >= 0; l--) {
                        var _fn = fns[ l ];
                        if (_fn === fn) {
                            fns.splice(l, 1); // 删除订阅者的回调函数
                        }
                    }
                }
            }
        };

        var copyEvent = function(obj) { // 浅拷贝 所有对象共享引用类型属性

            for (var i in event) {
                obj[ i ] = event[ i ];
            }
        };

        var deepCopy = function (sourceObj) { 
            var result = {},
                key = null,
                curSourceKey = null,
                i = 0,
                len = 0,
                toString = Object.prototype.toString;

            for (key in sourceObj) {
                curSourceKey = sourceObj[key];

                if (typeof curSourceKey !== "object") {
                    result[key] = curSourceKey;
                } 
                else if (toString.apply(curSourceKey) === "[object Object]") {
                    result[key] = deepCopy(sourceObj[key]);
                } 
                else if (toString.apply(curSourceKey) === "[object Array]") {

                    result[key] = [];
                    for (len = curSourceKey.length; i < len; i++) {
                        result[key][i] = curSourceKey[i];
                    }
                }
            } 

            return result; 
        }

        // var demo = deepCopy(event);
        // // copyEvent(demo);

        // demo.listen("aaa", function (a) {
        //  console.log("\naaa:" + a);
        // });

        // demo.listen("bbb", function (b) {
        //  console.log("bbb:" + b);
        // });


        // demo.trigger("aaa", "demo1Value");
        // demo.trigger("bbb", "demo2Value");

        var demo2 = deepCopy(event),
            fn1 = null,
            fn2 = null,
            fn3 = null;
        // copyEvent(demo2);

        demo2.listen("aaa", fn1 = function (a) { // 订阅一
            console.log("\naaa2:" + a);
        });

        demo2.listen("aaa", fn2 = function (a) { // 订阅一
            console.log("aaa3:" + a);
        });

        demo2.listen("bbb", fn3 = function (b) { // 订阅二
            console.log("bbb2:" + b);
        });


        // demo2.remove("aaa", fn2);
        // demo2.remove("aaa");

        demo2.trigger("aaa", "55555demo1Value");
        demo2.trigger("bbb", "55555demo2Value");

    }());

