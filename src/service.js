import Vue from 'vue'

// const host = '127.0.0.1:80';

/*//请求拦截器
 var interceptors = function() {
 Vue.http.interceptors.push(function(request, next) {
 // 请求发送前的处理逻辑
 next(function(response) {
 // 请求发送后的处理逻辑
 // 根据请求的状态，response参数会返回给successCallback或errorCallback
 return response
 });
 });
 };*/


window.AJAX = {
  //持久化安装信息存放目录
  init() {
    return Vue.http.get('/npcloud-manager-1.0/npcloud/init');
  },
  //节点信息检查
  check(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/check', req);
  },
  //安装完成信息
  complete(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/complete', req);
  },
  /*//文件下载
   download(req) {
   return Vue.http.post('/npcloud-manager-1.0/npcloud/download', req);
   },
   //文件上传
   fileupload(req) {
   return Vue.http.post('/npcloud-manager-1.0/npcloud/fileUpload', req);
   },*/
  //安装组件
  install(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/install', req);
  },
  //日志接口
  logs(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/logs', req);
  },
  //安装进度
  progress(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/progress', req);
  },
  //免密等。。。
  add(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/add', req);
  },
  //保存节点
  save(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/save', req);
  },
  //安装开始
  start(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/start', req);
  },
  //安装停止
  stop(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/stop', req);
  },
  //监控安装信息状态
  sysmonitor(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/sysmonitor', req);
  },
  //设置license
  sys(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/sys', req);
  },
  //登录
  login(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/login', req);
  },
  //注销
  logout(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/logout', req);
  },
  //是否登录
  islogin(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/islogin', req);
  },
  //获取用户列表
  getUsers() {
    return Vue.http.get('/npcloud-manager-1.0/npcloud/getUsers');
  },
  //添加用户
  userAdd(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/userAdd', req);
  },
  //修改密码
  changePasswd(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/changePasswd', req);
  },
  //删除用户
  userDelete(req) {
    return Vue.http.post('/npcloud-manager-1.0/npcloud/userDelete', req);
  },

  //cms
  getServerInfo() {
    return Vue.http.get('/cms/service/all');
  },
  remove(req) {
    return Vue.http.post('/cms/service/remove', req);
  },
  register(req) {
    return Vue.http.post('/cms/service/register', req);
  },
  //获取所有cpu的使用信息
  getCPUData(){
    return Vue.http.get('/npcloud-manager-1.0/npcloud  /getCPUData')
  },
  //获取服务器磁盘信息
  getDiskData(){
    return Vue.http.get('/npcloud-manager-1.0/npcloud/getDiskData')
  },
  //获取服务器内存信息
  getMemoryData(){
    return Vue.http.get('/npcloud-manager-1.0/npcloud/getMemoryData')
  },
  //获取服务器網絡信息
  getNetWorkData(){
    return Vue.http.get('/npcloud-manager-1.0/npcloud/getNetWorkData')

  },
  //获取单个服务器网络信息
  getNetWorkDataByIp(req){
    return Vue.http.post('/npcloud-manager-1.0/npcloud/getNetWorkDataByIp',req)
  },
  //获取组件监控信息
  sysMonitor(req){
    return Vue.http.post('/npcloud-manager-1.0/npcloud/sysMonitor',req)
  },
  //获取组件重启
  restartAss(req){
    return Vue.http.post('/npcloud-manager-1.0/npcloud/restart',req)
  },
  //获取组件名称
  sysMonitorInit(){
    return Vue.http.post('/npcloud-manager-1.0/npcloud/sysMonitorInit')
  }
}
