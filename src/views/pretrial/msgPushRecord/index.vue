<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link :to="$options.name" class="aside_tit">推送记录</router-link>
    </div>

    <div class="bot_line">
      <div class="sc1">
        <div class="item-title">推送详情</div>
        <div class="item-table">
          <table-component
            v-loading="loading"
            :pager="pager"
            @refreshList="doQuery(this.queryUrl, this.searchItem)"
            :table-data="tableData"
            :column-define="columnDefine"
          ></table-component>
        </div>
      </div>
      <div class="sc2">
        <div class="record_element_box">
          <div class="date_box">
            <div class="block">
              <el-date-picker
                v-model="date_val"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="bigDateFoo"
                id="da"
              ></el-date-picker>
            </div>
            <div v-if="showCurDate">
              <label for="d" class="day">{{searchItem.day}}</label>
              <div class="time_item">{{searchItem.thatDay}}</div>
            </div>
            <label for="a" class="day picker" v-else>
              {{searchItem.startDate_exact}}
              <div>至</div>
              {{searchItem.endDate_exact}}
            </label>
          </div>
          <div class="recordNum_box">
            <div class="num_card">
              <div>
                <span class="icon ico_count"></span>
              </div>
              <div>
                <h1>{{resItem.pushNum}}</h1>
                <h2>推送总数</h2>
              </div>
            </div>
            <div class="num_card">
              <div>
                <span class="icon ico_push"></span>
              </div>
              <div>
                <h1>{{resItem.repeatNum}}</h1>
                <h2>重复推送</h2>
              </div>
            </div>
            <div class="num_card">
              <div>
                <span class="icon ico_err"></span>
              </div>
              <div>
                <h1>{{resItem.failNum}}</h1>
                <h2>整合失败</h2>
              </div>
            </div>
            <div class="num_card">
              <div>
                <span class="icon ico_happy"></span>
              </div>
              <div>
                <h1>{{resItem.clientCount}}</h1>
                <h2>活跃客户</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script type='text/ecmascript-6'>
import { URL_JSON } from "../../../components/script/url_json";
import exportFile from "@/assets/js/exportFile";
// import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";

/****
 *@param thatDay 当天-精确到时刻
 *@param day 天
 *@param tableData 列表数据
 *@param resItem 推送记录接口除列表外其他数据
 *@param date_val 日期原始对象
 *@param date_arr 日期-开始~结束 数组
 *@param showCurDate 显示当前时间ui的状态 默认:true
 *@param startDate 选中-开始时间
 *@param endDate 选择-结束时间
 */
export default {
  name: "msgPushRecord",
  mixins: [Mixins],
  data() {
    return {
      loading: true,
      queryUrl: "/pushRecord/pushInfoByBaseQuery.htm",
      searchItem: {
        startDate_exact: "",
        endDate_exact: "",
        startDate: "",
        endDate: "",
        day: "",
        thatDay: ""
      },
      showCurDate: true,
      date_val: "",
      date_arr: [],
      item: {},
      pager: {
        // 数据总数
        total: 11,
        // 当前页数
        currentPage: 1,
        // 每页数量
        pageSize: 10
      },
      resItem: {},
      tableData: [{}],
      columnDefine: [
        {
          label: "客户名称",
          property: "clientName",
          width: 180
        },
        {
          label: "推送总数",
          property: "pushCount",
          isLink: 1,
          linkShowPanel: it => {
            this.$router.push({
              path: "msgPushRecordDetail",
              query: {
                type: 1,
                clientCode: it.clientCode,
                clientName: it.clientName,
                endDate: this.searchItem.endDate,
                startDate: this.searchItem.startDate
              }
            });
          }
        },
        {
          label: "重复推送",
          property: "repeatCount",
          isLink: 1,
          linkShowPanel: it => {
            this.$router.push({
              path: "msgPushRecordDetail",
              query: {
                type: 2,
                clientCode: it.clientCode,
                clientName: it.clientName,
                endDate: this.searchItem.endDate,
                startDate: this.searchItem.startDate
              }
            });
          }
        },
        {
          label: "整合失败",
          property: "failCount",
          isLink: 1,
          linkShowPanel: it => {
            this.$router.push({
              path: "msgPushRecordDetail",
              query: {
                type: 3,
                clientCode: it.clientCode,
                clientName: it.clientName,
                endDate: this.searchItem.endDate,
                startDate: this.searchItem.startDate
              }
            });
          }
        },
        {
          label: "推送开始时间",
          property: "pushDate",
          width: 160
        }
      ]
    };
  },
  methods: {
    bigDateFoo(item) {
      // console.log('beforeItem',item)
      this.date_arr = item;
      console.log("this.date_arr", this.date_arr);
      if (this.date_arr === null) {
        // console.log('真');
        this.showCurDate = true;
        // this.searchItem.startDate = "";
        // this.searchItem.endDate = "";
        this.initQuery();
      } else {
        // console.log('假');
        this.updateTimeUiFoo(item);
      }
    },
    updateTimeUiFoo(item) {
      this.searchItem.startDate_exact = this.$options.filters.TimeYearMonthDay(
        item[0]
      );
      this.searchItem.startDate = item[0].Format("yyyy-MM-dd hh:mm:ss");
      // console.log('this.startDate',this.startDate);
      this.searchItem.endDate_exact = this.$options.filters.TimeYearMonthDay(
        item[1]
      );
      this.searchItem.endDate = item[1].Format("yyyy-MM-dd hh:mm:ss");
      // console.log('this.endDate',this.endDate)
      this.showCurDate = false;
      // 查询
      this.doQuery(this.queryUrl, this.searchItem);
    },
    doQuery(url, item) {
      this.loading = true;
      this.query(url, item).then(res => {
        //  this.tableData = res.result.list;
        //   this.total = res.result.count;
        this.loading = false;
        console.info("delete-11", delete res.result.list);
        console.info("item------------->-", res);
        this.queryPushInfo(item);
      });
    },
    queryPushInfo(item) {
      // 列表页面右边数据
      this.$http
        .post("/pushRecord/pushInfoList.htm", {
          startDate: item.startDate,
          endDate: item.endDate
        })
        .then(res => {
          this.resItem = res.result;
        });
    },
    initQuery() {
      this.searchItem.startDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
      this.searchItem.endDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
      console.log(this.searchItem.startDate);
      this.doQuery(this.queryUrl, this.searchItem);
    }
  },
  created() {
    this.searchItem.day = new Date().getDate();
    let _date = this.$options.filters.TimeMomentChina(new Date());
    let _start = _date.indexOf("月");
    this.searchItem.thatDay = _date.substring(0, _start + 1);
  },
  mounted() {
    this.initQuery()
  },
  components: {
    TableComponent
  }
};
</script>


