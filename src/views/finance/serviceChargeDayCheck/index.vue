<template>
<div class="content">
        <div class='wsbodyhead'>
         <a>所在位置</a>
         <router-link :to='$options.name' class='aside_tit'>还款信息</router-link>
        </div>
        <searchs class='item-search' :search-items='searchItems' :item='item' :query-url='queryUrl'>
          <template slot='moreBtn'><el-button class='ml-20' type='primary' @click=''>核实日对账</el-button></template>
        </searchs>
        <div class='item-title'>
          服务费日对账
        </div>
        <div class='item-table'>
           <table-component  :pager="pager"  :table-data="tableData"  :column-define="columnDefine" >

                <el-table-column  :resizable="false" label="交易类型" prop="checkType" slot="defineCol">
                  <template slot-scope="scope" name="defineCol">
                  <span v-if="scope.row.checkType == 1">非服务费</span>
                  <span v-else-if="scope.row.checkType == 2">服务费</span>
                  </template>
                </el-table-column>

                <el-table-column  :resizable="false" label="现金流入" prop="orderAmt" slot="defineCol">
                  <template slot-scope="scope" name="defineCol">
                  <span v-if="scope.row.inoutFlag == 1">{{scope.row.orderAmt}}</span>
                  <span v-else-if="scope.row.inoutFlag == 0">--</span>
                  </template>
                </el-table-column>
                <el-table-column  :resizable="false" label="现金流出" prop="orderAmt" slot="defineCol">
                  <template slot-scope="scope" name="defineCol">
                  <span v-if="scope.row.inoutFlag == 0">{{scope.row.orderAmt}}</span>
                  <span v-else-if="scope.row.inoutFlag == 1">--</span>
                  </template>
                </el-table-column>

                <el-table-column  :resizable="false" label="状态" prop="checkStatus" slot="defineCol">
                  <template slot-scope="scope" name="defineCol">
                  <span v-if="scope.row.checkStatus == 0">未对账</span>
                  <span v-else-if="scope.row.checkStatus == 1">已对账</span>
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
  name: "serviceChargeDayCheck",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: URL_JSON["queryServiceChargeDayCheck"],
      tableData: [{}],
      searchItem:{},
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
          property: "inoutFlag",
          options: [
            {
              label: "流出",
              value: "0"
            },
            {
              label: "流入",
              value: "1"
            }
          ]
        }
      ],
      columnDefine: [
        {
          label: "时间",
          property: "detailTime",
          width:'110px'
        },
        {
          label: "收付方名称",
          property: "debitName",
          width:'150px'

        },
        {
          label: "收付方开户行",
          property: "bankName",
           width:'150px'
        },
        {
          label: "收付方账号",
          property: "bankAcctno",
          width:'150px'
        },
        {
          label: "银行流水单号",
          property: "bankOrderno",
          width:'150px'
        },
        {
          label: "操作人",
          property: "operName",
          width:'110px'
        },
      ]
    };
  },
  methods: {
    doQuery(url, item) {
      this.query(url, item).then(res => {
        // this.tableData = res.result.list;
        // this.total = res.result.count;
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
