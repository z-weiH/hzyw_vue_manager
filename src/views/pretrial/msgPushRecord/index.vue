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
            <div class="day">{{day}}</div>
            <div class="time_item">
              {{thatDay}}
            </div>
          </div>
          <div class="recordNum_box">
            <div class="num_card">
              <div>
                <span class="icon"></span>
              </div>
              <div>
                <h1></h1>
                <h2>推送总数</h2>
              </div>
            </div>
            <div class="num_card">
              <div>
                <span class="icon"></span>
              </div>
              <div>
                <h1></h1>
                <h2>重复推送</h2>
              </div>
            </div>
            <div class="num_card">
              <div>
                <span class="icon"></span>
              </div>
              <div>
                <h1></h1>
                <h2>整合失败</h2>
              </div>
            </div>
            <div class="num_card">
              <div>
                <span class="icon"></span>
              </div>
              <div>
                <h1></h1>
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
 */
export default {
  name: "msgPushRecord",
  mixins: [Mixins],
  data() {
    return {
      queryUrl: "/pushRecord/pushInfoByBaseQuery.htm",
      searchItem: {},
      day:'',
      thatDay:'',
      item: {},
      pager: {
        // 数据总数
        total: 11,
        // 当前页数
        currentPage: 1,
        // 每页数量
        pageSize: 10
      },
      tableData: [{}],
      columnDefine: [
        {
          label: "客户名称",
          property: "clientName",
          width: 130
        },
        {
          label: "推送总数",
          property: "pushCount"
        },
        {
          label: "重复推送",
          property: "repeatCount"
        },
        {
          label: "整合失败",
          property: "failCount"
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
    doQuery(url, item) {
      this.query_mock(url, item).then(res => {
        console.info(res);
        //  this.tableData = res.result.list;
        //   this.total = res.result.count;
      });
    }
  },
  created() {
    this.day = new Date().getDate();
    this.thatDay = this.$options.filters.TimeMomentChina(new Date());
  },
  mounted() {
    this.doQuery(this.queryUrl, this.searchItem);
  },
  components: {
    TableComponent
  }
};
</script>


<style lang='scss' scoped>
@import '@/assets/style/scss/helper/_mixin.scss';
$break-mid: 640px;
$break-large: 1264px;
$break-lg: 1904px;

%com_width {
  width: 728px;
}



.bot_line{
   overflow: hidden;
    @include clearfix;
  >div{
    float:left;
  }
}



.sc1{
  width: 50%;
}
.sc2{
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
.record_element_box{
  width: 200px;
  padding-left: 10px;
  .date_box{
    text-align: center;
    background-color: #fff;
    border:1px solid #dcdcdc;
    .day{
      font-size:68px;
      font-weight: 900;
      padding:48px 0;
      border-bottom:1px solid #dcdcdc;
      cursor: pointer;
    }
    .time_item{
      font-weight: bold;
      padding:20px 0;
      cursor: default;
    }
  }
  .num_card{
    padding:17px 29px;
    background-color: #fff;
    >div{
      display: table-cell;
      vertical-align: middle;
    }
    h1{

    }
    h2{
      font-size:15px;
      color:#a1a1a1;
    }
  }
}


@media (min-width: $break-mid) {
  .sc1{
  width: 68%;

  }
}
@media (min-width: $break-large) {
  .sc1{
  width: 80%;

  }
}

@media (min-width: $break-lg) {
  .sc1{
    width: 85%;
  }
}

</style>
