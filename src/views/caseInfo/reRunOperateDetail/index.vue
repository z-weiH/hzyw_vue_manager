<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link to="/main/reRunAwardCaseList" class="aside_tit">重跑裁决书案件列表</router-link>
      <router-link to="/main/reRunAwardHistory" class="aside_tit">重跑裁决书历史记录</router-link>
      <router-link :to="$options.name" class="aside_tit">重跑裁决书操作人详细记录</router-link>
    </div>
    <!-- <searchs
      @valueChange="searchItemChange"
      class="item-search"
      :search-items="searchItems"
      :item="searchItem"
      :query-url="queryUrl"
    >
      <template slot="moreBtn"></template>
    </searchs>-->
    <div class="item-title">操作人详细记录</div>
    <div class="item-table">
      <table-component
        :pager="pager"
        @refreshList="doQuery(this.queryUrl, this.searchItem)"
        :table-data="tableData"
        :column-define="columnDefine"
      >
        <!--slot-->
        <el-table-column label="处理状态" slot="defineCol" prop="loadStatus" >
          <template slot-scope="scope">
            <span v-if="scope.row.loadStatus == 0">待处理</span>
            <span v-if="scope.row.loadStatus == 1">成功</span>
            <span v-if="scope.row.loadStatus == 2">失败</span>
          </template>
        </el-table-column>
      </table-component>
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
  name: "reRunOperateDetail",
  mixins: [Mixins],
  data() {
    return {
      queryUrl: "/award/queryAwardDetailByBaseQuery.htm",
      searchItem: {
        parentId: ""
      },
      item: {},
      pager: {
        // 数据总数
        total: 11,
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
          label: "仲裁案号",
          property: "caseNoWz",
          width: 200
        },
        {
          label: "结果",
          property: "loadDesc",
          width: 100
        },
        {
          label: "重跑时间",
          property: "createTime",
          width: 180
        }
      ]
    };
  },
  methods: {
    getParams() {
      this.searchItem.parentId = this.$route.query.id;
    },
    doQuery(url, item) {
      this.query(url, item).then(res => {
        console.info(res);
        //  this.tableData = res.result.list;
        //   this.total = res.result.count;
      });
    }
  },
  created() {
    this.getParams();
  },
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
