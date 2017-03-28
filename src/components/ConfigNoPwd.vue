<template>
    <div id="configNoPwd">
        <steps :active="1"></steps>
        <h4 class="text-center text-info" v-show="showInfo">免密配置失败，请重试！</h4>
        <div class="table-pan">
            <el-table :data="serverList" stripe border style="width: 100%">
                <el-table-column prop="ip" label="IP" width="260">
                </el-table-column>
                <el-table-column prop="noPwdPercentage" label="进度">
                    <template scope="scope">
                        <el-progress :percentage="scope.row.noPwdPercentage" :status="scope.row.noPwdPerStatus"></el-progress>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="noPwdStatus" label="状态" width="260">
                    <template scope="scope">   
                        <span>{{scope.row.noPwdStatus}}</span> 
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
var intervalPwd = null;
import util from 'common/js/util.js';
import {
    Loading
} from 'element-ui';
import Steps from 'components/steps/Steps.vue';
export default {
    name: 'configNoPwd',
    mounted() {
        this.serverList = util.getSessionData('serverList') || [];
    },
    beforeDestroy() {
        clearInterval(intervalPwd);
    },
    data() {
        return {
            showInfo: false,
            serverList: [],
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
                text: '免密配置中,请勿刷新页面...'
            });*/
            this.nextDisable = true;
            intervalPwd = setInterval(() => {
                var self = this;

                AJAX.progress({
                    type: 'add',
                    uuid: 'nokeys'
                }).then(res => {
                    //异常
                    if (res.body.status !== 'success') { 
                        self.$message({
                            message: res.body.status,
                            type: 'warning'
                        });
                        self.nextDisable = false;
                        clearInterval(intervalPwd);
                        return;
                    }

                    let noOK = false;
                    self.serverList.forEach(server => {
                        server.noPwdPercentage = res.body['nokeys' + server.ip];

                        if (server.noPwdPercentage != 100) {
                            noOK = true;
                        } else {
                            server.noPwdPerStatus = 'success';
                        }
                    });

                    //全部完成
                    if (!noOK) {
                        self.nextDisable = false;
                        clearInterval(intervalPwd);
                        // util.setSessionData('serverList', self.serverList);                       
                        self.$message({
                          message: '免密配置成功',
                          type: 'success'
                        });
                        setTimeout( () => {
                            self.$router.replace('/configHost');
                        }, 2000);
                        
                    }

                });

            }, 2000);
        },
        back() {
            this.$router.replace('/addServers');
        },
        next() {
            intervalPwd = null;
            var loadingInstance = Loading.service({
                fullscreen: true,
                text: '免密配置初始化,请勿刷新页面...'
            });
            AJAX.install({
                type: 'nokeys',
                uuid: 'nokeys'
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

        }
    }
}
</script>
