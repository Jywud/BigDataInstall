<template>
    <div id="configNoPwd">
        <steps :active="1"></steps>
        <!-- <h2 class="text-center box-title">配置免密码登录</h2> -->
        <div class="content-pan clearfix">
            <div class="content" v-for="item in serverList">
                <p class="text-center content-title">{{item.ip}}</p>
                <el-progress class="comp-progress" type="circle" :status="item.status" :percentage="item.percentage"></el-progress>
            </div>
        </div>
        <div class="btn-pan">
            <button class="btn btn-primary btn-back" @click="back">上一步</button>
            <button class="btn btn-primary btn-next" icon="search" @click="next">执行</button>
        </div>
    </div>
</template>
<style lang="scss">
#configNoPwd {
    position: absolute;
    width: 100%;
    height: 100%;
    .content-pan {
        width: 1050px;
        margin: 50px auto;
        .content {
            position: relative;
            width: 200px;
            height: 200px;
            border-radius: 10px;
            box-shadow: 2px 2px 10px 1px #888;
            background-color: #ccc;
            float: left;
            border: 1px solid #aa3;
            padding: 10px 38px;
            margin-bottom: 10px;
            margin-right: 10px;
            text-align: center;
            .content-title {
                font-weight: 800;
                color: #222;
            }
            .comp-progress {
                margin-bottom: 20px;
            }
        }
    }
    .btn-pan {
        position: absolute;
        bottom: 60px;
        left: 50%;
        margin-left: -126px;
        .btn-back {
            background-color: #2A4DB0;
            padding: 10px 40px;
        }
        .btn-next {
            background-color: #2A4DB0;
            padding: 10px 40px;
        }
    }
}
</style>
<script>
// import Service from '../service.js'
import { Loading } from 'element-ui';
import Steps from 'components/steps/Steps.vue';
export default {
        name: 'configNoPwd',
        mounted() {
            this.serverList = this.$root.serverList || [];
            this.serverList.forEach(function(item) {
                item.percentage = 0;
                item.status = '';
            });
        },
        data() {
            return {
                serverList: []
            }
        },
        components: {Steps},
        methods: {
            back() {
                this.$router.replace('/addServers');
            },
            next() {
                var loadingInstance = Loading.service({
                    fullscreen: true,
                    text: '配置中...'
                });

                setTimeout(() => {
                    loadingInstance.close();
                    this.$router.replace('/setNTP');
                }, 3000)

            }
        }
}
</script>
