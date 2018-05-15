<template>
<div class="content">
   <div class='content'>
        <div class='wsbodyhead'>
         <a>所在位置</a>
         <router-link :to='$options.name' class='aside_tit'>客户分配</router-link>
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
</div>
</template>
<script type="text/ecmascript-6">
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
import customerAllotCreate from "./modules/create";
export default {
  name: "customerAllot",
  extends: Mixins,
  data() {
    return {
      item: {},
      editState: 0, // 4 编辑权限
      deleteConfirm: false,
      currentItem: {},
      queryUrl: "/13/distribution/queryDistributionByBaseQuery.htm",
      tableData: [{}],
      searchItems: [
        {
          label: "互金企业",
          type: "select",
          colSpan: 4,
          property: "merchantCode"
        },{
          label: "运营人员",
          type: "select",
          colSpan: 4,
          property: "operatorId"
        },{
          label: "分配时间",
          type: "date",
          placeholder:"开始时段",
          colSpan: 4,
          property: "beginDistributeTime"
        },{
          type: "date",
          placeholder: "结束时段",
          colSpan: 4,
          property: "endDistributeTime"
        }
      ],
      columnDefine: [
        {
          label: "互金企业",
          property: "merchantName"
        },
        {
          label: "运营人员",
          property: "operatorName"
        },
        {
          label: "分配时间",
          property: "distributeTime"
        }
      ],
      actions: [
        {
          label: "操作",
          btns: [
            { label: "解除分配", function: this.doEdit },
          ]
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
    TableComponent,
    customerAllotCreate
  }
};
</script>
<style scoped lang="scss">

</style>
