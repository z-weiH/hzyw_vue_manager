<template>
  <el-dialog
    ref="dialog"
    :visible.sync="show"
    :title="title"
    width="890px"
    @open="resetForm"
    center>
    <div class="dailog-container">
      <table-edits :editDefines="edtDefines" :item="item" :disabled="true"></table-edits>
      <el-form v-if="editState != 9 " ref="edits" :model="item">
        <el-form-item label=""  prop="remark">
          <el-input type="textarea" v-model="item.remark" placeholder="请输入确认原因"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">确 认</el-button>
          <el-button @click="$parent.editState = 0">取 消</el-button>

        </span>
  </el-dialog>
</template>

<script>
  import TableEdits from '@/components/tableEdits'
  import {URL_JSON} from "../../../../components/script/url_json";
  import formCheck from '@/components/script/formCheck'

  export default {
    name: 'apply',
    mixins:[formCheck],
    props: {
      editState: Number,
      item: Object
    },
    data () {
      return {
        title:'开户确认',
        edtDefines: [{
          title: '第一部分：客户基本信息',
          content: [
            {label: '客户全称：', type: 'text', readonly: true,columns:1,property: 'custName'},
            {label: '帐号：', type: 'text', readonly: true,columns:1,property: 'loginName'},
            {label: '社会唯一信用号：', type: 'text', readonly: true,columns:1,property: 'custIdcard'},
            {label: '法定代表人：', type: 'text', readonly: true,columns:1,property: 'legallerName'},
            {label: '合同号：', type: 'text', readonly: true,columns:1,property: 'contactNo'},
          ]
        },{
          title: '第二部分：加款信息',
          content: [
            {label: '添加受理费（元）: ', type: 'text',readonly: true,columns:1,property: 'caseAmount'},
            {label: '技术服务费（元）：', type: 'text',readonly: true,columns:1,property: 'serveAmount'},
            {label: '添加仲券（张）：: ', type: 'text',readonly: true,columns:1,property: 'ticketCount'},
            {label: '仲券金额（元）：', type: 'text',readonly: true,columns:1,property: 'ticketAmount'},
          ]
        }],
      }
    },
    computed: {
      show :{
        get: function () {
          return this.editState == 2;
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    components: {
      TableEdits
    },
    methods: {
      resetForm() {
        this.$refs['edits'].clearValidate();
      },
      save () {
            this.$http.post(URL_JSON['openAccountAffirm'],{custId: this.item.custId,remark: this.item.remark})
              .then(res => {
                if(res.code === '0000'){
                  this.$message.success(res.description);
                  this.$emit('refresh');
                }
              })
          }
    },
    mounted () {
    },
    updated () {
    }
  }
</script>

<style scoped lang="scss">
  .dailog-container{
    height: 542px;
    overflow-y: scroll;
  }
</style>
