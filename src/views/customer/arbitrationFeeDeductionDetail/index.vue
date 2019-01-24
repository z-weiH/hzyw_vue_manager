<template>
  <div class="arbitration-fee-deduction-detail">
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
      <span>仲裁费扣除记录</span>
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
          <el-input v-model="searchForm.keyWords" placeholder="请输入仲裁案号、被申请人"></el-input>
        </el-form-item>
        <el-button @click="handleSearch" type="warning">查询</el-button>
      </el-form>

      <el-row>
        <el-col :span="8">
          <p class="ml-10">扣除受理费总数：{{statistics.offTotal}}元</p>
        </el-col>
        <el-col :span="8">
          <p class="ml-10">退款总数：{{statistics.refundTotal}}元</p>
        </el-col>
        <el-col :span="8">
          <p class="ml-10">案件处理费总数：{{statistics.handTotal}}元</p>
        </el-col>
      </el-row>

      <div class="mt-10 item-radio">
        <el-radio-group v-model="searchForm.orderType" size="mini">
          <el-radio-button :label="1">预收受理费</el-radio-button>
          <el-radio-button :label="2">退款</el-radio-button>
          <el-radio-button :label="3">案件处理费</el-radio-button>
        </el-radio-group>

        <div class="fr">
          <el-button @click="handleExportFile" type="primary" size="mini">导出</el-button>
        </div>
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
				<el-table-column prop="clientName" label="客户名称" key="1"></el-table-column>
        <el-table-column prop="caseNoWz" label="仲裁案号" key="2"></el-table-column>
        <el-table-column prop="caseStatusWz" label="案件状态" key="3"></el-table-column>
        <el-table-column prop="respondents" label="被申请人" key="4"></el-table-column>
        <el-table-column prop="amtCase" label="标的金额（元）" key="5"></el-table-column>

        <template v-if="searchForm.orderType === 1">
          <el-table-column prop="amtFee" label="预收受理费（元）" key="6"></el-table-column>
          <el-table-column prop="operTime" label="预收受理费时间" key="8"></el-table-column>
        </template>

        <template v-if="searchForm.orderType === 2">
          <el-table-column prop="amtFee" label="退款（元）" key="9"></el-table-column>
          <el-table-column prop="operTime" label="退款时间" key="10"></el-table-column>
        </template>

        <template v-if="searchForm.orderType === 3">
          <el-table-column prop="amtFee" label="案件处理费（元）" key="11"></el-table-column>
          <el-table-column prop="operTime" label="扣除时间" key="12"></el-table-column>
        </template>
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
          // 业务类型
          orderType : 1,
        },
        // 统计
        statistics : {
          handTotal : '', // 	案件处理费总数
          offTotal : '', // 扣除受理费总数
          refundTotal : '', // 退款受理费总数
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
    watch : {
      ['searchForm.orderType']() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.initTableList();
        this.initStatistics();
      },
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
          url : '/account/queryOffTotal.htm',
          data : {
            bizType : 0,
            ...this.ruleForm,
            ...this.searchForm,
          },
        }).then((res) => {
          this.statistics = Object.assign(this.statistics,res.result);
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
          url : '/account/queryFeeOffExport.htm',
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
        this.$http({
          url : '/account/queryFeeOffList.htm',
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

.arbitration-fee-deduction-detail{
  .el-radio-button:focus:not(.is-focus):not(:active){
    box-shadow: none;
  }
  .item-radio{
    border-top:1px solid #E9EDF0;
    padding-top: 10px;
  }
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