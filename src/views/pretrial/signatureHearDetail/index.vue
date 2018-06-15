<template>
  <div class="body_container">
    <div class="header_container">
      <div class="header">
        <el-button type="primary" class="fr mr-10 mt-20" @click="HandleAudit">审核完成</el-button>
        <span class="header_title">签名审核</span>
        <el-checkbox class="header_checkbox" v-model="auditStatus">必要审核</el-checkbox>
      </div>
    </div>
    <div class="card" v-for="(sign, index) in signatureItems" :key="index">
      <div class="card_header" style="overflow: hidden">
        <div class="fr mt-5" style="position: relative;">
          <transition name="addmark" >
            <el-button class="addmark" type="text" v-if="!markflag" @click="HandleAddmark">添加书签</el-button>
          </transition>
          <transition name="bookmark" >
            <img  v-if="markflag" src="@/assets/img/bookmark.png" class="bookmark" alt="" >
          </transition>
          <el-button type="primary"  plain @click="HandleShow(sign)">审核意见</el-button>
        </div>
        <span class="header_title">{{sign.subSortNo}}/{{count}} {{sign.lender}}与{{sign.respondents}}的借款合同纠纷</span>
        <div class="header_img">
          <img src="@/assets/img/idCard.png" alt="">
          <img class="icon" src="@/assets/img/success.png" v-if="sign.idStatus === 1" alt="">
          <img class="icon" src="@/assets/img/error.png"  v-if="sign.idStatus === 2" alt="">
        </div>
        <div class="header_img">
          <img src="@/assets/img/signature.png" alt="">
          <img class="icon" src="@/assets/img/success.png" v-if="sign.signStatus === 1" alt="">
          <img class="icon" src="@/assets/img/error.png" v-if="sign.signStatus === 2" alt="">
        </div>
        <div class="header_img">
          <img src="@/assets/img/evidence.png" alt="">
          <img class="icon" src="@/assets/img/success.png" v-if="sign.eviStatus === 1" alt="">
          <img class="icon" src="@/assets/img/error.png" v-if="sign.eviStatus === 2" alt="">
        </div>
      </div>
      <div class="card_body">
        <table class="card_table">
          <tr v-for="(signopt,idx) in sign.signList" :key="idx">
            <td>签名时间</td>
            <td>{{signopt.signTime}}</td>
            <td>签名实体</td>
            <td>{{signopt.signDesc}}</td>
          </tr>
          <tr>
            <td>借款开始时间</td>
            <td>{{sign.borrowStartDate}}</td>
            <td>借款合同</td>
            <td class="colLink" @click="openWindow(sign.borrowContractUrl)">
              点击查看
            </td>
          </tr>
        </table>
        <div class="img_desc">
          <ul>
            <li v-for="(audit,i) in sign.signAuditList" :key="i">
              <img class="mr-10" src="@/assets/img/error_tag.png" v-if="audit.auditStatus == 0" alt="">
              <img class="mr-5" src="@/assets/img/success_tag.png" v-if="audit.auditStatus == 1" alt="">
              <img class="ml-5 mr-10" src="@/assets/img/warning_tag.png" v-if="audit.auditStatus == 2" alt="">
              {{audit.auditMsg}}
            </li>
          </ul>
        </div>
        <div class="audit">
          <p class="audit_title">审核意见:</p>
          <ul>
            <li v-for="(check, ii) in sign.checkSignList" :key="ii">{{check.reasonMsg}}</li>
          </ul>
        </div>
      </div>

    </div>

    <audit></audit>

  </div>
</template>

<script>
  import audit from './modules/audit'
  import Mixins from '@/components/script/_mixin'
  export default {
    extends: Mixins,
    data(){
      return {
        auditStatus: false,
        editState: 0,
        markflag: false,
        signatureItems: [],
        count: 0,
        auditLists: []
      }
    },
    methods: {
      HandleShow(sign) {
        this.$http.post('/firstAudit/queryAuditInfoByCaseId.htm',{caseId: sign.caseId,type: 1})
          .then(res => {
            if(res.code === '0000'){
              console.log(res);
              this.auditLists = res.result;
              this.editState = 1;
            }
          })
      },
      openWindow(url) {
        window.open(url, "_blank");
      },
      HandleAudit() {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('div',null,[
            h('p',null,'即将提交身份证结果。提交后讲无法修改。'),
            h('p',null,'确定提交?')

          ]),
          center: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(res => {

        }).catch(() => {})
      },
      HandleAddmark() {
        this.markflag = true;
        //接口调用
        this.$message.success('书签添加成功');
      }
    },
    components: {
      audit
    },
    mounted() {
      this.subBatchNo = this.$route.query.subBatchNo;
      this.$http.post('/firstAudit/querySignInfoByBatchNo.htm',{ subBatchNo: this.subBatchNo})
        .then(res => {
          console.log(res);
          if(res.code === '0000'){
            this.signatureItems = res.result.list;
            this.count = res.result.count;
          }
        })
    }
  }
</script>

<style lang="scss" scoped>
  .bookmark-enter-active,.addmark-enter-active {
    transition: all 0.6s ease;
  }
  .bookmark-leave-active,.addmark-leave-active {
    transition: all 0.6s ease;
  }
  .addmark-enter, .addmark-lwave-to{
    opacity: 0;
  }
  .bookmark-enter, .bookmark-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-45px);
  }
  .addmark{
    position: absolute;
    right: 110px;
  }
  .bookmark{
    height: 40px;
    vertical-align: text-top;
    margin-top: -10px;
    margin-right: 20px;
  }
  .body_container{
    background: #F7F7F7;
    height: 100%;
    .header_container{
      height: 76px;
      background: #fff;
      .header{
        width: 1200px;
        margin: 0 auto;
        height: 76px;
        .header_title{
          font-size: 28px;
          color: #193B8C;
          line-height: 76px;
          font-weight: 500;
        }
        .header_checkbox {
          margin-left: 20px;
        }
      }
    }
    .card{
      width:1200px;
      border:1px solid #E5EAEE;
      background: #fff;
      margin: 16px auto;
      .card_header{
        height: 49px;
        border-bottom: 1px solid #E5EAEE;
        background: #EEF3FF;
        padding-left: 12px;
        padding-right: 10px;
        .header_title{
          font-size: 16px;
          line-height: 50px;
          color: #13367D;
        }
        .header_img{
          display: inline-block;
          position: relative;
          img{
            vertical-align: bottom;
            margin: 0 7px;
          }
          .icon{
            position: absolute;
            bottom: -7px;
            right: -7px;
          }
        }
      }
      .card_body{
        padding: 30px 0 30px 22px;
        table, tr, td{
          border: 1px solid #E5EAEE;
          text-align: center;
        }
        .card_table{
          color: #363636;
          float: left;
          width: 768px;
          border-collapse: collapse;
          margin-right: 20px;
          tr{
            height: 49px;
            &:hover {
              background-color: #f5f7fa;
            }
            td{
              &:nth-child(odd){
                color: #7A7A7A;
              }
            }
          }
        }
        .img_desc{
          margin: 50px;
          ul{
            li{
              line-height: 38px;
              font-size: 14px;
              color: #363636;
            }
          }
        }

      }
      .audit{
        margin-top: 28px;
        .audit_title{
          font-size: 17px;
          color: #193B8C;
          margin-bottom: 10px;
        }
        ul{
          padding-left: 15px;
          li{
            font-size: 14px;
            line-height: 24px;
            color: #444;
          }
        }
      }
    }

  }

</style>
