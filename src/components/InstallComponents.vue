<style lang="less">
#InstallComponents {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #000;
    .content-pan {
        width: 1050px;
        margin: 50px auto;
        .content {
            position: relative;
            width: 200px;
            height: 240px;
            border-radius: 10px;
            box-shadow: 2px 2px 10px 1px #888;
            // background-color: #ccc;
            float: left;
            border: 1px solid #aa3;
            padding: 10px 38px;
            margin-bottom: 10px;
            margin-right: 10px;
            text-align: center;
            .com-icon {
                position: absolute;
                top: 3px;
                left: 8px;
                width: 40px;
                height: 40px;
                background-size: 100% 100%;
            }
            .ES {
                background-image: url('/static/image/component/ES.png');
            }
            .Hadoop {
                background-image: url('/static/image/component/Hadoop.png');
            }
            .Hive {
                background-image: url('/static/image/component/Hive.png');
            }
            .JDK {
                background-image: url('/static/image/component/JDK.png');
            }
            .Kafka {
                background-image: url('/static/image/component/Kafka.png');
            }
            .NPBase {
                background-image: url('/static/image/component/NPBase.png');
            }
            .Spark {
                background-image: url('/static/image/component/Spark.png');
            }
            .Zookeeper {
                background-image: url('/static/image/component/Zookeeper.png');
            }
            .Opaq {
                background-image: url('/static/image/component/Opaq.png');
            }
            .cms {
                background-image: url('/static/image/component/cms.png');
            }

            .content-title {
                font-weight: 800;
                color: #222;
            }
            .comp-progress {
                margin-bottom: 20px;
            }
        }
        .el-progress__text {
            // color: #fff;
        }
    }
    .btn-pan {
        position: absolute;
        bottom: 60px;
        left: 50%;
        margin-left: -126px;
    }
}
</style>
<template>
    <div id="InstallComponents">
        <steps :active="5"></steps>
        <!-- <h2 class="text-center box-title">安装组件</h2> -->
        <div class="content-pan clearfix">
            <div class="content" v-for="(item, index) in comList">
                <div class="com-icon" :class="[item.name]"></div>
                <p class="text-center content-title">{{item.name}}</p>
                <el-progress class="comp-progress" type="circle" :status="item.status" :percentage="item.percentage"></el-progress>
                <button class="btn btn-warning btn-log" @click="showLog(item)">日志</button>
            </div>
        </div>
        <div class="btn-pan">
            <button class="btn btn-primary btn-standard btn-back" @click="back" :disabled="nextDisable">
                <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>&nbsp;上一步
            </button>
            <button class="btn btn-primary btn-standard btn-next" icon="search" @click="next" :disabled="nextDisable">
                <span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>&nbsp;{{btnTitle}}
            </button>
        </div>
        <!-- <button class="btn btn-primary btn-standard btn-next" :disabled="nextDisable" @click="next"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>&nbsp;启动</button> -->
        <el-dialog title="日志信息" v-model="dialogFormVisible" @close="closeLog">
            <div style="height:350px;overflow-y:auto;padding:10px">
                <div v-html="logContent"></div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// import { MessageBox } from 'element-ui';
