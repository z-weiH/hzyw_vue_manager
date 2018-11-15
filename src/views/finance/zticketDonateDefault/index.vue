<template>
<div class="content">
        <div class='wsbodyhead'>
         <a>所在位置</a>
         <router-link :to='$options.name' class='aside_tit'>仲券赠送【销售主管初审】</router-link>
        </div>
        <searchs class='item-search' :search-items='searchItems' :item='searchItem' :query-url='queryUrl'>
        </searchs>
        <div class='item-title'>
            仲券赠送列表
        </div>
        <div class='item-table'>
           <table-component  :pager="pager" :table-data="tableData"  :column-define="columnDefine">
             <el-table-column :resizable="false" label="状态" prop="ticketStatus" slot="defineCol">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="showDialog(scope.row,2)" v-if="scope.row.ticketStatus == 1">待审核</el-button>
                      <span v-if="scope.row.ticketStatus == 2">待复核</span>
                      <span v-if="scope.row.ticketStatus == 3">通过</span>
                      <span v-if="scope.row.ticketStatus == 4">未通过</span>
                    </template>
                </el-table-column>
           </table-component>
        </div>
        <setting-dlg ref="settingDlg" @refresh="refresh" :edit-state="editState"  :companyList="companyList"></setting-dlg>
</div>
</template>
<script type="text/ecmascript-6">
import { URL_JSON } from "../../../components/script/url_json";
import Searchs from "@/components/searchs";
import SettingDlg from "./modules/edit";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "zticketDonateDefault",
  extends: Mixins,
  data() {
    return {
      item: {},
      merchantCode: "",
      queryUrl: URL_JSON["queryZticketTopheadList"],
      tableData: [{}],
      companyList:[],
      searchItem: {},
      searchItems: [
        {
          type: "text",
          placeholder: "请输入企业名称、企业邮箱（账户）",
          colSpan: 7,
          property: "keyWords"
        },
        {
          type: "date",
          placeholder: "开始日期",
          colSpan: 4,
          property: "startDate"
        },
        {
          type: "date",
          placeholder: "结束日期",
          colSpan: 4,
          property: "endDate"
        },
        {
          type: "select",
          placeholder: "请选择仲券赠送状态",
          colSpan: 3,
          property: "ticketStatus",
          options: [
            {
              label: "待提交",
              value: "0"
            },
            {
              label: "待审核",
              value: "1"
            },
            {
              label: "待复核",
              value: "2"
            },
            {
              label: "通过",
              value: "3"
            },
            {
              label: "未通过",
              value: "4"
            }
          ]
        }
      ],
      columnDefine: [
        {
          label: "企业名称",
          property: "merchantName",
          isLink: 1,
          linkShowPanel: row => {
            this.queryDetail(URL_JSON["queryZticketZgDetail"], { ticketId: row.ticketId }).then(
              res => {
                if (res.code == "0000") {
                  this.item = res.result;
                  this.$refs.settingDlg.item = res.result;
                  this.$refs.settingDlg.item.resultId = row.resultId;
                  console.info('dedededed:::',this.item);
                  this.$refs.settingDlg.item.managerStatus == 3 ? this.$refs.settingDlg.item.managerStatusCn = "通过" : this.$refs.settingDlg.item.managerStatusCn = "不通过";
          this.$refs.settingDlg.item.ceoStatus == 3 ? this.$refs.settingDlg.item.ceoStatusCn = "通过" : this.$refs.settingDlg.item.ceoStatusCn = "不通过";
                  this.editState = 9;

                }
              }
            );
          },
        },
        {
          label: "企业邮箱（账户）",
          property: "loginName",
        },
        {
          label: "企业累计充值（元）",
          property: "totalRecharge",
        },
        {
          label: "累计赠送（张）",
          property: "totalGift",
        },
        {
          label: "本次赠送（张）",
          property: "ticketGift",
        },
        {
          label: "申请时间",
          property: "submitTime",
        }
      ]
    };
  },
  methods: {
    queryCompany(){
      this.queryDetail(URL_JSON["queryZticketCompany"]).then(res => {
        if (res.code) {
          console.log("apply::", res);
          this.companyList = res.result.list;
          this.$refs.settingDlg.item = {};
        }
      });
    },
    /**
     * @param row 当前行数据
     * @param type 显示的视图是否可编辑 1:可编辑 9:只读 2, 3 z
     * */
    showDialog(row, type) {
      this.queryDetail(URL_JSON["queryZticketDonateGeneralDetail"], {
        ticketId: row.ticketId
      }).then(res => {
        if (res.code) {
          // this.applyZticketView();
          this.editState = type;
          this.$refs.settingDlg.item = res.result;
          this.$refs.settingDlg.item.resultId = row.resultId;
          console.info('show:::::',this.item);
          console.log("type::", type);
          console.info("res::", res);
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
    TableComponent,
    SettingDlg
  }
};
</script>
<style scoped lang="scss">
</style>
