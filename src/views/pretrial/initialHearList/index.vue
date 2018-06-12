<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a><router-link :to="$options.name" class="aside_tit">案件初审</router-link>
    </div>
    <searchs @valueChange="searchItemChange" class="item-search" :search-items="searchItems" :item="searchItem" :query-url="queryUrl"></searchs>
    <div class="item-title">
      案件列表
    </div>
    <div class="item-table">
      <table-component :pager="pager" @refreshList="refresh" :table-data="tableData" :column-define="columnDefine" >
        <el-table-column label="操作" slot="defineCol">
          <template slot-scope="scope" >
            <el-button
              size="mini"
              @click="gotoDetail(scope.row)" v-if="scope.row.batch_status === 0 || scope.row.batch_status === 2" >待确认</el-button>
            <span v-else>--</span>
            <el-button  size="mini" @click="gotoDetail(scope.row)">test</el-button>

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
  export default {
    name: "initialHearList",
    mixins: [Mixins],
    data() {
      return {
       searchItems: [
         {type: 'text', placeholder: '互金企业、产品名称、模板号', colSpan: 6, property: 'keyWords'},
         {type: 'date', placeholder: '分配开始时间', colSpan: 5, property: 'startDate'},
         {type: 'date', placeholder: '分配截至时间', colSpan: 5, property: 'endDate'},
         {type: 'select', placeholder: '批次状态', colSpan: 4, property: 'batch_status',options: [
             {label: '待初审', value: 0},
             {label: '待复审', value: 1},
             {label: '退回重审', value: 2},
             {label: '预审完成', value: 3},
           ]},

       ],
        searchItem: {},
        queryUrl: '/20/firstAudit/queryFirstAuditList.htm', ///11/case/queryHzCaseInfoByBaseQuery.htm
        columnDefine:[
          {label:'互金企业', property: 'clientName'},
          {label:'产品', property: 'productName'},
          {label:'案件数量', property: 'countCase'},
          {label:'子批次数', property: 'countSubBatch'},
          {label:'分配时间', property: 'distributeTime'},
          // 0-待初审，1-待复审，2-退回重审，3-预审完成'
          {label:'批次状态', property: 'batchStatus',options: [
              {label: '待初审', value: 0},
              {label: '待复审', value: 1},
              {label: '退回重审', value: 2},
              {label: '预审完成', value: 3},
            ],
            type: 'select'}
        ]
      };
    },
    methods: {
      gotoDetail(row) {
        this.$router.push({
          path:'/main/initialHearDetail',
          query: {bacthNo: row.bacthNo}
        })
      }
    },
    created() {

    },
    mounted() {
      this.doQuery(this.queryUrl, this.searchItem);
    },
    components: {
      Searchs,
      TableComponent
    }
  };
</script>

<style scoped>
</style>
