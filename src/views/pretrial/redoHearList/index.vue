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
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine" >
        <!-- slot批次状态 -->
        <el-table-column label="批次状态"  slot="defineCol" width="100px">
            <template slot-scope="scope" >
              <span v-if="scope.row.reviewStatus == 0">初审中</span>
              <span v-else-if="scope.row.reviewStatus == 1">待审核</span>
              <span v-else-if="scope.row.reviewStatus == 2">审核完成</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
        <el-table-column label="复审完成时间"  slot="defineCol">
          <template slot-scope="scope" >
            {{scope.row.reviewFinishTime ? scope.row.reviewFinishTime : '--'}}
          </template>
        </el-table-column>
        <!-- ** -->
        <!-- slot操作 -->

        <el-table-column label="操作" slot="defineCol" width="140px">
            <template slot-scope="scope" >
              <customer-button
                size="mini"
                @click="gotoLargeTs(scope.row)" v-if="scope.row.reviewStatus == 0 || scope.row.reviewStatus == 2" >查看</customer-button>
                <customer-button
                size="mini"
                @click="gotoLargeTs(scope.row)" v-if="scope.row.reviewStatus == 1" >审核</customer-button>
                <span v-if="scope.row.reviewStatus == 3">预审完成</span>
                <!-- <customer-button
                size="mini"
                @click="gotoLargeTs(scope.row)" >审核</customer-button> -->
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
import {mapGetters} from 'vuex';
export default {
  name: "redoHearList",
  extends: Mixins,
  data() {
    return {
      item: {},
      queryUrl: /*  "/20" + */ URL_JSON["queryRedoHearList"],
      queryFirstPersonURL: URL_JSON["queryFPurl"], //初审人api-url
      tableData: [],
      firstPerson: [], //初审人<select>
      fpersonType: {
        type: "OPERATOR" //初审人类型
      },
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
          type: 'select',
          placeholder: '复审人',
          colSpan: 4,
          property: 'reviewUserId',
          options: [
          ],
          labelfield: 'reviewUserName',
          valuefield: 'reviewUserId'
        },
        {
          type: "select",
          placeholder: "批次状态",
          colSpan: 4,
          property: "reviewStatus",
          options: [
            {
              value: "0",
              label: "初审中"
            },
            {
              value: "1",
              label: "待审核"
            },
            {
              value: "2",
              label: "审核完成"
            },
          ]
        },
        {type: 'date',newline: true, placeholder: '复审开始时间', property: 'beginReviewFinishTime', colSpan: 4, lt: 'endReviewFinishTime'},
        {type: 'date',placeholder: '复审结束时间', property: 'endReviewFinishTime', colSpan: 4, gt: 'beginReviewFinishTime'},


      ],
      columnDefine: [
        {
          label: "互金企业",
          property: "clientName",
        },
        {
          label: "模版",
          property: "productName",
        },
        {
          label: "案件数量",
          property: "countCase",
        },
        {
          label: "子批次数",
          property: "countSubBatch",
        },
        {
          label: "初审人",
          property: "firstAuditName",
        },
        {
          label: '复审人',
          property: 'reviewUserName',
          defaultVal: '--'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['searchItem'])
  },
  watch:{
    total(val,oldval){
      console.log(val,123)
      this.pager.total = val;
    }
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

    getosh(row){
      this.$store.commit('setSearchItem',this.searchItem);
      this.$router.push({
        path: "/main/redoHearDetail",
        query: {
          batchN: row.batchNo,
          clientN: compileStr(row.clientName)
        }
      });
    },

    updateReviewUserName(batchNo) {
      return this.$http.post("/againAudit/updateReviewUserNameByBatchNo.htm", {batchNo: batchNo}).then(res => {
        return Promise.resolve(true);
      }).catch(() => {
        return Promise.reject(false);
      })
    },

    gotoLargeTs(row) {
      //大批次审核
      console.info("row::::", row);
      if(row.reviewStatus === 1 ) {
        if (!row.reviewUserName) {
          this.updateReviewUserName(row.batchNo).then(() => {
            this.getosh(row);
          })
        } else {
          if (JSON.parse(localStorage.getItem('loginInfo')).userName !== row.reviewUserName) {
            // this.updateReviewUserName(row.batchNo).then(() => {
            this.$msgbox({
              title: '提示',
              message: `是否将复审人由${row.reviewUserName}变更为${JSON.parse(localStorage.getItem('loginInfo')).userName}？`,
              center: true,
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              this.updateReviewUserName(row.batchNo).then(() => {
                this.getosh(row);
              })
            })
          }
          else {
            this.getosh(row);
          }
          // localStorage.setItem("redoHearSearchItem",JSON.stringify(this.searchItem));
        }
      }
    },
    queryAgainAuditUserList(){
      this.$http.post("/againAudit/queryAgainAuditUserList.htm").then(res => {
        let item = this.searchItems.find(it => it.property === 'reviewUserId');
        if(item){
          item.options = res.result;
        }
      })
    }
  },

  created() {
    this.queryAgainAuditUserList();
  },
  mounted() {
    this.queryFirstPerson(this.queryFirstPersonURL, this.fpersonType);

    setTimeout(() => {
      this.doQuery(this.queryUrl, this.searchItem);
    },500);
  },
  components: {
    Searchs,
    TableComponent
  },


};
</script>

<style scoped lang="scss">
</style>
