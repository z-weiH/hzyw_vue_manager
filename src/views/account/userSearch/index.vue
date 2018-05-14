<template>
    <div class="userSearch">
      <searchs class="item-search" :searchItems="searchItems" :item="searchItem" queryUrl="queryUrl"></searchs>
    </div>
</template>

<script>
import Searchs from '@/components/searchs'
export default {
  name: 'userSearch',
  data() {
    return {
      searchItems: [
        {placeholder: '请输入用户名、真是姓名、手机号码', colSpan: 7, property: 'keyWords'},
        {placeholder: '起始时间', colSpan: 4, property: 'startTime',type: 'date',limit: this.limit1},
        {placeholder: '结束时间', colSpan: 4, property: 'endTime',type: 'date',limit: this.limit2},
      ],
      searchItem: {}
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
