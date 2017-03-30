<template>
    <div id="login">
        <div class="content">
            <!-- <test :list="listArr"></test> -->
            <div class="title-box mb10">
                <h1 class="word title">大数据基础管理平台</h1>
                <h4 class="word">Big data base management platform</h4>
            </div>
            <div class="login-input mb10 ml40">
                <img src="/static/image/user.png" class="input-icon png_bg">
                <input type="text" placeholder="请输入用户名" v-model="userName">
            </div>
            <div class="login-input mb10 ml40">
                <img src="/static/image/pwd.png" class="input-icon png_bg">
                <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
            </div>
            <div class="mb10 ml40">
                <el-checkbox v-model="remember"></el-checkbox>
                <span>记住用户名</span>
            </div>
            <div class="ml40">
                <input type="button" class="btn btn-success btn-block btn-login" value="登 录" @click="login">
            </div>
        </div>
        <div class="login-footer">
            <img class="footer-img" src="/static/image/foot.png">
        </div>
        <!-- <router-view></router-view> -->
    </div>
</template>
<style lang="less">
#login {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('/static/image/install_bg.jpg');
    .content {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -189px;
        margin-top: -220px;
        .title-box {
            margin-bottom: 60px;
            text-shadow: 3px 2px 2px #eee;
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
        .remember-text {
            color: #fff;
        }
        .btn-login {
            width: 284px;
            height: 45px;
        }
    }
    .login-footer {
        width: 100%;
        height: 60px;
        background-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        left: 0;
        bottom: 0;
        .footer-img {
            position: absolute;
            left: 50%;
            margin: 15px 0 0 -226px;
        }
    }
}
</style>
<script>
// import Service from '../service.js'
// import {bus} from 'common/js/bus.js'
import { Loading } from 'element-ui';
// import Test from 'components/Test.vue'
import util from 'common/js/util.js';
export default {
    name: 'login',
    // components: {Test},
    beforeRouteEnter(to, from, next) {
        // console.log('--login-beforeRouteEnter-');
        // next();
        // 授权认证
        AJAX.sys({
            type: 'testUse'
        }).then(data => {
            // console.log('license_status' + data.body.license_status);
            if (data.body.license_status === 'success') {
                var loadingInstance = Loading.service({
                    fullscreen: true,
                    text: '初始化,请勿刷新页面...'
                });

                AJAX.init().then(res => {
                    loadingInstance.close();
                }, res => {
                    loadingInstance.close();
                });

                next();

                util.setSessionData('maxNodes', data.body.maxnodes);
            } else {
                next(vm => {
                    vm.$message({
                        message: data.body.license_status,
                        type: 'warning'
                    });
                    vm.$router.replace('/authorize');
                });
            }
        }, data => {
            next(vm => {
                vm.$router.replace('/authorize');
            });
        });

    },
    mounted() {
        let userName = localStorage.getItem('userName') || '';
        this.userName = userName;
        this.remember = !!userName;
        /*bus.$on('changeName', data => {
            this.userName = data;
            // console.log(data);
        });*/
    },
    data() {
        return {
            // listArr: [{name:'xiaomin'},{name: 'xiaohong'}],
            remember: false,
            userName: '',
            password: ''
        }
    },
    watch: {
        //判断记住用户名
        remember(data) {
            if (data) {
                localStorage.setItem('userName', this.userName);
            } else {
                localStorage.setItem('userName', '');
            }
        }
    },
    methods: {
        login() {
            // this.listArr.push({name: 'dindin'});
            /*var loadingInstance1 = Loading.service({ fullscreen: true , text: '加载中..'});

            setTimeout(function() {
                loadingInstance1.close();
            }, 5000);*/
            /*Service.postTest({name: 'woshi'}).then(function(data) {
                console.log(data);
            }, function() {

            });*/

            if (this.userName === '' || this.password === '') {
                this.$message({
                    message: '用户名或密码不能为空',
                    type: 'warning'
                });
                return;
            }

            let req = {
                name: this.userName,
                password: this.password,
                type: 'allModal'
            };
            AJAX.login(req).then(res => {
                let data = res.body;
                if (data.status === 'success' && data.install === 'fail') {
                    util.setSessionData('userInfo', data);
                    this.$router.replace('/addServers');

                } else if (data.status === 'success' && data.install === 'success') {
                    util.setSessionData('userInfo', data);
                    this.$router.replace('/monitor/assembly');

                } else {

                    this.$message({
                        message: data.message,
                        type: 'warning'
                    });
                }
            }, res => {
                this.$message({
                    message: '系统异常',
                    type: 'warning'
                });
            });


            // this.$router.replace('/addServers');
        }
    }
}
</script>
