<template>
  <div class="template-list">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">模板列表</a>
    </div>
    <div class="item-search">
      <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">
        <div class="fr" slot="moreBtn">
          是否启用：
          <el-select clearable  style="width: 140px;" v-model="templateStatus" placeholder="全部">
            <el-option label="停用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </div>
      </searchs>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">客户列表</span>
    </div>
    <div class="item-table">
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine">
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
        //是否启用
        templateStatus:null,
        queryUrl:'/templateList/queryTemplateListByBaseQuery.htm',
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
          { label: "客户", property: "clientName",width: 80},
          { label: "产品", property: "productName",width: 80 },
          { label: "模板", property: "templateCode",width: 80 },
          { label: "启用状态", property: "templateStatus",width: 100, type: 'select', options: [{label: '启用',value: '1'},{label:'停用',value:'0'}] },
          { label: "申请书", property: "applyStatus",width: 100, type: 'select', options: [{label: '启用',value: '1'},{label:'停用',value:'0'}] },
          { label: "裁决书", property: "adjudeStatus",width: 100, type: 'select', options: [{label: '启用',value: '1'},{label:'停用',value:'0'}] },
          { label: "强制执行书", property: "enforceStatus",width: 140, type: 'select', options: [{label: '启用',value: '1'},{label:'停用',value:'0'}] },
          { label: "初次启用日期", property: "firstUseTime",width: 140 },
          { label: "备注", property: "remark" },
        ]
      }
    },
    watch:{
      templateStatus(val,oldval){
        this.searchItem.templateStatus = val;
      }
    },
    components:{
      TableComponent,
      Searchs
    },
    methods: {

    },
    mounted(){
      this.doQuery(this.queryUrl,this.searchItem);
    }

  }
</script>

<style lang="scss" scoped>

.template-list{

}

</style>
