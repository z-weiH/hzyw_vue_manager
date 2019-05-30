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
      <span>服务费扣除记录</span>
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

    <div class="item-search">
      <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="0px">
        <el-form-item label=" " prop="clientCode">
          <el-select filterable clearable v-model="searchForm.clientCode" placeholder="请选择客户">
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.merchantName" :value="item.code" v-for="(item,index) in clientOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" " prop="keyWords">
          <el-input v-model="searchForm.keyWords" placeholder="请输入被申请人"></el-input>
        </el-form-item>
        <el-button @click="handleSearch" type="warning">查询</el-button>

        <div class="fr">
          <el-button @click="handleExportFile" type="primary">导出</el-button>
        </div>
      </el-form>

      <p class="ml-10">扣除服务费总数：{{statistics.offTotal}}元</p>
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
				<el-table-column prop="clientName" label="客户名称"></el-table-column>
        <el-table-column prop="feeOrderType" label="扣款类型">
          <template slot-scope="scope">
            {{scope.row.feeOrderType === 0 ? '系统自动' : '合同扣款'}}
          </template>
        </el-table-column>
        <el-table-column prop="settleType" label="结算类型">
          <template slot-scope="scope">
            <span v-if="scope.row.settleType === 1">仲券结算</span>
            <span v-if="scope.row.settleType === 2">比例结算</span>
          </template>
        </el-table-column>
        <el-table-column prop="caseNo" label="仲裁案号">
          <template slot-scope="scope">
            {{scope.row.caseNo || '--'}}
          </template>
        </el-table-column>
        <el-table-column prop="respondents" label="被申请人"></el-table-column>
        <el-table-column prop="amtBorrowed" label="标的金额（元）"></el-table-column>
        <el-table-column prop="ticketCount" label="服务费(元)"></el-table-column>
        <el-table-column prop="createTime" label="扣除时间"></el-table-column>
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
  import exportFile from '@/assets/js/exportFile'
  export default {
    components : {
      timeFrame,
    },
    data() {
      let time = this.$moment(+ new Date() - 24 * 3600 * 1000).format('YYYY-MM-DD');
      return {
        ruleForm : {
          // 开始日期
          startDate : time,
          // 结束日期
          endDate : time,
        },
        startDateText : time,
        endDateText : time,

        // 用于表格搜索
        searchForm : {
          // 客户
          clientCode : '',
          // 关键字
          keyWords : '',
        },
        // 统计
        statistics : {
          offTotal : '', // 扣除服务费总数
        },

        // 表格数据
        tableData : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,

        // 客户options
        clientOptions : [],
      }
    },
    mounted() {
      this.initClient();
      this.initStatistics();
      this.initTableList();
    },
    methods : {
      // 获取客户 options
      initClient() {
        return this.$http({
          method : 'post',
          url : '/merchant/queryMerchants.htm',
        }).then((res) => {
          this.clientOptions = res.result.list;
        });
      },
      // 获取统计
      initStatistics() {
        return this.$http({
          method : 'post',
          url : '/account/queryTicketSum.htm',
          data : {
            ...this.ruleForm,
            ...this.searchForm,
          },
        }).then((res) => {
          // this.statistics = Object.assign(this.statistics,res.result);
          this.statistics.offTotal = res.result;
        });
      },
      // 时间搜索
      handleTimeSearch() {
        if(!this.ruleForm.startDate && !this.ruleForm.endDate) {
          return this.$message.warning('请至少选择一个时间');
        }
        this.initStatistics().then(() => {
          this.initTableList();
          this.startDateText = this.ruleForm.startDate;
          this.endDateText = this.ruleForm.endDate;
        });
      },
      // 点击导出
      handleExportFile() {
        exportFile({
          url : '/account/queryTicketOffExport.htm',
          data : {
            ...this.ruleForm,
            ...this.searchForm,
          },
        });
      },
      // 点击查询
      handleSearch() {
        this.initTableList();
        this.initStatistics();
      },
      // 点击返回
      handleGoBack() {
        this.$router.push('balanceQuery');
      },


      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        let loading = this.$loading();
        this.$http({
          url : '/account/queryTicketOffList.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,

            ...this.ruleForm,
            ...this.searchForm,
          },
        }).then((res) => {
          this.total = res.result.count;
          this.tableData = res.result.list;
          loading.close();
        }).catch(() => {
          loading.close();
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
