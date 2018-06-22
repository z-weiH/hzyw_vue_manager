<template>
    <div>
      <div>
        <div class="item-search">
          <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">
            <div class="fr" slot="moreBtn">
              <el-button type="primary" @click="create">新增菜单</el-button>
            </div>
          </searchs>
        </div>
        <div class="item-title">
          菜单管理
        </div>
        <div class="item-table">
          <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine" :actions="actions"></table-component>
        </div>
        <menu-create :edit-state="editState" :item="item" @refresh="refresh"></menu-create>
      </div>
    </div>
</template>

<script>
  import Mixins from '@/components/script/_mixin'
  import Searchs from '@/components/searchs'
  import TableComponent from '@/components/table'
  import MenuCreate from './modules/create'
  import {URL_JSON} from "../../../components/script/url_json";
  export default {
    name: 'menuManage',
    extends: Mixins,
    data () {
      return {
        searchItems : [
          {type: 'text',placeholder: '请输入菜单名称', property: 'keyWords', colSpan: 6},
          // {type: 'select',placeholder: '请选择菜单', property: 'keyWords', colSpan: 4,options:[],labelfield: 'name',valuefield: 'id'},
          {type: 'select',placeholder: '请选择菜单层级', property: 'level', colSpan: 5,options: [{label:'一级菜单',value: 1},{label:'二级菜单',value: 2}]},
        ],
        searchItem: {},
        columnDefine: [
          {label: '菜单名称',property: 'menuName'},
          {label: '菜单链接',property: 'menuUrl',width:'180'},
          {label: '父菜单',property: 'pMenuName'},
          {label: '菜单层级',property: 'menuDegreeCN'},
          {label: '菜单排序',property: 'menuSort'},
        ],
        actions: [
          {label: '操作',btns: [
              {label:'修改', function: this.doEdit},
              {label:'删除', function: this.doDelete},
            ]
          }
        ],
        item: {},
        queryUrl:  URL_JSON['queryMenuManage']
      }
    },
    methods: {
      create () {
        this.item = {};
        this.editState = 2;
      },
      doEdit (row) {
        this.$http.post(URL_JSON['editMenuManage'],{menuId:row.menuId})
          .then(res => {
            if(res.code === '0000'){
              this.item = res.result;
              this.editState = 1;
            }
          })
      },
      doDelete (row) {
        this.showConfirm().then( res=> {
          //点确定 res为true , false为true
          console.log(res);
          if(res == true){
            this.$http.post( URL_JSON['deleteMenuManage'],{
              menuId: row.menuId
            }).then(r => {
              if(r.code === '0000'){
                this.$message.success(r.description);
                this.refresh();
              }
            })
          }
        })
      },
      doQuery(url,item){
        let obj = {};
        this.$http.post(URL_JSON['queryMenuManage'],Object.assign({}, this.searchItem, this.pager))
          .then(res => {
            if(res.code === '0000'){
              res.result.list.forEach(it => {
                it.menuDegreeCN = it.menuDegree == 1 ? '一级菜单' : '二级菜单';
              });
              this.tableData = res.result.list;
              this.pager.count = res.result.count;
            }
          })
      },
      refresh() {
        this.editState = 0;
        this.doQuery(this.queryUrl, this.searchItem);
      },


    },
    components: {
      Searchs,
      TableComponent,
      MenuCreate
    },
    created() {
      this.doQuery(this.queryUrl, this.searchItem);
    }
  }
</script>

<style scoped>

</style>
