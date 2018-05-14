<template>
  <div class="content">
    <div class='content'>
      <div class='wsbodyhead'>
        <a>所在位置</a>
        <router-link :to='options.name' class='aside_tit'>被申请人操作记录</router-link>
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
<table-component :table-data='tableData' :column-define='columnDefine' ></table-component>
</div>
</div>
 </div>
</template>

<script type="text/ecmascript-6">
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "paymentInformation",
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
        this.tableData = res.result[0].list;
      });
    }
  },
  mounted() {
    this.doQuery(this.queryUrl, this.item);
  },
  components: {}
};
</script>

<style scoped lang="scss">

</style>
