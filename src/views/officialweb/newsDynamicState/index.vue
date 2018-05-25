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
      <table-component :pager="pager" :table-data="tableData" :actions="actions" :column-define="columnDefine"></table-component>
    </div>
    <news-edit ref="edit" :edit-state="editState" :item="item"></news-edit>
  </div>
</template>

<script>
  import newsEdit from './modules/edit'
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
        queryUrl: URL_JSON['queryNewsDynamicState'],
        columnDefine: [
          {label: '新闻标题', property: 'newsTitle'},
          {label: '新闻类型', property: 'newsType'},
          {label: '创建时间', property: 'createTime'},
          {label: '发布时间', property: 'releaseTime'},
          {label: '状态', property: 'newsStatus'},
        ],
        actions: [
          {label: '操作',btns: [
              {label:'修改', function: this.doEdit},
              {label:'删除', function: this.doDelete},
            ]
          }
        ],
        item: {}
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
      },
      create() {
        this.item = {newsDetail: '',newsImg: ''};
        this.editState = 2;
      },
      doEdit(row) {
        this.$http.post(URL_JSON['editNewsDynamicState'],{newsId: row.newsId})
          .then(res => {
            console.log(res)
            if(res.code){
              this.item = res.result;
              this.editState = 1;
              this.$refs.edit.$refs.tinymce.setContent(res.result.newsDetail);
            }
          })
      },
      doDelete(row) {
        this.showConfirm().then( res=> {
          //点确定 res为true , false为true
          console.log(res);
          if(res == true){
            this.$http.post( URL_JSON['deleteNewsDynamicState'],{
              newsId: row.newsId
            }).then(r => {
              if(r.code == '0000'){
                let idx = this.tableData.findIndex(it => it == row);
                console.log(idx);
                this.tableData.splice(idx,1);
              }
              this.$message({
                message: r.description,
                type:r.code == '0000' ? 'success' : 'error'
              });
            })
          }
        })
      },
    },
    components: {
      Searchs,
      TableComponent,
      newsEdit
    },
    created () {
      this.doQuery(this.queryUrl,this.searchItem)
    }
  }
</script>

<style scoped>

</style>
