<style lang="less">
	#StartComponents{
		position: absolute;
	    width: 100%;
	    height: 100%;
		.content-pan{
			width: 1050px;
			margin: 50px auto;
			.content{
				position: relative;
				width: 200px;
				height: 240px;
				border-radius: 10px;
				box-shadow: 2px 2px 10px 1px #888;
				// background-color: #ccc;
				float: left;
				border: 1px solid #aa3;
				padding: 10px;
				margin-bottom: 10px; 
				margin-right: 10px; 
				text-align: center;
				.content-title{
					font-weight: 800;
					color: #222;
				}
				.bottom-pan{
					position: absolute;
					left: 30px;
					bottom: 5px;
				}
				.status{
					margin-right: 35px;
					color: blue;
				}
			}
		}
		.btn-next {
	        position: absolute;
	        left: 50%;
	        bottom: 60px;
	        // padding: 10px 40px;
	        margin-left: -62px;
	    }
	}
</style>

<template>
	<div id="StartComponents">
		<steps :active="6"></steps>
		<!-- <h2 class="text-center box-title">安装组件</h2> -->
		<div class="content-pan clearfix">
			<div class="content" v-for="(item, index) in comList">	
				<p class="text-center content-title">{{item.name}}</p>

				<div class="bottom-pan">
					<span class="status">{{item.status}}</span>
					<button class="btn btn-warning btn-log" @click="showLog(item)">日志</button>
				</div>
				
			</div>
			
		</div>
		<button class="btn btn-primary btn-standard btn-next" :disabled="nextDisable" @click="next">下一步&nbsp;<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></button>
		<el-dialog title="日志信息" v-model="dialogFormVisible">
		    <div style="height:400px;overflow-y:auto;padding:10px">
		    	{{logContent}}
		    </div>
		</el-dialog>
	</div>
</template>

<script>
	// import { MessageBox } from 'element-ui';
	import Steps from 'components/steps/Steps.vue';
	export default{
		name: 'startComponents',
		data (){
			return {
				dialogFormVisible: false, //是否展示日志框
				nextDisable: false,
				logContent: '', //日志信息
				comList: [
					{
						name: 'JDK',
						status: '启动中'
					},{
						name: 'azkaban',
						status: '启动中'
					},{
						name: 'sparkMaster',
						status: '启动中'
					},{
						name: 'sparkMaster',
						status: '启动中'
					},{
						name: 'sparkMaster',
						status: '启动中'
					},{
						name: 'sparkMaster',
						status: '启动中'
					},{
						name: 'success1',
						status: '启动中'
					}
				]
			}
		},
		components: {Steps},
		methods: {
			showLog (item) {
				this.logContent = item.name;
				this.dialogFormVisible = true;
			},
			next (){
				this.$router.replace('installApplication');
			}
		}
	}
</script>