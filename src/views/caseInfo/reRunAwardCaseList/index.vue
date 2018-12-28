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
        <el-button class="ml-20" type="primary" @click="handleExport">重跑</el-button>
      </template>
    </searchs>
    <div class="item-title">
      <div>案件列表 </div>
      <div class="stat_item">
        <div>
          <span>总数量：</span>
        </div>
        <div>
          <span>{{pager.count}}</span>
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
export default {
  name: "reRunAwardCaseList",
  mixins: [Mixins],
  data() {
    return {
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
      pager:{
        count:0,
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
            },
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
          valuefield: "prodCode",
          filterable: true
        },
        {
          label: "模版编码",
          type: "select",
          property: "templateCode",
          colSpan: 4,
          options: []
        },
      ],
      cacheclientCode: "", //缓存的企业code
      searchItem: {},
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
      queryUrl: '/award/queryAwardListByBaseQuery.htm',
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
          property: "caseNo",
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
          width: 100,
        },
        {
          label: "被申请人",
          property: "respondents",
          width: 100,
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
          property: "submitTime",
        }
      ]
    };
  },
  computed: {
    isDisabled() {
      return this.selection.length === 0;
    }
  },
  methods: {
    slectionChange(selection){
      // 选中当前行
      console.log(selection);
      this.selection = selection;
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
              // 缓存当前的->cache:cacheclientCode,方便别的方法调用
              this.cacheclientCode = item["value"];
              this.optsPduListView({ proName: item["value"] });
            }
            break;
          case "productCode":
            console.log("productCode: ", item["value"]);
            console.log("opProduct-", this.opProduct);

            if (item["value"] === "") {
              this.$set(this.searchItem, "templateCode", "");
              this.searchItems[6].options = [];
            } else {
              let $opPro = distinctArrObj(
                this.opProduct.filter(it => {
                  return it.productCode == item["value"];
                })
              );
              console.log("$opPro--", $opPro[0]["prodCode"]);
              this.optsTemplateCode({
                merchantCode: this.cacheclientCode,
                prodCode: $opPro[0]["prodCode"]
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
      this.query(url, item).then(res => {
        console.info('qqq',res);
        this.tableData = res.result.list;
        this.pager.count = res.result.count;
        // this.queryCount(item);
      });
    },
    queryCount(item) {
      // 案件列表-统计查询api
      this.$http.post(URL_JSON["queryCaseListCountItem"], item).then(res => {
        console.log("统计查询api", res);
        if (res.code === "0000") {
          this.countItem = res.result;
        }
      });
    },
    optsCompanyListView() {
      this.$http.post(URL_JSON["selectCompany"]).then(res => {
        console.log("selectCompany:::", res);

        this.searchItems[4].options = res.result;
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
    this.doQuery(this.queryUrl, this.searchItem);
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
        & + span {
          color: #555555;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
