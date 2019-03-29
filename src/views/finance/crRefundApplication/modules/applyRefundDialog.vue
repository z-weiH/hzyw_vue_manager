<template>
  <div class="cr-refund-application-apply-refund-dialog">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="top" class="ml-10">
          
					<el-form-item label="填写申请退券理由：" prop="refundReason">
						<el-input :autosize="{ minRows: 3, maxRows: 3}" style="width:440px;" type="textarea" v-model.trim="ruleForm.refundReason" placeholder="请输入"></el-input>
					</el-form-item>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name : 'applyRefundDialog',
    data() {
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,

        ruleForm : {
          // 	退券原因
          refundReason : '',
        },
        rules : {
          refundReason : [
            {required : true , message : '请输入填写申请退券理由' , trigger : 'blur'},
          ],
        },
        row : '',
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
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        
        setTimeout(() => {
          // 取消按钮禁用
          this.submitDisabled = false;
          // 重置表单数据
          this.$refs.ruleForm.resetFields();
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
          });
				},500);
				
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
						this.submitDisabled = true;
						this.$http({
              method : 'post',
              url : '/ticketRefund/saveTicketRefundApply.htm',
              data : {
                ...this.row,
                refundReason : this.ruleForm.refundReason,
              },
            }).then((res) => {
              this.$message.success('已提交申请');
              this.handleClose();
              this.$emit('successCBK');
            }).catch(() => {
              this.submitDisabled = false;
            });
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">

.cr-refund-application-apply-refund-dialog{

}

</style>
