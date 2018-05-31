<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link :to="$options.name" class="aside_tit">被申请人反馈</router-link>
    </div>
    <searchs @valueChange="searchItemChange"  class="item-search" :search-items="searchItems" :item="item" :query-url="queryUrl">
        <template slot="moreBtn">
              <el-button class="ml-20" type="primary" @click="handleExport">导出Excel</el-button>
        </template>
    </searchs>
    <div class="item-title">
      被申请人反馈列表
    </div>
    <div class="item-table">
      <table-component  :pager="pager"  @refreshList="doQuery(this.queryUrl, this.item)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data='tableData' :column-define='columnDefine' ></table-component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "../../../components/script/url_json";
import exportFile from "@/assets/js/exportFile";
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "respondentsFeedback",
  mixins: [Mixins],
  data() {
    return {
      searchItems: [
        {
          label: "案件查询",
          type: "text",
          placeholder: "案号、申请人、被申请人、手机号",
          colSpan: 9,
          property: "keyWords"
        },
        {
          type: "select",
          colSpan: 4,
          property: "dateType",
          options: [
            {
              label: "提交日期",
              value: "1"
            },
            {
              label: "立案日期",
              value: "2"
            },
            {
              label: "组庭日期",
              value: "3"
            },
            {
              label: "结案日期",
              value: "4"
            },
            {
              label: "应裁日期",
              value: "5"
            }
          ]
        },
        {
          type: "date",
          colSpan: 4,
          placeholder: "开始日期",
          property: "startDate"
        },
        {
          type: "date",
          colSpan: 4,
          placeholder: "结束日期",
          property: "endDate"
        },
        {
          label: "互金企业",
          type: "select",
          property: "merchantCode",
          options: this.opCompany,
          labelfield: "merchantName",
          valuefield: "code",
          colSpan: 3,
        },
        {
          label: "产品名称",
          type: "select",
          property: "productCode",
          colSpan: 3,
          options: this.opProduct,
          labelfield: "prodName",
          valuefield: "prodCode"
        },
        {
          label: "案件阶段",
          type: "select",
          property: "hearStatus",
          colSpan: 3,
          options: this.opHkCaseStage,
          labelfield: "desc",
          valuefield: "status"
        },
        {
          label: "应裁情况",
          type: "select",
          property: "decideStatus",
          colSpan: 4,
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
          property: "messageDelivery",
          colSpan: 3,
          options: [
            {
              label: "未送达",
              value: "0"
            },
            {
              label: "送达",
              value: "1"
            }
          ]
        },
        {
          label: "短链查看",
          type: "select",
          property: "shortChainView",
          colSpan: 4,
          options: [
            {
              label: "未查看",
              value: "0"
            },
            {
              label: "查看",
              value: "1"
            }
          ]
        },
        {
          label: "逾期天数",
          type: "select",
          property: "overdueDate",
          colSpan: 4,
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
        }
      ],
      searchItem: {},
      opCompany: [],
      opProduct: [],
      opHkCaseStage: [],
      opHkCaseStatus: [],
      item: {},
      exportUrl:   URL_JSON["exportRespondentsFeedback"],
      queryUrl: URL_JSON["queryRespondentsFeedback"], //"/11/feedback/queryRespondentFeedbackByBaseQuery.htm",
      // 数据总数
      total: 11,
      // 当前页数
      currentPage: 1,
      // 每页数量
      pageSize: 10,
      tableData: [{}],
      columnDefine: [
        { label: "案件编号", property: "arbCaseId" },
        { label: "互金企业", property: "platName" },
        { label: "产品名称", property: "productName" },
        { label: "申请人", property: "applicants" },
        { label: "被申请人", property: "respondents" },
        { label: "被申请人手机", property: "resPhone", width: 150 },
        { label: "提交日期", property: "submitTime" },
        { label: "仲裁还款", property: "arbitrationRepayment" },
        { label: "案件阶段", property: "caseProcess" },
        { label: "应裁情况", property: "decideStatus" },
        { label: "应裁时间", property: "takeTime" },
        {
          label: "短信送达",
          property: "messageDelivery",
          width: 150,
          children: [
            {
              label: "提交短信",
              property: "submitMessageTime"
            },
            {
              label: "应裁短信",
              property: "takeMessageTime"
            },
            {
              label: "组庭短信",
              property: "buildMessageTime"
            },
            {
              label: "裁决短信",
              property: "judgeMessageTime"
            }
          ]
        },
        {
          label: "短链查看",
          property: "shortChainView",
          width: 150,
          children: [
            { label: "提交短链", property: "submitMessageTime" },
            { label: "应裁短链", property: "takeShortChainTime" },
            { label: "裁决短链", property: "judgeShortChainTime" },
            { label: "最近登录", property: "recentLoginTime" }
          ]
        }
      ]
    };
  },
  methods: {
    handleExport() {
       console.info('searchItem:::',this.searchItem);
      let _token = JSON.parse(localStorage.getItem('loginInfo')).token;
          this.searchItem.token = _token;
      exportFile({
        url: this.exportUrl,
        data: this.searchItem
      });
    },
    searchItemChange(item) {
      console.error(item);
      for (var i in item) {
        switch (item[i]) {
          case "merchantCode":
            console.log(item["value"]);
            this.optsPduListView({ merchantCode: item["value"] });
            break;
          case "caseProcess":
            break;
          case "operType":
            this.optsObjListView({ operType: item["value"] });
            break;
          default:
            break;
        }
      }
    },
    doQuery(url, item) {
      this.query(url, item).then(res => {
        console.info(res);
        this.tableData = res.result.list;
        this.total = res.result.count;
      });
    },
    optsCompanyListView() {
      this.$http.post(URL_JSON["selectCompany"]).then(res => {
        console.log("selectCompany:::", res);
        this.searchItems[4].options = res.result;
        // console.log('list:',res.result);
      });
    },
    optsPduListView(params) {
      this.$http.post(URL_JSON["selectProduct"], params).then(res => {
        // console.log('selectProduct:::',res);
        this.searchItems[5].options = res.result;
      });
    },
    optsHkCaseStageView() {
      this.$http.post(URL_JSON["selectHkCaseStage"]).then(res => {
        // console.log('selectHkCaseStage:::',res);
        this.searchItems[6].options = res.result.list;
      });
    },
  },
  created() {
    this.optsCompanyListView(); //互金企业
    this.optsPduListView(); //产品名称
    this.optsHkCaseStageView(); //还款案件阶段
  },
  mounted() {
    this.doQuery(this.queryUrl, this.item);
  },
  components: {
    Searchs,
    TableComponent
  }
};
</script>

<style scoped lang="scss">
</style>
