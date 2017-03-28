<style lang="less">
	@import '../common/less/monitorBase.less';
	#installApplication{
		position: absolute;
	    width: 100%;
	    height: 100%;
	    .select-pan{
	    	margin: 20px 0 20px 100px;
	    }
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
				.appCheck{
					position: absolute;
					left: 5px;
					top:5px;
				}
				.content-title{
					font-weight: 800;
					color: #222;
				}
				.bottom-pan{
					position: absolute;
					left: 72px;
					bottom: 5px;
				}
				.status{
					margin-right: 35px;
					color: blue;
				}
			}
		}
		.btn-pan{
			position: absolute;
			bottom: 60px;
			left: 50%;
			margin-left: -126px;
		}
	}
</style>

<template>
	<div id="installApplication">
		<steps :active="7"></steps>
		<div class="select-pan">
			<h4>请选择要安装的web应用</h4>
	        <form class="form-inline condition-box">
	            <div class="form-group">
	                <div class="input-group">
	                    <div class="input-group-addon">主机IP</div>
	                    <input type="text" class="form-control" v-model="inputIp" placeholder="ip">
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="input-group">
	                    <div class="input-group-addon">用户名</div>
	                    <input type="text" class="form-control" v-model="inputUserName" placeholder="用户名">
	                </div>
	            </div>
	            <div class="form-group">
	                <div class="input-group">
	                    <div class="input-group-addon">密码</div>
	                    <input type="password" class="form-control" v-model="inputPassword" placeholder="密码">
	                </div>
	            </div>
	            <div class="form-group">
	                <el-checkbox v-model="onlyInstall">应用独立安装</el-checkbox>
	            </div>
	        </form>
		</div>
		
		<!-- <h2 class="text-center box-title">安装组件</h2> -->
		<div class="content-pan clearfix">
			<div class="content" v-for="(item, index) in appList">	
				<el-checkbox v-model="item.check" class="appCheck" disabled>&nbsp;</el-checkbox>
				<p class="text-center content-title">{{item.name}}</p>
				<el-progress class="comp-progress" type="circle" :status="item.status" :percentage="item.percentage"></el-progress>	
				<div class="bottom-pan">
					<button class="btn btn-warning btn-log" @click="showLog(item)">日志</button>
				</div>
			</div>
		</div>

		<div class="btn-pan">
			<button class="btn btn-primary btn-standard" :disabled="!selectedApp"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>&nbsp;开始安装</button>
			<button class="btn btn-info btn-standard" ><span class="glyphicon glyphicon-share-alt" aria-hidden="true"></span>&nbsp;跳过安装</button>
			<button class="btn btn-success btn-standard" :disabled="!installSuccess"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>&nbsp;安装完成</button>
		</div>		

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
		name: 'installApplication',
		data (){
			return {
				onlyInstall: false,
				inputIp: '',
				inputUserName: '',
				inputPassword: '',
				dialogFormVisible: false, //是否展示日志框
				nextDisable: false,
				logContent: '', //日志信息
				selectedApp: true, //选择了应用
				installSuccess: false,
				appList: [
					{
						name: 'CMS',
						status: '',
						check: true
					}
				]
			}
		},
		computed: {
			/*checkSelect() {
				let select = false;
				this.appList.forEach( item => {
					if(item.check === true) {
						select = true;
						return;
					}
				});

				return select;
			}*/
		},
		watch: {
			appList: {
		      handler(newList) {
		      	// console.log(newList)
		      	let select = false;
				newList.forEach( item => {
					if(item.check === true) {
						select = true;
						return;
					}
				});
				this.selectedApp = select;
		      },
		      deep: true
		    }
		},
		components: {Steps},
		methods: {
			showLog (item) {
				this.logContent = item.name;
				this.dialogFormVisible = true;
			},
			next (){
				// this.$router.replace('installApplication');
			}
		}
	}
</script>