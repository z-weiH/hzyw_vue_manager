<template>
    <div class="userSearch">
      <searchs class="item-search" :searchItems="searchItems" :item="searchItem" queryUrl="queryUrl"></searchs>
    </div>
</template>

<script>
import Searchs from '@/components/searchs'
import Mixins from '@/components/script/_mixin'
export default {
  name: 'userSearch',
  extends: Mixins,
  data() {
    return {
      searchItems: [
        {placeholder: '请输入用户名、真是姓名、手机号码', colSpan: 7, property: 'keyWords'},
        {placeholder: '起始时间', colSpan: 4, property: 'startTime',type: 'date',limit: this.limit1},
        {placeholder: '结束时间', colSpan: 4, property: 'endTime',type: 'date',limit: this.limit2},
        {placeholder: '请选择开户状态', colSpan: 5, property: 'status',type: 'select', options: [
            {label:'待提交', value: 0},
            {label:'待审核', value: 1},
            {label:'待确认', value: 2},
            {label:'开户成功', value: 3},
            {label:'开户失败', value: 4}
          ]},
      ],
      searchItem: {},
      queryUrl: ''
    }
  },
  methods: {
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
    Searchs
  }
}
</script>

<style scoped>

</style>
