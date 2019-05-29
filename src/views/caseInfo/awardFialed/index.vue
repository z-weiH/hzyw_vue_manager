<template>
    <div class="awardFialed">
      <div class="wsbodyhead">
        <a>所在位置</a>
        <router-link :to="$options.name" class="aside_tit">裁决书生成失败</router-link>
      </div>

      <searchs @valueChange="searchItemChange" class="item-search" :search-items="searchItems" :item="item" :query-url="queryUrl">
        <template slot="moreBtn">
          <el-button class="ml-20" type="primary" @click="handleExport">导出Excel</el-button>
        </template>
      </searchs>

      <div class="item-title">
        案件列表
      </div>
      <div class="item-table">
        <el-table
          :data="tableData"
          border
        >
          <el-table-column prop="date" label="序号" width="50px">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="clientName" label="所属客户" align="center"></el-table-column>
          <el-table-column prop="caseNoWz" label="案号" align="center"></el-table-column>
          <el-table-column prop="loanBillNo" label="借款单号" align="center"></el-table-column>
          <el-table-column prop="applicants" label="申请人" align="center"></el-table-column>
          <el-table-column prop="respondents" label="被申请人" align="center"></el-table-column>
          <el-table-column prop="resPhone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="resPhone" label="操作" align="center">
            <template slot-scope="scope">
              <customer-button type="text" @click="reRun(scope.row)">重跑裁决书</customer-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" style="background: #fff;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pager.currentNum"
          :page-sizes="[10,20,30,40]"
          :page-size="pager.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pager.total">
        </el-pagination>
      </div>

    </div>

</template>

<script>
import Searchs from '@/components/searchs'
import exportFile from "@/assets/js/exportFile";
export default {
  name: 'awardFialed',
  components: {
    Searchs
  },
  data () {
    return {
      searchItems: [
        {
          type: 'text',
          property: 'keyWords',
          placeholder: '所属客户、案号、借款单号、申请人、被申请人、手机号',
          colSpan: 12,
        },
        {
          type: 'select',
          property: 'clientCode',
          placeholder:'所属客户',
          colSpan: 4,
          labelfield: 'clientName',
          valuefield: 'clientCode',
          filterable: true,
          options: [

          ]
        }
      ],
      tableData: [],
      item: {},
      queryUrl: '/case/queryHearStatusCase.htm',
      pager: {
        pageSize: 10,
        currentNum: 1,
        total: 0
      }
    }
  },

  methods: {
    queryCompany () {
      this.$http.post('/case/queryCaseClientNameByCaseInfo.htm').then(res => {
        let obj = this.searchItems.find(it => it.property === 'clientCode');

        obj && (obj.options = res.result);
      })
    },

    handleExport() {
      exportFile({
        url : '/case/exportHearStatusCase.htm',
        data : {
          clientCode : this.item.clientCode,
          keyWords : this.item.keyWords,
        },
      });
    },

    doQuery (url, item) {
      this.$http({
        method: 'get',
        url: url,
        params: {...item, ...this.pager}
      }).then(res => {
        console.log(res);
        this.tableData = res.result.list;
        this.pager.total = res.result.count;
      })
    },
    handleSizeChange(val){
      this.pager.currentNum = 1;
      this.pager.pageSize = val;
      this.doQuery(this.queryUrl, this.item);
    },

    handleCurrentChange(val){
      this.pager.currentNum = val;
      this.doQuery(this.queryUrl, this.item);
    },

    reRun(row) {
      this.$confirm("是否重跑裁决书？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel",
        confirmButtonClass: "confirm",
        center: true
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: '处理中，请稍后',
        });
        this.$http({
          method : 'post',
          url : '/award/overload.htm',
          data : {
            clientCode: row.clientCode,
            caseIds : [row.caseId]
          },
        }).then(() => {
          loading.close();
          this.$message.success('操作成功');
        }).catch(() => {
          loading.close();
        });
      }).catch(() => {
      });
    }
  },

  created() {
    this.queryCompany();
    this.doQuery(this.queryUrl, this.item);
  }
}
</script>

<style scoped>

</style>
