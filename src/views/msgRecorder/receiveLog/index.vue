<template>
<div class="content">
   <div class='content'>
        <div class='wsbodyhead'>
         <a>所在位置</a>
         <router-link :to='$options.name' class='aside_tit'>接收记录</router-link>
        </div>
        <searchs class='item-search' :search-items='searchItems' :item='item' :query-url='queryUrl'>
          <template slot='moreBtn'><el-button class='ml-20' type='primary' @click=''>导出Excel</el-button></template>
        </searchs>
        <div class='item-title'>
          接收记录列表
        </div>
        <div class='item-table'>
           <table-component  :pager="pager"  @refreshList="doQuery(this.queryUrl, this.item)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data="tableData"  :column-define="columnDefine" ></table-component>
        </div>
   </div>
</div>
</template>
<script type="text/ecmascript-6">
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "receiveLog",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: "/14/receive/querySmsReceiveByBaseQuery.htm",
      tableData: [{}],
      searchItems: [
        {
          label: "接收日期",
          type: "date",
          placeholder: "开始日期",
          colSpan: 4,
          property: "beginReceiveTime"
        },{
          type: "date",
          placeholder: "结束日期",
          colSpan: 4,
          property: "endReceiveTime"
        },{
          type: "text",
          placeholder: "手机号、内容",
          colSpan: 4,
          property: "keyWords"
        }
      ],
      columnDefine: [
        {
          label: "手机号",
          property: "sendPhone"
        },{
          label: "被申请人",
          property: "respondents"
        },{
          label: "疑似案件编号",
          property: "case_num"
        },{
          label: "互金企业",
          property: "platName"
        },{
          label: "产品名称",
          property: "productName"
        },{
          label: "申请人",
          property: "applicants"
        },{
          label: "案件阶段",
          property: "caseProcess"
        },{
          label: "接收时间",
          property: "receiveTime"
        },{
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
