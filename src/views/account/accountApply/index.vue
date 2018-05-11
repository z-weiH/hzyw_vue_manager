<template>
  <div>
    <div>
      <div class="item-search">
        <searchs :search-items="searchItems" :item="searchItem" :queryUrl="searchurl">
          <div class="fr" slot="moreBtn">
            <el-button type="primary" @click="create">提交开户申请</el-button>
          </div>
        </searchs>
      </div>
      <div class="item-title">
        开户申请
      </div>
      <div class="item-table">
        <table-component :tableData="tableData" :columnDefine="columnDefine"></table-component>
      </div>
      <account-apply :edit-state="editState"></account-apply>
      <el-date-picker
        type="date"
        placeholder="选择日期"
        disabledDate="setDisabled">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
  import Mixins from '@/components/script/_mixin'
  import Searchs from '@/components/searchs'
  import TableComponent from '@/components/table'
  import AccountApply from './modules/apply'
  export default {
    name: 'menuManage',
    extends: Mixins,
    data () {
      return {
        searchurl: '/customer/queryCostomerByBaseQuery.htm',
        searchItems : [
          {type: 'text',placeholder: '请输入企业名称、账户', property: 'keyWords', colSpan: 7},
          {type: 'date',placeholder: '请输入开始时间', property: 'startTime', colSpan: 5},
          {type: 'date',placeholder: '请输入结束时间', property: 'endTime', colSpan: 5},
        ],
        searchItem: {},
        columnDefine: [
          {label: '企业名称',property: 'custName'},
          {label: '账户',property: 'loginName'},
          {label: '法定代表人',property: 'legallerName'},
          {label: '联系人',property: 'contactsName'},
          {label: '联系电话',property: 'contactsPhone'},
          {label: '申请时间',property: 'applicateTime'},
        ],
        actions: [
          {label: '操作',btns: [
              {label:'修改', function: this.doEdit},
              {label:'删除', function: this.doDelete},
            ]
          }
        ],
        item: {hello: 333},
        editState: 0,
      }
    },
    methods: {
      create () {
        this.item = {};
        this.editState = 2;
      },
      doEdit (row) {
        this.$http.post('/menu/selectByPrimaryKey.htm',{menuId:row.menuId})
          .then(res => {
            this.item = res;
          })
        this.editState = 1;
      },
      doDelete () {

      },
      setDisabled(val) {
       console.log(val)
        return true
      }
    },
    components: {
      Searchs,
      TableComponent,
      AccountApply
    }
  }
</script>

<style scoped>

</style>
