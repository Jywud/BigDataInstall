import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'

// import store from './store'

//暂时不用jquery
// import $ from 'jquery'
// import 'lib/bootstrap/js/bootstrap.min'
// import 'lib/layer/layer.js'
// import 'lib/layer/skin/default/layer.css'

//加载第三方组件
import ElementUI from 'element-ui'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
// import commonCMP from 'common/js/commonCMP.js'
import router from './router.js'
import './service.js'
import util from 'common/js/util.js';

Vue.use(VueResource);
Vue.use(ElementUI);

// commonCMP.addElementUI();
Vue.http.options.emulateJSON = true; //请求content-type为application/x-www-form-urlencoded
//不要换代码位置
import 'common/less/base.less'

//请求拦截器
Vue.http.interceptors.push(function(request, next) {
    // 请求发送前的处理逻辑
    next(function(response) {
        // 请求发送后的处理逻辑
        // 根据请求的状态，response参数会返回给successCallback或errorCallback     
        // debugger     
        //判断是否超时
        if (response.body.status === 'user_logout') {
            Message.warning("登陆超时，请重新登录！");
            router.replace('/login');
        } else {
            return response
        }

    });
});

router.beforeEach((to, from, next) => {
    // console.log('--main--beforeEach--');
    var userinfo = util.getSessionData('userInfo');

    // console.log('--beforeEach--to--' + to.fullPath + '--from--' + from.fullPath);
    if (to.fullPath === '/login' || to.fullPath === '/authorize') {
        next();
    } else {
        // console.log('--main-else--');
        if (userinfo.message !== '登陆成功') { //未登录
            next('/login');
        } else {
            next();
        }
    }

});

/*Vue.filter('myFilter', function (value) {
    return value + '!!!!';
})*/

new Vue({
    el: '#app',
    router: router,
    // methods: service,
    // store: store,
    template: '<App/>',
    components: { App }
})
