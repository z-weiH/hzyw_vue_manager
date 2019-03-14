<template>
  <el-scrollbar style="height:100%;">
    <div class="body_container">
      <div class="header_container">

        <div class="header">
          <el-button type="primary" class="fr mr-10 mt-20" @click="HandleAudit" v-if="evidenceItems.length > 0 && !evidenceItems[0].takeEffectStatus">采纳已选规则的审核意见</el-button>
          <span class="fr mr-10 mt-20" v-if="evidenceItems.length > 0 && evidenceItems[0].takeEffectStatus" style="color: #999;font-size: 16px;line-height: 38px;">审核意见已采纳</span>
          <span class="header_title">案件详情</span>

          <div class="select_parent" >
          <span class="select_box" @click="showQueryHandle">
          <b style="padding-right: 20px;">筛选案件({{queryConfig.count}})</b>
           <i :class="{'el-icon-arrow-down': !showQuery,'el-icon-arrow-up': showQuery}"></i>
          </span>
            <div class="query_box" v-if="showQuery">
              <div class="form" style="padding: 10px;">
                <div style="line-height: 30px;" >
                  <span class="form_desc">执行结果</span>
                  <el-radio-group v-model="searchItem.exeStatus" >
                    <el-radio :label="''">全部({{queryConfig.totalCaseCount}})</el-radio>
                    <el-radio :label="2">检出错误({{queryConfig.errorCount}})</el-radio>
                    <el-radio :label="1">过检({{queryConfig.noErrorCount}})</el-radio>
                    <el-radio :label="0">执行错误({{queryConfig.exceptionCount}})</el-radio>
                  </el-radio-group>


                </div>

                <div style="line-height: 30px;" v-if="$route.query.takeEffectStatus == 0">
                  <span class="form_desc" >案件状态</span>
                  <el-radio-group v-model="searchItem.caseStatus">
                    <el-radio  :label="''">全部({{queryConfig.totalCaseCount}})</el-radio>
                    <el-radio  :label="0">可修改审核意见({{queryConfig.canModifyCaseCount}})</el-radio>
                    <el-radio  :label="1">不可修改审核意见({{queryConfig.noModifyCaseCount}})</el-radio>
                  </el-radio-group>
                </div>
                <div style="line-height: 30px;" v-if="$route.query.takeEffectStatus == 0">
                  <span class="form_desc">核对状态</span>
                  <el-radio-group v-model="searchItem.exameStatus">
                    <el-radio  :label="''">全部({{queryConfig.totalCaseCount}})</el-radio>
                    <el-radio  :label="0">未核对({{queryConfig.noExameCount}})</el-radio>
                    <el-radio  :label="1">已核对({{queryConfig.exameCount}})</el-radio>
                  </el-radio-group>
                </div>
                <div style="line-height: 30px;margin-top:10px;">
                  <span class="form_desc" >案件搜索</span>
                  <el-input style="display: inline-block;width: 430px" v-model="searchItem.keyWords" placeholder="请输入案件编号或被申请人姓名进行搜索"></el-input>
                </div>
              </div>
              <p style="color: #aaa; font-size: 10px;" v-if="$route.query.takeEffectStatus == 0">* “不可修改审核意见”的状态指“立案申请成功”及“预审未通过”状态，“可修改审核意见”的状态为其余状态。</p>
              <div style="padding: 10px;overflow: hidden;text-align: center;">
                <el-button   type="primary" @click="HandleBtnQuery">确定</el-button>
              </div>
            </div>
          </div>

        </div>
      </div>




      <div v-if="evidenceItems.length > 0">
        <div class="card" style="position:relative;" v-for="(evidence, index) in evidenceItems" :key="index">
          <div class="fix_screen" >
            <span class="arrow_left" @click="HandlePrev" :class="{disabled: canPrev}"></span>
            <span class="arrow_right" @click="HandleNext" :class="{disabled: canNext}"></span>
          </div>
          <div class="card_header" style="overflow: hidden;position: relative;">

        <span class="header_title">
          {{evidence.lender}}与{{evidence.respondents}}的借款合同纠纷
          <i v-if="evidence.takeEffectStatus === 0">{{evidence.exameStatus === 1 ? '已核对' : '未核对'}}</i>
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
                <div class="tit fl part_tit f_18">
                  本次执行的脚本规则
                  <span style="color: #aaa;">（选中即视为案件该信息有误）</span>
                </div>
              </div>
            </div>
            <div class="rule_list">
              <ul>
                <div v-for="(item,idx) in evidence.ruleExeResultList" style="clear: both;overflow: hidden;" >
                  <li class="mr-20"   style="width: 645px; float: left;margin-bottom: 15px;" v-if="2*idx < evidence.ruleExeResultList.length">
                    <el-checkbox class="error_checkbox" :disabled="disabled"  :label="evidence.ruleExeResultList[2*idx].id" v-model="evidence.ruleExeResultList[2*idx].isSelected" @change="saveSelectedStatus(evidence.ruleExeResultList[2*idx])" :key="evidence.ruleExeResultList[2*idx].id">
                      {{evidence.ruleExeResultList[2*idx].ruleDesc+evidence.ruleExeResultList[2*idx].ruleDesc}}
                      <span v-if="evidence.ruleExeResultList[2*idx].ruleExeStatus===2" class="exeStatus2">检出错误</span>
                      <span v-if="evidence.ruleExeResultList[2*idx].ruleExeStatus===0" class="exeStatus0">执行错误</span>
                    </el-checkbox>
                  </li>
                  <li    style="width: 645px; float: left;margin-bottom: 15px;" v-if="2*idx+1 < evidence.ruleExeResultList.length">
                    <el-checkbox class="error_checkbox" :disabled="disabled"  :label="evidence.ruleExeResultList[2*idx+1].id" v-model="evidence.ruleExeResultList[2*idx+1].isSelected" @change="saveSelectedStatus(evidence.ruleExeResultList[2*idx+1])" :key="evidence.ruleExeResultList[2*idx+1].id">
                      {{evidence.ruleExeResultList[2*idx+1].ruleDesc+evidence.ruleExeResultList[2*idx+1].ruleDesc}}
                      <span v-if="evidence.ruleExeResultList[2*idx+1].ruleExeStatus===2" class="exeStatus2">检出错误</span>
                      <span v-if="evidence.ruleExeResultList[2*idx+1].ruleExeStatus===0" class="exeStatus0">执行错误</span>
                    </el-checkbox>
                  </li>

                </div>

              </ul>
            </div>
          </div>
          <div class="card_body" style="clear: both;">
            <div class="applybook_body">
              <div class="applybook_title of-hidden">
                <div class="tit fl part_tit f_18">仲裁申请书</div>
                <div class="scroll_toolbar fr">
                  <ul>
                    <li class="fl evi_bar" :class="{active: currentUrl.indexOf(eviDetail.eviFileurl) ==  0}" v-for="(eviDetail,idx) in evidence.eviDetailList" :index="idx" @click="scrollbarClick(eviDetail)">{{eviDetail.eviTitle}}</li>
                  </ul>
                </div>
              </div>
              <div class="applybook_content of-hidden">
                <div class="article_left fl">
                  <iframe  :src="applicationUrl" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
                </div>
                <div  ref="evidenceWarper" class="article_right fr">
                  <iframe ref="evidence" v-if="checkPdf(currentUrl)"  :src="currentUrl.replace(/http:|https:/g,'')" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
                  <div ref="imgEvi" style="overflow: auto;width:100%;height:100%;" v-else><img style="cursor: move;position: relative;width:100%;" :src="currentUrl" alt=""></div>
                </div>
              </div>
            </div>
          </div>



        </div>


        <div class="pagination clear" v-if="evidenceItems.length > 0">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pager.currentNum"
            layout="prev, pager, next, jumper, total"
            :total="pager.total">
          </el-pagination>
        </div>
      </div>
      <div class="noCase_panel" v-if="evidenceItems.length === 0">
        <div class="search_ico"></div>
        <div>没有符合要求的案件</div>
      </div>


    </div>
  </el-scrollbar>
