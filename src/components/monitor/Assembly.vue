<template>
    <div id="assembly">
        <div class="content-pan clearfix">
            <div class="content" v-for="(item, index) in comList" :id="'node'+index">
                <div class="com-icon" :class="[item.name]"></div>
                <p class="text-center content-title">{{item.name}}</p>
                <div class="middle-pan clearfix">
                    <div class="successNode box" v-for="ip in item.successIp">
                        <i class="icon"></i>
                        <span class="text-ips" :id="ip" @click="skip(ip,item.name)">{{ip.ip}}<!-- <span v-if="!!ip.master">(主)</span>
                        <span v-if="!ip.master">(从)</span> --></span>
                    </div>
                    <div class="failNode box" v-for="fail in item.failIp">
                        <i class="icon"></i>
                        <span class="text-ips" :id="fail">{{fail.ip}}</span>
                    </div>
                </div>
                <div class="bottom-pan">
                    <!-- <el-button type="info" size="small" @click="detailNode(item)">
                        {{item.ipDetail}}
                    </el-button> -->
                    <el-button type="info" size="small" @click="restartAssembly(item)" :disabled="item.loading">
                        <i class="glyphicon glyphicon-off"></i>&nbsp;&nbsp;{{item.status}}
                    </el-button>
                </div>
            </div>
            <div class="showNoResult" v-if='noResult'>
            </div>
        </div>
        <el-dialog title="节点详情" v-model="dialogTableVisible">
            <div class="content" v-for="(item, index) in detailList.successIp" :id="'node'+index">
                <p class="text-center content-title">{{item.ip}}</p>
                <div class="middle-pan clearfix">
                    <div class="successNode box">
                        <i class="icon"></i>
                        <span class="text-ips" :id="item.ip">{{item.ip}}</span>
                    </div>
                </div>
                <div class="bottom-pan">
                    <button type="button" class="btn btn-primary" @click="restartIp(item,detailList)" :disabled="item.loading"><i class="glyphicon glyphicon-off"></i>&nbsp;&nbsp; 重启
                    </button>
                </div>
            </div>
            <div class="content" v-for="(fail, index) in detailList.failIp" :id="'node'+index">
                <div class="middle-pan clearfix">
                    <div class="failNode box">
                        <i class="icon"></i>
                        <span class="text-ips" :id="fail.ip">{{fail.ip}}</span>
                    </div>
                </div>
                <div class="bottom-pan">
                    <button type="button" class="btn btn-primary" @click="restartIp(fail,detailList)" :disabled="item.loading"><i class="glyphicon glyphicon-off"></i>&nbsp;&nbsp;重启
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
        /*text-align: center;*/
        margin: 50px auto 10px;
        width: 90%;
        .content {
            position: relative;
            width: 275px;
            height: 284px;
            /*border-radius: 10px;*/
            display: inline-block;
            border: 1px solid #e2e2e2;
            padding: 10px;
            margin-bottom: 20px;
            margin-right: 10px;
            text-align: center;
            &:hover {
                border: 1px solid #36a3ff;
            }
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
            .middle-pan {
                .box {
                    float: left;
                    width: 50%;
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
                        cursor: pointer;
                        &:hover {
                            color: #36a3ff
                        }
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
                left: 100px;
                bottom: 15px;
            }
            .status {
                margin-right: 35px;
                color: blue;
                cursor: pointer;
            }
        }
        .showNoResult {
            background-image: url("/static/image/noResult.png");
        }
    }
    .el-dialog .el-dialog--small {
        .el-dialog__body {
            .content {
                position: relative;
                width: 275px;
                height: 284px;
                /*border-radius: 10px;*/
                display: inline-block;
                border: 1px solid #f3f3f3;
                padding: 10px;
                margin-bottom: 20px;
                margin-right: 10px;
                text-align: center;
                &:hover {
                    border: 1px solid #36a3ff;
                }
                .middle-pan {
                    .box {
                        float: left;
                        width: 50%;
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
                            cursor: pointer;
                            &:hover {
                                color: #36a3ff
                            }
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
                    left: 100px;
                    bottom: 15px;
                }
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
export default {
    mounted: function() {
        this.noResult = false;
        AJAX.sysMonitorInit().then(res => {
            this.monitorList = res.body.data.serviceNames;
            util.setSessionData('assemblyList', this.monitorList);
            this.showNodeList();
            if (this.monitorList.length > 0) {
                this.interval = setInterval(() => {
                    this.refresh();
                }, 30000);
            } else {
                this.$message({
                    message: '无组件',
                    type: 'warning'
                });
                this.noResult = true;
            }

        }, res => {
            this.$message({
                message: '系统异常',
                type: 'warning'
            });
        });


    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    data() {
        return {
            comList: [],
            dialogTableVisible: false,
            ipList: [],
            status: 1,
            detailList: {},
            monitorList: [],
            interval: null,
            noResult: false
        }
    },
    methods: {
        //渲染组件列表
        showNodeList() {
            if (this.monitorList.length > 0) {
                this.monitorList.forEach(data => {
                    var self = this;
                    (function(data) {
                        var req = {
                            serviceName: data,
                            type: 'all'
                        };
                        AJAX.sysMonitor(req).then(res2 => {
                            if (res2.body.resultCode === '200') {
                                self.comList.push({
                                    name: data,
                                    successIp: res2.body.data.successNodes || [],
                                    failIp: res2.body.data.exceptionNodes || [],
                                    status: '重启',
                                    loading: false,
                                    ipDetail: '节点详情'
                                });

                            }
                        }, () => {
                            self.$message({
                                message: '系统异常',
                                type: 'warning'
                            });
                        });
                    })(data);

                });
            } else {
                this.$message({
                    message: '无组件',
                    type: 'warning'
                });
                this.noResult = true
            }
        },

        //实时刷新
        refresh() {
            this.monitorList.forEach(data => {
                var self = this;
                (function(data) {
                    var req = {
                        serviceName: data,
                        type: 'all'
                    };
                    AJAX.sysMonitor(req).then(res => {
                        if (res.body.resultCode === '200') {
                            self.comList.forEach(node => {
                                if (node.name === data) {
                                    node.successIp = res.body.data.successNodes || [];
                                    node.failIp = res.body.data.exceptionNodes || [];
                                }
                            })
                        }
                    });
                })(data);

            });
        },

        //重启单个组件
        restartAssembly(item) {
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
                this.$message({
                    message: '系统异常',
                    type: 'warning'
                });
            });
        },

        //节点详情
        detailNode(item) {
            this.dialogTableVisible = true;
            this.detailList = item;
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
        },

        restartIp(ip, obj) {
            var req = {
                type: 'restart',
                app: obj.name,
                appType: 'one',
                ip: ip
            }
            AJAX.restart(req).then(res => {
                if (res.body.resultCode === '200') {
                    this.$message(item.name + '重启成功');
                }
            }, res => {
                this.$message({
                    message: '系统异常',
                    type: 'warning'
                });
            })
        },

        //跳转各个组件ip的url
        skip(obj, name) {
            if (name === 'Hadoop') {
                if (!!obj.master) {
                    window.open('http://' + obj.ip + ':50070/');
                } else {
                    window.open('http://' + obj.ip + ':50075/');
                }
            } else if (name === 'Spark') {
                if (!!obj.master) {
                    window.open('http://' + obj.ip + ':8080/');
                } else {
                    window.open('http://' + obj.ip + ':8081/');
                }
            } else if (name === 'ES') {
                window.open('http://' + obj.ip + ':9200/_plugin/head/');

            } else if (name === 'Habse') {
                if (!!obj.master) {
                    window.open('http://' + obj.ip + ':60010/');
                } else {
                    window.open('http://' + obj.ip + ':16030/');
                }
            } else if (name === 'cms') {
                this.$router.replace('/monitor/serverinfo/baseService');
            } else {
                this.$message({
                    message: '无跳转地址',
                    type: 'warning'
                });
            }
        }
    }
}
</script>
