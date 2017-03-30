<template>
    <div id="addServers">
        <steps :active="0"></steps>
        <div class="content-pan">
            <!-- <h4>IP可以使用如下模式：<mark>192.168.0.1</mark>单个添加 或者 <mark>192.168.0.[1-10]</mark>批量添加</h4> -->
            <h4>IP可以使用如下模式：192.168.0.1单个添加 或者 192.168.0.[1-10]批量添加</h4>
            <div class="form-inline condition-box">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">IP</div>
                        <input type="text" class="form-control" v-model="inputIp" placeholder="ip">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">用户名</div>
                        <input type="text" class="form-control" v-model="inputUserName" placeholder="只支持'root' ">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">密码</div>
                        <input type="password" class="form-control" v-model="inputPassword" placeholder="密码">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">主机名前缀</div>
                        <input type="text" class="form-control" v-model="inputHostName" placeholder="主机名前缀">
                    </div>
                </div>
                <div class="btn btn-success" @click="addServer"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;添加</div>
            </div>
            <el-table :data="serverList" stripe border style="width: 100%">
                <el-table-column prop="ip" label="IP">
                </el-table-column>
                <el-table-column prop="name" label="用户名">
                    <template scope="scope">
                        <input type="text" class="form-control" v-model="scope.row.name" placeholder="用户名">
                    </template>
                </el-table-column>
                <el-table-column prop="pwd" label="密码">
                    <template scope="scope">
                        <input type="password" class="form-control" v-model="scope.row.pwd" placeholder="密码">
                    </template>
                </el-table-column>
                <el-table-column prop="host" label="主机名">
                    <template scope="scope">
                        <input type="text" class="form-control" v-model="scope.row.host" placeholder="主机名">
                    </template>
                </el-table-column>
                <el-table-column prop="info" :renderHeader="deleteIcon" width="250">
                    <template scope="scope">
                        <div class="btn btn-danger btn-delete" @click="deleteServer(scope.$index)">
                            删除
                        </div>
                        <el-popover style="display: inline-block" v-show="scope.row.showError" placement="left" width="300" trigger="hover" :content="scope.row.errorMsg">
                            <button slot="reference" class="btn btn-warning btn-delete">错误提示</button>
                        </el-popover>
                        <!-- <el-tooltip placement="top" style="display: inline-block" v-show="scope.row.showError">
                            <div slot="content">{{scope.row.errorMsg}}</div>
                            <button class="btn btn-warning btn-delete">错误提示</button>
                        </el-tooltip> -->
                        <!-- <span class="error-msg" v-show="scope.row.showError">{{scope.row.errorMsg}}</span> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <button class="btn btn-primary btn-standard btn-next" :disabled="nextDisable" @click="next">下一步&nbsp;<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>
    </div>
