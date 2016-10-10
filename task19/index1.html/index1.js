/*添加元素方法*/
function add(addDom) {
    document.getElementById(addDom).onclick = function() {
        var inputs = document.getElementById("inputText").value;
        var texts = document.querySelector(".texts");
        var spans = document.createElement("span")
        var flag = texts.childNodes.length;

        var textinput = mytrim(inputs);
        if (textinput >= 10 && textinput <= 100) {
            if (flag > 60) {
                alert("最多添加60个元素")
                return;
            }
            spans.setAttribute('data-beforeData', textinput);
            spans.style.height = textinput + "px";
            spans.title = textinput;
            if (addDom == "rinput") {
                texts.appendChild(spans)
                spanRemove();
            } else if (addDom == "linput") {
                var first = texts.firstChild;
                texts.insertBefore(spans, first)
                spanRemove();
            }
        } else {
            alert("请按要求输入10-100的数")
            document.getElementById("inputText").value = "";
        }
    };
}
/*删除元素方法*/
function remove(removeDom) {
    document.getElementById(removeDom).onclick = function() {
        var texts = document.querySelector(".texts");
        var childList = texts.childNodes;
        if (!childList.length) {
            alert("无可删除元素")
            return;
        }
        if (removeDom == "lout") {
            var childs = childList[0];
            var childsText = childs.title;
            alert("已删除子元素" + childsText);
            texts.removeChild(childs);


        } else if (removeDom == "rout") {
            var chils = childList[childList.length - 1];
            var chilsText = chils.title;
            alert("已删除子元素" + chilsText);
            texts.removeChild(chils);

        }
    }



}
/*点击元素删除自己*/
function spanRemove() {
    var texts = document.querySelector(".texts");
    var childList1 = texts.getElementsByTagName("span")
    for (var i = 0; i < childList1.length; i++) {
        childList1[i].onclick = function() {
            var chilsText = this.title;
            alert("已删除子元素" + chilsText);
            this.remove();
        }
    }
}

/*调用点添加和删除方法*/
add("linput");
add("rinput");
remove("lout");
remove("rout");

/*随机生成20个元素*/
document.querySelector("#radoms").onclick = function() {
    var texts = document.querySelector(".texts");
    for (var i = 0; i < 20; i++) {
        document.getElementById("inputText").value = parseInt(10 + (90 - 10) * (Math.random()));
        document.getElementById("rinput").click()
        if (texts.childNodes.length >= 60) {
            document.getElementById("inputText").value = "";
            break;
        }

    }
    document.getElementById("inputText").value = "";
}



function sleep(d) {
    for (var t = Date.now(); Date.now() - t <= d;);
    console.log(1111)
}


/*交换元素 */
function swap(items, firstIndex, secondIndex) {
    var date = new Date().getTime();

    var texts = document.querySelector(".texts");
    var childList1 = texts.getElementsByTagName("span");
    var temp = items[firstIndex];
    var height1 = childList1[firstIndex].style.height;

    // childList1[firstIndex].style.backgroundColor = "yellow";
    // childList1[secondIndex].style.backgroundColor = "yellow";

    items[firstIndex] = items[secondIndex];
    childList1[firstIndex].style.height = childList1[secondIndex].style.height;
     childList1[firstIndex].setAttribute('data-beforeData', items[secondIndex]);
     childList1[firstIndex].title=childList1[firstIndex];


    // sleep(1000)
    childList1[secondIndex].style.height = height1;
     childList1[secondIndex].setAttribute('data-beforeData', temp);
     childList1[secondIndex].title=temp;
    items[secondIndex] = temp;


    // childList1[firstIndex].style.backgroundColor = "red"
    // childList1[secondIndex].style.backgroundColor = "red"
}

function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);

            i++;
            j--;
        }
    }
    return i;
}



function quickSort(items, left, right) {
    var index;

    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);

        }

    }

    return items;
}


function QuickShort() {
    var texts = document.querySelector(".texts");
    var childList1 = texts.getElementsByTagName("span");
    var arr = [];
    for (var i = 0; i < childList1.length; i++) {
        var height = childList1[i].style.height;
        height = parseFloat(height.slice(0, length - 2))
        arr.push(height)
    }
    quickSort(arr, 0, arr.length - 1)
    console.log(arr)
}


/*去左空格*/
function ltrim(s) {
    //s.replace( /^\s*/, "")
    //如果是去掉半角和全角空格就把 \s 替换成   [" "|"　"] 就变成
    //s.replace( /^[" "|" "]*/, "");
    return s.replace(/^\s*/, "").replace(/^[" "|"　"]*/, "");
}
/*去右空格*/
function rtrim(s) {
    return s.replace(/\s*$/, "").replace(/[" "|"　"]*$/, "");
}
/**
 * 去空格函数
 */
function mytrim(str) {
    if (!str) {
        return "";
    }
    return rtrim(ltrim(str));
}
