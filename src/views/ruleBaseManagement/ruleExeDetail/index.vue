<template>
  <div class="body_container">
    <div class="header_container">

      <div class="header">
        <el-button type="primary" class="fr mr-10 mt-20" @click="HandleAudit" v-if="!disabled">采纳已选规则的审核意见</el-button>
        <span class="header_title">案件详情</span>

      </div>
    </div>


    <div class="card" style="position:relative;" v-for="(evidence, index) in evidenceItems" :key="index">
      <div class="fix_screen" v-if="evidenceItems.length > 0">
        <span class="arrow_left" @click="HandlePrev" :class="{disabled: canPrev}"></span>
        <span class="arrow_right" @click="HandleNext" :class="{disabled: canNext}"></span>
      </div>
      <div class="card_header" style="overflow: hidden;position: relative;">

        <span class="header_title">
          {{evidence.lender}}与{{evidence.respondents}}的借款合同纠纷
          <i>{{evidence.exameStatus === 1 ? '已核对' : '未核对'}}</i>
        </span>
        <p>
          <span>{{pager.currentNum}}/{{pager.total}}</span>
          <span>案件编号：{{evidence.loanBillNo}}</span>
          <span>案件状态：{{caseStatusName(evidence.caseStatus)}}</span>
        </p>

      </div>
      <div class="card_body">
        <div class="applybook_body">
          <div class="applybook_title of-hidden">
            <div class="tit fl part_tit f_18">仲裁申请书</div>
            <div class="scroll_toolbar fr">
              <ul>
                <li class="fl evi_bar" :class="{active: eviDetail.eviFileurl == currentUrl}" v-for="(eviDetail,idx) in evidence.eviDetailList" :index="idx" @click="scrollbarClick(eviDetail)">{{eviDetail.eviTitle}}</li>
              </ul>
            </div>
          </div>
          <div class="applybook_content of-hidden">
            <div class="article_left fl">
              <iframe  :src="evidence.applicationUrl" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
            </div>
            <div  ref="evidenceWarper" class="article_right fr">
              <iframe ref="evidence" v-if="checkPdf(currentUrl)"  :src="currentUrl" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
              <div ref="imgEvi" style="overflow: auto;width:100%;height:100%;" v-else><img style="cursor: move;position: relative;" :src="currentUrl" alt=""></div>
            </div>
          </div>
        </div>
      </div>



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

    <closeDlg :message="'已完成证据链审核，请关闭本页'"  v-if="showCloseDlg"></closeDlg>
  </div>
</template>

<script>
  import Mixins from '@/components/script/_mixin'
  import scrollY from "@/components/scroll-y";
  import closeDlg from '@/components/closeDlg';
  export default {
    extends: Mixins,
    data(){
      return {
        //查询条件
        queryConfig:{},
        keyWords:'',

        auditStatus: 0,
        passStatus: 0,//查看状态
        editState: 0,
        count: 0,
        correctionStatus: 1,//修正數
        disabled: false,
        evidenceItems: [],
        currentCaseId: '', //当前案件
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
        exeId: 0
      }
    },
    computed: {
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

      caseStatusName(status){
        if(status === 0)
          return '待分配';
        else if(status === 1)
          return '待初审';
        else if(status === 2)
          return '待复审';
        else if(status === 3)
          return '退回重审';
        else if(status === 4)
          return '预审通过';
        else if(status === 5)
          return '预审未通过';
        else if(status === 6)
          return '立案申请成功';
        else if(status === 7)
          return '立案申请失败';
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
        if(url.substr(url.length-3) == 'pdf' || this.checkMovie(url)){
          return true;
        }
        return false;
      },
      scrollbarClick(e) {
        console.log(e);
        this.currentUrl = e.eviFileurl;
      },
      HandleShow(evidence) {
        this.$http.post('/firstAudit/queryAuditInfoByCaseId.htm',{caseId: evidence.caseId,type: 2})
          .then(res => {
            if(res.code === '0000'){
              this.activeItem = {mmmType : 'zjl' , ...evidence};
              console.log(res);
              this.auditLists = res.result;
              this.editState = 1;
              this.currentCaseId = evidence.caseId;
            }
          })
      },
      HandleAudit() {
        const h = this.$createElement;
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
        }).then(res => {
          this.$http.post('/firstAudit/idCardFirstAuditFinished.htm',{subBatchNo: this.subBatchNo,type: 2})
            .then(r =>{
              if(r.code === '0000'){
                this.showCloseDlg = true;
                window.opener.location.reload();

                // this.$store.dispatch('updateAuditItems',{batchNo: this.batchNo});
              }
            })
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
        this.$http.post('/ruleCase/queryRuleExeResultByBaseQuery.htm',{exeId: this.exeId,...this.pager})
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
                this.currentUrl = this.evidenceItems[0].eviDetailList[0].eviFileurl;
              }
              // this.scrollList =


            }
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
      scrollY,
      closeDlg,
    },
    mounted() {
      this.exeId = this.$route.query.exeId;
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
      top:20%;
      left: 0px;
      background-image: url(./../../../assets/img/rct_page01.png);
    }
    .arrow_right {
      top:20%;
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
        height: 70px;
        border-bottom: 1px solid #E5EAEE;
        background: #EEF3FF;
        padding-left: 12px;
        padding-right: 10px;
        .header_title{
          font-size: 16px;
          line-height: 50px;
          color: #13367D;
          i{
            font-size: 12px;
            position: relative;
            top: -7px;
            color: #fff;
            padding: 2px 5px;
            background:#0F357F;
          }
        }
        p{
          color: #999;
          span{
            margin-right: 20px;
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
        width: 645px;
        font-size: 14px;
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
