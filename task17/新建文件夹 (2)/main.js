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

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(city, gratime) {
    switch (gratime) {
        case "day":
            var str = "";
            for (var item in aqiSourceData[city]) {
                var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                str += '<div title="城市：' + city + ',日期：' + item + ',空气系数:' + aqiSourceData[city][item] + ' " style="height:' + aqiSourceData[city][item] + 'px; background:' + color + '"></div>'
            }
            document.querySelector(".aqi-chart-wrap").innerHTML = str;
            break;
        case "week":
            var dayArr = [];
            var days = [];
            var numberArr = []
            var contNumber = 0;
            for (var item1 in aqiSourceData[city]) {
                console.log(new Date(item1).getDay())
                days.push(item1)
                dayArr.push(new Date(item1).getDay())
                numberArr.push(aqiSourceData[city][item1])
            }
            // console.log(days) 日期
            // console.log(dayArr) 星期
            // console.log(numberArr) 空气数据
            // console.log(dayArr.lastIndexOf(0))
            if (dayArr.lastIndexOf(0) == -1) {
                var str1 = "";
                var countArr1 = 0;
                var starDay1 = "";
                var endDay1 = "";
                for (var i = 0; i < dayArr.length; i++) {
                    starDay1 = days[0];
                    endDay1 = days[dayArr.length - 1];
                    countArr1 += numberArr[i];
                }
                str += '<div title="城市：' + city + ',日期：' + starDay1 + '至' + endDay1 + ',空气系数:' + countArr / (dayArr.length - 1) + ' " style="height:' + countArr / (dayArr.length - 1) + 'px; background:' + color + '"></div>'

                document.querySelector(".aqi-chart-wrap").innerHTML = str;

            } else if (dayArr.lastIndexOf(0) == (dayArr.length - 1)) {
                var str = "";
                var flag1 = 0;
                var countArr = 0;
                var starDay = "";
                var endDay = "";
                for (var i = 0; i < dayArr.length; i++) {
                    countArr += numberArr[i];
                    if (flag1 == 0) {
                        starDay = days[i];
                    }
                    flag1++;
                    if (dayArr[i] == 0) {
                        endDay = days[i];
                        var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                        str += '<div title="城市：' + city + ',日期：' + starDay + '至' + endDay + ',空气系数:' + countArr / flag1 + ' " style="height:' + countArr / flag1 + 'px; background:' + color + '"></div>'
                        flag1 = 0;
                        starDay = "";
                        endDay = "";
                    }
                }
            } else {
                var str = "";
                var flag1 = 0;
                var countArr = 0;
                var starDay = "";
                var endDay = "";
                for (var i = 0; i < dayArr.length; i++) {
                    countArr += numberArr[i];
                    if (flag1 == 0) {
                        starDay = days[i];
                    }
                    flag1++;
                    if (dayArr[i] == 0) {
                        endDay = days[i];
                        var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                        str += '<div title="城市：' + city + ',日期：' + starDay + '至' + endDay + ',空气系数:' + countArr / flag1 + ' " style="height:' + countArr / flag1 + 'px; background:' + color + '"></div>'
                        flag1 = 0;
                        starDay = "";
                        endDay = "";
                    }
                    if (i > dayArr.lastIndexOf(0)) {
                        countArr += numberArr[i];
                        if (i == dayArr.length - 1) {
                            var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                            str += '<div title="城市：' + city + ',日期：' + starDay + '至' + endDay + ',空气系数:' + countArr / flag1 + ' " style="height:' + countArr / flag1 + 'px; background:' + color + '"></div>'
                        }
                    }
                }
            }
            document.querySelector(".aqi-chart-wrap").innerHTML = str;
            break;
        case "month":
            var flag1 = 0; //标识
            var contNumber = 0; //空气质量总数
            var starDay = ""; //开始时间
            var endDay = ""; //结束时间
            var str = ""; //html
            for (var item1 in aqiSourceData[city]) {
                var dayd = new Date(item1);
                if (flag1 == 0) {
                    starDay = item1;
                }
                flag1++;
                contNumber += aqiSourceData[city][item1];
                if (dayd.getDay() == 0) { //周日
                    endDay = item1;
                    var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                    str += '<div title="城市：' + city + ',日期：' + starDay + '至' + endDay + ',空气系数:' + contNumber / flag1 + ' " style="height:' + contNumber / flag1 + 'px; background:' + color + '"></div>'
                    flag1 = 0;
                    contNumber = 0;
                }
            }
            document.querySelector(".aqi-chart-wrap").innerHTML = str;
            break;
    }


}

renderChart("北京", "week");
//
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化

    // 设置对应数据

    // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化

    // 设置对应数据

    // 调用图表渲染函数
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
    var str = ""
    for (var item in aqiSourceData) {
        str += '<option value="' + item + '">' + item + '</option>'
    }
    document.getElementById("city-select").innerHTML = str;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

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
