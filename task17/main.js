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
var chartData = {
    "gratime": "day",
    "city": "北京"
};

/**
 * 渲染图表
 */
function renderChart() {
    var city = chartData.city;
    var gratime = chartData.gratime;
    switch (gratime) {
        case "day":
            var str = "";
            for (var item in aqiSourceData[city]) {
                var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                str += '<div title="城市：' + city + ',日期：' + item + ',空气系数:' + aqiSourceData[city][item] + ' " style="height:' + aqiSourceData[city][item] + 'px; background:' + color + '"><span>' + aqiSourceData[city][item] + '</span></div>'
            }
            document.querySelector(".aqi-chart-wrap").innerHTML = str;
            break;
        case "week":
            var flag1 = 0; //标识
            var contNumber = 0; //空气质量总数
            var starDay = ""; //开始时间
            var endDay = ""; //结束时间
            var str = ""; //html
            var count = 0;
            for (var item1 in aqiSourceData[city]) {
                count++;
                var dayd = new Date(item1);
                if (flag1 == 0) {
                    starDay = item1;
                }
                flag1++;
                contNumber += aqiSourceData[city][item1];
                if (dayd.getDay() == 0 || count == Object.keys(aqiSourceData[city]).length) { //周日
                    // console.log(Object.keys(aqiSourceData[city]).length)
                    endDay = item1;
                    var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                    str += '<div title="城市：' + city + ',日期：' + starDay + '至' + endDay + ',空气系数:' + (contNumber / flag1).toFixed(2) + ' " style="height:' + (contNumber / flag1).toFixed(2) + 'px; background:' + color + '"><span>' + (contNumber / flag1).toFixed(2) + '</span></div>'
                    flag1 = 0;
                    contNumber = 0;
                }
            }
            document.querySelector(".aqi-chart-wrap").innerHTML = str;

            break;
        case "month":
            var flag1 = 0; //标识
            var mothNumber = 0; //空气质量总数
            var starMoth = ""; //开始时间
            var str = ""; //html
            var count = 0;
            for (var item1 in aqiSourceData[city]) {
                var dayd = new Date(item1);
                if (flag1 == 0) {
                    starMoth = dayd.getMonth()
                }
                flag1++;
                count++;
                if (dayd.getMonth() > starMoth || count == Object.keys(aqiSourceData[city]).length) {
                    //当当前月份大于开始月份或总数等于对象的长度时计算
                    var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                    str += '<div title="城市：' + city + ',日期：' + (starMoth + 1) + '月，空气系数:' + (mothNumber / flag1).toFixed(2) + ' " style="height:' + (mothNumber / flag1).toFixed(2) + 'px; background:' + color + '"><span>' + (mothNumber / flag1).toFixed(2) + '</span></div>'
                    flag1 = 0;
                    starMoth = dayd.getMonth();
                    mothNumber = 0;
                }
                mothNumber += aqiSourceData[city][item1];
            }
            document.querySelector(".aqi-chart-wrap").innerHTML = str;
            break;
    }


};

/**
 * 日、周、月的radio事件点击时的处理函数
 */

function graTimeChange() {
    // 确定是否选项发生了变化
    var selecDom = document.getElementById("form-gra-time");
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = function() {
            if (this.value != chartData.gratime) {
                // 设置对应数据
                chartData.gratime = this.value
                    // 调用图表渲染函数
                console.log(chartData)
                renderChart()
            }
        }

    }

};
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    var citySelect = document.getElementById("city-select");
    citySelect.onchange = function() {
        // 确定是否选项发生了变化
        if (this.value != chartData.city) {
            // 设置对应数据
            chartData.city = this.value;
            // 调用图表渲染函数
            console.log(chartData)
            renderChart()
        }

    }

}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    graTimeChange();
    citySelectChange()
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
    renderChart()
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
