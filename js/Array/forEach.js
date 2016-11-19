window.onload=function() {
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

if (typeof Array.prototype.forEach != "function") {å
  Array.prototype.forEach = function (fn, context) {
    for (var k = 0, length = this.length; k < length; k++) {
      // Object.prototype.hasOwnProperty.call(this, k) //代表k位是否有值
      if (typeof fn === "function" && Object.prototype.hasOwnProperty.call(this, k)) {
          // fn.call(context, this[k], k, this);
          fn.call(context, this[k]); //执行sendEmail函数
      }
    }
  };
}

var database = {
  users: ["张含韵", "江一燕", "李小璐"],
  sendEmail: function (user) {
    if (this.isValidUser(user)) {
      console.log("你好，" + user);
    } else {
      console.log("抱歉，"+ user +",你不是本家人");    
    }
  },
  isValidUser: function (user) {
    return /^张/.test(user);
  }
};

// 给每个人法邮件
database.users.forEach(  // database.users中人遍历
  database.sendEmail,    // 发送邮件
  database               // 使用database代替上面database.sendEmail方法中的上下文this
);
}
