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
                @click="showDailg(scope.row)" v-if="scope.row.custStatus == 30" >待确认</el-button>
              <span v-if="scope.row.custStatus == 10">待提交</span>
              <span v-if="scope.row.custStatus == 11">待审核</span>
              <span v-if="scope.row.custStatus == 20">待开户设置</span>
              <span v-if="scope.row.custStatus == 40">开户成功</span>
              <span v-if="scope.row.custStatus == 41">开户失败</span>
            </template>
          </el-table-column>
        </table-component>
      </div>
    </div>
    <edit :edit-state="editState" :item="item" ></edit>
    <confirm :edit-state="editState" :item="item"  @refresh="refresh"></confirm>
  </div>
</template>

<script>
import Mixins from '@/components/script/_mixin'
import Searchs from '@/components/searchs'
import TableComponent from '@/components/table'
import {URL_JSON} from "../../../components/script/url_json";
import edit from './modules/edit'
import confirm from './modules/confirm'
export default {
  name: 'accountAffirm',
  extends: Mixins,
  data () {
    return {
      item: {},
      searchItems : [
        {type: 'text',placeholder: '请输入企业名称、账户', property: 'keyWords', colSpan: 7},
        {type: 'date',placeholder: '请输入开始时间', property: 'startTime', colSpan: 5},
        {type: 'date',placeholder: '请输入结束时间', property: 'endTime', colSpan: 5},
        //<!--10待提交11 待审核20待开户设置30待确认40开户成功41开户失败-->
        {type: 'select',placeholder: '开户状态', property: 'custStatus', colSpan: 4,options:[
            {label:'全部', value: ''},
            {label:'待提交', value: 10},
            {label:'待审核', value: 11},
            {label:'待开户设置', value: 20},
            {label:'待确认', value: 30},
            {label:'开户成功', value: 40},
            {label:'开户失败', value: 41},
          ]},
      ],
      columnDefine: [
        {label: '企业名称',property: 'custName'},
        {label: '合同号',property: 'contactNo',isLink: 1, linkShowPanel: this.doView},
        {label: '技术服务费 （元）',property: 'serveAmount'},
        {label: '开户仲券（张）',property: 'ticketCount'},
        {label: '开户受理费（元）',property: 'caseAmount'},
        {label: '申请时间',property: 'submitTime'},
      ],
      queryUrl: URL_JSON['queryAccountAffirm'],
      searchItem: {}
    }
  },
  methods: {
    doView(row) {
      console.log(123123123123);
      this.$http.post(URL_JSON['editAccountAffirm'],{orderId: row.orderId})
        .then(res => {
          if(res.code == '0000'){
            this.item = res.result;
            this.editState = 9;
          }
        })
    },
    showDailg(row){
      this.$http.post('/order/selectOpenCustomerConfirmAuditDetail.htm',{orderId: row.orderId})
        .then(res => {
          if(res.code == '0000'){
            this.item = res.result;
            this.editState = 2;
          }
        })
    }
  },
  components: {
    Searchs,
    TableComponent,
    edit,
    confirm
  },
  created () {
    this.doQuery(this.queryUrl,this.searchItem);
  }
}
</script>

<style scoped>

</style>
