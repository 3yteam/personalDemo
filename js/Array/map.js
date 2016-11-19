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

    if (typeof Array.prototype.map != "function") {
        Array.prototype.map = function(fn, context) {
            var arr = [];
            if (typeof fn === "function") {
                for (var k = 0, length = this.length; k < length; k++) {
                    arr.push(fn.call(context, this[k]));
                }
            }
            return arr;
        };
    }

    var users = [
        { name: "张含韵", "email": "zhang@email.com" },
        { name: "江一燕", "email": "jiang@email.com" },
        { name: "李小璐", "email": "li@email.com" }
    ];

    var emails = users.map(function(user) {
        return user.email; });

    console.log(emails.join(", "));
}
