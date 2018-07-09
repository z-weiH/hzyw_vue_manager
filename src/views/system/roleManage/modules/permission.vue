<template>
  <el-dialog
    :visible.sync="show"
    title="菜单权限"
    width="495px"
    center>
    <el-tree
      :data="treeList"
      show-checkbox
      node-key="id"
      default-expand-all
      ref="tree"
      :props="defaultProps">
    </el-tree>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="save">确 定</el-button>
                <el-button @click="$parent.editState = 0">取 消</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import {URL_JSON} from "../../../../components/script/url_json";
  export default {
    name: 'rolePermission',
    props: {
      editState: Number,
      list: Array,
      item: Object
    },
    data () {
      return {
        defaultProps: {
          label: 'name'
        },
        treeList: []
      }
    },
    computed: {
      show :{
        get: function () {
          return this.editState == 4
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    components: {
    },
    watch: {
      list () {
        this.initList();
      }
    },
    methods: {
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
        // this.item.permissions = this.$refs['tree'].getCheckedKeys().join(',');
        this.item.menus = this.$refs['tree'].getCheckedKeys().join(',');
        this.$http.post(URL_JSON['saveRoleManage'],this.item)
          .then(res => {
            this.$message.success(res.description);
            if(res.code == '0000'){
              this.$parent.editState = 0;
            }
          })
      }
    },
  }
</script>

<style scoped>

</style>
