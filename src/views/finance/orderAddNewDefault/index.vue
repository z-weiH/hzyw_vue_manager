<template>
  <div class="content">
    <div class="wsbodyhead" id="bodyhead">
      <a>所在位置</a><a class="aside_tit" href="javascript:;">案件列表</a>
    </div>
    <searchs class="item-search" :search-items="searchItems" :item="item" :query-url="1">
      <div slot="moreBtn">
        <el-button type="primary" @click="">导出Excel</el-button>
      </div>
    </searchs>

  </div>
</template>

<script type="text/ecmascript-6">
  import Searchs from "@/components/searchs";
  import TableComponent from "@/components/table";
  import Mixins from "@/components/script/_mixin";
  export default {
    name:'orderAddNewDefault',
    extends:Mixins,
    data() {
      return {
        searchItems:[
          {type:'text', placeholder:'案号、申请人、被申请人、手机号', colSpan: 4, property: '' },
          {type:'select', options: [{label:'提交日期',value:'tjrq'},{label:'立案日期', value:'larq'},{label:'组庭日期',value:'ztrq'},{label:'结案日期', value:'jarq'},{label:'应裁日期', value:'ycrq'}] }
        ],
        item:{},
      };
    },
    components: {
      Searchs,
      TableComponent
    }
  };
</script>

<style scoped lang="scss">

</style>
