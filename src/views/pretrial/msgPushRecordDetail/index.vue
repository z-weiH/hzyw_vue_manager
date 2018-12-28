<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link to="msgPushRecord" class="aside_tit">推送记录</router-link>
      <router-link :to="$options.name" class="aside_tit">案件列表</router-link>
    </div>
    <div class="company_banner">
      <div class="company_text">
        <div>{{searchItem.clientName}}</div>
        <div>
          <span>{{titleItems.dateTime}}</span>
          <!-- <span>{{searchItem.startDate}}</span>
          <span>至</span>
          <span>{{searchItem.endDate}}</span>-->
        </div>
      </div>
      <div class="company_counts">
        <template v-for="(it,index) in tabItems">
          <div :class="['tabox',activeFoo(it,index)]" @click="tabSelect(it,index)">
            <div>{{it.count}}</div>
            <div>{{it.tname}}</div>
          </div>
        </template>
      </div>
    </div>
    <!-- <searchs
      @valueChange="searchItemChange"
      class="item-search"
      :search-items="searchItems"
      :item="searchItem"
      :query-url="queryUrl"
    >
      <template slot="moreBtn"></template>
    </searchs>-->
    <template v-if="contentIdx == 1">
      <div class="item-title table">
        <div>案件列表</div>
        <div>
          <ul class="count_item">
            <template v-for="(it,index) in titleItems.productList">
              <li>
                <span>{{it.productName}}：</span>
                <span>{{it.pushNum}};</span>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="item-table">
        <table-component
          v-loading="loading"
          :pager="pager"
          @refreshList="doQuery(this.queryUrl, this.searchItem)"
          :table-data="tableData"
          :column-define="columnDefine"
        ></table-component>
      </div>
    </template>
    <template v-if="contentIdx == 2">
      <div class="item-title">案件列表</div>
      <div class="item-table">
        <table-component
          v-loading="loading"
          :pager="pager"
          @refreshList="doQuery(this.queryUrl, this.searchItem)"
          :table-data="tableData"
          :column-define="columnDefine1"
          :actions="actions1"
        ></table-component>
      </div>
    </template>
    <template v-if="contentIdx == 3">
      <div class="item-title table">
        <div>案件列表</div>
        <div>
          <div class="resetSettle_div">
            <el-button type="primary" @click="resetSettle">重新整合</el-button>
          </div>

          <el-button type="primary" @click="expfileBtn">导出</el-button>
        </div>
      </div>
      <div class="item-table">
        <table-component
          v-loading="loading"
          :pager="pager"
          @refreshList="doQuery(this.queryUrl, this.searchItem)"
          :table-data="tableData"
          :column-define="columnDefine2"
        ></table-component>
      </div>
    </template>

    <el-dialog class="push_dialog" title="本案推送记录" :visible.sync="showType" width="50%" center>
      <div class="list_table">
        <div class="list_head">
          <div class="cell">推送时间</div>
          <div class="cell">最终状态</div>
        </div>
        <div class="list_body">
          <template v-for="(it,index) in recordList">
            <div class="cell">{{it.pushTime}}</div>
            <div class="cell">{{it.orderStatus}}</div>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showType=0">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script type='text/ecmascript-6'>
import { URL_JSON } from "@/components/script/url_json";
import exportFile from "@/assets/js/exportFile";
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";

/****
 *@param tabItems 选项卡按钮组
 *@param contentIdx 内容下标
 *@param columnDefine 推送总数-字段数组
 *@param columnDefine1 重复推送-字段数组
 *@param columnDefine2 整合失败-字段数组
 *@param recordList 本案推送记录
 *@param {object} titleItems 标题详情内容
 */
