<template>
  <div class="re-run-award-case-list-detail-content-dialog">
    <el-dialog
      title="历史记录"
      :visible.sync="dialogVisible"
      width="900px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-table
          :data="tableData"
          border
        >
          <el-table-column prop="date" label="序号" width="50px">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="caseNoWz" label="仲裁案号"></el-table-column>
          <el-table-column prop="createTime" label="重跑时间"></el-table-column>
          <el-table-column prop="loadDesc" label="结果"></el-table-column>
          <el-table-column prop="loadStatus" label="处理状态">
            <template slot-scope="scope">
              {{
                scope.row.loadStatus === 0 ? '待处理' :
                scope.row.loadStatus === 1 ? '成功' :
                scope.row.loadStatus === 2 ? '失败' : ''
              }}
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

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary ">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,

        // 表格数据
        tableData : [],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
        
        parentId : '',
      }
    },
    mounted() {

    },
    methods : {
      show(data) {
        this.dialogVisible = true;
        this.parentId = data.parentId;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          this.initTableList();
        });
      },

      // 关闭浮层
      handleClose() {
        
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/award/queryAwardDetailByBaseQuery.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            parentId : this.parentId,
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

<style scoped lang="scss">

.re-run-award-case-list-detail-content-dialog{

}

</style>

