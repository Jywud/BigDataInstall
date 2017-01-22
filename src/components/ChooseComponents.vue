<style lang="scss">
#chooseComponents {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    .btn-next {
        position: absolute;
        left: 50%;
        bottom: 60px;
        background-color: #2A4DB0;
        padding: 10px 40px;
        margin-left: -62px;
    }
    .default-color {
        color: #fff;
    }
    .install-type-pan {
        margin: 60px auto;
        width: 200px;
        text-align: center;
    }
    .choose-main-pan {
        width: 330px;
        margin: 0 auto 40px;
        .showmainPan-title{
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
        padding: 0 60px;
        .el-table .cell {
            text-align: center;

            // 去除表格内单选框的动画效果，有bug导致表格边框闪烁
            .el-radio__inner::after{
				transition: transform 0s;
		    }

        }

    }
    
}
</style>
<template>
    <div id="chooseComponents">
        <h2 class="text-center box-title">选择安装组件</h2>
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
                      <option v-for="server in serverList" :value="server.ip">{{server.ip}}</option>              
                    </select>
                </div>
            </div>        
            <!-- <el-form ref="form">
                <el-form-item label="选择主节点：">
                    <el-select v-model="mainServer">
                        <el-option v-for="server in serverList" :label="server.ip" :value="server.ip"></el-option>
                    </el-select>
                </el-form-item>
            </el-form> -->
        </div>
        <div class="table-pan">
            <el-table :data="tableData" stripe border style="width: 100%;">
                <el-table-column prop="IP" label="IP">
                </el-table-column>
                <el-table-column prop="JDK" label="JDK">
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.jdk"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="Zookeeper">
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.zookeeper"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="Kafka">
                    <template scope="scope">
                        <el-checkbox v-model="scope.row.kafka"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="Azkaban">
                	<template scope="scope">      
                        <el-radio class="radio" v-model="azkaban" :label="scope.$index">&nbsp;</el-radio>                        
                    </template>
                </el-table-column>
                <el-table-column label="Hadoop">
                    <el-table-column label="NameNode">
                    	<template scope="scope">
                        	<el-radio class="radio" v-model="hadoopNameNode" :label="scope.$index">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="DataNode">
                    	<template scope="scope">
                    		<el-checkbox></el-checkbox>
                    	</template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="Spark">
                    <el-table-column label="Master">
                    	<template scope="scope">
                        	<el-radio class="radio" v-model="sparkMaster" :label="scope.$index">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="Worker">
                    	<template scope="scope">
                    		<el-checkbox></el-checkbox>
                    	</template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="NPBase">
                    <el-table-column label="HMaster">
                    	<template scope="scope">
                        	<el-radio class="radio" v-model="sparkHMaster" :label="scope.$index">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="HRegion">
                    	<template scope="scope">
                    		<el-checkbox></el-checkbox>
                    	</template>
                    </el-table-column>
                    <el-table-column label="ES">
                    	<template scope="scope">
                    		<el-checkbox></el-checkbox>
                    	</template>
                    </el-table-column>
                    <el-table-column label="Hive">
                    	<template scope="scope">
                    		<el-checkbox></el-checkbox>
                    	</template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <button class="btn btn-primary btn-next" :disabled="nextDisable" @click="next">下一步</button>
    </div>
</template>
<script>
// import Test from './Test.vue'
export default {
    /*components: {
    	'test': Test
    },*/
    name: 'chooseComponents',
    data() {
            return {
                name: 'xiaoxin',
                installType: 0,
                mainServer: '',
                nextDisable: false,
                showmainPan: true,
                serverList: this.$root.serverList || [],
                azkaban: 0,//单选
                hadoopNameNode: 0,//单选
                sparkMaster: 0,//单选
                sparkHMaster: 0,//单选
                tableData: [{
                        IP: '122.122.121.1',
                        jdk: false,
                        zookeeper: true,
                        kafka: true,
                        azkaban: true

                    }, {
                        IP: '122.122.121.2',
                        jdk: true,
                        zookeeper: true,
                        kafka: true,
                        azkaban: false
                    }, {
                        IP: '122.122.121.3',
                        jdk: true,
                        zookeeper: true,
                        kafka: true,
                        azkaban: false
                    }

                ]
            }

        },
        /*created: {

        },*/
        methods: {
            chooseType(value) {
                this.showmainPan = value === 1 ? false : true;
            },
            next() {
            	this.$router.replace('/installComponents');
            	console.log(this.tableData + '-------' + this.azkaban);
            }
        },
        watch: {
            mainServer(newVal) {
                this.mainServer = newVal;
                // alert(newVal)
            },
            azkaban (newData, oldData){
            	// alert(newData);
            }
        }
}
</script>
