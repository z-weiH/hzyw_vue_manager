<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a><router-link :to="$options.name" class="aside_tit">案件列表</router-link>
    </div>
    <searchs class="item-search" :search-items="searchItems" :item="item" :query-url="queryUrl">
      <template slot="moreBtn">
          <el-button class="ml-20" type="primary" @click="">导出Excel</el-button>
      </template>
    </searchs>
    <div class="item-title">
      案件列表
    </div>
    <div class="item-table">
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine" ></table-component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "caseListView",
  extends: Mixins,
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
          options: [
            {
              label: "企业一",
              value: "001"
            },
            {
              label: "企业二",
              value: "002"
            },
            {
              label: "企业三",
              value: "003"
            },
            {
              label: "企业四",
              value: "004"
            }
          ]
        },
        {
          label: "产品名称",
          type: "select",
          property: "productCode",
          colSpan: 4,
          options: [
            {
              label: "产品一",
              value: "001"
            },
            {
              label: "产品二",
              value: "002"
            },
            {
              label: "产品三",
              value: "003"
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
              label: "产品一",
              value: "001"
            },
            {
              label: "产品二",
              value: "002"
            },
            {
              label: "产品三",
              value: "003"
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
              label: "产品一",
              value: "001"
            },
            {
              label: "产品二",
              value: "002"
            },
            {
              label: "产品三",
              value: "003"
            }
          ]
        },
        {
          label: "案件阶段",
          type: "select",
          property: "caseProcess",
          colSpan: 4,
          options: [
            {
              label: "产品一",
              value: "001"
            },
            {
              label: "产品二",
              value: "002"
            },
            {
              label: "产品三",
              value: "003"
            }
          ]
        },
        {
          label: "案件状态",
          type: "select",
          property: "statusThree",
          colSpan: 4,
          options: [
            {
              label: "产品一",
              value: "001"
            },
            {
              label: "产品二",
              value: "002"
            },
            {
              label: "产品三",
              value: "003"
            }
          ]
        },
        {
          label: "应裁情况",
          type: "select",
          property: "decideStatus",
          colSpan: 4,
          newline: 1,
          options: [
            {
              label: "产品一",
              value: "001"
            },
            {
              label: "产品二",
              value: "002"
            },
            {
              label: "产品三",
              value: "003"
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
              label: "产品一",
              value: "001"
            },
            {
              label: "产品二",
              value: "002"
            },
            {
              label: "产品三",
              value: "003"
            }
          ]
        }
      ],
      searchItem: {},
      item: {},
      currentItem: {},
      queryUrl: '/11/case/queryHzCaseInfoByBaseQuery.htm',
      // // 数据总数
      // total: 11,
      // // 当前页数
      // currentPage: 1,
      // // 每页数量
      // pageSize: 10,
      tableData:[],
      columnDefine: [
        { label: "案件编号", property: "arbCaseId" },
        { label: "互金企业", property: "platName" },
        { label: "申请人", property: "applicants" },
        { label: "被申请人", property: "respondents" },
        { label: "被申请人手机", property: "resPhone" },
        { label: "案件阶段", property: "caseProcess" },
        { label: "案件状态", property: "caseStatus" },
        {
          label: "提交日期",
          property: "submitTime",
          width: 150,
          children: [
            {
              label: "逾期天数",
              property: "overdueDate"
            },
            {
              label: "处理天数",
              property: "dealDate"
            },
            {
              label: "立案日期",
              property: "startTime"
            },
            {
              label: "组庭日期",
              property: "buildTime"
            },
            {
              label: "结案日期",
              property: "closeTime"
            },
            {
              label: "应裁日期",
              property: "takeTime"
            },
            {
              label: "借款日期",
              property: "borrowingDate"
            },
            {
              label: "应还款日期",
              property: "reimbursementDate"
            },
            {
              label: "冻结日期",
              property: "freezeDate"
            },
            {
              label: "解冻日期",
              property: "unfreezeDate"
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
              property: "adjustAmt"
            },
            {
              label: "已还款总额",
              property: "reimbursementAmt"
            },
            {
              label: "合同借款金额",
              property: "contractLoanAmt"
            },
            {
              label: "打款金额",
              property: "payAmt"
            },
            {
              label: "平台服务费",
              property: "platformFee"
            },
            {
              label: "利息",
              property: "interestAmt"
            },
            {
              label: "违约金",
              property: "penaltyAmt"
            },
            {
              label: "仲券服务费",
              property: "caseTicketFee"
            },
            {
              label: "预缴受理费",
              property: "prepaymentAmt"
            },
            {
              label: "受理费退费",
              property: "acceptReturnAmt"
            },
            {
              label: "处理费",
              property: "handFee"
            },
            {
              label: "仲券",
              property: "caseTicket"
            }
          ]
        }
      ]
    };
  },
  methods: {
    doQuery (url,item) {
      this.query(url,item).then(res => {
        console.warn('0000000**************');
        console.info(res);
        this.tableData = res.result.list;
        console.log(res.result.list);
      })
    }
  },
  mounted () {
    this.doQuery(this.queryUrl, this.item);
  },
   components: {
    Searchs,
    TableComponent
  },
};
</script>

<style scoped>

</style>
