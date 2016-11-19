window.onload = function() {
    var eleResult = document.getElementById("result");
    if (!window.console) {
        window.console = {};
    }
    console.log = function(result) {
        var text = document.createTextNode(result),
            br = document.createElement("br");
        eleResult.appendChild(text);
        eleResult.appendChild(br);
    };

    if (typeof Array.prototype.some != "function") {
        Array.prototype.some = function(fn, context) {
            var passed = false;
            if (typeof fn === "function") {
                for (var k = 0, length = this.length; k < length; k++) {
                    if (passed === true) break;
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

    if (scores.some(higherThanCurrent)) {
        console.log("朕准了！");
    } else {
        console.log("来人，拖出去斩了！");
    }
}
