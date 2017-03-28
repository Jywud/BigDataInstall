<template>
    <el-steps :space="120"  :active="active" finish-status="success" class="step-box">
      <el-step title="添加节点"></el-step>
      <el-step title="配置免密登录"></el-step>
      <el-step title="配置主机"></el-step>
      <el-step title="配置时钟同步"></el-step>
      <el-step title="选择安装组件"></el-step>
      <el-step title="开始安装组件"></el-step>
      <el-step title="组件启动"></el-step>
      <!-- <el-step title="应用安装"></el-step> -->
    </el-steps>
</template>
<style>
  .el-step__title{
    margin-left: -15px;
  }
</style>
<script>
export default {
	name: 'steps',
	props: ['active']
}
</script>
