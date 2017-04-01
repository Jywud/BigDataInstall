<style lang="less">
#chooseComponents {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #000;
    // background: url('/static/image/install_bg.jpg');
    .btn-pan {
        position: absolute;
        bottom: 60px;
        left: 50%;
        margin-left: -126px;
    }
    .default-color {
        color: #000;
    }
    .install-type-pan {
        margin: 50px auto 30px;
        width: 200px;
        text-align: center;
    }
    .choose-main-pan {
        width: 330px;
        margin: 0 auto 40px;
        .showmainPan-title {
            margin-top: 5px;
        }
        /* .el-form-item__label {
            color: #fff;
        }
        .el-select .el-input .el-input__icon{
                transition: transform 0s;
            } */
    }
    .table-pan {
        margin: 0 60px 30px;
        .el-table th {
            cursor: pointer;
        }
        .el-table .cell {
            text-align: center;
            // 去除表格内单选框的动画效果，有bug导致表格边框闪烁
            .el-radio__inner::after {
                transition: transform 0s;
            }
        }
    }
    .condition-box {
        margin: 0 60px;
        .cms-title {
            font-weight: 700;
        }
        .cms-select {
            width: 200px;
        }
    }
}
</style>
<template>
    <div id="chooseComponents">
        <steps :active="4"></steps>
        <!-- <h2 class="text-center box-title">选择安装组件</h2> -->
        <div class="install-type-pan">
            <el-radio-group v-model="installType" @change="chooseType">
                <el-radio class="default-color" :label="0">默认安装</el-radio>
                <el-radio class="default-color" :label="1">自定义安装</el-radio>
            </el-radio-group>
        </div>
        <div class="choose-main-pan" v-show="showmainPan">
            <div class="row">
                <div class="col-sm-4">
                    <label class="showmainPan-title">选择主节点：</label>
                </div>
                <div class="col-sm-8">
                    <select class="form-control" v-model="mainServer">
                        <option v-for="(server,index) in serverList" :value="index">{{server.ip}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="table-pan">
            <el-table :data="tableData" stripe border style="width: 100%;" @header-click="headClick">
                <el-table-column prop="IP" label="IP">
                </el-table-column>
                <el-table-column prop="JDK" label="JDK">
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.jdk" disabled></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="Zookeeper">
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.zookeeper" :disabled="defaultSelect"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="Kafka">
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.kafka" :disabled="defaultSelect"></el-checkbox>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="Azkaban">
                    <template scope="scope">
                        <el-radio class="radio" v-model="azkaban" :label="scope.$index" :disabled="defaultSelect">&nbsp;</el-radio>
                    </template>
                </el-table-column> -->
                <el-table-column label="Hadoop">
                    <el-table-column label="NameNode">
                        <template scope="scope">
                            <el-radio class="radio" v-model="hadoopNameNode" :label="scope.$index" :disabled="defaultSelect">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="DataNode">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.dataNode" :disabled="defaultSelect"></el-checkbox>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="Spark">
                    <el-table-column label="Master">
                        <template scope="scope">
                            <el-radio class="radio" v-model="sparkMaster" :label="scope.$index" :disabled="defaultSelect">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="Worker">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.worker" :disabled="defaultSelect"></el-checkbox>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="NPBase">
                    <el-table-column label="HMaster">
                        <template scope="scope">
                            <el-radio class="radio" v-model="hMaster" :label="scope.$index" :disabled="defaultSelect">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="HRegion">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.hRegion" :disabled="defaultSelect"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="ES">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.es" :disabled="defaultSelect"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="Hive">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.hive" :disabled="defaultSelect"></el-checkbox>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="Opaq">
                    <el-table-column label="Opaq">
                        <template scope="scope">
                            <el-radio class="radio" v-model="opaq" :label="scope.$index" :disabled="defaultSelect">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="Mysql">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.mysql" :disabled="defaultSelect"></el-checkbox>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <form class="form-inline condition-box">
            <span class="cms-title">选择安装cms：</span>
            <div class="form-group">
                <select class="form-control cms-select" v-model="cmsSelect">
                    <option value="noSelect">不安装</option>
                    <option value="self">自定义</option>
                    <option v-for="(server,index) in serverList" :value="server.ip">{{server.ip}}</option>
                </select>
            </div>
            <div class="form-group" v-show="showCMS">
                <div class="input-group">
                    <div class="input-group-addon">主机IP</div>
                    <input type="text" class="form-control" v-model="inputIp" placeholder="请输入ip">
                </div>
            </div>
            <div class="form-group" v-show="showCMS">
                <div class="input-group">
                    <div class="input-group-addon">用户名</div>
                    <input type="text" class="form-control" v-model="inputUserName" placeholder="请输入用户名">
                </div>
            </div>
            <div class="form-group" v-show="showCMS">
                <div class="input-group">
                    <div class="input-group-addon">密码</div>
                    <input type="password" class="form-control" v-model="inputPassword" placeholder="请输入密码">
                </div>
            </div>
        </form>
        <div class="btn-pan">
            <button class="btn btn-primary btn-standard btn-back" @click="back"><span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>&nbsp;上一步</button>
            <button class="btn btn-primary btn-standard btn-next" :disabled="nextDisable" @click="next">下一步&nbsp;<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>
        </div>
        <!-- <button class="btn btn-primary btn-standard btn-next" :disabled="nextDisable" @click="next">下一步&nbsp;<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button> -->
    </div>
</template>
<script>
// import Test from './Test.vue'
import util from 'common/js/util.js';
import Steps from 'components/steps/Steps.vue';
import {
    Loading
} from 'element-ui';
export default {
    name: 'chooseComponents',
    mounted() {
        this.serverList = util.getSessionData('serverList') || [];
        // this.serverList = [{ip: '172.16.61.12'},{ip: '172.16.61.122'},{ip: '172.16.61.142'}];
        this.serverList.forEach(server => {
            this.tableData.push({
                IP: server.ip,
                jdk: true,
                zookeeper: true,
                kafka: true,
                dataNode: true,
                worker: true,
                hRegion: true,
                es: true,
                hive: true,
                mysql: true
            });
        });

        //判断之前的cms选择
        var chooseCMS = util.getSessionData('chooseCMS');
        if (!!chooseCMS) {

            if (chooseCMS.userName) { //自定义
                this.cmsSelect = 'self';
                this.inputIp = chooseCMS.ip;
                this.inputUserName = chooseCMS.userName;
                this.inputPassword = chooseCMS.password;

            } else {
                // this.cmsSelect = 'self';
                this.cmsSelect = chooseCMS.ip;
            }

        } else { //没选择
            this.cmsSelect = 'noSelect';
        }

    },
    data() {
        return {
            showCMS: false,
            cmsSelect: 'noSelect',
            inputIp: '',
            inputUserName: '',
            inputPassword: '',

            installType: 0,
            mainServer: 0, //选择的主ip
            nextDisable: false,
            showmainPan: true,
            serverList: [],
            // azkaban: 0, //单选
            opaq: 0, //单选
            hadoopNameNode: 0, //单选
            sparkMaster: 0, //单选
            hMaster: 0, //单选
            defaultSelect: true,
            tableData: []
        }

    },
    watch: {
        mainServer(newVal) {
            // this.azkaban = newVal;
            this.opaq = newVal;
            this.hadoopNameNode = newVal;
            this.sparkMaster = newVal;
            this.hMaster = newVal;
            // this.mainServer = newVal;
            console.log(newVal);
        },
        cmsSelect(newVal) {
            // console.log(newVal);
            if (newVal === 'self') {
                this.showCMS = true;
            } else {
                this.showCMS = false;
            }
        }

    },
    components: {
        Steps
    },
    methods: {
        checkAllOrCancel(type) { //多选框全选或者取消
            let allSelected = true;
            this.tableData.forEach(item => {
                if (!item[type]) {
                    allSelected = false;
                }
            });

            this.tableData.forEach(item => {
                item[type] = !allSelected;
            });

        },
        //表头点击
        headClick(column, event) {
            // console.log(column); 

            //默认安装禁用全选               
            if (this.showmainPan) {
                return;
            }

            if (column.label === 'Zookeeper') {
                this.checkAllOrCancel('zookeeper');
            } else if (column.label === 'Kafka') {
                this.checkAllOrCancel('kafka');
            } else if (column.label === 'Mysql') {
                this.checkAllOrCancel('mysql');
            } else if (column.label === 'DataNode') {
                this.checkAllOrCancel('dataNode');
            } else if (column.label === 'Worker') {
                this.checkAllOrCancel('worker');
            } else if (column.label === 'HRegion') {
                this.checkAllOrCancel('hRegion');
            } else if (column.label === 'ES') {
                this.checkAllOrCancel('es');
            } else if (column.label === 'Hive') {
                this.checkAllOrCancel('hive');
            }

        },
        chooseType(value) {
            if (value === 1) {
                this.showmainPan = false;
                this.defaultSelect = false;
            } else {
                this.tableData.forEach(data => {
                    data.jdk = true;
                    data.zookeeper = true;
                    data.kafka = true;
                    data.dataNode = true;
                    data.worker = true;
                    data.hRegion = true;
                    data.es = true;
                    data.hive = true;
                    data.mysql = true;
                });
                this.mainServer = 0;
                this.opaq = 0; //单选
                this.hadoopNameNode = 0; //单选
                this.sparkMaster = 0; //单选
                this.hMaster = 0; //单选

                this.showmainPan = true;
                this.defaultSelect = true;
            }
        },

        //保存哪些组件选择了
        saveChooseComponents() {
            let zookeeperOK = false;
            let kafkaOK = false;
            let esOK = false;
            let hiveOK = false;

            let chooseComponents = ['JDK', 'Hadoop', 'Spark', 'NPBase', 'Opaq'];
            this.tableData.forEach(data => {
                if (data.zookeeper) {
                    zookeeperOK = zookeeperOK || true;
                }

                if (data.kafka) {
                    kafkaOK = kafkaOK || true;
                }

                if (data.es) {
                    esOK = esOK || true;
                }

                if (data.hive) {
                    hiveOK = hiveOK || true;
                }
            });

            if (zookeeperOK) {
                chooseComponents.push('Zookeeper');
            }
            if (kafkaOK) {
                chooseComponents.push('Kafka');
            }
            if (esOK) {
                chooseComponents.push('ES');
            }
            if (hiveOK) {
                chooseComponents.push('Hive');
            }

            util.setSessionData('chooseComponents', chooseComponents);

            //判断cms安装
            if (this.cmsSelect === 'noSelect') {
                util.setSessionData('chooseCMS', null);
            } else if (this.cmsSelect === 'self') {
                util.setSessionData('chooseCMS', {
                    ip: this.inputIp,
                    userName: this.inputUserName,
                    password: this.inputPassword
                });
            } else {
                util.setSessionData('chooseCMS', {
                    ip: this.cmsSelect
                });
            }

        },
        back() {
            // this.defaultSelect = !this.defaultSelect;
            this.$router.replace('/setNTP');
        },
        next() {

            let selectMysql = false;
            this.tableData.forEach(data => {
                if (data.mysql) {
                    selectMysql = selectMysql || true;
                }
            });

            if (!selectMysql) {
                this.$message({
                    message: '至少选择一个mysql！',
                    type: 'warning'
                });
                return;
            }

            this.saveChooseComponents();
            // 保存选择的组件           

            let jsonData = [];
            this.tableData.forEach((data, index) => {

                let obj = {
                    ip: data.IP,
                    JDK: data.jdk,
                    Zookeeper: data.zookeeper,
                    Kafka: data.kafka,
                    DataNode: data.dataNode,
                    Worker: data.worker,
                    HRegion: data.hRegion,
                    ES: data.es,
                    Hive: data.hive,
                    Mysql: data.mysql,
                    // Azkaban: false,
                    Opaq: false,
                    NameNode: false,
                    SMaster: false,
                    HMaster: false,

                    NPBase: true,
                    Hadoop: true,
                    Spark: true

                };

                // obj.Azkaban = this.azkaban === index ? true : false;
                obj.Opaq = this.opaq === index ? true : false;
                obj.NameNode = this.hadoopNameNode === index ? true : false;
                obj.SMaster = this.sparkMaster === index ? true : false;
                obj.HMaster = this.hMaster === index ? true : false;

                jsonData.push(obj);
                // jsonData[obj.ip] = obj;                    

            });
            // console.log(jsonData);
            var loadingInstance = Loading.service({
                fullscreen: true,
                text: '保存配置中,请勿刷新页面...'
            });

            AJAX.save({
                type: 'install',
                jsonstr: JSON.stringify(jsonData)
            }).then(res => {
                loadingInstance.close();
                if (res.body.status === 'success') {
                    this.$router.replace('/installComponents');
                } else {
                    this.$message({
                        message: res.body.status,
                        type: 'warning'
                    });
                }
            }, res => {
                loadingInstance.close();
            });
        }

    }
}
</script>
