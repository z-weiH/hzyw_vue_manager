<template>
  <div class="contract-deduction-audit-examine-dialog">
    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      width="580px"
			ref="dialog"
      @close="handleClose"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <div class="item">
            <span class="item-label">客户名称：</span>
            <span class="item-value">{{ruleForm.clientName}}</span>
          </div>

          <div class="item">
            <span class="item-label">类型：</span>
            <span class="item-value">{{ruleForm.deductionType === 0 ? '扣除仲券' : ruleForm.deductionType === 1 ? '扣除仲裁费' : '扣除服务费'}}</span>
          </div>

          <div class="item">
            <span class="item-label">扣除数目：</span>
            <span class="item-value">
              {{
                ruleForm.deductionType === 0 ? ruleForm.deductionTicket : ruleForm.deductionAmt
              }}
            </span>
          </div>

          <div class="item">
            <span class="item-label">扣除说明：</span>
            <span class="item-value">{{ruleForm.deductionDesc}}</span>
          </div>

          <div class="bar"></div>

          <el-form-item label="审核状态:" prop="deductionStatus">
            <el-select v-model="ruleForm.deductionStatus" clearable placeholder="请选择">
              <el-option label="已扣款" :value="1"></el-option>
              <el-option label="未通过" :value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审核结果:" prop="verifyDesc">
            <el-input :autosize="{ minRows: 5, maxRows: 5}" type="textarea" v-model="ruleForm.verifyDesc" />
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
        submitDisabled : false,
        row : '',
        ruleForm : {
          // 审核状态
          deductionStatus : '',
          // 审核结果
          verifyDesc : '',
        },
        rules : {
          deductionStatus : [
            {required : true , message : '请选择审核状态' , trigger : 'change'},
          ],
          verifyDesc : [
            {required : true , message : '请输入审核结果' , trigger : 'blur'},
          ],
        },
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
          this.$http({
            url : '/dedution/queryContractDedutionDetail.htm',
            method : 'post',
            data : {
              deductionId : data.deductionId,
            },
          }).then(res => {
            if(res.result.contractDeduction) {
              delete res.result.contractDeduction.deductionStatus;
            }
            let obj = Object.assign(this.ruleForm,res.result.contractDeduction || {},res.result.verifyInfo || {});
            this.$set(this.ruleForm,obj);
          });
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;

        setTimeout(() => {
          // 取消按钮禁用
          this.submitDisabled = false;
          // 重置表单数据
          this.ruleForm = {};
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
              url : '/dedution/contractDedutionVerify.htm',
              data : {
                deductionId : this.row.deductionId,
                deductionStatus : this.ruleForm.deductionStatus,
                verifyDesc : this.ruleForm.verifyDesc,
              },
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

.contract-deduction-audit-examine-dialog{
  .item{
    margin-bottom: 10px;
    .item-label{
      width: 80px;
      display: inline-block;
      text-align: right;
    }
    .item-value{
      width: 450px;
      display: inline-block;
      word-wrap: break-word;
      word-break: normal;
      word-break:break-all;
      vertical-align: top;
    }
  }
  .bar{
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }
}

</style>
