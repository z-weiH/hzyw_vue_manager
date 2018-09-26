<template>
  <el-dialog
    :visible.sync="showFlag"
    v-dialogDrag
    title="机审规则"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="800px"
    center>
    <div class="dialog-content">
      <div class="content-title">
        已执行规则
        <span>（{{data.rulesExecutCount}}）</span>
      </div>
      <ul class="content-ul">
        <li v-for="(item,idx) in data.logList" :key="idx">
          <span class="desc">{{item.logInfo}}</span>
          <span class="result">{{item.logStatus ? 0 : '执行错误' ? 1 : '未检出错误' ? 2 : '检出错误'}}</span>
          <span class="time">{{item.logTime}}</span>
        </li>

        <li v-if="data.logList.length === 0" style="color: #ccc;margin-left: 20px;">当前无已执行规则</li>
      </ul>
      <div class="content-title">
        未执行规则
        <span>（{{data.noRulesExecutCount}}）</span>
      </div>
      <ul class="content-ul">
        <li v-for="(item,idx) in data.logList2" :key="idx">
          <span class="desc" >{{item.logInfo}}</span>

        </li>

        <li v-if="data.logList2.length === 0" style="color: #ccc;margin-left: 20px;">当前无未执行规则</li>
      </ul>
      <div class="content-title">
        执行错误规则
        <span>（{{data.errorRulesExecutCount}}）</span>
      </div>
      <ul class="content-ul">
        <li v-for="(item,idx) in data.logList1" :key="idx">
          <span class="desc ellipsis" :title="item.logInfo">{{item.logInfo}}</span>
          <span class="result ellipsis" :title="item.exeResult">{{item.exeResult}}</span>
          <span class="time ellipsis" :title="item.logTime">{{item.logTime}}</span>
        </li>

        <li v-if="data.logList1.length === 0" style="color: #ccc;margin-left: 20px;">当前无已执行错误规则</li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="showFlag = false;">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ruleResult',
  data(){
    return {
      showFlag: false,
      data:{}
    }
  },
  methods:{
    show(caseId){
      this.$http.post("/againAudit/machineWhoseRules.htm",{caseId: caseId}).then(res => {
        if(res.code === '0000'){
          this.showFlag = true;
          this.data = res.result;
        }
      })
    }
  }

}
</script>

<style scoped lang="scss">
  .dialog-content{
    .content-title{
      font-weight: bold;
      font-size: 15px;
      line-height: 24px;
      color: #1E1E1E;
      span{
        color:#999;
      }
    }
    .content-ul{
      li{
        line-height: 24px;
        .desc{
          color: #543354;
          max-width: 230px;
          margin-left: 20px;
          margin-right: 10px;
          &:hover{
            font-weight: bold;
          }
        }
        .result{
          max-width: 330px;
          margin-right: 10px;
        }
        .time{
          max-width: 150px;
        }
        .result,.time{
          color: #CCCCCC;
        }
      }

    }
  }

</style>
