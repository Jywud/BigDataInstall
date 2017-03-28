<template>
  <div id="netServer">
    <ul class="clearfix line-chart">
      <li class="section" v-for="net in serverList" on-finish-render-filters>
        <span class="yName">单位:(%)</span>
        <!--<ul class="legend-wrap">-->
        <!--<li class="legend-item rect-0">-->
        <!--<span class="legend-text">CPU使用</span>-->
        <!--</li>-->
        <!--<li class="legend-item rect-1">-->
        <!--<span class="legend-text">0-100</span>-->
        <!--</li>-->
        <!--</ul>-->
        <div style="width: 100%;height: 100%;" class="charts" :id="net.serverIP"></div>

      </li>
    </ul>
  </div>
</template>
<style lang="less">
  #netServer {

  .line-chart {

  .yName {
    position: relative;
    top: 55px;
    left: 16px;
    font-size: 14px;
    color: #666;
  }

  .section {
    width: 740px;
    height: 400px;
    padding: 30px 80px;
    float: left;
  }

  .legend-wrap {
    position: relative;
    top: 55px;
    right: 50px;

  .legend-text {
    font-size: 12px;
    color: #666;
    margin-left: 5px;
  }

  .rect-0:before {
    display: inline-block;
    vertical-align: middle;
    width: 28px;
    height: 8px;
    background: #ff4683;
    content: "";
  }

  .rect-1:before {
    display: inline-block;
    vertical-align: middle;
    width: 78px;
    height: 8px;
    background: -moz-linear-gradient(left, #ff7aa4 0%, #fff298 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ff7aa4), color-stop(100%, #fff298));
    background: -webkit-linear-gradient(left, #ff7aa4 0%, #fff298 100%);
    background: -o-linear-gradient(left, #ff7aa4 0%, #fff298 100%);
    background: -ms-linear-gradient(left, #ff7aa4 0%, #fff298 100%);
    background: linear-gradient(left, #ff7aa4 0%, #fff298 100%);
    content: "";
  }

  }
  }

  }
</style>
<script>
  import util from 'common/js/util.js';
  import Service from '../../service.js';
  export default{
    mounted: function () {
      AJAX.getCPUData().then(res => {
        if (res.body.resultCode === '200') {
          this.serverList = res.body.data;
          this.initData();
          this.updataCharts();
        }
      }, res => {

      });
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    data (){
      return {
        showData: [0, 0, 0, 0, 0, 0, 0, 0],
        tip: [],
        //获得所有服务器详细信息
        serverAll: {},
        //获得所有图表参
        serverList: [],
        chartAllData: {},
        echartsObj: {},
        interval:null
      };
    },

    methods: {
      //获取初始值
      initData(){
        this.serverList.forEach(data => {
          var _self =this;
          var netObj = this.getOptionObj();
          netObj.title.text = data.serverIP;
          netObj.xAxis.data = this.getTimeList();
          this.chartAllData[data.serverIP] = [0, 0, 0, 0, 0, 0, 0, data.cpuUsePencent];
          netObj.series[0].data = this.chartAllData[data.serverIP];
          this.$nextTick(function () {
            _self.echartsObj[data.serverIP] = echarts.init(document.getElementById(data.serverIP));
            _self.echartsObj[data.serverIP].setOption(netObj);
          });
        });
      },
      showEcharts(dataList) {
        var _self =this;
        dataList.forEach(data => {

          var netObj = this.getOptionObj();
          netObj.title.text = data.serverIP;
          netObj.xAxis.data = this.getTimeList();
          this.chartAllData[data.serverIP].shift();
          this.chartAllData[data.serverIP].push(data.cpuUsePencent);
          netObj.series[0].data = this.chartAllData[data.serverIP];

          _self.echartsObj[data.serverIP].setOption(netObj);

        });
      },
      //获取时间列表
      getTimeList(){
        var
          list = [];
        for (var i = 1; i < 9; i++) {
          var hms = util.formatDate(util.addSeconds(new Date(), -(5 * i))).CurrentHms;
          list.unshift(hms);
        }
        return list;
      },

      getOptionObj(){
        return {
          title: {
            text: '',
            textStyle: {
              color: '#86a4c6'
            },
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            textStyle: {
              color: '#B0B0B0'
            },
            axisPointer: {
              show: true,
              type: 'line',
              lineStyle: {
                color: '#E1BB07',
                type: 'solid',
                width: 1
              }
            },
            formatter: "{b} <br/>cpu使用率: {c}%"

          },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {}
            },
            data: []
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#323844',
                width: 2,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {}
            },
            max: 100
          },
          series: [
            {
              name: '',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                normal: {
                  areaStyle: {},
                  lineStyle: {        // 折线样式
                    width: 3,
                    color: '#ff4683',
                  }
                }
              },
              data: []
            }
          ]
        }
      },
      //每个5秒取值
      updataCharts(){
        this.interval = setInterval(() => {
          var _self = this;
          AJAX.getCPUData().then(res => {
            if (res.body.resultCode === '200') {
              _self.showEcharts(res.body.data);
            }
          }, res => {
          });
        }, 5000);

      }
    }
  }
</script>