</template>

<script>
  import Mixins from '@/components/script/_mixin'
  import scrollY from "@/components/scroll-y";
  import imgEvi from '@/components/script/imgEvi';
  export default {
    extends: Mixins,
    mixins: [imgEvi],
    data(){
      return {

        //申请书 url
        applicationUrl: '',
        searchItem: {},
        //查询条件
        queryConfig:{
          count: null
        },
        keyWords:'',
        showQuery: false,
        count: 0,
        disabled: false,
        evidenceItems: [
          {}
        ],
        scrollList:[],
        batchNo: '',
        pager: {
          currentNum: 1,
          total: 1,
          pageSize: 1
        },
        currentUrl: '',
        selfflag: 0,
        exeId: 0,
        exeCaseIdList: [],
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

      HandleBtnQuery(){
        this.saveExeCaseId().then(res => {
          this.HandleQuery(true);
        })
      },
      HandleAudit(){
        // this.$confirm
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('div',null,[
            h('p',null,'确定采纳当前已选择的审核意见？'),
            h('p',null,'（仅对未提交立案申请的案件有效。）')
          ]),
          center: true,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          const loading =this.$loading({
            lock: true,
            text: '案件采纳中...',
            fullscreen: true,
            spinner: 'el-icon-loading',
            background: "hsla(0,0%,100%,.9)"
          });
          this.saveExeCaseId().then(() => {
            this.$http.post('/ruleCase/updatePreCaseStatusByRuleExeResult.htm',{exeId: this.exeId}).then(res => {
              this.searchItem.caseStatus = '';
              this.searchItem.exameStatus = '';
              this.searchItem.exeStatus = '';
              loading.close();
              this.HandleQuery();

            })
          })

        }).catch(() => {
          loading.close();
        });

      },

      saveExeCaseId(){
        if(!this.evidenceItems[0] || this.evidenceItems[0].takeEffectStatus === 1){
          return Promise.resolve(true);
        }
        return this.$http.post('/ruleCase/updateExameStatusByExeCaseId.htm',{exeCaseId: this.evidenceItems[0].exeCaseId}).then(res => {
          this.handleQueryConfig();
          return res;
        })
      },


      saveSelectedStatus(item){
        this.$http.post('/ruleCase/updateIsSelectedStatusByResultId.htm',{id: item.id,isSelected: +item.isSelected}).then(res => {
        });
      },


      showQueryHandle(){
        this.showQuery= true;
      },
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
        if(this.currentUrl.substr(this.currentUrl.length-3) == 'png' || this.currentUrl.substr(this.currentUrl.length-3) == 'jpg' || this.currentUrl.substr(this.currentUrl.length-4) == 'jpeg' ){
          const img = document.createElement('img');
          img.onload=(e)=>{
            console.log(e.path[0].width);
            let bl = (660/e.path[0].width) * 100;
            console.log(bl.toFixed(0));
            this.currentUrl += ``;
          }
          img.src=e.eviFileurl;
        }
      },
      HandlePrev() {
        if(!this.canPrev){
          if(this.evidenceItems[0].takeEffectStatus === 1 || this.evidenceItems[0].exameStatus === 1){
            this.pager.currentNum-- ;
            this.doQueryByexeCaseId();
          }
          else{
            this.saveExeCaseId().then(res => {
              this.pager.currentNum-- ;
              this.doQueryByexeCaseId();
            })
          }
        }
      },
      HandleNext() {
        if(!this.canNext){
          if(this.evidenceItems[0].takeEffectStatus === 1 || this.evidenceItems[0].exameStatus === 1){
            this.pager.currentNum++ ;
            this.doQueryByexeCaseId();
          }else{
            this.saveExeCaseId().then(res => {
              this.pager.currentNum++ ;
              this.doQueryByexeCaseId();
            })
          }

        }
      },
      handleCurrentChange(page) {
        this.pager.currentNum = page;
        this.saveExeCaseId().then(res => {
          this.doQueryByexeCaseId();
        })
      },
      HandleQuery(btnClick,init) {

        if(btnClick){
          this.pager.currentNum = 1;
        }
        const loading =this.$loading({
          lock: true,
          text: '拼命加载中',
          fullscreen: true,
          lock: true,
          background: "hsla(0,0%,100%,.9)"
        });
        this.$http.post('/ruleCase/queryRuleExeResultSortByBaseQuery.htm',{exeId: this.exeId,...this.searchItem})
          .then(res => {
            console.log(res);
              // this.evidenceItems = res.result.list;
              // this.count = res.result.totalCount;
              // this.pager.total = res.result.count;
              // if(this.pager.currentNum > res.result.count){
              //   this.pager.currentNum = res.result.count;
              // }
              // console.log(this.evidenceItems)
              // this.$set(this.queryConfig,'count',res.result.count);
              //
              // this.disabled = false;
              // if(this.evidenceItems.length > 0){
            this.exeCaseIdList = res.result;
            this.pager.total = res.result.length;
            this.count = res.result.length;
            this.$set(this.queryConfig,'count',res.result.length);

            if(res.result.length > 0){
                // this.applicationUrl = this.evidenceItems[0].applicationUrl.replace(/http:|https:/g,'')+'?timestamp='+ new Date().getTime();
                // this.disabled = this.evidenceItems[0].caseStatus === 5 || this.evidenceItems[0].caseStatus === 7 || this.evidenceItems[0].takeEffectStatus === 1;
                // if(this.evidenceItems[0].eviDetailList.length > 0){
                //   this.currentUrl = this.evidenceItems[0].eviDetailList[0].eviFileurl;
                // }
                // this.evidenceItems[0].ruleExeResultList.forEach(it => {
                //   this.$set(it,'isSelected',Boolean(it.isSelected))
                // })
              if(init && this.$route.query.id){
                let idx = res.result.findIndex(it => it == this.$route.query.id);
                this.pager.currentNum = idx + 1;
                this.doQueryByexeCaseId(res.result[idx]);

              }else{
                this.pager.currentNum = 1;
                this.doQueryByexeCaseId(res.result[0])
              }

              }else{
                this.evidenceItems =[];
                if(init){
                  this.searchItem = {exeStatus: '', caseStatus: '', exameStatus: ''};
                  this.HandleQuery();
                }
              }
              // this.scrollList =
            loading.close();
            this.showQuery && (this.showQuery = false);
          }).catch(() => {
          loading.close();
        })
      },



      doQueryByexeCaseId(){
        this.$http.post('/ruleCase/queryRuleExeResultByBaseQuery.htm',{currentNum: 1,pageSize: 1,exeStatus: '', caseStatus: '', exameStatus: '',exeCaseId: this.exeCaseIdList[this.pager.currentNum -1], exeId: this.exeId  }).then(res => {
          this.evidenceItems = res.result.list;

          console.log(this.evidenceItems)

          this.disabled = false;
          this.applicationUrl = this.evidenceItems[0].applicationUrl.replace(/http:|https:/g,'')+'?timestamp='+ new Date().getTime();
          this.disabled = this.evidenceItems[0].caseStatus === 5 || this.evidenceItems[0].caseStatus === 7 || this.evidenceItems[0].takeEffectStatus === 1;
          if(this.evidenceItems[0].eviDetailList.length > 0){
            this.currentUrl = this.evidenceItems[0].eviDetailList[0].eviFileurl;
          }
          this.evidenceItems[0].ruleExeResultList.forEach(it => {
            this.$set(it,'isSelected',Boolean(it.isSelected))
          })
          console.log(res);
        })
      },


      handleQueryConfig(){
        this.$http.post('/ruleCase/countCaseInfoByExeId.htm',{exeId: this.exeId}).then(res => {
          Object.assign(this.queryConfig,res.result);
        })
      },

      checkClick(elm){
        if(elm.className ==='select_parent'){
          return true;
        }
        if(elm.parentElement){
          return this.checkClick(elm.parentElement);
        }else{
          return false;
        }
      },
    },
    components: {
      scrollY,
    },

    created(){

    },
    mounted() {
      this.exeId = this.$route.query.exeId;
      this.searchItem = {exeStatus: 2, caseStatus: 0, exameStatus: 0};
      if(this.$route.query.id){
        // this.pager.currentNum = this.$route.query.sortNum;
        this.searchItem.exeStatus = '';
        this.searchItem.caseStatus = '';
        this.searchItem.exameStatus= '';
      }
      if(this.$route.query.takeEffectStatus == 1){
        // this.searchItem.exeStatus = '';
        this.searchItem.caseStatus = '';
        this.searchItem.exameStatus= '';
      }
      this.HandleQuery(false,true);
      this.handleQueryConfig();
      document.addEventListener('click',(e) => {
        if(this.showQuery){
          if(!this.checkClick(e.target)){
            this.showQuery = false;
          }
        }
      })
      window.onbeforeunload = () => {
        this.saveExeCaseId();
      }
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
    height: calc( 100vh - 76px);
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
  .select_parent{
    position: relative;
    display: inline-block;
    margin-left: 45px;
    z-index: 999;
    width: 180px;
  }
  .select_box{
    font-size: 14px;
    color: #999999;
    padding: 5px 8px;
    cursor: pointer;
    border: 1px solid #EBEFF2;
  }
  .query_box{
    position: absolute;
    top: 21px;
    width: 640px;
    border: 1px solid #E5EAEE;
    background: #fff;
    .form_desc{
      font-weight: bold;
      display: inline-block;
      padding-right: 10px;
    }
  }
  .exeStatus2,.exeStatus0{
    color: #999;
    border: 1px solid #F2F2F2;
    font-size: 10px;
    padding: 2px 3px;
    margin-left: 10px;
  }
  .exeStatus0{
    color: #FFCC33;
    border: 1px solid #FFCC33;
  }
</style>
