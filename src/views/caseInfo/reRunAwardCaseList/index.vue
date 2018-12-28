<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link :to="$options.name" class="aside_tit">重跑裁决书案件列表</router-link>
    </div>
    <searchs
      @valueChange="searchItemChange"
      class="item-search"
      :search-items="searchItems"
      :item="searchItem"
      :query-url="queryUrl"
    >
      <template slot="moreBtn">
        <el-button class="ml-20" type="primary" @click="reRunFoo" :disabled="isDisHashTable">重新获取裁决书</el-button>
      </template>
    </searchs>
    <div class="item-title">
      <div>
        <span class="it_titHead">案件列表</span>
      </div>
      <div class="stat_item">
        <div>
          <span>总数量：</span>
        </div>
        <div>
          <span>{{pager.count}}条</span>
          <el-button class="ml-20 history_btn" type="primary" @click="showHistoryList">历史记录</el-button>
        </div>
      </div>
    </div>
    <div class="item-table">
      <table-component
        :needCheckbox="true"
        :pager="pager"
        @refreshList="doQuery(this.queryUrl, this.searchItem)"
        :table-data="tableData"
        :column-define="columnDefine"
        @slectionChange="slectionChange"
        :actions="actions"
      ></table-component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "../../../components/script/url_json";
import exportFile from "@/assets/js/exportFile";
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
import { distinctArrObj } from "@/assets/js/tool";
import qs from "qs";
export default {
  name: "reRunAwardCaseList",
  mixins: [Mixins],
  data() {
    return {
      caseIds: [], //选择caseId数组
      selection: [],
      misShow: (() => {
        try {
          let userName = JSON.parse(localStorage.getItem("loginInfo")).userName;
          let arr = ["费玉琳", "金凤", "蒋慧芳", "超级管理员"];
          if (arr.indexOf(userName) !== -1) {
            return true;
          } else {
            return false;
          }
        } catch (err) {
          return false;
        }
      })(),
      pager: {
        count: 0
      },
      searchItems: [
        {
          label: "案件查询",
          type: "text",
          placeholder: "仲裁案号、申请人、被申请人",
          colSpan: 9,
          property: "keyWords"
        },
        {
          type: "select",
          colSpan: 4,
          property: "dateType",
          options: [
            {
              label: "提交日期",
              value: "1"
            }
          ]
        },
        {
          type: "date",
          colSpan: 4,
          placeholder: "开始日期",
          property: "startDate"
        },
        {
          type: "date",
          colSpan: 4,
          placeholder: "结束日期",
          property: "endDate"
        },
        {
          label: "互金企业",
          type: "select",
          property: "clientCode",
          colSpan: 4,
          newline: 1,
          options: this.opCompany,
          labelfield: "merchantName",
          valuefield: "code",
          filterable: true
        },
        {
          label: "产品名称",
          type: "select",
          property: "productCode",
          colSpan: 4,
          options: this.opProduct,
          labelfield: "prodName",
          valuefield: "prodName",
          filterable: true
        },
        {
          label: "模版编码",
          type: "select",
          property: "templateCode",
          colSpan: 4,
          options: []
        }
      ],
      cacheclientCode: "", //缓存的企业code
      searchItem: {
        clientCode: "",
        dateType: "",
        startDate: "",
        endDate: "",
        keyWords: "",
        productCode: "",
        templateCode: "",
        caseIds: []
      },
      countItem: {
        sumAmtBorrow: 0,
        caseCount: 0,
        sumPrepaymentAmt: 0,
        sumAcceptReturnAmt: 0,
        sumCaseTicket: 0
      }, //统计数量
      item: {},
      currentItem: {},
      exportUrl:
        /* "http://192.168.30.18:7777" + */ URL_JSON["exportCaseListView"],
      queryUrl: "/award/queryAwardListByBaseQuery.htm",
      // 数据总数
      total: 11,
      // 当前页数
      currentPage: 1,
      // 每页数量
      pageSize: 10,
      tableData: [],
      opCompany: [],
      opProduct: [],
      opHkCaseStage: [],
      opHkCaseStatus: [],
      columnDefine: [
        {
          label: "仲裁案号",
          property: "caseNoWz",
          width: 200
        },
        {
          label: "互金企业",
          property: "clientName",
          width: 100
        },
        {
          label: "申请人",
          property: "applicants",
          width: 100
        },
        {
          label: "被申请人",
          property: "respondents",
          width: 100
        },
        {
          label: "模版编码",
          property: "productId",
          width: 130
        },
        {
          label: "案件状态",
          property: "statusThreeWz",
          width: 100
        },
        {
          label: "提交日期",
          property: "submitTime"
        }
      ]
      // actions:[
      //   {
      //     label: "操作",
      //     btns: [{label: "查看详细内容", function: this.doShowDetail }]
      //   }
      // ]
    };
  },
  computed: {
    isDisabled() {
      return this.selection.length === 0;
    },
    isDisHashTable() {
      return this.tableData.length === 0;
    }
  },
  methods: {
    reRunFoo() {
      console.log("reRunFoo:caseIds:length:", this.searchItem.caseIds.length);
      console.log("重跑前-id数量：", this.searchItem.caseIds.length);
      console.log("-----------------,", this.searchItem);
      if (
        this.searchItem.caseIds.length > 0 &&
        this.searchItem.caseIds.length < 10
      ) {
        this.$confirm("是否重新获取选中行裁决书内容？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: "cancel",
          confirmButtonClass: "confirm",
          center: true
        })
          .then(res => {
            this.updateReRunAward();
          })
          .then(res => {})
          .catch(err => {});
      }
      if (
        (
        this.searchItem.clientCode != "" ||
        this.searchItem.dateType != "" ||
        this.searchItem.startDate != "" ||
        this.searchItem.endDate != "" ||
        this.searchItem.keyWords != "" ||
        this.searchItem.productCode != "" ||
        this.searchItem.templateCode != "")
      ) {
        this.$confirm("是否重新获取裁决书内容？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: "cancel",
          confirmButtonClass: "confirm",
          center: true
        })
          .then(res => {
            // 重跑选中记录
            console.log("reRunFoo:", this.searchItem);
            this.updateReRunAward();
            this.searchItem.caseIds = this.searchItem.caseIds;
            console.log(this.searchItem);
          })
          .then(res => {})
          .catch(err => {});
      }else{
        this.$message.warning("至少填写一个搜索条件再进行重跑！");
      }
    },
    updateReRunAward() {
      if (this.searchItem.caseIds.length == 0) {
      }
      // 重跑裁决书api
      this.$http
        .post("/award/overload.htm", this.searchItem)
        .then(res => {
          this.$message.success("重新获取成功");
          this.searchItem = {}; //清空搜索条件
          this.tableData = []; //清空table-list
        })
        .catch(err => {
          console.log("err:", err);
        });
    },
    showHistoryList() {
      // 重跑裁决书历史记录列表
      this.$router.push("reRunAwardHistory");
    },
    slectionChange(selection) {
      // 选中当前行
      this.searchItem.caseIds = []; //先清空

      console.log("选中当前行:", selection);
      this.selection = selection;
      if (selection.length > 1) {
        selection.map(v => {
          this.searchItem.caseIds.push(v.caseId);
        });
      } else if (selection.length == 1) {
        console.log("222222222222222", selection.length);
        this.searchItem.caseIds.push(selection[0].caseId);
      }

      console.log("this.caseIds", this.searchItem.caseIds);
    },
    //跳转法务预审
    gotoPretrial(row) {
      let routeData = this.$router.resolve({
        path: "/caseDetail",
        query: { caseId: row.caseId }
      });
      window.open(routeData.href, "_blank");
    },

    handleExport() {
      console.info("searchItem:::", this.searchItem);
      let _token = JSON.parse(localStorage.getItem("loginInfo")).token;
      this.searchItem.token = _token;
      exportFile({
        url: this.exportUrl,
        data: this.searchItem
      });
    },
    searchItemChange(item) {
      console.log("parent valuechange init");
      for (var i in item) {
        switch (item[i]) {
          case "clientCode":
            console.log(item["value"]);
            if (item["value"] === "") {
              this.$set(this.searchItem, "productCode", "");
              this.$set(this.searchItem, "templateCode", "");
              this.searchItems[5].options = [];
            } else {
              console.log("-------------------", item);
              // 缓存当前的->cache:cacheclientCode,方便别的方法调用
              this.cacheclientCode = item["value"];
              this.optsPduListView({ merchantCode: item["value"] });
            }
            break;
          case "productCode":
            console.log("productCode: ", item["value"]);

            if (item["value"] === "") {
              this.$set(this.searchItem, "templateCode", "");
              this.searchItems[6].options = [];
            } else {
              console.log(123);
              // let $opPro = distinctArrObj(
              //   this.opProduct.filter(it => {
              //     return it.productCode == item["value"];
              //   })
              // );
              // console.log("$opPro--", $opPro[0]["prodCode"]);
              this.optsTemplateCode({
                merchantCode: this.cacheclientCode,
                prodCode: this.opProduct.find(it => it.prodName === item.value)
                  .prodCode
              });
            }
            break;
          case "caseProcess":
            this.optsHkCaseStatusView({ status: item["value"] });
            break;
          case "operType":
            this.optsObjListView({ operType: item["value"] });
            break;
          default:
            break;
        }
      }
    },
    doQuery(url, item) {
      if (
        this.searchItem.clientCode != "" ||
        this.searchItem.dateType != "" ||
        this.searchItem.startDate != "" ||
        this.searchItem.endDate != "" ||
        this.searchItem.keyWords != "" ||
        this.searchItem.productCode != "" ||
        this.searchItem.templateCode != ""
      ) {
        this.query(url, item).then(res => {
          console.info("qqq", res);
          this.tableData = res.result.list;
          this.pager.count = res.result.count;
          // res.result.list.map(v => {
          //   this.searchItem.caseIds.push(v.caseId);
          // });
        });
      } else {
        this.$message.warning("至少填写一个搜索条件进行查询！");
      }
    },
    optsCompanyListView() {
      // URL_JSON["selectCompany"]
      this.$http.post("/merchant/queryMerchants.htm").then(res => {
        console.log("selectCompany:::", res);

        // this.searchItems[4].options = res.result;
        this.searchItems[4].options = res.result.list;
        // console.log('list:',res.result);
      });
    },
    optsPduListView(params) {
      this.searchItems[5].options = [];
      this.$http.post(URL_JSON["selectProduct"], params).then(res => {
        // console.log('selectProduct:::',res);
        this.searchItems[5].options = res.result;
        this.opProduct = res.result;
        this.$set(this.searchItem, "productCode", "");
      });
    },
    optsTemplateCode(params) {
      this.$http.post(URL_JSON["selectTemplateItem"], params).then(res => {
        this.searchItems[6].options = [];
        res.result.forEach(el => {
          this.searchItems[6].options.push({ label: el, value: el });
        });
      });
    },
    optsHkCaseStageView() {
      this.$http.post(URL_JSON["selectHkCaseStage"]).then(res => {
        // console.log('selectHkCaseStage:::',res);

        this.searchItems[8].options = res.result.list;
      });
    },
    optsHkCaseStatusView(params) {
      this.$http.post(URL_JSON["selectHkCaseStatus"], params).then(res => {
        console.warn("\n", res.result.list);

        this.searchItems[9].options = res.result.list;
        setTimeout(() => {
          // this.searchItem.statusThree = '';
          this.$set(this.searchItem, "statusThree", "");
          console.log(this.searchItem);
        }, 300);
      });
    }
  },
  created() {
    this.optsCompanyListView(); //互金企业
    // this.optsPduListView() //产品名称
    // this.optsHkCaseStageView(); //还款案件阶段
    // this.optsHkCaseStatusView(); //还款案件状态
  },
  mounted() {
    // this.doQuery(this.queryUrl, this.searchItem);
  },
  components: {
    Searchs,
    TableComponent
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
.item-title {
  // position: relative;
  @include clearfix;
  > div {
    &:first-child {
      float: left;
    }
    & + div {
      float: right;
    }
  }
}
.history_btn {
}
.stat_item {
  font-size: 14px;
  // position: absolute;
  // height: 12px;
  // margin:auto;
  // bottom: 0;
  // top: 0;
  // right: 20px;
  > div {
    display: table-cell;
  }
  ul {
    @include clearfix;
    li {
      float: left;
      span {
        margin-right: 5px;
        vertical-align: middle;
        & + span {
          color: #555555;
          font-weight: bold;
          vertical-align: middle;
        }
      }
    }
  }
}
.it_titHead {
  position: relative;
  top: 9px;
}
</style>
