<template>
  <el-dialog
    class="self_dialog"
    :visible.sync="infoFlag"
    v-dialogDrag
    width="705px"
    center>
    <div class="title" style="line-height: 37px;height: 37px;text-align: left;padding-left: 10px;" slot="title">
        <span style="width: 31%;display: inline-block;" class="ellipsis">
          批次号：{{currentItem.batchNo}}
        </span>
      <span style="width: 31%;display: inline-block;" class="ellipsis">
          操作人: {{currentItem.userName}}
        </span>

      <span style="width: 31%;display: inline-block;margin-right: 30px;" class="ellipsis" :title="currentItem.processTime">
          处理时间：{{currentItem.processTime}}
        </span>
    </div>
    <div class="dialog_content">
      <ul style="overflow: hidden">
        <li>
          <div class="title">{{currentItem.customerList.length}}个客户</div>
          <div class="list">
            <span v-for="(item,idx) in currentItem.customerList" :key="idx">
              {{item.clientName}}
             <i v-if="idx < currentItem.customerList.length -1">、</i>
            </span>
          </div>
        </li>
        <li>
          <div class="title">{{currentItem.courtList.length}}个法院</div>
          <div class="list">
            <span v-for="(item,idx) in currentItem.courtList" :key="idx">
              {{item.courtName}}
              <i v-if="idx < currentItem.courtList.length -1">、</i>
            </span>
          </div>
        </li>
        <li>
          <div class="title">已生成材料</div>
          <div class="list">
            <span >{{currentItem.createDocsAll}}</span>
          </div>
        </li>
        <li>
          <div class="title">{{currentItem.caseList.length}}个案件</div>
          <div class="table">

              <el-table
                :data="currentItem.caseList"
                border
                :max-height="400"
              >
                <!--<el-table-column prop="caseNo" label="案号"></el-table-column>-->
                <!--<el-table-column prop="applicants" label="仲裁申请人" width="120"></el-table-column>-->
                <!--<el-table-column prop="executedBorrowAmt" label="执行标的"></el-table-column>-->
                <!--<el-table-column prop="fixedAmount" label="固定金额"></el-table-column>-->
                <!--<el-table-column prop="respondents" label="仲裁被申请人" width="120"></el-table-column>-->
                <!--<el-table-column prop="resPhone" label="手机号"></el-table-column>-->
                <!--<el-table-column prop="dateOfBorrowing" label="借款日期"></el-table-column>-->
                <!--<el-table-column prop="lateStartDate" label="逾期开始日" width="120"></el-table-column>-->
                <!--<el-table-column prop="timeOfAdjudication" label="裁决时间"></el-table-column>-->
                <!--<el-table-column prop="courtName" label="法院"></el-table-column>-->
                <!--<el-table-column prop="templateCode" label="模板编码"></el-table-column>-->
                <!--<el-table-column prop="settingStatus" label="材料配置状态" width="120">-->
                <!--<template slot-scope="scope">-->
                <!--{{scope.row.settingStatus === 1 ? '已完成' : '未完成'}}-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="downloadStatus" label="下载状态">-->
                <!--<template slot-scope="scope">-->
                <!--{{scope.row.downloadStatus === 1 ? '未处理' : '已处理'}}-->
                <!--</template>-->
                <!--</el-table-column>-->


                <el-table-column prop="caseNo" label="案号" width="240">
                  <template slot-scope="scope">
                    <span >{{scope.row.caseNo}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="applicants" label="仲裁申请人" min-width="120">
                  <template slot-scope="scope">
                    <span v-ellipsis.20>{{scope.row.applicants}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="executedBorrowAmt" label="执行标的"></el-table-column>
                <el-table-column prop="fixedAmount" label="固定金额"></el-table-column>
                <el-table-column prop="respondents" label="仲裁被申请人" min-width="120">
                  <template slot-scope="scope">
                    <span v-ellipsis.20>{{scope.row.respondents}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="resPhone" label="手机号" width="120"></el-table-column>
                <el-table-column prop="dateOfBorrowing" label="借款日期" width="120"></el-table-column>
                <el-table-column prop="lateStartDate" label="逾期开始日" min-width="120"></el-table-column>
                <el-table-column prop="repaymentStatus" label="还款情况" width="120">
                  <template slot-scope="scope">
                    {{
                    scope.row.repaymentStatus === 1 ? '有还款' :
                    scope.row.repaymentStatus === 2 ? '无还款' :
                    scope.row.repaymentStatus === 3 ? '有仲裁后还款' :
                    scope.row.repaymentStatus === 4 ? '无仲裁后还款' : ''
                    }}
                  </template>
                </el-table-column>
                <el-table-column prop="closeTime" label="裁决时间" width="200">
                  <template slot-scope="scope">
                    <span >{{scope.row.closeTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="courtName" label="法院" width="240">
                  <template slot-scope="scope">
                    <span >{{scope.row.courtName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="templateCode" label="模板编码"></el-table-column>
                <el-table-column prop="configurationStatus" label="材料配置状态" min-width="120">
                  <template slot-scope="scope">
                    {{scope.row.configurationStatus === 1 ? '未完成' : '已完成'}}
                  </template>
                </el-table-column>

              </el-table>

          </div>

        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'batchInfo',
  data(){
    return {
      currentItem: {
        customerList:[],
        courtList: [],
        caseList: [],
        tableData:[]

      },
      infoFlag: false,

    }
  },
  methods:{
    show(item){
      this.$http.post("download/queryDownloadTaskDetails.htm",{batchNo: item.batchNo}).then(res => {
        this.infoFlag = true;
        this.currentItem = {...item,...res.result};
        this.currentItem.createDocsAll = this.currentItem.createDocsAll.replace(/,/g,'、');
        this.currentItem.processTime = item.createTime
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .dialog_content{
    ul>li{
      margin-bottom: 10px;
      color: #333;
      .title{
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
      }
      .list{
        line-height: 22px;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
</style>
