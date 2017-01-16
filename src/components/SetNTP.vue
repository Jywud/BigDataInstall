<style lang="scss"> 
	#setNTP{
		.sub-title{
			margin-top: 40px;
			color: #bbb;
		}
		.list-title{
			font-size: 15px;
			font-weight: bold;
			margin-left: 126px;
		}
		position: absolute;
		width: 100%;
		height: 100%;
		.selectPan{
			width: 730px;
			margin: 100px 0 50px 110px;
			.selfTitle{
				margin-top: 4px;
				color: #fff;
				font-size: 15px;
			}
			.error-text{
				margin-top: 4px;
				color: red;
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
			color: #fff;
			font-size: 20px;
		}

	}

</style>
<template>
	<div id="setNTP">
		<h2 class="text-center box-title">配置NTP</h2>
		<h4 class="text-center sub-title">注：选择已添加主机或者输入主机ip作为NTP服务器</h4>
		<div class="row selectPan">
		    <label class="col-sm-2 control-label selfTitle">自定义主机：</label>
		    <div class="col-sm-5">
		      <input type="text" class="form-control" v-model="selfModul" placeholder="输入已有主机ip" >
		    </div>
		    <div class="col-sm-2 btn btn-success" @click="setSelfNTP">设置</div>

		    <span class="col-sm-2 error-text" v-show="showErrorTip">格式有误</span>
		</div>
		<h5 class="box-title list-title">已添加主机：</h5>
		<ul class="serverList">
			<li class="server" v-for="(server, index) in serverList" @click="setNTP(server)" >
				{{server.ip}}
				<div class="time_icon" :class="{selected: server.isNTP}">
					
				</div>
			</li>
		</ul>
		<p class="result-text text-center">您选择的NTP服务器IP：{{NTPIp}}</p>
		<div class="btn-pan">
			<button class="btn btn-primary btn-back" @click="back">上一步</button>
			<button class="btn btn-primary btn-next" :disabled= "nextDisable" @click="next">下一步</button>
		</div>
		
	</div>
</template>
<script>
	import common from '../common.js';
	export default{
		beforeMount () {
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
				selfModul: '', //自定义的ip
				serverList: this.$root.serverList || [],
				nextDisable: true,
				showErrorTip: false
				/*serverList:
				[{host:"1111",ip:"11.11.11.11",isNTP:false,name:"11",pwd:"11"},
				 {host:"2222",ip:"22.11.11.11",isNTP:false,name:"11",pwd:"11"},
				 {host:"3333",ip:"33.11.11.11",isNTP:false,name:"11",pwd:"11"},
				]*/
			}
		},
		methods: {
			setSelfNTP (){
				if(!common.IP.test(this.selfModul)) {
					this.showErrorTip = true;
					return;
				}
				this.showErrorTip = false;
				this.NTPIp = this.selfModul;
				this.serverList.forEach((ser) => {
					ser.isNTP = false;
				});
			},
			setNTP (server){
				this.selfModul = '';
				this.showErrorTip = false;
				var curNTPStatus = server.isNTP;
				this.serverList.forEach((ser) => {
					ser.isNTP = false;
				});	
				server.isNTP = !curNTPStatus;
				if(server.isNTP === true) {
					this.NTPIp = server.ip;
				} else {
					this.NTPIp = '';
				}
				
				// server.isNTP = !server.isNTP;
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