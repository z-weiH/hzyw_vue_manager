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
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-table border :data="ruleForm.tableData">
            <el-table-column align="center" label="序号" width="50px">
              <div class="m-radio" slot-scope="scope">
                <el-radio @change="handleRadioChange(scope.$index)" v-model="scope.row.radio" label="1">
                  <span class="fn-hide">无意义</span>
                </el-radio>
              </div>
            </el-table-column>
            <el-table-column label="证据编码">
              <template slot-scope="scope">
                {{scope.row.eviNum}},{{scope.row.eviCode}},{{scope.row.eviTitle}}
              </template>
            </el-table-column>
          </el-table>

          <el-form-item label=" " prop="evidenceNameInput">
            <el-input class="mt-20" style="width:400px;" v-model.trim="ruleForm.evidenceNameInput" placeholder="请输入证据名称"></el-input>
          </el-form-item>

          <el-form-item label=" " prop="signStatus">
            <el-select class="mt-20" clearable style="width:400px;" v-model="ruleForm.signStatus" placeholder="请选择签章读取">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
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

        ruleForm : {
          // 签章是否读取 0:不读取,1:读取
          signStatus : 0,
          // 证据名称
          evidenceNameInput : '',
          tableData : [
            /* {
              // 证据 id
              baseId : '',
              // 证据 编码
              eviCode : '',
              // 证据 号
              eviNum : '',
              // 证据 名称
              eviTitle : '',
            } */
          ],
        },
        rules : {
          evidenceNameInput : [
            {required : true , message : '请输入证据名称' , trigger : 'blur'},
          ],
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

        // 获取证据列表
        this.$http({
          url : '/eviConfigure/baseEviList.htm',
          method : 'post',
        }).then((res) => {
          // 默认选中第一个
          res.result[0].radio = '1';
          this.ruleForm.tableData = res.result;
        });
      },
      
      // 单选change
      handleRadioChange(index) {
        this.ruleForm.tableData = this.ruleForm.tableData.map((v,k) => {
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
        this.$refs.ruleForm.resetFields();
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            // 提交数据
            this.submitDisabled = true;
            let data = {
              ...this.ruleForm,
            };
            // 获取选中的数据
            data.tableDataActive = this.ruleForm.tableData.filter((v,k) => {
              return v.radio === '1'
            })[0];
            this.$emit('successCBK',this.index,data);
            this.handleClose();
          }
        });
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
  .el-form-item{
    margin-bottom: 0;
  }
  .el-form-item.is-required .el-form-item__label{
    display: none;
  }
}

</style>