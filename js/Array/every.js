// 跟some的基友关系已经是公开的秘密了，同样是返回Boolean值，
// 不过，every需要每一个妃子都要让朕满意，否则——“来人，给我拖出去砍了！”
var eleResult = document.getElementById("result");
if (!window.console) {
    window.console = {};
}
console.log = function(result) {
    var text = document.createTextNode(result), br = document.createElement("br");
    eleResult.appendChild(text);
    eleResult.appendChild(br);
};

if (typeof Array.prototype.every != "function") {
  Array.prototype.every = function (fn, context) {
    var passed = true;
    if (typeof fn === "function") {
       for (var k = 0, length = this.length; k < length; k++) {
          if (passed === false) break;
          passed = !!fn.call(context, this[k], k, this);
      }
    }
    return passed;
  };
}

var scores = [5, 8, 3, 10];
var current = 7;

function higherThanCurrent(score) {
  return score > current;
}

if (scores.every(higherThanCurrent)) {
  console.log("朕准了！");
} else {
  console.log("来人，拖出去斩了！");        
}