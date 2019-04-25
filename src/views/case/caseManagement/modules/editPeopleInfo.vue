<template>
  <div>
    <el-form ref="echoItemsForm" :model="echoItems" :rules="rules" label-width="120px">
      <el-form-item label="用户类型：" prop="type">
        <el-select
          disabled
          @change="handleTypeChange(val)"
          v-model="echoItems.type"
          placeholder="请选择用户类型"
        >
          <el-option label="自然人" :value="0"></el-option>
          <el-option label="企业" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <!-- 自然人 -->
      <template v-if="echoItems.type === 0">
        <el-row :key="1">
          <el-col :span="12">
            <el-form-item
              label="姓名："
              prop="name"
              :rules="[
                      {required : true , message : '请输入姓名' , trigger : 'blur'},
                    ]"
            >
              <el-input v-model.trim="echoItems.name" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="民族：" prop="nation">
              <el-input v-model.trim="echoItems.nation" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="手机号：" prop="phone">
              <el-input v-model.trim="echoItems.phone" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="证件类型：" prop="idtype">
              <span>{{echoItems.idtype === 0 ? '身份证' : '营业执照'}}</span>
            </el-form-item>

            <!-- <el-form-item label="身份证正面：" prop="img01"
                    :rules="[
                      {required : true , message : '请上传身份证正面' , trigger : 'blur'},
                    ]"
                  >
                    <el-upload
                      class="upload-demo"
                      :action="${$host}/file/upload.htm"
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
            </el-form-item>-->
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item label="性别：" prop="sex">
                    <el-select clearable v-model="ruleForm.sex" placeholder="请选择账龄">
                      <el-option label="女" :value="0" ></el-option>
                      <el-option label="男" :value="1" ></el-option>
                    </el-select>
            </el-form-item>-->

            <!-- <el-form-item label="出生年月：" prop="birth">
                    <el-input v-model.trim="ruleForm.birth" placeholder="请输入"></el-input>
            </el-form-item>-->

            <el-form-item label="邮箱：" prop="email">
              <el-input v-model.trim="echoItems.email" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="证件号码：" prop="idcard">
              <el-input v-model.trim="echoItems.idcard" placeholder="请输入"></el-input>
            </el-form-item>

            <!-- <el-form-item  label="身份证背面：" prop="img02"
                    :rules="[
                      {required : true , message : '请上传身份证背面' , trigger : 'blur'},
                    ]"
                  >
                    <el-upload
                      class="upload-demo"
                      :action="${$host}/file/upload.htm"
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
            </el-form-item>-->

            <el-form-item
              label="住址："
              prop="address"
              :rules="[
                      {required : true , message : '请输入住址' , trigger : 'blur'},
                    ]"
            >
              <el-input v-model.trim="echoItems.address" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item
              label="证件地址："
              prop="idaddress"
              :rules="[
                      {required : true , message : '请输入证件地址' , trigger : 'blur'},
                    ]"
            >
              <el-input v-model.trim="echoItems.idaddress" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <!-- 企业 -->
      <template v-if="echoItems.type === 1">
        <el-row :key="2">
          <el-col :span="12">
            <el-form-item
              label="企业名称："
              prop="name"
              :rules="[
                      {required : true , message : '请输入企业名称' , trigger : 'blur'},
                    ]"
            >
              <el-input v-model.trim="echoItems.name" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="证件号码：" prop="idcard">
              <el-input v-model.trim="echoItems.idcard" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item
              label="注册地址："
              prop="idaddress"
              :rules="[
                      {required : true , message : '请输入注册地址' , trigger : 'blur'},
                    ]"
            >
              <el-input v-model.trim="echoItems.idaddress" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="职位：" prop="position">
              <el-input v-model.trim="echoItems.position" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="邮箱：" prop="email">
              <el-input v-model.trim="echoItems.email" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件类型：" prop="idtype">
              <span>{{echoItems.idtype === 0 ? '身份证' : '营业执照'}}</span>
            </el-form-item>

            <!-- <el-form-item  label="营业执照：" prop="img01"
                    :rules="[
                      {required : true , message : '请上传营业执照' , trigger : 'blur'},
                    ]"
                  >
                    <el-upload
                      class="upload-demo"
                      :action="${$host}/file/upload.htm"
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
            </el-form-item>-->

            <el-form-item label="法定代表人：" prop="legalPerson">
              <el-input v-model.trim="echoItems.legalPerson" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="手机号：" prop="phone">
              <el-input v-model.trim="echoItems.phone" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item
              label="通讯地址："
              prop="address"
              :rules="[
                      {required : true , message : '请输入通讯地址' , trigger : 'blur'},
                    ]"
            >
              <el-input v-model.trim="echoItems.address" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <el-form-item class="hidden" label=" " prop="img01FileName"></el-form-item>
      <el-form-item class="hidden" label=" " prop="img02FileName"></el-form-item>
    </el-form>
  </div>
</template>
<script>
import reg from "@/assets/js/regexp";
export default {
  watch: {
    echoItems(val) {
      console.log(val);
    }
  },
  props: {
    echoItems: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      echoItems: {},
      rules: {
        birth: [{ required: true, message: "请输入出生年月", trigger: "blur" }],
        email: [
          /* {required : true , message : '请输入邮箱' , trigger : 'blur'}, */
          { pattern: reg.email, message: "邮箱格式有误", trigger: "blur" }
        ],
        birth: [{ required: true, message: "请输入出生年月", trigger: "blur" }],
        idcard: [
          { required: true, message: "请输入证件号码", trigger: "blur" }
        ],
        legalPerson: [
          { required: true, message: "请输入法定代表人", trigger: "blur" }
        ],
        nation: [{ required: true, message: "请输入名族", trigger: "blur" },{ pattern: reg.allCH, message:"只能输入汉字",trigger:"blur"}],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: reg.tel, message: "手机号格式有误", trigger: "blur" }
        ],
        position: [{ required: true, message: "请输入职位", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }]
      }
    };
  },
  methods: {
    // 被申请人 change
    handleTypeChange(val) {
      // 重置相关数据
      let form = { ...this.echoItems };
      delete form.type;
      let arr = Object.keys(form);
      arr.map((v, k) => {
        this.echoItems[v] = "";
      });
      // 移除校验
      this.echoItems.clearValidate();

      // 设置 证据类型 选中
      if (val === 0) {
        this.echoItems.idtype = 0;
      } else {
        this.echoItems.idtype = 3;
      }
    },
    validFoo() {
      this.$refs.echoItemsForm.validate(valid => {
        console.log("valid::", valid);
        if (valid) {
          this.$parent.submitDisabled = true;
          this.$http({
            method: "post",
            url: "/casemanage/modifyRespondentInfo.htm",
            data: this.echoItems
          })
            .then(res => {
              this.$message.success("修改成功");
              // this.$parent.handleClose();
              this.$emit("successCBK");
            })
            .catch(() => {
              this.$parent.submitDisabled = false;
            });
        }
      });
    }
  },
  mounted() {
    console.log("sdsds");
  }
};
</script>

<style scoped lang="scss">
.case-management {
  .el-form-item {
    margin-bottom: 22px;
  }
}
</style>
