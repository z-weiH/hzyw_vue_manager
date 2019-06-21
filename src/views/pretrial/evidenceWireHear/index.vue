<template>
  <div style="height: 100%;background: #F7F7F7">
    <el-scrollbar  style="height:100%;">
      <div class="body_container">
        <div class="header_container">

          <div class="header">
            <customer-button type="primary" class="fr mr-10 mt-20" @click="HandleAudit" v-if="!disabled">审核完成</customer-button>
            <span class="header_title">证据链审核</span>
            <!--<el-checkbox v-if="!disabled" class="header_checkbox" v-model="auditStatus">显示全部案件</el-checkbox>-->
            <!--<template v-if="disabled">-->
            <!--<el-radio v-model="passStatus" :label="0">全部</el-radio>-->
            <!--<el-radio v-model="passStatus" :label="1">已通过</el-radio>-->
            <!--<el-radio v-model="passStatus" :label="2">未通过</el-radio>-->
            <!--</template>-->
            <selectQuery ref="query" :disabled="disabled" :queryConfig="queryConfig" style="display: inline-block;"></selectQuery>
          </div>
        </div>
        <!-- 无匹配案件区域 -->
        <div class="noCase_panel" v-if="evidenceItems.length === 0">
          <div class="search_ico"></div>
          <div>没有符合要求的案件</div>
        </div>
        <!-- end -->

        <div class="card" style="position:relative;" v-for="(evidence, index) in evidenceItems" :key="index">
          <div class="fix_screen" v-if="evidenceItems.length > 0">
            <span class="arrow_left" @click="HandlePrev" :class="{disabled: canPrev}"></span>
            <span class="arrow_right" @click="HandleNext" :class="{disabled: canNext}"></span>
          </div>
          <div class="card_header" style="overflow: hidden;position: relative;">
            <div class="fr mt-5" style="position: relative" v-if="!disabled">
              <transition name="addmark" >
                <customer-button class="addmark" type="text" v-if="mark !== evidence.subSortNo" @click="HandleAddmark(evidence)">添加书签</customer-button>
              </transition>
              <transition name="bookmark">
                <img  v-if="mark === evidence.subSortNo" src="@/assets/img/bookmark.png" class="bookmark" alt="" >
              </transition>
              <customer-button type="primary"  plain @click="HandleShow(evidence)">审核意见</customer-button>
            </div>
            <div class="mt-5 rule_res" :style="{right: disabled ? '25px' : '185px'}">
              <customer-button v-if="evidence.logStatus === 1"  type="text" @click="gotourl(evidence.caseId)">查看日志</customer-button>
              <customer-button type="text" @click="HandleRuleRes(evidence)">脚本执行记录</customer-button>
            </div>
            <span class="header_title">{{evidence.subSortNo}}/{{evidence.totalCount}} {{evidence.lender}}与{{evidence.respondents}}的借款合同纠纷</span>
            <loanBillNoCopy :loanBillNo="evidence.loanBillNo"></loanBillNoCopy>
            <div class="header_img">
              <img src="@/assets/img/idCard.png" alt="">
              <img class="icon" src="@/assets/img/success.png" v-if="evidence.idStatus === 1" alt="">
              <img class="icon" src="@/assets/img/error.png"  v-if="evidence.idStatus === 2" alt="">
            </div>
            <div class="header_img">
              <img src="@/assets/img/signature.png" alt="">
              <img class="icon" src="@/assets/img/success.png" v-if="evidence.signStatus === 1" alt="">
              <img class="icon" src="@/assets/img/error.png" v-if="evidence.signStatus === 2" alt="">
            </div>
            <div class="header_img">
              <img src="@/assets/img/evidence.png" alt="">
              <img class="icon" src="@/assets/img/success.png" v-if="evidence.eviStatus === 1" alt="">
              <img class="icon" src="@/assets/img/error.png" v-if="evidence.eviStatus === 2" alt="">
            </div>
          </div>
          <div class="card_body">
            <div class="audit" v-if="evidence.checkAuditList && evidence.checkAuditList.length > 0">
              <p class="audit_title">审核意见:</p>
              <ul>
                <li v-for="(audit, idx) in evidence.checkAuditList" :index="idx">{{idx+1}}.{{audit.reasonMsg}}</li>
              </ul>
            </div>
            <div class="bdje" style="line-height: 50px;font-size: 16px;">
              <span style="color: #193b8c;font-size: 18px;">仲裁标的：</span>{{evidence.subjectAmt}}元
            </div>
            <div class="applybook_body">
              <div class="applybook_title of-hidden">
                <div class="tit fl part_tit f_18">仲裁申请书</div>
                <div class="scroll_toolbar fr">
                  <ul>
                    <li class="fl evi_bar" :class="{active: currentUrl.indexOf(eviDetail.eviFileurl) == 0}" v-for="(eviDetail,idx) in evidence.eviDetailList" :index="idx" @click="scrollbarClick(eviDetail)">{{eviDetail.eviTitle}}</li>
                  </ul>
                  <!-- <scroll-y label="eviTitle" @handleClick="scrollbarClick" :options="evidence.eviDetailList" :defaultWidth="520"></scroll-y> -->
                </div>
              </div>
              <div class="applybook_content of-hidden">
                <div class="article_left fl">
                  <!--<pdf :src="evidence.applicationUrl"></pdf>-->
                  <iframe  :src="'/static/pdfjs/web/viewer.html?file=' + applicationUrl" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
                </div>
                <div  ref="evidenceWarper" class="article_right fr">
                  <iframe ref="evidence" v-if="checkPdf(currentUrl)"  :src="'/static/pdfjs/web/viewer.html?file=' + currentUrl.replace(/http:|https:/g,'') + '?'" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
                  <div ref="imgEvi" style="overflow: auto;width:100%;height:100%;" v-else><img style="cursor: move;position: relative;width:100%;" :src="currentUrl.replace(/http:|https:/g,'')" alt=""></div>
                </div>
              </div>
            </div>
          </div>


          <!-- 隐藏的 iframe 用于浏览器 ctrl + f 预加载 -->
					<!-- <div class="fn-hide">
						<li v-for="(eviDetail,idx) in evidence.eviDetailList" :key="idx">
							<iframe class="fline-lalal" :src="eviDetail.eviFileurl"></iframe>
						</li>
					</div> -->
        </div>


        <div class="pagination clear" v-if="evidenceItems.length > 0">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pager.currentNum"
            :page-size="1"
            layout="prev, pager, next, jumper, total"
            :total="pager.total">
          </el-pagination>
        </div>

      </div>
    </el-scrollbar>

    <audit ref="audit"  :type="2"></audit>

    <closeDlg :message="'已完成证据链审核，请关闭本页'"  v-if="showCloseDlg"></closeDlg>
    <ruleResult ref="ruleResult"></ruleResult>

    <backTop className=".el-scrollbar__wrap"></backTop>
  </div>
