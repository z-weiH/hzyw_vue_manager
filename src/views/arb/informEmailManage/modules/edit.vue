<template>
  <el-dialog
    :visible.sync="show"
    :title="title"
    width="495px"
    center>
    <edits :edit-items="createItems" :item="item" :label-width="'90px'"></edits>
    <span slot="footer" class="dialog-footer">
          <el-button @click="$parent.editState = 0">取 消</el-button>
          <el-button type="primary" @click="confirmClickHandle" >确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
import Edits from '@/components/edits'
export default {
  name: 'informEmailEdit',
  props: {
    item: Object,
    editState: Number
  },
  data () {
    return {
      createItems: [
        {type: 'text', property:'emailUsername', label: '邮箱账号', placeholder: '邮箱账号'},
        {type: 'text', property:'emailPassword', label: '邮箱密码', placeholder: '邮箱密码'},
        {type: 'text', property:'emailSmtp', label: '邮件smtp', placeholder: '邮件smtp'},
        {type: 'text', property:'senderName', label: '发送人名称', placeholder: '发送人名称'},
        {type: 'text', property:'senderAddress', label: '发邮件地址', placeholder: '发邮件地址'},
      ],
      title: '邮箱修改'
    }
  },
  computed: {
    show :{
      get: function () {
        return this.editState == 1;
      },
      set: function (v) {
        if(!v)
          this.$parent.editState = 0
      }
    }
  },
  methods: {
    confirmClickHandle () {
      console.log(this.item);
    }
  },
  components: {
    Edits
  }
}
</script>

<style scoped>

</style>
