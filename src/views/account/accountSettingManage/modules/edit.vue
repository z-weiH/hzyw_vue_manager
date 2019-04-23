<template>
  <el-dialog
    ref="dialog"
    :visible.sync="show"
    :title="title"
    @open="resetForm"
    width="890px"
    center>
    <div class="dailog-container">
      <table-edits :editDefines="edtDefines1" :item="item" :disabled="true"></table-edits>
      <table    class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mb-20">
        <tbody>
        <tr class="table-edits">
          <td colspan="5">第二部分：结算方案</td>
        </tr>
        <tr class="table-edits">
          <td colspan="1">
            <!--<el-input type="textarea" v-model="item.apprerResult" placeholder="请输入审核原因" :disabled="$parent.editState == 9"></el-input>-->
            设置结算类型
          </td>
          <td colspan="4" style="text-align: left;padding-left: 3rem !important;">
            <el-radio disabled v-model="item.settleType" :label="2">比例结算</el-radio>
            <el-radio disabled v-model="item.settleType" :label="1">仲券结算</el-radio>
          </td>
        </tr>
        <template v-if="item.settleType === 2">
          <tr class="table-edits" v-for="(settle, idx) in item.formulas">
            <td colspan="5"  class="settleAdded">
              <p>
                <!--<i class="el-icon-close fr" style="cursor: pointer;" @click="handleSettleDel(idx)" v-if="idx !== 0"></i>-->
                {{'阶段' + (idx + 1)}}
              </p>
              <ul>
                <li>
                  <div class="label">
                    案件标的区间
                  </div>
                  <div class="content">
                    <div class="input">
                      <el-input size="small" v-model="settle.amtStart" disabled style="width: 180px;text-align: center;"></el-input>
                      <div class="w100"></div>
                      <el-input size="small" disabled v-model="settle.amtEnd" style="width: 180px;text-align: center;"></el-input>
                      元
                    </div>
                    <div class="input_desc">
                      * 若节点置空，代表不封顶，如：100元以上，则只需在左框填写100
                    </div>

                  </div>
                </li>
                <li >
                  <div class="label">
                    收取比例
                  </div>
                  <div class="content">
                    <div class="input">
                      <el-input size="small" disabled v-model="settle.settleRate"  style="width: 250px;text-align: center;"></el-input>
                      %
                    </div>
                    <div class="input_desc">
                      * 如：收取比例为1%，则填写1
                    </div>

                  </div>
                </li>
              </ul>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
      <table-edits ref="edits" :editDefines="edtDefines" :item="item" :disabled="editState !== 1"></table-edits>
    </div>
    <span slot="footer" class="dialog-footer" v-if="$parent.editState !== 8 ">
          <el-button type="primary" @click="save(0)">保 存</el-button>
          <el-button type="primary" @click="save(1)">确认提交</el-button>
          <el-button @click="$parent.editState = 0">取 消</el-button>
    </span>
    <span slot="footer" class="dialog-footer" v-if="$parent.editState === 8 ">
          <el-button @click="$parent.editState = 0">返  回</el-button>
    </span>
  </el-dialog>
</template>

<script>
import TableEdits from '@/components/tableEdits'
import {URL_JSON} from "../../../../components/script/url_json";
import formCheck from '@/components/script/formCheck'


