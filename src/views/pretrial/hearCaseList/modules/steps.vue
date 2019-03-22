<template>
  <div class="steps">
    <el-scrollbar style="height: calc(100vh - 50px)">
      <ul style="margin: 50px ;margin-right: 0;">

        <el-collapse class="steps_collapse" style="width:346px;" v-model="activeNames" >
          <el-collapse-item v-for="(obj, index) in data" :key="index" :title="`第${obj.pushCount}次推送`" :name="obj.pushCount">
            <ul>
              <li v-for="(item,idx) in obj.data" :key="idx">
                <div class="date">
                  <span v-if="idx === 0 || item.createTime.substring(0,10) !==  obj.data[idx - 1].createTime.substring(0,10)">{{item.createTime | TimeMomentCN }}</span>
                  <span v-else style="display: inline-block;width: 102px;"></span>
                  <span :class="{'active': currentIdx === index+'-'+idx}">
            {{item.createTime.substring(11)}}
            </span>
                </div>
                <div class="step">
                  <div class="circle" :class="{'active': currentIdx === index+'-'+idx}" @click="currentIdx = index+'-'+idx">

                  </div>
                  <div class="line">

                  </div>
                </div>
                <div class="desc" >
            <span :class="{'active': currentIdx === index+'-'+idx}" @click="currentIdx = index+'-'+idx">
            {{getOperStatusCN(item.operStatus)}}
            </span>
                </div>
                <div style="clear: both;"></div>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>

        <!--<li class="push_time_title">第一次推送</li>-->

        <!--<li v-for="(item,idx) in data" :key="idx">-->
        <!--<div class="date">-->
        <!--<span v-if="idx === 0 || item.createTime.substring(0,10) !== data[idx - 1].createTime.substring(0,10)">{{item.createTime | TimeMomentCN }}</span>-->
        <!--<span v-else style="display: inline-block;width: 110px;"></span>-->
        <!--<span :class="{'active': currentIdx === idx}">-->
        <!--{{item.createTime.substring(11)}}-->
        <!--</span>-->
        <!--</div>-->
        <!--<div class="step">-->
        <!--<div class="circle" :class="{'active': currentIdx === idx}" @click="currentIdx = idx">-->

        <!--</div>-->
        <!--<div class="line">-->

        <!--</div>-->
        <!--</div>-->
        <!--<div class="desc" >-->
        <!--<span :class="{'active': currentIdx === idx}" @click="currentIdx = idx">-->
        <!--{{getOperStatusCN(item.operStatus)}}-->
        <!--</span>-->
        <!--</div>-->
        <!--<div style="clear: both;"></div>-->
        <!--</li>-->
      </ul>

      <div class="detail" :class="{'active': currentIdx !== -1}">
        <div class="title">
          <span class="caption">{{getOperStatusCN(currentObj.operStatus)}}</span>
          <span class="time">{{currentObj.createTime}}</span>
          <i class="el-icon-close" @click="currentIdx = -1;"></i>
        </div>
        <div class="content">
          <!--// 1.推送完成 2.整合完成 4.修改身份证信息 5.机审完成 6.分配完成 7.初审人变更完成 8.身份证审核完成 9.签名审核完成 10.证据链审核完成 11.初审完成 12.脚本规则执行完成 13.审核意见采纳完成 14.复审认领完成 15.复审人变更完成 16.复审审核完成 17.复审完成 18.立案申请提交完成 19.退回重审-->
          <!--推送完成-->
          <template v-if="currentObj.operStatus === 1">
            <ul>
              <li>
                <span class="label">推送结果</span>
                <span class="value">{{currentObj.isSuccess === 1 ? '成功' : '失败'}}</span>
              </li>
              <li v-if="currentObj.isSuccess === 0">
                <span class="label">失败原因 </span>
                <span class="value">
                  <ul>
                      <li v-for="(reason,idx) in currentObj.logObj">{{`${idx + 1}.${reason}`}}</li>
                  </ul>
                </span>
              </li>
            </ul>

          </template>
          <!--整合完成-->
          <template v-if="currentObj.operStatus === 2">
            <ul>
              <li>
                <span class="label">推送结果</span>
                <span class="value">{{currentObj.isSuccess === 1 ? '成功' : '失败'}}</span>
              </li>
              <li v-if="currentObj.isSuccess === 0">
                <span class="label">失败原因 </span>
                <span class="value">
                  <ul>
                      <li v-for="(reason,idx) in currentObj.logObj">{{`${idx + 1}.${reason}`}}</li>
                  </ul>
                </span>
              </li>
            </ul>
          </template>

          <!--修改身份证信息-->
          <template v-if="currentObj.operStatus === 4">

            <ul>
              <li>
                <span class="label">修改记录</span>
                <span class="value">
                  <ul>
                      <li v-for="(reason, idx) in currentObj.logObj.respondentIdcard">
                        {{`${idx + 1}.【${getIdCardStatusCN(reason.idCardStatus)}】由【${reason.oldField}】修改为【${reason.newField}】`}}
                      </li>
                  </ul>
                </span>
              </li>
              <li>
                <span class="label">操作人</span>
                <span class="value">
                    {{currentObj.logObj.respondentIdcard[0].operationName}}
                  </span>
              </li>
            </ul>
            <!--respondentIdcard-->
          </template>

          <!--机审完成-->
          <template v-if="currentObj.operStatus === 5">

            <ul>
              <li>
                <span class="label">机审项目</span>
                <span class="value">
                  <ul>
                      <li v-for="(reason, idx) in currentObj.logObj">
                        {{`${idx + 1}.${reason.reason}【${reason.isSuccess === 0 ? '检出错误' : '过检'}】`}}
                      </li>
                  </ul>
                </span>
              </li>
              <li >
                <span class="label">审核意见 </span>
                <span class="value">
                  <ul>
                      <li v-for="(reason,idx) in currentObj.logObj.filter(it => it.isSuccess === 0)">{{`${idx + 1}.${reason.reason}`}}</li>
                      <li v-if="currentObj.logObj.filter(it => it.isSuccess === 0).length === 0">通过</li>
                  </ul>
                </span>
              </li>
            </ul>

          </template>
          <!--分配完成-->
          <template v-if="currentObj.operStatus === 6">
            <ul>
              <li>
                <span class="label">初审人</span>
                <span class="value">{{currentObj.logObj.firstAuditName}}</span>
              </li>
              <li>
                <span class="label">操作人</span>
                <span class="value">{{currentObj.logObj.operName}}</span>
              </li>
            </ul>
          </template>
          <!--初审人变更完成-->
          <template v-if="currentObj.operStatus === 7">
            <ul>
              <li>
                <span class="label">原初审人</span>
                <span class="value">
                    {{currentObj.logObj.originalAuditName}}
                  </span>
              </li>
              <li>
                <span class="label">新初审人</span>
                <span class="value">
                    {{currentObj.logObj.currentAuditName}}
                  </span>
              </li>
            </ul>
          </template>
          <!--身份证审核完成-->
          <template v-if="currentObj.operStatus === 8">
            <ul>
              <li>
                <span class="label">审核意见</span>
                <span class="value">
                  <ul>
                      <li v-for="(reason,idx) in currentObj.logObj.cancelReasonList">{{`取消选择【${idx + 1}.${reason}】`}}</li>
                      <li v-for="(reason,idx) in currentObj.logObj.selectedReasonList">{{`选择【${idx + 1}.${reason}】`}}</li>
                    <!--<li v-if="!currentObj.logObj.selectedReasonList || currentObj.logObj.selectedReasonList.length === 0">无</li>-->
                        <li v-if="currentObj.logObj.selectedReasonList.length === 0 && currentObj.logObj.cancelReasonList.length === 0">无</li>

                  </ul>
                </span>
              </li>
              <li>
                <span class="label">审核意见</span>
                <span class="value">
                    <ul>
                       <li v-for="(reason,idx) in currentObj.logObj.totalReasonList">{{`${idx + 1}.${reason}`}}</li>
                        <li v-if="!currentObj.logObj.totalReasonList || currentObj.logObj.totalReasonList.length === 0">通过</li>
                    </ul>
                  </span>
              </li>
            </ul>


          </template>
          <!--签名审核完成-->
          <template v-if="currentObj.operStatus === 9">
            <ul>
              <li>
                <span class="label">审核意见</span>
                <span class="value">
                  <ul>
                      <li v-for="(reason,idx) in currentObj.logObj.cancelReasonList">{{`取消选择【${idx + 1}.${reason}】`}}</li>
                      <li v-for="(reason,idx) in currentObj.logObj.selectedReasonList">{{`选择【${idx + 1}.${reason}】`}}</li>
                      <li v-if="currentObj.logObj.selectedReasonList.length === 0 && currentObj.logObj.cancelReasonList.length === 0">无</li>

                  </ul>
                </span>
              </li>
              <li>
                <span class="label">审核意见</span>
                <span class="value">
                    <ul>
                       <li v-for="(reason,idx) in currentObj.logObj.totalReasonList">{{`${idx + 1}.${reason}`}}</li>
                        <li v-if="!currentObj.logObj.totalReasonList || currentObj.logObj.totalReasonList.length === 0">通过</li>
                    </ul>
                  </span>
              </li>
            </ul>
          </template>
          <!--证据链审核完成-->
          <template v-if="currentObj.operStatus === 10">
            <ul>
              <li>
                <span class="label">审核意见</span>
                <span class="value">
                  <ul>
                      <li v-for="(reason,idx) in currentObj.logObj.cancelReasonList">{{`取消选择【${idx + 1}.${reason}】`}}</li>
                      <li v-for="(reason,idx) in currentObj.logObj.selectedReasonList">{{`选择【${idx + 1}.${reason}】`}}</li>
                                          <li v-if="currentObj.logObj.selectedReasonList.length === 0 && currentObj.logObj.cancelReasonList.length === 0">无</li>

                  </ul>
                </span>
              </li>
              <li>
                <span class="label">审核意见</span>
                <span class="value">
                    <ul>
                       <li v-for="(reason,idx) in currentObj.logObj.totalReasonList">{{`${idx + 1}.${reason}`}}</li>
                        <li v-if="!currentObj.logObj.totalReasonList || currentObj.logObj.totalReasonList.length === 0">通过</li>
                    </ul>
                  </span>
              </li>
            </ul>
          </template>

          <!--初审完成-->
          <template v-if="currentObj.operStatus === 11">
            <ul>
              <li>
                <span class="label">初审人</span>
                <span class="value">
                    {{currentObj.logObj.operUserName}}
                  </span>
              </li>
              <li>
                <span class="label">审核意见</span>
                <span class="value">
                    <ul>
                       <li v-for="(reason,idx) in currentObj.logObj.failedReasonList">{{`${idx + 1}.${reason.negReasonMsg}`}}</li>
                        <li v-if="!currentObj.logObj.failedReasonList || currentObj.logObj.failedReasonList.length === 0">通过</li>
                    </ul>
                  </span>
              </li>
            </ul>

          </template>

          <!--脚本规则执行完成-->
          <template v-if="currentObj.operStatus === 12">
            <ul>
              <li>
                <span class="label">执行规则</span>
                <span class="value">
                  <ul>
                      <li v-for="(reason,idx) in currentObj.logObj">{{`${idx + 1}.${reason.ruleDesc}【${reason.ruleExeStatus === 1 ? '过检' : reason.ruleExeStatus === 2 ? '检出错误': '执行错误'}】`}}</li>
                    <!--<li v-for="(reason,idx) in currentObj.logObj.selectedReasonList">{{`取消选择【${idx + 1}.${reason}】`}}</li>-->
                  </ul>
                </span>
              </li>
              <li>
                <span class="label">操作人</span>
                <span class="value">
                  {{currentObj.logObj[0].operName}}
                </span>
              </li>
            </ul>

          </template>

          <!--审核意见采纳完成-->
          <template v-if="currentObj.operStatus === 13">
            <ul>
              <li>
                <span class="label">采纳项目</span>
                <span class="value">
                  <ul>
                     <li v-for="(reason,idx) in currentObj.logObj.adoptRuleList.filter(it => it.isSelected === 1)">{{`${idx + 1}.${reason.ruleDesc}【${reason.ruleExeStatus === 1 ? '过检' : reason.ruleExeStatus === 2 ? '检出错误': '执行错误'}】`}}</li>
                    <li v-if="!currentObj.logObj.adoptRuleList || currentObj.logObj.adoptRuleList.filter(it => it.isSelected === 1).length === 0">无</li>
                  </ul>
                </span>
              </li>
              <li>
                <span class="label">审核意见</span>
                <span class="value">
                    <ul>
                       <li v-for="(reason,idx) in currentObj.logObj.totalReasonList">{{`${idx + 1}.${reason.reasonMsg}`}}</li>
                        <li v-if="!currentObj.logObj.totalReasonList || currentObj.logObj.totalReasonList.length === 0">通过</li>
                    </ul>
                  </span>
              </li>
            </ul>
          </template>

          <!--复审认领完成-->
          <template v-if="currentObj.operStatus === 14">
            <ul>
              <li>
                <span class="label">复审人</span>
                <span class="value">
                      {{currentObj.logObj.newEditor}}
                    </span>
              </li>
            </ul>
          </template>
          <!--复审人变更完成-->
          <template v-if="currentObj.operStatus === 15">
            <ul>
              <li>
                <span class="label">原复审人</span>
                <span class="value">
                    {{currentObj.logObj.oldEditor}}
                  </span>
              </li>
              <li>
                <span class="label">新复审人</span>
                <span class="value">
                    {{currentObj.logObj.newEditor}}
                  </span>
              </li>
            </ul>
          </template>
          <!--复审审核完成-->
          <template v-if="currentObj.operStatus === 16">
            <ul>
              <li>
                <span class="label">审核意见</span>
                <span class="value">
                  <ul>
                      <li v-for="(reason,idx) in currentObj.logObj.cancelReasonList">{{`取消选择【${idx + 1}.${reason}】`}}</li>
                      <li v-for="(reason,idx) in currentObj.logObj.selectedReasonList">{{`选择【${idx + 1}.${reason}】`}}</li>
                      <li v-if="currentObj.logObj.selectedReasonList.length === 0 && currentObj.logObj.cancelReasonList.length === 0">无</li>
                  </ul>
                </span>
              </li>
              <li>
                <span class="label">审核意见</span>
                <span class="value">
                    <ul>
                       <li v-for="(reason,idx) in currentObj.logObj.totalReasonList">{{`${idx + 1}.${reason}`}}</li>
                        <li v-if="!currentObj.logObj.totalReasonList || currentObj.logObj.totalReasonList.length === 0">通过</li>
                    </ul>
                </span>
              </li>
            </ul>
          </template>

          <!--复审完成-->
          <template v-if="currentObj.operStatus === 17">
            <ul>
              <li>
                <span class="label">复审人</span>
                <span class="value">
                    {{currentObj.logObj.operUserName}}
                  </span>
              </li>
              <li>
                <span class="label">审核意见</span>
                <span class="value">
                    <ul>
                       <li v-for="(reason,idx) in currentObj.logObj.failedReasonList">{{`${idx + 1}.${reason.negReasonMsg}`}}</li>
                        <li v-if="!currentObj.logObj.failedReasonList || currentObj.logObj.failedReasonList.length === 0">通过</li>
                    </ul>
                  </span>
              </li>
            </ul>
          </template>

          <!--立案申请提交完成-->
          <template v-if="currentObj.operStatus === 18">

            <ul>
              <li>
                <span class="label">操作人</span>
                <span class="value">{{currentObj.logObj.operUserName}}</span>
              </li>
            </ul>
          </template>

          <!--退回重审-->
          <template v-if="currentObj.operStatus === 19">
            <ul>
              <li>
                <span class="label">退回原因</span>
                <span class="value">{{currentObj.logObj.returnReason}}</span>
              </li>
              <li>
                <span class="label">操作人</span>
                <span class="value">{{currentObj.logObj.operName}}</span>
              </li>
              <li>
                <span class="label">初审人</span>
                <span class="value">{{currentObj.logObj.firstAuditName}}</span>
              </li>
            </ul>
          </template>

          <template v-if="currentObj.operStatus === 20">
            <ul>
              <li>
                <span class="label">推送失败原因</span>
                <span class="value">{{currentObj.logObj.pushFileReason || '--'}}</span>
              </li>
              <li>
                <span class="label">是否推送客户</span>
                <span class="value">{{currentObj.logObj.pushClientName === 1 ? '是' : '否'}}</span>
              </li>
              <li>
                <span class="label">操作人</span>
                <span class="value">{{currentObj.logObj.userName || '--'}}</span>
              </li>
            </ul>
          </template>

        </div>
      </div>
    </el-scrollbar>


  </div>

