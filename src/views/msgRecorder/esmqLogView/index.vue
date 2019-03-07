<template>
  <div class="content">
    <div class="content">
      <div class="wsbodyhead">
        <a>所在位置</a>
        <router-link :to="$options.name" class="aside_tit">发送记录</router-link>
      </div>
      <searchs
        class="item-search"
        :search-items="searchItems"
        :item="searchItem"
        :query-url="queryUrl"
      >
        <template slot="moreBtn">
          <el-button class="ml-20" type="primary" @click="exportFileFoo">导出Excel</el-button>
        </template>
      </searchs>
      <div class="item-title">发送记录列表</div>
      <div class="item-table">
        <table-component
          :pager="pager"
          @refreshList="doQuery(this.queryUrl, this.searchItem)"
          :currentPage.sync="pager.currentPage"
          :total="pager.total"
          :pageSize="pager.pageSize"
          :table-data="tableData"
          :column-define="columnDefine"
        ></table-component>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "../../../components/script/url_json";
import exportFile from "@/assets/js/exportFile";
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "esmqLogView",
  mixins: [Mixins],
  data() {
    return {
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
      item: {},
      exportUrl: URL_JSON["exportEsmqLogView"],
      queryUrl: URL_JSON["queryEsmqLogView"], ///14/send/querySmsSendByBaseQuery.htm
      tableData: [{}],
      searchItem: {},
      searchItems: [
        {
          label: "短信类型",
          type: "select",
          colSpan: 3,
          property: "messageType",
          options: [
            {
              value: "",
              label: "请选择"
            },
            {
              value: "0",
              label: "其他"
            },
            {
              value: "1",
              label: "提交通知"
            },
            {
              value: "2",
              label: "应裁通知"
            },
            {
              value: "3",
              label: "组庭通知"
            },
            {
              value: "4",
              label: "裁决通知"
            },
            {
              value: "5",
              label: "验证码"
            },
            {
              value: "6",
              label: "生成账号"
            },
            {
              value: "7",
              label: "调解短信"
            },
            // ,8仲裁闪信，9调解闪信',
            {
              value: "8",
              label: "仲裁闪信"
            },
            {
              value: "9",
              label: "调解闪信"
            },
            {
              value: "11",
              label: "受理通知"
            }
          ]
        },
        {
          label: "发送日期",
          type: "date",
          placeholder: "开始日期",
          colSpan: 4,
          property: "beginSendTime"
        },
        {
          type: "date",
          placeholder: "结束日期",
          colSpan: 4,
          property: "endSendTime"
        },
        {
          type: "text",
          placeholder: "手机号、发送内容",
          colSpan: 4,
          property: "keyWords"
        }
      ],
      columnDefine: [
        {
          label: "案件编号",
          property: "caseNum"
        },
        {
          label: "申请人",
          property: "applicants"
        },
        {
          label: "被申请人",
          property: "respondents"
        },
        {
          label: "发送手机号",
          property: "sendPhone"
        },
        {
          label: "发送时间",
          property: "sendTime"
        },
        {
          label: "发送结果",
          property: "sendResult"
        },
        {
          label: "接收结果",
          property: "receiveResult"
        },
        {
          label: "短信类型",
          property: "messageType"
        },
        {
          label: "返回详情",
          property: "returnDetails"
        },
        {
          label: "短信内容",
          property: "messageContent"
        }
      ]
    };
  },
  methods: {
    doQuery(url, item) {
      this.query(url, item).then(res => {
        this.tableData = res.result.list;
        this.total = res.result.count;
      });
    },
    exportFileFoo() {
      exportFile({ url: this.exportUrl, data: this.searchItem });
    }
  },
  mounted() {
    this.doQuery(this.queryUrl, this.item);
  },
  components: {
    Searchs,
    TableComponent
  }
};
</script>

<style scoped lang="scss">
</style>
