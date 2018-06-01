<template>
<div class="content">
        <div class='wsbodyhead'>
         <a>所在位置</a>

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
              <el-button type="primary">新增调解员</el-button>
            </div>
          </template>
          <template v-else>
            <table-component :pager="pager" :table-data="tableData"  :column-define="columnDefine1" :actions="actions"></table-component>
            <div class="center mt-20 mb-20" >
              <el-button type="primary">新增还款账户</el-button>
            </div>
          </template>
        </div>
</div>
</template>
<script type="text/ecmascript-6">
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
import {URL_JSON} from "../../../components/script/url_json";
export default {
  name: "mediationMsgSet",
  extends: Mixins,
  data() {
    return {
      tab: 0,
      item: {},
      queryUrl: URL_JSON['queryAdjustMediator'],
      tableData: [{}],
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
  watch: {
    tab(val, oldval) {
      this.queryUrl = val ? URL_JSON['queryAdjustPaymentAccount'] : URL_JSON['queryAdjustMediator'];
      this.pager.currentNum = 1;
      this.doQuery(this.queryUrl,this.pager);
    }
  },
  methods: {
    doDelete(row) {
      this.showConfirm(`确定删除${row.name}`).then(res => {
        if(res){

        }
      })
    }
  },
  created() {
    this.doQuery(this.queryUrl, this.item);
  },
  components: {
    Searchs,
    TableComponent
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
