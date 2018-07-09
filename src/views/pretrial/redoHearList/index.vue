<template>
  <div class="content">
    <div class='wsbodyhead'>
      <a>所在位置</a>
      <router-link :to='$options.name' class='aside_tit'>案件复审</router-link>
    </div>
    <searchs class='item-search' :search-items='searchItems' :item='searchItem' :query-url='queryUrl'>
    </searchs>
    <div class='item-title'>
      案件列表
    </div>
    <div class='item-table'>
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine">
        <!-- slot批次状态 -->
        <el-table-column label="批次状态"  slot="defineCol" width="100px">
            <template slot-scope="scope" >
              <span v-if="scope.row.batchStatus == 0">初审中</span>
              <span v-else-if="scope.row.batchStatus == 1">待审核</span>
              <span v-else-if="scope.row.batchStatus == 2">审核完成</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
        <!-- ** -->
        <!-- slot操作 -->
        <el-table-column label="操作" slot="defineCol" width="140px">
            <template slot-scope="scope" >
              <el-button
                size="mini"
                @click="gotoLargeTs(scope.row)" v-if="scope.row.batchStatus == 0 || scope.row.batchStatus == 2" >查看</el-button>
                <el-button
                size="mini"
                @click="gotoLargeTs(scope.row)" v-if="scope.row.batchStatus == 1" >审核</el-button>
                <span v-if="scope.row.batchStatus == 3">预审完成</span>
                <!-- <el-button
                size="mini"
                @click="gotoLargeTs(scope.row)" >审核</el-button> -->
            </template>
          </el-table-column>
        <!-- ** -->

      </table-component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "../../../components/script/url_json";
import {compileStr,uncompileStr} from '@/assets/js/tool';
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "redoHearList",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: /*  "/20" + */ URL_JSON["queryRedoHearList"],
      queryFirstPersonURL: URL_JSON["queryFPurl"], //初审人api-url
      tableData: [{}],
      firstPerson: [], //初审人<select>
      fpersonType: {
        type: "OPERATOR" //初审人类型
      },
      searchItem: {},
      searchItems: [
        {
          type: "text",
          placeholder: "互金企业、产品名称、模板号",
          colSpan: 8,
          property: "keyWords",
        },
        {
          type: "select",
          placeholder: "初审人",
          colSpan: 4,
          property: "dispatcherId",
          options: [],
          labelfield: "userName",
          valuefield: "userId"
        },
        {
          type: "select",
          placeholder: "批次状态",
          colSpan: 4,
          property: "batchStatus",
          options: [
            {
              value: "1",
              label: "待初审"
            },
            {
              value: "2",
              label: "待复审"
            },
            {
              value: "3",
              label: "退回重审"
            },
            {
              value: "4",
              label: "预审通过"
            },
            {
              value: "5",
              label: "预审未通过"
            }
          ]
        }
      ],
      columnDefine: [
        {
          label: "互金企业",
          property: "clientName",
          width:150
        },
        {
          label: "模版",
          property: "productName",
          width:216
        },
        {
          label: "案件数量",
          property: "countCase",
          width:89
        },
        {
          label: "子批次数",
          property: "countSubBatch",
          width:92
        },
        {
          label: "初审人",
          property: "firstAuditName",
          width:120
        }
      ]
    };
  },
  methods: {
    queryFirstPerson(url, item) {
      this.query(url, item).then(res => {
        this.searchItems[1].options = res.result;
        console.log("rererer:::", res.result);
      });
    },
    doQuery(url, item) {
      this.query(url, item).then(res => {
        this.tableData = res.result.list;
        this.total = res.result.count;
      });
    },
    gotoLargeTs(row) {
      //大批次审核
      console.info("row::::", row);
      this.$router.push({
        path: "/main/redoHearDetail",
        query: {
          batchN: row.batchNo,
          clientN: compileStr(row.clientName)
        }
      });
    }
  },
  mounted() {
    this.queryFirstPerson(this.queryFirstPersonURL, this.fpersonType);

    setTimeout(() => {
      this.doQuery(this.queryUrl, this.item);
    },500);
  },
  components: {
    Searchs,
    TableComponent
  }
};
</script>

<style scoped lang="scss">
</style>
