<template>
    <div id="addServers">
        <steps :active="0"></steps>        
        <div class="content-pan">
            <h4>IP可以使用如下模式：<mark>192.168.0.1</mark>单个添加 或者 <mark>192.168.0.[1-10]</mark>多个添加</h4>
            <form class="form-inline condition-box">
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
                        <input type="text" class="form-control" v-model="inputPassword" placeholder="密码">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">主机名</div>
                        <input type="text" class="form-control" v-model="inputHostName" placeholder="主机名">
                    </div>
                </div>
                <div class="btn btn-success" @click="addServer"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;添加</div>
            </form>
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
                        <input type="text" class="form-control" v-model="scope.row.pwd"  placeholder="密码">
                      </template>                    
                </el-table-column>
                <el-table-column prop="host" label="主机名">
                    <template scope="scope">                        
                        <input type="text" class="form-control" v-model="scope.row.host" placeholder="主机名">
                      </template>                    
                </el-table-column>
                <el-table-column prop="delete" :renderHeader="deleteIcon" width="180">
                    <template scope="scope">
                        <el-button
                          size="small"
                          type="danger"
                          @click="deleteServer(scope.$index)">删除</el-button>
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
    .content-pan {
        margin: 60px 60px;
        .condition-box{
            margin-bottom: 20px;
        }
        /* .el-table .cell {
            text-align: center;
        } */

    }/* 
    .serverList {
        padding: 0;
        width: 90%;
        // height: 400px;
        margin: 60px auto;
        // border: 1px solid #888;
        .server {
            position: relative;
            float: left;
            padding: 5px;
            cursor: pointer;
            color: #fff;
            background-color: #eee;
            border: #666;
            text-align: center;
            // line-height: 150px;
            width: 180px;
            // height: 150px;
            margin: 20px;
            border-radius: 5px;
            &:hover {
                background-color: #aaa;
            }
            &:hover>.editPan {
                display: block;
            }
            .editPan {
                position: absolute;
                display: none;
                line-height: 20px;
                top: 0px;
                right: -35px;
                width: 40px;
            }
            .editIcon {
                height: 20px;
                padding-left: 5px;
                &:hover {
                    color: red;
                }
            }
            .delIcon {
                height: 20px;
                margin-bottom: 10px;
                padding-left: 5px;
                &:hover {
                    color: red;
                }
            }
        }
    } */
    .tip-text {
        padding-top: 7px;
        margin-bottom: 0;
        text-align: left;
        color: red;
    }
    /* .addIcon {
        transition: all 0.5s;
        width: 60px;
        height: 60px;
        cursor: pointer;
        background-color: #2A4DB0;
        background-image: url('/static/image/addServer_icon.png');
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 60px;
        margin-bottom: 10px;
        &:hover {
            transform: scale(1.1, 1.1);
            background-color: #286090;
            border-color: #204d74;
        }
    } */
    .btn-box {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -30px;
        color: #fff;
    }
    .btn-next {
        position: fixed;
        left: 50%;
        bottom: 60px;
        // padding: 10px 40px;
        margin-left: -62px;
    }
}
</style>
<script>
import util from 'common/js/util.js';
// import { MessageBox } from 'element-ui';
import Steps from 'components/steps/Steps.vue';
var currentEditIndex = 0;
export default {
    name: 'addServers',
    mounted: function() {        
        this.nextDisable = this.$root.serverList && this.$root.serverList.length > 0 ? false : true;
        this.serverList = this.$root.serverList || [];
    },
    data() {
        return {
            inputIp: '',
            inputUserName: '',
            inputPassword: '',
            inputHostName: '',
            ipError: false,
            nameError: false,
            pwdError: false,
            isShowBox: false, //是否展示添加服务器面板
            isShowEditBox: false,
            nextDisable: true,
            serverList: []
        }
    },
    watch: {
        serverList(newData, oldData) {
            //保存到全局
            this.$root.serverList = this.serverList;

            this.nextDisable = this.serverList.length > 0 ? false : true;

            // util.saveServers(this.serverList);
        }
    },
    components: {
        Steps
    },
    methods: {
        deleteAll () {
            if(this.serverList.length >0) {
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
        deleteIcon (h, obj) {
            // console.log(h);
            return h('div', {domProps:{innerHTML: '全删'}, style: {color: 'blue', cursor: 'pointer'}, on: {click: this.deleteAll}});
        },
        getIPs(strIPs) {
            return strIPs.substring(strIPs.indexOf('[')+1, strIPs.indexOf(']')).split('-');            

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
            if(this.inputUserName !== 'root') {
                this.$message({
                  message: '暂时只支持root用户名！',
                  type: 'warning'
                });
                return;
            }
            
            // 匹配ip
            if(util.isIP(this.inputIp) || util.isIPs(this.inputIp)) {
                if(util.isIP(this.inputIp)) { //匹配单个ip
                    // 校验重复ip
                    let sameIP = false;
                    this.serverList.forEach(item => {
                        if(item.ip === this.inputIp) {
                            sameIP = true;
                            this.$message({
                              message: '已添加该ip！',
                              type: 'warning'
                            });
                            return;
                        }
                    });
                    if(sameIP) {
                        return;
                    }

                    this.serverList.unshift({
                        ip: this.inputIp,
                        name: this.inputUserName,
                        pwd: this.inputPassword,
                        host: this.inputHostName,
                        noPwdPercentage: 0,
                        noPwdStatus: '就绪',
                        hostPercentage: 0,
                        hostStatus: '就绪',
                        isNTP: false
                    });
                } else { //匹配多个ip
                    let ipHead = this.inputIp.substring(0, this.inputIp.indexOf('['));
                    let strIps = this.getIPs(this.inputIp);
                    for(let i=strIps[0]; i<=strIps[1];i++) {
                        this.serverList.unshift({
                            ip: ipHead + i,
                            name: this.inputUserName,
                            pwd: this.inputPassword,
                            host: this.inputHostName,
                            noPwdPercentage: 0,
                            noPwdStatus: '就绪',
                            hostPercentage: 0,
                            hostStatus: '就绪',
                            isNTP: false
                        });
                    }
                }
            } else {
                this.$message({
                  message: '输入的ip格式有误！',
                  type: 'warning'
                });
            }
            
            // this.inputIp = '',
            // this.inputUserName = '',
            // this.inputPassword = '',
            // this.inputHostName = ''

        },
        deleteServer(index) {
            this.serverList.splice(index, 1);
            /*this.$msgbox({
                title: '提示',
                message: '确定删除？',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(action => {
                if (action === 'confirm') {
                    this.serverList.splice(index, 1);
                }
            });*/
        },

        /*cancel() {
            this.isShowBox = false;
        },*/
        next() {
            this.$router.replace('/configNoPwd');
            // this.$router.replace('/setNTP');
        }

    }
}
</script>
