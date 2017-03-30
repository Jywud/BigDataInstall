<template>
    <div id="businessService">
        <div class="top-btn">
            <el-button type="primary" @click="businessAddFn"><i class="el-icon-plus"></i> &nbsp;添加业务服务</el-button>
        </div>
        <div class="content">
            <el-tree class="filter-tree" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent">
                <span><span style="float: right; margin-right: 20px">
        <el-button size="mini" on-click={ ()=> this.remove(store, data) }>Delete</el-button>
        </span></span>
            </el-tree>
            <el-table :data="businessServerList" stripe>
                <el-table-column prop="description" label="业务服务名称">
                </el-table-column>
                <el-table-column prop="ip" label="所属IP">
                </el-table-column>
                <el-table-column prop="userPercent" label="利用率（%）">
                </el-table-column>
                <el-table-column prop="statusCn" label="工作状态">
                    <template scope="scope">
                        <span><i class="status" :class="{statusGreen:scope.row.isWork,statusRed:scope.row.noWork}"></i>{{ scope.row.statusCn }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="path" label="路径">
                </el-table-column>
                <el-table-column prop="port" label="端口">
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <span class="edit el-icon-edit" @click="modefiyBaseNode(scope.row, scope.$index)"></span>&nbsp;&nbsp;
                        <span class="edit el-icon-delete" @click="deleteDetail(scope.row,scope.$index)"></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="添加业务服务" v-model="dialogBusinessAddVisible">
            <div>
                <div>
                    <div class="form-group">
                        <label class="el-form-item__label">描述名：</label>
                        <input class="form-control" v-model="businessAddInput.description" placeholder="请输入描述名">
                    </div>
                    <div class="form-group">
                        <label class="el-form-item__label">IP：</label>
                        <input type="text" class="form-control" v-model="businessAddInput.ip" placeholder="请输入ip">
                    </div>
                    <div class="form-group">
                        <label class="el-form-item__label">端口：</label>
                        <input type="text" class="form-control" v-model="businessAddInput.port" placeholder="请输入端口">
                    </div>
                    <div class="form-group">
                        <label class="el-form-item__label">路径：</label>
                        <input type="text" class="form-control" v-model="businessAddInput.path" placeholder="请输入路径">
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addBusinessOK">确 定</el-button>
                <el-button @click="dialogBusinessAddVisible=false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改基础服务" v-model="dialogBusinessModeifyVisible">
            <div>
                <div class="form-group">
                    <label class="el-form-item__label">描述名：</label>
                    <input class="form-control" v-model="businessDetail.description" placeholder="请输入描述名">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">IP：</label>
                    <input type="text" class="form-control" v-model="businessDetail.ip" placeholder="请输入ip">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">端口：</label>
                    <input type="text" class="form-control" v-model="businessDetail.port" placeholder="请输入端口">
                </div>
                <div class="form-group">
                    <label class="el-form-item__label">路径：</label>
                    <input type="text" class="form-control" v-model="businessDetail.path" placeholder="请输入路径">
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="modefiyBusinessOK">确 定</el-button>
                <el-button @click="dialogBusinessModeifyVisible=false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less">
#businessService {
    .top-btn {
        margin-left: 16px;
    }
    .el-dialog--small {
        .el-message__header {
            padding: 15px 20px 0;
            background: #eee;
            height: 52px;
            .el-message__close {
                top: 16px;
            }
        }
        .form-control {
            width: 200px;
        }
    }
    .form-group {
        label {
            width: 100px;
        }
    }
    .content {
        position: absolute;
        border: #dedede solid 1px;
        margin: 0 10px;
        top: 172px;
        bottom: 10px;
        left: 10px;
        right: 10px;
        .status {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 6px;
        }
        .statusGreen {
            background: lightgreen;
        }
        .statusRed {
            background: red;
        }
        .el-tree {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            border-right: 1px solid #dedede;
            width: 200px;
        }
        .el-table {
            margin: 0 0 0 200px;
            border-width: 0;
            width: auto;
        }
        .edit {
            cursor: pointer;
            color: #999;
            &:hover {
                color: orange;
            }
        }
        .el-tree-node__children {
            .is-current {
                background: #e4e8f1;
            }
        }
    }
}
</style>
<script>
import {
    Loading
} from 'element-ui';
export default {
    mounted() {
            AJAX.getServerInfo().then(res => {

                if (res.body.code == 200) {
                    var resData = res.body.map.businessServer;
                    resData.forEach(data => {
                        var TreeItem = {
                            label: data.name,
                            children: []
                        };
                        data.businessList.forEach(data2 => {
                            TreeItem.children.push({
                                label: data2.description || data2.name,
                                moduleList: data2.moduleList,
                                name: data2.name
                            });
                        });
                        this.treeData.push(TreeItem);
                    });

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
                parentNode: '',
                dialogBusinessAddVisible: false,
                businessServerList: [],
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                businessAddInput: {
                    description: '',
                    ip: '',
                    port: '',
                    path: '',
                    userName: '',
                    password: ''

                },
                dialogBusinessModeifyVisible: false,
                businessDetail: {},
                loading: false
            };
        },
        methods: {
            handleNodeClick(data, a, b) {
                //不是叶子节点
                if (!!data.children) {
                    return;
                }
                this.businessServerList = data.moduleList;
                this.businessServerList.forEach(data1 => {
                    if (data1.status === '0') {
                        data1.statusCn = '正常';
                        data1.isWork = true;
                        data1.noWork = false;
                    } else if (data1.status === '1') {
                        data1.statusCn = '报警';
                        data1.isWork = false;
                        data1.noWork = true;
                    } else {
                        data1.statusCn = '异常';
                        data1.isWork = false;
                        data1.noWork = true
                    }
                    data1.userPercent = data1.utilization * 100 + '%';
                });
                this.parentNode = a.parent.data.name;
            },
            //业务服务添加确定
            addBusinessOK() {
                var loadingInstance = Loading.service({
                    fullscreen: true,
                });
                let obj = {};
                obj.type = 'businessType';
                obj.description = this.businessAddInput.description;
                obj.ip = this.businessAddInput.ip;
                obj.port = this.businessAddInput.port;
                obj.path = this.businessAddInput.path;
                obj.utilization = '0';
                obj.status = '0';
                AJAX.register({
                    data: JSON.stringify(obj)
                }).then(res => {
                    loadingInstance.close();
                    if (res.body.code === 200) {
                        this.loading = false
                        this.$message('添加成功');
                        this.dialogBusinessAddVisible = false;
                        this.refresh();
                    }
                }, res => {
                    loadingInstance.close();
                    this.$message({
                        type: 'warning',
                        message: '系统异常',
                    });
                });
            },
            businessAddFn() {
                this.dialogBusinessAddVisible = true;
                this.businessAddInput = {
                    description: '',
                    ip: '',
                    port: '',
                    path: '',
                    userName: '',
                    password: ''
                };

            },
            refresh() {
                this.treeData = [];
                AJAX.getServerInfo().then(res => {

                    if (res.body.code == 200) {
                        var resData = res.body.map.businessServer;
                        resData.forEach(data => {
                            var TreeItem = {
                                label: data.name,
                                children: []
                            };
                            data.businessList.forEach(data2 => {
                                TreeItem.children.push({
                                    label: data2.description || data2.name,
                                    moduleList: data2.moduleList,
                                    name: data2.name
                                });
                            });
                            this.treeData.push(TreeItem);
                        });

                    }
                }, res => {
                    this.$message({
                        message: '系统异常',
                        type: 'warning'
                    });
                });
            },
            deleteBusinessNode(data) {
                let obj = {};
                obj.type = 'businessType';
                if (this.businessServerList.length === 1) {
                    obj.path = '\/' + this.parentNode;
                } else {
                    obj.path = '\/' + this.parentNode + '\/' + data.name;
                }


                // this.businessServerList[index]['businessList'].splice(index2, 1);

                AJAX.remove({
                    data: JSON.stringify(obj)
                }).then(res => {
                    if (res.body.code === 200) {
                        this.refresh();
                        //this.businessServerList[index]['businessList'].splice(index2, 1);
                        this.$message('删除成功');
                    }
                }, res => {
                    this.$message({
                        type: 'warning',
                        message: '系统异常',
                    });
                });

            },
            deleteDetail(data, index) {
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let obj = {};
                    obj.type = 'businessType';
                    obj.path = data.path + '\/' + data.ip + '_' + data.port;
                    AJAX.remove({
                        data: JSON.stringify(obj)
                    }).then(res => {
                        if (res.body.code === 200) {
                            this.businessServerList.splice(index, 1);
                            this.$message('删除成功');
                        }
                    }, res => {
                        this.$message({
                            type: 'warning',
                            message: '系统异常',
                        });
                    });
                }).catch(() => {})

            },
            remove(store, data) {
                store.remove(data);
            },
            modefiyBaseNode(data, index) {
                this.businessDetail = data;
                this.dialogBusinessModeifyVisible = true;
            },
            modefiyBusinessOK() {
                var loadingInstance = Loading.service({
                    fullscreen: true,
                });
                let obj = {};
                obj.type = 'businessType';
                for (let key in this.businessDetail) {
                    obj[key] = this.businessDetail[key];
                }
                AJAX.register({
                    data: JSON.stringify(obj)
                }).then(res => {
                    if (res.body.code === 200) {
                        loadingInstance.close();
                        this.$message('修改成功');
                        this.dialogBusinessModeifyVisible = false;
                        this.refresh();
                    }
                }, res => {
                    loadingInstance.close();
                    this.$message({
                        type: 'warning',
                        message: '系统异常',
                    });
                });
            },
            renderContent(h, {
                node,
                data,
                store
            }) {
                var _self = this;
                return h('span', {}, [
                    h('span', data.label),
                    h('span', {
                        class: 'el-icon-delete',
                        style: {
                            float: 'right',
                            marginTop: '10px',
                            marginRight: '6px',
                            zIndex: 10
                        },
                        on: {
                            click: function() {
                                let obj = {};
                                obj.type = 'businessType';
                                if (node.level === 1) {
                                    obj.path = '\/' + node.data.label;
                                } else if (node.level === 2) {
                                    obj.path = '\/' + node.parent.data.label + '\/' + node.data.name;
                                }
                                AJAX.remove({
                                    data: JSON.stringify(obj)
                                }).then(res => {
                                    if (res.body.code === 200) {
                                        _self.refresh();
                                        _self.$message('删除成功');
                                    }
                                }, res => {
                                    this.$message({
                                        type: 'warning',
                                        message: '系统异常',
                                    });
                                });
                            }
                        }
                    }, [])
                ]);
            }
        }
}
</script>
