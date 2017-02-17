<template>
  <div id="platform">
    <div class="form-top form-inline form-top-fixed">
      <div class="form-group">
        <label class="control-label">登录名：</label>
        <input type="text" class="form-control" placeholder="请输入登录名" ng-model="orgList.orgCode">
      </div>
      <div class="form-group" style="margin-left: -14px;">
        <button type="button" class="btn btn-icon-blue" ng-click="query()">
          <span class="btn-icon-text">添加</span>
        </button>
      </div>
    </div>
    <div class="form-bottom form-bottom-fixed">
      <table class="table table-base waterprint" id="orgList">
        <thead>
        <tr>
          <th>用户名</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="list in lists" class="resultPlatform">
          <td><p class="shorten">{{list.name}}</p></td>
          <td class="operatePer">
            <span class="result-findBtn" ng-click="updateOrg(list)">修改</span>
            <span class="result-findBtn" ng-click="delate(list)">删除</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrap pagination-wrap-fixed clearfix">
        <!--<pagination total-items="orgPage.totalRow"-->
                    <!--ng-model="orgPage.pageNumber"-->
                    <!--max-size="8"-->
                    <!--items-per-page="orgPage.pageSize"-->
                    <!--class="pagination-sm pull-right"-->
                    <!--boundary-links="true"-->
                    <!--previous-text="上一页"-->
                    <!--next-text="下一页"-->
                    <!--first-text="首页"-->
                    <!--last-text="末页"-->
                    <!--ng-click="resetOrgPage()">-->
        <!--</pagination>-->
      </div>
    </div>
  </div>
</template>

<style lang="less">
  #platform{
    .operatePer {
      padding: 0 8px;
      span {
        display: inline-block;
        padding: 8px 5px;
        color: #0baafc;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          color: #f3982d;
        }
      }
    }
    .resultPlatform {
      height: 50px;
      .result-findBtn {
        text-align: center;
        vertical-align: middle;
        visibility: visible;
        display: inline-block;
      }
    }
  }
</style>
<script>
    export default{
        data () {
            return{
                lists:[{
                    name:111
                },{
                    name:222
                }]

            }
        }
    }
</script>
