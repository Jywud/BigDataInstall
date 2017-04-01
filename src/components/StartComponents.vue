<style lang="less">
#StartComponents {
    position: absolute;
    width: 100%;
    height: 100%;
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
            padding: 10px;
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
            /* .com-icon{
                position: absolute;
                top: 5px;
                left: 5px;
                width: 50px;
                height: 50px;
                background-size: 100% 100%;
                background-image: url('/public/image/component/ES.png');
                
            } */
            .content-title {
                font-weight: 800;
                color: #222;
            }
            .bottom-pan {
                position: absolute;
                left: 45px;
                bottom: 5px;
            }
            .status {
                margin-right: 35px;
                // color: blue;
            }
            .status-text {
                position: absolute;
                bottom: 40px;
                left: 75px;
            }
            .btn-log {
                position: absolute;
                bottom: 5px;
                left: 76px;
            }
            .line-spin-fade-loader > div {
                background-color: #666;
            }
            .start-icon {
                position: absolute;
                width: 50px;
                height: 50px;
                top: 75px;
                left: 72px;
            }
            .start-loading {
                position: absolute;
                width: 50px;
                height: 50px;
                top: 90px;
                left: 96px;
            }
            .start-success {
                background-size: 100% 100%;
                background-image: url('/static/image/success-icon.png');
            }
            .start-fail {
                background-size: 100% 100%;
                background-image: url('/static/image/fail-icon.png');
            }
        }
    }
    .btn-pan {
        position: absolute;
        bottom: 60px;
        left: 50%;
        margin-left: -64px;
    }
    /* .btn-next {
        position: absolute;
        left: 50%;
        bottom: 60px;
        // padding: 10px 40px;
        margin-left: -62px;
    } */
}
</style>
<template>
    <div id="StartComponents">
        <steps :active="stepActive"></steps>
        <!-- <h2 class="text-center box-title">安装组件</h2> -->
        <div class="content-pan clearfix">
            <div class="content" v-for="(item, index) in comList">
                <div class="com-icon" :class="[item.name]"></div>
                <p class="text-center content-title">{{item.name}}</p>
                <div class="loader-inner start-loading" v-show="item.status == '启动中...'" :class="{'line-spin-fade-loader': item.status == '启动中...'}">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div class="start-fail start-icon" v-show="item.status == '启动失败'"></div>
                <div class="start-success start-icon" v-show="item.status == '启动成功'"></div>
                <!-- <span :class="{'el-icon-loading': item.status == '启动中...'}"></span> -->
                <p class="status-text" :style="{color: item.fontColor}">{{item.status}}</p>
                <!-- <button class="btn btn-warning btn-log" @click="showLog(item)">日志</button> -->
                <div class="bottom-pan">
                    <button class="btn btn-primary" @click="restart(item)" :disabled="item.noShowRestart">重启</button>
                    <button class="btn btn-warning" @click="showLog(item)">日志</button>
                </div>
            </div>
        </div>
        <div class="btn-pan">
            <button class="btn btn-primary btn-standard btn-next" :disabled="nextDisable" @click="next">
                <span class="glyphicon glyphicon glyphicon-play" aria-hidden="true"></span>&nbsp;{{btnTitle}}
            </button>
            <button class="btn btn-success btn-standard" v-show="noSuccess" @click="successInstall">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>&nbsp;跳过
            </button>
        </div>
        <el-dialog title="日志信息" v-model="dialogFormVisible" @close="closeLog">
            <div style="height:400px;overflow-y:auto;padding:10px">
                <div v-html="logContent"></div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// import { MessageBox } from 'element-ui';
