<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="title"
    @open="resetForm"
    width="890px"
    center>
    <div class="dailog-container">
      <table-edits ref="edits" :editDefines="edtDefines" :item="item" :disabled="editState == 9"></table-edits>
    </div>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary"  v-if="editState ==1 || editState ==2" @click="saveApply(0)">保 存</el-button>
          <el-button type="primary" v-if="editState ==1 || editState ==2" @click="saveApply(1)">确认提交</el-button>
          <el-button @click="$parent.editState = 0" v-if="editState ==1 || editState ==2">取 消</el-button>
          <el-button @click="$parent.editState = 0" v-if="editState == 9">返 回</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import TableEdits from '@/components/tableEdits'
  import {URL_JSON} from "../../../../components/script/url_json";
  import formCheck from '@/components/script/formCheck'

  export default {
    name: 'apply',
    mixins: [formCheck],
    props: {
      editState: Number,
      item: Object
    },
    data () {
      return {
        title:'开户申请',
        edtDefines: [{
          title: '第一部分：客户基本信息',
          content: [
            {label: '客户全称：', type: 'text', placeholder: '请输入客户全称',columns:1,property: 'custName',rule:'require'},
            {label: '年营业额（万元）：', type: 'number', placeholder: '请输入年营业额',columns:1,property: 'busiAmount',rule:'require,gt0'},
            {label: '社会唯一信用号：', type: 'text', placeholder: '请输入社会唯一信用号',columns:1,property: 'custIdcard',rule:'require,certificate'},
            {label: '邮箱(账户)：', type: 'text', placeholder: '请输入邮箱(账户)',columns:1,property: 'loginName',rule:'require,email'},
            {label: '企业注册地址：', type: 'text', placeholder: '请输入企业注册地址',columns:2,property: 'custIdaddress',rule:'require'},
            {label: '网址或应用(名称)：', type: 'text', placeholder: '请输入网址或应用(名称)',columns:2,property: 'custWebsite',rule:'require'},
          ]
        },{
          title: '第二部分：法定代表人信息',
          content: [
            {label: '法定代表人：', type: 'text', placeholder: '请输入法定代表人',columns:1,property: 'legallerName',rule:'require'},
            {label: '身份证号：', type: 'text', placeholder: '请输入身份证号',columns:1,property: 'legallerIdcard',rule:'require,certificate'},
            {label: '法定代表人手机：', type: 'number', placeholder: '请输入法定代表人手机',columns:1,property: 'legallerPhone',rule:'require,phone'},
            {label: '法定代表人邮箱：', type: 'text', placeholder: '请输入法定代表人邮箱',columns:1,property: 'legallerEmail',rule:'require'},
            {label: '法定代表人职务：', type: 'text', placeholder: '请输入法定代表人职务',columns:2,property: 'legallerPosition',rule:'require'},
            {type: 'info',columns:2,content:'注：法定代表人手机和邮箱将用于接收案件信息，请与客户确认'}
          ]
        },{
          title: '第三部分：联系人信息',
          content: [
            {label: '客户联系人：', type: 'text', placeholder: '请输入客户联系人',columns:1,property: 'contactsName',rule:'require'},
            {label: '联系电话：', type: 'number', placeholder: '请输入联系电话',columns:1,property: 'contactsPhone',rule:'require,phone'},
            {label: '联系邮箱：', type: 'text', placeholder: '请输入联系邮箱',columns:1,property: 'contactsEmail',rule:'require,email'},
            {label: '微信或QQ：', type: 'text', placeholder: '请输入微信或QQ',columns:1,property: 'contactsQq',rule:'require'},
          ]
        },{
          title: '第四部分：配置信息',
          content: [
            {label: '选择仲裁委：', type: 'select', options: this.AllArbList,columns:1,property: 'arbId',valuefield: 'arbId', labelfield: 'fullName',rule:'require'},
            // 1主账户、2子账户
            {label: '客户类型：', type: 'select', options: [{label: '主账户', value: 1},{label: '子账户', value: 2}],columns:1,property: 'custType',rule:'require'},
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
          title: '第六部分：合同信息',
          content: [
            {label: '合同编号：', type: 'text', placeholder: '请输入合同编号',columns:1,property: 'contractNo',rule:'require'},
            {label: '合同时间：', type: 'date', placeholder: '请输入合同时间',columns:1,property: 'contractDate',rule:'require'},
            {label: '预缴仲裁受理费（元）：', type: 'number', placeholder: '请输入预缴仲裁受理费',columns:1,property: 'preCaseAmt',rule:'require,gt0'},
            {label: '技术服务费（元）：', type: 'number', placeholder: '请输入技术服务费',columns:1,property: 'serviceAmt',rule:'require,gt0'},
            {label: '充值仲券（张）：', type: 'number', placeholder: '请输入充值仲券',columns:1,property: 'preCaseTicket',rule:'require,gt0'},
            {label: '仲券金额（元）：', type: 'number', placeholder: '请输入仲券金额',columns:1,property: 'preTicketAmt',rule:'require,gt0'},
            {label: '赠送仲券（张）：', type: 'number', placeholder: '请输入赠送仲券',columns:1,property: 'preGiftTicket',rule:'require,gt0'},
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
          title: '第七部分：所属负责人',
          content: [
            {label: '市场人员：',  type: 'select', options: [{label: '杭州仲裁委员会', value: 'hz'},{label: '衢州仲裁委员会', value: 'qz'}],columns:1,placeholder:'请选择市场人员',property: 'marketerId',valuefield: 'userId', labelfield: 'userName',rule:'require'},
            {type: 'info',columns:1, content:''},
          ]
        }],
        UserList: []
      }
    },
    computed: {
      show :{
        get: function () {
          return this.editState != 0;
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
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
      saveApply(num) {
        this.checkbeforeSave().then(() => {
          let obj = Object.assign({isCommit: num}, this.item);
          this.$http.post(URL_JSON['saveAccountApply'], obj, {headers:{token: JSON.parse(localStorage.getItem('loginInfo')).token}})
            .then(res => {
              console.log(res);
              if(res.code === '0000'){
                this.$message.success(res.description);
                this.$emit('refresh');
              }
            })
        }).catch(()=>{})

      }
    },
    components: {
      TableEdits
    },
    mounted () {
    },
    created() {
      this.getAllArbList();
      this.getUserList();
      this.getParentCustomer();
    }
  }
</script>

<style scoped lang="scss">
  .dailog-container{
    height: 542px;
    overflow-y: scroll;
  }
</style>
