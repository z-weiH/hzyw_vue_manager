<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link to="/main/reRunAwardCaseList" class="aside_tit">重跑裁决书案件列表</router-link>
      <router-link :to="$options.name" class="aside_tit">重跑裁决书历史记录</router-link>
    </div>
    <!-- <searchs
      @valueChange="searchItemChange"
      class="item-search"
      :search-items="searchItems"
      :item="searchItem"
      :query-url="queryUrl"
    >
      <template slot="moreBtn"></template>
    </searchs> -->
    <div class="item-title">历史记录<span>总条数：{{pager.count}}条</span></div>
    <div class="item-table">
      <table-component
        :pager="pager"
        @refreshList="doQuery(this.queryUrl, this.searchItem)"
        :table-data="tableData"
        :column-define="columnDefine"
        :actions="actions"
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
  name: "reRunAwardHistory",
  mixins: [Mixins],
  data() {
    return {
      queryUrl:'/award/queryAwardByBaseQuery.htm',
      searchItem: {},
      item: {},
      pager: {
        // 数据总数
        count: 0,
        // 当前页数
        currentPage: 1,
        // 每页数量
        pageSize: 10
      },
      tableData: [{}],
      searchItems: [
        {
          label: "",
          type: "text",
          placeholder: "",
          colSpan: null,
          property: ""
        }
      ],
      columnDefine: [
        {
          label: "失败数量",
          property: "failTotal",
          width: 130
        },
        {
          label: "操作人",
          property: "operName",
          width: 150
        },
        {
          label: "总数量",
          property: "total",
          width: 130
        },
        {
          label: "操作时间",
          property: "createTime",
          width:170
        },
      ],
      actions:[
        {
          label: "操作",
          btns: [{label: "查看详细内容", function: this.doShowDetail }]
        }
      ]
    };
  },
  methods: {
    doShowDetail(it){
      this.$router.push({
        path:'reRunOperateDetail',
        query:it.id
      })
    },
    doQuery(url, item) {
      this.query(url, item).then(res => {
        console.info(res);
        //  this.tableData = res.result.list;
        //   this.total = res.result.count;
        this.pager.count = res.result.count;
      });
    }
  },
  created() {},
  mounted() {
    this.doQuery(this.queryUrl, this.searchItem);
  },
  components: {
    // Searchs,
    TableComponent
  }
};
</script>


<style lang='scss' scoped>
</style>
