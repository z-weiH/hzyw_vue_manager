<script src="../../../../../newbuild_MchantAdmin/mchant_manage_top/build/develop/app/caseMg/caseListView.js"></script>
<template>
  <div>
    <div class="item-search">
      <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">
        <div class="fr" slot="moreBtn">
          <el-button type="primary" @click="create">新增仲裁委</el-button>
        </div>
      </searchs>
    </div>
    <div class="item-title">
      仲裁委管理
    </div>
    <div class="item-table">
      <table-component  :pager="pager" :table-data="tableData" :column-define="columnDefine" :actions="actions"></table-component>
    </div>
    <arbitrament-create :item="item" :edit-state="editState"></arbitrament-create>
  </div>
</template>

<script>
  import Searchs from "@/components/searchs";
  import Mixins from "@/components/script/_mixin";
  import TableComponent from "@/components/table";
  import ArbitramentCreate from "./modules/create";
  import {URL_JSON} from "../../../components/script/url_json";

  export default {
    name: "roleManame",
    extends: Mixins,
    data() {
      return {
        tableData: [{}],
        searchItems: [
          {
            type: "text",
            placeholder: "请输入仲裁委名称",
            property: "keyWords",
            colSpan: 6
          }
        ],
        searchItem: {},
        columnDefine: [
          { label: "仲裁委全称", property: "fullName" },
          { label: "仲裁委简称", property: "shortName" },
          { label: "联系人姓名", property: "linkman" },
          { label: "接口地址", property: "url" }
        ],
        actions: [
          {
            label: "操作",
            btns: [
              { label: "修改", function: this.doEdit },
              { label: "删除", function: this.doDelete }
            ]
          }
        ],
        item: {},
        editState: 0, // 4 编辑权限
        queryUrl:  URL_JSON['queryArbitramentManage'],
      };
    },
    methods: {
      create() {
        this.item = {};
        this.editState = 2;
      },
      doEdit(row) {
        console.log( typeof(row.arbId));
        this.$http.post( URL_JSON['editArbitramentManage'],{
          arbId: row.arbId
        }).then(res => {
          if(res.code == '0000'){
            console.log(res);
            this.item = res.result;
            this.editState = 1;
          }
        })
      },
      doDelete(row) {
        this.showConfirm().then(res => {
          if(res){
            this.$http.post( URL_JSON['deleteArbitramentManage'],{
              arbId: row.arbId
            }).then(r => {
              if(r.code == '0000'){
                let idx = this.tableData.findIndex(it => it == row);
                console.log(idx);
                this.tableData.splice(idx,1);
              }
              this.$message({
                message: r.description,
                type:r.code == '0000' ? 'success' : 'error'
              });
            })
          }
        })
      },
      sureDelete() {

      }
    },
    components: {
      Searchs,
      TableComponent,
      ArbitramentCreate
    },
    mounted() {
      this.doQuery(this.queryUrl, this.item);
    }
  }
</script>

<style scoped>

</style>

