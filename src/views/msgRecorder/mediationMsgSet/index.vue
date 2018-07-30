<template>
<div class="content">
        <div class='wsbodyhead'>
          <a>所在位置</a>
          <router-link :to='$options.name' class='aside_tit'>调解短信设置</router-link>

        </div>
        <div class='item-title'>
          <span class="link" :class="{active: tab === 0}" @click="tab=0">
          调解员及联系电话
          </span>
          <span class="link" :class="{active: tab === 1}" @click="tab=1">
          还款账户信息
          </span>
        </div>
        <div class='item-table'>
          <template v-if="!tab">
            <table-component :pager="pager" :table-data="tableData"  :column-define="columnDefine" :actions="actions"></table-component>
            <div class="center mt-20 mb-20">
              <el-button type="primary" @click="HandleCreate">新增调解员</el-button>
            </div>
          </template>
          <template v-else>
            <table-component :pager="pager" :table-data="tableData"  :column-define="columnDefine1" :actions="actions"></table-component>
            <div class="center mt-20 mb-20" >
              <el-button type="primary" @click="HandleCreate">新增还款账户</el-button>
            </div>
          </template>
        </div>
        <el-dialog
          :visible.sync="showDialog"
          v-dialogDrag
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          @open="resetForm"
          :title="title"
          width="600px"
          :modal="false"
          center>
          <table-edits ref="edits" :editDefines="edtDefines" :item="item"></table-edits>
          <div slot="footer" class="dialog-footer center mt-30" >
            <el-button type="primary" @click="HandleSubmit">确  认</el-button>
            <el-button @click="showDialog = false;">取 消</el-button>
          </div>
        </el-dialog>
</div>
</template>
<script type="text/ecmascript-6">
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
import {URL_JSON} from "../../../components/script/url_json";
import formCheck from '@/components/script/formCheck';
import TableEdits from '@/components/tableEdits'
export default {
  name: "mediationMsgSet",
  extends: Mixins,
  mixins: [formCheck],
  data() {
    return {
      showDialog: false,
      tab: 0,
      item: {},
      queryUrl: URL_JSON['queryAdjustMediator'],
      tableData: [],
      searchItems: [
        {
          label: "",
          type: "",
          placeholder: "",
          colSpan: 4,
          property: ""
        }
      ],
      columnDefine: [
        {
          label: "调解员",
          property: "name"
        },
        {
          label: "联系电话",
          property: "phone"
        }
      ],
      columnDefine1: [
        // 代号	申请人	银行名称	户名	银行卡号	开户行	操作
        {label: '代号', property: 'custName'},
        {label: '申请人', property: 'applicantName'},
        {label: '银行名称', property: 'bankName'},
        {label: '户名', property: 'bankAcct'},
        {label: '银行卡号', property: 'bankCard'},
        {label: '开户行', property: 'bankOpen'},
      ],
      actions: [
        {label: '操作',btns: [
            {label:'删除', function: this.doDelete},
          ]
        }
      ],
    };
  },
  computed: {
    title() {
      return this.tab === 0 ? '新增调解员' : '新增还款信息';
    },
    edtDefines() {
      if(!this.tab)
        return [
          {
            content: [
              {
                label: "调解员：",
                type: "text",
                columns: 2,
                property: "name",
                placeholder: '请输入调解员姓名',
                rule: 'require'
              },
              {
                label: "联系电话：",
                type: "text",
                columns: 2,
                property: "phone",
                placeholder: '请输入联系电话',
                rule: 'require'
              }
            ]
          }
        ]
      else
        return [
          {
            content: [
              {label: '代号:', placeholder: '请输入代号', columns: 2, type: 'text', property: 'custName', rule: 'require'},
              {label: '申请人:', placeholder: '请输入申请人', columns: 2, type: 'text', property: 'applicantName', rule: 'require'},
              {label: '银行名称:', placeholder: '请输入银行名称', columns: 2, type: 'text', property: 'bankName', rule: 'require'},
              {label: '户名:', placeholder: '请输入户名', columns: 2, type: 'text', property: 'bankAcct', rule: 'require'},
              {label: '银行卡号:', placeholder: '请输入银行卡号', columns: 2, type: 'text', property: 'bankCard', rule: 'require'},
              {label: '开户行:', placeholder: '请输入开户行', columns: 2, type: 'text', property: 'bankOpen', rule: 'require'},
            ]
          }
        ]
    }

  },
  watch: {
    tab(val, oldval) {
      this.queryUrl = val ? URL_JSON['queryAdjustPaymentAccount'] : URL_JSON['queryAdjustMediator'];
      this.pager.currentNum = 1;
      this.doQuery(this.queryUrl,this.pager);
    }
  },
  methods: {
    HandleSubmit() {
      this.checkbeforeSave().then(() =>{
        let url = this.tab == 0 ? URL_JSON['saveAdjustMediator'] : URL_JSON['saveAdjustPaymentAccount'];
        this.$http.post(url,this.item)
          .then(res => {
            if(res.code == '0000'){
              this.showDialog = false;
              this.doQuery(this.queryUrl,this.pager);
              this.$message.success(res.description);
            }
          })
      }).catch(() => {})
    },
    HandleCreate() {
      this.showDialog = true;
      this.item = {};
    },
    doDelete(row) {
      let msg= !this.tab ? `确定删除${row.name}` : `确定删除${row.accountInformation}`;
      let url = !this.tab ? URL_JSON['deleteAdjustMediator'] : URL_JSON['deleteAdjustPaymentAccount'];
      this.showConfirm(msg).then(res => {
        if(res){
          this.$http.post(url,{id: row.id})
            .then(r => {
              if(r.code === '0000'){
                this.showDialog = false;
                this.doQuery(this.queryUrl,this.pager);
                this.$message.success(r.description);
              }
            })
        }
      })
    }
  },
  created() {
    this.doQuery(this.queryUrl, this.pager);
  },
  components: {
    Searchs,
    TableComponent,
    TableEdits
  }
};
</script>
<style scoped lang="scss">
  .item-title{
    overflow: hidden;
    padding: 0;
    .link{
      cursor: pointer;
      float: left;
      height: 52px;
      line-height: 52px;
      padding: 0 20px;
      &:first-child{
        border-right: 1px solid #0F357F;
      }
      &.active{
        color: #0F357F;
        font-weight: bold;
      }
    }
  }

</style>
