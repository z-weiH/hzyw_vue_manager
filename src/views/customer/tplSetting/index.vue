<template>
  <div class="tpl-setting">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">模板设置</a>
    </div>

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

      </el-form>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">客户列表</span>
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
        <el-table-column prop="clientName" label="客户名称">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.clientName" placement="top-start">
              <span class="ellipsis" style="max-width:112px;">{{scope.row.clientName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="loginName" label="账户">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.loginName" placement="top-start">
              <span class="ellipsis" style="max-width:112px;">{{scope.row.loginName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="开户时间">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.createTime" placement="top-start">
              <span class="ellipsis" style="max-width:112px;">{{scope.row.createTime}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="usingCount" label="启用数量"></el-table-column>
        <el-table-column prop="blockCount" label="停用数量"></el-table-column>
        <el-table-column prop="waitingCount" label="待处理数量"></el-table-column>
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
          startDate : '',
          // 结束时间
          endDate : '',
        },

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
      // 点击设置
      handleClick(row) {
        // this.$refs.setDialog.show(row);
        this.$router.push(`tplSettingList?clientCode=${row.clientCode}&templateId=${row.templateId}`);
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/templateSetting/queryTemplateListByBaseQuery.htm',
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

<style lang="scss" scoped>

.tpl-setting{

}

</style>

<style lang="scss">

.tpl-setting{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>