<template>
  <el-dialog
    :visible.sync="flag"
    v-dialogDrag
    title="执行结果"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="890px"
    >
    <div style="width: 850px; margin: 20px auto;">

      <p class="content-title">
        <el-button class="fr" type="primary" size="mini" @click="openView" v-if="isRuleExe">查看详情</el-button>

        <span>案件总数：{{exe.currentCount}}件</span>
        <span>规则总数：{{exe.ruleCount}}条</span>
        <span>检出错误：{{exe.checkErrorCount}}件</span>
        <span>执行错误：{{exe.performErrorCount ? exe.performErrorCount : 0 }}件</span>
        <span>耗时：{{exe.timeConsuming ? exe.timeConsuming : 1}}秒</span>
      </p>
      <el-table  :data="list" style="width: 100%" row-key="id"
                :expand-row-keys="expands" @expand-change="showDetails">


        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column label="案件编号" prop="loanBillNo">
        </el-table-column>
        <el-table-column label="被申请人姓名" prop="respondents">
        </el-table-column>
        <el-table-column label="被申请人手机号" prop="phones">
        </el-table-column>
        <el-table-column label="执行结果" prop="exeStatus">
          <template slot-scope="scope">
            <div style="text-align: center;">
              <span>
               <img class="mr-10" v-if="scope.row.exeStatus === 0"  src="@/assets/img/warning_tag.png" alt="">
              <img class="mr-5" v-if="scope.row.exeStatus === 1" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-5" v-if="scope.row.exeStatus === 2" src="@/assets/img/error_tag.png" alt="">
                <b v-if="scope.row.exeStatus === 2">检出错误</b>
                <b v-if="scope.row.exeStatus === 0">执行错误</b>
                <b v-if="scope.row.exeStatus === 1">过检</b>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <div style="text-align: center;">
              <span class="colLink mr-20" @click="showDetails(scope.row)">{{expands.indexOf(scope.row.id) != -1 ? '收起' : '展开'}}</span>
            </div>

          </template>
        </el-table-column>

        <el-table-column  type="expand">
          <template slot-scope="props">
            <ul>
              <li v-for="(item,idx) in props.row.results" style="margin:10px 0;">
                <p class="result-content">{{item.ruleDesc}}</p>
                <p class="result-content">{{item.exeResult}}</p>
                <p class="result-content">{{item.returnResult ? item.returnResult : '--'}}</p>

              </li>
            </ul>
          </template>
        </el-table-column>


      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pager.currentNum"
          :page-sizes="[10, 20, 50]"
          :page-size="pager.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pager.total">
        </el-pagination>
      </div>


    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'executeResult',

    data() {
      return{
        //展开行列表
        expands:[],

        isRuleExe: false,
        exe: {},
        list: [],
        pager:{
          currentNum: 1,
          total: 1,
          pageSize:10
        },
        flag: false,
        exeId: 0
      }
    },
    methods:{

      openView(){
        let routeData = this.$router.resolve({
          path: '/ruleExeDetail',
          query: { exeId: this.exeId },
        })
        window.open(routeData.href, '_blank')
      },

      show(exeId,isRuleExe){
        this.flag = true;
        this.isRuleExe = isRuleExe;
        this.exeId = exeId;
        this.queryExecutRes();
      },
      //展开 收起 详细信息
      showDetails(row){
        if(this.expands.indexOf(row.id) == -1){

            this.$http.post('/ruleExe/queryRuleExeResultDetail.htm',{exeCaseId: row.id}).then(res => {
              if(res.code === '0000'){
                row.results = res.result;
                this.expands=[row.id];
              }
            })

        }
        else{
          this.expands=[];

        }
      },

      handleSizeChange(val){
        this.pager.pageSize = val;
        this.doQuery();
      },

      handleCurrentChange(val){
        this.pager.currentNum = val;
        this.doQuery();
      },
      doQuery() {
        this.$http.post('/ruleExe/queryRuleExeResult.htm',{exeId: this.exeId, ...this.pager},{mheaders: true}).then(res => {
          if(res.code === '0000'){
            this.pager.total = res.result.count,

              this.list = res.result.list;

          }
        });
      },
      //查询执行结果
      queryExecutRes() {
        this.doQuery();
        this.$http.post("/ruleExe/queryRuleExeResultCount.htm",{exeId: this.exeId}).then(res => {
          if(res.code === '0000'){
            this.exe = res.result;
          }
        })
      }

    }

  }
</script>

<style scoped lang="scss">
  .content-title{
    margin: 20px 0;
    span{
      margin-right: 25px;
    }
  }
  .result-content{
    word-wrap: break-word;
    word-break: break-all;
    display: inline-block;
    width: 240px;
    box-sizing: border-box;
    padding: 0 5px;
    vertical-align: middle;
  }

</style>
