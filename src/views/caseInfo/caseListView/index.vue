<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a><router-link :to="$options.name" class="aside_tit">案件列表</router-link>
    </div>
    <searchs @valueChange="searchItemChange" class="item-search" :search-items="searchItems" :item="item" :query-url="queryUrl">
      <template slot="moreBtn">
          <el-button class="ml-20" type="primary" @click="handleExport">导出Excel</el-button>
      </template>
    </searchs>
    <div class="item-title">
      案件列表
    </div>
    <div class="item-table">
      <table-component :pager="pager" @refreshList="doQuery(this.queryUrl, this.item)" :table-data="tableData" :column-define="columnDefine" ></table-component>
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
  name: "caseListView",
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
          colSpan: 4,
          newline: 1,
          options: this.opCompany,
          labelfield: "merchantName",
          valuefield: "code"
        },
        {
          label: "产品名称",
          type: "select",
          property: "productCode",
          colSpan: 4,
          options: this.opProduct,
          labelfield: "prodName",
          valuefield: "prodCode"
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
        },
        {
          label: "审理状态",
          type: "select",
          property: "hearStatus",
          colSpan: 4,
          newline: 1,
          options: [
            {
              label: "审理中",
              value: "1"
            },
            {
              label: "已结案",
              value: "2"
            }
          ]
        },
        {
          label: "案件阶段",
          type: "select",
          property: "caseProcess",
          colSpan: 4,
          options: this.opHkCaseStage,
          labelfield: "desc",
          valuefield: "status"
        },
        {
          label: "案件状态",
          type: "select",
          property: "statusThree",
          colSpan: 4,
          options: this.opHkCaseStatus,
          labelfield: "desc",
          valuefield: "status"
        },
        {
          label: "应裁情况",
          type: "select",
          property: "decideStatus",
          colSpan: 4,
          newline: 1,
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
          label: "还款情况",
          type: "select",
          property: "repaymentStatus",
          colSpan: 4,
          options: [
            {
              label: "有还款",
              value: "1"
            },
            {
              label: "无还款",
              value: "2"
            },
            {
              label: "有仲裁后还款",
              value: "3"
            },
            {
              label: "无仲裁后还款",
              value: "4"
            }
          ]
        }
      ],

      searchItem: {},
      item: {},
      currentItem: {},
      exportUrl: /* "http://192.168.30.18:7777" + */ URL_JSON["exportCaseListView"],
      queryUrl: URL_JSON["queryCaseListView"], ///11/case/queryHzCaseInfoByBaseQuery.htm
      // 数据总数
      total: 11,
      // 当前页数
      currentPage: 1,
      // 每页数量
      pageSize: 10,
      tableData: [],
      opCompany: [],
      opProduct: [],
      opHkCaseStage: [],
      opHkCaseStatus: [],
      columnDefine: [
        { label: "案件编号", property: "arbCaseId", width: 120 },
        { label: "互金企业", property: "platName", width: 100 },
        { label: "申请人", property: "applicants", width: 100 },
        { label: "被申请人", property: "respondents", width: 100 },
        { label: "被申请人手机", property: "resPhone", width: 150 },
        { label: "案件阶段", property: "caseProcessDesc" },
        { label: "案件状态", property: "caseStatusDesc" },
        {
          label: "提交日期",
          property: "submitTime",
          width: 150,
          children: [
            {
              label: "逾期天数",
              property: "overdueDate",
              width: 100
            },
            {
              label: "处理天数",
              property: "dealDate",
              width: 100
            },
            {
              label: "立案日期",
              property: "startTime",
              width: 100
            },
            {
              label: "组庭日期",
              property: "buildTime",
              width: 100
            },
            {
              label: "结案日期",
              property: "closeTime",
              width: 100
            },
            {
              label: "应裁日期",
              property: "takeTime",
              width: 100
            },
            {
              label: "借款日期",
              property: "borrowingDate",
              width: 100
            },
            {
              label: "应还款日期",
              property: "reimbursementDate",
              width: 150
            },
            {
              label: "冻结日期",
              property: "freezeDate",
              width: 100
            },
            {
              label: "解冻日期",
              property: "unfreezeDate",
              width: 100
            }
          ]
        },
        {
          label: "标的金额",
          property: "amtBorrow",
          width: 150,
          children: [
            {
              label: "调解还款额",
              property: "adjustAmt",
              width: 110
            },
            {
              label: "已还款总额",
              property: "reimbursementAmt",
              width: 110
            },
            {
              label: "合同借款金额",
              property: "contractLoanAmt",
              width: 110
            },
            {
              label: "打款金额",
              property: "payAmt",
              width: 110
            },
            {
              label: "平台服务费",
              property: "platformFee",
              width: 110
            },
            {
              label: "利息",
              property: "interestAmt",
              width: 110
            },
            {
              label: "违约金",
              property: "penaltyAmt",
              width: 110
            },
            {
              label: "仲券服务费",
              property: "caseTicketFee",
              width: 110
            },
            {
              label: "预缴受理费",
              property: "prepaymentAmt",
              width: 110
            },
            {
              label: "受理费退费",
              property: "acceptReturnAmt",
              width: 110
            },
            {
              label: "处理费",
              property: "handFee",
              width: 100
            },
            {
              label: "仲券",
              property: "caseTicket",
              width: 100
            }
          ]
        },
        {
          label: '预测裁决额',
          property: "forecastJudgeAmt",
          width: 130,
        },
        {
          label: '仲裁还款',
          property: "arbitrationRepayment",
          width: 100,
        },
        {
          label: '应裁情况',
          property: "decideStatus",
          width: 100,
        },
        {
          label: '短信送达',
          property: "messageDelivery",
          width: 100,
        },
        {
          label: '短链查看',
          property: "shortChainView",
          width: 100,
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
      // console.warn(item);
      for (var i in item) {
        switch (item[i]) {
          case "merchantCode":
            console.log(item["value"]);
            this.optsPduListView({ merchantCode: item["value"] });
            break;
          case "caseProcess":
            this.optsHkCaseStatusView({ status: item["value"] });
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
        //  this.tableData = res.result.list;
        //   this.total = res.result.count;
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

        this.searchItems[8].options = res.result.list;
      });
    },
    optsHkCaseStatusView(params) {
      this.$http.post(URL_JSON["selectHkCaseStatus"], params).then(res => {
        console.warn("\n", res.result.list);

        this.searchItems[9].options = res.result.list;
        setTimeout(() => {
          // this.searchItem.statusThree = '';
          this.$set(this.searchItem, "statusThree", "");
          console.log(this.searchItem);
        }, 300);
      });
    }
  },
  created() {
    this.optsCompanyListView(); //互金企业
    this.optsPduListView(); //产品名称
    this.optsHkCaseStageView(); //还款案件阶段
    this.optsHkCaseStatusView(); //还款案件状态
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

<style scoped>
</style>
