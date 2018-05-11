<template>
  <div>
      <searchs class="item-search" :search-items="searchItems" :item="item" :query-url="'/user/queryUserList.htm'">
      </searchs>
    <div class="item-title">
      用户列表
    </div>
    <div class="item-table">
      <Table :table-data="tableData" :column-define="columnDefine"></Table>
    </div>
  </div>
</template>

<script>
  import Searchs from '@/components/searchs'
  import Table from '@/components/table'
  import Mixins from '@/components/script/_mixin'
  import Edits from '@/components/edits'
  export default {
    name : 'roleManame',
    extends : Mixins,
    data () {
      return {
        searchItems : [
          {type:'text', placeholder: '请输入用户名、真实名字、手机号码', colSpan: 8, property: 'keyWords'},
          {type:'select', placeholder: '请选择角色', options: [{label:'北京',value:'BJ'}, {label:'上海',value:''}, {label:'杭州',value:'HZ'}], colSpan: 4, property: 'roleId'},
        ],
        item : {},
        tableData : [],
        columnDefine : [
          {label: '用户名',property: 'loginName'},
          {label: '真实姓名',property: 'userName'},
          {label: '手机号码',property: 'userPhone'},
          {label: '所属角色',property: 'roleNames'},
          {label: '创建时间',property: 'createTime',width: 180},
        ],
        // fixedSearchItrems: { parent_id: '2', role_id: '3'},//固定的查询条件
      }
    },
    components : {
      Searchs,
      Table,
      Edits
    },
    methods: {

    },
    mounted () {
      this.doQuery('/user/queryUserList.htm', this.item);
    }
  }
</script>

<style scoped>

</style>
