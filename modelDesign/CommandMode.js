
var setCommand = function(button, command) {
    button.onclick=function(){
    	command.execute();
    }
}
var MenuBar = {
    refresh: function() {
        console.log('􏱨􏳟􏰚􏰟􏱚􏳆􏱨􏳟􏰚􏰟􏱚􏳆􏱨􏳟􏰚􏰟􏱚􏳆􏱨􏳟􏰚􏰟􏱚􏳆􏱨􏳟􏰚􏰟􏱚􏳆刷新菜单目录');
    }
}
var SubMenu = {
    add: function() {
        console.log('增加子目录');
    },
    del: function() {
        console.log('􏱨􏳟􏰚􏰟􏱚􏳆删除子目录');
    }
};

var RefreshMenuBarCommand = function(receiver) {
    this.receiver = receiver;
};
RefreshMenuBarCommand.prototype.execute = function() {
    this.receiver.refresh();
};

var AddSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function() {
    this.receiver.add();
};

var DelSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
DelSubMenuCommand.prototype.execute = function() {
    this.receiver.del();
};



