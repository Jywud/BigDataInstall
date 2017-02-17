<template>
  <div id="monitor">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="navbar-brand">Brand</div>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="hover" :class="isSelected === 0 ? 'active' : ''"><a @click="serverAssnbly(0)">组件监控</a></li>
            <li class="hover" :class="isSelected === 1 ? 'active' : ''"><a @click="serverAssnbly(1)">服务器监控</a></li>
            <li class="hover" :class="isSelected === 2 ? 'active' : ''"><a @click="serverAssnbly(2)">用户管理</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <div class="touxiang-icon hover" @click="dialogFormVisible = true"><img src="static/image/user-man.png"/>
              </div>
            </li>
            <li><a @click="logOut">退出</a></li>
          </ul>
        </div><!-- /.container-fluid -->
      </div>
    </nav>
    <el-dialog title="修改密码" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <input type="password" class='form-control' v-model="form.oldPwd"/>
          <span v-show="{showErrorTip:true}">{{notice}}</span>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <input type="password" class='form-control' v-model="form.newPwd"/>
          <span v-show="{showErrorTip1:true}">{{notice1}}</span>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <input type="password" class='form-control' v-model="form.confirmPwd"/>
          <span v-show="{showErrorTip2:true}">{{notice2}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commit()">确 定</el-button>
      </div>
    </el-dialog>
    <router-view></router-view>

  </div>
</template>
<style lang="less">
  #monitor {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;

  .hover {
    cursor: pointer;
  }

  .touxiang-icon {
    float: left;
    display: block;
    margin: 10px 15px;
    border-radius: 100%;
    border: 1px solid #DFDFDF;
    overflow: hidden;
    text-align: center;
      img {
        width: 30px;
        height: 30px;
      }

  }
  .el-dialog--small {
    width: 30% !important;

    .el-dialog__title {
      color: #999;
    }

    .el-form-item__label {
      color: #999;
    }

    .form-control {
      display: inline-block;
      vertical-align: middle;
      width: auto;
      min-width: 174px;
      height: 30px;
      border-radius: 4px;
      background-color: transparent;
      color: #333;
      box-shadow: none;
      font-size: 12px;
    }

    }
  }
</style>
<script>
  export default{
    data () {
      return {
        isSelected: 0,
        dialogFormVisible: false,
        form: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        notice: '',
        notice1: '',
        notice2: '',
        showErrorTip: false,
        showErrorTip1: false,
        showErrorTip2: false
      };
    },
    methods: {
      logOut(){
        this.$router.replace('');
      },
      serverAssnbly(index){
        if (index === 0) {
          this.isSelected = 0;
          this.$router.replace('/monitor');
        } else if (index === 1) {
          this.isSelected = 1;
          this.$router.replace('/monitor/server');
        } else {
          this.isSelected = 2;
          this.$router.replace('/monitor/platform');
        }
      },
      commit(){
        this.showErrorTip = false;
        this.showErrorTip1 = false;
        this.showErrorTip2 = false;
        if (this.form.oldPwd === '') {
          this.notice = '原密码不能为空';
          this.showErrorTip = true;
          return;
        }
        if (this.form.newPwd === '') {
          this.notice1 = '新密码不能为空';
          this.showErrorTip1 = true;
          return;
        }
        if (this.form.confirmPwd === '') {
          this.notice2 = '确认密码不能为空';
          this.showErrorTip2 = true;
          return;
        }
        if (this.form.confirmPwd != this.form.newPwd) {
          this.notice2 = '新密码与确认密码不一致';
          this.showErrorTip2 = true;
          return;
        }
        dialogFormVisible = false;
      }
    }
  }

</script>
