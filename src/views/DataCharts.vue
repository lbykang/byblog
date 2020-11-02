<template>
  <div class="about">
    <head-top></head-top>
    <div style="margin-top:15px">
    <div id="linkcharts" :style="{ width: '45%', height: '400px' ,float:'left'}" style="margin-left:2%"></div>
    <div id="trafficcharts" :style="{ width: '45%', height: '400px' ,float:'left'}" style="margin-left:5%"></div>
    <div id="chinacharts" :style="{ width: '95%', height: '600px' ,float:'left'}" style="margin-left:5%"></div>
    </div>
  </div>
</template>
<script>
import headTop from "../components/headTop";
import $ from 'jquery';
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
    };
  },
  components: {
    headTop,
  },
  mounted() {
    this.linkcharts();
    this.trafficcharts();
    this.chinacharts();
  },
  created() {},
  methods: {
    linkcharts() {
      let myChart = this.$echarts.init(document.getElementById("linkcharts"));
      window.onresize = myChart.resize;
      var img =
        "data:image/png;base64,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";

      var trafficWay = [
        {
          name: "搜索类",
          value: 20,
        },
        {
          name: "图片资源",
          value: 10,
        },
        {
          name: "影音资源",
          value: 30,
        },
        {
          name: "其他",
          value: 40,
        },
      ];
      var typename = [];
      for (var j = 0; j < trafficWay.length; j++) {
        typename.push(trafficWay[j].name);
      }

      var data = [];
      var color = [
        "#00ffff",
        "#00cfff",
        "#006ced",
        "#ffe000",
        "#ffa800",
        "#ff5b00",
        "#ff3000",
      ];
      for (var i = 0; i < trafficWay.length; i++) {
        data.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: color[i],
                shadowColor: color[i],
              },
            },
          },
          {
            value: 2,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
              },
            },
          }
        );
      }
      var seriesOption = [
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [105, 109],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: "outside",
                color: "#ddd",
                formatter: function(params) {
                  var percent = 0;
                  var total = 0;
                  for (var i = 0; i < trafficWay.length; i++) {
                    total += trafficWay[i].value;
                  }
                  percent = ((params.value / total) * 100).toFixed(0);
                  if (params.name !== "") {
                    return (
                      "链接类型：" +
                      params.name +
                      "\n" +
                      "\n" +
                      "占百分比：" +
                      percent +
                      "%"
                    );
                  } else {
                    return "";
                  }
                },
              },
              labelLine: {
                length: 30,
                length2: 100,
                show: true,
                color: "#00ffff",
              },
            },
          },
          data: data,
        },
      ];
      var option = {
        backgroundColor: "#8b9ba9",
        color: color,
        title: {
          text: "链接类型",
          top: "45%",
          textAlign: "center",
          left: "49%",
          textStyle: {
            color: "#fff",
            fontSize: 22,
            fontWeight: "400",
          },
        },
        graphic: {
          elements: [
            {
              type: "image",
              z: 3,
              style: {
                image: img,
                width: 178,
                height: 178,
              },
              left: "center",
              top: "center",
              position: [100, 100],
            },
          ],
        },
        tooltip: {
          show: false,
        },
        legend: {
          icon: "circle",
          orient: "horizontal",
          // x: 'left',
          data: typename,
          right: 50,
          bottom: 30,
          align: "right",
          textStyle: {
            color: "#fff",
          },
          itemGap: 20,
        },
        toolbox: {
          show: false,
        },
        series: seriesOption,
      };
      myChart.setOption(option);
    },
  
  trafficcharts(){
    let myChart = this.$echarts.init(document.getElementById("trafficcharts"));
      window.onresize = myChart.resize;

    var option = {
    backgroundColor: '#394056',
    title: {
        text: '网站点击量',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
        },
        left: '6%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#57617B'
            }
        }
    },
    legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['点击量'],
        right: '4%',
        textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            }
        },
        splitLine: {
            lineStyle: {
                color: '#57617B'
            }
        }
    }],
    series: [{
        name: '点击量',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 1
            }
        },
        areaStyle: {
            normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(137,189,27)'
            }
        },
        data: [96,96,97,95,98,94,89,94,80,52,75,94]
    }]
};
myChart.setOption(option);
  },
  chinacharts(){
let myChart = this.$echarts.init(document.getElementById("trafficcharts"));
      window.onresize = myChart.resize;
   var uploadedDataURL = "src/static/chian.json";

//geoCoordMap把所有可能出现的城市加到数组里面
var geoCoordMap = {
    "杭州": [119.5313, 29.8773],
    "苏州": [118.8062, 31.9208],
    '上海': [121.4648, 31.2891],
    "天津": [117.4219, 39.4189],
    '深圳': [114.072026, 22.552194],
    "成都": [103.9526, 30.7617],
    "郑州": [113.4668, 34.6234],
    "宁波": [121.640618, 29.86206],
    "合肥": [117.29, 32.0581],
    "重庆": [108.384366, 30.439702],
    "广州": [113.12244, 23.009505],
    "大连": [123.1238, 42.1216],
    "青岛": [117.1582, 36.8701],
    '北京': [116.4551, 40.2539],
    '义乌': [120.067209, 29.346921],
    '东莞': [113.764742, 23.02039],
    "长沙": [113.0823, 28.2568],
    "贵阳": [106.6992, 26.7682],
    '珠海': [113.556111, 22.250876],
    '威海': [122.109148, 37.516889],
    "泉州": [118.58, 24.93],
    "赤峰": [118.87, 42.28],
    "厦门": [118.1, 24.46],
    "福州": [119.3, 26.08],
    "抚顺": [123.97, 41.97],
    "汕头": [116.69, 23.39],
    "海口": [110.35, 20.02],
    "岳阳": [113.09, 29.37],
    "武汉": [114.31, 30.52],
    "唐山": [118.02, 39.63],
    "石家庄": [114.48, 38.03],
    "哈尔滨": [126.63, 45.75],
    "兰州": [103.73, 36.03],
    "呼和浩特": [111.65, 40.82],
    "南昌": [115.89, 28.68],
    "佛山": [113.11, 23.05],
    "烟台": [121.39, 37.52],
};

//2013年数据
var d1 = {
   "杭州": 10,
    "苏州": 2,
    '上海': 21,
    "天津": 4,
    '深圳': 7,
     "郑州":7,
    "成都":5,
    "宁波":2,
    "合肥": 1,
    "重庆": 3,
    "广州": 19,
    "大连": 1,
    "青岛": 2,
    '北京': 16,
    '义乌': 2,
    '东莞': 1,
    "长沙": 3,
    "贵阳": 0,
    '珠海': 0,
    '威海': 0,
    '南昌': 1,
    '西安': 2,
    '南京': 6,
    '海口': 0,
    '厦门': 3,
    '沈阳': 3,
    '无锡': 0,
    '呼和浩特':0,
    '长春':0,
    '哈尔滨':1,
    '武汉':5,
    '南宁':1,
    '昆明':1,
    '兰州':0,
    '唐山':0,
    '石家庄':2,
    '太原':1,
    '赤峰':0,
    '抚顺':0,
    '珲春':0,
    '绥芬河':0,
    '徐州':0,
    '南通':1,
    '温州':2,
    '绍兴':0,
    '芜湖':0,
    '福州':5,
    '泉州':2,
    '赣州':2,
    '济南':3,
    '烟台':0,
    '洛阳':1,
    '黄石':0,
    '岳阳':0,
    '汕头':0,
    '佛山':0,
    '泸州':0,
    '海东':0,
    '银川':0,
};

//2014年数据
var d2 = {
  "杭州": 131,
    "苏州": 51,
    '上海': 114,
    "天津": 58,
    '深圳': 104,
     "郑州":66,
    "成都":35,
    "宁波":59,
    "合肥": 28,
    "重庆": 68,
    "广州": 120,
    "大连": 24,
    "青岛": 58,
    '北京': 118,
    '义乌': 36,
    '东莞': 46,
    "长沙": 34,
    "贵阳": 8,
    '珠海': 11,
    '威海': 7,
    '南昌': 24,
    '西安': 35,
    '南京': 42,
    '海口': 6,
    '厦门': 59,
    '沈阳': 18,
    '无锡': 21,
    '呼和浩特':7,
    '长春':13,
    '哈尔滨':16,
    '武汉':52,
    '南宁':14,
    '昆明':10,
    '兰州':5,
    '唐山':3,
    '石家庄':24,
    '太原':13,
    '赤峰':0,
    '抚顺':0,
    '珲春':1,
    '绥芬河':3,
    '徐州':5,
    '南通':12,
    '温州':32,
    '绍兴':11,
    '芜湖':3,
    '福州':72,
    '泉州':47,
    '赣州':3,
    '济南':40,
    '烟台':14,
    '洛阳':7,
    '黄石':1,
    '岳阳':1,
    '汕头':8,
    '佛山':31,
    '泸州':0,
    '海东':0,
    '银川':37,
};
//2015年数据
var d3 = {
   "杭州": 311,
    "苏州": 174,
    '上海': 308,
    "天津": 192,
    '深圳': 304,
     "郑州":194,
    "成都":179,
    "宁波":191,
    "合肥": 130,
    "重庆": 189,
    "广州": 345,
    "大连": 139,
    "青岛": 182,
    '北京': 336,
    '义乌': 136,
    '东莞': 159,
    "长沙": 151,
    "贵阳": 81,
    '珠海': 96,
    '威海': 80,
    '南昌': 112,
    '西安': 163,
    '南京': 155,
    '海口': 59,
    '厦门': 170,
    '沈阳': 102,
    '无锡': 110,
    '呼和浩特':54,
    '长春':76,
    '哈尔滨':113,
    '武汉':187,
    '南宁':104,
    '昆明':100,
    '兰州':48,
    '唐山':48,
    '石家庄':110,
    '太原':80,
    '赤峰':8,
    '抚顺':7,
    '珲春':19,
    '绥芬河':16,
    '徐州':63,
    '南通':78,
    '温州':111,
    '绍兴':88,
    '芜湖':29,
    '福州':189,
    '泉州':148,
    '赣州':31,
    '济南':161,
    '烟台':85,
    '洛阳':49,
    '黄石':10,
    '岳阳':15,
    '汕头':74,
    '佛山':153,
    '泸州':10,
    '海东':0,
    '银川':34,
};
//2016年数据
var d4 = {
    "杭州": 296,
    "苏州": 184,
    '上海': 332,
    "天津": 136,
    '深圳': 327,
     "郑州":208,
    "成都":235,
    "宁波":200,
    "合肥": 142,
    "重庆": 191,
    "广州": 327,
    "大连": 154,
    "青岛": 168,
    '北京': 358,
    '义乌': 133,
    '东莞': 166,
    "长沙": 159,
    "贵阳": 81,
    '珠海': 86,
    '威海': 58,
    '南昌': 118,
    '西安': 180,
    '南京': 170,
    '海口': 78,
    '厦门': 160,
    '沈阳': 114,
    '无锡': 119,
    '呼和浩特':80,
    '长春':92,
    '哈尔滨':123,
    '武汉':190,
    '南宁':122,
    '昆明':128,
    '兰州':69,
    '唐山':60,
    '石家庄':118,
    '太原':93,
    '赤峰':16,
    '抚顺':9,
    '珲春':21,
    '绥芬河':16,
    '徐州':78,
    '南通':93,
    '温州':122,
    '绍兴':95,
    '芜湖':36,
    '福州':187,
    '泉州':148,
    '赣州':47,
    '济南':161,
    '烟台':87,
    '洛阳':55,
    '黄石':11,
    '岳阳':26,
    '汕头':78,
    '佛山':150,
    '泸州':10,
    '海东':0,
    '银川':45,
};
//2017年数据
var d5 = {
    "杭州": 334,
    "苏州": 185,
    '上海': 313,
    "天津": 181,
    '深圳': 379,
     "郑州":231,
    "成都":215,
    "宁波":183,
    "合肥": 145,
    "重庆": 205,
    "广州": 344,
    "大连": 166,
    "青岛": 170,
    '北京': 351,
    '义乌': 150,
    '东莞': 176,
    "长沙": 174,
    "贵阳": 89,
    '珠海': 91,
    '威海': 61,
    '南昌': 135,
    '西安': 181,
    '南京': 183,
    '海口': 80,
    '厦门': 167,
    '沈阳': 130,
    '无锡': 121,
    '呼和浩特':89,
    '长春':122,
    '哈尔滨':139,
    '武汉':219,
    '南宁':138,
    '昆明':125,
    '兰州':71,
    '唐山':71,
    '石家庄':136,
    '太原':127,
    '赤峰':47,
    '抚顺':9,
    '珲春':30,
    '绥芬河':21,
    '徐州':88,
    '南通':90,
    '温州':138,
    '绍兴':92,
    '芜湖':26,
    '福州':283,
    '泉州':158,
    '赣州':30,
    '济南':171,
    '烟台':81,
    '洛阳':86,
    '黄石':15,
    '岳阳':41,
    '汕头':96,
    '佛山':165,
    '泸州':49,
    '海东':0,
    '银川':70,
   
};
//2018年数据
var d6 = {
    "杭州": 365,
    "苏州": 213,
    '上海': 352,
    "天津": 187,
    '深圳': 430,
     "郑州":251,
    "成都":226,
    "宁波":196,
    "合肥": 165,
    "重庆": 234,
    "广州": 364,
    "大连": 151,
    "青岛": 193,
    '北京': 358,
    '义乌': 162,
    '东莞': 197,
    "长沙": 212,
    "贵阳": 94,
    '珠海': 108,
    '威海': 70,
    '南昌': 167,
    '西安': 188,
    '南京': 203,
    '海口': 102,
    '厦门': 187,
    '沈阳': 148,
    '无锡': 133,
    '呼和浩特':88,
    '长春':121,
    '哈尔滨':143,
    '武汉':224,
    '南宁':153,
    '昆明':144,
    '兰州':77,
    '唐山':98,
    '石家庄':150,
    '太原':147,
    '赤峰':16,
    '抚顺':16,
    '珲春':31,
    '绥芬河':18,
    '徐州':98,
    '南通':106,
    '温州':153,
    '绍兴':112,
    '芜湖':36,
    '福州':196,
    '泉州':178,
    '赣州':71,
    '济南':165,
    '烟台':88,
    '洛阳':78,
    '黄石':14,
    '岳阳':39,
    '汕头':115,
    '佛山':185,
    '泸州':12,
    '海东':1,
    '银川':49,
};
//2019年数据
var d7 = {
    "杭州": 352,
    "苏州": 204,
    '上海': 331,
    "天津": 168,
    '深圳': 421,
     "郑州":271,
    "成都":231,
    "宁波":199,
    "合肥": 172,
    "重庆": 141,
    "广州": 365,
    "大连": 132,
    "青岛": 205,
    '北京': 239,
    '义乌': 147,
    '东莞': 193,
    "长沙": 213,
    "贵阳": 105,
    '珠海': 99,
    '威海': 76,
    '南昌': 163,
    '西安': 184,
    '南京': 193,
    '海口': 109,
    '厦门': 170,
    '沈阳': 147,
    '无锡': 138,
    '呼和浩特':81,
    '长春':126,
    '哈尔滨':141,
    '武汉':241,
    '南宁':154,
    '昆明':145,
    '兰州':89,
    '唐山':103,
    '石家庄':146,
    '太原':137,
    '赤峰':33,
    '抚顺':12,
    '珲春':22,
    '绥芬河':23,
    '徐州':101,
    '南通':100,
    '温州':134,
    '绍兴':102,
    '芜湖':52,
    '福州':190,
    '泉州':156,
    '赣州':80,
    '济南':161,
    '烟台':81,
    '洛阳':100,
    '黄石':24,
    '岳阳':48,
    '汕头':118,
    '佛山':164,
    '泸州':14,
    '海东':0,
    '银川':61,
};

var colors = [
    ["#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
    ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA"],
    ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
];
var colorIndex = 0;
$(function() {
    var year = ["2013", "2014", "2015", "2016", "2017", "2018","2019"];
    var mapData = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    /*柱子Y名称*/
    var categoryData = [];
    var barData = [];

    for (var key in geoCoordMap) {
        mapData[0].push({
            "year": '2013',
            "name": key,
            "value": d1[key],
        });
        mapData[1].push({
            "year": '2014',
            "name": key,
            "value": d2[key],
        });
        mapData[2].push({
            "year": '2015',
            "name": key,
            "value": d3[key],
        });
        mapData[3].push({
            "year": '2016',
            "name": key,
            "value": d4[key],
        });
        mapData[4].push({ 
            "year": '2017',
            "name": key,
            "value": d5[key],
        });
        mapData[5].push({
            "year": '2018',
            "name": key,
            "value": d6[key],
        });
          mapData[6].push({
            "year": '2019',
            "name": key,
            "value": d7[key],
        });
    }

    for (var i = 0; i < mapData.length; i++) {
        mapData[i].sort(function sortNumber(a, b) {
            return a.value - b.value
        });
        barData.push([]);
        categoryData.push([]);
        for (var j = 0; j < mapData[i].length; j++) {
            barData[i].push(mapData[i][j].value);
            categoryData[i].push(mapData[i][j].name);
        }
    }
     axios.get(uploadedDataURL).then((res) => {
       var geoJson = res.data;
        console.log(res);

        this.$echarts.registerMap('china', geoJson);
        var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        
        var optionXyMap01 = {
            timeline: {
                data: year,
                axisType: 'category',
                autoPlay: true,
                playInterval: 3000,
                left: '10%',
                right: '10%',
                bottom: '3%',
                width: '80%',
                label: {
                    normal: {
                        textStyle: {
                            color: '#ddd'
                        }
                    },
                    emphasis: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                symbolSize: 10,
                lineStyle: {
                    color: '#555'
                },
                checkpointStyle: {
                    borderColor: '#777',
                    borderWidth: 2
                },
                controlStyle: {
                    showNextBtn: true,
                    showPrevBtn: true,
                    normal: {
                        color: '#666',
                        borderColor: '#666'
                    },
                    emphasis: {
                        color: '#aaa',
                        borderColor: '#aaa'
                    }
                },

            },
            baseOption: {
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                grid: {
                    right: '1%',
                    top: '15%',
                    bottom: '10%',
                    width: '20%'
                },
                tooltip: {
                    trigger: 'axis', // hover触发器
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            color: 'rgba(150,150,150,0.1)' //hover颜色
                        }
                    }
                },
                geo: {
                    show: true,
                    map: 'china',
                    roam: true,
                    zoom: 1,
                    center: [113.83531246, 34.0267395887],
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            // shadowColor: 'rgba(255, 255, 255, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    }
                },
            },
            options: []

        };

        for (var n = 0; n < year.length; n++) {
            optionXyMap01.options.push({
                backgroundColor: '#013954',
                title:
                    [{
                            text: '跨境电商百度指数',
                            left: '25%',
                            top: '7%',
                            textStyle: {
                                color: '#fff',
                                fontSize: 25
                            }
                        },
                        {
                            id: 'statistic',
                            text: year[n] + "数据统计情况",
                            left: '75%',
                            top: '8%',
                            textStyle: {
                                color: '#fff',
                                fontSize: 25
                            }
                        }
                    ],
                xAxis: {
                    type: 'value',
                    scale: true,
                    position: 'top',
                    min: 0,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        margin: 2,
                        textStyle: {
                            color: '#aaa'
                        }
                    },
                },
                yAxis: {
                    type: 'category',
                    //  name: 'TOP 20',
                    nameGap: 16,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    axisTick: {
                        show: false,
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#ddd'
                        }
                    },
                    data: categoryData[n]
                },

                series: [
                    //地图
                    {
                        type: 'map',
                        map: 'china',
                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        showLegendSymbol: false, // 存在legend时显示
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#FFFFFF',
                            },
                            emphasis: {
                                areaColor: '#2B91B7'
                            }
                        },
                        animation: false,
                        data: mapData
                    },
                    //地图中闪烁的点
                    {
                        //  name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(mapData[n].sort(function(a, b) {
                            return b.value - a.value;
                        }).slice(0, 20)),
                        symbolSize: function(val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: colors[colorIndex][n],
                                shadowBlur: 10,
                                shadowColor: colors[colorIndex][n]
                            }
                        },
                        zlevel: 1
                    },
                    //柱状图
                    {
                        zlevel: 1.5,
                        type: 'bar',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: colors[colorIndex][n]
                            }
                        },
                        data: barData[n]
                    }
                ]
            })
        }
        myChart.setOption(optionXyMap01);
      });
});


  }
  },
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
</style>
