<template>
  <div class="case-management-add-evidence-dialog">
    <el-dialog
      title="新增证据"
      :visible.sync="dialogVisible"
      width="450px"
      @close="handleClose"
    >
      <div class="m-content">
        <el-form label-width="100px" ref="ruleForm" :model="ruleForm" :rules="rules">

          <el-form-item label="证据名称：" prop="eviTitle">
            <el-input placeholder="请输入证据名称" v-model="ruleForm.eviTitle"></el-input>
          </el-form-item>

          <el-form-item label="证据来源：" prop="eviSource">
            <el-input placeholder="请输入证据来源" v-model="ruleForm.eviSource"></el-input>
          </el-form-item>

          <el-form-item label="证据格式：" prop="eviFormat">
            <el-select v-model="ruleForm.eviFormat" placeholder="请选择">
              <el-option label="图片" value="图片"></el-option>
              <el-option label="PDF" value="PDF"></el-option>
              <el-option label="DOC" value="DOC"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="证据页数：" prop="eviPage">
            <el-input type="number" placeholder="请输入证据页数" v-model="ruleForm.eviPage"></el-input>
          </el-form-item>

          <el-form-item label="上传证据：" prop="eviFileurl">
            <el-upload
              class="upload-demo"
              action="/file/upload.htm"
              :show-file-list="false"
              :before-upload="evidenceBefore"
              :on-success="evidenceSuccess"
              :on-error="fileError"
              :data="{
                path : 'case/evidence'
              }"
            >
              <el-button size="mini" icon='el-icon-upload'>
                上传证据
              </el-button>
              {{ruleForm.evidence}}
            </el-upload>
          </el-form-item>

          <el-form-item label="证明对象：" prop="eviObject">
            <el-input :autosize="{ minRows: 3}" type="textarea" placeholder="请输入证明对象" v-model="ruleForm.eviObject"></el-input>
          </el-form-item>

          <el-form-item class="hidden"  label=" " prop="evidence"></el-form-item>

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
    data() {
      return {
        dialogVisible : false,

        ruleForm : {
          // 证据名称
          eviTitle : '',
          // 证据来源
          eviSource : '',
          // 形式
          eviFormat : '',
          // 页数
          eviPage : '',
          // 证明对象
          eviObject : '',
          // 证据链接
          eviFileurl : '',
          // 证据上传 名称
          evidence : '',
        },
        rules : {
          eviTitle : [
            {required : true , message : '请输入证据名称' , trigger : 'blur'},
          ],
          eviSource : [
            {required : true , message : '请输入证据来源' , trigger : 'blur'},
          ],
          eviFormat : [
            {required : true , message : '请选择格式' , trigger : 'change'},
          ],
          eviPage : [
            {required : true , message : '请输入页数' , trigger : 'blur'},
          ],
          eviObject : [
            {required : true , message : '请输入证明对象' , trigger : 'blur'},
          ],
          eviFileurl : [
            {required : true , message : '请上传链接' , trigger : 'change'},
          ],
        },
      }
    },
    methods : {
      show() {
        this.dialogVisible = true;
      },

      handleClose() {
        this.dialogVisible = false;
        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields();
        });
      },
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.handleClose();
            this.$emit('successCBK',{
              ...this.ruleForm
            });
          }
        });
      },

      /* 上传证据 上传前 */
      evidenceBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['jpg','png','gif','jpeg','pdf','doc','docx'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      /* 上传证据 上传成功 */
      evidenceSuccess(response, file, fileList) {
        this.ruleForm.eviFileurl = response.result;
        this.ruleForm.evidence = file.name;
        /* 重新校验 */
        this.$refs.ruleForm.validateField('eviFileurl');
      },
      /* 文件上传失败 回调 */
      fileError() {
        this.$message.error('文件上传失败，请稍后重试');
      },
    },
  }
</script>

<style lang="scss">

.case-management-add-evidence-dialog{
  .el-dialog__body{
    padding: 30px 20px!important;
  }
  .el-input , .el-textarea{
    width: 300px;
  }
  .el-form-item{
    margin-bottom: 22px;
  }
  .el-form-item.is-required .el-form-item__label:before{
    opacity: 1;
  }
}

</style>