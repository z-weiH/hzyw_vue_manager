<template>
  <div class="tpl-evidence-setting">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">

        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入客户名称、账号"></el-input>
        </el-form-item>

        <!-- 时间范围 选择 -->
        <timeFrame
          :startTime.sync="ruleForm.startTime"
          :endTime.sync="ruleForm.endTime"
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
        <el-table-column prop="merchantName" label="客户名称"></el-table-column>
        <el-table-column prop="templateName" label="模板名称"></el-table-column>
        <el-table-column prop="busiCode" label="业务编码"></el-table-column>
        <el-table-column prop="createTime" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text">设置</el-button>
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

      <!-- 设置弹出框 -->
      <setDialog ref="setDialog"></setDialog>
    </div>
  </div>
</template>

<script>
  import setDialog from './modules/setDialog.vue'
  import timeFrame from '@/components/timeFrame.vue'
  export default {
    components : {
      setDialog,
      timeFrame,
    },
    data() {
      return {
        ruleForm : {
          // 客户名称
          keyWords : '',
          // 开始时间
          startTime : this.$moment().format('YYYY-MM-DD'),
          // 结束时间
          endTime : this.$moment().format('YYYY-MM-DD'),
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
        this.initTableList();
      },
      // 点击设置
      handleClick(row) {
        this.$refs.setDialog.show(row);
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
            endTime : this.ruleForm.endTime,
            startTime : this.ruleForm.startTime,
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

.tpl-evidence-setting{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>