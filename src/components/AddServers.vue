<template>
    <div id="addServers">
        <steps :active="0"></steps>
        <!-- <h2 class="text-center box-title">添加节点</h2> -->
        <div class="addServerBox" v-show="isShowBox">
            <div class="top clearfix">
                <div class="title-name title0 active">
                    添加节点
                </div>
                <div class="title-name title1">
                    批量添加
                </div>
            </div>
            <div class="content">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><span style="color:red">*</span>ip地址：</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" v-model="inputIp" placeholder="ip地址" @blur="checkRight('ip', inputIp)">
                        </div>
                        <span class="col-sm-3 tip-text" v-show="ipError">格式有误</span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><span style="color:red">*</span>用户名：</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" v-model="inputUserName" placeholder="用户名" @blur="checkRight('name', inputUserName)">
                        </div>
                        <span class="col-sm-3 tip-text" v-show="nameError">不能为空</span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><span style="color:red">*</span>密码：</label>
                        <div class="col-sm-6">
                            <input type="password" class="form-control" v-model="inputPassword" placeholder="密码" @blur="checkRight('pwd', inputPassword)">
                        </div>
                        <span class="col-sm-3 tip-text" v-show="pwdError">不能为空</span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">主机名：</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" v-model="inputHostName" placeholder="主机名">
                        </div>
                        <span class="col-sm-3 tip-text"></span>
                    </div>
                </form>
            </div>
            <div class="bottom">
                <div class="btn btn-primary" @click="confirm">确定</div>
                <div class="btn btn-primary" @click="cancel">取消</div>
            </div>
        </div>
        <div class="editServerBox" v-show="isShowEditBox">
            <div class="top clearfix">
                <div class="title-name title0 active">
                    修改节点
                </div>
            </div>
            <div class="content">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><span style="color:red">*</span>ip地址：</label>
                        <div class="col-sm-6">
                            <input type="text" disabled class="form-control" v-model="inputIp" placeholder="ip地址" @blur="checkRight('ip', inputIp)">
                        </div>
                        <span class="col-sm-3 tip-text" v-show="ipError">格式有误</span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><span style="color:red">*</span>用户名：</label>
                        <div class="col-sm-6">
                            <input type="text" disabled class="form-control" v-model="inputUserName" placeholder="用户名" @blur="checkRight('name', inputUserName)">
                        </div>
                        <span class="col-sm-3 tip-text" v-show="nameError">不能为空</span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label"><span style="color:red">*</span>密码：</label>
                        <div class="col-sm-6">
                            <input type="password" disabled class="form-control" v-model="inputPassword" placeholder="密码" @blur="checkRight('pwd', inputPassword)">
                        </div>
                        <span class="col-sm-3 tip-text" v-show="pwdError">不能为空</span>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">主机名：</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" v-model="inputHostName" placeholder="主机名">
                        </div>
                        <span class="col-sm-3 tip-text"></span>
                    </div>
                </form>
            </div>
            <div class="bottom">
                <div class="btn btn-primary" @click="editServerConfirm">确定</div>
                <div class="btn btn-primary" @click="editCancel">取消</div>
            </div>
        </div>
        <ul class="serverList">
            <li class="server" v-for="(server, index) in serverList">
                {{server.ip}}
                <div class="editPan">
                    <div class="delIcon" @click="deleteServer(index)">删除</div>
                    <div class="editIcon" @click="showEditBox(server, index)">修改</div>
                </div>
            </li>
        </ul>
        <div class="btn-box">
            <div class="addIcon" @click="showBox">
            </div>
            <div>添加节点</div>
        </div>
        <button class="btn btn-primary btn-next" :disabled="nextDisable" @click="next">下一步</button>
    </div>
