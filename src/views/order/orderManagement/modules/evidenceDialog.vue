<template>
  <div class="order-management-evidence-dialog">
    <el-dialog
      title="提交证据"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleClose"
			ref="dialog"
      :close-on-click-modal="false"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          
          <template v-for="(item,index) in ruleForm.evidenceList">
            <el-row :key="index" class="mb-20">
              <el-col :span="10">
                <el-form-item label="" 
                  :prop="`evidenceList[${index}].file`"
                  :rules="[
                    {required : true , message : '请上传文件' , trigger : 'change'}
                  ]"
                >
                  <div class="upload-box">
                    <el-button @click="handleUploadClick($event,index)">文件上传</el-button>
                    <span style="max-width:85px;vertical-align:middle;" class="ellipsis"
                      :title="item.uploadName"
                    >{{item.uploadName}}</span>
                    <input @change="handleUploadChange($event,index)" :ref="'file' + index" class="fn-hide" type="file" />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="" 
                  :prop="`evidenceList[${index}].fileIds`"
                  :rules="[
                    {required : true , message : '请选择' , trigger : 'change'}
                  ]"
                >
                  <el-select clearable style="width:200px;" v-model="item.fileIds" placeholder="请选择">
                    <el-option :label="item2.name" :value="item2.code" v-for="(item2,index2) in evidenceOption" :key="index2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="2">
                <i 
                  @click="handleAdd"
                  v-if="index === ruleForm.evidenceList.length - 1" 
                  class="el-icon-circle-plus-outline mt-10 cursor"
                ></i> 
              </el-col>
            </el-row>
          </template>

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
  let evidenceListInit = {
    // 文件上传
    file : '',
    // 文件名称
    uploadName : '',
    // 下拉选
    fileIds : '',
  };
  export default {
    data() {
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,
        // 用户token
        token : JSON.parse(localStorage.getItem('loginInfo')).token,

        ruleForm : {
          // 证据 list
          evidenceList : [
            {...evidenceListInit}
          ],
        },
        rules : {
          demo : [
            {required : true , message : '请选择互金企业' , trigger : 'change'},
          ],
        },

        evidenceOption : [],
      }
    },
    mounted() {
      this.$http({
        url : '/ordermanage/queryEvidenceNameSelect.htm',
        method : 'post',
      }).then((res) => {
        this.evidenceOption = res.result;
      });
    },
    methods : {
      show(data,type) {
				this.dialogVisible = true;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });
        this.data = data;
      },

      // 点击文件上传
      handleUploadClick(event,index) {
        this.$refs['file' + index][0].click();
      },
      // 文件上传 change
      handleUploadChange(event,index) {
        let file = event.target.files[0];
        let fileType = file.name.split('.').pop().toLowerCase();
        let arr = ['jpg','png','gif','jpeg','pdf','doc','docx'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return;
        }
        event.target.value = '';
        
        this.ruleForm.evidenceList[index].file = file;
        this.ruleForm.evidenceList[index].uploadName = file.name;
        // 重新校验
        this.$refs.ruleForm.validateField(`evidenceList[${index}].file`);
      },
      // 点击新增
      handleAdd() {
        this.ruleForm.evidenceList.push({...evidenceListInit});
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
          // 重置表单数据
          this.$refs.ruleForm.resetFields();
        },500);
        this.ruleForm.evidenceList = [{...evidenceListInit}];
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            // 提交数据
            let formData = new FormData();
            this.ruleForm.evidenceList.map((v,k) => {
              formData.append(`files`,v.file);
            });
            // 拼接 额外字段
            formData.append('fileIds',this.ruleForm.evidenceList.map(v => v.fileIds).join(','));
            formData.append('clientCode',this.data.merchantCode);
            formData.append('loanbillno',this.data.loanBillNo);
            formData.append('caseOrderId',this.data.caseOrderId);

						this.submitDisabled = true;
						this.$http({
              method : 'post',
              url : '/ordermanage/uploadEvidences.htm',
              data : formData,
              mheaders : true,
            }).then((res) => {
              this.$message.success('提交成功');
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

.order-management-evidence-dialog{
  .el-icon-circle-plus-outline{
    font-size: 20px;
  }
}

</style>
