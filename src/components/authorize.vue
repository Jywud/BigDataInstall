<template>
    <div id="authorize">
        <h2 class="text-center">大数据基础管理平台</h2>
        <h4 class="text-center title-text">暂未获得授权或授权无效</h4>
        <div class="content-box">
            <div class="con-pan download-pan">
                <p class="sub-text">请先下载授权原文件,授权后再上传！</p>
                <div class="btn btn-success btn-download" @click="download">下载授权原文件</div>
            </div>
            <div class="upload-pan">
                <el-upload class="upload-file" action="/npcloud-manager-1.0/npcloud/fileUpload" type="drag" :on-success="handleSuccess" :on-error="handleError" :default-file-list="fileList">
                    <i class="el-icon-upload"></i>
                    <div class="el-dragger__text">将授权后的文件拖到此处，或<em>点击上传</em>
                    </div>
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
    .title-text {
        color: red;
    }
    .upload-file {
        margin: 0 auto;
        input {
            opacity: 0;
        }
    }
    .content-box {
        background-color: #F7F7F9;
        width: 600px;
        height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -300px;
        margin-top: -200px;
        border-radius: 2px;
    }
    .con-pan {
        width: 240px;
        height: 100px;
        margin: 30px auto;
        .btn-download {
            margin-left: 45px;
        }
        .sub-text {
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
        created() {

        },
        methods: {
            download() {
                // window.open('/npcloud-manager-1.0/npcloud/download?type=key0');
                window.location.href = "/npcloud-manager-1.0/npcloud/download?type=key0";
            },
            handleSuccess(res) {
                if (res.status === 'success') {
                    this.$router.replace('/login');
                } else {
                    this.$message({
                        message: '上传文件出错！',
                        type: 'warning'
                    });
                }

            },
            handleError(res) {
                this.$message({
                    message: '授权文件有误',
                    type: 'warning'
                });
            }
        }
        /*,
        beforeRouteEnter(to, from, next) {
            //$.post('/npcloud-manager-1.0/npcloud/sys', {type: 'testUse'});
            AJAX.sys({
                type: 'testUse'
            }).then(data => {
                if(data.body.status === 'success') {
                    next(vm => {
                        vm.$router.replace('/login');
                    });
                } else {
                    next();
                }
            }, data => {
                next();
            });
            
        }*/
}
</script>
