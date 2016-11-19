// 策略模式
// 使用策略模式计算奖金,最优算法
var strategies = {
    "S": function(salary) {
        return salary * 4;
    },
    "A": function(salary) {
        return salary * 3;
    },
    "B": function(salary) {
        return salary * 2;
    }
};
var calculateBonus = function(level, salary) {
    return strategies[level](salary);
};
console.log(calculateBonus('S', 20000));
console.log(calculateBonus('A', 10000));
// 输出:80000 // 输出:30000
