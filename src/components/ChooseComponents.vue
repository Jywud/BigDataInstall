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
        width: 190px;
    }
    .choose-main-pan {
        width: 300px;
        margin: 0 auto;
        .el-form-item__label {
            color: #fff;
        }
    }
    .table-pan {
        padding: 0 60px;
        .el-table .cell {
            text-align: center;
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
            <el-form ref="form" label-width="120px">
                <el-form-item label="选择主节点：">
                    <el-select v-model="mainServer">
                        <el-option v-for="server in serverList" :label="server.ip" :value="server.ip"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
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
                        	<el-radio></el-radio>
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
                        	<el-radio></el-radio>
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
                        	<el-radio></el-radio>
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
    data() {
            return {
                name: 'xiaoxin',
                installType: 0,
                mainServer: '',
                nextDisable: true,
                showmainPan: true,
                serverList: this.$root.serverList || [],
                azkaban: 0,
                tableData: [{
                        IP: '122.122.121.1',
                        jdk: true,
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