</template>

<script>
  export default {
    name: 'steps',
    data() {
      return {
        currentIdx: null,
        data: [],
        currentObj: {},
        activeNames:[1]
      }
    },

    watch: {
      'currentIdx'(){
        if(this.currentIdx === -1){
          this.currentObj = {};
          return
        }
        let arr = this.currentIdx.split('-');
        this.currentObj = this.data[+arr[0]].data[+arr[1]];
        console.error(this.currentObj);
        if(this.currentObj.logJson){
          this.currentObj.logObj = JSON.parse(this.currentObj.logJson);
        }
      }
    },

    methods: {

      getIdCardStatusCN(status){
        if(status === 0)
          return "地址";
        else if(status === 1)
          return '姓名'
        else if(status === 2)
          return '性别'
        else if(status === 3)
          return '民族'
      },


      getOperStatusCN(status){
        // 1.推送完成 2.整合完成 4.修改身份证信息 5.机审完成 6.分配完成 7.初审人变更完成 8.身份证审核完成 9.签名审核完成 10.证据链审核完成 11.初审完成 12.脚本规则执行完成 13.审核意见采纳完成 14.复审认领完成 15.复审人变更完成 16.复审审核完成 17.复审完成 18.立案申请提交完成 19.退回重审
        if(status === 1){
          return '推送完成';
        }
        else if(status === 2){
          return '整合完成';
        }
        else if(status === 3){
          return '';
        }
        else if(status === 4){
          return '修改身份证信息';
        }else if(status === 5){
          return '机审完成';
        }else if(status === 6){
          return '分配完成';
        }else if(status === 7){
          return '初审人变更完成';
        }else if(status === 8){
          return '身份证审核完成';
        }else if(status === 9){
          return '签名审核完成';
        }else if(status === 10){
          return '证据链审核完成';
        }else if(status === 11){
          return '初审完成';
        }else if(status === 12){
          return '脚本规则执行完成';
        }else if(status === 13){
          return '审核意见采纳完成';
        }else if(status === 14){
          return '复审认领完成';
        }else if(status === 15){
          return '复审人变更完成';
        }else if(status === 16){
          return '复审审核完成';
        }else if(status === 17){
          return '复审完成';
        }else if(status === 18){
          return '立案申请提交完成';
        }else if(status === 19){
          return '退回重审';
        }else if(status === 20) {
          return '手动状态返回';
        }
      },
      calc(price, times){
        let res = price;
        let money = 0;
        for(let idx = 0; idx <= times; idx ++){
          if(idx > 0){
            res -= 1/times * price;
          }
          for(let i = 0; i < 30 ; i ++){
            money += res  * (0.68/10000);
            res *=(1+0.68/10000);
            // console.log(res  * (0.68/10000),money);
          }
          console.error(`第${idx + 1}个月最后一天本金${res}赚: ${money}元`)
        }
        return money;
      },
      init(caseId){
        this.$http.post("/preCaseLib/queryCaseLibOperLogInfo.htm", {caseId : caseId}).then(res => {
          let arr = [];
          res.result.forEach(it => {
            let item = arr.find(i => i.pushCount  === it.pushCount);
            if(item){
              item.data.push(it);
            }else {
              arr.push({pushCount: it.pushCount, data : [it]});
            }
          })

          this.originData = res.result;
          this.data = arr;
          this.currentIdx = -1;
          this.currentObj = {};
          this. activeNames = [1];
        })
      }
    },
    created(){
      // console.error(`6999元24期分期能赚：${this.calc(6999,24)}元`)
    }
  }
