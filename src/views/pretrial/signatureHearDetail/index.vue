<template>
  <div>
    <div class="body_container">
      <div class="header_container">
        <div class="header">
          <el-button type="primary" class="fr mr-10 mt-20" @click="HandleAudit" v-if="!disabled">审核完成</el-button>
          <span class="header_title">签名审核</span>
          <el-checkbox v-if="!disabled" class="header_checkbox" v-model="auditStatus">必要审核</el-checkbox>
          <template v-if="disabled">
            <el-radio v-model="auditStatus" :label="0">全部</el-radio>
            <el-radio v-model="auditStatus" :label="1">已通过</el-radio>
            <el-radio v-model="auditStatus" :label="2">未通过</el-radio>
          </template>
        </div>
      </div>
      <div class="card" v-for="(sign, index) in signatureItems" :key="index" :ref="sign.subSortNo">
        <div class="card_header" style="overflow: hidden">
          <div class="fr mt-5" style="position: relative;" v-if="!disabled">
            <transition name="addmark" >
              <el-button class="addmark" type="text" v-if="mark !== sign.subSortNo" @click="HandleAddmark(sign)">添加书签</el-button>
            </transition>
            <transition name="bookmark" >
              <img  v-if="mark === sign.subSortNo" src="@/assets/img/bookmark.png" class="bookmark" alt="" >
            </transition>
            <el-button type="primary"  plain @click="HandleShow(sign)">审核意见</el-button>
          </div>
          <span class="header_title">{{sign.subSortNo}}/{{sign.totalCount}} {{sign.lender}}与{{sign.respondents}}的借款合同纠纷</span>
          <div class="header_img">
            <img src="@/assets/img/idCard.png" alt="">
            <img class="icon" src="@/assets/img/success.png" v-if="sign.status1 === 1" alt="">
            <img class="icon" src="@/assets/img/error.png"  v-if="sign.status1 === 2" alt="">
          </div>
          <div class="header_img">
            <img src="@/assets/img/signature.png" alt="">
            <img class="icon" src="@/assets/img/success.png" v-if="sign.status2 === 1" alt="">
            <img class="icon" src="@/assets/img/error.png" v-if="sign.status2 === 2" alt="">
          </div>
          <div class="header_img">
            <img src="@/assets/img/evidence.png" alt="">
            <img class="icon" src="@/assets/img/success.png" v-if="sign.status3 === 1" alt="">
            <img class="icon" src="@/assets/img/error.png" v-if="sign.status3 === 2" alt="">
          </div>
        </div>
        <div class="card_body">
          <table class="card_table fl">
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
          <div class="img_desc fr">
            <ul>
              <li v-for="(audit,i) in sign.signAuditList" :key="i">
                <img class="mr-10" src="@/assets/img/error_tag.png" v-if="audit.auditStatus == 0" alt="">
                <img class="mr-5" src="@/assets/img/success_tag.png" v-if="audit.auditStatus == 1" alt="">
                <img class="ml-5 mr-10" src="@/assets/img/warning_tag.png" v-if="audit.auditStatus == 2" alt="">
                {{audit.auditMsg}}
              </li>
            </ul>
          </div>
          <div class="audit clear " v-if="sign.checkSignList.length > 0">
            <p class="audit_title">审核意见:</p>
            <ul>
              <li v-for="(check, ii) in sign.checkSignList" :key="ii">{{check.reasonMsg}}</li>
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
      <audit :selValue="selValue" :caseId="currentCaseId" :type="1"></audit>

    </div>

    <closeDlg :message="'已完成签名审核，请关闭本页'" v-if="showCloseDlg"></closeDlg>
  </div>

</template>

<script>
  import audit from './modules/audit'
  import Mixins from '@/components/script/_mixin'
  import closeDlg from '@/components/closeDlg';
  export default {
    extends: Mixins,
    data(){
      return {
        auditStatus: 0,
        editState: 0,
        markflag: 0,
        selfflag: null,
        signatureItems: [],
        count: 0,
        batchNo: '',
        auditLists: [],
        currentCaseId: '',//当前案件
        disabled: false, //控制编辑状态     true为查看， false为审核
        showCloseDlg: false,
        pager: {
          currentNum: 1,
          total: 1,
          pageSize: 20
        },
        selValue: null
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
      //意见审核
      HandleShow(sign) {
        this.$http.post('/firstAudit/queryAuditInfoByCaseId.htm',{caseId: sign.caseId,type: 1})
          .then(res => {
            if(res.code === '0000'){
              console.log(res);
              this.auditLists = res.result;
              this.editState = 1;
              this.currentCaseId = sign.caseId;
              this.selValue = sign.signStatus;
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
          this.$http.post('/firstAudit/idCardFirstAuditFinished.htm',{subBatchNo: this.subBatchNo,type: 1})
            .then(r =>{
              if(r.code === '0000'){
                this.showCloseDlg = true;
                console.error("updateAuditItems");
                window.opener.history.go(0);
                // this.$store.dispatch('updateAuditItems',{batchNo: this.batchNo});
              }
            })
        }).catch(() => {})
      },
      HandleAddmark(sign) {
        //接口调用
        console.log(this.selfflag,this.mark)
        this.$http.post('/firstAudit/addMark.htm',{subBatchNo: this.subBatchNo, subSortNo: sign.subSortNo, type: 1})
          .then(res => {
            if(res.code === '0000'){
              console.log(res);
              this.selfflag = sign.subSortNo;
              this.$message.success('书签添加成功');
            }
          })
      },
      handleCurrentChange(page) {
        this.pager.currentNum = page;
        this.HandleQuery();
      },
      HandleQuery(mark) {
        this.$http.post('/firstAudit/querySignInfoByBatchNo.htm',Object.assign({ subBatchNo: this.subBatchNo,auditStatus: +this.auditStatus},{}))
          .then(res => {
            console.log(res);
            if(res.code === '0000'){
              this.signatureItems = res.result.list;
              this.count = res.result.totalCount;
              this.pager.total = res.result.count;
              if(mark){
                setTimeout(() => {
                  console.log(this.$refs)
                },500)
              }
            }
          })
      }
    },
    components: {
      audit,
      closeDlg
    },
    mounted() {
      this.subBatchNo = this.$route.query.subBatchNo;
      this.markflag = +this.$route.query.markflag;
      this.disabled = this.$route.query.disabled;
      this.batchNo = this.$route.query.batchNo;
      this.pager.currentNum = Math.ceil(this.markflag/20);
      if(this.pager.currentNum === 0)
        this.pager.currentNum = 1;
      //查询 和  标签定位
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
    &::after{
      content: '';
      display: block;
      clear:both;
    }
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
      overflow: hidden;
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
        padding-top: 28px;
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
