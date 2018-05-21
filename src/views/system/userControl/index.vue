<template>
  <div>

      <searchs class="item-search" :search-items="searchItems" :item="searchItem" >
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
    <user-create :editState.sync="editState" :create-item="createItem" ></user-create>
    <user-edit :editState.sync="editState" :edit-item="editItem" ></user-edit>
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
          {type:'select', options: [{label:'北京',value:'BJ'}, {label:'上海',value:''}, {label:'杭州',value:'HZ'}], colSpan: 4, property: 'roleId'},
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
        queryUrl: '/2/user/queryUserList.htm'
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
        this.editState = 2;
      },
      editInfo (row) {
        this.edit('/2' + URL_JSON['editUserControl'],{userId: row.userId})
          .then(res => {
            if(res.code){
              this.editItem = res.result;
              this.editState = 1;
            }
          })
      },
      editPassword (row) {
        this.psdItem = row;
        this.editState = 3
      },
      delete (row) {
        this.showConfirm().then(res => {
          if(res){
            console.log('删除')
          }
        })
      }
    },
    created () {
      this.doQuery('/2'+URL_JSON['queryUserControl'], this.searchItem);
      //获取 角色
      this.$http.post('/2' + URL_JSON['queryALlRole']).then(res => {
        if(res.code){
          this.roleList = res.result.list;
        }
      })

    }
  }
</script>

<style scoped>

</style>
