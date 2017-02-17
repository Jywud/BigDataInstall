<template>
    <div id="configNoPwd">
        <steps :active="2"></steps>
        <h4 class="text-center text-info" v-show="showInfo">主机配置失败，请重试！</h4>
        <div class="table-pan">
            <el-table :data="serverList" stripe border style="width: 100%">
                <el-table-column prop="ip" label="IP" width="260">                    
                </el-table-column>
                <el-table-column prop="hostPercentage" label="进度">
                    <template scope="scope">    
                        <el-progress :percentage="scope.row.hostPercentage"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column prop="hostStatus" label="状态" width="260">
                    <template scope="scope">   
                        <span>{{scope.row.hostStatus}}</span> 
                      </template>                    
                </el-table-column>
            </el-table>
        </div>
        <div class="btn-pan">
            <button class="btn btn-primary btn-standard btn-back" @click="back">
                <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>&nbsp;上一步
            </button>
            <button class="btn btn-primary btn-standard btn-next" icon="search" @click="next">
                <span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>&nbsp;执行
            </button>
        </div>
    </div>
</template>
<style lang="less">
#configNoPwd {
    position: absolute;
    width: 100%;
    height: 100%;
    .table-pan{
        margin: 0 200px;
    }
    .text-info{
        margin-top: 60px;
        color: red;
    }
    .btn-pan {
        position: absolute;
        bottom: 60px;
        left: 50%;
        margin-left: -126px;
    }
}
</style>
<script>
// import Service from '../service.js'
import { Loading } from 'element-ui';
import Steps from 'components/steps/Steps.vue';
export default {
        name: 'configHost',
        mounted() {
            // 进入页面自动调用配置接口
            /*var loadingInstance = Loading.service({
                fullscreen: true,
                text: '主机配置中,请勿刷新页面...'
            });
            setTimeout(() => {
                loadingInstance.close();
                this.$router.replace('/setNTP');
            }, 2000);*/
            this.serverList = this.$root.serverList || [];
        },
        data() {
            return {
                serverList: [],
                showInfo: false
            }
        },
        components: {Steps},
        methods: {
            back() {
                this.$router.replace('/configNoPwd');
            },
            next() {
                var loadingInstance = Loading.service({
                    fullscreen: true,
                    text: '主机配置中,请勿刷新页面...'
                });

                setTimeout(() => {
                    loadingInstance.close();
                    this.$router.replace('/setNTP');
                }, 2000)

            }
        }
}
</script>
