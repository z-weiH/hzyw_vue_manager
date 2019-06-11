<template>
  <div class="client-time-task-manage">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">

       <el-form-item style="display:inline-block;" label=" " prop="merchantCode">
          <el-select filterable clearable class="mr-10" v-model="ruleForm.merchantCode" placeholder="请选择企业名称">
            <template v-for="(item,index) in merchantOptions">
              <el-option :key="item.code + index" :label="item.merchantName" :value="item.code"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>

      </el-form>
    </div>

    <div class="item-table">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column prop="date" label="序号" width="50px">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="clientName" label="企业名称"></el-table-column>
        <el-table-column prop="busiCode" label="业务编码"></el-table-column>
        <el-table-column label="处理状态">
          <template slot-scope="scope">
            {{
              scope.row.isProcessed === 0 ? '待处理':
              scope.row.isProcessed === 2 ? '处理失败': 
              scope.row.isProcessed === 3 ? '处理中' : '处理成功'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="requireTime" label="请求时间">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.requireTime" placement="top-start">
              <span class="ellipsis" style="max-width:104px;">{{scope.row.requireTime}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
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

      <!-- 详情浮层 -->
      <timedTaskDetail ref="timedTaskDetail"></timedTaskDetail>
    </div>
  </div>
</template>

<script>
  import timedTaskDetail from './../arbitramentTimeTaskManage/modules/timedTaskDetail.vue'
  export default {
    components : {timedTaskDetail},
    data() {
      return {
        ruleForm : {
          // 企业名称 id
          merchantCode : '',
        },

        // 商户options
        merchantOptions : [
          /* {merchantName : '李四' , code : '李四'} */
        ],

        // 表格数据
        tableData : [],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
      }
    },
    mounted() {
      this.initTableList();
      // 获取所有 商户
      this.$http({
        method : 'post',
        url : '/merchant/queryMerchants.htm',
      }).then((res) => {
        this.merchantOptions = res.result.list;
      });
    },
    methods : {
      // 点击搜索
      handleSearch() {
        this.currentPage = 1;
        this.initTableList();
      },
      // 点击重发
      handleReset(row) {
        this.$http({
          method : 'post',
          url : '/orderThird/updateByPrimaryKey.htm',
          data : {
            taskerId : row.taskerId,
          },
        }).then((res) => {
          this.$message.success('操作成功');
          this.currentPage = 1;
          this.initTableList();
        });
      },
      // 点击查看详情，明细
      handleDetail(row) {
        this.$http({
          method : 'post',
          url : '/orderThird/queryThirdTaskerInfoExtByTaskerId.htm',
          data : {
            taskerId : row.taskerId,
          },
        }).then((res) => {
          this.$refs.timedTaskDetail.show(res.result);
        });
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/orderThird/queryThirdTaskerInfoByBaseQuery.htm',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            merchantCode : this.ruleForm.merchantCode,
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

<style lang="scss">

.client-time-task-manage{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>
