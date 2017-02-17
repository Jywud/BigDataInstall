<style lang="less">
	#InstallComponents{
		position: absolute;
	    width: 100%;
	    height: 100%;
	    color: #000;
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
				padding: 10px 38px;
				margin-bottom: 10px; 
				margin-right: 10px; 
				text-align: center;
				.content-title{
					font-weight: 800;
					color: #222;
				}
				.comp-progress{
					margin-bottom: 20px;
				}
			}
			.el-progress__text{
				// color: #fff;
			}
		}
		.btn-pan {
	        position: absolute;
	        bottom: 60px;
	        left: 50%;
	        margin-left: -126px;
	    }
		/* .btn-next {
			        position: absolute;
			        left: 50%;
			        bottom: 60px;
			        // padding: 10px 40px;
			        margin-left: -62px;
			    } */
	}
</style>

<template>
	<div id="InstallComponents">
		<steps :active="5"></steps>
		<!-- <h2 class="text-center box-title">安装组件</h2> -->
		<div class="content-pan clearfix">
			<div class="content" v-for="(item, index) in comList">	
				<p class="text-center content-title">{{item.name}}</p>	
				<el-progress class="comp-progress" type="circle" :status="item.status" :percentage="item.percentage"></el-progress>		
				<button class="btn btn-warning btn-log" @click="showLog(item)">日志</button>
			</div>
			
		</div>
		<div class="btn-pan">
            <button class="btn btn-primary btn-standard btn-back" @click="back">
                <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>&nbsp;上一步
            </button>
            <button class="btn btn-primary btn-standard btn-next" icon="search" @click="next">
                <span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>&nbsp;执行
            </button>
        </div>
		<!-- <button class="btn btn-primary btn-standard btn-next" :disabled="nextDisable" @click="next"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>&nbsp;启动</button> -->
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
		name: 'installComponents',
		data (){
			return {
				dialogFormVisible: false, //是否展示日志框
				nextDisable: false,
				logContent: '', //日志信息
				comList: [
					{
						name: 'JDK',
						percentage: 65,
						status: ''
					},{
						name: 'azkaban',
						percentage: 100,
						status: 'success'
					},{
						name: 'sparkMaster',
						percentage: 100,
						status: 'exception'
					},{
						name: 'sparkMaster',
						percentage: 80,
						status: ''
					},{
						name: 'sparkMaster',
						percentage: 19,
						status: ''
					},{
						name: 'sparkMaster',
						percentage: 10,
						status: ''
					},{
						name: 'success',
						percentage: 50,
						status: ''
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
			back() {
				this.$router.replace('chooseComponents');
			},
			next (){
				this.$router.replace('startComponents');
			}
		}
	}
</script>