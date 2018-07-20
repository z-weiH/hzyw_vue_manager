<template>
  <div class="tplSetting-edit-set-dialog">
    <el-dialog
      title="设置"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px">
          
					<el-form-item :label="labelKey + '：'" prop="demo"
            :rules="[
              {required : true , message : '请输入' + labelKey , trigger : 'blur'},
            ]"
          >
						<el-input style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入"></el-input>
					</el-form-item>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit">确 定</el-button>
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
        // 提交按钮禁用状态
        submitDisabled : false,
        // 字段 label
        labelKey : '',

        ruleForm : {

        },
        rules : {

        },

        // 产品 options
        productOptions : [
          {label : '产品1' , value : '产品1'}
        ],
      }
    },
    mounted() {

    },
    methods : {
      show(data,type) {
				this.dialogVisible = true;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        if(type === 1) {
          this.labelKey = '标的金额';
        }else if(type === 2) {
          this.labelKey = '预测仲裁金额';
        }else if(type === 3) {
          this.labelKey = '执行标的';
        }
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
              url : '/preCaseLib/distributeCaseByDistributeCaseQuery.htm',
              data : data,
            }).then((res) => {
              this.$message.success('分配成功');
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

.tplSetting-edit-set-dialog{

}

</style>
