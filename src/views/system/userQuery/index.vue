<template>
  <div>
      <searchs class="item-search" :search-items="searchItems" :item="item">
        <div class="fr" slot="moreBtn">
          <el-button type="primary">新增用户</el-button>
        </div>
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
  export default {
    name : 'roleManame',
    data () {
      return {
        searchItems : [
          {type:'text', placeholder: '请输入用户名、真实名字、手机号码', colSpan: 8},
          {type:'select', options: [{label:'北京',value:'BJ'}, {label:'上海',value:''}, {label:'杭州',value:'HZ'}], colSpan: 4},
        ],
        item : {},
        tableData : [],
        columnDefine : [
          {label: '序号',property: 'index'},
          {label: '用户名',property: 'name'},
          {label: '真实姓名',property: 'truename'},
          {label: '手机号码',property: 'phonenumber'},
        ]
      }
    },
    components : {
      Searchs,
      Table
    }
  }
</script>

<style scoped>

</style>
