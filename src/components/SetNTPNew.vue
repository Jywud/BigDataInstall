<style lang="less"> 
	#setNTP{
		.sub-title{
			margin-top: 40px;
			color: #bbb;
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
				margin-left: 5px;
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
			.btn-back{
				background-color: #2A4DB0;
				padding: 10px 40px;
			}
			.btn-next{		
				background-color: #2A4DB0;
				padding: 10px 40px;
			}
			
		}
		.serverList{
			padding: 0;
			width: 90%;
			height: 200px;
	    	margin: 0 auto;
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
		}

	}

</style>
<template>
	<div id="setNTP">
		<steps :active="3"></steps>
		<!-- <h2 class="text-center box-title">配置NTP</h2> -->
		<h4 class="text-center sub-title">注：点击已添加主机或者输入主机ip作为时钟同步服务器</h4>

		<form class="form-inline selectPan">
		  <div class="form-group">
		    <label>时钟同步服务器：</label>
		    <input type="text" class="form-control" v-model="NTPIp" :disabled="isInputDisable" @blur="inputBlur">
		  </div>
		  <div class="form-group">
		    <span class="glyphicon glyphicon-pencil pointer" aria-hidden="true" @click="editNTP">
			<span class="error-text" v-show="showErrorTip">IP格式有误</span>
		  </div>
		</form>

		<h5 class="list-title">已添加主机：</h5>
		<ul class="serverList">
			<li class="server" v-for="(server, index) in serverList" @click="setNTP(server)" >
				{{server.ip}}
				<div class="time_icon" :class="{selected: server.isNTP}">
					
				</div>
			</li>
		</ul>
		<!-- <p class="result-text text-center">您选择的NTP服务器IP：{{NTPIp}}</p> -->
		<div class="btn-pan">
			<button class="btn btn-primary btn-back" @click="back">上一步</button>
			<button class="btn btn-primary btn-next" :disabled= "nextDisable" @click="next">下一步</button>
		</div>
		
	</div>
</template>
<script>
	import util from 'common/js/util.js';
	import Steps from 'components/steps/Steps.vue';
	export default{
		name: 'setNTP',
		components: {Steps},
		mounted () {
		    this.NTPIp = this.$root.NTPIp || '';
		    if(this.NTPIp) {
		    	this.nextDisable = false;
		    }
		},
		watch: {
			NTPIp (newIP, oldIP){
				this.$root.NTPIp = newIP;
				this.nextDisable = newIP? false : true;
				
			}
		},
		data (){
			return {
				NTPIp: this.$root.NTPIp || '',  //设置的ip
				isInputDisable: true,
				serverList: this.$root.serverList || [],
				nextDisable: true,
				showErrorTip: false
			}
		},
		methods: {
			// 输入框失去焦点，发时钟同步请求
			inputBlur() {
				if(util.IP.test(this.NTPIp)) {
					this.showErrorTip = false;	
					this.isInputDisable = true;
					console.log('时钟请求');				
				} else {
					this.showErrorTip = true;	
				}

				
			},
			editNTP() {
				this.isInputDisable = false;
			},
			setSelfNTP (){
				/*if(!util.IP.test(this.selfModul)) {
					this.showErrorTip = true;
					return;
				}
				this.showErrorTip = false;
				this.NTPIp = this.selfModul;
				this.serverList.forEach((ser) => {
					ser.isNTP = false;
				});*/
			},
			setNTP (server){
				// this.selfModul = '';
				this.showErrorTip = false;

				console.log('时钟请求');

				this.serverList.forEach( ser => {
					ser.isNTP = false;
				});	
				server.isNTP = true;

				this.NTPIp = server.ip;
			},
			back (){
				this.$router.replace('/addServers');
			},
			next (){
				this.$router.replace('/chooseComponents');
			}
		}
	}
</script>