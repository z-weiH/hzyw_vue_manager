<template>
  <div class='content'>
    <div class='wsbodyhead'>
      <a>所在位置</a>
      <router-link :to='$options.name' class='aside_tit'>还款信息</router-link>
    </div>
    <searchs class='item-search' :search-items='searchItems' :item='item' :query-url='queryUrl'>
        <template slot='moreBtn'>
              <el-button class='ml-20' type='primary' @click=''>导出Excel</el-button>
        </template>
    </searchs>
    <div class='item-title'>
      还款信息列表
    </div>
    <div class='item-table'>
      <table-component  :pager="pager"  @refreshList="doQuery(this.queryUrl, this.item)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data='tableData' :column-define='columnDefine' ></table-component>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "paymentInformation",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: "/11/repayment/queryRepaymentList.htm",
      pager: {
        // 数据总数
        total: 11,
        // 当前页数
        currentPage: 1,
        // 每页数量
        pageSize: 10
      },
      tableData: [{}],
      searchItems: [
        {
          label: "案件查询",
          type: "text",
          placeholder: "案号、申请人、被申请人、手机号",
          colSpan: 8,
          property: "keyWords"
        },
        {
          type: "select",
          placeholder: "日期选择",
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
          ],
          property: "repaymentTime"
        },
        {
          type: "date",
          placeholder: "开始日期",
          colSpan: 4,
          property: "startDate"
        },
        {
          type: "date",
          placeholder: "结束日期",
          colSpan: 4,
          property: "endDate"
        },
        {
          label: "互金企业",
          newline: 1,
          type: "select",
          placeholder: "互金企业",
          colSpan: 3,
          property: "merchantCode"
        },
        {
          label: "产品名称",
          type: "select",
          placeholder: "产品名称",
          colSpan: 3,
          property: "productName"
        },
        {
          label: "还款案件阶段",
          type: "select",
          placeholder: "还款案件阶段",
          colSpan: 3,
          property: "caseProcess"
        },
        {
          label: "还款案件状态",
          type: "select",
          placeholder: "还款案件状态",
          colSpan: 3,
          property: "statusThree"
        }
      ],
      columnDefine: [
        {
          label: "案件编号",
          property: "caseNo"
        },
        {
          label: "互金企业",
          property: "merchantName"
        },
        {
          label: "产品名称",
          property: "productName"
        },
        {
          label: "申请人",
          property: "applicants"
        },
        {
          label: "被申请人",
          property: "respondents"
        },
        {
          label: "被申请人手机",
          property: "resPhone"
        },
        {
          label: "还款金额",
          property: "repaymentAmt"
        },
        {
          label: "还款时间",
          property: "repaymentTime"
        },
        {
          label: "还款案件阶段",
          property: "caseProcess"
        },
        {
          label: "还款案件状态",
          property: "statusThree"
        },
        {
          label: "提交后天数",
          property: "submitDate"
        },
        {
          label: "标的金额",
          property: "amtBorrow"
        },
        {
          label: "逾期天数",
          property: "overdueDate"
        },
        {
          label: "已还款总额",
          property: "reimbursementAmt"
        },
        {
          label: "打款金额",
          property: "payAmt"
        }
      ]
    };
  },
  methods: {
    doQuery(url, item) {
      this.query(url, item).then(res => {
        this.tableData = res.result.list;
        this.total = res.result.count;
        console.log("ttttttttttttttttttttt");
        console.info(res.result.count);
      });
    }
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

<style scoped >

</style>

