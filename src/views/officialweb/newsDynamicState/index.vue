<template>
  <div class="customerCase">
    <searchs class="item-search" :searchItems="searchItems" :item="searchItem" :queryUrl="queryUrl">
      <div class="fr" slot="moreBtn">
        <el-button type="primary" @click="create">新增新闻</el-button>
      </div>
    </searchs>
    <div class="item-title">
      新闻动态
    </div>
    <div class="item-table">
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine"></table-component>
    </div>
  </div>
</template>

<script>
  import Searchs from '@/components/searchs'
  import Mixins from '@/components/script/_mixin'
  import TableComponent from '@/components/table'
  import {URL_JSON} from "../../../components/script/url_json";
  export default {
    name: 'newsDynamicState',
    extends: Mixins,
    data() {
      return {
        searchItems: [
          {placeholder: '新闻标题', colSpan: 7, property: 'keyWords'},
          {placeholder: '起始时间', colSpan: 4, property: 'startTime',type: 'date',limit: this.limit1},
          {placeholder: '结束时间', colSpan: 4, property: 'endTime',type: 'date',limit: this.limit2},
          {placeholder: '请选择状态', colSpan: 4, property: 'newsStatus',type: 'select', options: [
              {label:'待上线', value: 0},
              {label:'已上线', value: 1},
              {label:'已下线', value: 2},
            ]},
        ],
        searchItem: {},
        queryUrl: URL_JSON['queryAdvisoryManage'],
        columnDefine: [
          {label: '姓名', property: 'name'},
          {label: '手机号', property: 'phone'},
          {label: '电子邮箱', property: 'email'},
          {label: '公司名称', property: 'company'},
          {label: '职位', property: 'position'},
          {label: '处理状态', property: 'processed'},
        ]
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
      Searchs,
      TableComponent
    },
    created () {
      this.doQuery(this.queryUrl,this.searchItem)
    }
  }
</script>

<style scoped>

</style>
