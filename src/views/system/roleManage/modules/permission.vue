<template>
  <el-dialog
    :visible.sync="show"
    title="菜单权限"
    width="495px"
    center>

    <span slot="footer" class="dialog-footer">
          <el-button @click="$parent.editState = 0">取 消</el-button>
          <el-button type="primary"  >确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import EditComponent from '@/components/edits'
  export default {
    name: 'rolePermission',
    props: {
      editState: Number
    },
    data () {
      return {

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
    }
  }
</script>

<style scoped>

</style>
