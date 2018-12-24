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

          <el-form-item label="证明对象：" prop="eviObject">
            <el-input :autosize="{ minRows: 3}" type="textarea" placeholder="请输入证明对象" v-model="ruleForm.eviObject"></el-input>
          </el-form-item>

          <p class="m-border"></p>

          <div v-for="(item,index) in ruleForm.details" :key="index">
            <el-form-item label="证据名称：" 
              :prop="`details[${index}].eviTitle`"
              :rules="[
                {required : true , message : '请输入证据名称' , trigger : 'blur'},
              ]"
            >
              <el-input placeholder="请输入证据名称" v-model="item.eviTitle"></el-input>
            </el-form-item>

            <el-form-item label="证据来源："
              :prop="`details[${index}].eviSource`"
              :rules="[
                {required : true , message : '请输入证据来源' , trigger : 'blur'},
              ]"
            >
              <el-input placeholder="请输入证据来源" v-model="item.eviSource"></el-input>
            </el-form-item>

            <el-form-item label="证据格式："
              :prop="`details[${index}].eviFormat`"
              :rules="[
                {required : true , message : '请选择格式' , trigger : 'change'},
              ]"
            >
              <el-select v-model="item.eviFormat" placeholder="请选择">
                <el-option label="图片" value="PNG"></el-option>
                <el-option label="PDF" value="PDF"></el-option>
                <el-option label="文档" value="DOC"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="证据页数："
              :prop="`details[${index}].eviPage`"
              :rules="[
                {required : true , message : '请输入证据页数' , trigger : 'blur'},
              ]"
            >
              <el-input type="number" placeholder="请输入证据页数" v-model="item.eviPage"></el-input>
            </el-form-item>

            <el-form-item label="上传证据："
              :prop="`details[${index}].eviFileurl`"
              :rules="[
                {required : true , message : '请上传证据' , trigger : 'blur'},
              ]"
            >
              <el-upload
                class="upload-demo"
                :action="`${$host}/file/upload.htm`"
                :show-file-list="false"
                :before-upload="evidenceBefore"
                :on-success="(response, file, fileList) => {evidenceSuccess(response, file, fileList,index)}"
                :on-error="fileError"
                :data="{
                  path : 'case/evidence',
                  token : token,
                }"
              >
                <el-button size="mini" icon='el-icon-upload'>
                  上传证据
                </el-button>
                {{item.evidence}}
              </el-upload>
            </el-form-item>

            <el-form-item class="hidden"  label=" " :prop="`details[${index}].evidence`"></el-form-item>

            <p v-if="index !== ruleForm.details.length - 1" class="m-border"></p>
          </div>

          <el-button @click="handleAddEvidence" size="mini" type="primary" class="ml-10">新增证据</el-button>
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
  import {objDeepCopy} from '@/assets/js/tool'
  let detailsInit = {
    // 证据名称
    eviTitle : '',
    // 证据来源
    eviSource : '',
    // 形式
    eviFormat : '',
    // 页数
    eviPage : '',
    // 证据链接
    eviFileurl : '',
    // 上传证据文件名
    evidence : '',
    // 排序
    sortNum : 1,
  };
  export default {
    data() {
      return {
        type : '',
        rowIndex : '',
        dialogVisible : false,
        // 用户token
        token : JSON.parse(localStorage.getItem('loginInfo')).token,

        ruleForm : {
          // 证明对象
          eviObject : '',
          // 新增证据 list
          details : [
            {...detailsInit},
          ],
        },
        rules : {
          eviObject : [
            {required : true , message : '请输入证明对象' , trigger : 'blur'},
          ],
        },
      }
    },
    methods : {
      show(type,row,index) {
        this.dialogVisible = true;

        // 回显数据
        if(type === 'edit') {
          this.type = 'edit';
          this.rowIndex = index;
          this.ruleForm = JSON.parse(JSON.stringify(row));
        }else{
          this.type = 'add';
        }
      },

      // 点击 新增证据
      handleAddEvidence() {
        let arr = {...detailsInit};
        arr.sortNum = this.ruleForm.details[this.ruleForm.details.length-1].sortNum + 1;
        this.ruleForm.details.push(arr);
      },

      handleClose() {
        this.dialogVisible = false;
        // 还原循环数据
        this.ruleForm.details = [{...detailsInit}];

        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields();
        });
      },
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            let data = {...this.ruleForm};
            data.details = objDeepCopy(this.ruleForm.details);
            this.handleClose();
            this.$emit('successCBK',{
              ...data,
              type : this.type,
              rowIndex : this.rowIndex,
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
      evidenceSuccess(response, file, fileList,index) {
        this.ruleForm.details[index].eviFileurl = response.result;
        this.ruleForm.details[index].evidence = file.name;
        /* 重新校验 */
        this.$refs.ruleForm.validateField(`details[${index}].eviFileurl`);
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
  .m-border{
    border-bottom: 1px dashed #ccc;
    margin-bottom: 20px;
  }
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