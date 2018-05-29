<template>
  <div>

      <searchs class="item-search" :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">
        <div class="fr" slot="moreBtn">
          <el-button type="primary" @click="create">新增用户</el-button>
        </div>
      </searchs>
    <div class="item-title">
      用户管理
    </div>
    <div class="item-table">
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine" :actions="actions"></table-component>
    </div>
    <user-create ref="create" :editState.sync="editState" :create-item="createItem" @refresh="refresh" ></user-create>
    <user-edit ref="edit" :editState.sync="editState"  @refresh="refresh" ></user-edit>
    <user-update-psd :editState.sync="editState" :psd-item="psdItem"></user-update-psd>
  </div>
</template>

<script>
  import Searchs from '@/components/searchs'
  import TableComponent from '@/components/table'
  import Mixins from '@/components/script/_mixin'
  import UserCreate from './modules/create'
  import UserEdit from './modules/edit'
  import UserUpdatePsd from './modules/updatePwd'
  import {URL_JSON} from "../../../components/script/url_json";
  export default {
    name : 'roleManame',
    extends : Mixins,
    data () {
      return {
        searchItems : [
          {type:'text', placeholder: '请输入用户名、真实名字、手机号码', colSpan: 8, property: 'keyWords'},
          {type:'select', options: [], valuefield: 'roleId', labelfield: 'roleName', colSpan: 4, property: 'roleId'},
        ],
        searchItem : {},
        tableData : [],
        psdItem:{},
        columnDefine : [
          {label: '用户名',property: 'loginName'},
          {label: '真实姓名',property: 'userName'},
          {label: '手机号码',property: 'userPhone'},
          {label: '所属角色',property: 'roleNames'},
          {label: '创建时间',property: 'createTime'},
        ],
        // fixedSearchItrems: { parent_id: '2', role_id: '3'},//固定的查询条件
        createItem: {},
        editItem: {},
        actions: [
          {
            label: '其他操作',
            width: '300px',
            btns: [
              {label:'修改信息', function: this.editInfo},
              {label:'修改密码', function: this.editPassword},
              {label:'删除', function: this.delete},
            ]
          }
        ],
        editState : 0, // 1表示编辑  2表示新增 3修改密码
        deleteConfirm : false,
        deleteItem : {},
        roleList: [],
        queryUrl: URL_JSON['queryUserControl'],
        options: []

      }
    },
    components : {
      Searchs,
      TableComponent,
      UserCreate,
      UserEdit,
      UserUpdatePsd
    },
    methods: {
      create() {
        this.createItem = {};
        this.$refs['create'].roleids= [];
        this.editState = 2;
      },
      editInfo (row) {
        this.$http.post( URL_JSON['editUserControl'],{userId: row.userId})
          .then(res => {
            if(res.code){
              this.$refs['edit'].editItem = res.result;
              this.$refs['edit'].roleids= [];
              if(this.$refs['edit'].editItem.roleIds){
                this.$refs['edit'].editItem.roleIdsStr = this.$refs['edit'].editItem.roleIds.split(',');
                this.$refs['edit'].roleids = this.$refs['edit'].editItem.roleIds.split(',');
              }
              console.log(this.editItem);
              this.editState = 1;
            }
          })
      },
      editPassword (row) {
        this.psdItem = {};
        this.psdItem.userId = row.userId;
        this.psdItem.loginName = row.loginName;
        this.psdItem.userName = row.userName;
        this.editState = 3
      },
      delete (row) {
        this.showConfirm().then(res => {
          if(res){
            this.$http.post(URL_JSON['deleteUserControl'],{userId: row.userId})
              .then(r=> {
                  this.refresh();
              })
          }
        })
      },
      refresh() {
        this.editState = 0;
        this.doQuery(this.queryUrl, this.searchItem);
      }
    },
    created () {
      this.doQuery(this.queryUrl, this.searchItem);
      //获取 角色
      this.$http.post(URL_JSON['queryALlRole'])
        .then(res => {
          if(res.code === '0000'){
            // this.editItems1[4].options = res.result;
            this.options = res.result;
            this.searchItems[1].options = res.result;
            console.log(res.result);
          }
        })

    }
  }
</script>

<style scoped>

</style>
