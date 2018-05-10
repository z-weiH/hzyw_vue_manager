<template>
  <div>
      <searchs class="item-search" :search-items="searchItems" :item="item" :query-url="'/user/queryUserList.htm'">
        <div class="fr" slot="moreBtn">
          <el-button type="primary" @click="create">新增用户</el-button>
        </div>
      </searchs>
    <div class="item-title">
      用户列表
    </div>
    <div class="item-table">
      <Table :table-data="tableData" :column-define="columnDefine" :actions="actions"></Table>
    </div>
    <user-create :editState.sync="editState" :create-item="createItem" ></user-create>
    <user-edit :editState.sync="editState" :edit-item="editItem" ></user-edit>
    <user-update-psd :editState.sync="editState" :psd-item="psdItem"></user-update-psd>
    <el-dialog
      :visible.sync="deleteConfirm"
      title="修改"
      width="495px"
      center>
      <div>是否确认删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sureDelete">确 定</el-button>
          <el-button @click="deleteConfirm = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Searchs from '@/components/searchs'
  import Table from '@/components/table'
  import Mixins from '@/components/script/_mixin'
  import UserCreate from './modules/create'
  import UserEdit from './modules/edit'
  import UserUpdatePsd from './modules/updatePwd'
  export default {
    name : 'roleManame',
    extends : Mixins,
    data () {
      return {
        searchItems : [
          {type:'text', placeholder: '请输入用户名、真实名字、手机号码', colSpan: 8, property: 'keyWords'},
          {type:'select', options: [{label:'北京',value:'BJ'}, {label:'上海',value:''}, {label:'杭州',value:'HZ'}], colSpan: 4, property: 'roleId'},
        ],
        item : {},
        tableData : [],
        psdItem:{},
        columnDefine : [
          {label: '用户名',property: 'loginName'},
          {label: '真实姓名',property: 'userName'},
          {label: '手机号码',property: 'userPhone'},
          {label: '所属角色',property: 'roleNames'},
          {label: '创建时间',property: 'createTime',width: 180},
        ],
        // fixedSearchItrems: { parent_id: '2', role_id: '3'},//固定的查询条件
        createItem: {},
        editItem: {},
        actions: [
          {label:'修改信息', function: this.editInfo},
          {label:'修改密码', function: this.editPassword},
          {label:'删除', function: this.delete},
        ],
        editState : 0, // 1表示编辑  2表示新增 3修改密码
        deleteConfirm : false,
        deleteItem : {}
      }
    },
    components : {
      Searchs,
      Table,
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
        this.edit('/user/selectByPrimaryKey.htm',{userId: row.userId})
          .then(res => {
            this.editItem = res;
            this.editState = 1;
          })
      },
      editPassword (row) {
        this.psdItem = row;
        this.editState = 3
      },
      delete (row) {
        this.deleteConfirm = true;
        this.deleteItem = row;
      },
      sureDelete () {
        this.$http.post('/user/deleteByPrimaryKey.htm',{
          userId: this.deleteItem.userId
        }).then(res=>{

        })
      }
    },
    mounted () {
      this.doQuery('/user/queryUserList.htm', this.item);
    }
  }
</script>

<style scoped>

</style>