export default {
  name: 'edit',
  mixins:[formCheck],
  props: {
    editState: Number,
    item: Object
  },
  data () {
    return {
      title:'开户设置',
      edtDefines1: [
        {
          title: '第一部分：客户基本信息',
          content: [
            {label: '客户全称：', type: 'text', placeholder: '请输入客户全称',columns:1,property: 'custName'},
            {label: '账号：', type: 'text', placeholder: '请输入账号',columns:1,property: 'loginName'},
            {label: '社会唯一信用号：', type: 'text', placeholder: '请输入社会唯一信用号',columns:1,property: 'custIdcard'},
            {label: '法定代表人：', type: 'text', placeholder: '请输入法定代表人',columns:1, property: 'legallerName'},
            {label: '合同号：', type: 'text', placeholder: '请输入合同号',columns:2,property: 'contractNo'},
          ]
        },
      ],
      edtDefines: [{
        title: '第三部分：银行到款信息',
        content: [
          {label: '银行账户名称：', type: 'text', placeholder: '请输入银行账户名称',columns:2,property: 'acctName',rule:'require'},
          {label: '银行账号：', type: 'text', placeholder: '请输入银行账号',columns:1,property: 'acctNo',rule:'require'},
          {label: '开户行名称：', type: 'text', placeholder: '请输入开户行名称',columns:1,property: 'bankName',rule:'require'},
          {label: '银行支付流水号：', type: 'text', placeholder: '请输入银行支付流水号',columns:1,property: 'bankOrderno',columns:2,rule:'require'},
          {label: '到款金额：', type: 'text', placeholder: '请输入到款金额',columns:1,property: 'arrivalAmt',rule:'require,gt0', disabled: true},
          {label: '到款时间：', type: 'date', placeholder: '请输入到款时间',columns:1,property: 'payTime',rule:'require'},
          {label: '摘要：', type: 'text', placeholder: '请输入摘要',columns:2,property: 'bankRemark',rule:'require'},

        ]
      },{
        title: '第四部分：加款信息',
        content: [
          {labelFn: (item) => {
              return item.settleType === 1 ? '添加仲券（张）：' : '添加服务费（元）：'
            }, type: 'number', placeholder: '请输入',columns:1,property: 'ticketCount',rule:'require,gt0'},
          {label: '仲券金额（元）：', type: 'number', placeholder: '请输入仲券金额',columns:1,property: 'ticketAmount',rule:'require,gt0', disabled: true,hidden: () => this.item.settleType === 1},
          {label: '添加受理费（元）：', type: 'number', placeholder: '请输入添加受理费',columns:1,property: 'caseAmount',rule:'require,gt0'},
          {label: '技术服务费（元）：', type: 'number', placeholder: '请输入技术服务费',columns:1,property: 'serveAmount',rule:'gt0'},
          {labelFn: (item) => {
              return item.settleType === 1 ? '赠送仲券（张）：' : '赠送服务费（元）：'
            },  type: 'number', placeholder: '请输入',columns:1,property: 'giftTicket',rule:'require,gt0'},
          {labelFn: (item) => {
              return item.settleType === 1 ? '赠券有效期：' : '赠送服务费有效期：'
            }, type: 'select', placeholder: '请选择有效期',columns:1,property: 'giftPeriod',options: [
              {label: '请选择赠券有效期', value: ''},
              {label: '1个月', value: '1'},
              {label: '2个月', value: '2'},
              {label: '3个月', value: '3'},
              {label: '4个月', value: '4'},
              {label: '5个月', value: '5'},
              {label: '6个月', value: '6'},
              {label: '7个月', value: '7'},
              {label: '8个月', value: '8'},
              {label: '9个月', value: '9'},
              {label: '10个月', value: '10'},
              {label: '11个月', value: '11'},
              {label: '12个月', value: '12'},
            ],hidden: () => {
              return this.item.giftTicket && this.item.giftTicket != 0;
            },
            rule: [
              {
                validator: (rule, value, callback) => {
                  if(this.item.giftTicket && this.item.giftTicket != 0 && !value){
                    callback(new Error("不能为空"))
                  }
                  else {
                    callback();
                  }
                }
              }
            ]
          },
        ]
      },
        {
          title: '第五部分：审核结果',
          content: [
            {label:'审核状态：',type: 'text', columns: 2, property: 'auditStatus' },
            {label:'财务主管审批意见：',type: 'textarea', columns: 2, property: 'apprerResult' },
          ],
          hidden: () => this.item.orderStatus >= 2
        }
      ]
    }
  },
  watch:{
    '$parent.editState': function(val,oldval){
      this.resetForm();
    },
    'item.ticketCount': function(val, oldval){
      if(val || val == 0){
        this.handleChange();
        this.handleArriveChange();
      }
    },
    'item.caseAmount': function (val,oldval) {
      if(val || val == 0){
        this.handleArriveChange();
      }
    },
    'item.serveAmount': function (val,oldval) {
      this.handleArriveChange(true);
    },
  },
  computed: {
    show :{
      get: function () {
        return this.editState === 1 || this.editState === 8;
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
    setServeAmount() {
      if(!this.item.serveAmount){
        // this.item.serveAmount = 1;
        this.$set(this.item,'serveAmount',0)
        this.item.serveAmount = 0;
      }
    },
    handleChange() {
      if(this.item.ticketCount){
        if(this.item.settleType === 1){
          this.item.ticketAmount = this.item.ticketCount * 10;
        }else{
          this.item.ticketAmount = this.item.ticketCount * 0;
        }
      }
    },
    handleArriveChange(target) {
      if(!target){
        this.setServeAmount();
      }
      let num = this.item.serveAmount;
      if(!num){
        num = 0;
      }
      if(!isNaN(+this.item.ticketCount) && !isNaN(+this.item.caseAmount)) {
        let fix = this.item.settleType === 1 ? 10 : 1;
        this.item.arrivalAmt = (+this.item.ticketCount * fix) + (+this.item.caseAmount) + (+num);
      }
    },
    save(num) {
      this.setServeAmount();
      console.log(this.item);
      this.checkbeforeSave().then(res => {
        // "到款金额 = 仲券金额 + 技术服务费 + 添加受理费"
        console.log(this.item);
        if(this.item.ticketCount * 10 != +this.item.ticketAmount && this.item.settleType === 1){
          return this.$message.error("仲券金额 = 添加仲券 * 10")
        }
        let fix = this.item.settleType === 1 ? 10 : 1;
        if(+this.item.arrivalAmt != (+this.item.ticketCount * fix) + (+this.item.caseAmount) + (+this.item.serveAmount)){
          return this.$message.error("到款金额 = 仲券金额 + 技术服务费 + 添加受理费");
        }

        this.$http.post(URL_JSON['saveAccountSettingManage'],Object.assign({isCommit: num},this.item),{headers:{token: JSON.parse(localStorage.getItem('loginInfo')).token}})
          .then(res => {
            if(res.code === '0000'){
              this.$message.success(res.description);
              this.$emit('refresh')
            }
          })
      }).catch(()=>{});

    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .dailog-container{

  }
</style>
