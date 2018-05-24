<template>
  <div>
    <div>
      <div class="item-search">
        <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">

        </searchs>
      </div>
      <div class="item-title">
        开户申请
      </div>
      <div class="item-table">
        <table-component :pager="pager" :tableData="tableData" :columnDefine="columnDefine">
          <!--slot-->
          <el-table-column label="操作" slot="defineCol">
            <template slot-scope="scope" >
              <el-button
                size="mini"
                @click="" v-if="scope.row.orderStatus == 0" >待提交</el-button>
              <el-button
                size="mini"
                @click="" v-if="scope.row.orderStatus == 1" >待审核</el-button>
              <span v-if="scope.row.orderStatus == 2">通过</span>
              <span v-if="scope.row.orderStatus == 3">不通过</span>
            </template>
          </el-table-column>
        </table-component>
      </div>
    </div>
  </div>
</template>

<script>
import Mixins from '@/components/script/_mixin'
import Searchs from '@/components/searchs'
import TableComponent from '@/components/table'
import {URL_JSON} from "../../../components/script/url_json";
export default {
  name: 'accountAffirm',
  extends: Mixins,
  data () {
    return {
      searchItems : [
        {type: 'text',placeholder: '请输入企业名称、账户', property: 'keyWords', colSpan: 7},
        {type: 'date',placeholder: '请输入开始时间', property: 'startTime', colSpan: 5},
        {type: 'date',placeholder: '请输入结束时间', property: 'endTime', colSpan: 5},
        // 0待提交1待审核2通过3不通过
        {type: 'select',placeholder: '开户状态', property: 'orderStatus', colSpan: 4,options:[
            {label:'全部', value: ''},
            {label:'待提交', value: 0},
            {label:'待审核', value: 1},
            {label:'通过', value: 2},
            {label:'不通过', value: 3},
          ]},
      ],
      columnDefine: [
        {label: '企业名称',property: 'custName'},
        {label: '合同号',property: 'contactNo'},
        {label: '技术服务费 （元）',property: 'serveAmount'},
        {label: '开户仲券（张）',property: 'ticketCount'},
        {label: '开户受理费（元）',property: 'caseAmount'},
        {label: '申请时间',property: 'submitTime'},
      ],
      queryUrl: URL_JSON['queryAccountAffirm'],
      searchItem: {}
    }
  },
  components: {
    Searchs,
    TableComponent
  },
  created () {
    this.doQuery(this.queryUrl,this.searchItem);
  }
}
</script>

<style scoped>

</style>
