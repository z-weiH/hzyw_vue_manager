<template>
  <div class="customerCase">
    <searchs class="item-search" :searchItems="searchItems" :item="searchItem" :queryUrl="queryUrl">
    </searchs>
    <div class="item-title">
      咨询管理
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
    name: 'customerCase',
    extends: Mixins,
    data() {
      return {
        searchItems: [
          {placeholder: '姓名、手机号', colSpan: 7, property: 'keyWords'},
          {placeholder: '起始时间', colSpan: 4, property: 'startTime',type: 'date',limit: this.limit1},
          {placeholder: '结束时间', colSpan: 4, property: 'endTime',type: 'date',limit: this.limit2},
          {placeholder: '请选择开户状态', colSpan: 5, property: 'processed',type: 'select', options: [
              {label:'待审核', value: 1},
              {label:'待确认', value: 2},
              {label:'开户成功', value: 3},
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
