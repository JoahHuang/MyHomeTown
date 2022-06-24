var named;
//删除留言
function delete1(id) {
    sessionStorage.removeItem(id);
    this.Storage.writeData();
}
//改昵称
function prom() {
    var name = prompt("请输入您的名字", "");
    named = name;
    if (named)
    {
        alert("欢迎您：" + name)
        document.getElementById("changeName").style.display = "none";
        document.getElementById("name").value = named;
    }
    else {
        document.getElementById("name").value = "匿名发言者";
    }
}
//数据保存
var Storage =
{
    saveData: function ()//保存数据
    {
        var data = document.querySelector("#post textarea");
        if (data.value != "") {
            var time = new Date().getTime() + Math.random() * 5;//返回 1970年01月01日至今的毫秒数
            if (named) {
                sessionStorage.setItem(time, data.value + "|" + named + "|" + this.getDateTime());
            }
            else {
                sessionStorage.setItem(time, data.value + "|" + "匿名发言者" + "|" + this.getDateTime());
            }
            data.value = "";
            this.writeData();
        }
        else {
            alert("留言内容不能为空或空字符");
            data.value = "";
        }
    },
    writeData: function ()//输出数据
    {
        var dataHtml = "", data = "";
        for (var i = sessionStorage.length - 1; i >= 0; i--)//效率更高的循环方法
        {
            data = sessionStorage.getItem(sessionStorage.key(i)).split("|");
            dataHtml += "<span style=>" + data[1] + "<span style=\"float:right\">" + 
                        data[2] + "</span><p><span class=\"msg\">" + data[0] + 
                        "<input style=\"float:right;border:none;border-radius:5px;\" id=\"clearBt\" type=\"button\" onclick=\"delete1(" + sessionStorage.key(i) + ");\" value=\"删除\"/>"
                         + "</span></p>";
        }
        document.getElementById("comment").innerHTML = dataHtml;
    },
    clearData: function ()//清空数据
    {
        if (sessionStorage.length > 0) {
            if (window.confirm("清空后不可恢复，是否确认清空？")) {
                sessionStorage.clear();
                this.writeData();
            }
        }
        else {
            alert("没有需要清空的数据！");
        }
    },
    //获取时间的函数
    getDateTime: function ()//获取日期时间
    {
        var isZero = function (num)//私有方法，自动补零
        {
            if (num < 10) {
                num = "0" + num;
            }
            return num;
        }
        var d = new Date();
        return d.getFullYear() + "-" + isZero(d.getMonth() + 1) + "-" + isZero(d.getDate()) +
         " " + isZero(d.getHours()) + ":" + isZero(d.getMinutes()) + ":" + isZero(d.getSeconds());
    }
}

window.onload = function () {
    Storage.writeData();//当打开页面的时候，输出已有留言
    document.getElementById("postBt").onclick = function () { 
        Storage.saveData(); 
    }//发表评论按钮添加点击事件
    document.getElementById("clearBt").onclick = function () { 
        Storage.clearData(); 
    }//清空所有已保存的数据
}

//pointer用来标记当前到的是哪一个话题，-1表示还没有使用↑和↓来移动过
var pointer = -1;
//当使用↑时，被标记的位置上移，调用此函数
function goUp() {
    if (pointer <= 0) pointer = 0;
    else {
        pointer--;
        pointer %= sessionStorage.length;
    }
    var dataHtml = "", data = "";
    for (var i = sessionStorage.length - 1; i >= 0; i--)//效率更高的循环方法
    {
        data = sessionStorage.getItem(sessionStorage.key(i)).split("|");
        if (i != sessionStorage.length - 1 - pointer)
            dataHtml += "<span style=>" + data[1] + "<span style=\"float:right\">" + data[2] + "</span><p ><span class=\"msg\">" + data[0] + "<input style=\"float:right;border:none;border-radius:5px;\" id=\"clearBt\" type=\"button\" onclick=\"delete1(" + sessionStorage.key(i) + ");\" value=\"删除\"/>" + "</span></p>";
        else {
            dataHtml += "<span style=>" + data[1] + "<span style=\"float:right\">" + data[2] + "</span><p ><span class=\"msg\" style=\"background-color:#FF0000\">" + data[0] + "<input style=\"float:right;border:none;border-radius:5px;\" id=\"clearBt\" type=\"button\" onclick=\"delete1(" + sessionStorage.key(i) + ");\" value=\"删除\"/>" + "</span></p>";
        }
    }
    document.getElementById("comment").innerHTML = dataHtml;
}
//当使用下时，被标记的位置下移，调用此函数
function goDown() {
    if (pointer >= sessionStorage.length) pointer = 0;
    else {
        pointer++;
        pointer %= sessionStorage.length;
    }
    var dataHtml = "", data = "";
    for (var i = sessionStorage.length - 1; i >= 0; i--)//效率更高的循环方法
    {
        data = sessionStorage.getItem(sessionStorage.key(i)).split("|");
        if (i != sessionStorage.length - 1 - pointer)
            dataHtml += "<span style=>" + data[1] + "<span style=\"float:right\">" + data[2] + "</span><p ><span class=\"msg\">" + data[0] + "<input style=\"float:right;border:none;border-radius:5px;\" id=\"clearBt\" type=\"button\" onclick=\"delete1(" + sessionStorage.key(i) + ");\" value=\"删除\"/>" + "</span></p>";
        else {
            
            dataHtml += "<span style=>" + data[1] + "<span style=\"float:right\">" + data[2] + "</span><p ><span class=\"msg\" style=\"background-color:#FF0000\">" + data[0] + "<input style=\"float:right;border:none;border-radius:5px;\" id=\"clearBt\" type=\"button\" onclick=\"delete1(" + sessionStorage.key(i) + ");\" value=\"删除\"/>" + "</span></p>";
        }
    }
    document.getElementById("comment").innerHTML = dataHtml;
}
//用来判断键盘事件，并作出响应
document.onkeydown = function (event) {        //在全局中绑定按下事件  
    var e = event || window.e;
    var keyCode = e.keyCode || e.which;
    switch (keyCode) {
        case 38: {
            goUp();
            break;
        }
        case 40: {
            goDown();
            break;
        }

    }
}
//当输入回车时自动留言
function inputSomething(tabType, e) {
    var data = document.querySelector("#post textarea");
    if(data!="");
    else return;
    if (e.keyCode == 13){
        document.getElementById("postBt").click();
        data.value="";
    }
}