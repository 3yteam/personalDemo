//模版方法模式
//模􏷍方􏲑模式是一􏰘􏲅需使用继承􏱳可以实现的非常􏲃􏱣的模式。

// 模􏷍方􏲑模式由两部分结构􏰝成,第一部分是􏷕抽象父类,第二部分是􏱴具体的实现子类。
// 通常 在􏷕抽象父类中封装了子类的􏳴􏲑􏱼􏱽算法框架,包括实现一些􏳄公共方法以及封装子类中所有方法得执行顺序。
// 子类通过继承这个􏷕抽象类,也继承了􏴱整个算法结构,并􏷘可以􏶃􏶄选择重写􏷖父类得方法。

var Beverage = function() {};
Beverage.prototype.boilWater = function() {
    console.log('􏰝􏹢􏹛􏹜把水煮沸');
};
Beverage.prototype.brew = function() {
    throw new Error('􏳑􏷒􏲢􏲣􏸎􏹷子类必须重写brew方法');
};
Beverage.prototype.pourInCup = function() {
    throw new Error('􏳑􏷒􏲢􏲣􏸎􏹷子类必须重写pourInCup方法');
};
Beverage.prototype.addCondiments = function() {
    throw new Error('􏳑􏷒􏲢􏲣􏸎􏹷子类必须重写addCondiments方法');
};
Beverage.prototype.customerWantsCondiments = function() {
    return true; // 􏻃􏶝􏱸􏱹􏰩􏸁默认需要调料
   };
Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) {  //如果挂钩返回true,就需要调料
        this.addCondiments();
    }
};
var CoffeeWithHook = function() {};

CoffeeWithHook.prototype = new Beverage(); //继承
CoffeeWithHook.prototype.brew = function() {
    console.log('􏲐􏹜􏹢􏸥􏹙􏹑􏹒用沸水冲泡咖啡');
};
CoffeeWithHook.prototype.pourInCup = function() {
    console.log('􏰝􏹑􏹒􏹣􏹤􏹚􏳑把咖啡倒进杯子');
};
CoffeeWithHook.prototype.addCondiments = function() {
    console.log('􏳠􏹝􏲜􏹞􏹟加糖和牛奶');
};
CoffeeWithHook.prototype.customerWantsCondiments = function() {
    return window.confirm('􏰆􏻊􏱸􏱹􏰩􏸁􏻋􏱰请问需要调料吗？');
};
var coffeeWithHook = new CoffeeWithHook();
coffeeWithHook.init();
