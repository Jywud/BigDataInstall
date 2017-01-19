import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'components/Login.vue'
import AddServers from 'components/AddServers.vue'
import SetNTP from 'components/SetNTP.vue'
import ChooseComponents from 'components/ChooseComponents.vue'
import InstallComponents from 'components/InstallComponents.vue'
// import Test from './components/Test.vue'

Vue.use(VueRouter);
const routes = [
    { path: '/', component: Login }, {
        path: '/login',
        component: Login
        /*,children: [{
            path: '',
            component: Test
        }]*/
    },
    { path: '/addServers', component: AddServers },
    { path: '/setNTP', component: SetNTP },
    { path: '/chooseComponents', component: ChooseComponents },
    { path: '/installComponents', component: InstallComponents }
];

export default new VueRouter({
    routes
});
