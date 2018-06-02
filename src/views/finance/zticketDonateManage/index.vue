<template>
<div class="content">
        <div class='wsbodyhead'>
         <a>所在位置</a>
         <router-link :to='$options.name' class='aside_tit'>仲券赠送【销售申请】</router-link>
        </div>
        <searchs class='item-search' :search-items='searchItems' :item='searchItem' :query-url='queryUrl'>
        </searchs>
        <div class='item-title'>
          仲券赠送列表
        </div>
        <div class='item-table'>
           <table-component  :pager="pager"  :table-data="tableData"  :column-define="columnDefine" >
                <el-table-column :resizable="false" label="状态" prop="ticketStatus" slot="defineCol">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="showDialog(scope.row,1)" v-if="scope.row.ticketStatus == 2">待复核</el-button>
                      <span v-if="scope.row.ticketStatus == 3">通过</span>
                      <span v-if="scope.row.ticketStatus == 4">未通过</span>
                    </template>
                </el-table-column>
           </table-component>
        </div>
        <setting-dlg @refresh="refresh" ref="settingDlg" :edit-state="editState"  ></setting-dlg>
</div>
</template>
<script type="text/ecmascript-6">
import { URL_JSON } from "../../../components/script/url_json";
import Searchs from "@/components/searchs";
import SettingDlg from "./modules/edit";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "zticketDonateGeneral",
  extends: Mixins,
  data() {
    return {
      item:{},
      merchantCode: '',
      queryUrl: URL_JSON["queryZticketDonateManage"],
      tableData: [{}],
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
          colSpan: 4,
          property: "ticketStatus",
          options: [
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
          isLink: true, linkShowPanel: this.showDialog
        },
        {
          label: "企业邮箱（账户）",
          property: "loginName"
        },
        {
          label: "企业累计充值（元）",
          property: "totalRecharge"
        },
        {
          label: "累计赠送（张）",
          property: "totalGift"
        },
        {
          label: "申请时间",
          property: "submitTime"
        }
      ]
    };
  },
  methods: {
    FullListQuery(){
      this.doQuery(this.queryUrl, this.item);
    },
    /**
     * @param row 当前行数据
     * @param type 显示的视图是否可编辑 1:可编辑 9:只读
     * */
    showDialog(row, type) {
      if(!type)
        type = 9;
      this.queryDetail(URL_JSON["editZticketDonateManage"], {
        ticketId: row.ticketId
      }).then(res => {
        if (res.code === '0000') {
          this.$refs.settingDlg.item = res.result;
          this.$refs.settingDlg.item.resultId = row.resultId;
          this.editState = type;
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
