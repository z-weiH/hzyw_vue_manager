<template>
<div class="content">
        <div class='wsbodyhead'>
         <a>所在位置</a>
         <router-link :to='$options.name' class='aside_tit'>订单加款【审核】</router-link>
        </div>
        <searchs class='item-search' :search-items='searchItems' :item='item' :query-url='queryUrl'>
          <template slot='moreBtn'><el-button class='ml-20' type='primary' @click=''>导出Excel</el-button></template>
        </searchs>
        <div class='item-title'>
          订单加款列表
        </div>
        <div class="item-table">
            <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine">
              <el-table-column label="状态" prop="orderStatus" slot="defineCol">
                <template slot-scope="scope">
                      <el-button size="mini"
                        @click="showDialog(scope.row,3)" v-if="scope.row.orderStatus == 1">待复核</el-button>
                      <span v-if="scope.row.orderStatus == 2">已加款</span>
                      <span v-if="scope.row.orderStatus == 3">未通过</span>
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
import SettingDlg from "./modules/edit";
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
export default {
  name: "orderAddNewManage",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: "/6" + URL_JSON["queryOrderAddNewManage"],
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
          property: "startTime",
          colSpan: 4
        },
        {
          type: "date",
          placeholder: "结束时间",
          property: "endTime",
          colSpan: 4
        },
        {
          type: "select",
          property: "orderStatus",
          options: [
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
        { label: "申请时间", property: "orderDate" },
        { label: "客户名称", property: "merchantName" },
        { label: "联系电话", property: "orderPhone" },
        { label: "订单金额", property: "orderPhone" },
        { label: "已到账", property: "factAmt" },
        { label: "未到账金额", property: "factAmt" }
      ]
    };
  },
  methods: {
      /**
     * @param row 当前行数据
     * @param type 显示的视图是否可编辑 1:可编辑 9:只读
     * */
    showDialog(row, type) {
      this.queryDetail("/6" + URL_JSON["queryOrderAddNewDefaultDetail"], {
        orderId: row.orderId
      }).then(res => {
        if (res.code) {
          this.item = res.result;
          this.editState = type;
          console.log("type::", type);
          console.info("item:::",this.item);
        }
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
