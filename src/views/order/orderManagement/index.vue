<template>
  <div class="order-management">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">

        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入借款单号"></el-input>
        </el-form-item>

        <el-form-item label=" " prop="merchantCode">
          <el-select clearable style="width:120px;" v-model="ruleForm.merchantCode" placeholder="请选择商户">
            <template v-for="(item,index) in merchantOptions">
              <el-option :key="item.code + index" :label="item.merchantName" :value="item.code"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <!-- 时间范围 选择 -->
        <timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
        >
        </timeFrame>

        <el-form-item label=" " prop="orderStatus">
          <el-select clearable style="width:120px;" v-model="ruleForm.orderStatus" placeholder="请选择案件">
            <template v-for="(item) in orderStatuOptions">
              <el-option :key="item.code" :label="item.name" :value="item.code"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>

      </el-form>
    </div>

    <div class="item-title">
      订单管理
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
        <el-table-column label="借款单号">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.loanBillNo" placement="top-start">
              <a class="fn-a ellipsis" style="max-width:112px;" @click="handleDetail(scope.row)" type="text">{{scope.row.loanBillNo}}</a>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="platName" label="所属平台名称"></el-table-column>
        <el-table-column prop="respondents" label="被申请人"></el-table-column>
        <el-table-column prop="orderStatusCn" label="案件状态"></el-table-column>
        <el-table-column prop="createTime" label="订单提交时间">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.createTime" placement="top-start">
              <span class="ellipsis" style="max-width:108px;">{{scope.row.createTime}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="processResult" label="处理结果">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.processResult" placement="top-start">
              <span class="ellipsis" style="max-width:108px;">{{scope.row.processResult}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="applicationUrl" label="仲裁申请书" width="100px">
          <template slot-scope="scope">
            <a v-if="scope.row.applicationUrl" target="_blank" :href="scope.row.applicationUrl">查看</a>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click="handleReset(scope.row)" type="text">重新提交</el-button> -->
            <el-button @click="handleEditClaimant(scope.row)" type="text">修改</el-button>
            <el-button @click="handleSubmitEvidence(scope.row)" type="text">证据</el-button>
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

      <!-- 详情弹出框 -->
      <dialogDetail ref="dialogDetail"></dialogDetail>
      <!-- 修改 dialog -->
      <editDialog @successCBK="successCBK" ref="editDialog"></editDialog>
    </div>

  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import dialogDetail from './modules/detail.vue'
  import editDialog from './modules/editDialog.vue'
  export default {
    components : {
      timeFrame,
      dialogDetail,
      editDialog,
    },
    data() {
      return {
        ruleForm : {
          // 客户名称
          keyWords : '',
          // 开始时间
          startDate : '',
          // 结束时间
          endDate : '',
          // 商户
          merchantCode : '',
          // 案件
          orderStatus : '',
        },
        rules : {},
        
        // 表格数据
        tableData : [],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,

        // 商户options 
        merchantOptions : [
          {merchantName : '张三' , code : '张三'}
        ],
        // 案件options
        orderStatuOptions : [
          {name : '李四' , code : '李四'}
        ],
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
      // 获取所有 案件
      this.$http({
        method : 'post',
        url : '/ordermanage/queryOrderStatus.htm',
      }).then((res) => {
        this.orderStatuOptions = res.result.list;
      });
    },
    methods: {
      // 点击搜索
      handleSearch() {
        this.currentPage = 1;
        this.initTableList();
      },
      // 点击 详情
      handleDetail(row) {
        this.$refs.dialogDetail.show(row);
      },
      // 点击 重新提交
      handleReset(row) {
        this.$http({
          method : 'post',
          url :'/ordermanage/submitAgain.htm',
          data : {
            caseOrderId : row.caseOrderId
          },
        }).then((res) => {
          this.$message.success('重新提交成功');
        });
      },
      // 修改被申请人 
      handleEditClaimant(row) {
        this.$refs.editDialog.show();
      },
      // 修改被申请人 成功回调
      successCBK() {

      },
      // 点击证据 按钮
      handleSubmitEvidence() {
        this.$router.push('summitEvidence');
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/ordermanage/queryOrderInfoByBaseQuery.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            startDate : this.ruleForm.startDate,
            endDate : this.ruleForm.endDate,
            keyWords : this.ruleForm.keyWords,
            merchantCode : this.ruleForm.merchantCode,
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

.order-management{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>