<template>
<div class="exeRecord">
  <div class='wsbodyhead'>
    <a >所在位置</a>
    <a class="aside_tit">规则库管理 </a>
    <router-link :to='$options.name' class='aside_tit'>执行记录</router-link>
  </div>

  <el-form :inline="true" class="searchs item-search" >

    <el-form-item style="margin-bottom: 0;" label="">
      <el-input style="width: 230px;" v-model="searchItem.keyWords" placeholder="请输入产品模板"></el-input>
    </el-form-item>
    <timeFrame
      :startDate.sync="searchItem.pushStartDate"
      :endDate.sync="searchItem.pushEndDate"
      startPlaceholder="执行开始日期"
      endPlaceholder="执行结束日期"
      :nomargin="true"
    >
    </timeFrame>
    <el-button type="primary" class="fr">查询</el-button>

  </el-form>
  <div class="item-title">
    执行记录
  </div>

  <div class="item-table" style="max-height: 650px;overflow: auto">

    <el-table
      :data="tableData"
      border
      style="width: 100%;">
      <el-table-column
        type="index"
        width="70"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        prop="productTemplate"
        label="产品模板"
        width="300">
        <template slot-scope="scope">
          <span v-ellipsis.20>{{scope.row.productTemplate}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="toatalCount"
        label="案件数量"
        width="100">
        <template slot-scope="scope">
          <span v-ellipsis.20>{{scope.row.toatalCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ruleCount"
        label="规则数量"
        width="100">
        <template slot-scope="scope">
          <span v-ellipsis.20>{{scope.row.ruleCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="操作人"
        width="150">
        <template slot-scope="scope">
          <span v-ellipsis.20>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="执行开始时间"
        width="200">
        <template slot-scope="scope">
          <span v-ellipsis.20>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="takeEffectStatus"
        label="是否采纳"
        width="150">
        <template slot-scope="scope">
          <span v-ellipsis.20>{{scope.row.takeEffectStatus === 0 ? '未采纳' : '已采纳'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="takeEffectStatus"
        fixed="right"
        header-align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <span class="colLink" @click="viewDetail(scope.row)" >查看</span>
        </template>
      </el-table-column>

    </el-table>



    <el-pagination style="background: #fff"
                   class="mt-10 mb-10"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pager.currentNum"
                   :page-sizes="[10, 20, 30, 50, 100, 200]"
                   :page-size="pager.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pager.total">
    </el-pagination>
  </div>

</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  export default {
  name: 'exeRecord',
  components:{
    timeFrame
  },
  data(){
    return {
      searchItem: {},
      pager:{
        currentNum: 1,
        pageSize: 10,
        total: 1
      },
      tableData: []
    }
  },
    methods:{
      handleSizeChange(val){
        this.pager.pageSize = val;
        this.doQuery();
      },
      handleCurrentChange(val){
        this.pager.currentNum = val;
        this.doQuery();
      },
      doQuery(){
        this.$http.post("/ruleCase/queryRuleExeRecordByBaseQuery.htm",{...this.pager, ...this.searchItem}).then(res => {
          this.tableData = res.result.list;
          this.tableData.forEach(it => {
            it.productTemplate = it.clientName+ it.prodTempCode;
          })
          this.pager.total = res.result.count;
        })
      },
      viewDetail(row){
        this.$router.push({
          path: '/main/exeRecordDetail',
          query: {
            exeId: row.id,
            createTime: row.createTime,
            productTemplate: row.productTemplate,
            takeEffectStatus: row.takeEffectStatus
          },
        })
      }
    },
    created(){
      this.doQuery();
    }
}
</script>

<style scoped>

</style>
