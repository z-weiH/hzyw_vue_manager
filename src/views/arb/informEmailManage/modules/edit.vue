<template>
  <el-dialog
    :visible.sync="show"
    v-dialogDrag
    :title="title"
    width="495px"
    center>
    <edits :edit-items="createItems" :item="item" :label-width="'90px'"></edits>
    <span slot="footer" class="dialog-footer">
          <el-button @click="$parent.editState = 0">取 消</el-button>
          <el-button type="primary" @click="save" >确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
import Edits from '@/components/edits'
import {URL_JSON} from "../../../../components/script/url_json";
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
    save () {
      this.$http.post( URL_JSON['saveInformEmailManage'],this.item)
        .then(res => {
          if(res.code) {
            let currentItem = this.$parent.tableData.find(it => it.emailId == this.item.emailId);
            if(currentItem){
              Object.keys(this.item).forEach(key => {
                currentItem[key] = this.item[key];
              })
            }
          }
        })
    }
  },
  components: {
    Edits
  }
}
</script>

<style scoped>

</style>
