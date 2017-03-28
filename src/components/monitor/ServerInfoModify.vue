<template>
    <div id="serverInfoModify">
        <div class="basisServer">
            <h4 class="text-center text-color">基础服务</h4>
            <ul class="clearfix">
                <li v-for="(server, index) in basisServerList" class="server-item" @click="showBaseDetail(server)">{{server.description}}
                    <span class="delete-icon" @click.stop="deleteBaseNode(server, index)">删除</span>
                    <span class="modefiy-icon" @click.stop="modefiyBaseNode(server, index)">修改</span>
                </li>
                <li class="server-item" @click="baseAddFn"><span class="glyphicon glyphicon-plus"></span></li>
            </ul>
        </div>
        <div class="businessServer">
            <h4 class="text-center text-color">业务服务</h4>
            <el-button type="primary" @click="businessAddFn">添加业务服务</el-button>
            <!-- <div class="btn btn-info" @click="businessAddFn">添加业务服务</div> -->
            <ul>
                <li v-for="(businessServer, index) in businessServerList" class="business-server">
                    <span class="second-title">{{businessServer.name}}：</span>
                    <ul class="clearfix">
                        <li v-for="(item, index2) in businessServer.businessList" class="server-item" @click="showBusinessDetail(item.moduleList)">
                            {{item.description || item.name}}
                            <span class="delete-icon" @click.stop="deleteBusinessNode(item, businessServer)">删除</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="otherServer text-color">
            <h4 class="text-center">其他服务</h4>
        </div>
        <el-dialog title="基础服务详情" v-model="dialogVisible" size="tiny">
            <div>
                <!-- <div style="height:350px;overflow-y:auto"> -->
                <div v-for="(val, key) in baseDetail">
                    {{key}} : {{val}}
                </div>
            </div>
        </el-dialog>
        <el-dialog title="业务服务详情" v-model="dialogBusinessVisible">
            <div>
                <div v-for="(item, index) in businessDetail" style="margin-bottom: 5px;padding:5px;position:relative;border: 1px solid #ddd">
                    <div v-for="(val, key) in item">
                        <div class="form-group">
                            <label class="control-label">{{key}}：</label>
                            <input class="form-control" v-model="item[key]">
                        </div>
                        <!-- {{key}} : {{val}} -->
                    </div>
                    <el-button type="warning detail-delete" icon="delete" @click="deleteDetail(item, index)"></el-button>
                    <el-button type="primary detail-modify" icon="edit" @click="modefiyDetail(item, index)"></el-button>
                    <!-- <div class="detail-delete btn btn-warning" @click="deleteDetail(item, index)">删除</div> -->
                    <!-- <div class="detail-modify btn btn-primary" @click="modefiyDetail(item, index)">修改</div> -->
                </div>
            </div>
        </el-dialog>
        <el-dialog title="添加基础服务" v-model="dialogBaseAdd" @close="closeBaseAdd">
            <div class="">
                <div class="form-group">
                    <label class="control-label">描述名：</label>
                    <input class="form-control" v-model="baseAddObj.description" placeholder="请输入描述名">
                </div>
                <div class="form-group">
                    <label class="control-label">路径：</label>
                    <input class="form-control" v-model="baseAddObj.path" placeholder="格式为 /home ">
                </div>
                <div class="form-group">
                    <label class="control-label">ip地址：</label>
                    <input class="form-control" v-model="baseAddObj.ip" placeholder="请输入ip">
                </div>
                <div class="form-group">
                    <label class="control-label">端口：</label>
                    <input class="form-control" v-model="baseAddObj.port" placeholder="请输入端口">
                </div>
                <div class="form-group">
                    <label class="control-label">用户名：</label>
                    <input class="form-control" v-model="baseAddObj.userName" placeholder="请输入用户名">
                </div>
                <div class="form-group">
                    <label class="control-label">密码：</label>
                    <input type="password" class="form-control" v-model="baseAddObj.password" placeholder="请输入密码">
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogBaseAdd=false">取 消</el-button>
                <el-button type="primary" @click="addBaseOK">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改基础服务" v-model="dialogBaseModeifyVisible">
            <div>
                <div class="form-group" v-for="(val, key) in baseDetail" v-if="key !='path'">
                    <label class="control-label">{{key}}：</label>
                    <input class="form-control" :disabled="key == 'name'" v-model="baseDetail[key]">
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogBaseModeifyVisible=false">取 消</el-button>
                <el-button type="primary" @click="modefiyBaseOK">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加业务服务" v-model="dialogBusinessAddVisible">
            <div>
                <div>
                    <div class="form-group">
                        <label class="control-label">描述名：</label>
                        <input class="form-control" v-model="businessAddInput.description" placeholder="请输入描述名">
                    </div>
                    <div class="form-group">
                        <label class="control-label">IP：</label>
                        <input type="text" class="form-control" v-model="businessAddInput.ip" placeholder="请输入ip">
                    </div>
                    <div class="form-group">
                        <label class="control-label">端口：</label>
                        <input type="text" class="form-control" v-model="businessAddInput.port" placeholder="请输入端口">
                    </div>
                    <div class="form-group">
                        <label class="control-label">路径：</label>
                        <input type="text" class="form-control" v-model="businessAddInput.path" placeholder="请输入路径">
                    </div>
                    <div class="form-group">
                        <label class="control-label">用户名：</label>
                        <input type="text" class="form-control" v-model="businessAddInput.userName" placeholder="请输入用户名">
                    </div>
                    <div class="form-group">
                        <label class="control-label">密码：</label>
                        <input type="password" class="form-control" v-model="businessAddInput.password" placeholder="请输入密码">
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogBusinessAddVisible=false">取 消</el-button>
                <el-button type="primary" @click="addBusinessOK">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less">
