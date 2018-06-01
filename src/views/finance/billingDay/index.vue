<template>
<div class="content">
        <div class='wsbodyhead'>
         <a>所在位置</a>
         <router-link :to='$options.name' class='aside_tit'>受理费日对账</router-link>
        </div>
        <searchs class='item-search' :search-items='searchItems' :item='searchItem' :query-url='queryUrl'>
          <template slot='moreBtn'><el-button class='ml-20' type='primary' @click=''>核实日对账</el-button></template>
        </searchs>
        <div class='item-title'>
          账单列表
        </div>
        <div class='item-table'>
           <table-component  :pager="pager"  :table-data="tableData"  :column-define="columnDefine" >
             <!-- <template slot-scope="scope">

             </template> -->
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
  name: "billingDay",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: /* '/6' +  */ URL_JSON["queryBillingDay"],
      tableData: [{}],
      searchItem: {},
      searchItems: [
        {
          type: "date",
          placeholder: "选择日期",
          colSpan: 4,
          property: "startDate"
        },
        {
          type: "select",
          placeholder: "选择类型",
          colSpan: 4,
          property: "cash"
        }
      ],
      columnDefine: [
        {
          type: "select",
          label: "交易类型",
          property: "checkType",
          options: [
            // 1预缴受理费2服务费充值3受理费退回4受理费月结5技术服务费
            { label: "预缴受理费", value: 1 },
            { label: "服务费充值", value: 2 },
            { label: "受理费退回", value: 3 },
            { label: "受理费月结", value: 4 },
            { label: "技术服务费", value: 5 }
          ]
        },
        {
          label: "时间",
          property: "detailTime"
        },
        {
          label: "现金流入",
          property: "inAmount"
        },
        {
          label: "现金流出",
          property: "outAmount"
        },
        {
          label: "收付方名称",
          property: "debitName"
        },
        {
          label: "银行流水单号",
          property: "bankOrderno"
        },
        {
          label: "操作人",
          property: "operName"
        }
      ]
    };
  },
  methods: {
    doQuery(url, item) {
      this.query(url, item).then(res => {
        console.info("sssssss:::", res);
        this.tableData = res.result.list;
        this.total = res.result.count;
      });
      console.log("sxxxxxxxxxxxxxxxxx");
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