var interval = null;
var simplyInterval = null;
import util from 'common/js/util.js';
import Steps from 'components/steps/Steps.vue';
export default {
    name: 'startComponents',
    mounted() {
        // let list = ['JDK', 'Hadoop', 'Spark', 'NPBase', 'Opaq'];
        let list = util.getSessionData('chooseComponents');
        list.forEach(data => {
            if (data !== 'JDK') {
                this.comList.push({
                    name: data,
                    percentage: 0,
                    status: '等待启动',
                    fontColor: 'blue',
                    noShowRestart: true
                });
            }

        });

        let chooseCMS = util.getSessionData('chooseCMS');
        if (chooseCMS) {
            this.comList.push({
                name: 'cms',
                percentage: 0,
                status: '等待启动',
                fontColor: 'blue',
                noShowRestart: true
            });
        }

    },
    beforeDestroy() {
        clearInterval(interval);
        clearInterval(this.logInterval);
        clearInterval(simplyInterval);
    },
    data() {
        return {
            dialogFormVisible: false, //是否展示日志框
            nextDisable: false,
            logContent: '', //日志信息
            logInterval: null,
            noSuccess: false, //全部启动成功
            btnTitle: '启动',
            stepActive: 6,
            successCount: 0, //存放成功的个数
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
        showLog(item) {
            let _self = this;
            this.logContent = '加载中...';
            this.dialogFormVisible = true;
            this.logInterval = null;
            this.logInterval = setInterval(() => {
                AJAX.logs({
                    uuid: 'startprocess-' + item.name
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

        },
        next() {
            this.comList.forEach(data => {
                data.status = '启动中...';
                data.fontColor = 'blue';
                data.noShowRestart = true;
            });
            this.nextDisable = true;

            AJAX.start({
                type: 'clear'
            }).then(res => {
                if (res.body.status === 'success') {
                    AJAX.start({
                        type: 'start'
                    });
                    this.successCount = 0;
                    this.startprocess();
                }

            }, res => {
                this.btnTitle = '重新启动';
                this.nextDisable = false;
                this.$message({
                    message: '系统异常',
                    type: 'warning'
                });
            });
            // this.$router.replace('installApplication');
        },
        //单个失败节点启动
        restart(data) {
            this.nextDisable = true;
            data.noShowRestart = true;
            data.fontColor = 'blue';
            data.status = '启动中...';

            //启动单节点
            AJAX.restartCom({
                type: 'restart',
                appType: 'all',
                app: data.name
            }).then(res => {

            }, res => {

            });

            //获取单节点进度
            simplyInterval = setInterval(() => {
                AJAX.start({
                    type: 'check',
                    app: data.name
                }).then(res => {
                    if (res.body.status === 'success') {                        
                        this.successCount++;
                        data.fontColor = 'green';
                        data.status = '启动成功';

                        if (this.successCount === this.comList.length) {
                            clearInterval(simplyInterval);
                            this.stepActive = 7;
                            this.$message({
                                message: '所有组件启动成功, 自动跳转监控..',
                                type: 'success'
                            });
                            setTimeout(() => {
                                this.$router.replace('/monitor/assembly');
                            }, 2000);
                        }
                    } else if (res.body.status === 'fail') {
                        clearInterval(simplyInterval);
                        data.noShowRestart = false;
                        data.fontColor = 'red';
                        data.status = '启动失败';

                        this.nextDisable = false;
                    }
                });
            }, 4000);

        },
        successInstall() {
            this.$router.replace('/monitor/assembly');
        },
        startprocess() {
            clearInterval(interval);
            interval = setInterval(() => {
                var failCount = 0;
                var successCount = 0;
                var noAllOK = false;
                var _self = this;
                this.comList.forEach(data => {

                    (function(data) {
                        AJAX.start({
                            type: 'check',
                            app: data.name
                        }).then(res => {
                            console.log('启动--' + data.name + '--' + res.body.status);
                            // reqCount++;
                            if (res.body.status === 'success') {
                                data.fontColor = 'green';
                                data.status = '启动成功';
                                successCount++;
                                //所有组件启动成功
                                if (successCount === _self.comList.length) {
                                    clearInterval(interval);
                                    _self.stepActive = 7;
                                    _self.$message({
                                        message: '所有组件启动成功, 自动跳转监控..',
                                        type: 'success'
                                    });
                                    // _self.noSuccess = true;
                                    setTimeout(() => {
                                        _self.$router.replace('/monitor/assembly');
                                    }, 2000);

                                }

                            } else if (res.body.status === 'fail') {
                                data.fontColor = 'red';
                                data.status = '启动失败';
                                failCount++;
                                // data.noShowRestart = false;
                                _self.btnTitle = '重新启动';
                                // _self.nextDisable = false;
                            }

                            //请求都完成，但是有失败的情况
                            if (failCount + successCount === _self.comList.length && failCount > 0) {
                                clearInterval(interval);
                                _self.noSuccess  = true;
                                _self.successCount = successCount;
                                _self.nextDisable = false;
                                console.log(_self.comList);
                                _self.comList.forEach(data2 => {
                                    if (data2.status === '启动失败') {
                                        data2.noShowRestart = false;
                                    }
                                });
                            }

                        }, res => {
                            this.nextDisable = false;
                            clearInterval(interval);
                        });

                    })(data);

                });

            }, 4000);


        }
    }
}
</script>
