<template>
  <el-dialog
    :visible.sync="show"
    :title="title"
    width="685px"
    @open="resetForm"
    center>
    <el-form ref="ruleForm" :model="item" >
      <!-- 加款信息 -->
      <table
        class="m-primordial-table
              el-table el-table--fit el-table--border
              el-table--enable-row-hover"
      >
          <tr>
            <td colspan="1">角色编码：</td>
            <td colspan="1">
              <el-form-item label=" " prop="roleCode" :rules="[{ required : true , message : '不能为空' , trigger : 'blur'}]">
                <el-input v-model="item.roleCode" placeholder="请输入角色编码" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="1">角色名称：</td>
            <td colspan="1">
              <el-form-item label=" " prop="roleName" :rules="[{ required : true , message : '不能为空' , trigger : 'blur'}]">
                <el-input v-model="item.roleName" placeholder="请输入角色名称" />
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td colspan="1">
              选择菜单：
            </td>
            <td colspan="1">
              <el-tree
                :check-strictly="true"
                :data="treeList"
                show-checkbox
                node-key="id"
                ref="tree"
                :props="defaultProps">
              </el-tree>
            </td>
          </tr>
        <tr>
          <td colspan="1">其他信息：</td>
          <td colspan="1">
            <el-form-item label=" " prop="contractNo">
              <el-input type="textarea" v-model="item.otherInfo" placeholder="请输入其它信息" />
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">确 定</el-button>
                <el-button @click="$parent.editState = 0">取 消</el-button>

        </span>
  </el-dialog>
</template>

<script>
  import Edits from '@/components/edits'
  import {URL_JSON} from "../../../../components/script/url_json";
  export default {
    name: 'createRole',
    props: {
      item: Object,
      editState: Number,
    },
    data () {
      return {
        defaultProps: {
          label: 'name'
        },
        treeList: [],
        list: []
      }
    },
    computed: {
      title () {
        return this.editState == 1 ? '修改角色信息' : this.editState == 2 ? '新增角色' : ''
      },
      show :{
        get: function () {
          return this.editState == 2 || this.editState == 1;
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    watch: {
      list () {
        this.initList();
      }
    },
    methods: {
      resetForm () {
        setTimeout(() => {
          this.$refs['ruleForm'].clearValidate();
        },200)
      },
      initList () {
        this.treeList = this.list.filter(it => it.pId == '0');
        this.treeList.forEach(it => {
          this.getChildren(it);
        })
        console.log(this.treeList)
      },
      getChildren(obj){
        obj.children = this.list.filter(it => it.pId == obj.id);
        obj.children.forEach(i => {
          this.getChildren(i)
        })
      },
      save() {
        console.log(this.$refs['tree'].getHalfCheckedKeys().join(','));
        this.$refs['ruleForm'].validate(res => {
          if(res){
            let items = this.$refs['tree'].getCheckedNodes().filter(it => it.type !== 3);
            this.item.menus = '';
            items.forEach((it) => {
              this.item.menus += it.id+ ',';
            })
            if(this.item.menus){
              this.item.menus = this.item.menus.substring(0,this.item.menus.length -1);
            }
            if(this.$refs['tree'].getHalfCheckedKeys().join(','))
              this.item.menus += ','+this.$refs['tree'].getHalfCheckedKeys().join(',');
            let arr = this.$refs['tree'].getCheckedNodes().filter(it => it.type === 3);
            this.item.btnIds = '';
            arr.forEach((it) => {
              this.item.btnIds += it.id+ ',';
            })
            if(this.item.btnIds){
              this.item.btnIds = this.item.btnIds.substring(0,this.item.btnIds.length -1);
            }

            this.$http.post(URL_JSON['saveRoleManage'],this.item)
              .then(res => {
                this.$message.success(res.description);
                if(res.code == '0000'){
                  this.$parent.editState = 0;
                  this.$emit('refresh');
                }
              })
          }
        });

      }
    },
    components: {
      Edits
    },
    created() {
          this.$http.post( URL_JSON['treeRoleManage'],null,{headers:{token: JSON.parse(localStorage.getItem('loginInfo')).token}})
            .then(r=> {
              if(r.code == '0000'){
                this.list = r.result;
              }
            })
    }
  }
</script>

<style scoped>

</style>