export default {
  name: "msgPushRecordDetail",
  mixins: [Mixins],
  components: {
    Searchs,
    TableComponent
  },
  data() {
    return {
      loading: true,
      queryUrl: "/pushRecord/pushCountInfo.htm",
      contentIdx: 1,
      showType: 0,
      recordList: [],
      searchItem: {
        clientName: "",
        clientCode: "",
        startDate: "",
        endDate: "",
        type: -1
      },
      item: {},
      tabItems: [
        {
          tname: "推送总数",
          type: 1,
          count: 0,
          active: true,
          key: "pushCount"
        },
        {
          tname: "重复推送",
          type: 2,
          count: 0,
          active: false,
          key: "repeatNum"
        },
        {
          tname: "整合失败",
          type: 3,
          count: 0,
          active: false,
          key: "failNum"
        }
      ],
      // pager: {
      //   // 数据总数
      //   total: 11,
      //   // 当前页数
      //   currentPage: 1,
      //   // 每页数量
      //   pageSize: 10
      // },
      tableData: [{}],
      titleItems: {},
      searchItems: [
        {
          label: "",
          type: "text",
          placeholder: "",
          colSpan: null,
          property: ""
        }
      ],
      columnDefine: [
        {
          label: "产品模版",
          property: "productTemplate",
          width: 160
        },
        {
          label: "借款单号",
          property: "loanBillNo",
          width: 166
        },
        {
          label: "被申请人姓名",
          property: "respondents",
          width:180,
        },
        {
          label: "推送时间",
          property: "pushTime",
        }
      ],
      columnDefine1: [
        {
          label: "产品模版",
          property: "productTemplate",
          width: 160
        },
        {
          label: "借款单号",
          property: "loanBillNo",
          width: 166
        },
        {
          label: "被申请人姓名",
          property: "respondents"
        },
        {
          label: "推送时间",
          property: "pushTime",
        }
      ],
      actions1: [
        {
          label: "操作",
          btns: [{ label: "查看本案推送记录", function: this.doViewCaseRecord }]
        }
      ],
      columnDefine2: [
        {
          label: "产品模版",
          property: "productTemplate",
          width: 140
        },
        {
          label: "借款单号",
          property: "loanBillNo",
          width: 166
        },
        {
          label: "被申请人姓名",
          property: "respondents",
          width:180,
        },
        {
          label: "推送时间",
          property: "pushTime",
        },
        {
          label: "整合失败原因",
          property: "failReason"
        }
      ]
    };
  },
  watch: {
    $route(to, from) {
      console.log(`变化了${new Date().getTime()}`, to.path);
      this.tableData = [{}];
      let _typeVal = this.$getUrlParam("type", location.hash);
      this.contentIdx = _typeVal;
      this.searchItem.type = _typeVal;
      console.log("this.searchItem.type", this.searchItem.type);
      this.doQuery(this.queryUrl, this.searchItem);
    }
  },
  methods: {
    getParams() {
      this.searchItem.clientName = this.$route.query.clientName;
      this.searchItem.clientCode = this.$route.query.clientCode;
      this.searchItem.startDate = this.$route.query.startDate;
      this.searchItem.endDate = this.$route.query.endDate;
      this.searchItem.type = this.$route.query.type;
      console.log("刷新：this.searchItem.type", this.searchItem.type);
      this.contentIdx = this.searchItem.type;
    },
    activeFoo(it, index) {
      // return it.active === true ? "active" : false;
      return it.type == this.searchItem.type ? "active" : false;
    },
    tabSelect(it, index) {
      this.tabItems.map(v => {
        return (v.active = false);
      });
      it.active = true;
      // table显示不同内容需要同步状态
      this.contentIdx = it.type;
      // 上一个页面传递过来的type也要同步更新
      this.searchItem.type = it.type;
      // url-hash需要同步切换type参数值
      location.hash = location.hash.replace(
        /([?&]type)=[^?&]+/,
        `$1=${it.type}`
      );
    },
    updateAllset(){
      // 批量整合
      this.$http
        .post("/pushRecord/reintegration.htm", {
          clientCode: this.searchItem.clientCode,
          startDate: this.searchItem.startDate,
          endDate: this.searchItem.endDate
        })
        .then(res => {
          if (res.code === "0000") {
            this.$message({
              message: "已成功提交整合，请稍后查看返回结果.",
              type: "success"
            });
          }
        });
    },
    resetSettle() {
      // 提示dialog
      this.$confirm("确认对列表中的案件进行重新整合？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel",
        confirmButtonClass: "confirm",
        center: true
      }).then(()=>{
        this.updateAllset()
      },()=>{
        console.log('已取消')
      }).catch(()=>{

      });


    },
    expfileBtn() {
      exportFile({ url: "/pushRecord/pushExport.htm", data: this.searchItem });
    },
    doQuery(url, item) {
      this.loading = true;
      this.query(url, item).then(res => {
        this.loading = false;
        console.info(res);
        //  this.tableData = res.result.list;
        //   this.total = res.result.count;
        console.log("item.type", item.type);
        console.log("contentIdx--", this.contentIdx);
        // return item.type === 1 ?
        this.queryTitleItems(item);
        // : this.queryTitCounts(item);
      });
    },
    queryTitleItems(item) {
      // 推送情况数量查询
      // 数量详情标题上面的简要数据
      this.$http
        .post("/pushRecord/queryPushDetailsByClientCode.htm", {
          clientCode: item.clientCode,
          startDate: item.startDate,
          endDate: item.endDate
        })
        .then(res => {
          console.log(res.result);
          this.titleItems = res.result;
          this.tabItems.map(v => {
            for (let i in res.result) {
              if (v.key === i) {
                v.count = res.result[i];
                console.log("---", v);
              }
            }
          });
        });
    },
    doViewCaseRecord(it) {
      // 查看本案推送记录
      console.log(it);
      this.showType = 1;
      this.$http
        .post("/pushRecord/viewPushRecord.htm", { caseOrderId: it.caseOrderId })
        .then(res => {
          this.recordList = res.data.result;
        });
    }
  },
  created() {},
  mounted() {
    this.getParams();
    this.doQuery(this.queryUrl, this.searchItem);
  }
};
</script>


