<template>
    <div id="baseService">
        <div class="top-btn">
            <el-button type="primary" @click="baseAddFn"><i class="el-icon-plus"></i> &nbsp;添加基础服务</el-button>
        </div>
        <div class="top-tab">
            <el-table :data="basisServerList" stripe style="width: 100%">
                <el-table-column prop="name" label="基础服务名称">
                </el-table-column>
                <el-table-column prop="ip" label="所属IP">
                </el-table-column>
                <!--<el-table-column prop="workStatus" label="工作状态">-->
                <!--<template scope="scope">-->
                <!--<span >-->
                <!--<i class="status"></i>-->
                <!--{{ scope.row.workStatus }}-->
                <!--</span>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column prop="path" label="路径">
                </el-table-column>
                <el-table-column prop="port" label="端口">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <span class="edit el-icon-edit" @click="modefiyBaseNode(scope.row, scope.$index)"></span>&nbsp;&nbsp;
                        <span class="edit el-icon-delete" @click="deleteBaseNode(scope.row, scope.$index)"></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="添加基础服务" v-model="dialogBaseAdd" @close="closeBaseAdd">
            <div class="">
                <div class="form-group">
                    <label class="el-form-item__label ">描述名：</label>
                    <input class="form-control" v-model="baseAddObj.description" placeholder="请输入描述名">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">路径：</label>
                    <input class="form-control" v-model="baseAddObj.path" placeholder="格式为 /home ">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">ip地址：</label>
                    <input class="form-control" v-model="baseAddObj.ip" placeholder="请输入ip">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">端口：</label>
                    <input class="form-control" v-model="baseAddObj.port" placeholder="请输入端口">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">用户名：</label>
                    <input class="form-control" v-model="baseAddObj.userName" placeholder="请输入用户名">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">密码：</label>
                    <input type="password" class="form-control" v-model="baseAddObj.password" placeholder="请输入密码">
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addBaseOK">确 定</el-button>
                <el-button @click="dialogBaseAdd=false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改基础服务" v-model="dialogBaseModeifyVisible">
            <!-- <div> -->
            <div class="">
                <div class="form-group">
                    <label class="el-form-item__label">描述名：</label>
                    <input class="form-control" v-model="baseDetail.name" disabled placeholder="请输入描述名">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">路径：</label>
                    <input class="form-control" v-model="baseDetail.path" placeholder="格式为 /home ">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">ip地址：</label>
                    <input class="form-control" v-model="baseDetail.ip" placeholder="请输入ip">
                </div>
                <div class="form-group">
                    <label class=" el-form-item__label">端口：</label>
                    <input class="form-control" v-model="baseDetail.port" placeholder="请输入端口">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">用户名：</label>
                    <input class="form-control" v-model="baseDetail.userName" placeholder="请输入用户名">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">密码：</label>
                    <input type="password" class="form-control" v-model="baseDetail.password" placeholder="请输入密码">
                </div>
            </div>
            <!--  <div class="form-group" v-for="(val, key) in baseDetail" v-if="key !='path'">
                    <label class="control-label">{{key}}：</label>
                    <input class="form-control" :disabled="key == 'name'" v-model="baseDetail[key]">
                </div>
            </div> -->
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="modefiyBaseOK">确 定</el-button>
                <el-button @click="dialogBaseModeifyVisible=false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less">
#baseService {
    .top-btn {
        margin-left: 16px;
    }
    .el-dialog--small {
        .form-control {
            width: 200px;
        }
        .el-message__header {
            padding: 15px 20px 0;
            background: #eee;
            height: 52px;
            .el-message__close {
                top: 16px;
            }
        }
    }
    .form-group {
        label {
            width: 100px;
        }
    }
    .top-tab {
        margin: 16px;
        .status {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: lightgreen;
            display: inline-block;
            margin-right: 6px;
        }
        .edit {
            cursor: pointer;
            color: #999;
            &:hover {
                color: orange;
            }
        }
    }
}
</style>
<script>
import {
    Loading
} from 'element-ui';
import util from 'common/js/util.js';
export default {
    mounted() {
            AJAX.getServerInfo().then(res => {
                if (res.body.code == 200) {
                    var resData = res.body.map;
                    this.basisServerList = resData.basisServer;

                }
            }, res => {
                this.$message({
                    message: '系统异常',
                    type: 'warning'
                });
            });
        },
        data() {
            return {
                dialogBaseAdd: false,
                dialogBaseModeifyVisible: false,
                basisServerList: [],
                baseDetail: {},
                baseAddObj: {
                    description: '',
                    path: '',
                    ip: '',
                    port: '',
                    userName: '',
                    password: ''
                },
                loading: false
            }
        },
        methods: {
            refresh() {
                AJAX.getServerInfo().then(res => {
                    if (res.body.code == 200) {
                        var resData = res.body.map;
                        this.basisServerList = resData.basisServer;
                    }
                }, res => {
                    this.$message({
                        message: '系统异常',
                        type: 'warning'
                    });
                });
            },
            closeBaseAdd() {
                this.baseAddObj.description = '';
                this.baseAddObj.path = '';
                this.baseAddObj.ip = '';
                this.baseAddObj.port = '';
                this.baseAddObj.userName = '';
                this.baseAddObj.password = '';

            },
            addBaseOK() {
                var loadingInstance = Loading.service({
                    fullscreen: true,
                });
                let obj = {};
                obj.type = 'baseType';
                obj.description = this.baseAddObj.description;
                obj.path = this.baseAddObj.path;
                obj.ip = this.baseAddObj.ip;
                obj.port = this.baseAddObj.port;
                obj.userName = this.baseAddObj.userName;
                obj.password = this.baseAddObj.password;
                if (!util.IP.test(obj.ip)) {
                    loadingInstance.close();
                    this.$message({
                        message: 'ip不合法',
                        type: 'warning'
                    });
                    return; 
                }
                AJAX.register({
                    data: JSON.stringify(obj)
                }).then(res => {
                    loadingInstance.close();
                    if (res.body.code === 200) {
                        this.$message('添加成功');
                        this.dialogBaseAdd = false;
                        this.refresh();
                        this.loading = false;
                    }
                }, res => {
                    loadingInstance.close();
                    this.$message({
                        message: '系统异常',
                        type: 'warning'
                    });
                });

            },
            baseAddFn() {
                this.dialogBaseAdd = true;
            },
            deleteBaseNode(data, index) {
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let obj = {};
                    obj.type = 'baseType';
                    obj.path = data.path;
                    AJAX.remove({
                        data: JSON.stringify(obj)
                    }).then(res => {
                        if (res.body.code === 200) {
                            this.basisServerList.splice(index, 1);
                            this.$message('删除成功');
                        }
                    }, res => {
                        this.$message({
                            message: '系统异常',
                            type: 'warning'
                        });
                    });
                }).catch(() => {});

            },
            modefiyBaseNode(data) {
                this.baseDetail = data;
                this.dialogBaseModeifyVisible = true;
            },
            modefiyBaseOK() {
                var loadingInstance = Loading.service({
                    fullscreen: true,
                });
                let obj = {};
                obj.type = 'baseType';
                for (let key in this.baseDetail) {
                    obj[key] = this.baseDetail[key];
                }
                AJAX.register({
                    data: JSON.stringify(obj)
                }).then(res => {
                    loadingInstance.close();
                    if (res.body.code === 200) {
                        this.$message('修改成功');
                        this.dialogBaseModeifyVisible = false;
                        this.refresh();
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
