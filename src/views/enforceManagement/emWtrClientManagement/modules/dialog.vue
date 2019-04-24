<template>
  <div class="em-wtr-client-management-dialog">
    <el-dialog
      :title="type === 'add' ? '添加委托人' : '修改委托人'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">

					<el-form-item label="委托人名称：" prop="clienteleName">
						<el-input style="width:400px;" v-model.trim="ruleForm.clienteleName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="通信地址：" prop="address">
						<el-input style="width:400px;" v-model.trim="ruleForm.address" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="法人：" prop="corporationName">
						<el-input style="width:400px;" v-model.trim="ruleForm.corporationName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="法人职务：" prop="corporationPosition">
						<el-input style="width:400px;" v-model.trim="ruleForm.corporationPosition" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="联系电话：" prop="corporationPhone">
						<el-input style="width:400px;" v-model.trim="ruleForm.corporationPhone" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="统一社会信用代码：" prop="creditCode" label-width="200px">
						<el-input style="width:320px;" v-model.trim="ruleForm.creditCode" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="法人身份证正反面照片：" prop="corporationIdcard" label-width="200px">
            <el-upload
              accept=".PDF,.pdf"
              class="upload-demo"
              :action="`${$host}/file/upload.htm`"
              :show-file-list="false"
              :before-upload="uploadBefore"
              :on-success="(res, file, fileList) => uploadSuccess(res, file, fileList,1)"
              :on-error="uploadError"
              :data="{
                path : 'sfz',
                token : token,
              }"
            >
              <el-button size="mini" icon='el-icon-upload'>
                上传
              </el-button>
              <!-- 编辑 查看 -->
              <template v-if="ruleForm.corporationIdcard">
                <a class="ml-10" slot="tip" :href="ruleForm.corporationIdcard" target="_blank">查看</a>
              </template>
            </el-upload>
					</el-form-item>

          <el-form-item label="营业执照：" prop="businessLicense">
            <el-upload
              accept=".pdf,.PDF"
              class="upload-demo"
              :action="`${$host}/file/upload.htm`"
              :show-file-list="false"
              :before-upload="uploadBefore"
              :on-success="(res, file, fileList) => uploadSuccess(res, file, fileList,2)"
              :on-error="uploadError"
              :data="{
                path : 'sfz',
                token : token,
              }"
            >
              <el-button size="mini" icon='el-icon-upload'>
                上传
              </el-button>
              <!-- 编辑 查看 -->
              <template v-if="ruleForm.businessLicense">
                <a class="ml-10" slot="tip" :href="ruleForm.businessLicense" target="_blank">查看</a>
              </template>
            </el-upload>
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
        token : JSON.parse(localStorage.getItem('loginInfo')).token,
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,
        type : '',
        row : '',

        ruleForm : {
          // 委托人名称
          clienteleName : '',
          // 通讯地址
          address : '',
          // 法人
          corporationName : '',
          // 法人职务
          corporationPosition : '',
          // 联系电话
          corporationPhone : '',
          // 法人身份证正反面照片
          corporationIdcard : '',
          // 营业执照
          businessLicense : '',
          // 统一社会信用代码
          creditCode : '',
        },
        rules : {
          clienteleName : [
            {required : true , message : '请输入委托人名称' , trigger : 'blur'},
          ],
          address : [
            {required : true , message : '请输入通讯地址' , trigger : 'blur'},
          ],
          corporationName : [
            {required : true , message : '请输入法人' , trigger : 'blur'},
          ],
          corporationPosition : [
            {required : true , message : '请输入法人职务' , trigger : 'blur'},
          ],
          corporationPhone : [
            {required : true , message : '请输入联系电话' , trigger : 'blur'},
          ],
          corporationIdcard : [
            {required : true , message : '请上传法人身份证正反面照片' , trigger : 'change'},
          ],
          businessLicense : [
            {required : true , message : '请上传营业执照' , trigger : 'blur'},
          ],
          creditCode : [
            {required : true , message : '请输入统一社会信用代码' , trigger : 'blur'},
          ],
        },
      }
    },
    mounted() {

    },
    methods : {
      show(type,data) {
        this.dialogVisible = true;
        this.type = type;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          if(type === 'edit') {
            this.row = data;
            this.ruleForm = Object.assign(this.ruleForm,data);
          }
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;

        setTimeout(() => {
          // 取消按钮禁用
          this.submitDisabled = false;
          // 重置表单数据
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
            let form = {...this.ruleForm};
            // 编辑
            if(this.type === 'edit') {
              form.clienteleId = this.row.clienteleId;
            }else{
              delete form.clienteleId;
            }
						this.$http({
              method : 'post',
              url : '/clientele/insertOrUpdateClienteleInfo.htm',
              data : form,
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


      // 文件上传前回调
      uploadBefore(file) {
        let fileType = file.name.split('.').pop().toLocaleLowerCase();
        let arr = ['jpg','png','jpeg','gif','pdf'];
        if(arr.indexOf(fileType) === -1){
          this.$message.warning('文件格式有误');
          return false;
        }
        return true;
      },
      // 文件上传成功
      uploadSuccess(res, file, fileList,type) {
        if(res.code === '0000') {
          // 身份证
          if(type === 1) {
            this.ruleForm.corporationIdcard = res.result;
            this.$refs.ruleForm.validateField('corporationIdcard');
          // 营业执照
          }else{
            this.ruleForm.businessLicense = res.result;
            this.$refs.ruleForm.validateField('businessLicense');
          }
        }else{
          this.$message.error(res.description);
        }
      },
      // 文件上传失败
      uploadError() {
        this.$message.error('文件上传失败，请稍后重试');
      },
    },
  }
</script>

<style scoped lang="scss">

.em-wtr-client-management-dialog{

}

</style>
