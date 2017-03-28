<template>
  <div id="server">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="CPU监控" name="first"></el-tab-pane>
        <el-tab-pane label="网络监控" name="second"></el-tab-pane>
        <el-tab-pane label="磁盘监控" name="third"></el-tab-pane>
        <el-tab-pane label="内存监控" name="fourth"></el-tab-pane>
      </el-tabs>
    <router-view></router-view>
  </div>
</template>
<style lang="less">
  #server{
    margin-top: 66px;
  .el-tabs__header {
    padding-left: 240px;
  }

  .el-tabs__active-bar {
    margin-left: 240px;
  }
  }
</style>
<script>
    export default{
      mounted:function(){
        this.$router.replace('/monitor/server/cpuServer');
        },
        data () {
            return{
              activeName: 'first'
            }
        },
        methods: {
          handleClick() {
            if(this.activeName==='first'){
              this.$router.replace('/monitor/server/cpuServer');
            }else if(this.activeName==='second'){
              this.$router.replace('/monitor/server/netServer');
            }else if(this.activeName==='third'){
              this.$router.replace('/monitor/server/diskServer');
            }else{
              this.$router.replace('/monitor/server/memoryServer');
            }
        }
      }
     }
</script>
