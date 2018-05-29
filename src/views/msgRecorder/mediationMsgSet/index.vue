<template>
<div class="content">
        <div class='wsbodyhead'>
         <a>所在位置</a>
         <router-link :to='options.name' class='aside_tit'>还款信息</router-link>
        </div>
        <searchs class='item-search' :search-items='searchItems' :item='item' :query-url='queryUrl'>
          <template slot='moreBtn'><el-button class='ml-20' type='primary' @click=''>导出Excel</el-button></template>
        </searchs>
        <div class='item-title'>

        </div>
        <div class='item-table'>
           <table-component  :pager="pager"  @refreshList="doQuery(this.queryUrl, this.item)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data="tableData"  :column-define="columnDefine" ></table-component>
        </div>
</div>
</template>
<script type="text/ecmascript-6">
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "mediationMsgSet",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: "",
      tableData: [{}],
      searchItems: [
        {
          label: "",
          type: "",
          placeholder: "",
          colSpan: 4,
          property: ""
        }
      ],
      columnDefine: [
        {
          label: "",
          property: ""
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
