//柯里化函数 currying
var cost = (function() {
    var args = [];
    return function() {
     // arguments instanceof Array
        if (arguments.length === 0) {
            var money = 0;
            for (var i = 0, l = args.length; i < l; i++) {
                money += args[i];
            }
            return money;
        } else {
            [].push.apply(args, arguments);
        }
    }
})();

cost(100);
cost(200);
cost(300);

console.log( cost() );
