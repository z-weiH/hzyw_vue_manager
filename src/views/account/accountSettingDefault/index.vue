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
              <el-button
                size="mini"
                @click="showDailog(scope.row)" v-if="scope.row.orderStatus == 1">待审核</el-button>
              <span  v-if="scope.row.orderStatus == 2">通过</span>
              <span  v-if="scope.row.orderStatus == 3">不通过</span>
            </template>
          </el-table-column>
        </table-component>
      </div>
      <setting-dlg :edit-state="editState" :item="item" @refresh="refresh"></setting-dlg>
    </div>
</template>

<script>
import SettingDlg from './modules/edit'
import Searchs from '@/components/searchs'
import Mixins from '@/components/script/_mixin'
import {URL_JSON} from "../../../components/script/url_json";
import TableComponent from '@/components/table'
export default {
  name: 'accountSettingDefault',
  extends: Mixins,
  data() {
    return {
      searchItems: [
        {placeholder: '请输入企业名称、合同号', colSpan: 7, property: 'keyWords'},
        {placeholder: '起始时间', colSpan: 4, property: 'startTime',type: 'date',lt: 'endTime'},
        {placeholder: '结束时间', colSpan: 4, property: 'endTime',type: 'date',gt: 'startTime'},
        {placeholder: '开户状态', colSpan: 3, property: 'orderStatus',type: 'select', options: [
            {label:'待提交', value: 0},
            {label:'待审核', value: 1},
            {label:'通过', value: 2},
            {label:'不通过', value: 3},
          ]},
      ],
      searchItem: {},
      queryUrl: URL_JSON['queryAccountSettingDefault'],
      columnDefine: [
        {label: '企业名称', property: 'custName'},
        {label: '合同号', property: 'contactNo',isLink: true, linkShowPanel: this.doView},
        {label: '结算类型', property: 'settleType', type: 'select',
          options: [
            { label: "仲券结算", value: 1 },
            { label: "比例结算", value: 2 }
          ]},
        {label: '服务费',property: 'ticketCount1'},
        {label: '技术服务费(元)', property: 'serveAmount'},
        {label: '开户仲券(张)', property: 'ticketCount2'},
        {label: '开户受理费(元)', property: 'caseAmount'},
        {label: '申请时间', property: 'submitTime'},
      ],
      item: {}
    }
  },
  methods: {
    afterQuery(){
      this.tableData.forEach(it => {
        if(it.settleType === 1){
          it.ticketCount2 = it.ticketCount;
          it.ticketCount1 = '/';
        }else {
          it.ticketCount1 = it.ticketCount;
          it.ticketCount2 = '/';
        }
      })
    },
    showDailog(row) {
      console.log(row)
      this.$http.post(URL_JSON['editAccountSettingDefault'],{orderId: row.orderId})
        .then(res => {
          if(res.code){
            this.item = res.result;
            this.editState = 1;
          }
        })
    },
    doView(row) {
        console.log(row)
        this.$http.post(URL_JSON['editAccountSettingDefault'],{orderId: row.orderId})
          .then(res => {
            if(res.code){
              this.item = res.result;
              this.editState = 9;
            }
          })
      },

  },
  components: {
    Searchs,
    TableComponent,
    SettingDlg,
  },
  created() {
      this.doQuery(this.queryUrl,this.searchItem);
  }
}
</script>

<style scoped>

</style>
