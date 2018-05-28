<template>
  <div class="content">
    <div class='content'>
      <div class='wsbodyhead'>
        <a>所在位置</a>
        <router-link :to='$options.name' class='aside_tit'>发送记录</router-link>
      </div>
      <searchs class='item-search' :search-items='searchItems' :item='item' :query-url='queryUrl'>
        <template slot='moreBtn'><el-button class='ml-20' type='primary' @click='exportFile(exportUrl)'>导出Excel</el-button></template>
      </searchs>
<div class='item-title'>
  发送记录列表
</div>
<div class='item-table'>
<table-component  :pager="pager"  @refreshList="doQuery(this.queryUrl, this.item)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data='tableData' :column-define='columnDefine' ></table-component>
</div>
</div>
 </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "../../../components/script/url_json";
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "esmqLogView",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: URL_JSON['queryEsmqLogView'],///14/send/querySmsSendByBaseQuery.htm
      tableData: [{}],
      searchItems: [
        {
          label: "短信类型",
          type: "select",
          colSpan: 6,
          property: "messageType"
        },{
          label: "发送日期",
          type: "date",
          placeholder: "开始日期",
          colSpan: 4,
          property: "beginSendTime"
        },{
          type: "select",
          placeholder: "结束日期",
          colSpan: 4,
          property: "endSendTime"
        },{
          type: "text",
          placeholder: "手机号、发送内容",
          colSpan: 4,
          property: "keyWords"
        },
      ],
      columnDefine: [
        {
          label: "案件编号",
          property: "caseNum"
        },{
          label: "申请人",
          property: "applicants"
        },{
          label: "被申请人",
          property: "respondents"
        },{
          label: "发送手机号",
          property: "sendPhone",
          width: "130"
        },{
          label: "发送时间",
          property: "sendTimeDate"
        },{
          label: "发送结果",
          property: "sendResult"
        },
        {
          label: "接收结果",
          property: "receiveResult"
        },
        {
          label: "短信类型",
          property: "messageType"
        },
        {
          label: "返回详情",
          property: "returnDetails"
        },
        {
          label: "短信内容",
          property: "messageContent"
        }
      ]
    };
  },
  methods: {
    doQuery(url, item) {
      this.query(url, item).then(res => {
        this.tableData = res.result.list;
        this.total = res.result.count;
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
