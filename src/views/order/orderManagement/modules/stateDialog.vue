<template>
  <div class="order-management-state">
    <el-dialog
      title="状态返回"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="170px">
          
					<el-form-item label="推送失败原因：" prop="failReason">
						<el-input style="width:100%;" v-model.trim="ruleForm.failReason" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="是否推送客户标志位：" prop="notifyClient">
						<el-radio-group v-model="ruleForm.notifyClient">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
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
    data() {
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,

        ruleForm : {
          // 推送失败原因
          failReason : '',
          // 是否推送客户标志位 0否 1是
          notifyClient : 1,
        },
        rules : {
          failReason : [
            {required : true , message : '请输入推送失败原因' , trigger : 'blur'},
          ],
        },

        // 案件订单id
        caseOrderId : '',
      }
    },
    mounted() {

    },
    methods : {
      show(data) {
				this.dialogVisible = true;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题

          // 案件订单id
          this.caseOrderId = data.caseOrderId;
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
				},500);
				// 重置表单数据
        this.$refs.ruleForm.resetFields();
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
						this.submitDisabled = true;
						this.$http({
              method : 'post',
              url : '/ordermanage/updateOrderStatus.htm',
              data : {
                caseOrderId : this.caseOrderId,
                failReason : this.ruleForm.failReason,
                notifyClient : this.ruleForm.notifyClient,
              },
            }).then((res) => {
              this.$message.success('操作成功');
              this.handleClose();
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

.order-management-state{
  .el-form-item{
    margin-bottom: 22px!important;
  }
}

</style>
