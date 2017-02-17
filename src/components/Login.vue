<template>
    <div id="login">        
        <div class="content">
            <div class="title-box mb10">
                <h1 class="word title">大数据安装管理平台</h1>
                <h4 class="word">Big data installation management platform</h4>
            </div>
            <div class="login-input mb10 ml40">
                <img src="/static/image/user.png" class="input-icon png_bg">
                <input type="text" placeholder="请输入用户名" v-model="userName">
            </div>
            <div class="login-input mb10 ml40">
                <img src="/static/image/pwd.png" class="input-icon png_bg">
                <input type="password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="mb10 ml40">
                <el-checkbox v-model="remember"></el-checkbox>
                <span>记住用户名</span>
            </div>
            <div class="ml40">
                <input type="button" class="btn btn-success btn-block btn-login" value="登录" @click="login">
            </div>
        </div>
        <router-view></router-view>
        <!-- <h1 class="word title mt200">大数据安装管理平台</h1>
        <h4 class="word">Big data installation management platform</h4>
        <router-link to="/addServers" class="btn btn-primary btn-install" replace>开始安装</router-link>
        <router-view></router-view>        
        <button class="btn btn-primary btn-install" @click="install">开始安装</button> -->
    </div>
</template>
<style lang="less">
#login {
    position: absolute;
    width: 100%;
    height: 100%;
    .content{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -189px;
        margin-top: -200px;
        .title-box{
            margin-bottom: 60px;
            .title {
                font-size: 42px;
            }
            .word {
                color: #222;
                text-align: center;
            }
        }
        
        .login-input {
            position: relative;
            border: 1px solid #dbdbdb;
            background-color: #fff;
            padding: 12px 5px 12px 50px;
            width: 284px;
            .input-icon {
                position: absolute;
                left: 10px;
                top: 10px;
            }
            input {
                border: 0;
                width: 100%;
                height: 20px;
            }
        }
        .remember-text{
            color: #fff;
        }
        .btn-login{
            width: 284px;
            height: 45px;
        }
        
    }
    

    /* .title {
        font-size: 42px;
    }
    .word {
        color: #fff;
        text-align: center;
    }
    .login-btn {
        color: #fff;
    }
    .btn-install {
        position: absolute;
        padding: 10px 40px;
        bottom: 120px;
        left: 50%;
        margin-left: -69px;
        background-color: #2A4DB0;
    } */
}
</style>
<script>
import Service from '../service.js'
// import {bus} from 'common/js/bus.js'
// import { Loading } from 'element-ui';
export default {
    name: 'login',
    mounted() {
        /*bus.$on('changeName', data => {
            this.userName = data;
            // console.log(data);
        });*/
        /*this.$nextTick(function() {  
            // console.log(echarts);
            var myChart = echarts.init(document.getElementById('echarts'));
            var option = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '60%',
                        data:[10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            };
            myChart.setOption(option);

        });*/
    },
	data (){
		return {
            remember: false,
			userName: '',
            password: ''
		}
	},   
    watch: {
        // changeName
    }, 
    methods: {        
        login() {
        	/*var loadingInstance1 = Loading.service({ fullscreen: true , text: '加载中..'});

        	setTimeout(function() {
        		loadingInstance1.close();
        	}, 5000);*/
            /*Service.postTest({name: 'woshi'}).then(function(data) {
            	console.log(data);
            }, function() {

            });*/
            if(this.userName === '' || this.password === '') {
                this.$message({
                  message: '用户名或密码为空',
                  type: 'warning'
                });
                return;
            }

            this.$router.replace('/addServers');
        }
    }
}
</script>
