<template>
  <div class="ser-business-manage-dialog">
    <el-dialog
      :title="type === 'add' ? '新增客户' : '修改客户'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
          
					<el-form-item label="客户名称：" prop="clientName">
						<el-input style="width:400px;" v-model.trim="ruleForm.clientName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="客户签名：" prop="clientSigner">
						<el-input style="width:400px;" v-model.trim="ruleForm.clientSigner" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="客户信息描述：" prop="clientInfo">
						<el-input type="textarea" style="width:400px;" v-model.trim="ruleForm.clientInfo" placeholder="请输入"></el-input>
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
          // 客户名称
          clientName : '',
          // 客户签名
          clientSigner : '',
          // 客户信息描述
          clientInfo : '',
        },
        rules : {
          clientName : [
            {required : true , message : '请输入客户名称' , trigger : 'blur'},
          ],
          clientSigner : [
            {required : true , message : '请输入客户签名' , trigger : 'blur'},
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
            this.clientId = data.clientId;
            // 回显数据
            this.ruleForm.clientName = data.clientName;
            this.ruleForm.clientSigner = data.clientSigner;
            this.ruleForm.clientInfo = data.clientInfo;
            this.$http({
              method : 'post',
              url : '/clientManagement/queryDeliveryClientInfoDetail.htm',
              data : {
                clientId : data.clientId,
              },
            }).then((res) => {
              this.ruleForm = Object.assign(this.ruleForm,res.result);
            });
          }
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
              form.clientId = this.clientId;
            }
						this.$http({
              method : 'post',
              url : '/clientManagement/saveDeliveryClientInfoByClientId.htm',
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

.ser-business-manage-dialog{

}

</style>
