<template>
  <div>
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link :to="'/main/initialHearList'" class="aside_tit">案件初审</router-link>
      <span class="aside_tit"> > {{item.merchantName}}</span>
    </div>
    <div class="item-title part_tit">
      批次信息
    </div>
    <div >
      <el-row class="message" >
        <el-col :span="12">
          <span class="label">互金企业</span>
          <span>{{item.clientName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">模板</span>
          <span>{{item.productName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">账龄</span>
          <span>{{item.caseAging}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">推送日期</span>
          <span>{{item.pushTime}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">案件数量</span>
          <span>{{item.countCase}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">子批次数</span>
          <span>{{item.countSubBatch}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">初审人</span>
          <span>{{item.firstAuditorName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">批次状态</span>
          <span>{{getLabel(item.batchStatus)}}</span>
        </el-col>
      </el-row>
    </div>
    <div v-for="(info,index) in items" :key="index" class="info">
      <div class="item-title part_tit">
        子批次-{{index + 1}}
        <span>({{info.countCase}}件)</span>
        <button class="title_btn ml-5" disabled>{{getStatusName(info.batchStatus)}}</button>
      </div>
      <ul class="info_ul">
        <li>
            <el-button type="primary" class="fr mt-10" @click="gotoIdCard">审核</el-button>
            <el-button type="text" class="fr mt-10" v-if="info.idStatus === 1">查看</el-button>
          <p class="info_title">身份证信息</p>
          <p v-if="info.countIdChecked === 0 && info.idStatus === 0">审核未开始</p>
          <p v-if="info.countIdChecked !== 0 && info.idStatus === 0">已审核到第{{info.countIdChecked}}件</p>
          <p v-if="info.idStatus === 1">通过{{info.countCase - info.unpassNum}}件，未通过{{info.unpassNum}}</p>
        </li>
        <li>
          <el-button type="primary" class="fr mt-10" @click="gotoSignature">审核</el-button>
          <p class="info_title">签名信息</p>
          <p v-if="info.countSignChecked === 0">审核未开始</p>
          <p v-else-if="info.countSignChecked === 100">审核已完成</p>
          <p v-else>已审核到第{{info.countSignChecked}}件</p>
        </li>
        <li>
          <el-button type="primary" class="fr mt-10" @click="gotoeEidenceWire">审核</el-button>
          <p class="info_title">证据链信息</p>
          <p v-if="info.countEviChecked === 0">审核未开始</p>
          <p v-else-if="info.countEviChecked === 100">审核已完成</p>
          <p v-else>已审核到第{{info.countEviChecked}}件</p>
        </li>
      </ul>

    </div>
    <div class="item-title part_tit">
      批次日志
    </div>
    <ul class="log_info">
      <li v-for="(log,index) in logItems" :key="index">
        <span class="log_info_time">{{log.logTime}}</span>
        <span class="log_info_desc">{{log.logMsg}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Mock from 'mockjs'
  export default {
    data() {
      return {
        batchNo: '',
        item: {},
        items: [],
        logItems: []
      }
    },
    methods: {
      //查看退回原因
      findReturnReason() {
        this.$http.post('/againAudit/querysubBatchReturnInfoByBatchNo.htm',)
      },
      getStatusName(str) {
        let options = [
          // 0-待初审，1-待复审，2-退回重审，3-预审完成
          {label: '待初审', value: 0},
          {label: '待复审', value: 1},
          {label: '退回重审', value: 2},
          {label: '预审完成', value: 3},
        ];
        let item = options.find(it => it.value == str);
        if(item)
          return item.label;
        return '--';
      },
      getBatchInfo() {
        this.$http.post('/20/firstAudit/queryBatchInfoByBatchNo.htm',{batchNo: this.batchNo}).then(res => {
          if(res.code === '0000'){

            this.item = res.result;
          }
        })
      },
      getBatchList() {
        this.$http.post('/20/firstAudit/querySubBatchList.htm', {batchNo: this.batchNo})
          .then(res => {
            if(res.code === '0000'){
              res = Mock.mock(res);
              console.log(res);
              this.items = res.result.list;
            }
          })
      },
  // /firstAudit/queryBatchLog.htm
      getBatchLog(){
        this.$http.post('/20/firstAudit/queryBatchLog.htm', {batchNo: this.batchNo})
          .then(res => {
            if(res.code === '0000'){
              this.logItems = res.result;
            }
          })
      },
      getLabel(value){
        let options= [
          {label: '待初审', value: 0},
          {label: '待复审', value: 1},
          {label: '退回重审', value: 2},
          {label: '预审完成', value: 3},
        ]
        let item = options.find(it => it.value === value);
        if(item)
          return item.label;
        return '--';
      },
      gotoIdCard() {
        // this.$router.push('/idCardHearDetail')
        let routeData = this.$router.resolve({
          path:'/idCardHearDetail',
        });
        window.open(routeData.href, '_blank');
      },
      gotoSignature() {
        let routeData = this.$router.resolve({
          path:'/signatureHearDetail',
        });
        window.open(routeData.href, '_blank');
      },
      gotoeEidenceWire() {
        let routeData = this.$router.resolve({
          path:'/evidenceWireHear',
        });
        window.open(routeData.href, '_blank');
      }
    },
    mounted() {
      this.batchNo = this.$route.query.batchNo
      this.getBatchInfo();
      this.getBatchList();
      this.getBatchLog();
    }
  }
</script>

<style lang="scss" scoped>
  $themeColor: #193b8c;
  .part_tit {
    color: $themeColor;
    padding-bottom: 20px;
    &:before {
      content: "|";
      display: inline-block;
      font-weight: bold;
      font-size: 16px;
      vertical-align: baseline;
      margin-right: 1px;
      position: relative;
      top: -2px;
    }
  }
  .title_btn{
    color: $themeColor;
    border: 1px solid #193b8c;
    padding: 7px 12px;
    border-radius: 10px;
    font-size: 16px;
    background: #fff;
  }
.message{
  padding: 10px 20px;
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
  .info{
    margin: 15px 0;
    .info_ul{
      background: #fff;
      li{
        box-sizing: border-box;
        padding:20px 30px 10px;
        height: 100px;
        border-bottom: 1px solid #E5EAEE;
        p{
          line-height: 24px;
          font-size: 14px;
          color: #666;
          &.info_title{
            line-height: 30px;
            color: #363636;
            font-weight: 700;
          }
        }
      }
    }
  }
  .log_info{
    height: 54px;
    background: #fff;

    li{
      border-bottom: 1px dotted #ccc;
      &:last-child{
        border-bottom: none;
      }
      .log_info_time{
        color: #7a7a7a;
        font-size: 14px;
        line-height: 54px;
        padding: 0 20px 0 30px;
      }
      .log_info_desc{
        font-size: 16px;
        line-height: 54px;
        color: #4e4e4e;
      }
    }
  }
</style>
