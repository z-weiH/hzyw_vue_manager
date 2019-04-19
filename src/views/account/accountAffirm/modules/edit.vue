<template>
  <el-dialog
    :visible.sync="show"
    ref="dialog"
    :title="title"
    width="890px"
    center>
    <div class="dailog-container">
      <table-edits :editDefines="edtDefines" :item="item" :disabled="true" :sliceNumber="5">
        <table slot="tableAdded"   class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mb-20">
          <tbody>
          <tr class="table-edits">
            <td colspan="5">第六部分：结算方案</td>
          </tr>
          <tr class="table-edits">
            <td colspan="1">
              <!--<el-input type="textarea" v-model="item.apprerResult" placeholder="请输入审核原因" :disabled="$parent.editState == 9"></el-input>-->
              设置结算类型
            </td>
            <td colspan="4" style="text-align: left;padding-left: 3rem !important;">
              <el-radio :disabled="editState == 9" v-model="item.settleType" :label="2">比例结算</el-radio>
              <el-radio :disabled="editState == 9" v-model="item.settleType" :label="1">仲券结算</el-radio>
            </td>
          </tr>
          <template v-if="item.settleType === 2">
            <tr class="table-edits" v-for="(settle, idx) in item.formulas">
              <td colspan="5"  class="settleAdded">
                <p>
                  <i class="el-icon-close fr" style="cursor: pointer;" @click="handleSettleDel(idx)" v-if="idx !== 0"></i>
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
                        <el-input size="small" :disabled="editState == 9" v-model="settle.settleRate"  style="width: 250px;text-align: center;"></el-input>
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
      </table-edits>
      <table
        class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover"
      >
      <tr v-if="item.auditList && item.auditList.length > 0">
        <td colspan="4" >第九部分：审核结果</td>
      </tr>
      </table>
      <table-edits :editDefines="editDefines" :item="audit" v-for="(audit,index) in item.auditList" :key="index" :disabled="true"></table-edits>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="$parent.editState = 0">返回</el-button>
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
      edtDefines: [{
        title: '第一部分：客户基本信息',
        content: [
          {label: '客户全称：', type: 'text', placeholder: '请输入客户全称',columns:1,property: 'custName'},
          {label: '年营业额（万元）：', type: 'text', placeholder: '请输入年营业额',columns:1,property: 'busiAmount'},
          {label: '社会唯一信用号：', type: 'text', placeholder: '请输入社会唯一信用号',columns:1,property: 'custIdcard'},
          {label: '邮箱(账户)：', type: 'text', placeholder: '请输入邮箱(账户)',columns:1,property: 'loginName'},
          {label: '企业注册地址：', type: 'text', placeholder: '请输入企业注册地址',columns:2,property: 'custIdaddress'},
          {label: '网址或应用(名称)：', type: 'text', placeholder: '请输入网址或应用(名称)',columns:2,property: 'custWebsite'},
        ]
      },{
        title: '第二部分：法定代表人信息',
        content: [
          {label: '法定代表人：', type: 'text', placeholder: '请输入法定代表人',columns:1,property: 'legallerName'},
          {label: '身份证号：', type: 'text', placeholder: '请输入身份证号',columns:1,property: 'legallerIdcard'},
          {label: '法定代表人手机：', type: 'text', placeholder: '请输入法定代表人手机',columns:1,property: 'legallerPhone'},
          {label: '法定代表人邮箱：', type: 'text', placeholder: '请输入法定代表人邮箱',columns:1,property: 'legallerEmail'},
          {label: '法定代表人职务：', type: 'text', placeholder: '请输入法定代表人职务',columns:2,property: 'legallerPosition'},
          {type: 'info',columns:2,content:'注：法定代表人手机和邮箱将用于接收案件信息，请与客户确认'}
        ]
      },{
        title: '第三部分：联系人信息',
        content: [
          {label: '客户联系人：', type: 'text', placeholder: '请输入客户联系人',columns:1,property: 'contactsName'},
          {label: '联系电话：', type: 'text', placeholder: '请输入联系电话',columns:1,property: 'contactsPhone'},
          {label: '联系邮箱：', type: 'text', placeholder: '请输入联系邮箱',columns:1,property: 'contactsEmail'},
          {label: '微信或QQ：', type: 'text', placeholder: '请输入微信或QQ',columns:1,property: 'contactsQq'},
        ]
      },{
        title: '第四部分：配置信息',
        content: [
          {label: '选择仲裁委：', type: 'select', options: this.AllArbList,columns:1,property: 'arbId',valuefield: 'arbId', labelfield: 'fullName'},
          // 1主账户、2子账户
          {label: '客户类型：', type: 'select', options: [{label: '主账户', value: 1},{label: '子账户', value: 2}],columns:1,property: 'custType'},
          {label: '选择关联的普通客户：', type: 'select', options: [],columns:2,property: 'parentId', valuefield: 'custId', labelfield: 'custName',
            hidden: () => this.item.custType === 2
          },

        ]
      },{
        title: '第五部分：客户资料',
        content: [
          {label: '营业执照(jpg，png)', type: 'file', placeholder: '请输入客户联系人',columns:1,property: 'dataUrl',disabledLabel: '点击查看营业执照', accept: 'image/jpeg,image/png'},
          {type: 'img',columns:1,property:'dataUrl'},
        ]
      },{
        title: '第七部分：合同信息',
        content: [
          {label: '合同编号：', type: 'text', placeholder: '请输入合同编号',columns:1,property: 'contractNo'},
          {label: '合同时间：', type: 'date', placeholder: '请输入合同时间',columns:1,property: 'contractDate'},
          {label: '预缴仲裁受理费（元）：', type: 'text', placeholder: '请输入预缴仲裁受理费',columns:1,property: 'preCaseAmt'},
          {label: '技术服务费（元）：', type: 'text', placeholder: '请输入技术服务费',columns:1,property: 'serviceAmt'},
          {label: '充值仲券（张）：', type: 'text', placeholder: '请输入充值仲券',columns:1,property: 'preCaseTicket'},
          {label: '仲券金额（元）：', type: 'text', placeholder: '请输入仲券金额',columns:1,property: 'preTicketAmt'},
          {label: '赠送仲券（张）：', type: 'text', placeholder: '请输入赠送仲券',columns:1,property: 'preGiftTicket'},
          {label: '赠券有效期 ：', type: 'select', placeholder: '请选择赠券有效期',columns:1,property: 'preGiftPeriod',options: [
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
              return this.item.preGiftTicket && this.item.preGiftTicket != 0;
            }},
        ]
      },{
        title: '第八部分：所属负责人',
        content: [
          {label: '市场人员：',  type: 'select', options: [{label: '杭州仲裁委员会', value: 'hz'},{label: '衢州仲裁委员会', value: 'qz'}],columns:1,placeholder:'请选择市场人员',property: 'marketerId',valuefield: 'userId', labelfield: 'userName'},
          {type: 'info',columns:1, content:''},
        ]
      }],
      editDefines: [
        {
          title: '',
          content: [
            {label: '操作人：',  type: 'text',columns:1,property: 'apprerName'},
            {label: '操作时间：',  type: 'text',columns:1,property: 'audtiTime'},
            {label: '审核状态描述：',  type: 'text',columns:1,property: 'apprerStatusDesc'},
            {type: 'info',columns:1, content:''},
            {label: '审核结果：',  type: 'textarea',columns:2,property: 'apprerResult'},
          ]
        }
      ]
    }
  },
  computed: {
    show :{
      get: function () {
        return this.editState === 9;
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

  },
  mounted () {
  },
  methods: {
    getAllArbList() {
      this.$http.post(URL_JSON['ArbListAccountApply'])
        .then(res=> {
          if(res.code === '0000'){
            this.edtDefines[3].content[0].options = res.result;
          }
        })
    },
    getUserList() {
      this.$http.post(URL_JSON['RoleTypeAccountApply'],{type: 'MARKETER'})
        .then(res=> {
          if(res.code === '0000'){
            this.edtDefines[6].content[0].options = res.result;
          }
        })
    },
    getParentCustomer() {
      this.$http.post(URL_JSON['getParentCustomerAccountApply'])
        .then(res => {
          if(res.code === '0000'){
            this.edtDefines[3].content[2].options = res.result.list;
          }
        })
    },
  },
  created () {
    this.getAllArbList();
    this.getUserList();
    this.getParentCustomer();
  }
}
</script>

<style scoped>
  .dailog-container{

  }
</style>
