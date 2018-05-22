<template>
    <div>
      <searchs class="item-search" :search-items="searchItems" :item="searchItem" :query-url="queryUrl">
      </searchs>
      <div class="item-title">
        用户列表
      </div>
      <div class="item-table">
        <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine">
          <el-table-column label="操作" prop="orderStatusName" slot="defineCol">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="showDailog(scope.row)" v-if="scope.row.orderStatus == 0">{{scope.row.orderStatusName}}</el-button>
              <span v-else>{{scope.row.orderStatusName}}</span>
            </template>
          </el-table-column>
        </table-component>
      </div>
      <setting-dlg :edit-state="editState" :item="item"></setting-dlg>
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
        {placeholder: '起始时间', colSpan: 4, property: 'startTime',type: 'date',limit: this.limit1},
        {placeholder: '结束时间', colSpan: 4, property: 'endTime',type: 'date',limit: this.limit2},
        {placeholder: '开户状态', colSpan: 5, property: 'orderStatus',type: 'select', options: [
            {label:'待提交', value: 0},
            {label:'待审核', value: 1},
            {label:'通过', value: 2},
            {label:'不通过', value: 3},
          ]},
      ],
      searchItem: {},
      queryUrl: +URL_JSON['queryAccountSettingDefault'],
      columnDefine: [
        {label: '企业名称', property: 'custName'},
        {label: '合同号', property: 'contactNo'},
        {label: '技术服务费(元)', property: 'serveAmount'},
        {label: '开户仲券(张)', property: 'ticketCount'},
        {label: '开户受理费(元)', property: 'caseAmount'},
        {label: '申请时间', property: 'submitTime'},
      ],
      item: {}
    }
  },
  methods: {
    showDailog(row) {
      this.$http(URL_JSON['editAccountSettingDefault'],{orderId: row.orderId})
        .then(res => {
          if(res.code){
            this.item = res.result;
            this.editState = 1;
          }
        })
    },
    doQuery(url,item) {
      this.query(url,item).then(res=>{
        this.tableData[0].orderStatus = 0;
        this.tableData.forEach( it => {
          if(it.orderStatus == 0){
            it.orderStatusName = '待提交';
          }
          else if(it.orderStatus == 1){
            it.orderStatusName = '待审核';
          }
          else if(it.orderStatus == 2){
            it.orderStatusName = '通过';
          }
          else if(it.orderStatus == 3){
            it.orderStatusName = '不通过';
          }
        })
      })
    }
  },
  components: {
    Searchs,
    TableComponent,
    SettingDlg
  },
  created() {
      this.doQuery(this.queryUrl,this.searchItem);
  }
}
</script>

<style scoped>

</style>
