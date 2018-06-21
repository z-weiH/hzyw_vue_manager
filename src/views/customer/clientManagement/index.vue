<template>
  <div class="client-management">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">

        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入客户名称"></el-input>
        </el-form-item>

        <!-- 时间范围 选择 -->
        <timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
        >
        </timeFrame>

        <el-button @click="handleSearch" type="warning">查询</el-button>

      </el-form>
    </div>
    <div class="item-title">
      客户管理
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
        <el-table-column prop="code" label="客户号"></el-table-column>
        <el-table-column prop="loginName" label="登录账号">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.loginName" placement="top-start">
              <span class="ellipsis" style="max-width:108px;">{{scope.row.loginName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="merchantName" label="客户名称">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.merchantName" placement="top-start">
              <span class="ellipsis" style="max-width:108px;">{{scope.row.merchantName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="法定代表人"></el-table-column>
        <el-table-column prop="idcard" label="社会信息代码"></el-table-column>
        <el-table-column prop="createTime" label="开户时间">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.createTime" placement="top-start">
              <span class="ellipsis" style="max-width:108px;">{{scope.row.createTime}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text">修改</el-button>
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

      <!-- 编辑弹出框 -->
      <editDialog @successCBK="successCBK" ref="editDialog"></editDialog>
    </div>
  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import editDialog from './modules/editDialog.vue'
  export default {
    components : {
      timeFrame,
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
      this.initTableList();
    },
    methods : {
      // 点击搜索
      handleSearch() {
        this.currentPage = 1;
        this.initTableList();
      },

      // 点击修改
      handleEdit(row) {
        this.$http({
          method : 'post',
          url : '/merchant/queryClientManageExtByCustomerId.htm',
          data : {
            code : row.code,
          },
        }).then((res) => {
          this.$refs.editDialog.show(res.result);
        });
      },
      // 修改完成 回调
      successCBK() {
        this.initTableList();
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/merchant/queryMerchantByBaseQuery.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            startDate : this.ruleForm.startDate,
            endDate : this.ruleForm.endDate,
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

<style lang="scss" scoped>

.client-management{
  
}

</style>

<style lang="scss">

.client-management{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>