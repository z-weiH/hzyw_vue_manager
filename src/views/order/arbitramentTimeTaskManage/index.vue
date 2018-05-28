<template>
  <div class="arbitrament-time-task-manage">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">

        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入参数"></el-input>
        </el-form-item>

        <el-form-item label=" " prop="busiCode">
          <el-select clearable v-model="ruleForm.busiCode" placeholder="请选择业务">
            <el-option label="请选择业务编码" value=""></el-option>
            <template v-for="(item) in busiCodeOptions">
              <el-option 
                :key="item.busiCode" 
                :label="item.busiCode" 
                :value="item.busiCode"
              >
              </el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label=" " prop="isProcessed">
          <el-select clearable v-model="ruleForm.isProcessed" placeholder="处理状态">
            <el-option label="请选择" value=""></el-option>
            <template v-for="(item) in processingStateOptions">
              <el-option 
                :key="item.value" 
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
            <el-button @click="handleDetail(scope.row)" type="text">{{scope.row.fullName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="busiCode" label="业务编码"></el-table-column>
        <el-table-column prop="params" label="参数" width="280px"></el-table-column>
        <el-table-column label="处理状态">
          <template slot-scope="scope">
            {{
              scope.row.isProcessed === 0 ? '待处理':
              scope.row.isProcessed === 2 ? '处理失败': 
              scope.row.isProcessed === 3 ? '处理中' : '处理成功'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="requireTime" label="请求时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 待处理 or 处理失败有 重发按钮 -->
            <template v-if="scope.row.isProcessed === 0 || scope.row.isProcessed === 2">
              <el-button @click="handleReset(scope.row)" type="text">重发</el-button>
            </template>
            <template v-else>
              --
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
          isProcessed : '',
          // 参数
          keyWords : '',
          // 业务编码
          busiCode : '',
        },

        // 业务编码 options
        busiCodeOptions : [
          {busiCode : '业务1' , busiCode : '业务1'},
          {busiCode : '业务2' , busiCode : '业务2'}
        ],
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
      // 获取业务编码
      this.$http({
        method : 'post',
        url : '/order/queryByBusiCode.htm',
      }).then((res) => {
        this.busiCodeOptions = res.result;
      });
    },
    methods : {
      // 点击搜索
      handleSearch() {
        this.initTableList();
      },
      // 点击重发
      handleReset(row) {
        this.$http({
          method : 'post',
          url : '/order/updateByHzTaskerIdPrimaryKey.htm',
          data : {
            taskerId : row.taskerId,
          },
        }).then((res) => {
          this.$message.success('操作成功');
          this.currentPage = 1;
          this.initTableList();
        });
      },
      // 点击查看详情，明细
      handleDetail(row) {
        this.$http({
          method : 'post',
          url : '/order/queryByPrimaryKey.htm',
          data : {
            taskerId : row.taskerId,
          },
        }).then((res) => {
          this.$refs.timedTaskDetail.show(res.result);
        });
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/order/queryTaskerInfoByBaseQuery.htm',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            keyWords : this.ruleForm.keyWords,
            isProcessed : this.ruleForm.isProcessed,
            busiCode : this.ruleForm.busiCode,
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