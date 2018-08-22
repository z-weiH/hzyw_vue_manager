<template>
  <div class="order-management-batch-upload-dialog">
    <el-dialog
      title="批量上传证据"
      :visible.sync="dialogVisible"
      width="400px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          
					<el-form-item label="客户：" prop="clientCode">
            <el-select clearable style="width:200px;" v-model="ruleForm.clientCode" placeholder="请选择客户">
              <el-option :label="item.merchantName" :value="item.code" v-for="(item,index) in $parent.merchantOptions" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文件上传：" prop="compressFile">
            <div class="upload-box">
              <el-button @click="handleUploadClick">文件上传</el-button>
              <span style="max-width:150px;vertical-align:middle;" class="ellipsis"
                :title="ruleForm.uploadName"
              >{{ruleForm.uploadName}}</span>
              <input @change="handleUploadChange" ref="file" class="fn-hide" type="file" />
            </div>
          </el-form-item>

          <el-form-item class="fn-hide" label="" prop="uploadName"></el-form-item>
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
          // 客户号
          clientCode : '',
          // 文件流
          compressFile : '',
          // 上传文件名
          uploadName : '',
        },
        rules : {
          clientCode : [
            {required : true , message : '请选择客户' , trigger : 'change'},
          ],
          compressFile : [
            {required : true , message : '请上传文件' , trigger : 'change'},
          ],
        },

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

      // 点击文件上传
      handleUploadClick(event) {
        this.$refs.file.click();
      },
      // 文件上传 change
      handleUploadChange(event) {
        let file = event.target.files[0];
        let fileType = file.name.split('.').pop().toLowerCase();
        let arr = ['zip','rar','7z','cab'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return;
        }
        event.target.value = '';
        
        this.ruleForm.compressFile = file;
        this.ruleForm.uploadName = file.name;
        // 重新校验
        this.$refs.ruleForm.validateField('compressFile');
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
            let loading = this.$loading({text : '上传中'});
            let formData = new FormData();
            formData.append('compressFile',this.ruleForm.compressFile);
            formData.append('clientCode',this.ruleForm.clientCode);
						this.$http({
              method : 'post',
              url : '/ordermanage/uploadEvidencesCompress.htm',
              data : formData,
              mheaders : true,
            }).then((res) => {
              this.$message.success('提交成功');
              loading.close();
              this.handleClose();
            }).catch(() => {
              this.submitDisabled = false;
              loading.close();
            });
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">

.order-management-batch-upload-dialog{
  .el-form-item{
    margin-bottom: 20px!important;
  }
}

</style>
