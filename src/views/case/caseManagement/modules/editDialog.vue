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
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          :closable="false"
          :editable="false"
          @tab-click="handleTapCard"
        >
          <el-tab-pane
            :key="item.partyId"
            v-for="(item, index) in ruleForm.details"
            :label="item.name"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
        <edit-people-info ref="epeopleinfo" :echoItems="echoItemsData"></edit-people-info>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

// import EditPeopleInfo from "./editPeopleInfo";
// const EditPeopleInfo = resolve => require(['./editPeopleInfo'], resolve)
import EditPeopleInfo from "./editPeopleInfo";
let detailsInit = {
  // 被申请人类型 	0自然人 1企业
  type: 0,
  // 通讯地址
  address: "",
  // 出生年月
  birth: "",
  // 邮箱
  email: "",
  // 证件地址
  idaddress: "",
  // 证件号
  idcard: "",
  // 证件类型 0身份证 3营业执照
  idtype: "",
  // 	身份证正面
  img01: "",
  // 身份证反面
  img02: "",
  // 法定代表人
  legalPerson: "",
  // 被申请人名称
  name: "",
  // 民族
  nation: "",
  // 主键id
  partyId: "",
  // 手机号
  phone: "",
  // 法定代表人职位
  position: "",
  // 性别 	0女 1男
  sex: "",

  // 上传文件名
  img01FileName: "",
  img02FileName: ""
};
export default {
  components: {
    EditPeopleInfo
  },
  data() {
    return {
      /* tabs 相关参数 */
      echoItemsData: {},
      editableTabsValue: "1",
      /* end */
      dialogVisible: false,
      // 提交按钮禁用状态
      submitDisabled: false,
      // 用户token
      token: JSON.parse(localStorage.getItem("loginInfo")).token,

      ruleForm: {
        details: [...detailsInit]
      }
    };
  },
  mounted() {},
  methods: {
    show(data, type) {
      // 回显数据
      this.$http({
        url: "/casemanage/queryRespondentInfo.htm",
        method: "post",
        data: {
          caseId: data.caseId
        }
      }).then(res => {
        let data = res.result;
        console.log("data", data);
        this.ruleForm.details = data;
        console.log(this.ruleForm);
        // 默认显示第0个小标的被申请人信息
        this.echoItemsData = this.ruleForm.details[0];
        this.editableTabsValue = this.ruleForm.details[0]["name"];
      });
      this.dialogVisible = true;
      // dialog 返回顶部
      this.$nextTick(() => {
        this.$refs.dialog.$el.scrollTop = 0;
      });
    },
    handleTapCard(tabs, e) {
      // 点击某个选项卡
      console.log(tabs);
      // tabs.index;
      this.echoItemsData = this.ruleForm.details[tabs.index];
      // this.editableTabs[tabs.index]['component'] = EditPeopleInfo;
    },

    // 关闭浮层
    handleClose() {
      this.dialogVisible = false;
      // 取消按钮禁用
      setTimeout(() => {
        this.submitDisabled = false;
      }, 500);
      // 重置表单数据
      this.$refs.ruleForm.resetFields();
    },
    // 点击提交
    handleSubmit(submitType) {
      console.log(this.$refs.epeopleinfo);
      this.$refs.epeopleinfo.validFoo();
    },

    /* 营业执照 上传前 */
    businessLicenseBefore(file) {
      let fileType = file.name.split(".").pop();
      let arr = ["jpg", "png", "gif", "jpeg"];
      if (arr.indexOf(fileType) === -1) {
        this.$message.error("文件格式有误");
        return false;
      }
      return true;
    },
    /* 营业执照 上传成功 */
    businessLicenseSuccess(response, file, fileList) {
      this.ruleForm.img01 = response.result;
      this.ruleForm.img01FileName = file.name;
      /* 重新校验 */
      this.$refs.ruleForm.validateField("img01");
    },
    /* 身份证正面 上传前 */
    facadeOfIDCardBefore(file) {
      let fileType = file.name.split(".").pop();
      let arr = ["jpg", "png", "gif", "jpeg"];
      if (arr.indexOf(fileType) === -1) {
        this.$message.error("文件格式有误");
        return false;
      }
      return true;
    },
    /* 身份证正面 上传成功 */
    facadeOfIDCardSuccess(response, file, fileList) {
      this.ruleForm.img01 = response.result;
      this.ruleForm.img01FileName = file.name;
      /* 重新校验 */
      this.$refs.ruleForm.validateField("img01");
    },
    /* 身份证背面照 上传前 */
    backsidePhotoOfIDCardBefore(file) {
      let fileType = file.name.split(".").pop();
      let arr = ["jpg", "png", "gif", "jpeg"];
      if (arr.indexOf(fileType) === -1) {
        this.$message.error("文件格式有误");
        return false;
      }
      return true;
    },
    /* 身份证背面照 上传成功 */
    backsidePhotoOfIDCardSuccess(response, file, fileList) {
      this.ruleForm.img02 = response.result;
      this.ruleForm.img02FileName = file.name;
      /* 重新校验 */
      this.$refs.ruleForm.validateField("img02");
    },

    /* 文件上传失败 回调 */
    fileError() {
      this.$message.error("文件上传失败，请稍后重试");
    }
  }
};
</script>

<style scoped lang="scss">
.case-management-edit-dialog {
  .el-form-item {
    margin-bottom: 22px;
  }
}
</style>
