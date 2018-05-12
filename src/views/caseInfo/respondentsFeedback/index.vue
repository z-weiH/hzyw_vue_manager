<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link :to="$options.name" class="aside_tit">被申请人反馈</router-link>
    </div>
    <searchs class="item-search" :search-items="searchItems" :item="item" :query-url="queryUrl">
        <template slot="moreBtn">
              <el-button class="ml-20" type="primary" @click="">导出Excel</el-button>
        </template>
    </searchs>
    <div class="item-title">
      被申请人反馈列表
    </div>
    <div class="item-table">
      <table-component :table-data="tableData" :column-define="columnDefine" ></table-component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "respondentsFeedback",
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
          colSpan: 3,
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
          colSpan: 3,
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
          property: "hearStatus",
          colSpan: 3,
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
          label: "短信送达",
          type: "select",
          property: "statusThree",
          colSpan: 3,
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
          label: "短链查看",
          type: "select",
          property: "decideStatus",
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
        }
      ],
      item: {},
      queryUrl: "/11/feedback/queryRespondentFeedbackByBaseQuery.htm",
      tableData: [{}],
      columnDefine: [
        { label: "案件编号", property: "arbCaseId" },
        { label: "互金企业", property: "platName" },
        { label: "产品名称", property: "productName" },
        { label: "申请人", property: "applicants" },
        { label: "被申请人", property: "respondents" },
        { label: "被申请人手机", property: "resPhone" },
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
          width:150,
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
    doQuery(url, item) {
      this.query(url, item).then(res => {
        this.tableData = res.result[0].list;
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

<style scoped lang="scss">

</style>
