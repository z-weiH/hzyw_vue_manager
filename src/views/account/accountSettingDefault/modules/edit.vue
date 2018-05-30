<template>
  <el-dialog
    :visible.sync="show"
    :title="title"
    width="890px"
    center>
    <div class="dailog-container">
      <table-edits :editDefines="edtDefines" :item="item" :disabled="true">
      </table-edits>
      <el-form>
        <el-form-item label="">
          <el-input type="textarea" v-model="item.apprerResult" placeholder="请输入审核意见"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save(2)">通 过</el-button>
          <el-button @click="save(3)">不通过</el-button>
          <el-button @click="$parent.editState = 0">取 消</el-button>
        </span>
  </el-dialog>
</template>

<script>
import TableEdits from '@/components/tableEdits'
import {URL_JSON} from "../../../../components/script/url_json";
export default {
  name: 'edit',
  props: {
    editState: Number,
    item: Object
  },
  data () {
    return {
      title:'开户设置',
      edtDefines: [{
        title: '第一部分：客户基本信息',
        content: [
          {label: '客户全称：', type: 'text', placeholder: '请输入客户全称',columns:1,property: 'custName'},
          {label: '账号：', type: 'text', placeholder: '请输入账号',columns:1,property: 'loginName'},
          {label: '社会唯一信用号：', type: 'text', placeholder: '请输入社会唯一信用号',columns:1,property: 'custIdcard'},
          {label: '法定代表人：', type: 'text', placeholder: '请输入法定代表人',columns:1, property: 'legallerName'},
          {label: '合同号：', type: 'text', placeholder: '请输入合同号',columns:2,property: 'contractNo'},
        ]
      },{
        title: '第二部分：银行到款信息',
        content: [
          {label: '银行账户名称：', type: 'text', placeholder: '请输入银行账户名称',columns:2,property: 'acctName'},
          {label: '银行账号：', type: 'text', placeholder: '请输入银行账号',columns:1,property: 'acctNo'},
          {label: '开户行名称：', type: 'text', placeholder: '请输入开户行名称',columns:1,property: 'bankName'},
          {label: '银行支付流水号：', type: 'text', placeholder: '请输入银行支付流水号',columns:1,property: 'bankOrderno',columns:2},
          {label: '到款金额：', type: 'text', placeholder: '请输入到款金额',columns:1,property: 'arrivalAmt'},
          {label: '到款时间：', type: 'text', placeholder: '请输入到款时间',columns:1,property: 'payTime'},
          {label: '摘要：', type: 'text', placeholder: '请输入摘要',columns:2,property: 'bankRemark'},

        ]
      },{
        title: '第三部分：加款信息',
        content: [
          {label: '添加仲券（张）：', type: 'text', placeholder: '请输入添加仲券',columns:1,property: 'ticketCount'},
          {label: '仲券金额（元）：', type: 'text', placeholder: '请输入仲券金额',columns:1,property: 'ticketAmount'},
          {label: '添加受理费（元）：', type: 'text', placeholder: '请输入添加受理费',columns:1,property: 'caseAmount'},
          {label: '技术服务费（元）：', type: 'text', placeholder: '请输入技术服务费',columns:1,property: 'serveAmount'},
          {label: '赠送仲券（张）：', type: 'text', placeholder: '请输入赠送仲券',columns:1,property: 'giftTicket'},
        ]
      },
        {
          title: '第四部分：审核结果',
          content: [
            {label:'审核状态：',type: 'text', columns: 2, property: 'auditStatus' },
            {label:'财务主管审批意见：',type: 'textarea', columns: 2, property: 'apprerResult' },
          ],
          hidden: () => this.item.orderStatus >= 2
        }
      ]
    }
  },
  computed: {
    show :{
      get: function () {
        return this.editState === 1 || this.editState === 9;
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
    save(num) {
      this.$http.post(URL_JSON['saveAccountSettingDefault'], {apprerResult: this.item.apprerResult,orderId: this.item.orderId, status:num})
        .then(res => {
          if(res.code === '0000'){
            this.$message.success(res.description);
            this.$emit('refresh');
          }
        })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .dailog-container{
    height: 542px;
    overflow-y: scroll;
  }
</style>
