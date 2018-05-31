<template>
  <el-dialog
    :visible.sync="show"
    :title="title"
    @open="resetForm"
    width="495px"
    center>
    <table-edits ref="edits" :editDefines="editDefines" :item="item"></table-edits>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">{{btnName}}</el-button>
          <el-button @click="$parent.editState = 0">取 消</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import tableEdits from '@/components/tableEdits'
  import {URL_JSON} from "../../../../components/script/url_json";
  import FormCheck from '@/components/script/formCheck'

  export default {
    mixins: [FormCheck],
    name: 'createMenu',
    props: {
      item: Object,
      editState: Number
    },
    data () {
      return {
        editDefines: [
          {
            content: [
              {label: '短信渠道商户名称：', type: 'text',columns:2,property: 'channelName',rule:'require'},
              {label: '短信发送号码：', type: 'text',columns:2,property: 'phone',rule:'require'},
            ]
          }
        ],
      }
    },
    computed: {
      title () {
        return this.editState == 1 ? '修改短信渠道信息' : this.editState == 2 ? '新增短信渠道' : ''
      },
      show :{
        get: function () {
          return this.editState == 2 || this.editState == 1;
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      },
      btnName() {
        return this.editState == 1 ? '修 改' : this.editState == 2 ? '新 增' : '';
      }
    },
    methods: {
      save() {
        this.checkbeforeSave().then(res=> {
          this.$http.post(URL_JSON['saveChannelManage'],this.item)
            .then(res => {
              if(res.code === '0000'){
                this.$message.success(res.description);
                this.$emit('refresh')
              }
            })
        }).catch(()=>{});
      }
    },
    components: {
      tableEdits
    }
  }
</script>

<style scoped>

</style>
