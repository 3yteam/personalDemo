// 宏命令

var MacroCommand = function() {
    return {
        commandsList: [],
        add: function(command) {
            this.commandsList.push(command);
        },
        execute: function() {
            for (var i = 0, command; command = this.commandsList[i++];) {
                command.execute();
            }
        }
    }
};
var openAcCommand = {
    execute: function() {
        console.log('􏲻􏴐􏶸打开空调􏰩');
    }
};

/**********􏶾􏶿􏲆􏵸􏶹􏲜􏶺􏷀􏲂􏴬􏰈􏶋􏲑􏳡􏲆􏲀􏷁􏷂􏷃􏷂􏲐􏲑􏷄􏵄􏰂􏰃􏲕􏵇􏰏􏲻􏴐􏵸􏶹􏲜􏲻􏴐􏶺􏷀􏲆􏰂􏰃电视机和音响 *********/

var openTvCommand = {
    execute: function() {
        console.log('􏲻􏴐􏵸􏶹打开电视机');
    }
};

var openSoundCommand = {
    execute: function() {
        console.log('􏲻􏴐􏵸􏶹打开音响');
    }
};


var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);


/**********􏶾􏶿􏲆􏵸􏶹􏲜􏶺􏷀􏲂􏴬􏰈􏶋􏲑􏳡􏲆􏲀􏷁􏷂􏷃􏷂􏲐􏲑􏷄􏵄􏰂􏰃􏲕􏵇􏰏􏲻􏴐􏵸􏶹􏲜􏲻􏴐􏶺􏷀􏲆􏰂􏰃关门和打开电脑，登陆qq *********/
var closeDoorCommand = {
    execute: function() {
        console.log('􏰐􏵐关门');
    }
};
var openPcCommand = {
    execute: function() {
        console.log('􏴐􏵸􏵹开电脑');
    }
};

var openQQCommand = {
    execute: function() {
        console.log('􏵃􏳆登陆QQ');
    }
}

var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

/*********􏷆􏶋􏰝􏷁􏱵􏲆􏰂􏰃􏵇􏰏􏷇􏲑􏷄“􏷈􏷉􏰂􏰃组合所有命令”**********/
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);


