<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a><router-link :to="$options.name" class="aside_tit">案件初审</router-link>
    </div>
    <searchs  class="item-search" :search-items="searchItems" :item="searchItem" :query-url="queryUrl"></searchs>
    <div class="item-title">
      案件列表
    </div>
    <div class="item-table">
      <table-component :pager="pager" @refreshList="refresh" :table-data="tableData" :column-define="columnDefine" >
        <el-table-column label="操作" slot="defineCol">
          <template slot-scope="scope" >
            <customer-button
              size="mini"
              @click="gotoDetail(scope.row)" >{{scope.row.batchStatus === 0 ? "审核" : "查看"}}</customer-button>
          </template>
        </el-table-column>
      </table-component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { URL_JSON } from "../../../components/script/url_json";
  import Searchs from "@/components/searchs";
  import TableComponent from "@/components/table";
  import Mixins from "@/components/script/_mixin";
  import {mapGetters} from 'vuex';
  export default {
    name: "initialHearList",
    mixins: [Mixins],
    data() {
      return {
       searchItems: [
         {type: 'text', placeholder: '互金企业、产品名称、模板号', colSpan: 6, property: 'keyWords'},
         {type: 'date', placeholder: '分配开始时间', colSpan: 5, property: 'startDate', lte: 'endDate'},
         {type: 'date', placeholder: '分配截至时间', colSpan: 5, property: 'endDate', gte: 'startDate'},
         {type: 'select', placeholder: '批次状态', colSpan: 3, property: 'batchStatus',options: [
             {label: '待审核', value: 0},
             {label: '审核完成', value: 1},
           ]},

       ],
        searchItem: {},
        queryUrl: '/firstAudit/queryFirstAuditList.htm', ///11/case/queryHzCaseInfoByBaseQuery.htm
        columnDefine:[
          {label:'互金企业', property: 'clientName'},
          {label:'模版', property: 'productName'},
          {label:'案件数量', property: 'countCase'},
          {label:'子批次数', property: 'countSubBatch'},
          {label:'分配时间', property: 'distributeTime'},
          {label:'批次状态', property: 'batchStatus',options: [
              // 0-初审中，1-待审核，2-审核完成
              {label: '待审核', value: 0},
              {label: '审核完成', value: 1},
              {label: '审核完成', value: 2},
            ],
            type: 'select'}
        ]
      };
    },
    computed: {
      ...mapGetters(['searchItemClone','pagerClone'])
    },
    methods: {
      gotoDetail(row) {
        console.log(row);
        let batchNo =  row.batchNo;
        this.$store.commit('setSearchItem',{prop: 'first', value: this.searchItem});
        this.$store.commit('setPager',{prop: 'first', value: this.pager});
        this.$router.push({
          path:'/main/initialHearDetail',
          query: {batchNo: batchNo}
        })
      }
    },
    created() {
      this.pager = this.pagerClone.first;
      this.searchItem = this.searchItemClone.first;
      this.doQuery(this.queryUrl, this.searchItem);

    },
    mounted() {
    },
    components: {
      Searchs,
      TableComponent
    }
  };
</script>

<style scoped>
</style>
