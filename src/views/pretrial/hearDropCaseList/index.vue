<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link :to="$options.name" class="aside_tit">证据缺失案件库</router-link>
    </div>
    <searchs
      @valueChange="searchItemChange"
      class="item-search"
      :search-items="searchItems"
      :item="searchItem"
      :query-url="queryUrl"
    >
      <template slot="moreBtn">

        <el-button
          class="ml-20"
          type="primary"
          @click="handleExport"
          :disabled="(
            searchItem.keyWords ||searchItem.productName || searchItem.productId || searchItem.startDate || searchItem.endDate
          ) ? false : true"
        >导出Excel</el-button>
      </template>
    </searchs>
    <div class="item-title">缺失案件列表</div>
    <div class="item-table">
      <table-component
        :pager="pager"
        @refreshList="doQuery(this.queryUrl, this.searchItem)"
        :table-data="tableData"
        :column-define="columnDefine"
      ></table-component>
    </div>
  </div>
</template>


<script type='text/ecmascript-6'>
import { URL_JSON } from "../../../components/script/url_json";
import exportFile from "@/assets/js/exportFile";
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "hearDropCaseList",
  mixins: [Mixins],
  data() {
    return {
      searchItem: {},
      queryUrl: "/failedReason/evidenceMissing.htm",
      exportBtnType: true,
      item: {},
      exportUrl: "/failedReason/missingCaseDerivation.htm",
      // pager: {
      //   // 数据总数
      //   total: null,
      //   // 当前页数
      //   currentPage: 1,
      //   // 每页数量
      //   pageSize: 10
      // },
      tableData: [{}],
      searchItems: [
        {
          type: "text",
          placeholder: "客户名称、借款单号、被申请人姓名",
          colSpan: 9,
          property: "keyWords"
        },
        {
          type: "text",
          placeholder: "产品名称",
          colSpan: 4,
          property: "productName"
        },
        {
          type: "text",
          placeholder: "模版号",
          colSpan: 5,
          property: "productId"
        },
        {
          type: "date",
          colSpan: 5,
          placeholder: "推送开始日期",
          property: "startDate",
          newline: 1
        },
        {
          type: "date",
          colSpan: 5,
          placeholder: "推送结束日期",
          property: "endDate"
        }
      ],
      columnDefine: [
        {
          label: "客户名称",
          property: "clientName",
          width: 300
        },
        {
          label: "产品名称",
          property: "productName",
          width: 160
        },
        {
          label: "模版号",
          property: "productId",
          width: 120
        },
        {
          label: "借款单号",
          property: "loanBillNo"
          // width: 100
        },
        {
          label: "被申请人姓名",
          property: "respondents",
          width: 130
        },
        {
          label: "推送时间",
          property: "pushDay",
          width: 160
        },
        {
          label: "整合失败原因",
          property: "failedReason",
          width: 280
        }
      ]
    };
  },
  methods: {
    handleExport() {
      console.info("searchItem:::", this.searchItem);
      let _token = JSON.parse(localStorage.getItem("loginInfo")).token;
      this.searchItem.token = _token;
      exportFile({
        url: this.exportUrl,
        data: this.searchItem
      });
    },
    searchItemChange(item) {
      // 输入时条件变动 和 检索时条件
      // 从下标3开始有空值就设置一次禁用按钮,否则开启按钮
      // 直到呈现按钮最终状态
      // for (var i in item) {
      //   if (i > 2) {
      //     console.log("i", i);
      //     item[i] != ""
      //       ? (this.exportBtnType = false)
      //       : (this.exportBtnType = true);
      //   }
      // }
      // console.error(item);
    },
    doQuery(url, item) {
      this.query(url, item).then(res => {
      });
    }
  },
  created() {},
  mounted() {
    this.doQuery(this.queryUrl, this.searchItem);
  },
  components: {
    Searchs,
    TableComponent
  }
};
</script>


<style lang='scss' scoped>
</style>
