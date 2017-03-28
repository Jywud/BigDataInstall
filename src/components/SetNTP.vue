<style lang="less"> 
	#setNTP{
		.sub-title{
			margin: 40px;
			color: #5BC0DE;
		}
		.list-title{
			font-size: 15px;
			font-weight: bold;
			margin-left: 100px;
		}
		position: absolute;
		width: 100%;
		height: 100%;
		.selectPan{
			// width: 730px;
			margin: 60px 0 50px 100px;
			.selfTitle{
				margin-top: 4px;
				color: #000;
				font-size: 15px;
			}
			.error-text{
				margin-top: 4px;
				color: red;
			}
			.btn-setting{
				margin-right: 10px;
				padding: 5px 30px;
			}

		}
		.btn-pan{
			position: absolute;
			bottom: 60px;
			left: 50%;
			margin-left: -126px;
		}
		.serverList{
			padding: 0;
			width: 90%;
			height: 200px;
	    	margin: 0 auto;
	    	overflow-y: auto;
	    	// border: 1px solid #888;

	    	.server{
	    		position: relative;
	    		float: left;
	    		cursor: pointer;
	    		color: #fff;
	    		background-color: #1C367E;
	    		text-align: center;
	    		line-height: 50px;
			    width: 180px;
			    height: 50px;
			    margin: 30px;
			    border-radius: 5px;
			    &:hover{
			    	background-color: #2E55C9;
			    }
			    .time_icon{
			    	position: absolute;
			    	display: none;
				    top: 13px;
				    left: 8px;
				    width: 24px;
				    height: 24px;
				    background-image: url(/static/image/time_icon.png);
				    background-size: cover;
			    }
			    .selected{
			    	display: block;
			    }
	    	}
		}
		.result-text{
			color: #000;
			font-size: 20px;
			margin: 0 auto;
			width: 450px;
			.ntpip{
				color: blue;
			}
		}

	}

</style>
<template>
	<div id="setNTP">
		<steps :active="3"></steps>
		<!-- <h2 class="text-center box-title">配置NTP</h2> -->
		<h4 class="text-center sub-title">注：输入自定义主机ip或者选择已添加主机作为NTP服务器</h4>
		<div class="result-text">您选择的NTP服务器IP：<span class="ntpip">{{NTPIp}}</span></div>
		<form class="form-inline selectPan">
		  <div class="form-group">
		    <label>输入自定义主机：</label>
		    <input type="text" class="form-control" v-model="selfModul" placeholder="输入自定义主机ip" >
		  </div>
		  <div class="form-group">
		    <div class="btn btn-success btn-setting" @click="setSelfNTP">设置</div>
			<span class="error-text" v-show="showErrorTip">格式有误</span>
		  </div>
		</form>

		<h5 class="list-title">选择已添加主机：</h5>
		<ul class="serverList">
			<li class="server" v-for="(server, index) in serverList" @click="setNTP(server)" >
				{{server.ip}}
				<div class="time_icon" :class="{selected: server.isNTP}">
					
				</div>
			</li>
		</ul>
		
		<div class="btn-pan">
			<button class="btn btn-primary btn-standard btn-back" @click="back"><span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>&nbsp;上一步</button>
			<button class="btn btn-primary btn-standard btn-next" :disabled= "nextDisable" @click="next">下一步&nbsp;<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>
		</div>
		
	</div>
</template>
<script>
	import util from 'common/js/util.js';
	import {
	    Loading
	} from 'element-ui';
	import Steps from 'components/steps/Steps.vue';
	export default{
		name: 'setNTP',
		components: {Steps},
		mounted () {
			this.NTPIp = util.getSessionData('NTPIp') || '';
		    this.serverList = util.getSessionData('serverList') || [];
		    if(this.NTPIp) {
		    	this.nextDisable = false;
		    }
		},
		watch: {
			NTPIp (newIP, oldIP){
				util.setSessionData('NTPIp', newIP);
				this.nextDisable = newIP? false : true;
				
			}
		},
		data (){
			return {
				NTPIp: '',  //设置的ip
				selfModul: '', //自定义的ip
				serverList: [],
				nextDisable: true,
				showErrorTip: false
			}
		},
		methods: {
			setSelfNTP (){
				if(!util.IP.test(this.selfModul)) {
					this.showErrorTip = true;
					return;
				}				

				var loadingInstance = Loading.service({
	                fullscreen: true,
	                text: 'NTP配置中,请勿刷新页面...'
	            });

	            AJAX.add({type:'doNtp', uuid:'doNtp', ip: this.selfModul}).then(res => {
	                loadingInstance.close();	   
	                if(res.body.status === 'success') {
		                this.showErrorTip = false;
						this.NTPIp = this.selfModul;
						this.serverList.forEach((ser) => {
							ser.isNTP = false;
						});

						util.setSessionData('serverList', this.serverList); 
					} else {
						this.$message({
		                    message: '设置失败，请重试',
		                    type: 'warning'
		                });
					}  
					         
	            }, res =>{
	            	loadingInstance.close();
	            	this.$message({
	                    message: '系统异常',
	                    type: 'warning'
	                });
	            });
			},
			setNTP (server){				

				var loadingInstance = Loading.service({
	                fullscreen: true,
	                text: 'NTP配置中,请勿刷新页面...'
	            });

	            AJAX.install({type:'doNtp', uuid:'doNtp', ip: server.ip, stype: '1'}).then(res => {
	                loadingInstance.close();
	                if(res.body.status === 'success') {
	                	this.selfModul = '';
						this.showErrorTip = false;
						this.serverList.forEach((ser) => {
							ser.isNTP = false;
						});	

						server.isNTP = true;
						this.NTPIp = server.ip;				

						util.setSessionData('serverList', this.serverList);
	                } else {
	                	this.$message({
		                    message: '设置失败，请重试',
		                    type: 'warning'
		                });
	                }

	            }, res =>{
	            	loadingInstance.close();
	            	this.$message({
	                    message: '系统异常',
	                    type: 'warning'
	                });
	            });

			},
			back (){
				this.$router.replace('/configHost');
			},
			next (){
				this.$router.replace('/chooseComponents');
			}
		}
	}
</script>