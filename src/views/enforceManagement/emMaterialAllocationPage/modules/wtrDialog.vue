<template>
  <div class="em-material-allocation-page-wtr-dialog">
    <el-dialog
      title="添加委托人"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-table
          :data="tableData"
          border
          @selection-change="handleSelectionChange"
          ref="multipleTable"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column prop="clienteleName" label="委托人名称"></el-table-column>
          <el-table-column prop="corporationName" label="法人"></el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="multipleSelection.length === 0" type="primary" @click="handleSubmit">确 定</el-button>
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
        row : '',

        ruleForm : {

        },
        // 表格数据
        tableData : [],
        multipleSelection: [],

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
          this.row = data;
          this.initTableList();
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;

        setTimeout(() => {
				  this.tableData = [];
        },500);
      },
      // 点击提交
      handleSubmit(submitType) {
        // 提交数据
        this.$http({
          method : 'post',
          url : '/court/addClienteleInfo.htm',
          data : {
            courtId : this.$route.query.courtId,
            clienteleId : this.multipleSelection.map(v => v.clienteleId).join(','),
          },
        }).then((res) => {
          this.$message.success('操作成功');
          this.handleClose();
          this.$emit('successCBK');
        }).catch(() => {
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      // 初始化 表格数据
      initTableList() {
        return this.$http({
          url : '/court/queryAllClienteleInfos.htm',
          method : 'post',
          data : {

          },
        }).then((res) => {
          this.tableData = res.result.list;

          // 设置表格 选中状态
          setTimeout(() => {
            res.result.list.map(v => {
              let len = this.row.filter(v1 => v1.clienteleId === v.clienteleId).length;
              len > 0 && this.$refs.multipleTable.toggleRowSelection(v)
            });
          },0);
        });
      },
    },
  }
</script>

<style scoped lang="scss">

.em-material-allocation-page-wtr-dialog{

}

</style>
