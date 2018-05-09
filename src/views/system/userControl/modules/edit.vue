<template>
    <div>
      <el-dialog
        :visible.sync="show"
        title="修改用户信息"
        width="495px"
        center>
        <edit-component :edit-items="editItems" :item="editItem" :label-width="'150px'"></edit-component>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary"  >确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
  import EditComponent from '@/components/edits'
  export default {
    name: 'editUsrControl',
    props: {
      editItem: Object,
      editState: Number
    },
    data () {
      return {
        editItems: [
          {type: 'text', property:'loginName', label: '用户名'},
          {type: 'text', property:'userName', label: '真实姓名'},
          {type: 'text', property:'userPhone', label: '手机号码'},
          {type: 'text', property:'userEmail', label: '电子邮箱'},
          {type: 'text', property:'roleIds', label: '角色权限（可多选）'},
          {type: 'text', property:'userAddress', label: '通讯地址'},
          {type: 'textarea', property:'otherInfo', label: '其它信息', placeholder: '请输入内容'},
        ],
      }
    },
    computed: {
      show :{
        get: function () {
          return this.editState == 1
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    components: {
      EditComponent
    }
  }
</script>

<style scoped>

</style>
