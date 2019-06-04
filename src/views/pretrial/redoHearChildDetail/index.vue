<template>
  <div style="height: 100%;background: #F7F7F7">
    <el-scrollbar style="height: 100%;">
      <div class="body_container">
        <div class="header_container">
          <div class="header">
            <el-row>
              <el-col :span="3">
                <span class="header_title">案件复审</span>
              </el-col>
              <!--<el-col :span="6">-->
              <!--<el-radio-group v-model="auditStatus" class="mt-30">-->
              <!--<el-radio :label="0">全部</el-radio>-->
              <!--<el-radio :label="1">已通过</el-radio>-->
              <!--<el-radio :label="2">未通过</el-radio>-->
              <!--</el-radio-group>-->
              <!--</el-col>-->
              <el-col :span="3" style="padding-top:30px;">
                <selectQuery ref="query" :parent="this" :disabled="subViewType" :queryConfig="queryConfig" :queryItem.sync="queryItem"></selectQuery>
              </el-col>
              <el-col :span="15">
                <customer-button v-if="subViewType == 1" type="primary" class="fr mr-10 mt-20" @click="FooPassCheck">通过</customer-button>
                <customer-button v-if="subViewType == 1" class="fr mr-10 mt-20" @click="FooRebak">退回</customer-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 无匹配案件区域 -->
        <div class="noCase_panel" v-if="screenWaitType && idCardList.length == 0">
          <div class="search_ico"></div>
          <div>没有符合要求的案件</div>
        </div>
        <!-- end -->
        <div class="card"  v-for="(card, index) in idCardList" :key="index">
          <div class="fix_screen" v-if="idCardList.length != 0">
            <span class="arrow_left" @click="gotoPrevPage(card)"></span><span class="arrow_right" @click="gotoNextPage(card)"></span>
          </div>
          <div class="card_header">
            <el-row>
              <el-col :span="18">
                <div class="smallBatch_title mt-10 f_18">
                  <span class="f_14">{{card.subSortNo}}</span>/<span class="f_14">{{card.totalCount}}</span>
                  <span>{{card.lender}}</span>与<span>{{card.respondents}}</span>的借款合同纠纷
                  <loanBillNoCopy :loanBillNo="card.loanBillNo"></loanBillNoCopy>

                  <span class="ico_group">
                        <i class="ico_idcard" v-if="card.idStatus === 0"></i>
                        <i class="ico_idcard right" v-if="card.idStatus === 1"></i>
                        <i class="ico_idcard wrong" v-if="card.idStatus === 2"></i>
                        <i class="ico_edit" v-if="card.signStatus === 0"></i>
                        <i class="ico_edit right" v-if="card.signStatus === 1"></i>
                        <i class="ico_edit wrong" v-if="card.signStatus === 2"></i>
                        <i class="ico_computer" v-if="card.eviStatus === 0"></i>
                        <i class="ico_computer right" v-if="card.eviStatus === 1"></i>
                        <i class="ico_computer wrong" v-if="card.eviStatus === 2"></i>
                      </span>

                </div>
              </el-col>
              <el-col :span="6">
                <div class="fr mt-5">
                  <customer-button v-if="subViewType == 1" @click="FooAuditReason(card)">审核意见</customer-button>
                </div>
                <div class="fr mt-5 mr-20">
                  <customer-button v-if="card.logStatus === 1"  type="text" @click="gotourl(card.caseId)">查看日志</customer-button>
                  <customer-button  type="text" @click="HandleRuleRes(card)">脚本执行记录</customer-button>

                </div>

              </el-col>
            </el-row>

          </div>

          <div class="card_body">
            <div class="part_tit f_18">身份证信息</div>
            <div class="card_part">
              <div class="img zhen" style="position: relative;">
                <p style="text-align: center; position: absolute; top: 50%;transform: translateY(-50%);width: 100%; color: #c1c1c1;" v-if="!card.idCard.image02">此处无图片</p>

                <img-zoom v-if="card.idCard.image02" :src="card.idCard.image02+'?x-oss-process=image/resize,h_250/auto-orient,1/rotate,0'" width="400" height="250" :bigsrc="card.idCard.image02+'?x-oss-process=image/resize,h_1227/auto-orient,1/rotate,0'" :configs="configs"></img-zoom>
                <!--<img v-else src="./../../../assets/img/imgerr.png" alt="" class="errImg">-->
              </div>
              <div class="img fan">
                <img-zoom v-if="card.idCard.image01" :src="card.idCard.image01+'?x-oss-process=image/resize,h_250/auto-orient,1/rotate,0'" width="400" height="250" :bigsrc="card.idCard.image01+'?x-oss-process=image/resize,h_1227/auto-orient,1/rotate,0'" :configs="configs"></img-zoom>
                <!--<img v-else src="./../../../assets/img/imgerr.png" alt="" class="errImg">-->
              </div>
              <div class="img_desc">
                <ul>



                  <template v-if="card.idCard.resType === 0">
                    <li :class="{'pointer': respondentEidtConfig.nameStatus == 1 && subViewType == 1 && card.idCard.resType === 0}">
                      <i v-if="card.idCard.nameStatus === 0" class="i_nopass"></i>
                      <i v-if="card.idCard.nameStatus%2 === 1" class="i_pass"></i>
                      <i v-if="card.idCard.nameStatus === 2" class="i_warn"></i> <span @click="handleRespondentClick(card,'resName')">{{card.idCard.resName}}</span>
                      <b style="color:#aaa;" v-if="card.idCard.nameStatus === 3">(已修正)</b>
                    </li>
                    <li :class="{'pointer': respondentEidtConfig.sexStatus == 1 && subViewType == 1 && card.idCard.resType === 0}">
                      <i v-if="card.idCard.sexStatus === 0" class="i_nopass"></i>
                      <i v-if="card.idCard.sexStatus%2 === 1" class="i_pass"></i>
                      <i v-if="card.idCard.sexStatus === 2" class="i_warn"></i> <span @click="handleRespondentClick(card,'resSex')">{{card.idCard.resSex === 0 ? '女':'男'}}</span>
                      <b style="color:#aaa;" v-if="card.idCard.sexStatus === 3">(已修正)</b>
                    </li>
                    <li :class="{'pointer': respondentEidtConfig.nationStatus == 1 && subViewType == 1 && card.idCard.resType === 0}">
                      <i v-if="card.idCard.nationStatus === 0" class="i_nopass"></i>
                      <i v-if="card.idCard.nationStatus%2 === 1" class="i_pass"></i>
                      <i v-if="card.idCard.nationStatus === 2" class="i_warn"></i> <span @click="handleRespondentClick(card,'resNation')">{{card.idCard.resNation}}</span>
                      <b style="color:#aaa;" v-if="card.idCard.nationStatus === 3">(已修正)</b>
                    </li>
                    <li :class="{'pointer': respondentEidtConfig.idaddressStatus == 1 && subViewType == 1 && card.idCard.resType === 0}">
                      <i v-if="card.idCard.idaddressStatus === 0" class="i_nopass"></i>
                      <i v-if="card.idCard.idaddressStatus%2 === 1" class="i_pass"></i>
                      <i v-if="card.idCard.idaddressStatus === 2" class="i_warn"></i> <span @click="handleRespondentClick(card,'resIdaddress')">{{card.idCard.resIdaddress}}</span>
                      <b style="color:#aaa;" v-if="card.idCard.idaddressStatus === 3">(已修正)</b>
                    </li>
                    <li :class="{'pointer': respondentEidtConfig.idcardStatus == 1 && subViewType == 1 && card.idCard.resType === 0}">
                      <i v-if="card.idCard.idcardStatus === 0" class="i_nopass"></i>
                      <i v-if="card.idCard.idcardStatus%2 === 1" class="i_pass"></i>
                      <i v-if="card.idCard.idcardStatus === 2" class="i_warn"></i> <span @click="handleRespondentClick(card,'resIdcard')">{{card.idCard.resIdcard}}</span>
                      <b style="color:#aaa;" v-if="card.idCard.idcardStatus === 3">(已修正)</b>
                    </li>
                    <li>
                      <i v-if="card.idCard.effctDateStatus === 0" class="i_nopass"></i>
                      <i v-if="card.idCard.effctDateStatus === 1" class="i_pass"></i>
                      <i v-if="card.idCard.effctDateStatus === 2" class="i_warn"></i> {{card.idCard.resEffctDate}}
                    </li>
                  </template>
                  <template v-else>
                    <!--<li :class="{'pointer': respondentEidtConfig.idcardTypeStatus == 1 && subViewType == 1 && card.idCard.resType === 0}">-->
                      <!--<i v-if="card.idCard.idcardTypeStatus === 0" class="i_nopass"></i>-->
                      <!--<i v-if="card.idCard.idcardTypeStatus%2 === 1" class="i_pass"></i>-->
                      <!--<i v-if="card.idCard.idcardTypeStatus === 2" class="i_warn"></i> <span @click="handleRespondentClick(card,'resIdcardType')">{{card.idCard.resIdcardType}}</span>-->
                      <!--<b style="color:#aaa;" v-if="card.idCard.sexStatus === 3">(已修正)</b>-->
                    <!--</li>-->
                    <li :class="{'pointer': respondentEidtConfig.idcardStatus == 1 && subViewType == 1 && card.idCard.resType === 0}">
                      <i v-if="card.idCard.idcardStatus === 0" class="i_nopass"></i>
                      <i v-if="card.idCard.idcardStatus%2 === 1" class="i_pass"></i>
                      <i v-if="card.idCard.idcardStatus === 2" class="i_warn"></i> <span @click="handleRespondentClick(card,'resIdcard')">{{card.idCard.resIdcard}}</span>
                      <b style="color:#aaa;" v-if="card.idCard.idcardStatus === 3">(已修正)</b>
                    </li>

                    <li :class="{'pointer': respondentEidtConfig.nameStatus == 1 && subViewType == 1 && card.idCard.resType === 0}">
                      <i v-if="card.idCard.nameStatus === 0" class="i_nopass"></i>
                      <i v-if="card.idCard.nameStatus%2 === 1" class="i_pass"></i>
                      <i v-if="card.idCard.nameStatus === 2" class="i_warn"></i> <span @click="handleRespondentClick(card,'resName')">{{card.idCard.resName}}</span>
                      <b style="color:#aaa;" v-if="card.idCard.nameStatus === 3">(已修正)</b>
                    </li>

                    <li :class="{'pointer': respondentEidtConfig.idaddressStatus == 1 && subViewType == 1 && card.idCard.resType === 0}">
                      <i v-if="card.idCard.idaddressStatus === 0" class="i_nopass"></i>
                      <i v-if="card.idCard.idaddressStatus%2 === 1" class="i_pass"></i>
                      <i v-if="card.idCard.idaddressStatus === 2" class="i_warn"></i> <span @click="handleRespondentClick(card,'resIdaddress')">{{card.idCard.resIdaddress}}</span>
                      <b style="color:#aaa;" v-if="card.idCard.idaddressStatus === 3">(已修正)</b>
                    </li>


                    <li :class="{'pointer': respondentEidtConfig.legalPersonStatus == 1 && subViewType == 1 && card.idCard.resType === 0}">
                      <i v-if="card.idCard.legalPersonStatus === 0" class="i_nopass"></i>
                      <i v-if="card.idCard.legalPersonStatus%2 === 1" class="i_pass"></i>
                      <i v-if="card.idCard.legalPersonStatus === 2" class="i_warn"></i> <span @click="handleRespondentClick(card,'resLegalPerson')">{{card.idCard.resLegalPerson}}</span>
                      <b style="color:#aaa;" v-if="card.idCard.nationStatus === 3">(已修正)</b>
                    </li>

                    <li>
                      <i v-if="card.idCard.effctDateStatus === 0" class="i_nopass"></i>
                      <i v-if="card.idCard.effctDateStatus === 1" class="i_pass"></i>
                      <i v-if="card.idCard.effctDateStatus === 2" class="i_warn"></i> {{card.idCard.resEffctDate}}
                    </li>
                  </template>


                </ul>
              </div>
            </div>
            <div class="audit">
              <p class="audit_title" v-if="card.idCard.failReasonList.length != 0">审核意见:</p>
              <ul>
                <li v-for="(msg, index) in card.idCard.failReasonList">{{index + 1}}.{{msg.reasonMsg}}</li>
              </ul>
            </div>
          </div>

          <div class="sign_body sTopborder">
            <div class="part_tit f_18">签名信息</div>
            <div class="of-hidden">
              <div class="mockTable fl" >
                <div class="cellTr" v-for="(cellTr,index) in card.sign.signList">
                  <div class="cell">签名时间</div>
                  <div class="cell">{{cellTr.signTime}}</div>
                  <div class="cell">签名实体</div>
                  <div class="cell">
                    {{cellTr.signDesc}}
                  </div>
                </div>
                <div class="cellTr">
                  <div class="cell">实际打款日期</div>
                  <div class="cell">{{card.sign.borrowStartDate}}</div>
                  <div class="cell">借款合同</div>
                  <div class="cell"><a class="btn_link" :href="card.sign.borrowContractUrl" target="_blank">点击查看</a></div>
                </div>
              </div>
              <div class="sign_info fl">
                <ul>
                  <li v-for="(msg,idx) in card.sign.signAuditList">
                    <i v-if="msg.auditStatus == 0" class="i_nopass"></i>
                    <i v-if="msg.auditStatus == 1" class="i_pass"></i>
                    <i v-if="msg.auditStatus == 2" class="i_warn"></i> {{msg.auditMsg}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="audit">
              <p class="audit_title" v-if="card.sign.checkSignList.length != 0">审核意见:</p>
              <ul>
                <li v-for="(line,idx) in card.sign.checkSignList">{{idx + 1}}.{{line.reasonMsg}}</li>
              </ul>
            </div>
          </div>

          <div class="applybook_body sTopborder">
            <div class="part_tit f_18">证据链信息</div>
            <div class="audit">
              <p class="audit_title" v-if="card.evi.checkAuditList.length != 0">审核意见:</p>
              <ul class="mb-30">
                <li v-for="(msg, index) in card.evi.checkAuditList">{{index + 1}}.{{msg.reasonMsg}}</li>
              </ul>
            </div>
            <div class="bdje" style="margin-bottom: 20px;;font-size: 16px;">
              <span style="color: #193b8c;font-size: 18px;">仲裁标的：</span>{{card.subjectAmt}}元
            </div>
            <div class="applybook_title of-hidden">
              <div class="tit fl">仲裁申请书</div>
              <div class="scroll_toolbar fr">
                <ul>
                  <li class="fl evi_bar" :class="{active: currentUrl.indexOf(eviDetail.eviFileurl) ==0 }" v-for="(eviDetail,idx) in card.evi.eviDetailList" :index="idx" @click="scrollbarClick(eviDetail)">{{eviDetail.eviTitle}}</li>
                </ul>
                <!-- <scroll-y @handleClick="scrollbarClick" :options="card.evi.eviDetailList" label="eviTitle" :defaultWidth="520"></scroll-y> -->
              </div>
            </div>
            <div class="applybook_content of-hidden">
              <div class="article_left fl" style="position: relative;">
                <el-button icon="el-icon-refresh" type="large" circle style="background: #F2F2F2;position: absolute;top: 70px; right: 40px;" @click="refreshApplicationUrl"></el-button>
                <iframe :src="applicationUrl" width="100%" height="100%">
                </iframe>
              </div>
              <div ref="evidenceWarper" class="article_right fr">
                <iframe v-if="checkPdf(currentUrl)" :src="currentUrl.replace(/http:|https:/g,'')" width="100%" height="100%"></iframe>
                <div ref="imgEvi" style="overflow: auto;width:100%;height:100%;" v-else><img style="cursor: move;position: relative;width:100%;" :src="currentUrl" alt=""></div>
              </div>
            </div>
          </div>
          <!-- 传统分页 -->
          <div class="pagination clear">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentNum"
              :page-size="1"
              layout="prev, pager, next, jumper, total"
              :total="count">
            </el-pagination>
          </div>
          <!-- end -->
          <!-- 左右分页 tool -->

          <!-- ** -->

					<!-- 隐藏的 iframe 用于浏览器 ctrl + f -->
					<div v-if="!(eviCode === 'AGREEMENT' || eviCode === 'SERVICE')" class="fn-hide">
						<li v-for="(eviDetail,idx) in card.evi.eviDetailList" :key="idx">
							<iframe class="fline-lalal" :src="eviDetail.eviFileurl" v-if="eviDetail.eviCode && (eviDetail.eviCode === 'AGREEMENT' || eviDetail.eviCode === 'SERVICE')"></iframe>
						</li>
					</div>

        </div>






      </div>
    </el-scrollbar>


    <audit ref="audit" :subBatchNo="subBatchId" :curCardObj="curCardObj" :auditOptsByCase="auditOptsByCase"></audit>
    <passview :subBatchNo="subBatchId"></passview>
    <reback :subBatchNo="subBatchId"></reback>

    <closeDig v-if="isSubmit" message="复审结果已提交，请关闭本页面"></closeDig>

    <backTop></backTop>
    <respondent-edit :currentRespodent="currentRespodent" :respondentItem="respondentItem"></respondent-edit>
    <ruleResult ref="ruleResult"></ruleResult>
  </div>
</template>

<script>
  import ruleResult from '../idCardHearDetail/modules/ruleResult'
  import respondentEdit from '../redoHearChildDetail/modules/respondentEdit'
import selectQuery from './modules/query';
import closeDig from '@/components/closeDlg.vue'
import PicZoom from "@/components/Piczoom";
import imgZoom from "@/components/v-zoom"
  import loanBillNoCopy from '../idCardHearDetail/modules/loanBillNoCopy'
// import vZoom from '@/components/vZoom'
// import scrollY from '@/components/scroll-y'
import { URL_JSON } from '../../../components/script/url_json'
import audit from './modules/audit'
import passview from './modules/passview'
import reback from './modules/reback'
import backTop from '@/components/backTop.vue'
import imgEvi from '@/components/script/imgEvi';



import $ from 'jquery'

export default {
  mixins:[imgEvi],
	data() {
		return {
			eviCode : '',

		  //申请书 url
      applicationUrl: '',
      //被申请人修改信息配置
      respondentEidtConfig: {},
      //对应关系
      editconfig:{resName:'nameStatus',resNation: 'nationStatus',resIdaddress: 'idaddressStatus',resIdcard:'idcardStatus',resSex:'sexStatus'},
      respondentEditFlag: false,
      //当前的被修改人信息
      currentRespodent: {},


      respondentItem:{},


		  //查询条件
		  queryConfig: {},

      //放大鏡涉案hi之
      configs: {
        width:370,
        height:227,
        maskWidth:123,
        maskHeight:75.5,
        maskColor:'#fff',
        maskOpacity:0.2
      },
			isSubmit: false,
			auditStatusList: ['1', '2'],
			waiter: null, // 数据加载前显示动画
			screenWaitType: false,
      queryItem:{
        auditStatus: 0,
        passStatus:0,
        correctionStatus: '',
        keyWords:'',
        maxAmtCapital:'',
        minAmtCapital:'',
      },
			subBatchNo: '',
			subBatchId: '',
			subViewType: '',
			btnRecheckType: '',
			currentNum: 1,
			auditLists: [],
			idCardList: [], //身份证信息
			curCardObj: {}, //当前分页的合同数据
			auditOptsByCase: {},
			currentUrl: '',
			audit_state: 0,
			pview_state: 0,
			rb_state: 0,
			configs: {
				width: 400,
				height: 250,
        maskWidth:133.5,
        maskHeight:83.5,
        maskColor:'#fff',
				maskOpacity: 0.2,
			},
			pager: {
				currentNum: 1,
				pageSize: 20,
				count: 0,
			},
			scrollList: [
				{
					name: '借款协议',
				},
				{
					name: '借款咨询服务协议',
				},
				{
					name: '收款证明单',
				},
				{
					name: '打款凭证',
				},
				{
					name: '债权转让协议',
				},
				{
					name: '债转通知',
				},
			],
		}
	},
	watch: {
		// auditStatus(val) {
		// 	console.log('cur:: ', val)
		// 	this.HandleQuery(val)
		// },
	},

	methods: {

    gotourl(caseId){
      const href = this.$router.resolve({path: 'hearCaseListDetail', query: {caseId: caseId , log: true}}).href;
      window.open(href, "_blank");
    },
    refreshApplicationUrl(){
      let idx = this.applicationUrl.lastIndexOf('=');
      this.applicationUrl = this.applicationUrl.substring(0,idx) + '=' +new Date().getTime();
    },

    //机审规则
    HandleRuleRes(card){
      // this.$http.post("/againAudit/machineWhoseRules.htm",{caseId:card.caseId}).then(res => {
      this.$refs.ruleResult.show(card.caseId);

    },

    getRespodent(){
      this.$http.post("/firstAudit/queryRespondent.htm").then(res => {
        if(res.code == "0000"){
          this.respondentEidtConfig = res.result;
        }
      })
    },

    handleRespondentClick(card,property){
      console.log(123);
      if(this.respondentEidtConfig[this.editconfig[property]] != 1 || this.subViewType != 1 || card.idCard.resType === 1){
        return;
      }
      this.currentRespodent = card.idCard;
      this.$set(this.currentRespodent,'imgUrl',card.idCard.image01);
      // this.$set(this.currentRespodent,'imgUrl',card.idCard.image01);
      // this.$set(this.currentRespodent,'currentProperty',property);
      for(let key in this.respondentEidtConfig){
        if(this.respondentEidtConfig[key] === 1){
          for(let k in this.editconfig){
            if(this.editconfig[k] === key){
              this.$set(this.respondentItem,k,card.idCard[k]);
            }
          }
        }
      }
      this.respondentEditFlag= true;
    },

    //判斷是否是視頻
    checkMovie(url){
      let idx = url.lastIndexOf('.');
      let str = url.substr(idx+1);
      let arr = ["avi","mkv","mov","mp4","rmvb"];
      return arr.indexOf(str) != -1;
    },

    checkPdf(url){
      if(url.substr(url.length-3).toLowerCase() == 'pdf' || this.checkMovie(url)){
        return true;
      }
      return false;
    },
		scrollbarClick(e) {
			console.log(e)
			this.currentUrl = e.eviFileurl
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
		FooPassCheck() {
			// 批量通过
			this.pview_state = 1
		},
		FooPassCheckCBK() {
			this.isSubmit = true
		},
		FooRebak() {
			// 批量退回
			this.rb_state = 1
		},
		FooAuditReason(card) {
			// 审核意见
			// this.audit_state = 1
			this.HandleShow(card)
		},
		// HandleQuery(_val) {
		// 	this.screenLoader()
		// 	this.currentNum = 1
		// 	this.$http
		// 		.post(URL_JSON['queryRecheckDetailView'], {
		// 			pageSize: 1,
		// 			currentNum: this.currentNum,
		// 			subBatchNo: this.subBatchId,
		// 			auditStatus: _val,
		// 		})
		// 		.then(res => {
		// 			console.log('newQuery>>>', res.result)
		// 			if (res.code === '0000') {
		// 				this.waiter.close() //关闭loader-screen
		// 				this.idCardList = res.result.list
		// 				this.count = res.result.count
		// 				this.pager.total = res.result.count
		// 				console.log(this.currentUrl)
		// 				// 明细请求过后再去改变-无数据模版状态
		// 				this.idCardList.length === 0 ? (this.screenWaitType = true) : (this.screenWaitType = false)
		// 			}
		// 		})
		// },
		HandleShow(card) {
			//意见审核
			// this.$http
			// 	.post(URL_JSON['queryAllReasonList'], {
			// 		caseId: card.caseId,
			// 	})
			// 	.then(res => {
			// 		console.log('queryAllReasonList:: ', res.result)
			// 		if (res.code === '0000') {
			// 			console.log('所有审核原因', res)
			// 			this.audit_state = 1
			// 			this.auditLists = res.result.suggestions
			// 			console.log('auditLists:', this.auditLists)
      //
      //       let codeList = ['1000','1001','1002','1003'];
      //       if(this.auditLists.find(it => codeList.indexOf(it.code) !== -1 && it.isChecked === 1) ){
      //         let item = this.auditLists.find(it => it.code === '1013');
      //         if(item && item.isChecked !== 1){
      //           item.isChecked = 1;
      //         }
      //       }
      //       for(let idx = this.auditLists.length - 1; idx>=0 ; idx--){
      //         if(codeList.indexOf(this.auditLists[idx].code) !== -1 ){
      //           this.auditLists.splice(idx,1);
      //         }
      //       }
      //
      //
			// 			let reasonIds = res.result.suggestions
			// 				.filter(v => {
			// 					return v.isChecked === 1
			// 				})
			// 				.map(v => {
			// 					return v.reasonId
			// 				})
			// 			console.log(reasonIds)
			// 			this.$refs.audit.reasonIds = reasonIds
			// 			// 人审-审核意见
			// 			// card.evi.checkAuditList//证据链
			// 			// card.sign.checkSignList//签名
			// 			// card.idCard.failReasonList//身份证
			// 			let _person = card.evi.checkAuditList.length
			// 			let _csign = card.sign.checkSignList.length
			// 			let _idcard = card.idCard.failReasonList.length
			// 			_person === 0 && _csign === 0 && _idcard === 0 ? (this.$refs.audit.status = 1) : ''
			// 			// 传入当前页数据card-对象
			// 			this.curCardObj = card
			// 			this.auditOptsByCase = res.result
			// 			console.log('auditOptsByCase:: ', this.auditOptsByCase)
			// 		}
			// 	})
      this.$http.post("/againAudit/queryAuditOpinionByCaseId.htm",{caseId: card.caseId}).then(res => {
        this.$http.post("/firstAudit/queryAuditReasonByClientCode.htm", { caseId: card.caseId, clientCode: card.clientCode}).then(res1 => {
          console.log(card)
          let obj = {
            clientName: card.clientName,
            publicRes: res.result.suggestions,
            privateRes: res1.result.suggestions,
            caseId: card.caseId,
            status: res.result.status + res1.result.status !== 2 ? 2 : 1,
            resType: card.idCard.resType
          }
          this.$refs.audit.show(obj);
        })
      })
		},
		gotoPrevPage(card) {
			if (this.currentNum > 1) {
				this.currentNum--
				this.getRecheckDetail()
			} else {
				this.$message.warning('已经是第一条数据了！')
			}
		},
		gotoNextPage(card) {
			//@2018-07-04 wait-fixed todo bug
			// card.totalCount != 0
			if (this.currentNum < this.count) {
				console.log('currentNum:: ', this.currentNum)
				//获取分页最大值做比较
				this.currentNum++
				this.getRecheckDetail()
			} else {
				this.$message.warning('已经是最后一条数据了！')
			}
		},
		getRecheckDetail(flag) {
			this.screenLoader()
			this.$http
				.post(URL_JSON['queryRecheckDetailView'], {
					pageSize: 1,
					currentNum: this.currentNum,
					subBatchNo: this.subBatchId,
					auditStatus: this.queryItem.auditStatus,
          keyWords: this.queryItem.keyWords,
          maxAmtCapital: this.queryItem.maxAmtCapital,
          minAmtCapital: this.queryItem.minAmtCapital,
          passStatus: this.queryItem.passStatus,
          correctionStatus: this.queryItem.correctionStatus
				})
				.then(res => {
					console.log('detail>->', res.result)
					if (res.code === '0000') {
						this.waiter.close() //关闭loader-screen
						this.idCardList = res.result.list
						if (this.idCardList.length > 0) {
							this.currentUrl = this.idCardList[0].evi.eviDetailList[0].eviFileurl
						}

						console.log('len-idCardList.length:: ', this.idCardList.length)
						this.count = res.result.count
            this.$set(this.queryConfig,'count',res.result.count);

            this.pager.total = res.result.count
            if(this.currentNum > res.result.count){
						  this.currentNum = res.result.count;
            }

            this.queryItem.currentNum = this.currentNum;
            localStorage.setItem('savedConfig',JSON.stringify(this.queryItem));
            console.log(localStorage.getItem('savedConfig'),this.currentNum)
						// 明细请求过后再去改变-无数据模版状态
						this.idCardList.length === 0 ? (this.screenWaitType = true) : (this.screenWaitType = false)




						this.idCardList.forEach(it => {
              this.applicationUrl = it.evi.applicationUrl.replace(/http:|https:/g,'')+'?timestamp='+ new Date().getTime();
							it.sign.signAuditList.reverse()
						})

            if(flag){
              document.documentElement.querySelector('.body_container').scrollTo(0,0);
            }

            this.queryRespondentInfoByCaseId(res.result.list[0].caseId).then(res => {
              console.log(res);
              res.result.forEach(it => {
                //当事人类型：0申请人1被申请人 private Integer resLtype;
                //证件类型 0身份证 1营业执照 private Integer resType;
                if(it.resLtype === 0){
                  if(it.resType === 0){
                    this.idCardList[0].evi.eviDetailList.push(...[{eviTitle: '申请人身份证正面', eviFileurl: it.img02}, {eviTitle: '申请人身份证反面', eviFileurl: it.img01}])
                  }else{
                    this.idCardList[0].evi.eviDetailList.push({eviTitle: '申请人营业执照', eviFileurl: it.img01});
                  }
                }else{
                  // if(it.resType)
                  const flag = res.result.filter(i => i.resLtype === 1).length > 1;
                  if(it.resType === 0){
                    this.idCardList[0].evi.eviDetailList.push(...[{eviTitle: `被申请人${flag ? '（' + it.resName + '）': ''}身份证正面`, eviFileurl: it.img02}, {eviTitle: `被申请人${flag ? '（' + it.resName + '）': ''}身份证反面`, eviFileurl: it.img01}])
                  }else {
                    this.idCardList[0].evi.eviDetailList.push({eviTitle: `被申请人${flag ? '（' + it.resName + '）': ''}营业执照`, eviFileurl: it.img01});
                  }
                }
              })
              console.log(this.idCardList[0].evi.eviDetailList);

            });
					}
				}).catch(() => {
				  this.waiter.close();
      })
		},

		screenLoader() {
			this.waiter = this.$loading({
				lock: true,
				text: '拼命加载中',
				fullscreen: true,
				background: 'hsla(0,0%,100%,.9)',
				target: document.querySelector('#app'),
			})
		},
    //复审案件详情列表安检线信息筛选时查询案件通过未通过数量
    queryCountAgainAuditCase(item){
		  this.$http.post('/againAudit/countAgainAuditCaseBySubBatchNo.htm',item).then(res => {
		    if(res.code === '0000'){
          Object.keys(res.result).forEach(key => {
            this.queryConfig[key] = res.result[key];
          })
        }
      })
    },
    handleCurrentChange(val){
      this.currentNum = val;
      this.getRecheckDetail(true);
    },
	},

	mounted() {
		console.log('---', this.$route.query.subBatchId);

    this.queryItem.auditStatus = 0
    let config = localStorage.getItem('savedConfig');
		console.log(config);
		if(config){
      try{
        let item = JSON.parse(config);
        this.queryItem = item;
        this.currentNum = item.currentNum;
      }catch (e) {

      }
    }


		this.subBatchId = this.$route.query.subBatchId
		this.subViewType = this.$route.query.subViewType
    this.queryCountAgainAuditCase({subBatchNo: this.subBatchId});
    this.getRecheckDetail(true);

		//IE及其他浏览器
	},
	created() {
    this.getRespodent();

  },
	components: {
		PicZoom,
    imgZoom,
		// vZoom,
		scrollY,
		audit,
		passview,
		reback,
		closeDig,
		backTop,
    selectQuery,
    respondentEdit,
    ruleResult,
    loanBillNoCopy
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/helper/_mixin.scss';
$themeColor: #193b8c;
li.pointer > span{
  cursor: pointer;
}
.card_part {
	@include clearfix;
	> div {
		float: left;
	}
}

.body_container {
	background: #f7f7f7;
	.header_container {
		height: 76px;
		background: #fff;
		.header {
			width: 1366px;
			margin: 0 auto;
			height: 76px;
			.header_title {
				font-size: 28px;
				color: #193b8c;
				line-height: 76px;
				font-weight: 500;
			}
			.header_img {
				display: inline-block;
				position: relative;
				img {
					vertical-align: bottom;
					margin: 0 7px;
				}
				.icon {
					position: absolute;
					bottom: -7px;
					right: -7px;
				}
			}
			.header_checkbox {
				margin-left: 20px;
			}
		}
	}
	.card {
		width: 1366px;
		border: 1px solid #e5eaee;
		background: #fff;
		margin: 16px auto;
		.card_header {
			height: 49px;
			border-bottom: 1px solid #e5eaee;
			background: #eef3ff;
			padding-left: 12px;
			padding-right: 10px;
		}
		.card_body {
			padding: 30px 0 30px 22px;
			.img {
				float: left;
				width: 400px;
				height: 250px;
				border: 1px solid #e5eaee;
				border-radius: 10px;
				overflow: hidden;
				text-align: center;
				// position: relative;
				.errImg {
					position: absolute;
					margin: auto;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
				}
				&.zhen {
					margin-right: 35px;
				}
				&.fan {
					margin-right: 28px;
				}
			}
			.img_desc {
				max-width: 370px;
				ul {
					li {
						line-height: 38px;
						font-size: 14px;
						color: #363636;
					}
				}
			}
		}
		.audit {
			margin-top: 28px;
			.audit_title {
				font-size: 17px;
				color: #193b8c;
				margin-bottom: 10px;
			}
			ul {
				padding-left: 15px;
				li {
					font-size: 14px;
					line-height: 24px;
					color: #444;
				}
			}
		}
	}
	.smallBatch_title {
		color: $themeColor;
	}
}

// fonts size style
.f_14 {
	font-size: 14px !important;
}

.f_18 {
	font-size: 18px !important;
}

// small ico style
.ico_group {
	position: relative;
	top: 4px;
	padding-left: 20px;
	i {
		margin-right: 10px;
	}
}

%_circle_border {
	border-radius: 50%;
}

.ico_idcard {
	display: inline-block;
	width: 26px;
	height: 18px;
	background: url(./../../../assets/img/ic20_001.png) no-repeat 100%;
}

.ico_edit {
	display: inline-block;
	width: 30px;
	height: 23px;
	background: url(./../../../assets/img/ic20_002.png) no-repeat 100%;
}

.ico_computer {
	display: inline-block;
	width: 24px;
	height: 19px;
	background: url(./../../../assets/img/ic20_003.png) no-repeat 100%;
}

// right or wrong
%fix_rw_ico {
	@extend %_circle_border;
	position: absolute;
	content: '';
	display: block;
	right: -5px;
	bottom: -5px;
	width: 15px;
	height: 15px;
	background-size: 100%;
	background-repeat: no-repeat;
	background-color: #fff;
}

.right {
	position: relative;
	&:after {
		@extend %fix_rw_ico;
		background-image: url(./../../../assets/img/ic20_009.png);
	}
}

.wrong {
	position: relative;
	&:after {
		@extend %fix_rw_ico;
		background-image: url(./../../../assets/img/ic20_008.png);
	}
}

.i_pass {
	display: inline-block;
	width: 14px;
	height: 10px;
	background-image: url(./../../../assets/img/ic20_006.png);
	background-repeat: no-repeat;
	background-position: 100%;
	margin-right: 5px;
}

.i_warn {
	display: inline-block;
	width: 14px;
	height: 10px;
	background-image: url(./../../../assets/img/warning_tag.png);
	background-repeat: no-repeat;
	background-position: center;
	margin-right: 5px;
}

.i_nopass {
	display: inline-block;
	width: 14px;
	height: 14px;
	background-image: url(./../../../assets/img/ic20_007.png);
	background-repeat: no-repeat;
	background-position: 0 center;
	margin-right: 5px;
}

.part_tit {
	color: $themeColor;
	padding-bottom: 20px;
	&:before {
		content: '|';
		display: inline-block;
		font-weight: bold;
		font-size: 16px;
		vertical-align: baseline;
		margin-right: 5px;
		position: relative;
		top: -2px;
	}
}

// 左右分页ui
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
		top: 20%;
		left: calc(50vw - 690px);
		width: 120px;
		height: 120px;
    z-index: 9999999;
		&:after {
			margin: 16px 0 0 16px;
			content: '';
			display: block;
			opacity: 0.1;
			width: 89px;
			height: 89px;
			background-image: url(./../../../assets/img/rct_page01.png);
		}
		&:hover {
			&:after {
				opacity: 1;
			}
		}
	}
	.arrow_right {
		top: 20%;
		right: calc(50vw - 690px);
		width: 120px;
		height: 120px;
    z-index: 9999999;

    &:after {
			margin: 16px 0 0 16px;
			content: '';
			display: block;
			opacity: 0.1;
			width: 89px;
			height: 89px;
			background-image: url(./../../../assets/img/rct_page02.png);
		}
		&:hover {
			&:after {
				opacity: 1;
			}
		}
	}
}

// 内容主体面板固定内padding
%_themainPadding {
	padding: 30px 0 30px 22px;
}

// 上边框
.sTopborder {
	border-top: 1px solid #e5eaee;
}

// 签名信息
.sign_body {
	@extend %_themainPadding;
}

// 小表格样式
.mockTable {
	// width: 762px;
  max-height: 400px;
  overflow: auto;
  overflow-x: hidden;
	border-collapse: collapse;
	// table-layout: fixed;
	border-spacing: 0;
	.cellTr {
		border-collapse: collapse;
		width: 100%;
		&:hover {
			background-color: #f5f7fa;
		}
		.cell:nth-child(odd) {
			width: 135px;
		}
		&:first-child {
			.cell {
				border: 1px solid #e5eaee;
			}
		}
	}
	.cell {
		vertical-align: middle;
		display: table-cell;
		height: 50px;
		line-height: 1.6;
		padding: 2px 8px;
		text-align: center;
		width: 250px;
    max-width: 250px;
		// text-indent: 20px;
		border-left-width: 1px;
		border-right-width: 1px;
		border-bottom-width: 1px;
		border-top-width: 0;
		border-style: solid;
		border-color: #e5eaee;


	}
}

.sign_info {
	margin-top: 57px;
	margin-left: 22px;
	ul {
	}
	li {
		padding-bottom: 20px;
	}
}

.applybook_body {
	@extend %_themainPadding;
	.applybook_title {
		font-size: 17px;
		color: $themeColor;
		padding-bottom: 30px;
		.scroll_toolbar {
			padding-right: 30px;
			font-size: 14px;
      max-height: 150px;
      width: 645px;
      overflow: auto;
			.evi_bar {
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
		padding-right: 30px;
		.article_left,
		.article_right {
			width: 645px;
			height: 780px;
			border: 1px solid #9b9b9b;
			overflow: hidden;
		}
	}
}

html,
body {
	height: 100%;
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
  .pagination{
    margin-bottom: 20px;
  }
</style>
