<template>
  <div class="body_container">
    <div class="header_container">
      <div class="header">
        <el-button type="primary" class="fr mr-10 mt-20" @click="HandleAudit">审核完成</el-button>
        <span class="header_title">身份证审核</span>
        <el-checkbox class="header_checkbox" v-model="auditStatus">必要审核</el-checkbox>
      </div>
    </div>
    <div class="card">
      <div class="card_header">
        <div class="fr mt-5">
          <el-button type="text">添加书签</el-button>
          <el-button type="primary" plain @click="HandleShow">审核意见</el-button>
        </div>
        <span class="header_title">1/100 的v哦i比把你的妇女i的那</span>
        <div class="header_img">
          <img src="@/assets/img/idCard.png" alt="">
          <img class="icon" src="@/assets/img/success.png" alt="">
          <img class="icon" src="@/assets/img/error.png" alt="">
        </div>
        <div class="header_img">
          <img src="@/assets/img/signature.png" alt="">
          <img class="icon" src="@/assets/img/success.png" alt="">
          <img class="icon" src="@/assets/img/error.png" alt="">
        </div>
        <div class="header_img">
          <img src="@/assets/img/evidence.png" alt="">
          <img class="icon" src="@/assets/img/success.png" alt="">
          <img class="icon" src="@/assets/img/error.png" alt="">
        </div>
      </div>
      <div class="card_body">
        <div class="img zhen">
          <pic-zoom url="static/idcard-0.png" :scale="3"></pic-zoom>
        </div>
        <div class="img fan">
          <pic-zoom url="static/idcard-1.png" :scale="3"></pic-zoom>
        </div>
        <div class="img_desc">
          <ul>
            <li>
              <img class="mr-10" src="@/assets/img/error_tag.png" alt="">
              万焕昌
            </li>
            <li>
              <img class="mr-5" src="@/assets/img/success_tag.png" alt="">
              男
            </li>
            <li>
              <img class="mr-15" src="@/assets/img/warning_tag.png" alt="">
              汗
            </li>
            <li>
              <img class="mr-10" src="@/assets/img/error_tag.png" alt="">
              阿谁都不会覅斌
            </li>
            <li>
              <img class="mr-10" src="@/assets/img/error_tag.png" alt="">
              12315641561561
            </li>
            <li>
              <img class="mr-10" src="@/assets/img/error_tag.png" alt="">
              (有效期)
            </li>
          </ul>
        </div>
        <div class="audit">
          <p class="audit_title">审核意见:</p>
          <ul>
            <li>32156156156313514567815631</li>
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
  import PicZoom from "vue-piczoom";
  export default {
    extends: Mixins,
    data(){
      return {
        auditStatus: false,
        editState: 0
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
            h('p',null,'即将提交身份证结果。提交后讲无法修改。'),
            h('p',null,'确定提交?')

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
      PicZoom
    }
  }
</script>

<style lang="scss" scoped>
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
        .img{
          float: left;
          width: 370px;
          height: 225px;
          border: 1px solid #E5EAEE;
          border-radius: 5px;
          &.zhen{
            margin-right: 17px;
          }
          &.fan{
            margin-right: 28px;
          }
        }
        .img_desc{
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
