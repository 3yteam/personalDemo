function getTxt1CursorPosition() {
            var oTxt1 = document.getElementById("txt1");
            var cursurPosition = -1;
            if (oTxt1.selectionStart) {//非IE浏览器
                cursurPosition = oTxt1.selectionStart;
            } else {//IE
                var range = document.selection.createRange();
//这个功能相当于在光标位置向左划鼠标选中文字,这里面的移动位数超了也无所谓,然后再计算选中文字的数量,就得到了光标的位置
                range.moveStart("character", -oTxt1.value.length);
                cursurPosition = range.text.length;
            }
            return cursurPosition;
}