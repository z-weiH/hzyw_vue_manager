<template>
  <div class="customerCase">
    <searchs class="item-search" :searchItems="searchItems" :item="searchItem" :queryUrl="queryUrl">
      <div class="fl ml-10" slot="moreBtn">
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
          // 0待上线 1已上线 2已下线
          {placeholder: '请选择上线状态', colSpan: 3, property: 'custStatus',type: 'select', options: [
              {label:'待上线', value: 0},
              {label:'已上线', value: 1},
              {label:'已下线', value: 2},
            ]},
        ],
        searchItem: {},
        queryUrl: URL_JSON['queryCustomerCase'],
        columnDefine: [
          {label: '客户名称', property: 'custName'},
          {label: '客户logo图标', property: 'custIcon', type: 'img'},
          {label: '发布时间', property: 'publishTime'},
          {label: '上线状态', property: 'custStatus', type: 'select', options: [
              {label:'待上线', value: 0},
              {label:'已上线', value: 1},
              {label:'已下线', value: 2},
            ]},
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
        this.item= {custIcon: ''};
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
              custId: row.custId
            }).then(r => {
              if(r.code == '0000'){
                let idx = this.tableData.findIndex(it => it == row);
                console.log(idx);
                this.tableData.splice(idx,1);
              }
              this.$message({
                message: r.description,
                type:r.code == '0000' ? 'success' : 'error'
              });
            })
          }
        })
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
