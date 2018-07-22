<template>
  <div>
    <searchs class="item-search" :search-items="searchItems" :item="searchItem" :query-url="queryUrl">
    </searchs>
    <div class="item-title">
      用户列表
    </div>
    <div class="item-table">
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine">
        <el-table-column label="操作" prop="orderStatusName" slot="defineCol" width="126">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showDailog(scope.row)" v-if="scope.row.orderStatus == 0">待处理</el-button>
            <span  v-if="scope.row.orderStatus == 1">待审核</span>
            <span  v-if="scope.row.orderStatus == 2">通过</span>
            <span  v-if="scope.row.orderStatus == 3">不通过</span>
          </template>
        </el-table-column>
      </table-component>
    </div>
    <edit :item="item" :edit-state="editState" @refresh="refresh"></edit>
  </div>
</template>

<script>
  import Searchs from '@/components/searchs'
  import Mixins from '@/components/script/_mixin'
  import {URL_JSON} from "../../../components/script/url_json";
  import TableComponent from '@/components/table'
  import  edit from './modules/edit'
  export default {
    name: 'accountSettingDefault',
    extends: Mixins,
    data() {
      return {
        searchItems: [
          {placeholder: '请输入企业名称、合同号', colSpan: 7, property: 'keyWords'},
          {placeholder: '起始时间', colSpan: 4, property: 'startTime',type: 'date',lt: 'endTime'},
          {placeholder: '结束时间', colSpan: 4, property: 'endTime',type: 'date',gt: 'startTime'},
          {placeholder: '开户状态', colSpan: 5, property: 'orderStatus',type: 'select', options: [
              {label:'待处理', value: 0},
              {label:'待审核', value: 1},
              {label:'通过', value: 2},
              {label:'不通过', value: 3},
            ]},
        ],
        searchItem: {},
        queryUrl: URL_JSON['queryAccountSettingManage'],
        columnDefine: [
          {label: '企业名称', property: 'custName', width: 160 },
          {label: '合同号', property: 'contactNo',isLink: true, linkShowPanel: this.doView,width: 160},
          {label: '技术服务费(元)', property: 'serveAmount',width: 120},
          {label: '开户仲券(张)', property: 'ticketCount',width: 120},
          {label: '开户受理费(元)', property: 'caseAmount', width: 120},
          {label: '申请时间', property: 'submitTime',width: 100},
        ],
        item: {}
      }
    },
    methods: {
      doView(row) {
        this.$http.post(URL_JSON['editAccountSettingManage'],{orderId: row.orderId})
          .then(res => {
            if(res.code === '0000'){
              this.item = res.result;
              this.editState = 9;
            }
          })
      },
      showDailog(row) {
        console.log(row);
        this.$http.post(URL_JSON['editAccountSettingManage'],{orderId: row.orderId})
          .then(res => {
            if(res.code === '0000'){
              this.item = res.result;
              this.editState = 1;
            }
          })
      }
    },
    components: {
      Searchs,
      TableComponent,
      edit
    },
    created() {
      this.doQuery(this.queryUrl,this.searchItem);
    }
  }
</script>

<style scoped>

</style>
