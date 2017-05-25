// 发布-订阅模式的通用实现

// 定义售楼处
var salesOffices = {};
// 缓存列表,存放订阅者的回调函数
salesOffices.clientList = [];
// 增加订阅者
salesOffices.listen = function(key, fn) {
    if (!this.clientList[key]) {
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
};
salesOffices.trigger = function() {
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key];

    if (!fns || fns.length === 0) {
        return false;
    }

    fns[0].apply(this, arguments);
};

salesOffices.remove = function(key, fn) {
    var fns = this.clientList[key];
    if (!fns) {
        // 如果 key 对应的消息没有被人订阅,则直接返回 
        return false;
    }
    if (!fn) {
        // 如果没有传入具体的回调函数,表示需要取消 key 对应消息的所有订阅
        fns && (fns.length = 0);
    } else {
        for (var l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表 
            var _fn = fns[l];
            if (_fn === fn) {
                fns.splice(l, 1);
            }
        }
    }
}


salesOffices.listen('squareMeter88', fn1 = function(price) {
    console.log('价格= ' + price);
});

salesOffices.listen('squareMeter110', fn2 = function(price) {
    console.log('价格= ' + price);
});

salesOffices.listen('squareMeter120', fn3 = function(price) {
    console.log('价格= ' + price);
});

// 取消订阅的事件
var installEvent = function(obj) {
    for (var i in event) {
        obj[i] = event[i];
    }
}

installEvent(salesOffices);

salesOffices.remove('squareMeter110', fn2);
salesOffices.remove('squareMeter88', fn1);

salesOffices.trigger('squareMeter110', '88');
salesOffices.trigger('squareMeter88', '28');
salesOffices.trigger('squareMeter120', '128');
