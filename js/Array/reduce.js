window.onload=function() {

	var eleResult = document.getElementById("result");
if (!window.console) {
    window.console = {};
}
console.log = function(result) {
    var text = document.createTextNode(result), br = document.createElement("br");
    eleResult.appendChild(text);
    eleResult.appendChild(br);
};

if (typeof Array.prototype.reduce != "function") {
  Array.prototype.reduce = function (callback, initialValue ) {
     var previous = initialValue, k = 0, length = this.length;
     if (typeof initialValue === "undefined") {
        previous = this[0];
        k = 1;
     }
     
    if (typeof callback === "function") {
      for (k; k < length; k++) {
         this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
      }
    }
    return previous;
  };
}

var sum = [1, 2, 3, 4].reduce(function (previous, current, index, array) {
  return previous + current;
});

console.log(sum); // 10

var matrix = [
  [1, 2],
  [3, 4],
  [5, 6]
];

// 二维数组扁平化
var flatten = matrix.reduce(function (previous, current) {
  return previous.concat(current);
});

console.log(flatten); // [1, 2, 3, 4, 5, 6]
}