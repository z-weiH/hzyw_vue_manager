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
        <menu-create :edit-state="editState" :item="item"></menu-create>
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
        ],
        searchItem: {},
        columnDefine: [
          {label: '菜单名称',property: 'menuName'},
          {label: '菜单链接',property: 'menuUrl'},
          {label: '父菜单',property: 'pMenuName'},
          {label: '菜单层级',property: 'menuDegree'},
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
        this.$http.post('/menu/selectByPrimaryKey.htm',{menuId:row.menuId})
          .then(res => {
            this.item = res;
          })
        this.editState = 1;
      },
      doDelete () {

      }
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
