<template>
  <div>
    <div>
      <div class="item-search">
        <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">
        </searchs>
      </div>
      <div class="item-title">
        开户查询
      </div>
      <div class="item-table">
        <table-component :pager="pager" :tableData="tableData" :columnDefine="columnDefine">
          <el-table-column label="操作" prop="orderStatusName" slot="defineCol">
            <template slot-scope="scope">
              <el-button
                size="mini" v-if="scope.row.custStatus == 10"  @click="doEdit(scope.row)">待提交</el-button>
              <el-button
                size="mini" v-if="scope.row.custStatus == 10"  @click="doDelete">删除</el-button>
              <span v-if="scope.row.custStatus == 11">待审核</span>
              <span v-if="scope.row.custStatus == 20">待开户设置</span>
              <span v-if="scope.row.custStatus == 30">待确认</span>
              <span v-if="scope.row.custStatus == 40">开户成功</span>
              <span v-if="scope.row.custStatus == 41">开户失败</span>
              <!--<el-button-->
              <!--size="mini"-->
              <!--@click="showDailog(scope.row)" v-if="scope.row.custStatus == 10">{{scope.row.orderStatusName}}</el-button>-->
              <!--<span v-else>{{scope.row.orderStatusName}}</span>-->
            </template>
          </el-table-column>
        </table-component>
      </div>
      <account-apply :edit-state="editState" :item="item" @refresh="refresh"></account-apply>
    </div>
  </div>
</template>

<script>
  import Mixins from '@/components/script/_mixin'
  import Searchs from '@/components/searchs'
  import TableComponent from '@/components/table'
  import AccountApply from './modules/apply'
  import {URL_JSON} from "../../../components/script/url_json";
  export default {
    name: 'menuManage',
    extends: Mixins,
    data () {
      return {
        queryUrl:  URL_JSON['queryAccountApply'],
        searchItems : [
          {type: 'text',placeholder: '请输入企业名称、账户', property: 'keyWords', colSpan: 6},

          {type: 'date',placeholder: '请输入开始时间', property: 'startTime', colSpan: 4},
          {type: 'date',placeholder: '请输入结束时间', property: 'endTime', colSpan: 4},
          // 10待提交11 待审核20待开户设置30待确认40开户成功41开户失败
          {type: 'select',placeholder: '开户状态',property: 'custStatus', colSpan: 4, options: [
              {label: '全部', value: ''},
              {label: '待提交', value: 10},
              {label: '待审核', value: 11},
              {label: '待开户设置', value: 20},
              {label: '待确认', value: 30},
              {label: '开户成功', value: 40},
              {label: '开户失败', value: 41},
            ]}
        ],
        searchItem: {},
        columnDefine: [
          {label: '企业名称',property: 'custName',isLink: 1, linkShowPanel: (row) => {
              this.queryDetail(URL_JSON['editAccountApply'],{customerId: row.custId}).then(res => {
                if(res.code == '0000'){
                  this.item = res.result;
                  this.editState = 9;
                }
              })
            }},
          {label: '账户',property: 'loginName'},
          {label: '法定代表人',property: 'legallerName'},
          {label: '联系人',property: 'contactsName'},
          {label: '联系电话',property: 'contactsPhone'},
          {label: '申请时间',property: 'applicateTime'},
        ],
        actions: [
          {label: '操作',btns: [
              {label:'修改', function: this.doEdit},
              {label:'删除', function: this.doDelete},
            ]
          }
        ],
        item: {hello: 333},
        editState: 0,
        pickerOptions: {
          disabledDate: this.disabledDate
        },
        value: new Date()
      }
    },
    methods: {
      doEdit (row) {
        this.$http.post( URL_JSON['editAccountApply'],{customerId:row.custId})
          .then(res => {
            if(res.code === '0000'){
              this.item = res.result;
              this.editState = 1;
            }
          })
      },
      doDelete () {

      },
      disabledDate (time) {
        if(time.getTime() > new Date().getTime())
          return true;
      },
      refresh() {
        this.editState = 0;
        this.doQuery(this.queryUrl, this.searchItems);
      }
    },
    components: {
      Searchs,
      TableComponent,
      AccountApply
    },
    created() {
      this.doQuery(this.queryUrl,this.searchItem);
    }
  }
</script>

<style scoped>

</style>
