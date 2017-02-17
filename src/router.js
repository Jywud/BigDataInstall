import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorize from 'components/Authorize.vue'
import Login from 'components/Login.vue'
import AddServers from 'components/AddServers.vue'
import ConfigNoPwd from 'components/ConfigNoPwd.vue'
import ConfigHost from 'components/ConfigHost.vue'
import SetNTP from 'components/SetNTP.vue'
// import SetNTPNew from 'components/SetNTPNew.vue'
import ChooseComponents from 'components/ChooseComponents.vue'
import InstallComponents from 'components/InstallComponents.vue'
import StartComponents from 'components/StartComponents.vue'
import InstallApplication from 'components/InstallApplication.vue'

//监控
import Monitor from 'components/monitor/Monitor.vue'
import Assembly from 'components/monitor/Assembly.vue'
import Server from 'components/monitor/Server.vue'
import Platform from 'components/monitor/Platform.vue'

// import Test from 'components/Test.vue'

Vue.use(VueRouter);
const routes = [
    { path: '/', component: Login }, {
        path: '/login',
        component: Login
            /*,children: [{
                path: 'test',
                component: Test
            }]*/
    },
    { path: '/authorize', component: Authorize },
    { path: '/addServers', component: AddServers },
    { path: '/configNoPwd', component: ConfigNoPwd },
    { path: '/configHost', component: ConfigHost },
    { path: '/setNTP', component: SetNTP },
    // { path: '/setNTPNew', component: SetNTPNew },
    { path: '/chooseComponents', component: ChooseComponents },
    { path: '/installComponents', component: InstallComponents },
    { path: '/startComponents', component: StartComponents },
    { path: '/installApplication', component: InstallApplication },

    {
        path: '/monitor',
        component: Monitor,
        children: [{
            path: '',
            component: Assembly
        }, {
            path: '/monitor/server',
            component: Server
        }, {
            path: '/monitor/platform',
            component: Platform
        }]
    }

];

export default new VueRouter({
    routes
});
