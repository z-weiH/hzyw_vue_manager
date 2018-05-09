<template>
  <div class="note-send-log">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">

        <el-form-item label=" " prop="zcw">
          <el-input v-model.trim="ruleForm.zcw" placeholder="请输入仲裁委"></el-input>
        </el-form-item>

        <!-- 时间范围 选择 -->
        <timeFrame
          :startTime.sync="ruleForm.startTime"
          :endTime.sync="ruleForm.endTime"
        >
        </timeFrame>

        <el-button @click="handleSearch" type="primary">查询</el-button>

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
        <el-table-column prop="date" label="所属仲裁委"></el-table-column>
        <el-table-column prop="date" label="仲裁端短信id"></el-table-column>
        <el-table-column prop="date" label="短信类型"></el-table-column>
        <el-table-column prop="date" label="手机号"></el-table-column>
        <el-table-column prop="date" label="发送结果"></el-table-column>
        <el-table-column prop="date" label="发送时间"></el-table-column>
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
          // 仲裁委
          zcw : '',
          // 开始时间
          startTime : this.$moment().format('YYYY-MM-DD'),
          // 结束时间
          endTime : this.$moment().format('YYYY-MM-DD'),
        },
        rules : {},
        
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
      //this.initTableList();
    },
    methods : {
      // 点击搜索
      handleSearch() {
        console.log(this.ruleForm);
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/list',
          params : {
            pageSize : this.pageSize,
            currentPage : this.currentPage,
          },
        }).then((res) => {
          this.total = res.total;
          this.tableData = res.list;
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

<style lang="scss" scoped>

</style>

<style lang="scss">

.note-send-log{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>