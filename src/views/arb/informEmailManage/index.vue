<template>
  <div>
    <div class="item-search">
      <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">
      </searchs>
    </div>
    <div class="item-title">
      仲裁委邮箱管理
    </div>
    <div class="item-table">
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine" :actions="actions"></table-component>
    </div>
    <inform-email-edit :item="item" :edit-state="editState"></inform-email-edit>
  </div>
</template>

<script>
  import Searchs from '@/components/searchs'
  import Mixins from '@/components/script/_mixin'
  import TableComponent from '@/components/table'
  import InformEmailEdit from './modules/edit'
  import {URL_JSON} from "../../../components/script/url_json";
  export default {
    name : 'roleManame',
    extends: Mixins,
    data () {
      return {
        tableData: [],
        searchItems : [
          {type: 'text',placeholder: '请输入仲裁委名称', property: 'keyWords', colSpan: 6}
        ],
        searchItem: {},
        columnDefine: [
          {label: '仲裁委全称',property: 'fullName',width: 150},
          {label: '仲裁委简称',property: 'shortName',width: 150},
          {label: '通知邮箱账号',property: 'emailUsername',width: 230},
          {label: '创建时间',property: 'createTime',width: 150},
        ],
        actions: [
          {label: '操作',btns: [
              {label:'修改', function: this.doEdit},
            ]
          }
        ],
        item: {},
        editState: 0, // 4 编辑权限
        deleteConfirm: false,
        currentItem: {},
        queryUrl:  URL_JSON['queryInformEmailManage']
      }
    },
    methods: {
      doEdit (row) {
        this.$http.post( URL_JSON['editInformEmailManage'],{emailId: row.emailId}).then(res => {
          if(res.code){
            this.item = res.result;
            this.editState = 1;
          }
        })
      },
    },
    components : {
      Searchs,
      TableComponent,
      InformEmailEdit
    },
    mounted () {
      this.doQuery(this.queryUrl,this.searchItem);
    }
  }
</script>

<style scoped>

</style>