import util from 'common/js/util.js';
import Steps from 'components/steps/Steps.vue';
import {
    Loading
} from 'element-ui';
export default {
    name: 'installComponents',
    mounted() {
        let list = util.getSessionData('chooseComponents');
        list.forEach(data => {
            // if (data == 'Opaq') {

            // } else {
            this.comList.push({
                name: data,
                percentage: 0,
                status: ''
            });
            // }

        });
        this.chooseCMS = util.getSessionData('chooseCMS');
        //判断cms
        if (!!this.chooseCMS) {
            this.comList.push({
                name: 'cms',
                percentage: 0,
                status: ''
            });
        }

    },
    beforeDestroy() {
        clearInterval(this.progressInterval);
        clearInterval(this.logInterval);
        clearInterval(this.cmsInterval);
    },
    data() {
        return {
            dialogFormVisible: false, //是否展示日志框
            nextDisable: false,
            logContent: '', //日志信息
            btnTitle: '安装',
            progressInterval: null,
            cmsInterval: null,
            logInterval: null,
            chooseCMS: '',
            comList: []
        }
    },
    components: {
        Steps
    },
    methods: {
        closeLog() {
            clearInterval(this.logInterval);
        },
        getProgress() {

            this.nextDisable = true;
            this.progressInterval = null;
            this.progressInterval = setInterval(() => {
                var self = this;
                var successCount = 0;
                AJAX.progress({
                    type: 'install',
                    uuid: 'install'
                }).then(res => {
                    // var noOK = false;
                    if (res.body.status === 'success') {
                        self.comList.forEach(server => {
                            for (var i = 0; i < res.body.progress.length; i++) {
                                if (server.name === res.body.progress[i].ip) {
                                    server.percentage = res.body.progress[i].value;
                                    server.status = server.percentage == 100 ? 'success' : '';

                                }
                            }

                            if (server.percentage == 100) {
                                successCount++;
                            }
                            /*if (server.percentage != 100) {                                
                                    noOK = true;
                            }*/
                        });

                        if (self.chooseCMS) {
                            if (successCount === self.comList.length - 1) {
                                // self.nextDisable = false;
                                clearInterval(self.progressInterval);
                                setTimeout(() => {
                                    self.installCMS();
                                }, 5000);

                                // self.$message('全部组件安装成功！');
                                // self.$router.replace('startComponents');
                            }
                        } else {
                            if (successCount === self.comList.length) {
                                self.nextDisable = false;
                                clearInterval(self.progressInterval);
                                self.$message({
                                    message: '全部组件安装成功！',
                                    type: 'success'
                                });
                                self.$router.replace('startComponents');
                            }
                        }


                    } else {
                        self.nextDisable = false;
                        self.btnTitle = '重新安装';
                        // clearInterval(self.progressInterval);
                        // self.$message(res.body.status);
                    }

                }, res => {

                });
            }, 2000);
        },
        showLog(item) {
            let _self = this;
            this.logInterval = null;
            this.logContent = '加载中...';
            this.dialogFormVisible = true;
            this.logInterval = setInterval(() => {
                AJAX.logs({
                    uuid: 'install' + item.name
                }).then(res => {
                    if (res.body.status === 'success') {
                        this.logContent = res.body.result;
                    } else {
                        clearInterval(this.logInterval);
                        this.$message({
                            message: res.body.status,
                            type: 'warning'
                        });
                    }

                    if (item.percentage == 100) {
                        clearInterval(this.logInterval);
                    }

                }, res => {

                });
            }, 1000);


            // this.logContent = item.name;
            // this.dialogFormVisible = true;
        },
        installCMS() {

            if (this.chooseCMS.userName) { //自定义的ip
                AJAX.install({
                    type: 'doInstallCMS',
                    uuid: 'webapps_progress',
                    json: JSON.stringify({
                        ip: this.chooseCMS.ip,
                        username: this.chooseCMS.userName,
                        pwd: this.chooseCMS.password,
                        app: 'cms'
                    })
                }).then(res => {
                    if (res.body.status === 'success') {

                    } else {
                        this.$message({
                            message: res.body.status,
                            type: 'warning'
                        });
                    }
                }, res => {

                });
            } else {
                AJAX.install({
                    type: 'doInstallCMS',
                    uuid: 'webapps_progress',
                    json: JSON.stringify({
                        ip: this.chooseCMS.ip,
                        app: 'cms'
                    })
                }).then(res => {
                    if (res.body.status === 'success') {

                    } else {
                        this.$message({
                            message: res.body.status,
                            type: 'warning'
                        });
                    }
                }, res => {

                });
            }

            this.cmsInterval = setInterval(() => {
                AJAX.progress({
                    type: 'install',
                    uuid: 'webapps_progress'
                }).then(res => {
                    if (res.body.status === 'success') {
                        this.comList.forEach(server => {
                            for (var i = 0; i < res.body.progress.length; i++) {
                                if (server.name === res.body.progress[i].ip && server.name === 'cms') {
                                    server.percentage = res.body.progress[i].value;

                                    if (server.percentage == 100) {
                                        server.status = 'success';
                                        this.nextDisable = false;
                                        clearInterval(this.cmsInterval);
                                        this.$message({
                                            message: '全部组件安装成功！',
                                            type: 'success'
                                        });
                                        setTimeout(() => {
                                            this.$router.replace('startComponents');
                                        }, 2000);

                                    }

                                }
                            }

                        });

                    } else {
                        this.nextDisable = false;
                        clearInterval(this.cmsInterval);
                        this.$message(res.body.status);
                    }
                });

            }, 1000);

        },
        back() {
            this.$router.replace('chooseComponents');
        },
        next() {

            this.comList.forEach(data => {
                data.percentage = 0;
                data.status = ''
            });

            AJAX.install({
                type: 'install',
                uuid: 'install'
            }).then(res => {
                // loadingInstance.close();
                if (res.body.status === 'success') {
                    // this.getProgress();
                } else {
                    this.$message({
                        message: res.body.status,
                        type: 'warning'
                    });
                }
            }, res => {
                // loadingInstance.close();
            });

            this.getProgress();

            // this.$router.replace('startComponents');
        }
    }
}
</script>
