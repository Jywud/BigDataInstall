<template>
    <div id="platform">
        <!--<form class="form-inline condition-box">-->
        <div class="form-top form-inline form-top-fixed">
            <div class="form-group">
                <label class="control-label">登录名：</label>
                <input type="text" class="form-control" placeholder="请输入登录名" v-model="userName">
            </div>
            <div class="form-group">
                <label class="control-label">密码：</label>
                <input type="password" class="form-control" placeholder="请输入密码" v-model="pwd">
            </div>
            <div class="form-group">
                <button type="button" class="btn btn-success" @click="addUser()">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;添加</span>
                </button>
            </div>
        </div>
        <!--</form>-->
        <div class="form-bottom form-bottom-fixed">
            <el-table :data="userList" stripe border style="width: 100%">
                <el-table-column  type="index" width="200"label="序号">
                </el-table-column>
                <el-table-column prop="name" label="用户名">
                </el-table-column>
                <el-table-column prop="delete" label="操作">
                    <template scope="scope">
                        <el-button size="small" type="primary" @click="update(scope.row.id)">修改密码
                        </el-button>
                        <el-button size="small" type="danger" @click="del(scope.row.id)" v-if='scope.row.id!=1'>删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="修改密码" v-model="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="新密码:" :label-width="formLabelWidth">
                    <input type="password" class='form-control' v-model="form.newPwd" />
                    <span class="notices" v-show="showErrorTip">{{notice}}</span>
                </el-form-item>
                <el-form-item label="确认密码:" :label-width="formLabelWidth">
                    <input type="password" class='form-control' v-model="form.confirmPwd" />
                    <span class="notices" v-show="showErrorTip1">{{notice1}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="commit()">确 定</el-button>
                <el-button @click="cancel()">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less">
#platform {
    margin-top: 66px;
    .form-top {
        padding: 20px 20px;
        margin-bottom: 16px;
        border: 1px solid #dedede;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 3px 1px rgba(233, 233, 233, .75);
    }
    .form-top-fixed {
        margin: 16px 16px 16px 16px
    }
    .form-bottom {
        border: 1px solid #dedede;
        border-radius: 4px;
        background: #f4f4f4;
    }
    .form-bottom-fixed {
        margin: 16px 16px 16px 16px
    }
    .operatePer {
        padding: 0 8px;
        span {
            display: inline-block;
            padding: 8px 5px;
            color: #0baafc;
            font-size: 12px;
            cursor: pointer;
            &:hover {
                color: #f3982d;
            }
        }
    }
    .resultPlatform {
        height: 50px;
        .result-findBtn {
            text-align: center;
            vertical-align: middle;
            visibility: visible;
            display: inline-block;
        }
    }
    .notices {
        color: red;
        font-size: 10px;
    }
}
</style>
<script>
import Service from '../../service.js'
export default {
    mounted: function() {
        AJAX.getUsers().then(data => {
            if (data.body.status === 'success') {
                console.log(data.body.result);
                this.userList = data.body.result;
            }
        }, () => {

        });
    },
    data() {
        return {
            userName: '',
            pwd: '',
            userList: [],
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
            dialogFormVisible: false,
            formLabelWidth: '120px',
            notice: '',
            notice1: '',
            showErrorTip: false,
            showErrorTip1: false,
            userId: ''
        }
    },
    methods: {
        //添加用户
        addUser() {
            if (this.userName === '') {
                this.$message({
                    message: '添加的用户名不能为空',
                    type: 'warning'
                });
                return;
            };

            if (this.pwd === '') {
                this.$message({
                    message: '添加的密码不能为空',
                    type: 'warning'
                });
                return;
            };
            let sameName = false;
            this.userList.forEach(user => {
                if (this.userName === user.name) {
                    sameName = true;
                    this.$message({
                        message: '用户名已存在',
                        type: 'warning'
                    });
                    return;
                }
            });
            if (!!sameName) {
                return;
            };
            var req = {
                name: this.userName,
                password: this.pwd
            }
            AJAX.userAdd(req).then(data => {
                if (data.body.status === 'success') {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.getUserList();
                }
            }, () => {
                this.$message({
                    message: '添加失败',
                    type: 'warning'
                });
            });
            this.userList.push({
                name: this.userName
            })
            this.userName = '';
            this.pwd = '';
        },
        //删除用户
        del(id) {
            this.$confirm('确定要删除该用户吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                let req = {
                    id: id
                };
                AJAX.userDelete(req).then(data => {
                    if (data.body.status === 'success') {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                }, () => {
                    this.$message({
                        message: '删除失败',
                        type: 'warning'
                    });
                });
                this.getUserList();
            }).catch(() => {});

        },
        //修改密码
        update(id) {
            this.dialogFormVisible = true;
            this.userId = id;
        },
        commit() {
            this.notice = '';
            this.notice1 = '';
            this.showErrorTip = false;
            this.showErrorTip1 = false;

            if (this.form.newPwd === '') {
                this.showErrorTip = true;
                this.notice = '新密码不能为空';
                return;
            }
            if (this.form.confirmPwd === '') {
                this.showErrorTip1 = true;
                this.notice1 = '确认密码不能为空';
                return;
            }
            if (this.form.confirmPwd != this.form.newPwd) {
                this.showErrorTip1 = true;
                this.notice1 = '新密码与确认密码不一致';
                return;
            }
            let req = {
                id: this.userId,
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
            }, () => {});
        },
        //取消修改
        cancel() {
            this.form.newPwd = '';
            this.form.confirmPwd = '';
            this.notice = '';
            this.notice1 = '';
            this.showErrorTip = false;
            this.showErrorTip1 = false;
            this.dialogFormVisible = false;
        },
        //获取用户列表
        getUserList() {
            AJAX.getUsers().then(data => {
                if (data.body.status === 'success') {
                    this.userList = data.body.result;
                }
            }, () => {

            });
        }
    }
}
</script>
