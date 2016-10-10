/*
 * @Author: Administrator
 * @Date:   2016-06-02 16:50:01
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-06-06 10:59:20
 */

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// console.log(aqiSourceData);
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
        nowSelectCity: -1,
        nowGraTime: "day"
    }
    /*生成元素*/
function creatEle(hei, titl) {
    // var citySelect=document.getElementById("city-select");
    var city_wrap = document.getElementById("aqi-chart-wrap");
    var creatEl = document.createElement("div");
    creatEl.style.height = hei;
    creatEl.title = titl;
    city_wrap.appendChild(creatEl);
}

/*清空数据*/
function clearhtml() {
    document.getElementById("aqi-chart-wrap").innerHTML = "";
}
/**
 * 渲染图表
 */
function renderChart(a) {
    // chartData=aqiSourceData["北京"];
    // console.log(chartData);
    clearhtml()
    switch (a) {
        case 1:
            {
                for (var item in chartData) {
                    var stit = item + "空气质量指数" + chartData[item];
                    creatEle(chartData[item], stit)
                }
                break;
            }

        case 7:
            {
                var cont1 = 0;
                var contNumber1 = 0;
                var days = "";
                for (var item in chartData) {
                    var dat = new Date(item);
                    cont1++;
                    if (cont1 == 1) {
                        days = item;
                    }
                    contNumber1 += chartData[item];
                    if (dat.getDay() == 6) {
                        var stit = days + "至" + item + "空气质量指数" + (contNumber1 / cont1).toFixed(2);
                        creatEle(contNumber1 / cont1, stit)
                        contNumber1 = 0;
                        cont1 = 0;
                    }
                }
                break;
            }

        case 30:
            {
                var cont2 = 0;
                var contNumber2 = 0;
                var months = 0;
                for (var item in chartData) {
                    cont2++;
                    var dat = new Date(item);
                    if (cont2 == 1) {
                        months = dat.getMonth();
                    };
                    contNumber2 += chartData[item];

                    if (dat.getMonth() == months + 1) {
                        var stit = dat.getFullYear() + "年" + dat.getMonth() + "月空气质量指数" + (contNumber2 / 30).toFixed(2);
                        creatEle(contNumber2 / cont2, stit)
                        contNumber2 = 0;
                        cont2 = 0;
                    } else if (dat.getMonth() == 1 && months == 12) {
                        var stit = dat.getFullYear() + "年1月空气质量指数" + (contNumber2 / 30).toFixed(2);
                        creatEle(contNumber2 / cont2, stit)
                        contNumber2 = 0;
                        cont2 = 0;
                    }
                }
                break;

            }


    }

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化 
    var form_gra_time = document.getElementById("form-gra-time");
    var inpts = form_gra_time.getElementsByTagName("input");
    // console.log(inpts.length);
    for (var i = 0; i < inpts.length; i++) {
        inpts[i].onclick = function() {
            for (var j = 0; j < inpts.length; j++) {
                inpts[j].checked = false;
            }
            this.checked = true;
            // 设置对应数据
            // 调用图表渲染函数
            switch (this.value) {
                case "day":
                    renderChart(1)
                    break;
                case "week":
                    renderChart(7)
                    break;
                case "month":
                    renderChart(30)
                    break;
            }

        }
    }

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化 
    var cityselect = document.getElementById("city-select");

    // 设置对应数据

    // 调用图表渲染函数
    // graTimeChange()
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var cityselect = document.getElementById("city-select");
    var str = "";
    // var z = 0;
    for (var item in aqiSourceData) {
        str += '<option value=' + item + '>' + item + '</option>'
            // z++;

    }
    cityselect.innerHTML = str;

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var optionVal = "";
    cityselect.onchange = function() {
        chartData = aqiSourceData[cityselect.value];

    }


}
initCitySelector();
graTimeChange();

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
