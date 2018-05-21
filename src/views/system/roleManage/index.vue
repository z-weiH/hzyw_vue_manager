<template>
  <div>
    <div class="item-search">
      <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">
        <div class="fr" slot="moreBtn">
          <el-button type="primary" @click="create">新增角色</el-button>
        </div>
      </searchs>
    </div>
    <div class="item-title">
      角色管理
    </div>
    <div class="item-table">
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine" :actions="actions"></table-component>
    </div>
    <role-create :create-item="editItem" :edit-state="editState"></role-create>
    <role-permission :edit-state="editState" :list="list"></role-permission>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  import Searchs from '@/components/searchs'
  import Mixins from '@/components/script/_mixin'
  import TableComponent from '@/components/table'
  import RoleCreate from './modules/create'
  import RolePermission from './modules/permission'
  import {URL_JSON} from "../../../components/script/url_json";
  export default {
    name : 'roleManame',
    extends: Mixins,
    data () {
      return {
        searchItems : [
          {type: 'text',placeholder: '请输入角色编码、角色名称', property: 'keyWords', colSpan: 6}
        ],
        searchItem: {},
        columnDefine: [
          {label: '角色编码',property: 'roleCode'},
          {label: '角色名称',property: 'roleName'},
          {label: '创建时间',property: 'createTime',width: 180},
        ],
        actions: [
          {label: '菜单权限',btns: [
              {label:'菜单管理', function: this.menuManager},
            ]
          },
          {label: '操作',btns: [
              {label:'修改', function: this.doEdit},
              {label:'删除', function: this.doDelete},
            ]
          }
        ],
        editItem: {},
        editState: 0, // 4 编辑权限
        queryUrl: '/2' + URL_JSON['queryRoleManage'],
        list: [] //权限数列表
      }
    },
    methods: {
      menuManager () {
        this.$http.post('/2' + URL_JSON['treeRoleManage'])
          .then(res=> {
            res=Mock.mock(res)
            if(res.code){
                this.editState = 4;
                this.list = res.result.list;
                this.list = [
                  {id: 1,name: 'parent1'},
                  {id: 2,name: 'parent2'},
                  {id: 3,name: 'parent3'},
                  {id: 4,name: 'child1',pId: 1},
                  {id: 5,name: 'child2',pId: 2},
                  {id: 6,name: 'child3',pId: 3},
                  {id: 7,name: 'child4',pId: 4},
                ]
            }
          })
      },
      create () {
        this.editItem = {};
        this.editState = 2;
      },
      doEdit (row) {
        console.log(row);
        this.editItem = row;
        this.editState = 1;
      },
      doDelete (row) {
        this.showConfirm().then(confirm => {
          if(confirm){
            this.$http.post('/2'+URL_JSON['deleteRoleManage'],{userId: row.userId}).then(res=> {
              if(res.code){
                this.tableData.splice(this.tableData.findIndex(it => it == row),1);
              }
            })
          }
        })
      },
      doQuery (url,item) {
        this.query(url,item).then(res => {
          // console.info(res[0].roleName);
        })
      }
    },
    components : {
      Searchs,
      TableComponent,
      RoleCreate,
      RolePermission
    },
    created () {
      this.doQuery(this.queryUrl, this.searchItem);
    }
  }
</script>

<style scoped>

</style>
