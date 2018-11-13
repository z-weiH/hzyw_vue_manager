<template>
  <div class="ser-channel-manage-dialog">
    <el-dialog
      :title="type === 'add' ? '新增执行款银行账户' : '修改执行款银行账户'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">

					<el-form-item label="户名：" prop="accountName">
						<el-input style="width:400px;" v-model.trim="ruleForm.accountName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="银行卡号：" prop="accountNumber">
						<el-input @blur="handleBankBlur" style="width:400px;" v-model.trim="ruleForm.accountNumber" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="开户银行：" prop="depositBank">
						<el-input style="width:400px;" v-model.trim="ruleForm.depositBank" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="支行名称：" prop="branchName">
						<el-input style="width:400px;" v-model.trim="ruleForm.branchName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="联行号：" prop="subbranch">
						<el-input style="width:400px;" v-model.trim="ruleForm.subbranch" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="银行地址：" prop="bankAddress">
						<el-input style="width:400px;" v-model.trim="ruleForm.bankAddress" placeholder="请输入"></el-input>
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
          // 户名
          accountName : '',
          // 开户银行
          depositBank : '',
          // 银行卡号
          accountNumber : '',
          // 支行名称
          branchName : '',
          // 联行号
          subbranch : '',
          // 银行地址
          bankAddress : '',
        },
        rules : {
          accountName : [
            {required : true , message : '请输入户名' , trigger : 'blur'},
          ],
          depositBank : [
            {required : true , message : '请输入开户银行' , trigger : 'blur'},
          ],
          accountNumber : [
            {required : true , message : '请输入银行卡号' , trigger : 'blur'},
          ],
        },

        type : '',

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
          this.type = type;
          if(type === 'edit') {
            this.applicantCardId = data.applicantCardId;
            this.ruleForm = Object.assign(this.ruleForm,data);
          }
        });
      },
      // 银行卡号 失去焦点
      handleBankBlur(event) {
        let val = event.target.value;
        this.$http({
          method : 'post',
          url : '/executedProperty/queryBankName.htm',
          data : {
            bankNum : val,
          },
        }).then((res) => {
          this.ruleForm.depositBank = res.result || '';
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
          this.$refs.ruleForm.clearValidate();
				},500);
				
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
            this.submitDisabled = true;
            
            let form = {
              ...this.ruleForm,
            };
            if(this.type === 'edit') {
              form.applicantCardId = this.applicantCardId;
            }else{
              delete form.applicantCardId;
            }
						this.$http({
              method : 'post',
              url : '/applicantBankCard/insertOrUpdateExecutionApplicantBankCardInfo.htm',
              data : form,
            }).then((res) => {
              this.$message.success('操作成功');
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

.ser-channel-manage-dialog{

}

</style>