</template>

<script>
  import ruleResult from '../idCardHearDetail/modules/ruleResult'
  import audit from '../signatureHearDetail/modules/audit'
  import Mixins from '@/components/script/_mixin'
  import scrollY from "@/components/scroll-y";
  import closeDlg from '@/components/closeDlg';
  import imgEvi from '@/components/script/imgEvi';
  import selectQuery from '../signatureHearDetail/modules/selectQuery'
  import loanBillNoCopy from '../idCardHearDetail/modules/loanBillNoCopy'
  import backTop from '@/components/backTop.vue'
  export default {
    extends: Mixins,
    mixins:[imgEvi],
    data(){
      return {
        eviCode : '',
        //申请书 url
        applicationUrl: '',

        //查询条件
        queryConfig:{},
        keyWords:'',

        auditStatus: 0,
        passStatus: 0,//查看状态
        editState: 0,
        count: 0,
        correctionStatus: '',//修正數
        disabled: false,
        evidenceItems: [],
        currentCaseId: '', //当前案件
        auditLists: [], // 可选原因
        scrollList:[],
        showCloseDlg: false,
        batchNo: '',
        pager: {
          currentNum: 1,
          total: 1,
          pageSize: 1
        },
        currentUrl: '',
        selfflag: 0,
        caseId: ''
      }
    },
    // watch: {
    //   auditStatus(val) {
    //     this.HandleQuery();
    //   },
    //   passStatus(val){
    //     this.HandleQuery();
    //   }
    // },
    computed: {
      mark() {
        if(!this.selfflag)
          return this.markflag;
        return this.selfflag;
      },
      canNext() {
        if(this.pager.currentNum < this.pager.total)
          return false;
        return true;
      },
      canPrev() {
        if(this.pager.currentNum > 1)
          return false;
        return true;
      }
    },
    methods: {

      gotourl(caseId){
        const href = this.$router.resolve({path: 'hearCaseListDetail', query: {caseId: caseId , log: true}}).href;
        window.open(href, "_blank");
      },
      //机审规则
      HandleRuleRes(card){
        // this.$http.post("/againAudit/machineWhoseRules.htm",{caseId:card.caseId}).then(res => {
        this.$refs.ruleResult.show(card.caseId);

      },
      //判斷是否是視頻
      checkMovie(url){
        let idx = url.lastIndexOf('.');
        let str = url.substr(idx+1);
        let arr = ["avi","mkv","mov","mp4","rmvb"];
        return arr.indexOf(str) != -1;
      },

      //判断文件是否是pdf
      checkPdf(url){
        if(url.substr(url.length-3).toLowerCase() == 'pdf' || this.checkMovie(url)){
          return true;
        }
        return false;
      },
      scrollbarClick(e) {
        console.log(e);
        this.currentUrl = e.eviFileurl;
        this.eviCode = e.eviCode || '';
        if(this.currentUrl.substr(this.currentUrl.length-3) == 'png' || this.currentUrl.substr(this.currentUrl.length-3) == 'jpg' || this.currentUrl.substr(this.currentUrl.length-4) == 'jpeg' ){
            const img = document.createElement('img');
            img.onload=(e)=>{
              console.log(e.path[0].width);
              let bl = (660/e.path[0].width) * 100;
              console.log(bl.toFixed(0));
              this.currentUrl += `?x-oss-process=image/auto-orient,1`;
            }
            img.src=e.eviFileurl;
        }
      },
      HandleShow(evidence) {
        this.$http.post('/firstAudit/queryAuditInfoByCaseId.htm',{caseId: evidence.caseId,type: 2})
          .then(res => {
            if(res.code === '0000'){
              this.$http.post('/firstAudit/queryAuditReasonByClientCode.htm', {caseId: evidence.caseId,type: 2, clientCode: this.evidenceItems[0].clientCode}).then(res1 => {
                console.log(res1);
                let obj = {
                  clientName: this.evidenceItems[0].clientName,
                  status: res1.result.status,
                  publicRes: res.result,
                  privateRes: res1.result.suggestions,
                  caseId: evidence.caseId
                }
                this.$refs.audit.showInit(obj);

              })
              // this.activeItem = {mmmType : 'zjl' , ...evidence};
              // console.log(res);
              // this.auditLists = res.result;
              // this.editState = 1;
              // this.currentCaseId = evidence.caseId;
            }
          })
      },
      HandleAudit() {
        const h = this.$createElement;
        let instance;
        this.$msgbox({
          title: '提示',
          message: h('div',null,[
            h('p',null,'即将提交证据链初审结果。提交后将无法修改。'),
            h('p',null,'确定提交？')
          ]),
          center: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            instance = instance;
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '提交中';
            } else {
            }
          }
        }).then(res => {
          this.$http.post('/firstAudit/idCardFirstAuditFinished.htm',{subBatchNo: this.subBatchNo,type: 2})
            .then(r =>{
              instance = false;
              if(r.code === '0000'){
                this.showCloseDlg = true;
                window.opener.location.reload();

                // this.$store.dispatch('updateAuditItems',{batchNo: this.batchNo});
              }
            }).catch(() => {
              instance = false;
            });
        }).catch(() => {})
      },
      HandleAddmark(evidence) {
        //接口调用
        console.log(this.selfflag,this.mark)
        this.$http.post('/firstAudit/addMark.htm',{subBatchNo: this.subBatchNo, subSortNo: evidence.subSortNo, type: 2})
          .then(res => {
            if(res.code === '0000'){
              console.log(res,evidence);
              this.selfflag = evidence.subSortNo;
              this.$message.success('书签添加成功');
              //改变url
              let baseUrl = this.$router.currentRoute.fullPath.split('markflag')[0] + 'markflag='+evidence.subSortNo;
              console.log(baseUrl);
              this.$router.push(baseUrl);
              // window.opener.history.go(0);
              window.opener.location.reload();

            }
          })
      },
      HandlePrev() {
        if(!this.canPrev){
          this.pager.currentNum-- ;
          this.HandleQuery();
        }
      },
      HandleNext() {
        if(!this.canNext){
          this.pager.currentNum++ ;
          this.HandleQuery();
        }
      },
      handleCurrentChange(page) {
        this.pager.currentNum = page;
        this.HandleQuery();
      },
      HandleQuery() {
        const loading =this.$loading({
          lock: true,
          text: '拼命加载中',
          fullscreen: true,
          lock: true,
          background: "hsla(0,0%,100%,.9)"
        });
        let obj={};
        if(this.caseId){
          Object.assign(obj,
            { subBatchNo: this.subBatchNo, auditStatus: +this.auditStatus ,passStatus: +this.passStatus,keyWords: this.keyWords,correctionStatus: this.correctionStatus,caseId:this.caseId},
            this.pager
          )
        }
        else if(!this.disabled){
          Object.assign(obj,
            { subBatchNo: this.subBatchNo, auditStatus: +this.auditStatus ,passStatus: +this.passStatus,keyWords: this.keyWords,correctionStatus: this.correctionStatus},
            this.pager
          )
        }else{
          Object.assign(obj,
            { subBatchNo: this.subBatchNo, passStatus: +this.passStatus,keyWords: this.keyWords ,correctionStatus: this.correctionStatus},
            this.pager
          )
        }
        this.$http.post('/firstAudit/queryEviInfoByBatchNo.htm',obj)
          .then(res => {
            console.log(res);
            if(res.code === '0000'){
              this.evidenceItems = res.result.list;
              this.count = res.result.totalCount;
              this.pager.total = res.result.count;
              if(this.pager.currentNum > res.result.count){
                this.pager.currentNum = res.result.count;
              }
              console.log(this.evidenceItems)
              this.$set(this.queryConfig,'count',res.result.count);


              if(this.evidenceItems.length > 0){
                this.applicationUrl = this.evidenceItems[0].applicationUrl.replace(/http:|https:/g,'')+'?timestamp='+ new Date().getTime();
                this.currentUrl = this.evidenceItems[0].eviDetailList[0].eviFileurl;
              }
              // this.scrollList =

              this.queryRespondentInfoByCaseId(res.result.list[0].caseId).then(res => {
                console.log(res);
                res.result.forEach(it => {
                  //当事人类型：0申请人1被申请人 private Integer resLtype;
                  //证件类型 0身份证 1营业执照 private Integer resType;
                  if(it.resLtype === 0){
                    if(it.resType === 0){
                      this.evidenceItems[0].eviDetailList.push(...[{eviTitle: '申请人身份证正面', eviFileurl: it.img02}, {eviTitle: '申请人身份证反面', eviFileurl: it.img01}])
                    }else{
                      this.evidenceItems[0].eviDetailList.push({eviTitle: '申请人营业执照', eviFileurl: it.img01});
                    }
                  }else{
                    // if(it.resType)
                    const flag = res.result.filter(i => i.resLtype === 1).length > 1;
                    if(it.resType === 0){
                      this.evidenceItems[0].eviDetailList.push(...[{eviTitle: `被申请人${flag ? '（' + it.resName + '）': ''}身份证正面`, eviFileurl: it.img02}, {eviTitle: `被申请人${flag ? '（' + it.resName + '）': ''}身份证反面`, eviFileurl: it.img01}])
                    }else {
                      this.evidenceItems[0].eviDetailList.push({eviTitle: `被申请人${flag ? '（' + it.resName + '）': ''}营业执照`, eviFileurl: it.img01});
                    }
                  }
                })
                console.log(this.evidenceItems[0].eviDetailList);

              });
            }
            loading.close();
          }).catch(() => {
          loading.close();
        })
      },
      //初审身份证、签名、证据链搜索是案件数量统计接口
      handleCountQuery(item){
        this.$http.post('/firstAudit/countAuditCaseByBaseQuery.htm',item).then(res =>{
          if(res.code === '0000'){
            Object.keys(res.result).forEach(key => {
              this.queryConfig[key] = res.result[key];
            })
          }
        })
      }
    },
    components: {
      audit,
      scrollY,
      closeDlg,
      selectQuery,
      ruleResult,
      loanBillNoCopy,
      backTop,
    },
    mounted() {
      this.subBatchNo = this.$route.query.subBatchNo;
      this.markflag = +this.$route.query.markflag;
      this.disabled = Boolean(this.$route.query.disabled);
      this.batchNo = this.$route.query.batchNo;
      this.caseId = this.$route.query.caseId;
      this.handleCountQuery({check: this.disabled ? 0 : 1,subBatchNo:this.subBatchNo, type: 3 });
      this.pager.currentNum = Math.ceil(this.markflag/1);
      if(this.pager.currentNum === 0)
        this.pager.currentNum = 1;
      this.HandleQuery();
    }
  }