</template>
<style lang="scss">
#addServers {
    position: absolute;
    width: 100%;
    height: 100%;
    .serverList {
        padding: 0;
        width: 90%;
        height: 400px;
        margin: 60px auto;
        // border: 1px solid #888;
        .server {
            position: relative;
            float: left;
            cursor: pointer;
            color: #fff;
            background-color: #1C367E;
            text-align: center;
            line-height: 50px;
            width: 180px;
            height: 50px;
            margin: 30px;
            border-radius: 5px;
            &:hover {
                background-color: #2E55C9;
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
                &:hover{
                	color: red;
                }
            }
            .delIcon {
                height: 20px;
                margin-bottom: 10px;
                padding-left: 5px;
                &:hover{
                	color: red;
                }
            }
        }
    }
    .tip-text {
        padding-top: 7px;
        margin-bottom: 0;
        text-align: left;
        color: red;
    }
    .addIcon {
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
    }
    .btn-box {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -30px;
        color: #fff;
    }
    .btn-next {
        position: absolute;
        left: 50%;
        bottom: 60px;
        background-color: #2A4DB0;
        padding: 10px 40px;
        margin-left: -62px;
    }
    .addServerBox {
        position: absolute;
        color: #fff;
        z-index: 1000;
        width: 400px;
        height: 380px;
        background: rgba(21, 65, 122, 0.6);
        box-shadow: 0 0 12px 5px #15427b;
        border: 1px solid #2175ff;
        top: 50%;
        left: 50%;
        margin-top: -190px;
        margin-left: -200px;
        .top {
            width: 100%;
            height: 40px;
            .title-name {
                cursor: pointer;
                border-bottom: 1px solid #2175ff;
                float: left;
                text-align: center;
                width: 50%;
                line-height: 40px;
                height: 40px;
                &.active {
                    background-color: #3B68FA;
                }
                &.title0 {
                    border-right: 1px solid #2175ff;
                }
            }
        }
        .content {
            margin: 50px 0;
        }
        .bottom {
            text-align: center;
            .btn-primary {
                padding-left: 60px;
                padding-right: 60px;
            }
        }
    }
    .editServerBox {
        position: absolute;
        color: #fff;
        z-index: 1000;
        width: 400px;
        height: 380px;
        background: rgba(21, 65, 122, 0.6);
        box-shadow: 0 0 12px 5px #15427b;
        border: 1px solid #2175ff;
        top: 50%;
        left: 50%;
        margin-top: -190px;
        margin-left: -200px;
        .top {
            width: 100%;
            height: 40px;
            .title-name {
                cursor: pointer;
                border-bottom: 1px solid #2175ff;
                float: left;
                text-align: center;
                width: 100%;
                line-height: 40px;
                height: 40px;
            }
        }
        .content {
            margin: 50px 0;
        }
        .bottom {
            text-align: center;
            .btn-primary {
                padding-left: 60px;
                padding-right: 60px;
            }
        }
    }
}
</style>
<script>
import util from 'common/js/util.js';
import { MessageBox } from 'element-ui';
import Steps from 'components/steps/Steps.vue';
var currentEditIndex = 0;
export default {
    name: 'addServers',
    created: function() {
        this.nextDisable = this.$root.serverList && this.$root.serverList.length > 0 ? false : true;
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
            serverList: this.$root.serverList || []
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
    components: {Steps},
    methods: {
        editServerConfirm() {
            // console.log(currentEditIndex);
            this.serverList.splice(currentEditIndex, 1, {
                ip: this.inputIp,
                name: this.inputUserName,
                pwd: this.inputPassword,
                host: this.inputHostName,
                isNTP: false
            });
            this.isShowEditBox = false;
        },
        editCancel() {
            this.isShowEditBox = false;
        },
        showEditBox(server, index) {
            currentEditIndex = index;
            this.isShowEditBox = true;
            this.isShowBox = false;
            this.inputIp = server.ip;
            this.inputUserName = server.name;
            this.inputPassword = server.pwd;
            this.inputHostName = server.host
        },
        /*deleteServer (index){
        	this.serverList.splice(index, 1);
        },*/
        showBox() {
            this.isShowEditBox = false;
            this.inputIp = '',
                this.inputUserName = '',
                this.inputPassword = '',
                this.inputHostName = '',
                this.ipError = false;
            this.nameError = false;
            this.pwdError = false;
            this.isShowBox = true;
        },
        //检查输入框内容
        checkRight(type, txt) {
            if (type === 'ip') {
                if (!util.IP.test(this.inputIp)) {
                    this.ipError = true;
                    return;
                }
                this.ipError = false;
            } else if (type === 'name') {
                if (this.inputUserName === '') {
                    this.nameError = true;
                    return;
                }
                this.nameError = false;
            } else if (type === 'pwd') {
                if (this.inputPassword === '') {
                    this.pwdError = true;
                    return;
                }
                this.pwdError = false;
            }
        },
        confirm() {
            if (this.ipError || this.nameError || this.pwdError) {
                return;
            }
            this.serverList.push({
                ip: this.inputIp,
                name: this.inputUserName,
                pwd: this.inputPassword,
                host: this.inputHostName,
                isNTP: false
            });
            this.inputIp = '',
                this.inputUserName = '',
                this.inputPassword = '',
                this.inputHostName = ''

        },
        deleteServer(index) {
            var self = this;
            MessageBox({
                title: '提示',
                message: '确定删除？',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(function(action) {
                if (action === 'confirm') {
                    self.serverList.splice(index, 1);
                }
            });
            // 箭头函数写法
            /*this.$msgbox({ title: '提示', message: '确定删除？', showCancelButton: true, confirmButtonText: '确定', cancelButtonText: '取消' }).then(action => { 
            	if(action === 'confirm') {
            		this.serverList.splice(index, 1);
            	}
            });*/
        },

        cancel() {
            this.isShowBox = false;
        },
        next() {
            this.$router.replace('/configNoPwd');
        }

    }
}
</script>
