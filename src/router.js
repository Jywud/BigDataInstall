import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import AddServers from './components/AddServers.vue'
import SetNTP from './components/SetNTP.vue'
import ChooseComponents from './components/ChooseComponents.vue'

Vue.use(VueRouter);
const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/addServers', component: AddServers },
    { path: '/setNTP', component: SetNTP },
    { path: '/chooseComponents', component: ChooseComponents }
];

export default new VueRouter({
    routes
});
