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

if (typeof Array.prototype.indexOf != "function") {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    var index = -1;
    fromIndex = fromIndex * 1 || 0;

    for (var k = 0, length = this.length; k < length; k++) {
      if (k >= fromIndex && this[k] === searchElement) {
          index = k;
          break;
      }
    }
    return index;
  };
}

var data = [2, 5, 7, 3, 5];

console.log(data.indexOf(5, "x")); // 1
console.log(data.indexOf(5, "3")); // 4 (从3号位开始搜索)

console.log(data.indexOf(4)); // -1 (未找到)
console.log(data.indexOf("5")); // -1 (未找到，因为5 !== "5")
}