</template>
<style lang="less">
#addServers {
    position: absolute;
    width: 100%;
    height: 100%;
    // background: url('/static/image/install_bg.jpg'); 
    .content-pan {
        margin: 60px 60px;
        .condition-box {
            margin-bottom: 20px;
        }
        .error-msg {
            color: red;
        }
    }
    .tip-text {
        padding-top: 7px;
        margin-bottom: 0;
        text-align: left;
        color: red;
    }
    .btn-box {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -30px;
        color: #fff;
    }
    .btn-delete {
        padding: 4px 8px;
    }
    .btn-next {
        position: fixed;
        left: 50%;
        bottom: 60px;
        margin-left: -62px;
    }
}
</style>
<script>
import util from 'common/js/util.js';
import {
    Loading
} from 'element-ui';
import Steps from 'components/steps/Steps.vue';
var currentEditIndex = 0;
export default {
    name: 'addServers',
    mounted: function() {
        let serverList = util.getSessionData('serverList');
        this.nextDisable = serverList && serverList.length > 0 ? false : true;
        this.serverList = serverList || [];

        this.maxNodes = util.getSessionData('maxNodes') || 0;
        
    },
    beforeRouteEnter(to, from, next) {
        console.log(from.path);
        next();
    },
    data() {
        return {
            inputIp: '172.16.61.[196-198]',
            inputUserName: 'root',
            inputPassword: '123456',
            inputHostName: 'node',
            ipError: false,
            nameError: false,
            pwdError: false,
            isShowBox: false, //是否展示添加服务器面板
            isShowEditBox: false,
            nextDisable: true,
            serverList: [],
            maxNodes: 0
        }
    },
    watch: {
        //深层监听
        serverList: {
            handler(newData, oldData) {
                util.setSessionData('serverList', this.serverList);
                this.nextDisable = this.serverList.length > 0 ? false : true;
            },
            deep: true
        }
        /*serverList(newData, oldData) {            
            util.setSessionData('serverList', this.serverList);
            this.nextDisable = this.serverList.length > 0 ? false : true;
        }*/
    },
    components: {
        Steps
    },
    computed: {
        hostName() {
            return this.inputHostName + this.inputIp.substring(this.inputIp.lastIndexOf('.') + 1);
        }
    },
    methods: {
        deleteAll() {
            if (this.serverList.length > 0) {
                this.$msgbox({
                    title: '提示',
                    message: '确定删除所有？',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(action => {
                    if (action === 'confirm') {
                        this.serverList = [];
                    }
                });
            }
        },
        deleteIcon(h, obj) {
            // console.log(h);
            return h('div', {
                domProps: {
                    innerHTML: '全部删除'
                },
                style: {
                    color: 'blue',
                    cursor: 'pointer'
                },
                on: {
                    click: this.deleteAll
                }
            }, [

            ]);
        },
        getIPs(strIPs) {
            return strIPs.substring(strIPs.indexOf('[') + 1, strIPs.indexOf(']')).split('-');

        },
        checkSameIPs(ip) {
            let same = false;
            for (let i = 0; i < this.serverList.length; i++) {
                if (this.serverList[i].ip == ip) {
                    same = true;
                    break;
                }
            }
            return same;
        },
        addServer() {
            if (this.inputIp === '' || this.inputUserName === '' || this.inputPassword === '' || this.inputHostName === '') {
                this.$message({
                    message: '输入内容不能为空！',
                    type: 'warning'
                });
                return;
            }
            // 只支持root用户名
            if (this.inputUserName !== 'root') {
                this.$message({
                    message: '暂时只支持root用户名！',
                    type: 'warning'
                });
                return;
            }

            // 匹配ip,检查主机名重复
            if (util.isIP(this.inputIp) || util.isIPs(this.inputIp)) {
                if (util.isIP(this.inputIp)) { //匹配单个ip
                    // 校验重复ip
                    let sameIP = false;
                    // let sameHost = false;
                    this.serverList.forEach(item => {
                        if (item.ip === this.inputIp) {
                            sameIP = true;
                            this.$message({
                                message: '已添加该ip！',
                                type: 'warning'
                            });
                            return;
                        }
                    });

                    if (sameIP) {
                        return;
                    }

                    //判断最大可添加节点
                    if (this.maxNodes <= this.serverList.length) {
                        this.$message({
                            message: '最大可添加节点数为：' + this.maxNodes,
                            type: 'warning'
                        });
                        return;
                    }

                    this.serverList.push({
                        ip: this.inputIp,
                        name: this.inputUserName,
                        pwd: this.inputPassword,
                        host: this.hostName,
                        showError: false,
                        errorMsg: '',
                        noPwdPercentage: 0,
                        // noPwdStatus: '就绪',
                        noPwdPerStatus: '',
                        hostPercentage: 0,
                        // hostStatus: '就绪',
                        hostPerStatus: '',
                        isNTP: false
                    });
                } else { //匹配多个ip
                    let ipHead = this.inputIp.substring(0, this.inputIp.indexOf('['));
                    let strIps = this.getIPs(this.inputIp);
                    for (let i = strIps[0]; i <= strIps[1]; i++) {

                        if (this.checkSameIPs(ipHead + i)) { //判断重复
                            continue;
                        } else {

                            if (this.maxNodes <= this.serverList.length) {
                                this.$message({
                                    message: '最大可添加节点数为：' + this.maxNodes,
                                    type: 'warning'
                                });
                                break;
                            }
                            this.serverList.push({
                                ip: ipHead + i,
                                name: this.inputUserName,
                                pwd: this.inputPassword,
                                host: this.inputHostName + i,
                                showError: false,
                                errorMsg: '',
                                noPwdPercentage: 0,
                                // noPwdStatus: '就绪',
                                noPwdPerStatus: '',
                                hostPercentage: 0,
                                // hostStatus: '就绪',
                                hostPerStatus: '',
                                isNTP: false
                            });
                        }

                    }
                }
            } else {
                this.$message({
                    message: '输入的ip格式有误！',
                    type: 'warning'
                });
            }

        },
        deleteServer(index) {
            this.$msgbox({
                title: '提示',
                message: '确定删除？',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(action => {
                if (action === 'confirm') {
                    this.serverList.splice(index, 1);
                }
            });
            
        },
        addAjax(reqList) {
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: '节点添加中,请勿刷新页面...'
            });

            AJAX.save({
                type: 'node',
                jsonstr: JSON.stringify(reqList)
            }).then(res => {
                loadingInstance.close();
                if (res.body.status === 'success') {
                    this.$router.replace('/configNoPwd');
                } else {
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
        },
        next() {

            let reqList = [];
            this.serverList.forEach(server => {
                reqList.push({
                    ip: server.ip,
                    hostname: server.host,
                    port: 22,
                    username: server.name,
                    pwd: server.pwd
                });
            });

            //检查节点
            var loadingInstance = Loading.service({
                fullscreen: true,
                text: '节点检查中,请勿刷新页面...'
            });

            let ajaxNum = 0;
            let stopAdd = false;
            reqList.forEach((data, index) => {
                var self = this;
                (function(index) {

                    AJAX.check({
                        type: 'node',
                        json: JSON.stringify(data)
                    }).then(res => {
                        console.log('---check---' + index);
                        if (res.body.status === 'success') {
                            self.serverList[index]['showError'] = false;
                            stopAdd = stopAdd || false;
                        } else {
                            self.serverList[index]['errorMsg'] = res.body.status || '无';
                            self.serverList[index]['showError'] = true;
                            stopAdd = stopAdd || true;
                        }
                        ajaxNum++;

                        //请求完成并且都通过检查
                        if (ajaxNum === reqList.length) {
                            loadingInstance.close();
                            if (!stopAdd) {
                                // console.log('--addAjax--');
                                self.addAjax(reqList);
                            }
                        }
                    }, res => {
                        loadingInstance.close();
                        self.$message({
                            message: '系统异常',
                            type: 'warning'
                        });
                    });

                })(index);
            });


            //保存节点
            /*var loadingInstance = Loading.service({
                fullscreen: true,
                text: '节点添加中,请勿刷新页面...'
            });

            AJAX.save({type:'node', jsonstr: JSON.stringify(reqList)}).then(res => {
                loadingInstance.close();
                if(res.body.status === 'success') {
                    this.$router.replace('/configNoPwd');
                }else {
                    this.$message({
                        message: res.body.status,
                        type: 'warning'
                    });
                }
            }, res =>{
                loadingInstance.close();
                this.$message({
                    message: '系统异常',
                    type: 'warning'
                });
            });*/
        }

    }
}
</script>