#serverInfoModify {
    margin: 0 40px;
    ul {
        padding: 0;
    }
    .el-dialog--small{
    	width: 600px;
    	.form-control{
    		width: 200px;
    	}
    }
    .text-color {
        color: blue;
    }
    .form-horizontal {
        .control-label {
            text-align: left;
        }
    }
    .business-server {
        margin-bottom: 10px;
        .second-title {
            font-weight: 800;
            color: #222;
        }
    }
    .basisServer,
    .businessServer {
        // border-bottom: 1px solid #999;
        margin-bottom: 30px;
    }
    .server-item-add {
        width: 160px;
        height: 80px;
        border: 1px solid #aa3;
        text-align: center;
        line-height: 80px;
        border-radius: 10px;
        box-shadow: 2px 2px 10px 1px #888;
        cursor: pointer;
        &:hover {
            background: #eee;
        }
    }
    .server-item {
        position: relative;
        float: left;
        width: 160px;
        height: 80px;
        border: 1px solid #aa3;
        margin-right: 20px;
        text-align: center;
        line-height: 80px;
        border-radius: 10px;
        box-shadow: 2px 2px 10px 1px #888;
        cursor: pointer;
        &:hover {
            background: #eee;
            .delete-icon {
                display: block;
            }
            .modefiy-icon {
                display: block;
            }
        }
        .modefiy-icon {
            position: absolute;
            display: none;
            line-height: 20px;
            width: 40px;
            top: 25px;
            right: 0;
            &:hover {
                color: red;
            }
        }
        .delete-icon {
            position: absolute;
            display: none;
            // border:1px solid;
            line-height: 20px;
            width: 40px;
            // height: 20px;
            top: 5px;
            right: 0;
            &:hover {
                color: red;
            }
        }
    }
    .detail-modify {
        position: absolute;
        top: 45px;
        right: 5px;
        cursor: pointer;
    }
    .detail-delete {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
    }
    .el-input {
        width: 300px;
    }
    .form-group {
        label {
            width: 100px;
        }
    }
}
</style>
<script>
export default {
    mounted() {
            AJAX.getServerInfo().then(res => {
                if (res.body.code == 200) {
                    var resData = res.body.map;
                    var businessServerList = resData.businessServer;
                    this.basisServerList = resData.basisServer;
                    this.businessServerList = businessServerList;
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
                dialogVisible: false,
                dialogBaseModeifyVisible: false,
                dialogBusinessAddVisible: false, //业务添加框展示
                dialogBusinessVisible: false,
                dialogBaseAdd: false,
                basisServerList: [],
                businessServerList: [],
                baseDetail: {},
                businessDetail: '',
                baseAddObj: {
                    description: '',
                    path: '',
                    ip: '',
                    port: '',
                    userName: '',
                    password: ''
                },
                businessAddInput: {
                    description: '',
                    ip: '',
                    port: '',
                    path: '',
                    userName: '',
                    password: ''

                }
            }
        },
        methods: {
            refresh() {
                AJAX.getServerInfo().then(res => {
                    if (res.body.code == 200) {
                        var resData = res.body.map;
                        var businessServerList = resData.businessServer;
                        this.basisServerList = resData.basisServer;
                        this.businessServerList = businessServerList;
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
                let obj = {};
                obj.type = 'baseType';
                obj.description = this.baseAddObj.description;
                obj.path = this.baseAddObj.path;
                obj.ip = this.baseAddObj.ip;
                obj.port = this.baseAddObj.port;
                obj.userName = this.baseAddObj.userName;
                obj.password = this.baseAddObj.password;
                // console.log(obj);

                AJAX.register({
                    data: JSON.stringify(obj)
                }).then(res => {
                    if (res.body.code === 200) {
                        this.$message('添加成功');
                        this.dialogBaseAdd = false;
                        this.refresh();
                    }
                }, res => {

                });

            },
            //业务服务添加确定
            addBusinessOK() {
                let obj = {};
                obj.type = 'businessType';
                obj.description = this.businessAddInput.description;
                obj.ip = this.businessAddInput.ip;
                obj.port = this.businessAddInput.port;
                obj.path = this.businessAddInput.path;
                obj.userName = this.businessAddInput.userName;
                obj.password = this.businessAddInput.password;

                // console.log(obj);
                AJAX.register({
                    data: JSON.stringify(obj)
                }).then(res => {
                    if (res.body.code === 200) {
                        this.$message('添加成功');
                        this.dialogBusinessAddVisible = false;
                        this.refresh();
                    }
                }, res => {

                });
            },
            baseAddFn() {
                this.dialogBaseAdd = true;
            },
            businessAddFn() {
                this.dialogBusinessAddVisible = true;
            },
            showBaseDetail(server) {
                this.baseDetail = server;
                this.dialogVisible = true;
                // console.log(server);

            },
            showBusinessDetail(server) {
                this.businessDetail = server;
                this.dialogBusinessVisible = true;
                // console.log(server);
            },
            deleteBaseNode(data, index) {
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

                });
            },
            deleteBusinessNode(data, outer) {
                let obj = {};
                obj.type = 'businessType';
                if (outer.businessList.length === 1) {
                    obj.path = '\/' + outer.name;
                } else {
                    obj.path = '\/' + outer.name + '\/' + data.name;
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

                });

            },
            deleteDetail(data, index) {
                let obj = {};
                obj.type = 'businessType';
                obj.path = data.path + '\/' + data.ip + '_' + data.port;
                // console.log(obj.path)
                AJAX.remove({
                    data: JSON.stringify(obj)
                }).then(res => {
                    if (res.body.code === 200) {
                        this.businessDetail.splice(index, 1);
                        this.$message('删除成功');
                    }
                }, res => {

                });
            },
            modefiyDetail(data) {
                // console.log(data);
                let obj = {};
                obj.type = 'businessType';
                for (let key in data) {
                    obj[key] = data[key];
                }
                console.log(obj);
                AJAX.register({
                    data: JSON.stringify(obj)
                }).then(res => {
                    if (res.body.code === 200) {
                        this.$message('修改成功');
                        this.dialogBusinessVisible = false;
                        this.refresh();
                    }
                }, res => {

                });
            },
            modefiyBaseNode(data) {
                this.baseDetail = data;
                console.log(data);
                this.dialogBaseModeifyVisible = true;
            },
            modefiyBaseOK() {
                let obj = {};
                obj.type = 'baseType';
                for (let key in this.baseDetail) {
                    obj[key] = this.baseDetail[key];
                }

                console.log(obj);

                AJAX.register({
                    data: JSON.stringify(obj)
                }).then(res => {
                    if (res.body.code === 200) {
                        this.$message('修改成功');
                        this.dialogBaseModeifyVisible = false;
                        this.refresh();
                    }
                }, res => {

                });
            }
        }
}
</script>
