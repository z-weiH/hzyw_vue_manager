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
      :props="defaultProps">
    </el-tree>
    <span slot="footer" class="dialog-footer">
          <el-button @click="$parent.editState = 0">取 消</el-button>
          <el-button type="primary"  >确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import {URL_JSON} from "../../../../components/script/url_json";
  export default {
    name: 'rolePermission',
    props: {
      editState: Number,
      list: Array
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
        this.treeList = this.list.filter(it => !it.pId);
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
      }
    }
  }
</script>

<style scoped>

</style>
