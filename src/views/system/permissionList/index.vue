<template>
    <div>
      <searchs class="item-search" :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">
        <div class="fr" slot="moreBtn">
          <el-button type="primary" @click="initPermissionList">初始化权限</el-button>
        </div>
      </searchs>
      <div class="item-title">
        权限列表
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
export default {
  name: 'index',
  extends: Mixins,
  data() {
    return {
      columnDefine: [
        {label: '权限表达式',property: 'btnExpression',width: 507},
        {label: '按钮名称',property: 'btnName',width: 400}
      ],
      queryUrl: '/btnInfo/queryBtnListByBaseQuery.htm',
      searchItems : [
        {type:'text', placeholder: '权限表达式与按钮名称搜索', colSpan: 8, property: 'keyWords'},
      ],
      searchItem : {}
    }
  },
  components:{
    TableComponent,
    Mixins,
    Searchs
  },
  methods: {
    initPermissionList() {
      const loading =this.$loading({
        lock: true,
        text: '规则列表初始化中',
        fullscreen: true,
        background: "hsla(0,0%,100%,.9)"
      });
      this.$http.post("/btnInfo/reloadBtn.htm").then(res => {
        loading.close();
        this.doQuery(this.queryUrl,this.searchItem);

      })
    }
  },
  created(){
    this.doQuery(this.queryUrl,this.searchItem);
  }

}
</script>

<style scoped>

</style>
