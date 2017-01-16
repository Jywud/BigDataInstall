<style lang="scss">
	#InstallComponents{
		position: absolute;
	    width: 100%;
	    height: 100%;
	    color: #fff;
		.content-pan{
			width: 1050px;
			margin: 50px auto;
			.content{
				position: relative;
				width: 200px;
				height: 240px;
				border-radius: 10px;
				box-shadow: 2px 2px 10px 1px #888;
				background-color: #ccc;
				float: left;
				border: 1px solid #aa3;
				padding: 10px 38px;
				margin-bottom: 10px; 
				margin-right: 10px; 
				.content-title{
					font-weight: 800;
					color: #222;
				}
				.comp-progress{
					margin-bottom: 20px;
				}
				.btn-log{
					margin-left: 36px;
				}
			}
			.el-progress__text{
				// color: #fff;
			}
		}
	}
</style>

<template>
	<div id="InstallComponents">
		<h2 class="text-center box-title">安装组件</h2>
		<div class="content-pan clearfix">
			<div class="content" v-for="(item, index) in comList">	
				<p class="text-center content-title">{{item.name}}</p>	
				<el-progress class="comp-progress" type="circle" :status="item.status" :percentage="item.percentage"></el-progress>		
				<button class="btn btn-warning btn-log">日志</button>
			</div>
			<!-- <div class="content">	
				<p class="text-center content-title">azkaban</p>	
				<el-progress class="comp-progress" type="circle" :percentage="100" status="success"></el-progress>	
				<button class="btn btn-warning btn-log">日志</button>		
			</div>
			<div class="content">
				<p class="text-center content-title">azkaban</p>	
				<el-progress class="comp-progress" type="circle" :percentage="100" status="exception"></el-progress>
				<button class="btn btn-warning btn-log">日志</button>					
			</div> -->
			
		</div>
	</div>
</template>

<script>
	export default{
		data (){
			return {
				comList: [
					{
						name: 'JDK',
						percentage: 35,
						status: ''
					},{
						name: 'azkaban',
						percentage: 100,
						status: 'success'
					},{
						name: 'sparkMaster',
						percentage: 100,
						status: 'exception'
					}
				]
			}
		}
	}
</script>