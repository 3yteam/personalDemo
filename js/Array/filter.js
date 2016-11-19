window.onload = function() {
    var eleResult = document.getElementById("result");
    if (!window.console) { window.console = {}; }
    console.log = function(result) {
        var text = document.createTextNode(result),
            br = document.createElement("br");
        eleResult.appendChild(text);
        eleResult.appendChild(br);
    };

    if (typeof Array.prototype.filter != "function") {
        Array.prototype.filter = function(fn, context) {
            var arr = [];
            if (typeof fn === "function") {
                for (var k = 0, length = this.length; k < length; k++) {
                    fn.call(context, this[k], k, this) && arr.push(this[k]);
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

    var emailsZhang = users
        // 获得邮件
        .map(function(user) {
            return user.email; })
        // 筛选出zhang开头的邮件
        .filter(function(email) {
            return /^zhang/.test(email); });

    console.log(emailsZhang.join(", "));
}
