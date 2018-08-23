<template>
  <div class="case-management-edit-dialog">
    <el-dialog
      title="修改被申请人"
      :visible.sync="dialogVisible"
      width="800px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
          
					<el-form-item label="用户类型：" prop="type">
            <el-select @change="handleTypeChange" clearable v-model="ruleForm.type" placeholder="请选择用户类型">
              <el-option label="自然人" :value="0" ></el-option>
              <el-option label="企业" :value="1" ></el-option>  
            </el-select>
          </el-form-item>

          <!-- 自然人 -->
          <template v-if="ruleForm.type === 0">
            <el-row :key="1">
              <el-col :span="12">
                <el-form-item label="姓名：" prop="name"
                  :rules="[
                    {required : true , message : '请输入姓名' , trigger : 'blur'},
                  ]"
                >
                  <el-input v-model.trim="ruleForm.name" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="民族：" prop="nation">
                  <el-input v-model.trim="ruleForm.nation" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="手机号：" prop="phone">
                  <el-input v-model.trim="ruleForm.phone" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="证件类型：" prop="idtype">
                  <span>{{ruleForm.idtype === 0 ? '身份证' : '营业执照'}}</span>
                </el-form-item>

                <!-- <el-form-item label="身份证正面：" prop="img01"
                  :rules="[
                    {required : true , message : '请上传身份证正面' , trigger : 'blur'},
                  ]"
                >
                  <el-upload
                    class="upload-demo"
                    :action="`${$host}/file/upload.htm`"
                    :show-file-list="false"
                    :before-upload="facadeOfIDCardBefore"
                    :on-success="facadeOfIDCardSuccess"
                    :on-error="fileError"
                    :data="{
                      path : 'hzuser/idcard',
                      token : token,
                    }"
                  >
                    <el-button size="mini" icon='el-icon-upload'>
                      上传
                    </el-button>
                    {{ruleForm.img01FileName}}
                  </el-upload>
                </el-form-item> -->

              </el-col>
              <el-col :span="12">
                <!-- <el-form-item label="性别：" prop="sex">
                  <el-select clearable v-model="ruleForm.sex" placeholder="请选择账龄">
                    <el-option label="女" :value="0" ></el-option>
                    <el-option label="男" :value="1" ></el-option>  
                  </el-select>
                </el-form-item> -->

                <!-- <el-form-item label="出生年月：" prop="birth">
                  <el-input v-model.trim="ruleForm.birth" placeholder="请输入"></el-input>
                </el-form-item> -->

                <el-form-item label="邮箱：" prop="email">
                  <el-input v-model.trim="ruleForm.email" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="证件号码：" prop="idcard">
                  <el-input v-model.trim="ruleForm.idcard" placeholder="请输入"></el-input>
                </el-form-item>

                <!-- <el-form-item  label="身份证背面：" prop="img02"
                  :rules="[
                    {required : true , message : '请上传身份证背面' , trigger : 'blur'},
                  ]"
                >
                  <el-upload
                    class="upload-demo"
                    :action="`${$host}/file/upload.htm`"
                    :show-file-list="false"
                    :before-upload="backsidePhotoOfIDCardBefore"
                    :on-success="backsidePhotoOfIDCardSuccess"
                    :on-error="fileError"
                    :data="{
                      path : 'hzuser/idcard',
                      token : token,
                    }"
                  >
                    <el-button size="mini" icon='el-icon-upload'>
                      上传
                    </el-button>
                    {{ruleForm.img02FileName}}
                  </el-upload>
                </el-form-item> -->

                <el-form-item label="住址：" prop="address"
                  :rules="[
                    {required : true , message : '请输入住址' , trigger : 'blur'},
                  ]"
                >
                  <el-input v-model.trim="ruleForm.address" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="证件地址：" prop="idaddress"
                  :rules="[
                    {required : true , message : '请输入证件地址' , trigger : 'blur'},
                  ]"
                >
                  <el-input v-model.trim="ruleForm.idaddress" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>  

          </template>
          <!-- 企业 -->
          <template v-else>
            <el-row :key="2">
              <el-col :span="12">
                <el-form-item label="企业名称：" prop="name"
                  :rules="[
                    {required : true , message : '请输入企业名称' , trigger : 'blur'},
                  ]"
                >
                  <el-input v-model.trim="ruleForm.name" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="证件号码：" prop="idcard">
                  <el-input v-model.trim="ruleForm.idcard" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="注册地址：" prop="idaddress"
                  :rules="[
                    {required : true , message : '请输入注册地址' , trigger : 'blur'},
                  ]"
                >
                  <el-input v-model.trim="ruleForm.idaddress" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="职位：" prop="position">
                  <el-input v-model.trim="ruleForm.position" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="邮箱：" prop="email">
                  <el-input v-model.trim="ruleForm.email" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型：" prop="idtype">
                  <span>{{ruleForm.idtype === 0 ? '身份证' : '营业执照'}}</span>
                </el-form-item>

                <!-- <el-form-item  label="营业执照：" prop="img01"
                  :rules="[
                    {required : true , message : '请上传营业执照' , trigger : 'blur'},
                  ]"
                >
                  <el-upload
                    class="upload-demo"
                    :action="`${$host}/file/upload.htm`"
                    :show-file-list="false"
                    :before-upload="businessLicenseBefore"
                    :on-success="businessLicenseSuccess"
                    :on-error="fileError"
                    :data="{
                      path : 'hzuser/idcard',
                      token : token,
                    }"
                  >
                    <el-button size="mini" icon='el-icon-upload'>
                      上传
                    </el-button>
                    {{ruleForm.img01FileName}}
                  </el-upload>
                </el-form-item> -->

                <el-form-item label="法定代表人：" prop="legalPerson">
                  <el-input v-model.trim="ruleForm.legalPerson" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="手机号：" prop="phone">
                  <el-input v-model.trim="ruleForm.phone" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="通讯地址：" prop="address"
                  :rules="[
                    {required : true , message : '请输入通讯地址' , trigger : 'blur'},
                  ]"
                >
                  <el-input v-model.trim="ruleForm.address" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>


          <el-form-item class="hidden"  label=" " prop="img01FileName"></el-form-item>
          <el-form-item class="hidden"  label=" " prop="img02FileName"></el-form-item>
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
  import reg from '@/assets/js/regexp'
  export default {
    data() {
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,
        // 用户token
        token : JSON.parse(localStorage.getItem('loginInfo')).token,

        ruleForm : {
          // 被申请人类型 	0自然人 1企业
          type : 0,
          // 通讯地址
          address : '',
          // 出生年月
          birth : '',
          // 邮箱
          email : '',
          // 证件地址
          idaddress : '',
          // 证件号
          idcard : '',
          // 证件类型 0身份证 3营业执照
          idtype : '',
          // 	身份证正面
          img01 : '',
          // 身份证反面
          img02 : '',
          // 法定代表人
          legalPerson : '',
          // 被申请人名称
          name : '',
          // 民族
          nation : '',
          // 主键id
          partyId : '',
          // 手机号
          phone : '',
          // 法定代表人职位
          position : '',
          // 性别 	0女 1男
          sex : '',

          // 上传文件名
          img01FileName : '',
          img02FileName : '',
        },
        rules : {
          birth : [
            {required : true , message : '请输入出生年月' , trigger : 'blur'},
          ],
          email : [
            /* {required : true , message : '请输入邮箱' , trigger : 'blur'}, */
            {pattern : reg.email , message : '邮箱格式有误' , trigger : 'blur'},
          ],
          birth : [
            {required : true , message : '请输入出生年月' , trigger : 'blur'},
          ],
          idcard : [
            {required : true , message : '请输入证件号码' , trigger : 'blur'},
          ],
          legalPerson : [
            {required : true , message : '请输入法定代表人' , trigger : 'blur'},
          ],
          nation : [
            {required : true , message : '请输入名族' , trigger : 'blur'},
          ],
          phone : [
            {required : true , message : '请输入手机号' , trigger : 'blur'},
            {pattern : reg.tel , message : '手机号格式有误' , trigger : 'blur'},
          ],
          position : [
            {required : true , message : '请输入职位' , trigger : 'blur'},
          ],
          sex : [
            {required : true , message : '请选择性别' , trigger : 'change'},
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

        // 回显数据
        this.$http({
          url : '/casemanage/queryRespondentInfo.htm',
          method : 'post',
          data : {
            caseId : data.caseId,
          },
        }).then((res) => {
          this.ruleForm = Object.assign(this.ruleForm,res.result);
        });
      },
      
      // 被申请人 change
      handleTypeChange(val) {
        // 重置相关数据
        let form = {...this.ruleForm};
        delete form.type;
        let arr = Object.keys(form);
        arr.map((v,k) => {
          this.ruleForm[v] = '';
        });
        // 移除校验
        this.$refs.ruleForm.clearValidate();

        // 设置 证据类型 选中
        if(val === 0){
          this.ruleForm.idtype = 0;
        }else{
          this.ruleForm.idtype = 3;
        }
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
              url : '/casemanage/modifyRespondentInfo.htm',
              data : this.ruleForm,
            }).then((res) => {
              this.$message.success('修改成功');
              this.handleClose();
              this.$emit('successCBK');
            }).catch(() => {
              this.submitDisabled = false;
            });
          }
        });
      },

      /* 营业执照 上传前 */
      businessLicenseBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['jpg','png','gif','jpeg'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      /* 营业执照 上传成功 */
      businessLicenseSuccess(response, file, fileList) {
        this.ruleForm.img01 = response.result; 
        this.ruleForm.img01FileName = file.name;
        /* 重新校验 */
        this.$refs.ruleForm.validateField('img01');
      },
      /* 身份证正面 上传前 */
      facadeOfIDCardBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['jpg','png','gif','jpeg'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      /* 身份证正面 上传成功 */
      facadeOfIDCardSuccess(response, file, fileList) {
        this.ruleForm.img01 = response.result; 
        this.ruleForm.img01FileName = file.name;
        /* 重新校验 */
        this.$refs.ruleForm.validateField('img01');
      },
      /* 身份证背面照 上传前 */
      backsidePhotoOfIDCardBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['jpg','png','gif','jpeg'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      /* 身份证背面照 上传成功 */
      backsidePhotoOfIDCardSuccess(response, file, fileList) {
        this.ruleForm.img02 = response.result;
        this.ruleForm.img02FileName = file.name;
        /* 重新校验 */
        this.$refs.ruleForm.validateField('img02');
      },

      /* 文件上传失败 回调 */
      fileError() {
        this.$message.error('文件上传失败，请稍后重试');
      },
    },
  }
</script>

<style scoped lang="scss">

.case-management-edit-dialog{
  .el-form-item{
    margin-bottom: 22px;
  }
}

</style>
