<template>
  <div class="body_container">
    <div class="header_container">

      <div class="header">
        <el-button type="primary" class="fr mr-10 mt-20" @click="HandleAudit">审核完成</el-button>
        <span class="header_title">证据链审核</span>
        <el-checkbox class="header_checkbox" v-model="auditStatus">必要审核</el-checkbox>
      </div>
    </div>
    <div class="fix_screen">
      <span class="arrow_left"></span>
      <span class="arrow_right"></span>
    </div>
    <div class="card">
      <div class="card_header">
        <div class="fr mt-5">
          <el-button type="text">添加书签</el-button>
          <el-button type="primary" plain @click="HandleShow">审核意见</el-button>
        </div>
      </div>
      <div class="card_body">
        <div class="audit">
          <p class="audit_title">审核意见:</p>
          <ul>
            <li>32156156156313514567815631</li>
          </ul>
        </div>
        <div class="applybook_body">
          <div class="applybook_title of-hidden">
            <scroll-y class="fr" @handleClick="scrollbarClick" :options="scrollList" :defaultWidth="590"></scroll-y>
            <div class="tit fl">仲裁申请书</div>
            <div class="scroll_toolbar fr">
              <div class="ac_left"></div>
              <div class="scrollWrap">
                <!-- <span class="active">借款协议</span>
                <span>借款咨询服务协议</span>
                <span>收款证明单</span>
                <span>打款凭证</span>
                <span>债权转让协议</span>
                <span>债转通知</span> -->

              </div>
              <div class="ac_right"></div>
            </div>
          </div>
          <div class="applybook_content of-hidden">
            <div class="article_left fl">
              <img src="./../../../assets/img/pdf-0.png" alt="">
            </div>
            <div class="article_right fr">
              <img src="./../../../assets/img/pdf-1.png" alt="">
            </div>
          </div>
        </div>
      </div>

    </div>

    <audit></audit>

  </div>
</template>

<script>
  import audit from './modules/audit'
  import Mixins from '@/components/script/_mixin'
  import scrollY from "@/components/scroll-y";

  export default {
    extends: Mixins,
    data(){
      return {
        auditStatus: false,
        editState: 0,
        scrollList:[
          {
            name:'借款协议'
          },
          {
            name:'借款咨询服务协议'
          },
          {
            name:'收款证明单'
          },
          {
            name:'打款凭证'
          },
          {
            name:'债权转让协议'
          },
          {
            name:'债转通知'
          },
        ]
      }
    },
    methods: {
      HandleShow() {
        this.editState = 1;
      },
      HandleAudit() {
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('div',null,[
            h('p',null,'即将提交证据链初审结果。'),
            h('p',null,'提交后将无法修改。'),
            h('p',null,'确定提交？')
          ]),
          center: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(res => {

        }).catch(() => {})
      }
    },
    components: {
      audit,
      scrollY

    }
  }
</script>

<style lang="scss" scoped>
  $themeColor: #193b8c;
  .fix_screen {
    > span {
      display: inline-block;
      width: 89px;
      height: 89px;
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: 100% 100%;
      position: fixed;
      top: 20%;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .arrow_left {
      left: 16%;
      background-image: url(./../../../assets/img/rct_page01.png);
    }
    .arrow_right {
      right: 16%;
      background-image: url(./../../../assets/img/rct_page02.png);
    }
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
          height: 195px;
          border-collapse: collapse;
          margin-right: 20px;
          tr{
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
        margin-bottom: 28px;
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
  %_themainPadding {
    padding: 30px 0 30px 22px;
  }
  .applybook_body {
    @extend %_themainPadding;

    .applybook_title {
      font-size: 17px;
      color: $themeColor;
      padding-bottom: 30px;
      .scroll_toolbar {
        font-size: 14px;
        .active {
          border-bottom: 2px solid $themeColor;
        }
        position: relative;
        .ac_left {
          position: absolute;
          left: -20px;
          top: 0;
          bottom: 0;
          margin: auto;
          width: 8px;
          height: 13px;
          background: url(./../../../assets/img/ic20_004.png) no-repeat center;
        }
        .ac_right {
          position: absolute;
          right: -20px;
          top: 0;
          bottom: 0;
          margin: auto;
          width: 8px;
          height: 13px;
          background: url(./../../../assets/img/ic20_005.png) no-repeat center;
        }
      }
    }

    .applybook_content {
      .article_left,
      .article_right {
        width: 565px;
        height: 780px;
        border: 1px solid #9b9b9b;
        overflow: hidden;
      }
    }
  }


</style>
