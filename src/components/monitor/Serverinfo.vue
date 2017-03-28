<template>
    <div id="serverInfo">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <!--<el-tab-pane label="查看" name="select"></el-tab-pane>-->
            <!--<el-tab-pane label="增删改" name="modify"></el-tab-pane>-->
            <el-tab-pane label="基础服务" name="baseService"></el-tab-pane>
            <el-tab-pane label="业务服务" name="businessService"></el-tab-pane>
            <!--<el-tab-pane label="其他服务" name="modify"></el-tab-pane>-->
        </el-tabs>
        <router-view></router-view>
        <!-- <div class="tree-pan">
            <el-tree class="info-tree" :data="treeData" :props="defaultProps" default-expand-all ref="dataTree" @node-click="handleNodeClick">
            </el-tree>
        </div>
        <div class="detail-pan">
            <ul>
                <li></li>
            </ul>
        </div> -->
    </div>
</template>
<style lang="less">
#serverInfo {
    margin-top: 66px;
    .el-tabs__active-bar {
        margin-left: 240px;
    }
    .el-tabs__header {
        padding-left: 240px;
    }
    /* padding-top: 50px;
    position: absolute;
    width: 100%;
    height: 100%;
    .tree-pan {
        position: absolute;
        width: 400px;
        height: 100%;
        .info-tree {
            // padding-left: 20px;
            height: 100%;
        }
    }
    .detail-pan {
        // width: 400px;
        height: 100%;
        margin-left: 450px;
        // background: red;
    } */
}
</style>
<script>
export default {
    mounted() {
            this.$router.replace('/monitor/serverinfo/baseService');
            /*console.log(111)
            AJAX.getServerInfo().then(res => {
                if (res.body.code == 200) {
                    var resData = res.body.map;
                    resData.basisServer.forEach(data => {
                        this.treeData[0]['children'].push(data);
                    });

                    resData.businessServer.forEach(data => {

                        var children2 = [];
                        data.businessList.forEach(data2 => {
                            children2.push({
                                name: data2.name
                            });
                        });

                        this.treeData[1]['children'].push({
                            name: data.name,
                            children: children2
                        });
                    });

                }
            }, res => {
                this.$message({
                    message: '系统异常',
                    type: 'warning'
                });
            });*/
        },
        data() {
            return {
                activeName: 'baseService',
                detailInfo: '',
                treeData: [{
                    name: 'basisServer',
                    children: []
                }, {
                    name: 'businessServer',
                    children: []
                }],

                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        methods: {
            handleClick() {
                if (this.activeName === 'baseService') {
                    this.$router.replace('/monitor/serverinfo/baseService');
                } else if(this.activeName ==='businessService') {
                    this.$router.replace('/monitor/serverinfo/businessService');
                }else{
                  this.$router.replace('/monitor/serverinfo/otherService');
                }
            }
            /*handleNodeClick(data) {
                //不是叶子节点
                if (!!data.children) {
                    return;
                }

            }*/
        }
};
</script>
