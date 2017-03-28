<template>
  <div id="memoryServer">
    <ul class="clearfix gauge-chart">
      <li class="section" v-for="memory in serverInfo">

        <div style="width: 100%;height: 100%;" class="charts" :id="memory.serverIP"></div>

        <div class="chart-descript">
          <p class="descript-text">总内存</p>
          <span class="descript-data">{{memory.memoryInfo.memoryAllSize}}</span>
        </div>
        <ul class="legend-wrap">
          <li class="legend-item rect-0">
            <span class="legend-text">高</span>
          </li>
          <li class="legend-item rect-1">
            <span class="legend-text">中</span>
          </li>
          <li class="legend-item rect-2">
            <span class="legend-text">低</span>
          </li>
        </ul>
      </li>

    </ul>
  </div>
</template>
<style lang="less">

  #memoryServer{
  .gauge-chart .section {
    width: 530px;
    height: 400px;
    padding: 30px 80px;
    float: left;}
  .legend-wrap {
    position: relative;
    left: 348px;
    bottom: 360px;
  .legend-text {
    font-size: 12px;
    color:#666;
    margin-left: 5px;
  }
  .rect-0:before {
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    height: 8px;
    background: #D87A80;
    content: "";
  }
  .rect-1:before {
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    height: 8px;
    background: #5AB1EF;
    content: "";
  }
  .rect-2:before {
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    height: 8px;
    background: #2EC7C9;
    content: "";
  }
  }
  .chart-descript {
    position: relative;
    left: -44px;
    bottom: 312px;
  .descript-text {
    font-size: 12px;
    color:#666;
  }
  .descript-data {
    font-size: 16px;
    font-weight: bold;
    color:#ff6c00;
  }
  }
  }
</style>
<script>
  import util from 'common/js/util.js';
  import Service from '../../service.js';
    export default{
      mounted: function () {
        this.initData();
        this.roundData();
      },
      beforeDestroy() {
        clearInterval(this.interval);
      },
        data () {
            return{
              serverInfo:[],
              myChart:{},
              option:{},
              interval:null
            }
        },
        methods:{
          initData(){
            AJAX.getMemoryData().then(data =>{
              if(data.body.resultCode==='200'){
                this.serverInfo=data.body.data;

                this.serverInfo.forEach(data=>{
                  var option = this.getOptionObj();
                  option.series[0].data[0].value=data.memoryInfo.memoryUsedPrecent;
                  option.title.text=data.serverIP;
                  this.$nextTick(function(){
                    echarts.init(document.getElementById(data.serverIP)).setOption(option);
                  });

                });

              }
            }, () => {
            });
          },
          getOptionObj(){
            return {
              tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
              },
              title: {
                text: '',
                x: 'center'
              },
              series: [
                {
                  name: '内存',
                  type: 'gauge',
                  detail: {formatter:'{value}%'},
                  data: [{value: 0, name: '使用率'}]
                }
              ]
            }
          },
          roundData(){
            this.interval = setInterval( ()=>{
              this.initData();
            }, 30000);
          }
        }
    }
</script>
