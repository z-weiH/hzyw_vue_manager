<template>
  <div>
      <searchs class="item-search" :search-items="searchItems" :item="searchItem" :query-url="queryUrl">
      </searchs>
    <div class="item-title">
      用户列表
    </div>
    <div class="item-table">
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine"></table-component>
    </div>
  </div>
</template>

<script>
  import Searchs from '@/components/searchs'
  import TableComponent from '@/components/table'
  import Mixins from '@/components/script/_mixin'
  import Edits from '@/components/edits'
  import {URL_JSON} from "../../../components/script/url_json";
  export default {
    name : 'roleManame',
    extends : Mixins,
    data () {
      return {
        searchItems : [
          {type:'text', placeholder: '请输入用户名、真实名字、手机号码', colSpan: 4, property: 'keyWords'},
          {type:'select', placeholder: '请选择角色', options: [], colSpan: 4, property: 'roleId', labelfield: "roleName", valuefield: "roleId"},
        ],
        searchItem : {},
        tableData : [],
        columnDefine : [
          {label: '用户名',property: 'loginName'},
          {label: '真实姓名',property: 'userName'},
          {label: '手机号码',property: 'userPhone'},
          {label: '所属角色',property: 'roleNames'},
          {label: '创建时间',property: 'createTime',width: 180},
        ],
        queryUrl:  URL_JSON['queryUserControl'],


        // fixedSearchItrems: { parent_id: '2', role_id: '3'},//固定的查询条件
      }
    },
    components : {
      Searchs,
      TableComponent,
      Edits
    },
    methods: {
      getRole() {
        this.$http.post(URL_JSON['queryALlRole']).then(res => {
          console.error(res);
          if(res.code === '0000'){
            this.searchItems[1].options = res.result;
          }
        })
      }
    },
    created () {
      this.doQuery(this.queryUrl, this.searchItem);
      this.getRole();
    }
  }
</script>

<style scoped>

</style>
