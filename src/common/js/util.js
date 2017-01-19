const SERVERS = 'serverList';
export default{
	IP: /^((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}$/,
	saveServers (list){
		sessionStorage.setItem(SERVERS, JSON.stringify(list));
	},
	getServers (){
		return JSON.parse(sessionStorage.getItem(SERVERS) || '[]');
	}
}