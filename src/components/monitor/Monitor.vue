<template>
    <div id="monitor">
        <nav>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <div class="nav navbar-nav">
                    <span class="icon-logo"></span>
                    <span class="icon-text">大数据基础管理平台</span>
                    <router-link to="/monitor/assembly" class="hover nav-item">组件监控</router-link>
                    <router-link to="/monitor/server" class="hover nav-item">服务器监控</router-link>
                    <router-link to="/monitor/serverinfo" class="hover nav-item" v-if="isCms">服务信息</router-link>
                    <router-link to="/monitor/platform" class="hover nav-item" v-if="isAdmin">用户管理</router-link>
                </div>
                <div class="nav navbar-nav navbar-right">
                    <div class="touxiang-icon hover" @click="dialogFormVisible = true"><img src="static/image/user-man.png" /></div>
                    <div class="logOut hover" @click="logOut">退出</div>
                </div>
            </div>
        </nav>
        <el-dialog title="修改密码" v-model="dialogFormVisible" @close="close">
            <el-form :model="form">
                <!--<el-form-item label="原密码" :label-width="formLabelWidth">-->
                <!--<input type="password" class='form-control' v-model="form.oldPwd"/>-->
                <!--<span v-show="{showErrorTip:true}">{{notice}}</span>-->
                <!--</el-form-item>-->
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <input type="password" class='form-control' v-model="form.newPwd" />
                    <span class="noticeError" v-show="showErrorTip1">{{notice1}}</span>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <input type="password" class='form-control' v-model="form.confirmPwd" />
                    <span class="noticeError" v-show="showErrorTip2">{{notice2}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="commit()">确 定</el-button>
                <el-button @click="dialogFormVisible=false">取 消</el-button>
            </div>
        </el-dialog>
        <router-view></router-view>
    </div>
</template>
<style lang="less">
#monitor {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    nav {
        height: 50px;
        line-height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
        font-size: 14px;
        font-weight: bold;
        z-index: 100;
        min-width: 1360px;
        border-bottom: 1px solid #0baafc;
        background: #2494F2;
        .icon-logo {
            display: inline-block;
            width: 37px;
            height: 37px;
            margin-right: 8px;
            position: absolute;
            top: 7px;
            vertical-align: middle;
            background: url(/static/image/police.png) no-repeat;
        }
        .icon-text {
            color: #fff;
            font: 700 20px/49px "Microsoft Yahei";
            margin: 46px;
        }
        a {
            display: inline-block;
            width: 100px;
            text-align: center;
            line-height: 50px;
            vertical-align: top;
            color: #fff;
        }
        .router-link-active {
            background: #36a3ff;
            /*#0776ae*/
            text-decoration: none
        }
    }
    .navbar-right {
        float: right!important;
        margin-right: 20px;
    }
    .hover {
        cursor: pointer;
        text-decoration: none;
    }
    .touxiang-icon {
        float: left;
        display: block;
        margin: 0 35px;
        border-radius: 100%;
        overflow: hidden;
        text-align: center;
        img {
            width: 30px;
            height: 30px;
        }
    }
    .logOut {
        color: #fff;
        display: inline;
    }
    .el-dialog--small {
        width: 450px;
        .el-dialog__header {
            padding: 15px 20px 0;
            background: #eee;
            height: 48px;
            .el-message__close {
                top: 16px;
            }
        }
        .el-dialog__title {
            color: #999;
        }
        .el-form-item__label {
            color: #999;
        }
        .noticeError {
            color: red;
        }
        .form-control {
            display: inline-block;
            vertical-align: middle;
            width: auto;
            min-width: 174px;
            height: 30px;
            border-radius: 4px;
            color: #333;
            box-shadow: none;
            font-size: 12px;
        }
    }
}
</style>
<script>
import util from 'common/js/util.js';
import Service from '../../service.js';
export default {
    mounted: function() {
        this.userInfo = util.getSessionData('userInfo');
        if (!!this.userInfo.isAdmin) {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        };
        if (!!this.userInfo.CMS) {
            this.isCms = true;
        } else {
            this.isCms = false;
        };
        //        this.$router.replace('/monitor/assembly');
    },
    data() {
        return {
            isSelected: 0,
            dialogFormVisible: false,
            form: {
                oldPwd: '',
                newPwd: '',
                confirmPwd: '',
                region: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
            notice: '',
            notice1: '',
            notice2: '',
            showErrorTip: false,
            showErrorTip1: false,
            showErrorTip2: false,
            isAdmin: false,
            userInfo: {},
            isCms: false

        };
    },
    methods: {
        logOut() {
            this.$confirm('确定要退出【大数据基础管理平台】吗?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning',
            }).then((a) => {
                var req = {
                    id: this.userInfo.id
                };
                AJAX.logout(req).then(data => {
                    if (data.body.status === 'success') {
                        util.setSessionData('userInfo', null);
                        this.$router.replace('/login');
                    }
                }, () => {
                    this.$message({
                        message: '系统异常',
                        type: 'warning'
                    });
                });

            }).catch(() => {

            });
        },
        serverAssnbly(index) {
            if (index === 0) {
                this.isSelected = 0;
                this.$router.replace('/monitor/assembly');
            } else if (index === 1) {
                this.isSelected = 1;
                this.$router.replace('/monitor/server');
            } else {
                this.isSelected = 2;
                this.$router.replace('/monitor/platform');
            }
        },
        close() {
            this.showErrorTip1 = false;
            this.showErrorTip2 = false;
            this.dialogFormVisible = false;
            this.form.newPwd = '';
            this.form.confirmPwd = '';
        },
        commit() {
            this.showErrorTip = false;
            this.showErrorTip1 = false;
            this.showErrorTip2 = false;
            if (this.form.newPwd === '') {
                this.showErrorTip1 = true;
                this.notice1 = '新密码不能为空';
                return;
            }
            if (this.form.confirmPwd === '') {
                this.showErrorTip2 = true;
                this.notice2 = '确认密码不能为空';
                return;
            }
            if (this.form.confirmPwd != this.form.newPwd) {
                this.showErrorTip2 = true;
                this.notice2 = '新密码与确认密码不一致';
                return;
            }
            let req = {
                id: this.userInfo.id,
                password: this.form.newPwd
            };
            AJAX.changePasswd(req).then(data => {
                if (data.body.status === 'success') {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.form.newPwd = '';
                    this.form.confirmPwd = '';
                }
            }, () => {
                this.$message({
                    message: '系统异常',
                    type: 'warning'
                });
            });
        }
    }

}
</script>
