<template>
  <div class="content">
    <div class='wsbodyhead'>
      <a>所在位置</a>
      <router-link :to='$options.name' class='aside_tit'>被申请人操作记录</router-link>
    </div>
    <searchs class='item-search' :search-items='searchItems' :item='item' :query-url='queryUrl'>
      <template slot='moreBtn'>
        <el-button class='ml-20' type='primary' @click=''>导出Excel</el-button>
      </template>
    </searchs>
    <div class='item-title'>
    被申请人操作记录列表
    </div>
    <div class='item-table'>
         <table-component  :pager="pager"  @refreshList="doQuery(this.queryUrl, this.item)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data='tableData' :column-define='columnDefine' ></table-component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
import { URL_JSON } from "../../../components/script/url_json";
export default {
  name: "respondentsOperateRecord",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: URL_JSON["queryRespondentsOperateRecord"], ///11/respondents/queryOperRecordList.htm
      tableData: [{}],
      opTypeData:[],
      opObData:[],
      searchItems: [
        {
          label: "案件查询",
          type: "text",
          placeholder: "案号、申请人、被申请人、手机号",
          colSpan: 4,
          property: "keyWords"
        },
        {
          label: "操作日期",
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
          type: "select",
          colSpan: 4,
          property: "merchantCode"
        },
        {
          label: "产品名称",
          type: "select",
          colSpan: 4,
          property: "productName"
        },
        {
          label: "操作案件阶段",
          type: "select",
          colSpan: 4,
          property: "caseProcess"
        },
        {
          label: "操作案件状态",
          type: "select",
          colSpan: 4,
          property: "statusThree"
        },
        {
          label: "操作类型",
          type: "select",
          colSpan: 4,
          property: "operType",
          newline: 1,
          options: this.opTypeData,
          labelfield: "desc",
          valuefield: "operType"
        },
        {
          label: "操作对象",
          type: "select",
          colSpan: 4,
          options: this.opObData,
          property: "operObject",
          labelfield: "desc",
          valuefield: "operObject"
        }
      ],
      columnDefine: [
        {
          label: "被申请人",
          property: "respondents"
        },
        {
          label: "被申请人手机",
          property: "resPhone",
          width: "150"
        },
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
          label: "案件阶段",
          property: "caseProcessCn"
        },
        {
          label: "案件状态",
          property: "statusThreeCn"
        },
        {
          label: "操作类型",
          property: "operTypeCn"
        },
        {
          label: "操作对象",
          property: "operObjectCn"
        },
        {
          label: "操作时间",
          property: "operTime"
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
    },
    optsTypeListView() {
      this.$http.post(URL_JSON["queryOperType"]).then(res => {
        console.info("type::::", res);
        this.searchItems[7].options = res.result.list;

      });
    },
    optsObjListView() {
      this.$http.post(URL_JSON["queryOperObject"]).then(res => {
        console.info("obj:::::", res);
        this.searchItems[8].options = res.result.list;

      });
    }
  },
  created() {
    this.optsTypeListView(); //操作类型
    this.optsObjListView(); //操作对象
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
