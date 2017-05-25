// 用职责链重构代码

// 􏰼 orderType􏰑表示􏲘􏲙订单类型(􏰏􏱳定金用用户或者普通􏱴􏱵用户),code 的􏲄为 1 的时候是 500元定金用户􏵵,为 2 的时候是 200元定金用户􏵵,为 3 的时候是普通􏱴􏱵购买用户。
// 􏰼 pay􏰑表示用户是否已经支付现金,􏲄为 true 或者 false, 虽然用户已经下过 500定金的订单 􏲘􏲙,但如果􏱦他一直没有􏵆􏸄􏰏􏱳支付定金,现在􏱋只能降级进入普通购买模式。
// 􏰼 stock􏰑表示当前用于普通􏱴􏱵购买的􏱖􏰒􏱮手机库存数量,􏴳已经支付过500元或者200元定金的用户不受此限制。

// Chain.prototype.setNextSuccessor 􏷉􏰏􏸨􏰆􏰂􏰃􏶹􏴀􏴁􏰬􏶽
// Chain.prototype.passRequest 􏰡􏰢􏰔􏰕􏲜􏶻􏴁􏰬􏶽

var Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
};
Chain.prototype.setNextSuccessor = function(successor) {
    return this.successor = successor;
};
Chain.prototype.passRequest = function() {

    var ret = this.fn.apply(this, arguments);
    if (ret === 'nextSuccessor') {

        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
    return ret;
};



var order500 = function(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金，得到100优惠券');
    } else {
    	return 'nextSuccessor';
    }
};

var order200 = function(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金，得到50优惠券');
    } else {
        return 'nextSuccessor';
    }
};

var orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
        console.log('􏱻􏱼􏱴􏱵􏲲􏱽􏱸􏱹􏱺普通购买，无优惠券');
    } else {
        console.log('􏱖􏰒􏱮􏱯􏱰􏱱手机库存不足');
    }
};


var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal)


chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(3, true, 500);
chainOrder500.passRequest(1, false, 0);

