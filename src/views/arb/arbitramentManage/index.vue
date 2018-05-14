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
    <el-dialog
      :visible.sync="deleteConfirm"
      title="提示"
      width="495px"
      center>
      <div>是否确认删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sureDelete">确 定</el-button>
          <el-button @click="deleteConfirm = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import Searchs from "@/components/searchs";
import Mixins from "@/components/script/_mixin";
import TableComponent from "@/components/table";
import ArbitramentCreate from "./modules/create";
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
      deleteConfirm: false,
      currentItem: {},
      queryUrl: "/7/arbitration/queryArbByBaseQuery.htm",
    };
  },
  methods: {
    create() {
      this.item = {};
      this.editState = 2;
    },
    doEdit(row) {
      console.log(row);
      this.item = row;
      this.editState = 1;
    },
    doDelete(row) {
      this.deleteConfirm = true;
      this.currentItem = row;
    },
    sureDelete() {},
    doQuery(url, item) {
      console.log('doquery');
      this.query(url, item).then(res => {
        console.warn("000000000000000000");
        console.info(res);
        this.tableData = res[0].result.list;
        this.total = res[0].result.count;
        console.log(typeof res[0].result.list);
      });
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
};
</script>

<style scoped>

</style>

