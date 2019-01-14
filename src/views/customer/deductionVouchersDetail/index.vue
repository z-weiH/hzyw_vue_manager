<template>
  <div class="deduction-vouchers-detail">
    <div class="m-item">
      <el-button @click="handleGoBack" type="text" icon="el-icon-arrow-left">返回</el-button>
      <template v-if="startDateText && endDateText">
        <span>{{startDateText}}</span>
        <span>——</span>
        <span>{{endDateText}}</span>
      </template>
      <template v-else-if="startDateText">
        <span>{{startDateText}}</span>
        <span>及之后</span>
      </template>
      <template v-else-if="endDateText">
        <span>{{endDateText}}</span>
        <span>及之前</span>
      </template>
      <span>仲券扣除记录</span>
      <div class="fr">
        <el-form class="m-form" :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
          <timeFrame
            :startDate.sync="ruleForm.startDate"
            :endDate.sync="ruleForm.endDate"
          >
          </timeFrame>
          <el-button @click="handleTimeSearch" type="primary" size="mini" class="mt-5 mr-20">确定</el-button>
        </el-form>
      </div>
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
				<el-table-column prop="respondents" label="被申请人"></el-table-column>
        <el-table-column prop="platName" label="互金企业" align="center">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.platName" placement="top-start">
              <span class="ellipsis" style="max-width:130px;">{{scope.row.platName}}</span>
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

    </div>
  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  export default {
    components : {
      timeFrame,
    },
    data() {
      let time = this.$moment().format('YYYY-MM-DD');
      return {
        ruleForm : {
          // 开始日期
          startDate : time,
          // 结束日期
          endDate : time,
        },
        startDateText : time,
        endDateText : time,

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
      console.log(this);
    },
    methods : {
      // 时间搜索
      handleTimeSearch() {
        if(!this.ruleForm.startDate && !this.ruleForm.endDate) {
          return this.$message.warning('请至少选择一个时间');
        }
      },
      // 点击返回
      handleGoBack() {
        this.$router.push('balanceQuery');
      },


      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/preCaseLib/queryCaseListByCondition.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,

            ...this.ruleForm,
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

.deduction-vouchers-detail{
  .m-item{
    background-color: #ffffff;
    border: 1px solid #E9EDF0;
    border-top: none;
  }
  .m-form{
    display: inline-block;
    vertical-align: middle;
    .el-form-item{
      margin-bottom: 0;
    }
    .el-input__inner{
      height: 28px;
      line-height: 28px;
    }
  }
}

</style>