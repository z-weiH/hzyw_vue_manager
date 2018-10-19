<template>
  <div class="ser-business-manage-dialog">
    <el-dialog
      :title="type === 'add' ? '新增模板' : '修改模板'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">

          <el-form-item label="模板ID：" prop="templateId">
						<el-input :disabled="type === 'edit' ? true : false" style="width:400px;" v-model.trim="ruleForm.templateId" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="模板编号：" prop="templateCode">
						<el-input :disabled="type === 'edit' ? true : false" style="width:400px;" v-model.trim="ruleForm.templateCode" placeholder="请输入"></el-input>
					</el-form-item>
          
					<el-form-item label="模板名称：" prop="templateName">
						<el-input style="width:400px;" v-model.trim="ruleForm.templateName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="模板内容：" prop="templateContent">
						<el-input :rows="7" type="textarea" style="width:400px;" v-model.trim="ruleForm.templateContent" placeholder="请输入"></el-input>
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
          // 模板名称
          templateName : '',
          // 模板编码
          templateCode : '',
          // 模板内容
          templateContent : '',
          // 模板ID
          templateId : '',
        },
        rules : {
          templateName : [
            {required : true , message : '请输入模板名称' , trigger : 'blur'},
          ],
          templateCode : [
            {required : true , message : '请输入模板编码' , trigger : 'blur'},
          ],
          templateContent : [
            {required : true , message : '请输入模板内容' , trigger : 'blur'},
          ],
          templateId : [
            {required : true , message : '请输入模板ID' , trigger : 'blur'},
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
            this.templateId = data.templateId;
            // 回显数据
            this.$http({
              method : 'post',
              url : '/templateManagement/queryTemplateInfoDetails.htm',
              data : {
                templateId : data.templateId,
              },
            }).then((res) => {
              this.ruleForm = Object.assign(this.ruleForm,res.result[0]);
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
              form.templateId = this.templateId;
            }
						this.$http({
              method : 'post',
              url : '/templateManagement/saveTemplateInfoByTemplateId.htm',
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
