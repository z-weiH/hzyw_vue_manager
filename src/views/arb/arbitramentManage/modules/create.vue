<template>
  <el-dialog
    :visible.sync="show"
    :title="title"
    width="495px"
    center>
    <edits :edit-items="createItems" :item="item" :label-width="'90px'"></edits>
    <span slot="footer" class="dialog-footer">
          <el-button @click="$parent.editState = 0">取 消</el-button>
          <el-button type="primary"  >确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
import Edits from '@/components/edits'
export default {
  name: 'arbitramentCreate',
  props: {
    item: Object,
    editState: Number
  },
  data () {
    return {
      createItems: [
        {type: 'text', property:'fullName', label: '仲裁委全称', placeholder: '仲裁委全称'},
        {type: 'text', property:'shortName', label: '仲裁委简称', placeholder: '仲裁委简称'},
        {type: 'text', property:'linkman', label: '联系人姓名', placeholder: '联系人姓名'},
        {type: 'text', property:'phone', label: '联系人手机', placeholder: '联系人手机'},
        {type: 'text', property:'email', label: '联系人邮箱', placeholder: '联系人邮箱'},
        {type: 'text', property:'url', label: '接口链接地址', placeholder: '接口链接地址'},
        {type: 'textarea', property:'remark', label: '备注信息', placeholder: '备注信息'},
      ]
    }
  },
  computed: {
    title () {
      return this.editState == 1 ? '修改仲裁委' : this.editState == 2 ? '新增仲裁委' : ''
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
  components: {
    Edits
  }
}
</script>

<style scoped>

</style>
