<template>
  <el-dialog
    :visible.sync="flag"
    v-dialogDrag
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="执行结果"

    width="1000px"
    >
    <div style="width: 960px; margin: 20px auto;">

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
        <el-table-column label="产品模版" prop="clientName">
          <template slot-scope="scope">
            <span>{{scope.row.clientName + '-' + scope.row.prodTempCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="案件状态" prop="caseStatus">
          <template slot-scope="scope">
            <span>{{caseStatusName(scope.row.caseStatus)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="执行结果" prop="exeStatus">
          <template slot-scope="scope">
            <div style="text-align: center;">

              <template v-if="!isRuleExe">
                <span v-if="scope.row.exeStatus === 1">
                  <img class="" src="@/assets/img/success_tag.png" alt="">
                  过检
                </span>
                <span v-if="scope.row.exeStatus === 0">
                  <img class="" src="@/assets/img/warning_tag.png" alt="">
                  执行错误
                </span>
                <span v-if="scope.row.exeStatus === 2">
                  <img class="" src="@/assets/img/error_tag.png" alt="">
                  检出错误
                </span>
              </template>
              <template v-else>
                <span class="mr-10">
                  <img class="" src="@/assets/img/success_tag.png" alt="">
                  {{scope.row.successCount}}
              </span>
                <span class="mr-10">
                <img class="" src="@/assets/img/error_tag.png" alt="">
                  {{scope.row.errorCount}}
              </span>
                <span class="mr-10">
               <img class="mr-5" src="@/assets/img/warning_tag.png" alt="">
                {{scope.row.exceptionCount}}
              </span>
              </template>

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
            <ul v-if="isRuleExe">
              <li v-for="(item,idx) in props.row.results" style="margin:10px 0;">
                <div class="result-content">
                  <img class="mr-10" v-if="item.ruleExeStatus === 0"  src="@/assets/img/warning_tag.png" alt="">
                  <img class="mr-5" v-if="item.ruleExeStatus === 1" src="@/assets/img/success_tag.png" alt="">
                  <img class="mr-5" v-if="item.ruleExeStatus === 2" src="@/assets/img/error_tag.png" alt="">
                  <span>{{item.ruleDesc}}</span>
                </div>
                <div class="result-desc" v-if="item.ruleExeStatus === 0">
                  {{item.exeResult}}
                </div>

              </li>
            </ul>
            <ul class="exeRule_result" v-else>
              <li style="margin:10px 0;">
                <span class="label">【规则描述】</span>
                <span class="value">{{props.row.results[0].ruleDesc}}</span>
              </li>
              <li style="margin:10px 0;">
                <span class="label">【执行提示】</span>
                <span class="value">{{props.row.results[0].exeResult}}</span>
              </li>
              <li style="margin:10px 0;">
                <span class="label">【脚本内容】</span>
                <span class="value">{{ruleContent}}</span>
              </li>
              <li style="margin:10px 0;" v-if="props.row.results[0].ruleExeStatus !== 0">
                <span class="label">【数值填充】</span>
                <span class="value">{{props.row.results[0].expression}}</span>
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
        exeId: 0,
        ruleContent: ''
      }
    },
    methods:{

      caseStatusName(status){
        if(status === 0)
          return '待分配';
        else if(status === 1)
          return '待初审';
        else if(status === 2)
          return '待复审';
        else if(status === 3)
          return '退回重审';
        else if(status === 4)
          return '预审通过';
        else if(status === 5)
          return '预审未通过';
        else if(status === 6)
          return '立案申请成功';
        else if(status === 7)
          return '立案申请失败';
      },
      openView(){
        let routeData = this.$router.resolve({
          path: '/ruleExeDetail',
          query: { exeId: this.exeId ,takeEffectStatus: 0},
        })
        window.open(routeData.href, '_blank')
      },

      show(exeId,isRuleExe,ruleContent){
        this.ruleContent = ruleContent;
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
    line-height: 30px;
    /*word-wrap: break-word;*/
    /*word-break: break-all;*/
    /*display: inline-block;*/
    /*width: 240px;*/
    /*box-sizing: border-box;*/
    /*padding: 0 5px;*/
    /*vertical-align: middle;*/
  }
  .result-desc{
    line-height: 24px;
    color: #999;
  }
  .exeRule_result{
    li{
      clear: both;
      .label{
        width: 100px;
        float: left;
      }
      .value{
        float: left;
        width: calc(100% - 100px);
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }

</style>
