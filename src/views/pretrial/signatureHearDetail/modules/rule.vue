<template>
    <div>
      <div class="dialog_container" v-if="showDailg">
          <div class="dialog_title">
            <div class="btns fr">
              <span><i style="border-color: #66CC33;"></i>已执行</span>
              <span><i style="border-color:#EFAC1F;"></i>未执行</span>
            </div>
            <span>机审规则</span>
          </div>
          <div class="dialog_content">
            <div class="content">
              <p>身份证审核：</p>
              <ul>
                <li v-if="list1.length == 0">无身份证审核规则</li>
                <li v-for="(item,index) in list1" :key="index"><i :class="{'succIcon':item.logStatus == 1,'errorIcon':item.logStatus == 0}"></i>{{item.logInfo}}</li>
              </ul>
            </div>
            <div class="content">
              <p>签名审核：</p>
              <ul>
                <li v-if="list2.length == 0">无签名审核规则</li>
                <li v-for="(item,index) in list2" :key="index"><i :class="{'succIcon':item.logStatus == 1,'errorIcon':item.logStatus == 0}"></i>{{item.logInfo}}</li>
              </ul>
            </div>
            <div class="content">
              <p>证据链审核：</p>
              <ul>
                <li v-if="list3.length == 0">无证据链审核规则</li>
                <li v-for="(item,index) in list3" :key="index"><i :class="{'succIcon':item.logStatus == 1,'errorIcon':item.logStatus == 0}"></i>{{item.logInfo}}</li>
              </ul>
            </div>
            <div class="dailog_footer">
              <el-button type="info" size="mini" @click="closeDailog">关闭</el-button>
            </div>
          </div>

      </div>
      <div class="dialog_bg" v-if="showDailg" ></div>
    </div>
</template>

<script>
export default {
  name: 'rule',
  data(){
    return {
      showDailg: true,
      //身份证
      list1:[],
      //签名
      list2:[],
      //证据链
      list3:[],
    }
  },
  methods:{
    //初始化机审规则
    initDailog(item){
      this.$http.post("/againAudit/machineWhoseRules.htm",{caseId:'1534332361727'}).then(res => {
        if(res.code === '0000') {
          this.list1 = res.result.filter(it => it.logType === 1);
          this.list2 = res.result.filter(it => it.logType === 2);
          this.list3 = res.result.filter(it => it.logType === 3);
          this.showDailg = true;
        }
      })
    },
    closeDailog(){
      this.showDailg = false;
    }
  },
  mounted(){
    this.initDailog();
  }

}
</script>

<style scoped lang="scss">

  .dialog_container{
    position: fixed;
    left: calc(50% - 290px);
    top:200px;
    z-index: 999;
    width: 580px;
    .dialog_title{
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom: 1px solid #F0F2F5;
      height: 36px;
      background: #FAFAFC;
      color:#244689;
      font-size: 15px;
      font-weight: 400;
      line-height: 36px;
      text-align: center;
      .btns{
        position: absolute;
        right: 0;
        font-size: 12px;
        font-weight: normal;
        line-height: 36px;
        color:#999;
        padding-right: 18px;
        i{
          display: inline-block;
          border:5px solid #aaa;
          border-radius: 50%;
          vertical-align: baseline;
          line-height: 16px;
          margin-right: 3px;
        }
      }
    }
    .dialog_content{
      padding: 15px 15px 10px;
      background: #fff;
      .dailog_footer{
        padding-top: 20px;
        text-align: center;
      }
      .content{
        p{
          margin: 5px 0;
        }
        ul{
          overflow: hidden;
          li{
            color: #8E8E8E;
            float: left;
            width: 270px;
            font-size:12px;
            line-height: 18px;
            line-height: 20px;
            i{
              display: inline-block;
              border:5px solid #aaa;
              border-radius: 50%;
              vertical-align: baseline;
              line-height: 16px;
              margin-right: 3px;
              &.succIcon{
                border-color: #66CC33;
              }
              &.errorIcon{
                border-color: #EFAC1F;
              }
            }
          }
        }
      }
    }

  }
  .dialog_bg{
    background: rgba(229,229,229,.5);
    position: fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
  }
</style>
