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
      </ul>
      <div class="content-title">
        未执行规则
        <span>（{{data.noRulesExecutCount}}）</span>
      </div>
      <div class="content-ul"></div>
      <div class="content-title">
        执行错误规则
        <span>（{{data.errorRulesExecutCount}}）</span>
      </div>
      <div class="content-ul"></div>
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
    show(obj){
      this.showFlag = true;
      this.data = obj;
    }
  }

}
</script>

<style scoped lang="scss">
  .dialog-content{
    .content-title{
      font-weight: bold;
      color: #1E1E1E;
      span{
        color:#999;
      }
    }
  }

</style>
