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
        <account-apply :edit-state="editState"></account-apply>
      </div>

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
        searchurl: 'customer/queryCostomerByBaseQuery.htm',
        searchItems : [
          {type: 'text',placeholder: '请输入企业名称、账户', property: 'keyWords', colSpan: 7},
          {type: 'date',placeholder: '请输入开始时间', property: 'startTime', colSpan: 5},
          {type: 'date',placeholder: '请输入结束时间', property: 'endTime', colSpan: 5},
        ],
        searchItem: {},
        columnDefine: [
          {label: '菜单名称',property: 'menuName'},
          {label: '菜单链接',property: 'menuUrl'},
          {label: '父菜单',property: 'pMenuName'},
          {label: '菜单层级',property: 'menuDegree'},
          {label: '菜单排序',property: 'menuSort'},
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
