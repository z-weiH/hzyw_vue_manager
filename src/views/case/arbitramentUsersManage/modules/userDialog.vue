<template>
  <div class="arbitrament-users-manage-user-dialog">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="700px"
      @close="handleClose"
    >
      <div class="m-content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          
          <!-- 客户基本信息 -->
          <table
            class="m-primordial-table 
              el-table el-table--fit el-table--border 
              el-table--enable-row-hover"
          >
            <tr>
              <td colspan="4">客户基本信息</td>
            </tr>

            <tr>
              <td colspan="1">选择仲裁委：</td>
              <td colspan="3">
                <el-form-item label=" " prop="arbId">
                  <el-select style="width:100%" v-model="ruleForm.arbId" placeholder="请选择">
                    <el-option label="请选择" value=""></el-option>
                    <template v-for="(item,index) in arbOptions">
                      <el-option :key="item.arbId + index" :label="item.fullName" :value="item.arbId"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </td>
            </tr>

            <tr>
              <td colspan="1">客户名称：</td>
              <td colspan="1">
                <el-form-item label=" " prop="name">
                  <el-input placeholder="请输入客户名称" v-model="ruleForm.name"></el-input>
                </el-form-item>
              </td>
              <td colspan="1">客户类型：</td>
              <td colspan="1">
                <el-form-item label=" " prop="type">
                  <el-select :disabled="typeDisabled" @change="handleTypeChange" v-model="ruleForm.type" placeholder="请选择">
                    <el-option label="自然人" :value="0"></el-option>
                    <el-option label="企业" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>

          </table>

          <table
            class="m-primordial-table mt-10
              el-table el-table--fit el-table--border 
              el-table--enable-row-hover"
          >
            <!-- 用户信息 -->
            <template v-if="ruleForm.type === 0">
              <tr>
                <td colspan="4">
                  用户信息
                </td>
              </tr>

              <tr>
                <td colspan="1">手机号：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="phone">
                    <el-input placeholder="请输入手机号" v-model="ruleForm.phone"></el-input>
                  </el-form-item>
                </td>
                <td colspan="1">电子邮箱：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="email">
                    <el-input placeholder="请输入电子邮箱" v-model="ruleForm.email"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">证件类型：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="idtype">
                    <el-select v-model="ruleForm.idtype" placeholder="请选择">
                      <el-option key="1" v-if="ruleForm.type === 0" label="身份证" :value="0"></el-option>
                      <el-option key="2" v-else label="营业执照" :value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td colspan="1">身份证号：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="idcard">
                    <el-input placeholder="请输入身份证号" v-model="ruleForm.idcard"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">民族：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="nation">
                    <el-input placeholder="请输入民族" v-model="ruleForm.nation"></el-input>
                  </el-form-item>
                </td>
                <td colspan="2"></td>
              </tr>

              <tr>
                <td colspan="1">身份证正面照：</td>
                <td colspan="3">
                  <el-form-item  label=" " prop="img01">
                    <el-upload
                      class="upload-demo"
                      :action="`${$host}/file/upload.htm`"
                      :show-file-list="false"
                      :before-upload="facadeOfIDCardBefore"
                      :on-success="facadeOfIDCardSuccess"
                      :on-error="fileError"
                      :data="{
                        path : 'hzuser/idcard'
                      }"
                    >
                      <el-button size="mini" icon='el-icon-upload'>
                        点击这里上传文件
                      </el-button>
                      {{ruleForm.img01FileName}}
                      <!-- 编辑 查看 -->
                      <template v-if="type === 'edit' && !ruleForm.img01FileName">
                        <a slot="tip" :href="ruleForm.img01" target="_blank">查看</a>
                      </template>
                    </el-upload>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">身份证背面照：</td>
                <td colspan="3">
                  <el-form-item  label=" " prop="img02">
                    <el-upload
                      class="upload-demo"
                      :action="`${$host}/file/upload.htm`"
                      :show-file-list="false"
                      :before-upload="backsidePhotoOfIDCardBefore"
                      :on-success="backsidePhotoOfIDCardSuccess"
                      :on-error="fileError"
                      :data="{
                        path : 'hzuser/idcard'
                      }"
                    >
                      <el-button size="mini" icon='el-icon-upload'>
                        点击这里上传文件
                      </el-button>
                      {{ruleForm.img02FileName}}
                      <!-- 编辑 查看 -->
                      <template v-if="type === 'edit' && !ruleForm.img02FileName">
                        <a slot="tip" :href="ruleForm.img02" target="_blank">查看</a>
                      </template>
                    </el-upload>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">证件地址：</td>
                  <td colspan="3">
                  <el-form-item label=" " prop="idaddress">
                    <el-input :autosize="{ minRows: 1}" type="textarea" placeholder="请输入证件地址" v-model="ruleForm.idaddress"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">通讯地址：</td>
                  <td colspan="3">
                  <el-form-item label=" " prop="address">
                    <el-input :autosize="{ minRows: 1}" type="textarea" placeholder="请输入通讯地址" v-model="ruleForm.address"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">其他信息：</td>
                  <td colspan="3">
                  <el-form-item key="1" label=" " prop="remark">
                    <el-input :autosize="{ minRows: 3 , maxRows : 3}" type="textarea" placeholder="请输入其他信息" v-model="ruleForm.remark"></el-input>
                  </el-form-item>
                </td>
              </tr>

            </template>
            <!-- 企业信息 -->
            <template v-else>

              <tr>
                <td colspan="1">证件类型：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="idtype">
                    <el-select v-model="ruleForm.idtype" placeholder="请选择">
                      <el-option key="1" v-if="ruleForm.type === 0" label="身份证" :value="0"></el-option>
                      <el-option key="2" v-else label="营业执照" :value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td colspan="1">社会唯一信用代码：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="idcard">
                    <el-input placeholder="请输入信用代码" v-model="ruleForm.idcard"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">营业执照：</td>
                <td colspan="3">
                  <el-form-item  label=" " prop="img01">
                    <el-upload
                      class="upload-demo"
                      :action="`${$host}/file/upload.htm`"
                      :show-file-list="false"
                      :before-upload="businessLicenseBefore"
                      :on-success="businessLicenseSuccess"
                      :on-error="fileError"
                      :data="{
                        path : 'hzuser/idcard'
                      }"
                    >
                      <el-button size="mini" icon='el-icon-upload'>
                        点击这里上传文件
                      </el-button>
                      {{ruleForm.img01FileName}}
                      <!-- 编辑 查看 -->
                      <template v-if="type === 'edit' && !ruleForm.img01FileName">
                        <a slot="tip" :href="ruleForm.img01" target="_blank">查看</a>
                      </template>
                    </el-upload>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">证件地址：</td>
                  <td colspan="3">
                  <el-form-item label=" " prop="idaddress">
                    <el-input :autosize="{ minRows: 1}" type="textarea" placeholder="请输入证件地址" v-model="ruleForm.idaddress"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">法定代表人：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="legaller">
                    <el-input placeholder="请输入法定代表人" v-model="ruleForm.legaller"></el-input>
                  </el-form-item>
                </td>
                <td colspan="1">法定代表人职务：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="position">
                    <el-input placeholder="请输入法定代表人职务" v-model="ruleForm.position"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">手机号：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="phone">
                    <el-input placeholder="请输入手机号" v-model="ruleForm.phone"></el-input>
                  </el-form-item>
                </td>
                <td colspan="1">电子邮箱：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="email">
                    <el-input placeholder="请输入电子邮箱" v-model="ruleForm.email"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">通讯地址：</td>
                  <td colspan="3">
                  <el-form-item label=" " prop="address">
                    <el-input :autosize="{ minRows: 1}" type="textarea" placeholder="请输入通讯地址" v-model="ruleForm.address"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">其他信息：</td>
                  <td colspan="3">
                  <el-form-item key="2" label=" " prop="remark">
                    <el-input :autosize="{ minRows: 3 , maxRows : 3}" type="textarea" placeholder="请输入其他信息" v-model="ruleForm.remark"></el-input>
                  </el-form-item>
                </td>
              </tr>

            </template>
          </table>

          <el-form-item class="hidden"  label=" " prop="img01FileName"></el-form-item>
          <el-form-item class="hidden"  label=" " prop="img02FileName"></el-form-item>

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
        title : '',
        type : 'add',

        ruleForm : {
          // 选择仲裁委
          arbId : '',
          // 客户名称
          name : '',
          // 客户类型 0自然人 1企业
          type : 0,

          // 手机号
          phone : '',
          // 电子邮箱
          email : '',
          // 证件类型 0身份证 3营业执照
          idtype : 0,
          // 证件号 or 社会唯一信用代码
          idcard : '',
          // 民族
          nation : '',
          // 身份证正面照 or 营业执照
          img01 : '',
          // 身份证反面照
          img02 : '',
          // 证件地址
          idaddress : '',
          // 通讯地址
          address : '',

          // 法定代表人
          legaller : '',
          // 法定代表人职务
          position : '',

          // 其他信息
          remark : '',

          // 身份证正面照 or 营业执照 文件名
          img01FileName : '',
          // 身份证背面照 文件名
          img02FileName : '',
          // 仲裁申请书 文件名
          fileFileName : '',

          // 用户id
          userId : '',
        },
        rules : {
          // 仲裁委
          arbId : [
            {required : true , message : '请选择仲裁委' , trigger : 'change'},
          ],
          // 客户名称
          name : [
            {required : true , message : '请输入客户名称' , trigger : 'blur'},
          ],

          // 手机号
          phone : [
            {required : true , message : '请输入手机号' , trigger : 'blur'},
          ],
          // 电子邮箱
          email : [
            {required : true , message : '请输入电子邮箱' , trigger : 'blur'},
          ],
          // 身份证号 or 社会唯一信用代码
          idcard : [
            {required : true , message : '请输入' , trigger : 'blur'},
          ],
          // 民族
          nation : [
            {required : true , message : '请输入民族' , trigger : 'blur'},
          ],
          // 身份证正面照 or 营业执照
          img01 : [
            {required : true , message : '请上传文件' , trigger : 'change'},
          ],
          // 身份证反面照
          img02 : [
            {required : true , message : '请上传文件' , trigger : 'change'},
          ],
          // 证件地址 or 注册地址
          idaddress : [
            {required : true , message : '请输入' , trigger : 'blur'},
          ],
          // 通讯地址
          address : [
            {required : true , message : '请输入通讯地址' , trigger : 'blur'},
          ],

          // 法定代表人
          legaller : [
            {required : true , message : '请输入法定代表人' , trigger : 'blur'},
          ],
          // 法定代表人职务
          position : [
            {required : true , message : '请输入法定代表人职务' , trigger : 'blur'},
          ],

          // 其他信息
          remark : [
            {required : true , message : '请输入其他信息' , trigger : 'blur'},
          ],
        },

        // 仲裁委 options
        arbOptions : [
          {fullName : '张三' , arbId : '张三'},
        ],
        // 客户类型 disabled
        typeDisabled : false,
      }
    },
    mounted() {
      // 获取 所有仲裁委
      this.$http({
        method : 'post',
        url : "/arb/queryAllArbList.htm",
      }).then((res) => {
        this.arbOptions = res.result;
      });
    },
    methods : {
      show(type,data) {
        this.dialogVisible = true;
        if(type === 'add'){
          this.title = '新增用户';
          this.type = 'add';
        }else{
          this.title = '修改用户';
          this.type = 'edit';
          
          /* 回显数据 */
          this.$http({
            method : 'post',
            url : '/hzuser/selectUserDetailByUserId.htm',
            data : {
              userId : data.userId,
            },
          }).then((res) => {
            // res.result.type = 1;   
            this.ruleForm = Object.assign(this.ruleForm,res.result);
            this.ruleForm.userId = data.userId;

            this.typeDisabled = true;
          });
        }
      },
      // 客户类型 change
      handleTypeChange(val) {
        // 重置相关数据
        let arr = [
          'nation' , 'phone' , 'email' , 'idcard' , 'img01' , 'img02' , 'idaddress' , 'address' ,
          'legaller' , 'position' , 'img01FileName' , 'img02FileName' ,
        ];
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
        this.typeDisabled = false;
        this.dialogVisible = false;

        // 由于 dom 切换问题 form无法完全重置 ， 手动清空表单元素数据
        for(let key in this.ruleForm) {
          if(key === 'type') {
            this.ruleForm[key] = 0;
          }else if(key === 'idtype'){
            this.ruleForm[key] = 0;
          }else{
            this.ruleForm[key] = '';
          }
        }

        this.$nextTick(() => {
          
          this.$refs.ruleForm.resetFields();
        });
        
      },
      // 点击提交
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.$http({
              method : 'post',
              url : '/hzuser/saveUser.htm',
              data : this.ruleForm,
            }).then((res) => {
              let message = this.type === 'add' ? '新增成功' : '修改成功';
              this.$message.success(message);
              this.handleClose();
              this.$emit('successCBK');
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
      /* 身份证正面照 上传前 */
      facadeOfIDCardBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['jpg','png','gif','jpeg'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      /* 身份证正面照 上传成功 */
      facadeOfIDCardSuccess(response, file, fileList) {
        this.ruleForm.img01 = response.result;
        this.ruleForm.img01FileName = file.name;
        this.$nextTick(() => {
          console.log(file.name);
          console.log(this.ruleForm.img01FileName);
        });
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

<style lang="scss" scoped>

.arbitrament-users-manage-user-dialog{
  
}

</style>