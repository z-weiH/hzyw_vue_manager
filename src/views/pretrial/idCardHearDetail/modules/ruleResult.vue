<template>
  <el-dialog
    :visible.sync="showFlag"
    v-dialogDrag
    title="脚本执行记录"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :width="width"
    center>
    <div class="dialog-content" v-if="logList.length > 0">
        <div class="title">
          <div class="fl">执行时间</div>
          <div class="fl">脚本名称</div>
          <div class="fl">执行结果</div>
          <div class="fl">核对结果</div>
          <div class="fl">是否采纳</div>

        </div>
        <hr>
        <div class="content">
          <el-scrollbar  :class="{'showHidden': logList.length > 10}">
            <div class="li" v-for="(item,idx) in logList" :index="idx" >
              <div class="fl">{{item.createTime}}</div>
              <div class="fl">{{item.ruleDesc}}</div>
              <div class="fl">
             <span>
               <img class="mr-10" v-if="item.ruleExeStatus === 0"  src="@/assets/img/error_tag_01.png" alt="">
              <img class="mr-5" v-if="item.ruleExeStatus === 1" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-5" v-if="item.ruleExeStatus === 2" src="@/assets/img/warning_tag_01.png" alt="">
                <b v-if="item.ruleExeStatus === 2">检出错误</b>
                <b v-if="item.ruleExeStatus === 0">执行错误</b>
                <b v-if="item.ruleExeStatus === 1">过检</b>
              </span>

              </div>
              <div class="fl">
                <span>
               <img class="mr-10" v-if="item.isSelected === 0"  src="@/assets/img/success_tag.png" alt="">
              <img class="mr-5" v-if="item.isSelected === 1" src="@/assets/img/error_tag_01.png" alt="">
                <b v-if="item.isSelected === 0">过检</b>
                <b v-if="item.isSelected === 1">检出错误</b>
              </span>
              </div>
              <div class="fl">{{item.takeEffectStatus === 0 ? '否' : '是'}}</div>
            </div>

          </el-scrollbar>
        </div>

    </div>
    <div class="dialog-content" v-else style="text-align: center;padding: 30px 0;">
        当前案件暂无已执行规则
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
      logList:[],
      width: '1000px'
    }
  },
  methods:{
    show(caseId){
      this.$http.post("/ruleCase/queryRuleExeLogByCaseId.htm",{caseId: caseId}).then(res => {
          this.logList = res.result;
          if(res.result.length > 0){
            this.width = '1000px';
          }
          else{
            this.width = '400px';
          }
        this.showFlag = true;

      })
    }
  }

}
</script>

<style scoped lang="scss">
  .showHidden{
    height: 350px;
  }
  .dialog-content{
    .title{
      .fl{
        font-size: 16px;
        font-weight: bold;

      }


    }
    hr{
      margin: 10px 0;
      clear: both;
    }
  }

  .content .li{
    margin: 10px 0;
  }
  .content .li::after{
    content: '';
    display: block;
    clear: both;
  }

  .title .fl, .content .li .fl
  {
    &:nth-child(1){
      width: 180px;
    }
    &:nth-child(2){
      width: 430px;
      padding-right: 20px;
    }
    &:nth-child(3),&:nth-child(4){
      width: 120px;
    }
    &:nth-child(5){
      width: 60px;
    }
  }
</style>
