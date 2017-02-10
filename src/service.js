import Vue from 'vue'

const host = '127.0.0.1:80';

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

export default{
	// 网络监测
	isPing (){
		return Vue.http.get('/npbd/isPing');
	},
	postTest (req){
		return Vue.http.post('/npbd/add', req);
	},
	// 用户名密码检测
	checkNameAndPwd (req){
		return Vue.http.post('/check', req);
	},
	// 添加节点
	addServer (req){
		return Vue.http.post('/add', req);
	},
	// 编辑节点
	ediServert (req){
		return Vue.http.post('/edit', req);
	},
	// 获取节点列表
	getServerList (req){
		return Vue.http.get('/list');
	},
	// 删除节点
	deleteServer (req){
		return Vue.http.post('/delete', req);
	},
	// 配置节点免密码登录
	config (req){
		return Vue.http.get('/edit', config);
	},
	// 设置时间服务器
	setNTP (req){
		return Vue.http.post('/time', req);
	}

}