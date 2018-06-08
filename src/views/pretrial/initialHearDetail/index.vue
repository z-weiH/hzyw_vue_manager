<template>
  <div>
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link :to="'/main/initialHearList'" class="aside_tit">案件初审</router-link>
      <span class="aside_tit"> > {{item.merchantName}}</span>
    </div>
    <div class="item-title">
      批次信息
    </div>
    <div >
      <el-row class="message" >
        <el-col :span="12">
          <span class="label">互金企业</span>
          <span>{{item.merchantName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">模板</span>
          <span>{{item.productName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">账龄</span>
          <span>{{item.accountAge}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">推送日期</span>
          <span>{{item.pushDate}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">案件数量</span>
          <span>{{item.caseNum}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">子批次数</span>
          <span>{{item.batchNum}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">初审人</span>
          <span>{{item.firstAuditName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">批次状态</span>
          <span>{{getLabel(item.merchantName)}}</span>
        </el-col>
      </el-row>
    </div>
    <div v-for="(info,index) in items" :key="index" class="info">
      <div class="item-title">
        子批次-{{index + 1}}
        <span>({{info.countCase}})</span>
      </div>
      <ul class="info_ul">
        <li>
            <el-button type="primary" class="fr mt-10">审核</el-button>
          <p class="info_title">身份证信息</p>
          <p v-if="info.countIdChecked === 0">审核未开始</p>
          <p v-else-if="info.countIdChecked === 100">审核已完成</p>
          <p v-else>已审核到第{{info.countIdChecked}}件</p>
        </li>
        <li>
          <el-button type="primary" class="fr mt-10">审核</el-button>
          <p class="info_title">签名信息</p>
          <p v-if="info.countSignChecked === 0">审核未开始</p>
          <p v-else-if="info.countSignChecked === 100">审核已完成</p>
          <p v-else>已审核到第{{info.countSignChecked}}件</p>
        </li>
        <li>
          <el-button type="primary" class="fr mt-10">审核</el-button>
          <p class="info_title">证据链信息</p>
          <p v-if="info.countEviChecked === 0">审核未开始</p>
          <p v-else-if="info.countEviChecked === 100">审核已完成</p>
          <p v-else>已审核到第{{info.countEviChecked}}件</p>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        batchId: '',
        item: {},
        items: []
      }
    },
    methods: {
      getBatchInfo() {
        this.$http.post('/20/firstAudit/queryBatchInfo.htm',{batchId: this.batchId}).then(res => {
          if(res.code === '0000'){
            this.item = res.result;
          }
        })
      },
      getBatchList() {
        this.$http.post('/20/firstAudit/querySubBatchList.htm', {batchId: this.batchId})
          .then(res => {
            if(res.code === '0000'){
              this.items = res.result;
            }
          })
      },
  // /firstAudit/queryBatchLog.htm
      getBatchLog(){
        this.$http.post('/20/firstAudit/queryBatchLog.htm', {batchId: this.batchId})
          .then(res => {
            if(res.code === '0000'){
              this.items = res.result;
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
      }
    },
    mounted() {
      this.batchId = this.$route.query.batchId
      this.getBatchInfo();
      this.getBatchList();
      this.getBatchLog();
    }
  }
</script>

<style lang="scss" scoped>
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
</style>
