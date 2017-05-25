// 􏶓􏶔􏱊􏱋􏱌组合模式的例子，扫描文件夹

// 例如,我在同􏱫的􏴈动􏷿􏴾里找到了一些电子书,想􏰝它们􏱝􏱤到 F 􏴾中的学习􏸀􏸁文 件􏷹。
// 在􏱝􏱤这些电子书的时候,我并不需要􏸂􏸃这􏵳文件的类型,不管它们是􏰟􏸄的 电子书还是􏰠􏴼在了文件􏷹中。􏵇􏰏
// 模式让 Ctrl+V、Ctrl+C 成为了一个统一的􏱂作

// 􏲰先分别􏰷􏳔好文件􏷹 Folder 和文件 File 这两个类

/******************************* Folder ******************************/
var Folder = function(name) {

    this.name = name;
    this.files = [];
};
Folder.prototype.add = function(file) {
    this.files.push(file);
}

Folder.prototype.scan = function() {
    console.log('􏴐􏰱􏷷􏶙􏷸􏲙􏷹开始扫描文件夹:'+ this.name);
    var file,
    	files=this.files;
    for(var i=0;file=files[i++];){
        file.scan();
    }
};

/*****************File **************/

var File = function(name) {
    this.name = name;
};
File.prototype.add = function() {
    throw new Error('􏷸􏲙􏸇􏳮􏲄􏲝􏲬􏵅􏳠􏷸􏲙文件下面不能再 添加文件');
};
File.prototype.scan = function() {
    console.log('􏴐􏰱􏷷􏶙􏷸􏲙开始扫描文件: ' + this.name);
};


var folder = new Folder('􏸈􏸉􏸀􏸁学习资料');
var folder1 = new Folder('JavaScript');
var folder2 = new Folder('jQuery');

var file1 = new File('JavaScript设计模式与开发');
var file2 = new File('􏸌􏸍精通jQuery');
var file3 = new File('􏸎􏸏􏵀􏰄􏰅重构与模式');

folder1.add(file1); 

folder2.add(file2);

folder.add(folder1);
folder.add(folder2);
folder.add(file3);

var folder3 = new Folder( 'Nodejs' );
var file4 = new File( '􏸐􏲮􏸑􏸒Node.js' ); 
folder3.add( file4 );
var file5 = new File( 'JavaScript 􏸓言􏸌􏸔􏵀􏸕􏳓􏸊􏸋' );

folder.add( folder3 ); 
folder.add( file5 );

folder.scan();


