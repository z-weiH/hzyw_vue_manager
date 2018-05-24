<template>
  <div class="customerCase">
    <searchs class="item-search" :searchItems="searchItems" :item="searchItem" :queryUrl="queryUrl">
      <div class="fr" slot="moreBtn">
        <el-button type="primary" @click="create">新增案例</el-button>
      </div>
    </searchs>
    <div class="item-title">
      客户案例
    </div>
    <div class="item-table">
      <table-component :pager="pager" :actions="actions" :table-data="tableData" :column-define="columnDefine"></table-component>
    </div>
    <case-edit :edit-state="editState" :item="item"></case-edit>
  </div>
</template>

<script>
  import CaseEdit from './modules/edit'
  import Searchs from '@/components/searchs'
  import Mixins from '@/components/script/_mixin'
  import TableComponent from '@/components/table'
  import {URL_JSON} from "../../../components/script/url_json";
  export default {
    name: 'customerCase',
    extends: Mixins,
    data() {
      return {
        searchItems: [
          {placeholder: '请输入客户名称', colSpan: 7, property: 'keyWords'},
          {placeholder: '请选择开户状态', colSpan: 5, property: 'custStatus',type: 'select', options: [
              {label:'待审核', value: 1},
              {label:'待确认', value: 2},
              {label:'开户成功', value: 3},
            ]},
        ],
        searchItem: {},
        queryUrl: URL_JSON['queryCustomerCase'],
        columnDefine: [
          {label: '客户名称', property: 'custName'},
          {label: '客户logo图标', property: 'custIcon', type: 'img'},
          {label: '发布时间', property: 'publishTime'},
          {label: '上线状态', property: 'custStatus'},
        ],
        actions: [
          {label: '操作',btns: [
              {label:'修改', function: this.doEdit},
              {label:'删除', function: this.doDelete},
            ]
          }
        ],
        item: {}
      }
    },
    methods: {
      create() {
        this.item= {};
        this.editState = 2;
      },
      doEdit(row) {
        this.$http.post(URL_JSON['editCustomerCase'],{custId: row.custId})
          .then(res => {
            console.log(res)
            if(res.code){
              this.item = res.result;
              this.editState = 1;
            }
          })
      },
      doDelete(row) {
        this.showConfirm().then( res=> {
          //点确定 res为true , false为true
          if(res){
            this.$http.post( URL_JSON['deleteCustomerCase'],{
              arbId: row.arbId
            }).then(r => {
              if(r.code == '0000'){
                let idx = this.tableData.findIndex(it => it == row);
                console.log(idx);
                this.tableData.splice(idx,1);
              }
              this.$message({
                message: res.description,
                type:res.code == '0000' ? 'success' : 'error'
              });
            })
          }
        })
      },
      limit1(time) {
        if(!this.searchItem.endTime)
          return false;
        else if(new Date(time).getTime() > new Date(this.searchItem.endTime).getTime()){
          return true
        }
        else{
          return false;
        }
      },
      limit2(time) {
        if(!this.searchItem.startTime)
          return false;
        else if(new Date(time).getTime() < new Date(this.searchItem.startTime).getTime())
          return true;
        else
          return false;
      }
    },
    components: {
      Searchs,
      TableComponent,
      CaseEdit
    },
    created () {
      this.doQuery(this.queryUrl,this.searchItem)
    }
  }
</script>

<style scoped>

</style>
