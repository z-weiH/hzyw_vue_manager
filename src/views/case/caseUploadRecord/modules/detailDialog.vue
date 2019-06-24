<template>
  <div class="case-upload-record-detail-dialog">
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="880px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-table
          :data="tableData"
          border
        >
          <el-table-column prop="loanBillNo" label="单号"></el-table-column>
          <el-table-column prop="detailStatus" label="处理状态">
            <template v-slot="scope">
              {{
                scope.row.detailStatus === 0 ? '待处理' :
                scope.row.detailStatus === 1 ? '处理成功' :
                scope.row.detailStatus === 2 ? '处理失败' :
                scope.row.detailStatus === 3 ? '处理中' : ''
              }}
            </template>
          </el-table-column>
          <el-table-column prop="detailResult" label="处理结果说明">
            <template v-slot="scope">
              {{
                scope.row.detailResult || '--'
              }}
            </template>
          </el-table-column>
          <el-table-column prop="operName" label="操作人">
            <template v-slot="scope">
              {{
                scope.row.operName || '--'
              }}
            </template>
          </el-table-column>
          <el-table-column prop="operTime" label="操作时间">
            <template v-slot="scope">
              {{
                scope.row.operTime || '--'
              }}
            </template>
          </el-table-column>
          <el-table-column prop="operTime" label="操作时间">
            <template v-slot="scope">
              <el-button @click="handleNotice('sign',scope.row)" type="text">通知</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          ref="pagination"
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
        <el-button :disabled="submitDisabled" type="primary" @click="handleNotice('all')">通知全部</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,
        row : '',

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
      show(data) {
        this.dialogVisible = true;
        this.row = data;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          this.$refs.pagination.internalPageSize = 10;
          this.currentPage = 1;
          this.initTableList();
        });
      },
      handleNotice(type,row) {
        let sendDate = {};
        if(type === 'sign') {
          sendDate.detailIds = [row.detailId];
        }else{
          sendDate.recordId = this.row.recordId;
        }
        // 提交数据
        this.submitDisabled = true;
        this.$http({
          method : 'post',
          url : '/caseupload/caseNotify.htm',
          data : sendDate,
          mheaders : true,
        }).then((res) => {
          this.submitDisabled = false;
          this.$message.success('操作成功');
          this.initTableList();
        }).catch(() => {
          this.submitDisabled = false;
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        
        setTimeout(() => {
          // 取消按钮禁用
          this.submitDisabled = false;
				},500);
				
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        return this.$http({
          url : '/caseupload/queryCaseUploadDetailList.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,

            recordId : this.row.recordId,
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

.case-upload-record-detail-dialog{

}

</style>
