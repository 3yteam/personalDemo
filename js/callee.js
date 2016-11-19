//callee可以打印其本身
function calleeDemo() {
      console.log(arguments.callee);
}
//用于验证参数
function calleeLengthDemo(arg1, arg2) {
    if (arguments.length==arguments.callee.length) {
          console.log("验证形参和实参长度正确！");
        return;
      } else {
          console.log("实参长度：" +arguments.length);
          console.log("形参长度： " +arguments.callee.length);
      }
}
//递归计算
var sum = function(n){
if (n <= 0)                        
return 1;
else
    return n + arguments.callee(n - 1)
}
// 比较一般的递归函数：
// var sum = function(n){
//     if (1==n) return 1;
//     else return n + sum (n-1);
// }

var testSUM=sum(6);
// console.log(testSUM);

// calleeLengthDemo(1)
// calleeDemo();