<style lang='scss' scoped>
@import "@/assets/style/scss/helper/_mixin.scss";

$themeColor: #0f357f;
$panelColor: #eef3ff;
$borderColor: #ebeef5;

.company_banner {
  display: table;
  width: 100%;
  background-color: $panelColor;
  border: 1px solid $borderColor;
  margin-bottom: 10px;
  > div {
    display: table-cell;
    vertical-align: middle;
    padding: 18px 0;
  }
  .company_text {
    width: auto;
    padding-left: 20px;
    line-height: 2;
    > div {
      &:first-child {
        font-size: 18px;
        font-weight: 800;
        color: #000;
      }
      font-size: 14px;
      color: #a1a1ab;
    }
  }
  .company_counts {
    width: 60%;
    // @include clearfix;
    padding-right: 20px;
    text-align: right;
    .tabox {
      // float:left;
      cursor: pointer;
      display: inline-block;
      margin-right: 10px;
      color: $themeColor;
      background-color: #fff;
      border: 1px solid #dcdcdc;
      text-align: center;
      // height: 68px;
      // line-height: 68px;
      padding: 30px 10px 5px 10px;
      &.active {
        background-color: $themeColor;
        color: #fff;
      }
      > div {
        &:first-child {
          padding-bottom: 10px;
          font-weight: 800;
        }
      }
    }
  }
}

.list_table {
  .list_head,
  .list_body {
    display: table;
    width: 100%;
    text-align: center;
    > div {
      display: table-cell;
      vertical-align: middle;
    }
  }
  .list_head {
    border-bottom: 1px solid #666;
  }
  .list_body {
  }
  .cell {
    width: 200px;
  }
}

.count_item {
  @include clearfix;
  li {
    float: left;
    font-size: 14px;
    color: $themeColor;
    font-weight: 800;
    span {
      &:first-child {
        font-size: 16px;
        color: #686868;
      }
    }
  }
}

.item-title {
  &.table {
    display: table;
    width: 98%;
    > div {
      display: table-cell;
      vertical-align: middle;
      &:first-child {
        width: 30%;
      }
      & + div {
        width: auto;
        text-align: right;
        ul {
          display: inline-block;
        }
      }
    }
    ul {
      li {
        margin-right: 10px;
      }
    }
  }
}

.resetSettle_div {
  display: inline;
}
</style>

