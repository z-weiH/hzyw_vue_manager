<template>
  <div class="re-run-award-case-list-histori-dialog">
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
          <el-table-column prop="failTotal" label="失败数量"></el-table-column>
          <el-table-column prop="operName" label="操作人"></el-table-column>
          <el-table-column prop="total" label="总数量"></el-table-column>
          <el-table-column prop="createTime" label="操作时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleDetail(scope.row)" type="text">查看详细内容</el-button>
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
        <el-button @click="dialogVisible = false" type="primary ">关 闭</el-button>
      </span>
    </el-dialog>

    <detailContentDialog ref="detailContentDialog"></detailContentDialog>
  </div>
</template>

<script>
  import detailContentDialog from './detailContentDialog.vue'
  export default {
    components : {
      detailContentDialog,
    },
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
      }
    },
    mounted() {
      
    },
    methods : {
      show(type,data) {
				this.dialogVisible = true;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          this.initTableList();
        });
      },
      // 查看详细内容
      handleDetail(row) {
        this.$refs.detailContentDialog.show(row);
      },

      // 关闭浮层
      handleClose() {
        this.currentPage = 1;
        this.pageSize = 10;
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/award/queryAwardByBaseQuery.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
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

.re-run-award-case-list-histori-dialog{

}

</style>
