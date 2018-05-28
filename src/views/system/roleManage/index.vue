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
    <role-create :item="item" :edit-state="editState"></role-create>
    <role-permission :edit-state="editState" :list="list" ref="permission" :item="item"></role-permission>
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
        editState: 0, // 4 编辑权限
        queryUrl:  URL_JSON['queryRoleManage'],
        list: [], //权限数列表,
        item: {}
      }
    },
    methods: {
      menuManager (row) {
        this.$http.post(URL_JSON['editRoleManage'],{roleId: row.roleId})
          .then(res => {
            this.item = res.result;
            this.$refs['permission'].$refs['tree'].setCheckedKeys(res.result.menus.split(','));
            this.editState = 4;
          })
      },
      create () {
        this.editItem = {};
        this.editState = 2;
      },
      doEdit (row) {
        console.log(row);
        this.$http.post(URL_JSON['editRoleManage'],{roleId:row.roleId})
          .then(res =>{
            this.item = res.result;
            this.editState = 1;
          })
      },
      doDelete (row) {
        this.showConfirm().then(confirm => {
          if(confirm){
            this.$http.post(URL_JSON['deleteRoleManage'],{userId: row.userId}).then(res=> {
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
      this.$http.post('logindo.htm',{loginName: '13200000004',passWord: '123456'}).then(res => {
        if(res.code == '0000'){
          console.log(res);
          this.$http.post( URL_JSON['treeRoleManage'],null,{headers:{token: res.result.loginInfoVO.token}})
            .then(res=> {
              res=Mock.mock(res)
              if(res.code){
                this.list = res.result;

              }
            })
        }
      })
    }
  }
</script>

<style scoped>

</style>
