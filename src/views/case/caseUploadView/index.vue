<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link to="/main/caseUploadRecord">案件上传记录</router-link>
      <router-link :to="$options.name" class="aside_tit">案件上传</router-link>
    </div>
    <!--BEGIN 查询条件 -->
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="100px">
        <el-form-item label="互金企业：" prop="clientCode">
          <el-select
            filterable
            clearable
            style="width:170px;"
            v-model="ruleForm.clientCode"
            placeholder="请选择企业"
            @change="handleClientCodeChange"
          >
            <el-option
              :label="item.merchantName"
              :value="item.code"
              v-for="(item,index) in companyOptions"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称：" prop="productCode">
          <el-select
            filterable
            clearable
            style="width:170px;"
            v-model="ruleForm.productCode"
            placeholder="请选择产品"
            @change="handleProductCodeChange"
          >
            <el-option
              :label="item.prodName"
              :value="item.prodName+'__'+item.prodCode"
              v-for="(item,index) in productOptions"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板编码：" prop="templateCode">
          <el-select
            filterable
            clearable
            style="width:170px;"
            v-model="ruleForm.templateCode"
            placeholder="请选择模板"
            @change="handleTmplChange"
          >
            <el-option
              :label="item.templateName"
              :value="item.templateCode"
              v-for="(item,index) in templateOptions"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!--END 查询条件 -->
    <!-- BEGIN 内容 -->
    <div class="item-title of-hidden">
      <span class="item-title-sign">案件上传操作</span>
      <progress-zbar></progress-zbar>
    </div>
    <div class="item-table num-detection-cont">
      <template>
        <div class="font-center" style="padding-top: 100px;">
          <el-upload
            class="upload-box"
            :action="`${$host}/phoneDetect/uploadExcel.htm`"
            :show-file-list="false"
            :before-upload="uploadBefore"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :data="{
              token : token,
            }"
            accept=".zip"
          >
            <el-button type="primary" :disabled="filebtnstate">
              <i class="el-icon-upload el-icon--left"></i>批量上传案件
            </el-button>
          </el-upload>
          <p class="mt-20 color-666">请上传符合规范格式的模板文件，支持文件格式.zip</p>
        </div>
      </template>
    </div>
    <!-- END 内容 -->
  </div>
</template>


<script type='text/ecmascript-6'>
import { URL_JSON } from "../../../components/script/url_json";
import exportFile from "@/assets/js/exportFile";
import Searchs from "@/components/searchs";
import Mixins from "@/components/script/_mixin";
export default {
  name: "caseUploadView",
  mixins: [Mixins],
  components: {
  },
  data() {
    return {
      ruleForm: {
        // 互金企业
        clientCode: "",
        // 产品名称
        productCode: "",
        // 模板号
        templateCode: ""
      },
      // 所属企业 options
      companyOptions: [
        /* {
            merchantName : '青岛鲁金所股权投资基金有限公司',
            code : '1',
          } */
      ],
      // 所属产品 options
      productOptions: [
        /* {
            prodName : '闪来钱',
            prodCode : '30',
          } */
      ],
      // 所属模板 options
      templateOptions: [
        /* '3001', */
      ],
      pager: {
        // 数据总数
        total: 11,
        // 当前页数
        currentPage: 1,
        // 每页数量
        pageSize: 10
      }
    };
  },
  computed: {
    filebtnstate() {
      if (this.ruleForm.clientCode) {
        if (this.ruleForm.clientCode != "") {
          // console.log("true");
          return false;
        } else {
          // console.log("false");
          return true;
        }
      } else {
        // console.log("true");
        return true;
      }
    }
  },
  watch: {
    filebtnstate(val) {
      console.log("rrrr", val);
      !val;
      // && console.log(val);
    }
  },
  methods: {
    // 互金企业 change
    handleClientCodeChange(val) {
      // 清空旧数据
      this.ruleForm.productCode = "";
      this.ruleForm.templateCode = "";
      this.productOptions = [];
      this.templateOptions = [];
      // 拉取产品列表
      val && this.optsPduListView();
    },
    // 产品名称 change
    handleProductCodeChange(val) {
      // 清空旧数据
      this.ruleForm.templateCode = "";
      this.templateOptions = [];
      // 拉取模板列表
      val && this.optsTemplateCode();
    },
    // 产品模板 change
    handleTmplChange(val) {
      console.log(val);
    },
    optsCompanyListView() {
      this.$http.post("/merchant/queryMerchants.htm").then(res => {
        this.companyOptions = res.result.list;
      });
    },
    optsPduListView(params) {
      this.$http.post("/case/queryProducts.htm", params).then(res => {
        this.productOptions = res.result;
      });
    },
    optsTemplateCode(params) {
      this.$http
        .post("/case/queryTemplatesByProductCode.htm", params)
        .then(res => {
          this.templateOptions = res.result;
        });
    },
    doQuery(url, item) {
      this.query(url, item).then(res => {
        console.info(res);
        //  this.tableData = res.result.list;
        //   this.total = res.result.count;
      });
    },
    // 文件上传成功
    uploadSuccess(res, file, fileList) {
      // 上传成功
      if (res.code === "0000") {
      } else {
        this.$message.error(res.description);
      }
    },
    // 文件上传失败
    uploadError() {
      this.$message.error("文件上传失败，请稍后重试");
    },
    // 文件上传前回调
    uploadBefore(file) {}
  },
  created() {
    // this.caseUploadBtnType();
    this.optsCompanyListView(); //互金企业
  },
  mounted() {}
};
</script>


<style lang='scss' scoped>
.font-center {
  text-align: center;
}
.num-detection-cont {
  height: 300px;
}
</style>
