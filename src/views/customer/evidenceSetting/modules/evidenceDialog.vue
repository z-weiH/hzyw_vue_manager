<template>
  <div class="evidence-setting-evidence-dialog">
    <el-dialog
      title="新增证据"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div style="width:400px;margin:0 auto;" class="m-conetnt">
        <el-table border :data="ruleForm.tableData">
          <el-table-column align="center" label="序号" width="50px">
            <div class="m-radio" slot-scope="scope">
              <el-radio @change="handleRadioChange(scope.$index)" v-model="scope.row.radio" label="1">
                <span class="fn-hide">无意义</span>
              </el-radio>
            </div>
          </el-table-column>
          <el-table-column prop="caseId" label="证据编号"></el-table-column>
        </el-table>

        <el-input class="mt-20" style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入证据名称"></el-input>

        <el-select class="mt-20" clearable style="width:400px;" v-model="ruleForm.accountPeriodType" placeholder="请选择签章读取">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="2"></el-option>
        </el-select>
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
          tableData : [{radio : ''},{radio : ''}],
        },
        rules : {

        },

        index : '',
      }
    },
    mounted() {

    },
    methods : {
      show(index) {
        this.dialogVisible = true;
        this.index = index;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });
      },
      
      // 单选change
      handleRadioChange(index) {
        this.tableData = this.ruleForm.tableData.map((v,k) => {
          v.radio = '';
          if(k === index) {
            v.radio = '1'
          }
          return v;
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
      },
      // 点击提交
      handleSubmit(submitType) {
        // 校验

        // 提交数据
        this.submitDisabled = true;
        this.$emit('successCBK',this.index,this.ruleForm);
        this.handleClose();
      },
    },
  }
</script>

<style lang="scss">

.evidence-setting-evidence-dialog{
  .el-table .has-gutter > tr > th{
    padding: 0;
  }
  .m-radio{
    margin-left: 8px;
  }
}

</style>