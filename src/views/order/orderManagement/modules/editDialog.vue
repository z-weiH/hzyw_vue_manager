<template>
  <div class="order-management-dialog">
    <el-dialog
      title="修改被申请人"
      :visible.sync="dialogVisible"
      width="800px"
      @close="handleClose"
			ref="dialog"
    >
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        :closable="false"
        :editable="false"
        @tab-click="handleTapCard"
      >
        <el-tab-pane v-for="(item, idx) in formList" :key="idx" :label="nameList[idx]" :name="idx + ''">
          <div class="m-conetnt">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">

              <el-form-item label="用户类型：" prop="type">
                <el-select @change="handleChange" clearable v-model="ruleForm.type" placeholder="请选择用户类型">
                  <el-option label="自然人" :value="0"></el-option>
                  <el-option label="企业" :value="1"></el-option>
                </el-select>
              </el-form-item>

              <!-- 自然人 -->
              <el-row key="1" v-if="ruleForm.type === 0">
                <el-col :span="12">
                  <el-form-item label="姓名：" prop="name"
                                :rules="[
                  {required : true , message : '请输入姓名' , trigger : 'blur'}
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
                    {{ruleForm.idtype === 0 ? '身份证' : '营业执照'}}
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱：" prop="email">
                    <el-input v-model.trim="ruleForm.email" placeholder="请输入"></el-input>
                  </el-form-item>

                  <el-form-item label="证件号码：" prop="idcard"
                                :rules="[
                  {required : true , message : '请输入证件号码' , trigger : 'blur'}
                ]"
                  >
                    <el-input v-model.trim="ruleForm.idcard" placeholder="请输入"></el-input>
                  </el-form-item>

                  <el-form-item label="住址：" prop="address"
                                :rules="[
                  {required : true , message : '请输入住址' , trigger : 'blur'}
                ]"
                  >
                    <el-input v-model.trim="ruleForm.address" placeholder="请输入"></el-input>
                  </el-form-item>

                  <el-form-item label="证件地址：" prop="idAddress"
                                :rules="[
                  {required : true , message : '请输入证件地址' , trigger : 'blur'}
                ]"
                  >
                    <el-input v-model.trim="ruleForm.idAddress" placeholder="请输入"></el-input>
                  </el-form-item>

                  <!-- <el-form-item label="性别：" prop="sex">
                    <el-select clearable style="width:100%;" v-model="ruleForm.sex" placeholder="请选择性别">
                      <el-option label="女" :value="0"></el-option>
                      <el-option label="男" :value="1"></el-option>
                    </el-select>
                  </el-form-item> -->
                </el-col>

              </el-row>
              <!-- 企业 -->
              <el-row key="2" v-else>
                <el-col :span="12">
                  <el-form-item label="企业名称：" prop="name"
                                :rules="[
                  {required : true , message : '请输入企业名称' , trigger : 'blur'}
                ]"
                  >
                    <el-input v-model.trim="ruleForm.name" placeholder="请输入"></el-input>
                  </el-form-item>

                  <el-form-item label="证件号码：" prop="idcard"
                                :rules="[
                  {required : true , message : '请输入证件号码' , trigger : 'blur'}
                ]"
                  >
                    <el-input v-model.trim="ruleForm.idcard" placeholder="请输入"></el-input>
                  </el-form-item>

                  <el-form-item label="注册地址：" prop="idAddress"
                                :rules="[
                  {required : true , message : '请输入注册地址' , trigger : 'blur'}
                ]"
                  >
                    <el-input v-model.trim="ruleForm.idAddress" placeholder="请输入"></el-input>
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
                    {{ruleForm.idtype === 0 ? '身份证' : '营业执照'}}
                  </el-form-item>

                  <el-form-item label="法定代表人：" prop="legaler">
                    <el-input v-model.trim="ruleForm.legaler" placeholder="请输入"></el-input>
                  </el-form-item>

                  <el-form-item label="手机号：" prop="phone">
                    <el-input v-model.trim="ruleForm.phone" placeholder="请输入"></el-input>
                  </el-form-item>

                  <el-form-item label="通讯地址：" prop="address"
                                :rules="[
                  {required : true , message : '请输入通讯地址' , trigger : 'blur'}
                ]"
                  >
                    <el-input v-model.trim="ruleForm.address" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>

            </el-form>
          </div>

        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit">确认并生成申请书</el-button>
        <el-button @click="handleClose">取 消</el-button>
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

        formList: [],
        nameList: [],
        editableTabsValue: '0',
        ruleForm : {
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
          // 证件地址
          idAddress : '',
          // 通讯地址
          address : '',

          // 法定代表人
          legaler : '',
          // 法定代表人职务
          position : '',

          // 姓名 or 企业名称
          name : '',
          // 性别 0女 1男
          sex : '',
        },
        rules : {
          sex : [
            {required : true , message : '请选择性别' , trigger : 'change'},
          ],
          nation : [
            {required : true , message : '请输入民族' , trigger : 'blur'},
          ],
          phone : [
            {required : true , message : '请输入手机号' , trigger : 'blur'},
            {pattern : reg.tel , message : '手机号格式有误' , trigger : 'blur'},
          ],
          email : [
            /* {required : true , message : '请输入邮箱' , trigger : 'blur'}, */
            {pattern : reg.email , message : '邮箱格式有误' , trigger : 'blur'},
          ],
          legaler : [
            {required : true , message : '请输入法定代表人' , trigger : 'blur'},
          ],
          position : [
            {required : true , message : '请输入职位' , trigger : 'blur'},
          ],
        },

      }
    },
    mounted() {

    },
    methods : {
      handleTapCard(tabs, e) {
        // 点击某个选项卡
        console.log(tabs);
        // tabs.index;
        this.ruleForm = this.formList[tabs.index];
        // this.editableTabs[tabs.index]['component'] = EditPeopleInfo;
      },
      show(data) {

        const loading = this.$loading({
          lock: true,
          text: '正在载入',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });

        // 获取数据
        this.$http({
          url : '/ordermanage/queryRespondentInfo.htm',
          method : 'post',
          data : {
            caseOrderId : data.caseOrderId,
          },
        }).then((res) => {
          loading.close()
          this.dialogVisible = true;
          // dialog 返回顶部
          this.$nextTick(() => {
            this.$refs.dialog.$el.scrollTop = 0;
          });
          this.data = data;
          this.formList = res.result;
          this.ruleForm = this.formList[0];
          this.nameList = this.formList.map(item => item.name);
          this.editableTabsValue = '0';
        }).catch(() => {
          loading.close();
        });
      },

      // 用户类型change
      handleChange(val) {
        // 重置相关数据
        let arr = [
          'phone' , 'email' , 'idcard' , 'idAddress' , 'address' ,
          'legaler' , 'position' , 'sex' ,
        ];
        arr.map((v,k) => {
          this.ruleForm[v] = '';
        });
        // 移除校验
        this.$refs.ruleForm[+this.editableTabsValue].clearValidate();

        // 自然人
        if(val === 0) {
          this.ruleForm.idtype = 0;
        // 企业
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
        this.$refs.ruleForm[+this.editableTabsValue].resetFields();
      },
      // 点击提交
      handleSubmit(submitType) {
        console.log(this.$refs, this.editableTabsValue);
        this.$refs.ruleForm[+this.editableTabsValue].validate((valid) => {
          if(valid) {
						// 提交数据
						this.submitDisabled = true;
						this.$http({
              method : 'post',
              url : '/ordermanage/modifyRespondentInfo.htm',
              data : {
                ...this.ruleForm,
                caseOrderId : this.data.caseOrderId,
              },
            }).then((res) => {
              this.$message.success('修改成功');
              this.handleClose();
              this.$eimt('successCBK');
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

.order-management-dialog{
  .el-form-item{
    margin-bottom: 22px!important;
  }
}

</style>
