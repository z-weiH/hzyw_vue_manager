<template>
  <div class="review-case-list-set-dialog">
    <el-dialog
      title="复审人设置"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <p>成都棋子创投网络科技有限公司</p>

          <el-row class="retrial-box">
            <el-col :span="12">
              <div class="line-40">
                <span>骑速贷</span>
              </div>
            </el-col>
            <el-col :span="12">
              <el-form-item label="复审人" prop="accountPeriodType">
                <el-select clearable style="width:150px;" v-model="ruleForm.accountPeriodType" placeholder="请选择复审人">
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in productOptions" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
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

        ruleForm : {
          accountPeriodType : '',
        },
        rules : {
          demo : [
            {required : true , message : '请选择互金企业' , trigger : 'change'},
          ],
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

.review-case-list-set-dialog{
  .line-40{
    line-height: 40px;
  }
  .retrial-box{
    padding: 10px;
  }
}

</style>
