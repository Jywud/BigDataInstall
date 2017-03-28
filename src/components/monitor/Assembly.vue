<template>
  <div id="assembly">
    <div class="content-pan clearfix">
      <div class="content"
           :class="(status===1)? 'blink-green':'blink-red'" v-for="(item, index) in comList" :id="'node'+index">
        <p class="text-center content-title">{{item.name}}</p>
        <div class="middle-pan clearfix">
          <div class="successNode box" v-for="ip in item.successIp">
            <i class="icon"></i>
            <span class="text-ips" :id="ip">{{ip}}</span>
          </div>
          <div class="failNode box" v-for="fail in item.failIp">
            <i class="icon"></i>
            <span class="text-ips" :id="fail">{{fail}}</span>
          </div>
        </div>
        <div class="bottom-pan">
          <button type="button" class="btn btn-primary" @click="restartAssembly(item)" :disabled="item.loading"><i
            class="glyphicon glyphicon-off"></i>&nbsp;&nbsp;{{item.status}}
          </button>
          <button type="button" class="btn btn-primary" @click="detailNode(item)">{{item.ipDetail}}</button>
          <!--<span class="status" @click="detailNode(ip)">{{item.ipDetail}}</span>-->
          <!--<span class="status" @click="restartAssembly(item.name)">{{item.status}}</span>-->
        </div>
      </div>
    </div>
    <el-dialog title="节点详情" v-model="dialogTableVisible">
      <div class="content" v-for="(item, index) in comList" :id="'node'+index">
        <p class="text-center content-title">{{item.name}}</p>
        <div class="middle-pan clearfix">
          <div class="successNode box" v-for="ip in item.successIp">
            <i class="icon"></i>
            <span class="text-ips" :id="ip">{{ip}}</span>
          </div>
          <div class="failNode box" v-for="fail in item.failIp">
            <i class="icon"></i>
            <span class="text-ips" :id="fail">{{fail}}</span>
          </div>
        </div>
        <div class="bottom-pan">
          <button type="button" class="btn btn-primary" @click="restartIp(item)" :disabled="item.loading"><i
            class="glyphicon glyphicon-off"></i>&nbsp;&nbsp;{{item.status}}
          </button>
        </div>
      </div>
    </el-dialog>
    </span>
    </el-dialog>
  </div>
</template>
<style lang="less">
  #assembly {
    padding-top: 30px;
    position: absolute;
    width: 100%;
    height: 100%;

  .content-pan {
    text-align: center;
    margin: 50px 20px;

  .blink-green {
    animation: blink-green 2.5s ease infinite;
    /* 其它浏览器兼容性前缀 */
    -webkit-animation: blink-green 2.5s ease infinite;
    -moz-animation: blink-green 2.5s ease infinite;
    -ms-animation: blink-green 2.5s ease infinite;
    -o-animation: blink-green 2.5s ease infinite;
  }

  /*@keyframes blink-green{*/
  /*0% { box-shadow: 2px 2px 10px 2px rgba(64, 165, 14, 0.75); }*/
  /*50% { box-shadow: 0 0 0 0 rgba(64, 165, 14, 0.75); }*/
  /*100% { box-shadow: 2px 2px 10px 2px rgba(64, 165, 14, 0.75); }*/

  /*}*/
  .blink-red {
    animation: blink-red 2.5s ease infinite;
    /* 其它浏览器兼容性前缀 */
    -webkit-animation: blink-red 2.5s ease infinite;
    -moz-animation: blink-red 2.5s ease infinite;
    -ms-animation: blink-red 2.5s ease infinite;
    -o-animation: blink-red 2.5s ease infinite;
  }

  /*@keyframes blink-red{*/
  /*0% { box-shadow: 2px 2px 10px 2px rgba(255, 73, 73, 0.75); }*/
  /*50% { box-shadow: 0 0 0 0 rgba(255, 73, 73, 0.75); }*/
  /*100% { box-shadow: 2px 2px 10px 2px rgba(255, 73, 73, 0.75); }*/

  /*}*/

  .content {
    position: relative;
    width: 320px;
    height: 320px;
    /*border-radius: 10px;*/
    display: inline-block;
    border: 1px solid #f3f3f3;
    padding: 10px;
    margin-bottom: 20px;
    margin-right: 20px;
    text-align: center;

  &
  :hover {
    border: 1px solid #36a3ff;
  }

  .content-title {
    font-weight: 800;
    color: #222;
  }

  .middle-pan {

  .box {
    float: left;
    width: 50%;
    border-bottom: 1px #dedede dashed;
    padding: 4px 0;

  i {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: limegreen;
    border-radius: 50%;
  }

  }
  .successNode {

  span {
    padding-left: 5px;
  }

  }
  .failNode {

  i {
    background: #999;
  }

  span {
    padding-left: 5px;
  }

  }
  }

  .bottom-pan {
    position: absolute;
    left: 82px;
    bottom: 5px;
  }

  .status {
    margin-right: 35px;
    color: blue;
    cursor: pointer;
  }

  }
  }
  }
</style>
<script>
  import util from 'common/js/util.js';
  import {
    Loading
  } from 'element-ui';
  export default{
    mounted: function () {
        console.log('--ass---');
      /*var monitorList = util.getLocalData('monitor');
      monitorList.forEach(data=>{
        var obj = {
          name: data,
          successIp: [],
          failIp: [],
          status: '重启',
          loading: false,
          ipDetail: '节点详情'
        };
        var req={
          serviceName:data,
          type:'all'
        }
        AJAX.sysMonitor(req).then(res => {
          if (res.body.resultCode === '200') {
            obj.successIp = res.body.data.successNodes;
            obj.failIp = res.body.data.exceptionNodes;
          }
        }, () => {
          this.$message({
            message: '系统异常',
            type: 'warning'
          });
        });
        this.comList.push(obj);
      });*/



    },
    data () {
      return {
        comList: [
//          {
//            name: 'middleware',
//            successIp: [],
//            failIp: [],
//            status: '重启',
//            loading: false,
//            ipDetail: '节点详情'
//          }
        ],
        dialogTableVisible: false,
        ipList: [],
        status: 1
      }
    },
    methods: {
      restartAssembly(item){
        var req = {
          type: 'restart',
          app: item.name,
          appType: 'all'
        };
        item.loading = true;
        item.status = '重启中';
        AJAX.restartAss(req).then(res => {
          if (res.body.resultCode === '200') {
            this.$message(item.name + '重启成功');
          }
          item.loading = false;
          item.status = '重启'
        }, res => {

        });
      },
      detailNode(item){
        this.ipList = item.successIp.concat(item.failIp);
        this.ipList.forEach(data => {
          var req = {
            serviceName: item.name,
            type: ' ',
            ip: data
          };
          AJAX.sysMonitor(req).then(res => {
            if (res.body.resultCode === '200') {

            }
          }, res => {

          })
        })


      }
    }
  }
</script>
