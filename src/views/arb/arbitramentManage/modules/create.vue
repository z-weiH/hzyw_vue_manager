<template>
  <el-dialog
    :visible.sync="show"
    v-dialogDrag
    :title="title"
    @open="resetForm"
    width="495px"
    center>
    <edits ref="edits" :edit-items="createItems" :item="item" :label-width="'100px'"></edits>
    <span slot="footer" class="dialog-footer">
          <el-button @click="$parent.editState = 0">取 消</el-button>
          <el-button type="primary"  @click="save">确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
import Edits from '@/components/edits'
import {URL_JSON} from "../../../../components/script/url_json";
import formCheck from '@/components/script/formCheck'

export default {
  name: 'arbitramentCreate',
  mixins: [formCheck],
  props: {
    item: Object,
    editState: Number
  },
  data () {
    return {
      createItems: [
        {type: 'text', property:'arbName', label: '仲裁委全称', placeholder: '仲裁委全称',rule:'require'},
        {type: 'text', property:'shortName', label: '仲裁委简称', placeholder: '仲裁委简称',rule:'require'},
        {type: 'text', property:'linkman', label: '联系人姓名', placeholder: '联系人姓名',rule:'require'},
        {type: 'text', property:'phone', label: '联系人手机', placeholder: '联系人手机',rule:'require'},
        {type: 'text', property:'email', label: '联系人邮箱', placeholder: '联系人邮箱',rule:'require'},
        {type: 'text', property:'url', label: '接口链接地址', placeholder: '接口链接地址',rule:'require'},
        {type: 'textarea', property:'remark', label: '备注信息', placeholder: '备注信息',rule:'require'},
      ]
    }
  },
  methods: {
    save() {
      this.checkbeforeSave().then(res=> {
        this.$http.post( URL_JSON['saveArbitramentManage'], this.item)
          .then(res => {
            if(res.code == '0000'){
              if(this.editState == 1){
                let currentItem = this.$parent.tableData.find(it => it.arbId == this.item.arbId);
                if(currentItem){
                  Object.keys(this.item).forEach(key => {
                    currentItem[key] = this.item[key];
                  });
                  this.$parent.editState = 0;
                  console.log(this.$parent.tableData);
                }
              }
              else{
                Object.assign(this.item, res.result);
                console.log(this.item);
                this.$parent.tableData.unshift(this.item);
                this.$parent.editState = 0;
              }
            }
            this.$message({
              message: res.description,
              type: res.code == '0000' ? 'success' : 'error'
            });
          })
      }).catch(()=>{})

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
