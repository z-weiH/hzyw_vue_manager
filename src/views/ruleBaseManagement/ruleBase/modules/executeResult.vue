<template>
  <el-dialog
    :visible.sync="isExecuting"
    v-dialogDrag
    title="执行结果"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="890px"
    >
    <div style="width: 850px; margin: 20px auto;">

      <p class="content-title">
        <span>案件总数：{{exe.toatalCount}}件</span>
        <span>规则总数：{{exe.ruleCount}}条</span>
        <span>检出错误：{{exe.checkErrorCount}}件</span>
        <span>执行错误：{{exe.exeErrorCount}}件</span>
        <span>耗时：{{exe.exeTime}}秒</span>
      </p>
      <el-table :data="list" style="width: 100%" row-key="caseId"
                :expand-row-keys="expands">

        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column label="案件编号" prop="loanBillNo">
        </el-table-column>
        <el-table-column label="被申请人姓名" prop="respondents">
        </el-table-column>
        <el-table-column label="被申请人手机号" prop="phones">
        </el-table-column>
        <el-table-column label="执行结果" prop="exeStatus">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <div style="text-align: center;">
              <span class="colLink mr-20" @click="showDetails(scope.row)">{{expands.indexOf(scope.row.caseId) != -1 ? '收起' : '展开'}}</span>
              <span class="colLink">查看</span>
            </div>

          </template>
        </el-table-column>

        <el-table-column  type="expand" v-if="false" >
          <template slot-scope="props">
            <ul>
              <li v-for="(item,idx) in props.row.results" style="margin:10px 0;">
                <p class="result-content">{{item.ruleDesc}}</p>
                <p class="result-content">{{item.returnResult}}</p>
                <p class="result-content">{{item.exeResult}}</p>
              </li>
            </ul>
          </template>
        </el-table-column>
      </el-table>


    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'executeResult',
    props:{
      exeId: String,
    },
    data() {
      return{
        //展开行列表
        expands:[],

        exe: {},
        list: [],
        pager:{
          currentNum: 1,
          total: 1,
          pageSize: 20
        }
      }
    },
    computed:{
      isExecuting :{
        get: function () {
          return this.$parent.isExecuting;
        },
        set: function (v) {
          if(!v)
            this.$parent.isExecuting = false;
        }
      }
    },
    methods:{
      //展开 收起 详细信息
      showDetails(row){
        if(this.expands.indexOf(row.caseId) == -1){

          if(!row.results || !row.results.length){
            this.$http.post('/ruleExe/queryRuleExeResultDetail.htm',{caseId: row.caseId,exeId: this.exeId}).then(res => {
              if(res.code === '0000'){
                row.results = res.result.list;
                this.expands.push(row.caseId);
              }
            })
          }else{
            this.expands.push(row.caseId);
          }
        }
        else{
          let idx = this.expands.indexOf(row.caseId);
          this.expands.splice(idx,1);

        }
      },

      //查询执行结果
      queryExecutRes() {
        this.$http.post('/ruleExe/queryRuleExeResult.htm',{exeId: this.exeId}).then(res => {
          if(res.code === '0000'){
            this.pager.total = res.result.caseCount,
            this.exe = res.result.exe;
            this.list = res.result.list;

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
