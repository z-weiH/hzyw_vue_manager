<template>
    <div>
      <searchs class="item-search" :search-items="searchItems" :item="searchItem" :query-url="'/user/queryUserList.htm'">
      </searchs>
      <div class="item-title">
        个人信息
      </div>
      <div class="item-table">
        <edits class="item-edits" :editItems="editItems" :item="item"></edits>
      </div>
    </div>
</template>

<script>
import Edits from '@/components/edits'
import Searchs from '@/components/searchs'
export default {
  name: 'index',
  data () {
    return {
      searchItems: [
        {label:'案件查询', placeholder: '输入按键', property: 'anjian',colSpan: 5},
        {options: [{label: '提交日期', value: 'tijiao'}, {label: '立案日期', value: 'lian'}], placeholder: '请选择', property: 'anjian',type: 'select',colSpan: 3},
        {type:'date',placeholder: '开始时间',property:'startTime',colSpan: 4},
        {type:'date',placeholder: '结束时间',property:'endTime',colSpan: 4,},
        {label: '企业互金', options: [{label: '提交日期', value: 'tijiao'}, {label: '立案日期', value: 'lian'}], placeholder: '请选择', property: 'anjian',type: 'select',colSpan: 3,newline: 1},
      ],
      searchItem: {},
      editItems: [
        {label: '用户名', property: 'loginName', readonly: true, type : 'text'},
      ],
      item: {}
    }
  },
  components: {
    Edits,
    Searchs
  }
}
</script>

<style scoped>
  .item-edits{
    width: 495px;
    margin: 0 auto;
    padding-top: 20px;
  }
</style>
