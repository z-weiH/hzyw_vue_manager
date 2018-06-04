<template>
  <div class="content">
    <div class='wsbodyhead'>
      <a>所在位置</a>
      <router-link :to='$options.name' class='aside_tit'>受理费结算</router-link>
    </div>
    <searchs class='item-search' :search-items='searchItems' :item='searchItem' :query-url='queryUrl'>
    </searchs>
    <div class='item-title'>
      受理费结算
    </div>
    <div class='item-table'>
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine">
        <el-table-column :resizable="false" label="状态" prop="settleStatus" slot="defineCol">
            <template slot-scope="scope">
                <el-button size="mini" @click="showDialog(scope.row,1)" v-if="scope.row.settleStatus == 0">待处理</el-button>
                <el-button size="mini" @click="showDialog(scope.row,1)" v-if="scope.row.settleStatus == 1">待结算</el-button>
                <span v-if="scope.row.settleStatus == 2">已结算</span>
                <el-button size="mini" @click="showDialog(scope.row,1)" v-if="scope.row.settleStatus == 3">结算不通过</el-button>
            </template>
        </el-table-column>
      </table-component>
    </div>
    <setting-dlg ref="settingDlg" @refresh="refresh" :edit-state="editState"  ></setting-dlg>
</div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "../../../components/script/url_json";
import Searchs from "@/components/searchs";
import SettingDlg from "./modules/edit";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "processingFeeSettle",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: URL_JSON["queryProcessingFeeSettle"],
      tableData: [{}],
      searchItem: {},
      searchItems: [
        {
          type: "text",
          placeholder: "输入结算单号/结算方名称",
          colSpan: 6,
          property: "arbName"
        },
        {
          type: "month",
          placeholder: "年/月",
          property: "submitTime",
          colSpan: 4
        },
        {
          type: "select",
          placeholder: "请选择状态",
          property: "settleStatus",
          colSpan: 4,
          options:[
            {
              label:'待处理',
              value:'0'
            },{
              label:'待结算',
              value:'1'
            },{
              label:'已结算',
              value:'2'
            },{
              label:'结算不通过',
              value:'3'
            },
          ]
        }
      ],
      columnDefine: [
        {
          label: "结算月份",
          property: "settleMonth"
        },
        {
          label: "结算方",
          property: "arbName"
        },
        {
          label: "金额",
          property: "settleAmt"
        },
        {
          label: "结算单号",
          property: "settleId"
        },
        {
          label: "提交时间",
          property: "submitTime"
        }
      ]
    };
  },
  methods: {
    /**
     * @param row 当前行数据
     * @param type 显示的视图是否可编辑 1:可编辑 9:只读
     * */
    showDialog(row, type) {
      this.queryDetail(URL_JSON["editProcessingFeeSettle"], {
        settleId: row.settleId
      }).then(res => {
        if (res.code) {
          this.editState = type;
          this.$refs.settingDlg.item = res.result;
          this.$refs.settingDlg.item.settleId = row.settleId;
          console.log("type::", type);
          console.error(res.result);
        }
      });
    },
    doQuery(url, item) {
      this.query(url, item).then(res => {
        // this.tableData = res.result.list;
        // this.total = res.result.count;
      });
    }
  },
  mounted() {
    this.doQuery(this.queryUrl, this.item);
  },
  components: {
    Searchs,
    SettingDlg,
    TableComponent
  }
};
</script>

<style scoped lang="scss">
</style>
