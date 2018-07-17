<template>
  <div class="message-push-list">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a>推送记录</a>
    </div>

    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">
        <el-form-item label=" " prop="keyWords">
          <el-input style="width:300px;" v-model.trim="ruleForm.keyWords" placeholder="请输入互金企业"></el-input>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>
        <el-button @click="handleSign" type="info">标记全部为已读</el-button>
      </el-form>
    </div>

    <div class="item-title">
      推送记录列表
    </div>

    <div class="item-table">
      <table
        class="m-primordial-table mt-10
          el-table el-table--fit el-table--border 
          el-table--enable-row-hover"
          style="table-layout:fixed;"
      >
        <tbody>
          <template v-for="(item,index) in tableData">
            <tr :Key="item.batchNo + '' + index">
              <td colspan="1">{{index + 1}}</td>
              <td colspan="18" class="m-td">
                <div class="fl">
                  <i :class="{'opacity-0' : item.isRead === 1}" class="is-read"></i>
                  <span class="mr-10 m-tit">{{item.merchantName}}</span>

                  <el-button v-if="item.status === 0" type="primary" round size="mini">正在推送</el-button>
                  <el-button v-if="item.status === 2" type="info" round size="mini">处理完成</el-button>
                  <el-button v-if="item.status === 1" round size="mini">推送完成，正在处理</el-button>

                  <p class="m-num">
                    <template v-if="item.status === 0">
                      <span>已推送：{{item.totalCount}}</span>
                    </template>
                    <template v-if="item.status === 2">
                      <span>处理总数：{{item.totalCount}}</span>
                      <span>处理失败：{{item.failCount}}</span>
                    </template>
                    <template v-if="item.status === 1">
                      <span>处理总数：{{item.totalCount}}</span>
                    </template>
                  </p>
                </div>
                <div class="fr">
                  <div class="fr-box">
                    <template v-if="item.status === 0">
                      <div>推送开始时间   {{item.startTime}}</div>
                    </template>

                    <template v-if="item.status === 2">
                      <div>推送开始时间   {{item.startTime}}</div>
                      <div>推送完成时间   {{item.endTime}}</div>
                      <div>处理完成时间   {{item.finishDisposeTime}}</div>
                    </template>

                    <template v-if="item.status === 1">
                      <div>推送开始时间   {{item.startTime}}</div>
                      <div>推送完成时间   {{item.endTime}}</div>
                    </template>
                  </div>
                </div>
              </td>
            </tr>
          </template>
          <template v-if="tableData.length === 0">
            <div class="no-data">
              暂无数据
            </div>
          </template>
        </tbody>
      </table>
      <!-- 分页 -->
      <el-pagination
        class="mt-10 mb-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm : {
          // 互金企业
          keyWords : '',
        },

        // 表格数据
        tableData : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
      }
    },
    mounted() {
      this.initTableList();
    },
    methods : {
      // 点击搜索
      handleSearch() {
        this.currentPage = 1;
        this.initTableList();
      },
      // 点击标记 
      handleSign() {
        this.$http({
          method : 'post',
          url : '/pushRecord/setReadedFlag.htm',
        }).then((res) => {
          this.currentPage = 1;
          this.initTableList();
          // 更新 未读消息
          this.$store.dispatch('menu/upDataPushRecordUnread');
        });
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/pushRecord/queryListByCondition.htm',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            endDate : this.ruleForm.endDate,
            startDate : this.ruleForm.startDate,
            keyWords : this.ruleForm.keyWords,
            orderStatus : this.ruleForm.orderStatus,
          },
        }).then((res) => {
          this.total = res.result.count;
          this.tableData = res.result.list;
        });
      },
      // 页数 change
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.initTableList();
      },
      // 分页 change
      handleCurrentChange(val) {
        this.currentPage = val; 
        this.initTableList();
      },

      // 表格相关 end
    },
  }
</script>

<style lang="scss" scoped>

.message-push-list{
  .no-data{
    min-height: 60px;
    text-align: center;
    line-height: 60px;
  }
  table td{
    width: 100px;
  }
  .opacity-0{
    opacity: 0;
  }
  .is-read{
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: rgb(241, 194, 107);
    border-radius: 50%;
    margin-right: 5px;
  }
  .m-tit{
    font-size: 15px;
    font-weight: bold;
  }
  .m-td{
    text-align: left;
    padding-left: 10px!important;
    .fl{
      width: 60%;
    }
  }
  .fr-box{
    text-align: right;
    padding-right: 20px;
    padding-top: 30px;
    >div{
      margin-bottom: 10px;
    }
  }

  .m-num{
    margin-top: 10px;
    padding-left: 20px;
    span{
      float: left;
      width: 50%;
    }
  }
}

</style>