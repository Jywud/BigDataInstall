<template>
    <div id="login">
        
        <h1 class="word title mt200">大数据安装管理平台</h1>
        <h4 class="word">Big data installation management platform</h4>
        <!-- <router-link to="/addServers" class="btn btn-primary btn-install" replace>开始安装</router-link> -->
        <!-- <router-view></router-view> -->        
        <button class="btn btn-primary btn-install" @click="install">开始安装</button>
    </div>
</template>
<style lang="scss">
#login {
    position: absolute;
    width: 100%;
    height: 100%;
    .title {
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
    }
}
</style>
<script>
// import Service from '../service.js'
// import { Loading } from 'element-ui';
export default {
    name: 'login',
	data (){
		return {
			
		}
	},    
    methods: {
        install() {
        	/*var loadingInstance1 = Loading.service({ fullscreen: true , text: '加载中..'});

        	setTimeout(function() {
        		loadingInstance1.close();
        	}, 5000);*/
            /*Service.isPing({ip: '10.0.0.6'}).then(function(data) {
            	console.log(data);
            }, function() {

            });*/
            this.$router.replace('/addServers');
        }
    }
}
</script>
