<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link :to="$options.name" class="aside_tit">调解短信</router-link>
    </div>
    <searchs
      class="item-search"
      :search-items="searchItems"
      :item="searchItem"
      :query-url="queryUrl"
      @valueChange="searchItemChange"
    ></searchs>
    <div class="item-title">调解短信列表</div>
    <div class="item-table">
      <table-component
        :pager="pager"
        :needCheckbox="true"
        :table-data="tableData"
        :column-define="columnDefine"
        @slectionChange="slectionChange"
      ></table-component>
      <div class="center mb-20">
        <el-button type="primary" :disabled="isDisabled" @click="sendInfo">发送调解通知</el-button>
      </div>
    </div>
    <send-info ref="sendInfoDlg" :edit-state="editState"></send-info>
  </div>
</template>
<script type="text/ecmascript-6">
import { URL_JSON } from "../../../components/script/url_json";
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
import SendInfo from "./modules/sendInfo";
import Vue from "vue";
export default {
  name: "mediationMsg",
  extends: Mixins,
  data() {
    return {
      selection: [],
      item: {},
      queryUrl: "/adjust/queryAdjustCaseListByBaseQuery.htm",
      searchItem: {},
      tableData: [],
      searchItems: [
        {
          label: "案件查询",
          type: "text",
          placeholder: "案号、申请人、被申请人、手机号",
          colSpan: 5,
          property: "keyWords"
        },
        // 日期类型,1:提交日期，2：立案日期，3：组庭日期，4：结案日期，5：应裁日期
        {
          type: "select",
          colSpan: 3,
          property: "dateType",
          options: [
            { label: "提交日期", value: 1 },
            { label: "立案日期", value: 2 },
            { label: "组庭日期", value: 3 },
            { label: "结案日期", value: 4 },
            { label: "应裁日期", value: 5 }
          ]
        },
        {
          type: "date",
          colSpan: 4,
          placeholder: "开始时间",
          property: "startDate"
        },
        {
          type: "date",
          colSpan: 4,
          placeholder: "结束时间",
          property: "endDate"
        },
        {
          label: "互金企业",
          type: "select",
          colSpan: 3,
          options: [],
          property: "merchantCode",
          labelfield: "merchantName",
          valuefield: "code",
          newline: 1
        },
        {
          label: "产品名称",
          type: "select",
          colSpan: 3,
          property: "productCode",
          options: [],
          labelfield: "prodName",
          valuefield: "prodCode"
        },
        {
          label: "逾期天数",
          type: "select",
          colSpan: 3,
          property: "overdueDate",
          options: [
            {
              label: "0-30天",
              value: "M1"
            },
            {
              label: "31-60天",
              value: "M2"
            },
            {
              label: "61-90天",
              value: "M3"
            },
            {
              label: "91-120天",
              value: "M4"
            },
            {
              label: "121-150天",
              value: "M5"
            },
            {
              label: "151-180天",
              value: "M6"
            },
            {
              label: "180天以上",
              value: "M7"
            }
          ]
        },
        {
          label: "案件阶段",
          type: "select",
          colSpan: 3,
          property: "caseProcess",
          options: [],
          labelfield: "desc",
          valuefield: "status"
        },
        {
          label: "案件状态",
          type: "select",
          colSpan: 3,
          property: "statusThree",
          options: [],
          labelfield: "desc",
          valuefield: "status",
          newline: 1
        },
        {
          label: "应裁情况",
          type: "select",
          colSpan: 3,
          property: "decideStatus",
          options: [
            {
              label: "未应裁",
              value: "0"
            },
            {
              label: "应裁有意见",
              value: "1"
            },
            {
              label: "应裁无意见",
              value: "2"
            }
          ]
        },
        {
          label: "短信送达",
          type: "select",
          colSpan: 3,
          property: "messageDelivery",
          // 0未送达，1送达
          options: [{ label: "未送达", value: 0 }, { label: "送达", value: 1 }]
        },
        {
          label: "短链查看",
          type: "select",
          colSpan: 3,
          property: "shortChainView",
          options: [{ label: "未查看", value: 0 }, { label: "查看", value: 1 }]
        }
      ],
      columnDefine: [
        // 案件编号	互金企业	申请人	被申请人	被申请人手机	案件阶段	案件状态	提交日期	标的金额	应裁情况	短信送达	短链查看
        // 发送调解通知
        { label: "案件编号", property: "arbCaseId" },
        { label: "互金企业", property: "platName" },
        { label: "申请人", property: "applicants" },
        { label: "被申请人", property: "respondents" },
        { label: "被申请人手机", property: "resPhone" },
        { label: "案件阶段", property: "caseProcessDesc" },
        { label: "案件状态", property: "caseStatusDesc" },
        { label: "提交日期", property: "submitTime" },
        { label: "标的金额", property: "amtBorrow" },
        { label: "应裁情况", property: "decideStatus" },
        { label: "短信送达", property: "messageDelivery" },
        { label: "短链查看", property: "shortChainView" }
      ]
    };
  },
  computed: {
    isDisabled() {
      return this.selection.length === 0;
    }
  },
  mounted() {},
  methods: {
    getMerchantCode() {
      this.$http.post(URL_JSON["selectCompany"]).then(res => {
        this.searchItems[4].options = res.result;
        // console.log('list:',res.result);
      });
    },
    getProductCode(params) {
      this.$http.post(URL_JSON["selectProduct"], params).then(res => {
        // console.log('selectProduct:::',res);
        this.searchItems[5].options = res.result;
        setTimeout(() => {
          // this.searchItem.statusThree = '';
          this.$set(this.searchItem, "productCode", "");
        }, 300);
      });
    },
    getCaseProcess() {
      this.$http.post(URL_JSON["selectHkCaseStage"]).then(res => {
        this.searchItems[7].options = res.result.list;
      });
    },
    getStatusThree(params) {
      this.$http.post(URL_JSON["selectHkCaseStatus"], params).then(res => {
        // console.error("", res.result.list);

        this.searchItems[8].options = res.result.list;
        setTimeout(() => {
          // this.searchItem.statusThree = '';
          this.$set(this.searchItem, "statusThree", "");
        }, 300);
      });
    },
    searchItemChange(item) {
      console.log(item);
      for (let i in item) {
        switch (item[i]) {
          case "merchantCode":
            if (item["value"] != "") {
              this.getProductCode({ merchantCode: item.value });
            } else {
              this.searchItems[5].options = [];
              this.$set(this.searchItem, "productCode", "");
            }
            break;
          case "caseProcess":
            if (item["value"] != "") {
              this.getStatusThree({ status: item.value });
            } else {
              this.searchItems[8].options = [];
              this.$set(this.searchItem, "statusThree", "");
            }
            break;
          default:
            break;
        }
      }
    },
    sendInfo() {
      this.editState = 1;
      let myDate = new Date();
      let year = myDate.getFullYear();
      let month =
        myDate.getMonth() + 1 >= 10
          ? myDate.getMonth() + 1
          : "0" + (myDate.getMonth() + 1);
      let day =
        myDate.getDate() + 1 >= 10
          ? myDate.getDate() + 1
          : "0" + (myDate.getDate() + 1);
      this.$refs["sendInfoDlg"].mediatorId1 = "";
      this.$refs["sendInfoDlg"].mediatorId2 = "";
      this.$refs["sendInfoDlg"].date2 = year + "-" + month + "-" + day;
      this.$refs["sendInfoDlg"].hour2 = 24;
      this.$refs["sendInfoDlg"].date3 = year + "-" + month + "-" + day;
      this.$refs["sendInfoDlg"].hour3 = 24;
      this.$refs["sendInfoDlg"].mediatorId4 = "";
      this.$refs["sendInfoDlg"].payment4 = "";

      this.$refs["sendInfoDlg"].smsType = "";
      this.$refs["sendInfoDlg"].mediatorIdz1 = "";
      this.$refs["sendInfoDlg"].mediatorIdz2 = "";
    },
    slectionChange(selection) {
      console.log(selection);
      this.selection = selection;
    }
  },
  created() {
    this.getMerchantCode();
    // this.getProductCode();
    this.getCaseProcess();
    this.getStatusThree();
    this.doQuery(this.queryUrl, this.item);
  },
  components: {
    Searchs,
    TableComponent,
    SendInfo
  }
};
</script>
<style scoped lang="scss">
</style>
