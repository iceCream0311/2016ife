
/*****************添加span的子元素*******************/
// 生成元素
function creatB(a) {
    var adb = document.createElement("b");
    adb.innerHTML = a;
    return adb;
}

function addSpanChild() {
    var sideBar = document.getElementById("side_bar")
    var sideBarSpans = sideBar.querySelectorAll("span")
    for (var i = 0; i < sideBarSpans.length; i++) {
        sideBarSpans[i].appendChild(creatB("添加"))
        sideBarSpans[i].appendChild(creatB("删除"))
        sideBarSpans[i].appendChild(creatB("编辑"))


    }
}
/************给div添加小三角************/
function addArrow() {
    var sideBar = document.getElementById("side_bar")
    var sideBarSpans = sideBar.querySelectorAll("span")
    for (var i = 0; i < sideBarSpans.length; i++) {
        if (sideBarSpans[i].parentNode.children.length > 1 && sideBarSpans[i].parentNode.getAttribute("class") != "hasChild") {
            sideBarSpans[i].parentNode.setAttribute("class", "hasChild")
            var ionei = document.createElement("i")
            ionei.innerHTML = "▼"
            sideBarSpans[i].insertBefore(ionei, sideBarSpans[i].firstChild)
        } else if (sideBarSpans[i].parentNode.children.length <= 1 && sideBarSpans[i].querySelector("i")) {
            sideBarSpans[i].parentNode.setAttribute("class", "")
                // sideBarSpans[i].removeChild
            sideBarSpans[i].querySelector("i").remove()
        }
    }
}





/*****************点击事件*******************/
function itoggle() {
    var dom = document.querySelectorAll(".hasChild");
    dom.forEach(function(item) {
        item.querySelector("span").onclick = function(e) {
            window.event ? window.event.cancelBubble = true : e.stopPropagation();

            if (this.children[0].getAttribute("class")) {
                this.children[0].setAttribute("class", "")
                for (var i = 1; i < item.children.length; i++) {
                    item.children[i].style.display = "block";
                }
            } else {
                this.children[0].setAttribute("class", "roa")
                for (var i = 1; i < item.children.length; i++) {
                    item.children[i].style.display = "none";
                }
            }
        }
    })
}
/************添加增加、删除、编辑事件************/
function addB() {
    var sideBar = document.getElementById("side_bar")
    var sideBarSpans = sideBar.querySelectorAll("span")
    for (var i = 0; i < sideBarSpans.length; i++) {
        var bs = sideBarSpans[i].querySelectorAll("b");
        bs[0].onclick = function() {
            window.event ? window.event.cancelBubble = true : e.stopPropagation();
            var str = '<div><span>' + prompt("请输入您要添加的内容") + '<b>添加</b><b>删除</b><b>修改</b></span></div>'
            var partenHTML = this.parentNode.parentNode.innerHTML;
            this.parentNode.parentNode.innerHTML = partenHTML + str;
            addB()
            addArrow()
            itoggle()
        }
        bs[1].onclick = function() {
            window.event ? window.event.cancelBubble = true : e.stopPropagation();
            this.parentNode.parentNode.remove();
            addArrow()
            itoggle()
        }
        bs[2].onclick = function() {
            window.event ? window.event.cancelBubble = true : e.stopPropagation();
            var contet = this.parentNode.querySelector("strong");
            var contetHtml = this.parentNode.querySelector("strong").innerHTML;
            this.parentNode.querySelector("strong").innerHTML = prompt("请输入您要修改的名称", contetHtml)
        }
    }
}

/*********** 深度搜索***********/
var ss = [],
    timer = null;

function traverseDF(doms) {
    for (var i = 0, length = doms.children.length; i < length; i++) {
        if (doms.children[i].tagName == "DIV") {
            traverseDF(doms.children[i]);
            ss.push(doms.children[i])
        }
    }
}
/*********** 改变颜色***********/
function searchText(arr, str) {
    var flag = 0;
    if (str == "") {
        alert("请输入搜索内容")
        return false;
    }
    var i = 0;
    timer = setInterval(function() {

        if (i < arr.length) {
            // console.log(arr[i].getAttribute("class"))
            /*添加类*/
            if (arr[i].getAttribute("class") == "hasChild") {
                arr[i].setAttribute("class", "hasChild blue");
            } else {
                arr[i].setAttribute("class", "blue");
            };
            /*循环子元素对比与搜索字符是否一致*/
            if (arr[i].children) {
                for (var j = 0; j < arr[i].children.length; j++) {
                    if (arr[i].children[j].tagName == "SPAN") {
                        if (arr[i].children[j].getElementsByTagName("strong")[0].innerHTML == str) {
                            arr[i].children[j].setAttribute("class", "red");
                            flag++;
                        }
                    }
                }
            }
            // 删除类
            if (i > 0) {
                if (arr[i - 1].getAttribute("class") == "hasChild blue") {
                    arr[i - 1].setAttribute("class", "hasChild")
                } else {
                    arr[i - 1].setAttribute("class", "");
                }

            }
        } else {
            if (i == arr.length) {
                if (arr[i - 1].getAttribute("class") == "hasChild blue") {
                    arr[i - 1].setAttribute("class", "hasChild")
                } else {
                    arr[i - 1].setAttribute("class", "");
                }
            }
            if (!flag) {
                alert("没有找到您想要的内容")
            }
            else{
                alert("找到了您想要的内容共" + flag + "条")
            }
            clearInterval(timer)
        }

        i++;
    }, 500)

}

function resetColor() {
    clearInterval(timer);
     ss = [];
      document.querySelectorAll("div").forEach(function(item) {
        if (item.getAttribute("class")=="hasChild blue") {
             item.setAttribute("class", "hasChild")
        }else if(item.getAttribute("class")=="hasChild"){

        }
         else{
             item.setAttribute("class", "")
         }
         for (var i = 0; i < item.children.length; i++) {
             if(item.children[i].tagName=="SPAN"){
                item.children[i].setAttribute("class","")
             }
         }

      })


}

/************搜索事件************/
function search() {
    var dom = document.querySelector("#side_bar")
    var searchBtn = document.getElementById("side_bar").querySelector("button");
    searchBtn.onclick = function() {
        var searchval = document.getElementById("side_bar").querySelector("input").value;
        resetColor()
        traverseDF(dom);
        searchText(ss, searchval)
    }

}

addSpanChild();
addArrow()
addB()
itoggle();
search()
