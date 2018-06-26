<template>
  <div class="case-order-query fn-hide">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">

        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入案件编号"></el-input>
        </el-form-item>

        <el-select clearable class="mr-10" style="width:120px;" v-model="ruleForm.processfingState" placeholder="处理状态">
          <el-option label="请选择" value=""></el-option>
          <template v-for="(item) in processingStateOptions">
            <el-option 
              :key="item.productId" 
              :label="item.label" 
              :value="item.value"
            >
            </el-option>
          </template>
        </el-select>

        <!-- 时间范围 选择 -->
        <timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
        >
        </timeFrame>

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
        <el-table-column prop="caseOrderId" label="案件编号"></el-table-column>
        <el-table-column prop="merchantName" label="客户名称"></el-table-column>
        <el-table-column prop="params" label="返回信息"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="busiDesc" label="业务编码"></el-table-column>
        <el-table-column prop="createTime" label="发送时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleReset(scope.row)" type="text">重发</el-button>
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
          // 客户名称
          keyWords : '',
          // 处理状态
          processfingState : '',
          // 开始时间
          startDate : '',
          // 结束时间
          endDate : '',
        },
        // 处理状态 options
        processingStateOptions : [
          {label : '待处理' , value : '0'},
          {label : '处理失败' , value : '2'},
          {label : '处理中' , value : '3'},
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
    },
    methods : {
      // 点击搜索
      handleSearch() {
        this.currentPage = 1;
        this.initTableList();
      },
      // 点击重发
      handleReset(row) {
        this.$message.success('重新发送成功');
        //this.$http();
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/case/queryCaseOrderByBaseQuery.htm',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            endDate : this.ruleForm.endDate,
            startDate : this.ruleForm.startDate,
            keyWords : this.ruleForm.keyWords,
          },
        }).then((res) => {
          res = res[0];
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

.case-order-query{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>