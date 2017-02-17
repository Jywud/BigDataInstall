<template>
    <div id="authorize">
        <h2 class="text-center">授权信息</h2>
        <h4 class="text-center title-text">暂未获得授权或授权无效</h4>
        <div class="content-box">
        	<div class="con-pan download-pan">
                <!-- <h5>第一步：</h5> -->
        		<p class="sub-text">请先下载授权原文件,授权后再上传！</p>
        		<div class="btn btn-success" @click="download">下载授权原文件</div>
        	</div>
        	<div class="con-pan upload-pan">
                <!-- <h5>第二步：</h5> -->
        		<el-upload class="upload-file" action="//jsonplaceholder.typicode.com/posts/" type="drag" :on-success="handleSuccess" :on-error="handleError" :default-file-list="fileList">
        		    <i class="el-icon-upload"></i>
        		    <div class="el-dragger__text">将授权文件拖到此处，或<em>点击上传</em></div>
        		</el-upload>
        	</div>        	
        </div>
        
    </div>
</template>
<style lang="less">
#authorize {
    position: absolute;
    width: 100%;
    height: 100%;
    .title-text{
    	color: red;
    }
    .upload-file{
    	margin: 0 auto;
    	input{
    		opacity: 0;
    	}
    }
    .content-box{
    	width: 820px;
    	position: absolute;
	    top: 50%;
	    left: 50%;
	    margin-left: -410px;
	    margin-top: -100px;
    }
    .con-pan{
    	width: 400px;
    	height: 200px;
    	display: inline-block;
    	vertical-align: top;
    	.sub-text{
    		color: blue
    	}
    }
}
</style>
<script>
export default {
    data() {
            return {
            	fileList: []
            }
        },
        methods: {
        	download() {

        	},
            handleSuccess() {
                alert('success');
            },
            handleError() {
                alert('error');
            }
        },
        beforeRouteEnter (to, from, next) {
          console.log('-auto-beforeRouteEnter---');
          next();
        }
}
</script>
