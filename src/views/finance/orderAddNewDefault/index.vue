<template>
  <div class="content">
    <div class="wsbodyhead" id="bodyhead">
      <a>所在位置</a><a class="aside_tit" href="javascript:;">订单加款【财务人员】</a>
    </div>
    <searchs class='item-search' :search-items='searchItems' :item='searchItem' :query-url='queryUrl'>
      <template slot='moreBtn'>
              <el-button class='ml-20' type='primary' @click='handleExport' >导出Excel</el-button>
</template>
    </searchs>
    <div class="item-title">
      订单加款列表
    </div>
    <div class="item-table">
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine">
        <el-table-column :resizable="false" label="状态" prop="orderStatus" slot="defineCol">
<template slot-scope="scope">
  <el-button size="mini" @click="showDialog(scope.row,1)" v-if="scope.row.orderStatus == 0">
    待提交</el-button>
  <span v-if="scope.row.orderStatus == 1">待复核</span>
  <el-button size="mini" @click="showDialog(scope.row,1)" v-if="scope.row.orderStatus == 2">已加款</el-button>
  <el-button size="mini" @click="showDialog(scope.row,1)" v-if="scope.row.orderStatus == 3">未通过</el-button>
</template>
        </el-table-column>
      </table-component>
    </div>
    <setting-dlg :edit-state="editState" :item="item"></setting-dlg>
  </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "../../../components/script/url_json";
import Mixins from "@/components/script/_mixin";
// import exportFile from "@/components/script/exportFile";
import exportFile from "@/assets/js/exportFile";
import SettingDlg from "./modules/edit";
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
export default {
  name: "orderAddNewDefault",
  mixins: [Mixins],
  data() {
    return {
      searchItem: {},
      searchItems: [
        {
          type: "text",
          placeholder: "请输入订单号、名称",
          colSpan: 4,
          property: "keyWords"
        },
        {
          type: "date",
          placeholder: "开始时间",
          property: "startDate",
          colSpan: 4
        },
        {
          type: "date",
          placeholder: "结束时间",
          property: "endDate",
          colSpan: 4
        },
        {
          type: "select",
          property: "orderStatus",
          options: [
            {
              label: "待提交",
              value: "0"
            },
            {
              label: "待复核",
              value: "1"
            },
            {
              label: "已加款",
              value: "2"
            },
            {
              label: "未通过",
              value: "3"
            }
          ]
        }
      ],
      item: {},
      queryUrl: URL_JSON["queryOrderAddNewDefault"],
      exportUrl: URL_JSON["exportOrderAddNewDefault"],
      searchItem:{},
      columnDefine: [
        {
          label: "订单号",
          property: "orderNo",
          isLink: 1,
          linkShowPanel: el => {
            console.info("orderNo:::", el, this);
            this.showDialog(el, 9);
          }
        },
        {
          label: "申请时间",
          property: "orderDate"
        },
        {
          label: "客户名称",
          property: "merchantName"
        },
        {
          label: "联系电话",
          property: "orderPhone"
        },
        {
          label: "订单金额",
          property: "orderAmt"
        },
        {
          label: "已到账",
          property: "factAmt"
        },
        {
          label: "未到账金额",
          property: "unArriveAmt"
        }
      ],
      editItems: [
        {
          label: "",
          property: ""
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
      this.queryDetail(URL_JSON["queryOrderAddNewDefaultDetail"], {
        orderId: row.orderId
      }).then(res => {
        if (res.code) {
          this.item = res.result;
          this.editState = type;
          console.log("type::", type);
        }
      });
    },
    // 点击导出
    handleExport() {
      delete this.searchItem.count;
      delete this.searchItem.currentNum;
      delete this.searchItem.pageSize;
      exportFile({
        url: this.exportUrl,
        data: {
          keyWords: this.searchItem.keyWords,
          startDate: this.searchItem.startDate,
          endDate: this.searchItem.endDate,
          orderStatus: this.searchItem.orderStatus
        }
      });
    }
  },
  components: {
    Searchs,
    SettingDlg,
    TableComponent
  },
  created() {
    this.doQuery(this.queryUrl, this.searchItem);
  }
};
</script>

<style scoped lang="scss">
</style>
