/*
 * @Author: Administrator
 * @Date:   2016-06-02 10:33:02
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-06-02 16:00:54
 */

window.onload = function() {

    function $(id) {
        return document.getElementById(id);
    }
    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
     *    "北京": 90,
     *    "上海": 40
     * };
     */
    var aqiData = {};
    /*检测数据是否为字符或汉字*/
    function checkCity(s) {
        var re = /^[\u4e00-\u9fa5a-zA-Z]+$/;
        // var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        } else {
            return false;
        }
    }
    // 检测是否为整数
    function checkNumber(s) {
        var regu = "^[0-9]+$";
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */


    function addAqiData() {

        var city = $('aqi-city-input').value;
        city = mytrim(city);
        $('aqi-city-input').value = ""; //清空数据
        var numb = $('aqi-value-input').value;
        numb = mytrim(numb);
        $('aqi-value-input').value = ""; //清空数据
        if (!city || !numb) { //判断数据为空的时候
            alert("输入不能为空")
            return;
        } else if (checkCity(city) && checkNumber(numb)) { //判断数据通过检测的时候
            aqiData[city] = numb;
            return aqiData;

        } else if (!checkCity(city)) {
            alert("城市处请输入文字或字符")
            return;
        } else {
            alert("天气指数请输入整数")
            return;
        }



    }

    /**
     * 渲染aqi-table表格
     */
    // var str="";
    var j = 0;

    function renderAqiList() {
        // 循环数据		
        function creatTr() {
            return document.createElement("tr");
        }

        function creatTd() {
            return document.createElement("td");
        };

        function creatBtn() {
            return document.createElement("button");
        };


        for (var i in aqiData) {
            if (i == "undefined") { //如果为空
                return;
            } else {
                // console.log(j)				
                if (j == 0) {
                    // console.log($('aqi-table'));
                    $('aqi-table').appendChild(creatTr());
                    var tr = $('aqi-table').getElementsByTagName("tr")[0];
                    tr.appendChild(creatTd());
                    tr.appendChild(creatTd());
                    tr.appendChild(creatTd());
                    tr.getElementsByTagName("td")[0].innerHTML = "城市";
                    tr.getElementsByTagName("td")[1].innerHTML = "空气质量";
                    tr.getElementsByTagName("td")[2].innerHTML = "操作";
                    // str+='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
                }
                j++;
                // console.log(j)
                $('aqi-table').appendChild(creatTr());
                var curTr = $('aqi-table').getElementsByTagName("tr")[j];
                curTr.appendChild(creatTd());
                curTr.appendChild(creatTd());
                curTr.appendChild(creatTd());
                curTr.getElementsByTagName("td")[0].innerHTML = i;
                curTr.getElementsByTagName("td")[1].innerHTML = aqiData[i];
                curTr.getElementsByTagName("td")[2].appendChild(creatBtn());
                curTr.getElementsByTagName("td")[2].getElementsByTagName("button")[0].innerHTML = "删除";
                // str+= '<tr><td>'+i+'</td><td>'+aqiData[i]+'</td><td><button>删除</button></td></tr>'
            }
            // $('aqi-table').innerHTML=str;
            aqiData = {};
        }

    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle(a) {
        // do sth.
        j--;
        if (j == 0) {
            a.parentNode.parentNode.parentNode.innerHTML = "";
        } else {
            a.parentNode.parentNode.remove();
        }
        renderAqiList();
    }

    function init() {
        var trs = "";
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        $('add-btn').onclick = function() {
            addBtnHandle();

        }


        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        $("aqi-table").addEventListener("click", function(e) {
                if (e.target && e.target.nodeName == "BUTTON") {
                    delBtnHandle(e.target)
                }
            })
            // 	trs=$("aqi-table").getElementsByTagName('tr');

        //  	if (trs!="") {
        //   for (var i = 1; i < trs.length; i++) {
        //   		var td=trs[i].getElementsByTagName('td')[2];
        //   		var btn=td.getElementsByTagName('button')[0];		  		
        //   		btn.onclick=function(){			  		
        // 			delBtnHandle(this)
        //   		}
        // 	}
        // }


    }



    init();


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


}
