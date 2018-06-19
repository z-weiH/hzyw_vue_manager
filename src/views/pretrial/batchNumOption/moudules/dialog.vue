<template>
  <div class="batch-num-option-dialog">
    <el-dialog
      title="子批次数量设置"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleClose"
    >
      <div class="m-content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
          
          <el-form-item label="子批次数量：" prop="subBatchCount">
            <el-input style="width:300px;" v-model="ruleForm.subBatchCount" />件
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
          // 数量
          subBatchCount : '',
        },
        rules : {
          subBatchCount : [
            {required :true , message : '请输入子批次数量' , trigger : 'blur'},
            {pattern : /^[1-9]\d*$/ , message : '格式有误' , trigger : 'blur'},
          ],
        },

        // 主键 id
        batchId : '',
      }
    },
    methods : {
      show(row) {
        this.dialogVisible = true;

        // 回显数据
        this.ruleForm.subBatchCount = row.subBatchCount;
        this.batchId = row.batchId;
      },
      // 点击关闭
      handleClose() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
      },
      // 点击 提交
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.$http({
              method : 'post',
              url : '/reason/updatePreBatch.htm',
              data : {
                batchId : this.batchId,
                subBatchCount : this.ruleForm.subBatchCount,
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

<style lang="scss" scoped>

.batch-num-option-dialog{

}

</style>