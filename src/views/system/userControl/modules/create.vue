<template>
  <el-dialog
    :visible.sync="show"
    title="新增用户信息"
    width="495px"
    center>
    <edits :edit-items="createItems" :item="createItem" :label-width="'90px'"></edits>
    <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary"  >确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import Edits from '@/components/edits'
  export default {
    name: 'createUser',
    props: {
      createItem: Object,
      editState: Number
    },
    data () {
      return {
        createItems: [
          {type: 'text', property:'loginName', label: '用户名'},
          {type: 'text', property:'password', label: '登录密码'},
          {type: 'text', property:'juese', label: '所属角色'},
          {type: 'text', property:'userName', label: '真实姓名'},
          {type: 'text', property:'userPhone', label: '手机号码'},
          {type: 'text', property:'userEmail', label: '电子邮箱'},
          {type: 'textarea', property:'otherInfo', label: '其它信息', placeholder: '请输入内容'},
        ]
      }
    },
    computed: {
      show :{
        get: function () {
          return this.editState == 2
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    components: {
      Edits
    }
  }
</script>

<style scoped>

</style>
