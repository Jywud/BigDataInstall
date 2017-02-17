const SERVERS = 'serverList';

 function isNull (str) {
	if (str == "")
		return true;
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	return re.test(str);
}
export default{
	IP: /^((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}$/,
	isIP (strIP) {
		if (isNull(strIP))
			return false;
		var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g // 匹配IP地址的正则表达式
		if (re.test(strIP)) {
			if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256
					&& RegExp.$4 < 256)
				return true;
		}
		return false;
	},
	isIPs (strIP) {
		if (isNull(strIP))
			return false;
		var re = /^(\d+)\.(\d+)\.(\d+)\.\[(\d+)\-(\d+)\]$/g // 匹配IP地址的正则表达式
		if (re.test(strIP)) {
			if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256
					&& RegExp.$4 < 256 && RegExp.$5 < 256 && RegExp.$4 < RegExp.$5)
				return true;
		}
		return false;
	},
	saveServers (list){
		sessionStorage.setItem(SERVERS, JSON.stringify(list));
	},
	getServers (){
		return JSON.parse(sessionStorage.getItem(SERVERS) || '[]');
	}
}