</script>

<style lang="scss" scoped>
  .rule_res{
    position: absolute;
    top: 0;

  }
  $themeColor: #193b8c;
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
  .part_tit {
    color: $themeColor;
    padding-bottom: 20px;
    &:before {
      content: "|";
      display: inline-block;
      font-weight: bold;
      font-size: 16px;
      vertical-align: baseline;
      margin-right: 5px;
      position: relative;
      top: -2px;
    }
  }
  .fix_screen {
    > span {
      display: inline-block;
      width: 89px;
      height: 89px;
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: 100% 100%;
      position: absolute;
      top: 20%;
      cursor: pointer;
      z-index: 9999;
      &:hover {
        opacity: 0.8;
      }
    }
    .arrow_left {
      top:50%;
      left: 0px;
      background-image: url(./../../../assets/img/rct_page01.png);
    }
    .arrow_right {
      top:50%;
      right: 0px;
      background-image: url(./../../../assets/img/rct_page02.png);
    }
    .arrow_left.disabled{
      cursor: not-allowed;
    }
    .arrow_right.disabled{
      cursor: not-allowed;
    }
  }
  .body_container{
    background: #F7F7F7;
    height: 100%;
    .header_container{
      height: 76px;
      background: #fff;
      .header{
        width: 1366px;
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
      width:1366px;
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
        padding: 30px 30px 30px 22px;
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

    .applybook_title {
      font-size: 17px;
      color: $themeColor;
      padding-bottom: 13px;
      .scroll_toolbar {
        font-size: 14px;
        width: 645px;
        overflow: auto;
        max-height: 150px;
        .evi_bar{
          cursor: pointer;
          line-height: 24px;
          margin-right: 10px;
          border-bottom: 2px solid transparent;
        }
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
        width: 645px;
        height: 780px;
        border: 1px solid #9b9b9b;
        overflow: hidden;
      }
    }

  }
  .pagination{
    margin: 20px auto;
    box-sizing: border-box;
    border: 1px solid #E5EAEE;
    width: 1366px;
    padding: 10px 20px;
    background: #fff;
  }
  .noCase_panel {
    width: 382px;
    font-size: 30px;
    color: #858585;
    margin: 186px auto 0;
    .search_ico {
      width: 112px;
      height: 73px;
      background-size: 100%;
      background-image: url(./../../../assets/img/nocase.png);
      background-repeat: no-repeat;
    }
    > div {
      display: table-cell;
      vertical-align: middle;
    }
  }

</style>
