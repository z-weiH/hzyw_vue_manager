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

					<el-form-item label="被执行人：" prop="excutedName">
						<el-input style="width:400px;" v-model.trim="ruleForm.excutedName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="身份证号：" prop="idCard">
						<el-input style="width:400px;" v-model.trim="ruleForm.idCard" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="手机号：" prop="phone">
						<el-input style="width:400px;" v-model.trim="ruleForm.phone" placeholder="请输入"></el-input>
					</el-form-item>
          
          <el-form-item label="银行卡号：" prop="accountName">
						<el-input style="width:400px;" v-model.trim="ruleForm.accountName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="银行名称：" prop="bankName">
						<el-input style="width:400px;" v-model.trim="ruleForm.bankName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="数据来源：" prop="clientName">
            <el-select style="width:400px;" clearable filterable  v-model="ruleForm.clientName" placeholder="请选择" class="chang-item">
              <el-option :label="item.merchantName" :value="item.merchantName" v-for="(item,index) in clientNameOptions" :key="index"></el-option>
            </el-select>
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
          // 被执行人
          excutedName : '',
          // 身份证号
          idCard : '',
          // 手机号
          phone : '',
          // 银行卡号
          accountName : '',
          // 银行名称
          bankName : '',
          // 数据来源
          clientName : '',
        },
        rules : {
          excutedName : [
            {required : true , message : '请输入被执行人' , trigger : 'blur'},
          ],
          idCard : [
            {required : true , message : '请输入身份证号' , trigger : 'blur'},
          ],
          phone : [
            {required : true , message : '请输入手机号' , trigger : 'blur'},
          ],
          accountName : [
            {required : true , message : '请输入银行卡号' , trigger : 'blur'},
          ],
          bankName : [
            {required : true , message : '请输入银行名称' , trigger : 'blur'},
          ],
        },
        // 数据来源 options
        clientNameOptions : [],

        type : '',

      }
    },
    mounted() {
      // 获取数据来源 options
      this.$http({
        method : 'post',
        url : '/case/queryCustomerList.htm',
      }).then((res) => {
        this.clientNameOptions = res.result;
      });
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
            this.propertyId = data.propertyId;
            this.ruleForm = Object.assign(this.ruleForm,data);
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
              form.propertyId = this.propertyId;
            }
						this.$http({
              method : 'post',
              url : '/executedproperty/saveOrUpdateCourtExecutedProperty.htm',
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
