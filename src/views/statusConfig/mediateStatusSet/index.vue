<template>
<div class="content">
        <div class='wsbodyhead'>
         <a>所在位置</a>
         <router-link :to='$options.name' class='aside_tit'>调解状态设置</router-link>
        </div>
        <searchs class='item-search' :search-items='searchItems' :item='item' :query-url='queryUrl'>
          <template slot='moreBtn'><el-button class='ml-20' type='primary' @click=''>导出Excel</el-button></template>
        </searchs>
        <div class='item-title'>
          调解状态设置列表
        </div>
        <div class='item-table'>
           <table-component  :pager="pager"  @refreshList="doQuery(this.queryUrl, this.item)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data="tableData"  :column-define="columnDefine"  :actions="actions"></table-component>
        </div>
</div>
</template>
<script type="text/ecmascript-6">
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
import {URL_JSON} from "../../../components/script/url_json";
export default {
  name: "mediateStatusSet",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: /* "/13"+ */"/distribution/queryDistributionByBaseQuery.htm",
      tableData: [{}],
      searchItems: [
        {
          label: "案件查询",
          type: "text",
          placeholder: "案号、申请人、被申请人、手机号",
          colSpan: 7,
          property: ""
        },
        {
          type: "select",
          colSpan: 4,
          options: [
            {
              label: '提交日期',
              value: 'tjrq'
            },
            {
              label: '立案日期',
              value: 'larq'
            },
            {
              label: '组庭日期',
              value: 'ztrq'
            },
            {
              label: '结案日期',
              value: 'jarq'
            },
            {
              label: '应裁日期',
              value: 'ycrq'
            }

          ],
          property: ""
        },
        {
          type: "date",
          placeholder: "开始日期",
          colSpan: 5,
          property: ""
        },
        {
          type: "date",
          placeholder: "结束日期",
          colSpan: 5,
          property: ""
        },
        {
          newline:1,
          label: "互金企业",
          type: "select",
          colSpan: 5,
          property: ""
        },
        {
          label: "产品名称",
          type: "select",
          colSpan: 5,
          property: ""
        },
        {
          label: "逾期天数",
          type: "select",
          colSpan: 6,
          property: ""
        },
        {
          newline:1,
          label: "案件阶段",
          type: "select",
          colSpan: 5,
          property: ""
        },
        {
          label: "案件状态",
          type: "select",
          colSpan: 5,
          property: ""
        },
        {
          label: "应裁情况",
          type: "select",
          colSpan: 6,
          property: ""
        },
        {
          newline:1,
          label: "短信送达",
          type: "select",
          colSpan: 5,
          property: ""
        },
        {
          label: "短链查看",
          type: "select",
          colSpan: 5,
          property: ""
        },
        {
          label: "调解中心",
          type: "select",
          colSpan: 6,
          property: ""
        },
      ],
      columnDefine: [
        {
          label: "案件编号",
          property: ""
        },
        {
          label: "互金企业",
          property: ""
        },
        {
          label: "申请人",
          property: ""
        },
        {
          label: "被申请人",
          property: ""
        },
        {
          label: "被申请人手机",
          property: ""
        },
        {
          label: "案件阶段",
          property: ""
        },
        {
          label: "案件状态",
          property: ""
        },
        {
          label: "提交日期",
          property: ""
        },
        {
          label: "冻结日期",
          property: ""
        },
        {
          label: "应裁情况",
          property: ""
        },
        {
          label: "短信送达",
          property: ""
        },
        {
          label: "短链查看",
          property: ""
        },
      ],
      actions:[
        {
          label: "操作",
          btns: [
            { label: "解冻", function: this.doEdit },
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
    TableComponent
  }
};
</script>
<style scoped lang="scss">
</style>
