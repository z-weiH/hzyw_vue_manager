<template>
  <div class="case-management">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">

        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入客户名称、账号"></el-input>
        </el-form-item>

        <!-- 时间范围 选择 -->
        <timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
        >
        </timeFrame>

        <el-button @click="handleSearch" type="warning">查询</el-button>

        <div class="fr">
          <el-button @click="handleAdd" type="primary">新增案件</el-button>
        </div>

      </el-form>
    </div>

    <div class="item-title">
      案件管理
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
        <el-table-column prop="caseNo" label="案件号"></el-table-column>
        <el-table-column prop="merchantName" label="所属企业"></el-table-column>
        <el-table-column label="当事人">
          <template slot-scope="scope">
            {{scope.row.applicants}}-{{scope.row.respondents}}
          </template>
        </el-table-column>
        <el-table-column prop="caseStatusCn" label="案件状态"></el-table-column>
        <el-table-column prop="submitTime" label="提交时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="text">详情</el-button>
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
      <detailDialog ref="detailDialog"></detailDialog>
      <!-- 新增弹出框 -->
      <addDialog @upload="successCBK" ref="addDialog"></addDialog>
    </div>
  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import addDialog from './modules/addDialog.vue'
  import detailDialog from './modules/detailDialog.vue'
  export default {
    components : {
      timeFrame,
      addDialog,
      detailDialog,
    },
    data() {
      return {
        ruleForm : {
          // 企业名称
          keyWords : '',
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
      // 点击详情
      handleDetail(row) {
        let loading = this.$loading();
        this.$http({
          method : 'post',
          url : '/casemanage/selectCaseDetailByCaseId.htm',
          data : {
            caseId : row.caseId,
          },
        }).then((res) => {
          loading.close();
          this.$refs.detailDialog.show(res.result);
        },(err) => {
          loading.close();
        });
      },
      // 点击新增 案件
      handleAdd() {
        this.$refs.addDialog.show();
      },
      // 新增成功 回调
      successCBK() {
        this.currentPage = 1;
        this.initTableList();
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/casemanage/queryHzCaseByBaseQuery.htm',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            endDate : this.ruleForm.endDate,
            startDate : this.ruleForm.startDate,
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

.case-management{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>