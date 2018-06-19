<template>
  <div class="body_container">
    <div class="header_container">
      <div class="header">
        <el-button type="primary" class="fr mr-10 mt-20" @click="HandleAudit">审核完成</el-button>
        <span class="header_title">身份证审核</span>
        <el-checkbox v-if="!disabled" class="header_checkbox" v-model="auditStatus">必要审核</el-checkbox>
        <template v-if="disabled">
          <el-radio v-model="auditStatus" :label="0">全部</el-radio>
          <el-radio v-model="auditStatus" :label="1">已通过</el-radio>
          <el-radio v-model="auditStatus" :label="2">未通过</el-radio>
        </template>
      </div>
    </div>
    <div class="card" v-for="(card, index) in idCardList" :key="index">
      <div class="card_header" style="overflow: hidden">
        <div class="fr mt-5" style="position: relative;" v-if="!disabled">
          <transition name="addmark">
            <el-button class="addmark" type="text" v-if="mark !== card.subSortNo" @click="HandleAddmark(card)">添加书签</el-button>
          </transition>
          <transition name="bookmark" >
            <img  v-if="mark === card.subSortNo" src="@/assets/img/bookmark.png" class="bookmark" alt="" >
          </transition>
          <el-button type="primary"  plain @click="HandleShow(card)">审核意见</el-button>
        </div>
        <span class="header_title">{{card.subSortNo}}/{{card.countCase}} {{card.personWrap.applicant}}与{{card.personWrap.respondent}}的借款合同纠纷</span>
        <div class="header_img">
          <img src="@/assets/img/idCard.png" alt="">
          <img class="icon" src="@/assets/img/success.png" v-if="card.idStatus === 1" alt="">
          <img class="icon" src="@/assets/img/error.png" v-if="card.idStatus === 2" alt="">
        </div>
        <div class="header_img">
          <img src="@/assets/img/signature.png" alt="">
          <img class="icon" src="@/assets/img/success.png" v-if="card.signStatus === 1" alt="">
          <img class="icon" src="@/assets/img/error.png" v-if="card.signStatus === 2" alt="">
        </div>
        <div class="header_img">
          <img src="@/assets/img/evidence.png" alt="">
          <img class="icon" src="@/assets/img/success.png" v-if="card.eviStatus === 1" alt="">
          <img class="icon" src="@/assets/img/error.png" v-if="card.eviStatus === 2" alt="">
        </div>
      </div>
      <div class="card_body">
        <div class="img zhen">
          <pic-zoom :url="card.respondentInfo.image01" :scale="3"></pic-zoom>
        </div>
        <div class="img fan">
          <pic-zoom :url="card.respondentInfo.image02" :scale="3"></pic-zoom>
        </div>
        <div class="img_desc">
          <ul>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.nameStatus === 0"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.nameStatus === 1" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.nameStatus === 2" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resName}}
            </li>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.sexStatus === 0"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.sexStatus === 1" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.sexStatus === 2" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resSex === 0 ? '女' : '男'}}
            </li>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.nationStatus === 0"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.nationStatus === 1" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.nationStatus === 2" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resNation}}
            </li>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.idaddressStatus === 0"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.idaddressStatus === 1" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.idaddressStatus === 2" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resIdaddress}}
            </li>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.idcardStatus === 0"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.idcardStatus === 1" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.idcardStatus === 2" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resIdcard}}
            </li>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.effctDateStatus === 0"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.effctDateStatus === 1" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.effctDateStatus === 2" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resEffctDate}}
            </li>
          </ul>
        </div>
        <div class="audit" v-if="card.auditListWrap && card.auditListWrap.length > 0">
          <p class="audit_title">审核意见:</p>
          <ul>
            <li v-for="(msg,index) in card.auditListWrap">
              {{msg.reasonMsg}}
            </li>
          </ul>
        </div>
      </div>

    </div>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pager.currentNum"
        :page-size="20"
        layout="prev, pager, next, jumper, total"
        :total="pager.total">
      </el-pagination>
    </div>

    <audit :caseId="currentCaseId" :type="0"></audit>
    <closeDlg :message="'已完成身份证审核，请关闭本页'" v-if="showCloseDlg"></closeDlg>
  </div>
</template>

<script>
  import audit from '../signatureHearDetail/modules/audit'
  import Mixins from '@/components/script/_mixin'
  import PicZoom from "vue-piczoom";
  import closeDlg from '@/components/closeDlg';
  export default {
    extends: Mixins,
    data(){
      return {
        auditStatus: 0,
        editState: 0,
        markflag: false,
        subBatchNo: '',
        idCardList: [],
        currentCaseId: '',//当前案件
        disabled: false,//能否编辑
        selfflag: 0, //新书签
        showCloseDlg: false,//
        auditLists: [],
        pager: {
          currentNum: 1,
          pageSize: 20,
          count: 0,
        }
      }
    },
    computed: {
      mark() {
        if(!this.selfflag)
          return this.markflag;
        return this.selfflag;
      }
    },
    watch: {
      auditStatus(val,oldVal){
        this.HandleQuery();
      }
    },
    methods: {
      HandleShow(card) {
        this.$http.post('/firstAudit/queryAuditInfoByCaseId.htm',{caseId: card.caseId,type: 0})
          .then(res => {
            if(res.code === '0000'){
              this.auditLists = res.result;
              this.editState = 1;
              this.currentCaseId = card.caseId;
            }
          })
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
          this.$http.post('/firstAudit/idCardFirstAuditFinished.htm',{subBatchNo: this.subBatchNo,type: 0})
            .then(r =>{
              if(r.code === '0000'){
                this.showCloseDlg = true;
              }
            })
        }).catch(() => {})
      },
      HandleAddmark(card) {
        //接口调用
        console.log(this.selfflag,this.mark)
        this.$http.post('/firstAudit/addMark.htm',{subBatchNo: this.subBatchNo, subSortNo: card.subSortNo, type: 0})
          .then(res => {
            if(res.code === '0000'){
              console.log(res);
              this.selfflag = card.subSortNo;
              this.$message.success('书签添加成功');
            }
          })
      },
      handleCurrentChange(page) {
        this.pager.currentNum = page;
        this.HandleQuery();
      },
      HandleQuery(mark) {
        this.$http.post('/firstAudit/queryIdcardsBySubBatchNo.htm',Object.assign({ subBatchNo: this.subBatchNo,auditStatus: this.auditStatus},this.pager))
          .then(res => {
            console.log(res);
            if(res.code === '0000'){
              this.idCardList = res.result.list;
              this.count = res.result.count;
              this.pager.total = res.result.count;
              if(mark){
                setTimeout(() => {
                  console.log(this.$refs[this.markflag])
                },500)
              }
            }
          })
      }
    },
    components: {
      audit,
      PicZoom,
      closeDlg
    },
    mounted() {
      this.subBatchNo = this.$route.query.subBatchNo;
      this.markflag = this.$route.query.markflag;
      this.HandleQuery(true);
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
    .pagination{
      margin: 20px auto;
      box-sizing: border-box;
      border: 1px solid #E5EAEE;
      width: 1200px;
      padding: 10px 20px;
      background: #fff;
    }

  }

</style>
