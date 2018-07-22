<template>
  <div class="template-list">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">模板列表</a>
    </div>
    <div class="item-search">
      <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">
        <div class="fr" slot="moreBtn">
          <el-button type="primary" @click="create">新增仲裁委</el-button>
        </div>
      </searchs>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">客户列表</span>
    </div>
    <div class="item-table">
      <table-component  :pager="pager" :table-data="tableData" :column-define="columnDefine">
      </table-component>

    </div>

  </div>
</template>

<script>
  import Searchs from "@/components/searchs";
  import Mixins from "@/components/script/_mixin";
  import TableComponent from "@/components/table";
  export default {
    name:'templateList',
    mixins: [Mixins],
    data(){
      return {
        queryUrl:'',
        searchItems: [
          {
            type: "text",
            placeholder: "请输入客户名称",
            property: "keyWords",
            colSpan: 6
          },
          {type: 'date',placeholder: '预计完成日期', property: 'startDate', colSpan: 4, lt: 'endDate'},
          {type: 'date',placeholder: '预计完成日期', property: 'endDate', colSpan: 4, gt: 'startDate'},
        ],
        searchItem: {},
        columnDefine: [
          { label: "客户", property: "clientName" },
          { label: "产品", property: "productName" },
          { label: "模板", property: "templateCode" },
          { label: "启用状态", property: "templateStatus" },
          { label: "申请书", property: "applyStatus" },
          { label: "裁决书", property: "adjudeStatus" },
          { label: "强制执行书", property: "enforceStatus" },
          { label: "初次启用日期", property: "firstTime" },
          { label: "备注", property: "remark" },
        ]
      }
    },
    components:{
      TableComponent,
      Searchs
    },
    methods: {

    },
    mounted(){

    }

  }
</script>

<style lang="scss" scoped>

.template-list{

}

</style>
