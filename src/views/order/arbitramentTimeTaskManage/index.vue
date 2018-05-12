<template>
  <div class="arbitrament-time-task-manage">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">

        <el-form-item label=" " prop="qsrcs">
          <el-input v-model.trim="ruleForm.qsrcs" placeholder="请输入参数"></el-input>
        </el-form-item>

        <el-form-item label=" " prop="processfingState">
          <el-select v-model="ruleForm.processfingState" placeholder="处理状态">
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
        <el-table-column label="商户名称">
          <template slot-scope="scope">
            <el-button @click="handleDetail" type="text">{{scope.row.fullName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="templateName" label="业务编码"></el-table-column>
        <el-table-column prop="busiCode" label="参数"></el-table-column>
        <el-table-column prop="createTime" label="处理状态"></el-table-column>
        <el-table-column prop="createTime" label="请求时间"></el-table-column>
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

      <!-- 详情浮层 -->
      <timedTaskDetail ref="timedTaskDetail"></timedTaskDetail>
    </div>
  </div>
</template>

<script>
  import timedTaskDetail from './modules/timedTaskDetail.vue'
  export default {
    components : {timedTaskDetail},
    data() {
      return {
        ruleForm : {
          // 处理状态
          processfingState : '',
          // 参数
          qsrcs : '',
        },

        // 处理状态 options
        processingStateOptions : [
          {label : '待处理' , value : '待处理'},
          {label : '处理失败' , value : '处理失败'},
          {label : '处理中' , value : '处理中'},
        ],

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
      //this.initTableList();
    },
    methods : {
      // 点击搜索
      handleSearch() {
        this.initTableList();
      },
      // 点击重发
      handleReset(row) {
        this.$message.success('重新发送成功');
        //this.$http();
      },
      // 点击查看详情，明细
      handleDetail(row) {
        this.$refs.timedTaskDetail.show();
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/templatevidence/querytemplatevidenceByBaseQuery.htm',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            keyWords : this.ruleForm.keyWords,
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

.arbitrament-time-task-manage{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>