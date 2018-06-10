<template>
  <div class="hear-dropCase-list">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">证据缺失案件库</a>
    </div>

    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label=" " prop="keyWords">
          <el-input style="width:260px;" v-model.trim="ruleForm.keyWords" placeholder="案件订单编号、互金企业、产品名称"></el-input>
        </el-form-item>

        <!-- 推送时间 -->
        <timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
          startPlaceholder="推送开始"
          endPlaceholder="推送结束"
        >
        </timeFrame>

        <el-form-item label=" " prop="type">
          <el-select clearable style="width:150px;" v-model="ruleForm.type" placeholder="请选择状态">
            <el-option label="继续处理" :value="1"></el-option>
            <el-option label="等待处理" :value="2"></el-option>
            <el-option label="整合中" :value="3"></el-option>
            <el-option label="已告知" :value="4"></el-option>
            <el-option label="整合成功" :value="5"></el-option>
          </el-select>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>
      </el-form>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">案件列表</span>
      <div class="fr">
        <el-button @click="handleBatchIntegration" type="primary">批量整合</el-button>
      </div>
    </div>

    <div class="item-table">
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column :selectable="selectable" prop="date" type="selection" width="50px"></el-table-column>
        <el-table-column prop="caseOrderId" label="案件订单编号"></el-table-column>
        <el-table-column prop="clientName" label="互金企业"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="pushDay" label="推送时间"></el-table-column>
        <el-table-column prop="amtCase" label="状态">
          <template slot-scope="scope">
            {{
              scope.row.type === 1 ? '继续处理' :
              scope.row.type === 2 ? '等待处理' :
              scope.row.type === 3 ? '整合中' :
              scope.row.type === 4 ? '已告知' : '整合成功'
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleOpen(scope.row)" type="text">查看</el-button>
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
      return {
        ruleForm : {
          // 案件订单编号、互金企业、产品名称
          keyWords : '',
          // 开始时间
          startDate : '',
          // 结束时间
          endDate : '',
          // 状态 1-继续处理，2-等待处理，3-整合中，4-已告知 5-整合成功
          type : '', 
        },
        rules : {},

        // table checked
        multipleSelection : [],

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
      // 表格 多选框 禁用状态
      selectable(row,index) {
        return row.type === 2 || row.type === 1;
      },
      // 点击批量整合
      handleBatchIntegration() {
        if(this.multipleSelection.length === 0){
          this.$message.warning('请勾选案件');
          return;
        }
        console.log(this.multipleSelection);
        this.$confirm("确定进行批量整合?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/failedReason/batchIntegration.htm',
            data : {
              list : JSON.stringify(this.multipleSelection)
            },
          }).then((res) => {
            this.$message.success('提交成功，请稍后查看结果');
            this.handleSearch();
          });
        }).catch(() => {});
      },
      // table check
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 点击查看
      handleOpen(row) {
        this.$router.push({
          path : 'hearDropCaseDetail',
          query : {
            caseOrderId : row.caseOrderId,
            type : row.type,
          },
        });
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/evidenceMissing.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,

            keyWords : this.ruleForm.keyWords,
            type : this.ruleForm.type,
            startDate : this.ruleForm.startDate,
            endDate : this.ruleForm.endDate,
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
    }
  }
</script>

<style lang="scss">

.hear-dropCase-list{
  .item-title{
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .item-title-sign{
    margin-top: 12px;
    display: inline-block;
  }
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>