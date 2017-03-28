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
                        <el-progress :percentage="scope.row.hostPercentage" :status="scope.row.hostPerStatus"></el-progress>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="hostStatus" label="状态" width="260">
                    <template scope="scope">
                        <span>{{scope.row.hostStatus}}</span>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="btn-pan">
            <button class="btn btn-primary btn-standard btn-back" @click="back" :disabled="nextDisable">
                <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>&nbsp;上一步
            </button>
            <button class="btn btn-primary btn-standard btn-next" icon="search" @click="next" :disabled="nextDisable">
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
    .table-pan {
        margin: 0 200px;
    }
    .text-info {
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
var intervalHost = null;
import util from 'common/js/util.js';
import {
    Loading
} from 'element-ui';
import Steps from 'components/steps/Steps.vue';
export default {
    name: 'configHost',
    mounted() {
        this.serverList = util.getSessionData('serverList') || [];

    },
    beforeDestroy() {
        clearInterval(intervalHost);
    },
    data() {
        return {
            serverList: [],
            showInfo: false,
            nextDisable: false
        }
    },
    components: {
        Steps
    },
    methods: {
        getProgress() {
            /*var loadingInstance = Loading.service({
                fullscreen: true,
                text: 'hosts配置中,请勿刷新页面...'
            });*/
            this.nextDisable = true;
            intervalHost = setInterval(() => {
                var self = this;

                AJAX.progress({
                    type: 'add',
                    uuid: 'doHosts'
                }).then(res => {
                    //异常
                    if (res.body.status !== 'success') {
                        self.$message({
                            message: res.body.status,
                            type: 'warning'
                        });
                        self.nextDisable = false;
                        clearInterval(intervalHost);
                        return;
                    }

                    let noOK = false;
                    self.serverList.forEach(server => {
                        server.hostPercentage = res.body['doHosts' + server.ip];

                        if (server.hostPercentage != 100) {
                            noOK = true;
                        } else {
                            server.hostPerStatus = 'success'
                        }
                    });

                    //全部完成
                    if (!noOK) {
                        self.nextDisable = false;
                        clearInterval(intervalHost);
                        // util.setSessionData('serverList', self.serverList);     
                        self.$message({
                          message: '主机配置成功',
                          type: 'success'
                        });
                        setTimeout( () => {
                            self.$router.replace('/setNTP');
                        }, 2000);
                    }

                });

            }, 2000);
        },
        back() {
            this.$router.replace('/configNoPwd');
        },
        next() {
            intervalHost = null;
            var loadingInstance = Loading.service({
                fullscreen: true,
                text: 'hosts配置初始化,请勿刷新页面...'
            });

            AJAX.install({
                type: 'doHosts',
                uuid: 'doHosts'
            }).then(res => {
                loadingInstance.close();
                if (res.body.status === 'success') {
                    this.getProgress();
                } else {
                    // loadingInstance.close();
                    this.$message({
                        message: res.body.status,
                        type: 'warning'
                    });
                }
            }, res => {

                loadingInstance.close();
                this.$message({
                    message: '系统异常',
                    type: 'warning'
                });

            });

            /*var loadingInstance = Loading.service({
                fullscreen: true,
                text: '主机配置中,请勿刷新页面...'
            });

            AJAX.add({type:'noHosts', uuid:'noHosts'}).then(res => {
                loadingInstance.close();
                if(res.body.status === 'success') {                    
                    
                    this.$router.replace('/setNTP');

                } else {
                    loadingInstance.close();
                    this.$message({
                        message: '配置失败',
                        type: 'warning'
                    });
                }
            }, res =>{
                loadingInstance.close();
            });*/

        }
    }
}
</script>
