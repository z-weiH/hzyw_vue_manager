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
          
					<el-form-item :label="labelKey + '：'" prop="keyWords"
            :rules="[
              {required : true , message : '请输入' + labelKey , trigger : 'blur'},
            ]"
          >
						<el-input style="width:400px;" v-model.trim="ruleForm.keyWords" placeholder="请输入"></el-input>
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
        // 当前状态
        currentType : '',

        ruleForm : {
          // input 输入
          keyWords : '',
        },
        rules : {

        },
      }
    },
    computed : {
      labelKey() {
        return (
          this.currentType === 1 ? '标的金额' :
          this.currentType === 2 ? '预测仲裁金额' :
          this.currentType === 3 ? '执行标的' : ''
        )
      },
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
        this.currentType = type;
        console.log(data);
        // 回显输入
        this.$nextTick(() => {
          if(this.currentType === 1) {
            this.ruleForm.keyWords = data.bidAmt;
          }else if(this.currentType === 2) {
            this.ruleForm.keyWords = data.forecastAmt;
          }else if(this.currentType === 3) {
            this.ruleForm.keyWords = data.executeAmt;
          }
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
            let data = {
              prodTempId : this.$route.query.prodTempId,
            };
            // 根据不同状态 提交不同参数数据
            if(this.currentType === 1) {
              data.bidAmt = this.ruleForm.keyWords;
            }else if(this.currentType === 2) {
              data.forecastAmt = this.ruleForm.keyWords;
            }else if(this.currentType === 3) {
              data.executeAmt = this.ruleForm.keyWords;
            }
						this.$http({
              method : 'post',
              url : '/templateSetting/updateTemplateDetailByProdTempId.htm',
              data : data,
            }).then((res) => {
              this.$message.success('设置成功');
              this.$emit('successCBK');
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

.tplSetting-edit-set-dialog{

}

</style>
