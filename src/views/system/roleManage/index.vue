<template>
  <div>
    <div class="item-search">
      <searchs :search-items="searchItems" :item="item" :queryUrl="'/role/queryRoleList.htm'">
        <div class="fr" slot="moreBtn">
          <el-button type="primary" @click="create">新增角色</el-button>
        </div>
      </searchs>
    </div>
    <div class="item-title">
      角色管理
    </div>
    <div class="item-table">
      <table-component :table-data="tableData" :column-define="columnDefine" :actions="actions"></table-component>
    </div>
    <role-create :create-item="editItem" :edit-state="editState"></role-create>
    <role-permission :edit-state="editState" ></role-permission>
    <el-dialog
      :visible.sync="deleteConfirm"
      title="提示"
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
  import Mixins from '@/components/script/_mixin'
  import TableComponent from '@/components/table'
  import RoleCreate from './modules/create'
  import RolePermission from './modules/permission'
  export default {
    name : 'roleManame',
    extends: Mixins,
    data () {
      return {
        searchItems : [
          {type: 'text',placeholder: '请输入角色编码、角色名称', property: 'keyWords', colSpan: 6}
        ],
        item: {},
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
        deleteConfirm: false,
        currentItem: {}
      }
    },
    methods: {
      menuManager () {
        this.$http.post('/menu/selectZTreeVOList.htm')
          .then(res => {
            console.log(res);
            this.editState = 4;
          })
      },
      create () {
        this.editItem = {};
        this.editState = 2;
      },
      doEdit (row) {
        this.editItem = row;
        this.editState = 1;
      },
      doDelete (row) {
        this.deleteConfirm = true;
        this.currentItem = row;
      },
      sureDelete () {

      }
    },
    components : {
      Searchs,
      TableComponent,
      RoleCreate,
      RolePermission
    },
    mounted () {
      this.doQuery('/role/queryRoleList.htm', this.item);
    }
  }
</script>

<style scoped>

</style>
