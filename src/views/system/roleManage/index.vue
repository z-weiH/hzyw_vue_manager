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
    <role-create ref="create" :item="item"  :edit-state="editState" @refresh="doQuery(queryUrl,searchItem)"></role-create>
    <!--<role-permission :edit-state="editState" :list="list" ref="permission" :item="item"></role-permission>-->
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
          {label: '操作',btns: [
              {label:'修改', function: this.doEdit},
              {label:'删除', function: this.doDelete},
            ]
          }
        ],
        editState: 0, // 4 编辑权限
        queryUrl:  URL_JSON['queryRoleManage'],
        item: {}
      }
    },
    methods: {
      menuManager (row) {
        this.$http.post(URL_JSON['editRoleManage'],{roleId: row.roleId})
          .then(res => {
            this.item = res.result;
            this.editState = 4;

          })
      },
      create () {
        this.item = {};
        this.editState = 2;
        setTimeout(() => {
          this.$refs['create'].$refs['tree'].setCheckedKeys([]);
        },100)
      },
      doEdit (row) {
        console.log(row);
        this.$http.post(URL_JSON['editRoleManage'],{roleId:row.roleId})
          .then(res =>{
            this.item = res.result;
            this.editState = 1;
            setTimeout(() => {
              let items= []
              res.result.menus && (items=res.result.menus.split(','));
              this.$refs['create'].$refs['tree'].setCheckedKeys(items);
            },100)
          })
      },
      doDelete (row) {
        this.showConfirm().then(confirm => {
          if(confirm){
            this.$http.post(URL_JSON['deleteRoleManage'],{roleId: row.roleId}).then(res=> {
              if(res.code){
                // this.tableData.splice(this.tableData.findIndex(it => it == row),1);
                // this.pager.count--;
                this.doQuery(this.queryUrl, this.searchItem);
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
