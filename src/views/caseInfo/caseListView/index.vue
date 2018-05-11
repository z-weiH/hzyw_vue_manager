<template>
  <div>
    <searchs class="item-search" :search-items="searchItems" :item="item" :query-url="'/user/queryUserList.htm'">
      <div slot="moreBtn">
        <el-button type="primary" @click="create">导出Excel</el-button>
      </div>
    </searchs>
  </div>
</template>

<script>
  import Searchs from '@/components/searchs'
  import TableComponent from '@/components/table'
  import Mixins from '@/components/script/_mixin'
  export default {
    name: 'caseListView',
    extends: Mixins,
    data(){
      return {
        searchItems : [
          {type:'text', placeholder: '案号、申请人、被申请人、手机号', colSpan: 8, property: 'keyWords'},
          {type:'select', options: [{label:'北京',value:'BJ'}, {label:'上海',value:''}, {label:'杭州',value:'HZ'}], colSpan: 4, property: 'roleId'},
        ],
      }
    }
  }
</script>

<style scoped>

</style>
