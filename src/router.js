import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorize from 'components/Authorize.vue'
import Login from 'components/Login.vue'
import AddServers from 'components/AddServers.vue'
import ConfigNoPwd from 'components/ConfigNoPwd.vue'
import ConfigHost from 'components/ConfigHost.vue'
import SetNTP from 'components/SetNTP.vue'
import ChooseComponents from 'components/ChooseComponents.vue'
import InstallComponents from 'components/InstallComponents.vue'
import StartComponents from 'components/StartComponents.vue'
import InstallApplication from 'components/InstallApplication.vue'

//监控
import Monitor from 'components/monitor/Monitor.vue'
import Assembly from 'components/monitor/Assembly.vue'
import Server from 'components/monitor/Server.vue'
import Platform from 'components/monitor/Platform.vue'
import CpuServer from 'components/monitor/CpuServer.vue'
import NetServer from 'components/monitor/NetServer.vue'
import DiskServer from 'components/monitor/DiskServer.vue'
import MemoryServer from 'components/monitor/MemoryServer.vue'

import Serverinfo from 'components/monitor/Serverinfo.vue'
import ServerInfoQuery from 'components/monitor/ServerInfoQuery.vue'
import ServerInfoModify from 'components/monitor/ServerInfoModify.vue'
import BaseService from 'components/monitor/BaseService.vue'
import BusinessService from 'components/monitor/BusinessService.vue'
import OtherService from 'components/monitor/OtherService.vue'

// import Test from 'components/Test.vue'

Vue.use(VueRouter);
const routes = [
    { path: '/', redirect: '/login' }, {
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
    { path: '/chooseComponents', component: ChooseComponents },
    { path: '/installComponents', component: InstallComponents },
    { path: '/startComponents', component: StartComponents },
    { path: '/installApplication', component: InstallApplication },
    {
        path: '/monitor',
        component: Monitor,
        children: [{
            path: 'assembly',
            component: Assembly
        }, {
            path: 'server',
            component: Server,
            children: [{
                path: 'cpuServer',
                component: CpuServer
            }, {
                path: 'netServer',
                component: NetServer
            }, {
                path: 'diskServer',
                component: DiskServer
            }, {
                path: 'memoryServer',
                component: MemoryServer
            }]
        }, {
            path: 'platform',
            component: Platform
        }, {
            path: 'serverinfo',
            component: Serverinfo,
            children: [
                { path: 'query', component: ServerInfoQuery },
                { path: 'modify', component: ServerInfoModify },
                { path: 'baseService', component: BaseService },
                { path: 'businessService', component: BusinessService },
                { path: 'otherService', component: OtherService }
            ]
        }]
    }

];

export default new VueRouter({
    routes
});
