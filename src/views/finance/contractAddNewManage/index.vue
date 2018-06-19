<template>
  <div class="contract-add-new-manage">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">合同加款【审核】</a>
    </div>
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">
        <el-form-item label=" " prop="keyWords">
          <el-input style="width:160px;" v-model.trim="ruleForm.keyWords" placeholder="合同编号、客户名称"></el-input>
        </el-form-item>

        <!-- 时间范围 选择 -->
        <timeFrame
          class="m-timeFrame"
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
        >
        </timeFrame>

        <el-form-item label=" " prop="orderStatus">
          <el-select clearable style="width:100px;" v-model="ruleForm.orderStatus">
            <el-option label="请选择" value=""></el-option>
            <el-option label="待处理" value="1"></el-option>
            <el-option label="已加款" value="2"></el-option>
            <el-option label="未通过" value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>
        <el-button @click="handleExport" type="primary">导出Excel</el-button>
      </el-form>
    </div>

    <div class="item-title">
      合同加款列表
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
        <el-table-column label="合同号">
          <template slot-scope="scope">
            <span class="fn-a" @click="handleDetail(scope.row)">{{scope.row.contractNo}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contractDate" label="合同时间"></el-table-column>
        <el-table-column prop="merchantName" label="签约客户" width="95px">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.merchantName" placement="top-start">
              <span class="ellipsis">{{scope.row.merchantName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="preCaseAmt" label="预加受理费"></el-table-column>
        <el-table-column prop="preCaseTicket" label="预加仲券"></el-table-column>
        <el-table-column prop="preTicketAmt" label="仲券金额"></el-table-column>
        <el-table-column prop="preServiceAmt" label="技术服务费"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            
            <template v-if="scope.row.orderStatus === 1">
              <el-button @click="handleExamine(scope.row)" type="text">
                待处理
              </el-button>
            </template>

            <template v-else-if="scope.row.orderStatus === 2">
              已加款
            </template>

            <template v-else-if="scope.row.orderStatus === 3">
              未通过
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

      <!-- 合同加款 dialog -->
      <contractAddition @successCBK="successCBK" ref="contractAddition"></contractAddition>

    </div>
  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import exportFile from '@/assets/js/exportFile'
  import contractAddition from './../contractAddNewDefault/modules/contractAddition.vue'

  export default {
    components : {
      timeFrame,
      contractAddition,
    },
    data() {
      return {
        ruleForm : {
          // 合同编号、客户名称
          keyWords : '',
          // 开始时间
          startDate : '',
          // 结束时间
          endDate : '',
          // 状态 0待加款1待复核2已加款3未通过
          orderStatus : '',
        },

        // 表格数据
        tableData : [{fullName : '张三'}],
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
      // 点击导出
      handleExport() {
        exportFile({
          url : '/contractOrder/exportExcel.htm',
          data : {
            keyWords : this.ruleForm.keyWords,
            startDate : this.ruleForm.startDate,
            endDate : this.ruleForm.endDate,
            orderStatus : this.ruleForm.orderStatus,
          },
        });
      },
      // 点击 待处理
      handleExamine(row) {
        this.$refs.contractAddition.show('examine',row);
      },
      // 成功 回调
      successCBK() {
        this.initTableList();
      },
      // 点击 详情
      handleDetail(row) {
        this.$refs.contractAddition.show('examineDetail',row);
      },


      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/contractOrder/queryContractOrderByCharge.htm',
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

<style lang="scss">

.contract-add-new-manage{
  .el-form-item{
    margin-bottom: 0;
  }
  
}

</style>