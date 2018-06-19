<template>
  <div class="idea-hear-option-dialog">
    <el-dialog
      :title="status === 'add' ? '添加审核意见' : '修改审核意见'"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleClose"
    >
      <div class="m-content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="模块：">
            {{
              type === '0' ? '身份证审核' :
              type === '1' ? '签名意见' :
              type === '2' ? '证据意见' : ''
            }}
          </el-form-item>
          
          <el-form-item label="审核意见" prop="reasonMsg">
            <el-input type="textarea" v-model="ruleForm.reasonMsg" />
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props : {
      type : String,
    },
    data() {
      return {
        dialogVisible : false,
        status : 'add', // add or edit

        ruleForm : {
          // 审核意见
          reasonMsg : '',
        },
        rules : {
          reasonMsg : [
            {required : true , message : '请输入审核意见' , trigger : 'blur'}
          ],
        },
        reasonId : '',
      }
    },
    methods : {
      show(type,row) {
        this.status = type;
        this.dialogVisible = true;
        if(type === 'edit'){
          this.reasonId = row.reasonId;
          this.ruleForm.reasonMsg = row.reasonMsg;
        }else{
          this.reasonId = '';
        }
      },
      // 点击关闭
      handleClose() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
      },
      // 点击 提交
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.$http({
              method : 'post',
              url : '/reason/addCause.htm',
              data : {
                reasonMsg : this.ruleForm.reasonMsg,
                reasonType : this.type,
                reasonId : this.reasonId,
              },
            }).then((res) => {
              this.$message.success('操作成功');
              this.handleClose();
              this.$emit('successCBK');
            });
          }
        });
      },
    },
  }
</script>

<style lang="scss" scoped>

.idea-hear-option{

}

</style>