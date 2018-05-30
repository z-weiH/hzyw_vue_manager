<template>
  <div class="id-card-verfy-dialog">
    <el-dialog
      title="审核意见"
      :visible.sync="dialogVisible"
      width="400px"
      @close="handleClose"
    >
      <div class="m-content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="20px">
          <el-form-item label=" " prop="processResult">
            <el-input placeholder="请输入审核意见" v-model="ruleForm.processResult" />
          </el-form-item>  
        </el-form> 
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,

        ruleForm : {
          // 审核意见
          processResult : '',
        },
        rules : {
          processResult : [
            {required : true , message : '请输入审核意见' }
          ],
        },
        row : {
        },
      }
    },
    methods: {
      show(row) {
        this.dialogVisible = true;
        this.row = row;
      },
      // 点击关闭
      handleClose() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
      },
      // 点击 提交
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$http({
              method : 'post',
              url : '/order/saveVerifyResult.htm',
              data : {
                caseOrderId : this.row.caseOrderId,
                processResult : this.ruleForm.processResult,
              },
            }).then((res) => {
              this.$message.success('操作成功');
              this.handleClose();
              this.$emit('successCBK');
            });
          }
        });
      },
    },
  }
</script>

<style lang="scss">

.id-card-verfy-dialog{
  .el-form-item.is-required .el-form-item__label:before{
    display: none;
  }
}

</style>