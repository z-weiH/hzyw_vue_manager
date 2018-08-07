<template>
  <div>

    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link :to="'/main/hearDropCaseList'" class="aside_tit">证据缺失案件库</router-link>
      <span class="aside_tit"> > {{item.caseOrderId}}</span>
    </div>
    <div class="item-title">
      <el-button type="primary" v-if="showBtn" class="fr" plain @click="HandleReset">重新整合</el-button>
      <el-button type="primary" v-if="showBtn" class="fr mr-15" plain @click="HandleFetch">告知客户</el-button>
      案件订单编号：{{item.caseOrderId}}
      <el-button type="warning" round class="ml-10" disabled>{{btnName}}</el-button>
    </div>
    <div class="item-table mt-5">
      <div class="baseInfo">
        <div class="baseInfo_title title">
          基本信息：
        </div>
        <el-row class="message" >
          <el-col :span="12">
            <span class="label">互金企业</span>
            <span>{{item.clientName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">产品名称</span>
            <span>{{item.productName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">被申请人姓名</span>
            <span>{{item.respondentName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">被申请人手机</span>
            <span>{{item.resPhone}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">逾期天数</span>
            <span>{{item.overdueDate}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">标的金额</span>
            <span>{{item.amtBorrow}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">推送时间</span>
            <span>{{item.pushDay}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="ourInfo" v-if="item.list && item.list.length > 0">
        <div class="baseInfo_title title">
          整合失败原因：
        </div>
        <ul class="reason_ul">
          <li v-for="(reason,index) in item.list" :key="index">{{index + 1}}.{{reason.reasonMsg}}</li>
        </ul>
      </div>


    </div>

  </div>
</template>

<script>
  import Mock from 'mockjs'
  export default {
    data() {
      return {
        item: {},
      }
    },
    computed: {
      btnName() {
        // 0-等待处理，1-正在整合，2-继续处理，3-已告知5-整合成功
        if(this.$route.query.type === 0)
          return '继续处理';
        else if(this.$route.query.type === 1)
          return '等待处理';
        else if(this.$route.query.type === 2)
          return '整合中';
        else if(this.$route.query.type === 3)
          return '已告知';
        else if(this.$route.query.type === 5)
          return '整合成功';
      },
      showBtn() {
        if(this.$route.query.type <= 2)
          return true;
        return false;
      }
    },
    methods: {
      HandleReset() {
        this.$confirm('确定开始整合？', '提示', {
          center: true,
        }).then(res => {
          this.$http.post('/failedReason/batchIntegration.htm',{list: [{caseOrderId:this.item.caseOrderId}]},{mheaders: true}).then(r => {
            if(r.code === '0000'){
              this.$message.success(r.description);
            }
          })
        }).catch(() => {});
      },
      HandleFetch() {
        this.$confirm('将现有整合失败原因告知客户？？', '提示', {
          center: true,
        }).then(() => {

        }).catch(() => {})
      },
      getEvidenceDetails(caseOrderId, type) {
        this.$http.post('/failedReason/evidenceDetails.htm',{caseOrderId: caseOrderId, type: type})
          .then(res => {
            if(res.code === '0000'){
              this.item = res.result;
              // if(this.item.reasonMsgList){
              //   this.item.ourReason = this.item.reasonMsgList.filter(it => it.failedType === 0);
              //   this.item.otherReason = this.item.reasonMsgList.filter(it => it.failedType === 1);
              // }
            }
          })
      },

    },
    mounted() {
      this.getEvidenceDetails(this.$route.query.caseOrderId, this.$route.query.type);

    }
  }
</script>

<style lang="scss" scoped>
  .item-title{
    background: #fff;
  }
  .item-table{
    .title{
      color: #13367D;
      font-weight: 500;
      font-size: 18px;
      line-height: 50px;
      margin-top: 20px;
      padding-left: 20px;
      &::before{
        content : '';
        display: inline-block;
        width: 3px;
        height: 16px;
        background-color: #0F357F;
        margin-right: 1px;
        line-height: 50px;
      }
    }
  }
  .message{
    padding: 0 20px 10px 20px ;
    background: #fff;
    font-size: 15px;
    span {
      display: inline-block;
      line-height: 30px;
    }
    .label{
      width: 100px;
      text-align: left;
      color: #7A7A7A;
    }
  }
  .reason_ul{
    padding: 0 20px 10px 20px;
    li{
      color: #666;
      font-size: 16px;
      line-height: 24px;
    }
  }
</style>