</script>

<style lang="scss">
  .steps{
    position: relative;
    border: 1px solid #aaa;
    height: 100%;
    /*min-height: calc(100vh - 50px);*/
    .push_time_title{
      font-family: 'Arial Negreta', 'Arial';
      font-weight: 700;
      font-style: normal;
      font-size: 16px;
      margin-bottom: 18px;
      &::before{
        content: '';
        display: inline-block;
        width: 3px;
        height: 16px;
        background: #159ACA;
      }
    }
    .detail{
      position: absolute;
      top: 0;
      right: calc(400px - 100%);
      width: calc(100% - 400px);
      height: 100%;
      border-left: 1px solid #aaa;
      transition: all 1s;
      &.active{
        right: 0;
      }
      .title{
        height: 60px;
        border-bottom: 1px solid #aaa;
        line-height: 60px;
        padding: 0 20px;
        .caption{
          font-size: 30px;
          font-weight: bold;
          color: #333;
          margin-right: 30px;
        }
        .time{
          font-size: 14px;
          color: #aaa;
        }
        >i{
          float: right;
          font-size: 30px;
          font-weight: bold;
          color: #666;
          line-height: 60px;
          cursor: pointer;
        }
      }
      .content{
        ul{
          padding: 20px;
          li{
            line-height: 40px;

            clear: both;
            .label{
              color: #aaa;
              float: left;
              width: 100px;
            }
            .value{
              color: #333;
              width: calc(100% - 100px);
              float: left;
              >ul{
                padding: 0;
              }
            }
          }
        }
      }
    }
    .date, .step , .desc{
      float: left;
      line-height: 60px;
      span.active{
        color: #0000cc;
      }
    }

    .desc{
      cursor: pointer;
    }
    .steps_collapse{
      .el-collapse-item__header{
        font-family: 'Arial Negreta', 'Arial';
        font-weight: 700;
        font-style: normal;
        font-size: 16px;
        &::before{
          content: '';
          display: inline-block;
          width: 3px;
          height: 16px;
          background: #159ACA;
          vertical-align: text-top;
          margin-right: 11px;
        }
      }
      .step{
        width:36px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .circle{
          width: 12px;
          height: 12px;
          border-radius: 12px;
          background: #666;
          cursor: pointer;
          z-index: 10;
          &.active{
            background: #0000cc;
          }
        }
        .line{
          height: 100%;
          width: 2px;
          position: absolute;
          background: #666;
        }
      }

    }
    /*.flex_box{*/
    /*display: flex;*/
    /*align-items: flex-start;*/
    /*height: 500px;*/
    /*border: 1px solid #000;*/
    /*width: 700px;*/
    /*flex-wrap: wrap-reverse;*/

    /*li{*/
    /*flex-basis: 120px;*/
    /*height:100px;*/
    /*&:nth-child(2n+1){*/
    /*background: green;*/
    /*}*/
    /*&:nth-child(2n+2){*/
    /*background: red;*/
    /*}*/
    /*}*/
    /*}*/
  }
</style>