<style lang='scss' scoped>
@import "@/assets/style/scss/helper/_mixin.scss";
@import "@/assets/style/scss/base/_media.scss";

$themeColor: #0f357f;

$break-small: 960px;
$break-mid: 1200px;
$break-large: 1264px;
$break-lg: 1904px;
$break-max: 1919px;

%com_width {
  width: 728px;
}

.bot_line {
  overflow: hidden;
  @include clearfix;
  > div {
    float: left;
  }
}

.sc1 {
  width: 87%;
}
.sc2 {
  min-width: 200px;
}

.item-title {
  // width: 72.88%;
  // width: 702px;
}
.item-table {
  // width: 728px;
  // width: 75%;
  overflow: hidden;
}
.record_element_box {
  width: 200px;
  padding-left: 10px;
  .date_box {
    text-align: center;
    background-color: #fff;
    border: 1px solid #dcdcdc;
    .block {
      position: absolute;
      z-index: -1;
      top: 0;
      // right: -99px;
    }
    .day {
      position: relative;
      z-index: 1;
      display: block;
      font-size: 68px;
      font-weight: 900;
      padding: 48px 0;
      border-bottom: 1px solid #dcdcdc;
      cursor: pointer;
      &:hover {
        background: $themeColor;
        color: #fff;
      }
      &.picker {
        font-size: 22px;
        > div {
          padding: 15px 0;
        }
      }
    }
    .time_item {
      font-weight: bold;
      padding: 20px 0;
      cursor: default;
    }
  }
  .recordNum_box {
  }
  .num_card {
    padding: 17px 29px;
    background-color: #fff;
    border: 1px solid #c3c3c3;
    margin: 15px 0;
    > div {
      display: table-cell;
      vertical-align: middle;
      & + div {
        line-height: 1.2;
      }
    }
    .icon {
      width: 36px;
      height: 36px;
      display: inline-block;
      margin-right: 10px;
    }
    .ico_count {
      background-image: url("~@/assets/img/card-01-zs.png");
    }
    .ico_push {
      background-image: url("~@/assets/img/card-02-cf.png");
    }
    .ico_err {
      background-image: url("~@/assets/img/card-03-sb.png");
    }
    .ico_happy {
      background-image: url("~@/assets/img/card-04-yh.png");
    }

    h1 {
    }
    h2 {
      font-size: 15px;
      color: #a1a1a1;
    }
  }
}

@media (max-width: $break-max) {
  .sc1 {
    width: 87%;
  }
}
@media (max-width: $break-lg) {
  .sc1 {
    width: 85%;
  }
}
@media (max-width: 1640px) {
  .sc1 {
    width: 83%;
  }
}
@media (max-width: 1476px) {
  .sc1 {
    width: 80%;
  }
}
@media (max-width: 1290px) {
  .sc1 {
    width: 78%;
  }
}
@media (max-width: $break-large) {
  .sc1 {
    width: 78%;
  }
}
@media (max-width: $break-mid) {
  .sc1 {
    width: 76%;
  }
}
@media (max-width: 1117px) {
  .sc1 {
    width: 74%;
  }
}
@media (max-width: 1057px) {
  .sc1 {
    width: 72%;
  }
}
@media (max-width: $break-small) {
  .sc1 {
    width: 70%;
  }
}
</style>
<style lang="scss">
body {
  .el-time-panel {
    &.el-popper {
      left: -27px;
    }
  }
}
</style>
