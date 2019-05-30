<template>
  <div class="formula-config-dialog">
    <el-dialog
      title="公式配置"
      :visible.sync="dialogVisible"
      width="880px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <div>
          <div class="fr mb-20">
            <el-button @click="handleAdd" size="mini" type="primary">新增</el-button>
          </div>
        </div>
        <el-table
          :data="tableData"
          border
        >
          <el-table-column prop="date" label="序号" width="50px">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="paramName" label="费用名称"></el-table-column>
          <el-table-column prop="feeType" label="类型">
            <template v-slot="scope">
              {{
                scope.row.feeType === 1 ? '费用明细' :
                scope.row.feeType === 2 ? '标的金额' :
                scope.row.feeType === 3 ? '预测仲裁金额' :
                scope.row.feeType === 4 ? '执行标的' : ''
              }}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="配置时间"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button @click="handleEdit(scope.row)" type="text">修改</el-button>
              <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
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
    </el-dialog>

    <formulaDialog ref="formulaDialog"></formulaDialog>
  </div>
</template>

<script>
  import tableMixins from '@/assets/js/tableMixins.js'
  import formulaDialog from './formulaDialog.vue'
  export default {
    mixins : [tableMixins({url : '/execution/queryCalclations.htm' , init : false})],
    components : {formulaDialog},
    data() {
      return {
        dialogVisible : false,
        searchForm : {
          // 1-费用明细；2-标的金额；3-预测仲裁金额；4-执行标的
          feeType : '',
          prodTempId : this.$route.query.prodTempId,
        },
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
          this.reseting();
        });
      },
      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
      },

      handleAdd() {
        this.$refs.formulaDialog.show('add');
      },
      handleEdit(row) {
        this.$refs.formulaDialog.show('edit',row);
      },
      handleDelete(row) {
        this.$confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/execution/deleteFeeCalculation.htm',
            data : {
              calcId : row.calcId,
            },
          }).then((res) => {
            this.$message.success('删除成功');
            this.handleSearch();
          });
        }).catch(() => {});
      },
    },
  }
</script>

<style scoped lang="scss">

.formula-config-dialog{

}

</style>
