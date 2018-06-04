<template>
  <div class="processing-fee-settle-review">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">
        <el-form-item label=" " prop="arbName">
          <el-input v-model.trim="ruleForm.arbName" placeholder="请输入结算单号/结算方案名称"></el-input>
        </el-form-item>

        <el-form-item label=" " prop="updateTime">
          <el-date-picker
            v-model="ruleForm.updateTime"
            type="month"
            value-format="yyyyMM"
            format="yyyyMM"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>

        <el-form-item label=" " prop="resultStatus">
          <el-select clearable v-model="ruleForm.resultStatus" placeholder="请选择状态">
            <el-option label="待处理" :value="0"></el-option>
            <el-option label="待复核" :value="1"></el-option>
            <el-option label="已复核" :value="2"></el-option>
            <el-option label="复核不通过" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <div class="fr">
          <el-button @click="handleSearch" type="warning">查询</el-button>
        </div>
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
        <el-table-column prop="settleMonth" label="结算月份"></el-table-column>
        <el-table-column prop="arbName" label="结算方"></el-table-column>
        <el-table-column prop="settleAmt" label="金额"></el-table-column>
        <el-table-column prop="bankPayno" label="结算单号"></el-table-column>
        <el-table-column prop="updateTime" label="提交时间"></el-table-column>
        <el-table-column label="结算状态">
          <template slot-scope="scope">
            <template v-if="scope.row.resultStatus === 1">
              <el-button @click="handleExamine(scope.row)" type="text">待复核</el-button>
            </template>
            <template v-else-if="scope.row.resultStatus === 2">
              已复核
            </template>
            <template v-else-if="scope.row.resultStatus === 3">
              复核不通过
            </template>
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

      <m-dialog @successCBK="successCBK" ref="dialog"></m-dialog>
    </div>
  </div>
</template>

<script>
  import mDialog from './modules/dialog.vue'
  export default {
    components : {mDialog},
    data() {
      return {
        ruleForm : {
          // 	结算方名称
          arbName : '',
          // 状态 	0待处理1待结算2已结算3结算不通过
          resultStatus : '',
          // 	时间
          updateTime : '',
        },

        // 表格数据
        tableData : [{},{}],
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
    },
    methods : {
      // 点击搜索
      handleSearch() {
        this.currentPage = 1;
        this.initTableList();
      },
      // 点击审核
      handleExamine(row) {
        this.$refs.dialog.show(row);
      },
      // 审核 回调
      successCBK() {
        this.initTableList();
      },


      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/recharge/processingFeeReview.htm',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            arbName : this.ruleForm.arbName,
            resultStatus : this.ruleForm.resultStatus,
            updateTime : this.ruleForm.updateTime,
          },
        }).then((res) => {
          console.info('rrrr::: ',res.result);
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

<style scoped>

</style>
