<template>
	<div id="serverInfoQuery">
		<div class="basisServer">
			<h4 class="text-center text-color">基础服务</h4>
			<ul class="clearfix">
				<li v-for="server in basisServerList" class="server-item" @click="showBaseDetail(server)">{{server.description || server.name}}</li>
			</ul>
		</div>
		<div class="businessServer">
			<h4 class="text-center text-color">业务服务</h4>
			<ul>
				<li v-for="businessServer in businessServerList" class="business-server">
					<span class="second-title">{{businessServer.name}}：</span>
					<ul class="clearfix">
						<li v-for="item in businessServer.businessList" class="server-item" @click="showBusinessDetail(item.moduleList)">
							{{item.description || item.name}}
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="otherServer text-color">
			<h4 class="text-center">其他服务</h4>
		</div>

		<el-dialog title="基础服务详情" v-model="dialogVisible" size="tiny">
		    <!-- <div style="height:350px;overflow-y:auto;padding:10px"> -->
		    <div>
		    	<div v-for="(val, key) in baseDetail">
		    		{{key}} : {{val}}
		    	</div>
		    </div>
		</el-dialog>

		<el-dialog title="业务服务详情" v-model="dialogBusinessVisible" size="tiny">
		    <!-- <div style="height:350px;overflow-y:auto;padding:10px"> -->
		    <div>
		    	<div v-for="item in businessDetail" style="margin-bottom: 10px;">
		    		<div v-for="(val, key) in item">
		    			{{key}} : {{val}}
		    		</div>
		    	</div>
		    </div>
		</el-dialog>

	</div>
</template>
<style lang="less">
	#serverInfoQuery{
		margin: 0 40px;
		ul{
			padding: 0;
		}		
		.text-color{
			color: blue;
		}
		.business-server{
			margin-bottom: 10px;
			.second-title{
				font-weight: 800;
    			color: #222;
			}
		}
		.basisServer, .businessServer{
			// border-bottom: 1px solid #999;
			margin-bottom: 30px;
		}
		.server-item{
			position: relative;
			float: left;
			width: 160px;
			height: 80px;
			border: 1px solid #aa3;
			margin-right: 20px;
			text-align: center;
			line-height: 80px;
			border-radius: 10px;
			box-shadow: 2px 2px 10px 1px #888;
			cursor: pointer;
			&:hover{
				background: #eee;
			}
		}
	}
</style>
<script>
	export default{
		mounted() {
			AJAX.getServerInfo().then(res => {
                if (res.body.code == 200) {
                    var resData = res.body.map;
                    var businessServerList = resData.businessServer;
                    this.basisServerList = resData.basisServer;
                    this.businessServerList = businessServerList;

                }
            }, res => {
                this.$message({
                    message: '系统异常',
                    type: 'warning'
                });
            });
		},
		data() {
			return {
				dialogVisible: false,
				dialogBusinessVisible: false,
				basisServerList: [],
				businessServerList: [],
				baseDetail: '',
				businessDetail: ''
			}
		},
		methods: {
			showBaseDetail(server) {
				this.baseDetail = server;
				this.dialogVisible = true;
				// console.log(server);

			},
			showBusinessDetail(server) {
				this.businessDetail = server;
				this.dialogBusinessVisible = true;
				// console.log(server);
			}
		}
	}
</script>