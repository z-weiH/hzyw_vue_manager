<template>
  <div class="body_container">
    <div class="header_container">
      <div class="header">
        <el-row>
          <el-col :span="3">
            <span class="header_title">案件复审</span>
          </el-col>
          <el-col :span="6">
            <el-radio-group v-model="auditStatus" class="mt-30">
              <el-radio :label="0">全部</el-radio>
              <el-radio :label="1">已通过</el-radio>
              <el-radio :label="2">未通过</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="15">
            <el-button v-if="subViewType == 1" type="primary" class="fr mr-10 mt-20" @click="FooPassCheck">通过</el-button>
            <el-button v-if="subViewType == 1" class="fr mr-10 mt-20" @click="FooRebak">退回</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 无匹配案件区域 -->
    <div class="noCase_panel" v-if="idCardList.length == 0">
      <div class="search_ico"></div>
      <div>没有符合要求的案件</div>
    </div>
    <!-- end -->
    <div class="card" v-for="(card, index) in idCardList" :key="index">
      <div class="card_header">
        <el-row>
          <el-col :span="12">
            <div class="smallBatch_title mt-10 f_18">
              <span class="f_14">{{card.subSortNo}}</span>/<span class="f_14">{{card.totalCount}}</span>
              <span>{{card.lender}}</span>与<span>{{card.respondents}}</span>的借款合同纠纷
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
          <el-col :span="12">
            <div class="fr mt-5">
              <el-button v-if="subViewType == 1" @click="FooAuditReason(card)">审核意见</el-button>
            </div>
          </el-col>
        </el-row>

      </div>

      <div class="card_body">
        <div class="part_tit f_18">身份证信息</div>
        <div class="img zhen">
          <pic-zoom ref="picZoom" v-if="card.idCard.image02" :url="card.idCard.image02" :scale="3"></pic-zoom>
          <img v-else src="./../../../assets/img/imgerr.png" alt="" class="errImg">
        </div>
        <div class="img fan">
          <pic-zoom ref="picZoom" v-if="card.idCard.image02" :url="card.idCard.image01" :scale="3"></pic-zoom>
          <img v-else src="./../../../assets/img/imgerr.png" alt="" class="errImg">
        </div>
        <div class="img_desc">
          <ul>
            <li>
              <i v-if="card.idCard.nameStatus === 0" class="i_nopass"></i>
              <i v-if="card.idCard.nameStatus === 1" class="i_pass"></i>
              <i v-if="card.idCard.nameStatus === 2" class="i_warn"></i> {{card.idCard.resName}}
            </li>
            <li>
              <i v-if="card.idCard.sexStatus === 0" class="i_nopass"></i>
              <i v-if="card.idCard.sexStatus === 1" class="i_pass"></i>
              <i v-if="card.idCard.sexStatus === 2" class="i_warn"></i> {{card.idCard.resSex === 0 ? '女':'男'}}
            </li>
            <li>
              <i v-if="card.idCard.nationStatus === 0" class="i_nopass"></i>
              <i v-if="card.idCard.nationStatus === 1" class="i_pass"></i>
              <i v-if="card.idCard.nationStatus === 2" class="i_warn"></i> {{card.idCard.resNation}}
            </li>
            <li>
              <i v-if="card.idCard.idaddressStatus === 0" class="i_nopass"></i>
              <i v-if="card.idCard.idaddressStatus === 1" class="i_pass"></i>
              <i v-if="card.idCard.idaddressStatus === 2" class="i_warn"></i> {{card.idCard.resIdaddress}}
            </li>
            <li>
              <i v-if="card.idCard.idcardStatus === 0" class="i_nopass"></i>
              <i v-if="card.idCard.idcardStatus === 1" class="i_pass"></i>
              <i v-if="card.idCard.idcardStatus === 2" class="i_warn"></i> {{card.idCard.resIdcard}}
            </li>
            <li>
              <i v-if="card.idCard.effctDateStatus === 0" class="i_nopass"></i>
              <i v-if="card.idCard.effctDateStatus === 1" class="i_pass"></i>
              <i v-if="card.idCard.effctDateStatus === 2" class="i_warn"></i> {{card.idCard.resEffctDate}}
            </li>
          </ul>
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
          <div class="mockTable fl">
            <div class="cellTr" v-for="(cellTr,index) in card.sign.signList">
              <div class="cell">签名时间</div>
              <div class="cell">{{cellTr.signTime}}</div>
              <div class="cell">签名实体</div>
              <div class="cell">{{cellTr.signDesc}}</div>
            </div>
            <div class="cellTr">
              <div class="cell">借款开始时间</div>
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
        <div class="applybook_title of-hidden">
          <div class="tit fl">仲裁申请书</div>
          <div class="scroll_toolbar fr">
            <scroll-y @handleClick="scrollbarClick" :options="card.evi.eviDetailList" label="eviTitle" :defaultWidth="520"></scroll-y>
          </div>
        </div>
        <div class="applybook_content of-hidden">
          <div class="article_left fl">
                    <iframe :src="card.evi.applicationUrl" width="100%" height="100%" >
                    </iframe>
          </div>
          <div class="article_right fr">
                    <iframe :src="currentUrl" width="100%" height="100%" >
                    </iframe>
          </div>
        </div>
      </div>
      <!-- 传统分页 -->
      <!-- <div class="pagination clear">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pager.currentNum"
              :page-size="20"
              layout="prev, pager, next, jumper, total"
              :total="pager.total">
            </el-pagination>
            </div> -->
      <!-- end -->
      <!-- 左右分页 tool -->
      <div class="fix_screen" v-if="idCardList.length != 0">
        <span class="arrow_left" @click="gotoPrevPage(card)"></span><span class="arrow_right" @click="gotoNextPage(card)"></span>
      </div>
      <!-- ** -->


    </div>




    <audit ref="audit" :subBatchNo="subBatchId" :curCardObj="curCardObj" :auditOptsByCase="auditOptsByCase"></audit>
    <passview :subBatchNo="subBatchId"></passview>
    <reback :subBatchNo="subBatchId"></reback>

    <closeDig v-if="isSubmit" message="复审结果已提交，请关闭本页面"></closeDig>

    <backTop></backTop>
  </div>
</template>

<script>
import closeDig from "@/components/closeDlg.vue";
import PicZoom from "@/components/Piczoom";
import scrollY from "@/components/scroll-y";
import { URL_JSON } from "../../../components/script/url_json";
import audit from "./modules/audit";
import passview from "./modules/passview";
import reback from "./modules/reback";
import backTop from "@/components/backTop.vue";
export default {
  data() {
    return {
      isSubmit: false,
      auditStatusList: ["1", "2"],
      auditStatus: 0,
      subBatchNo: "",
      subBatchId: "",
      subViewType: "",
      btnRecheckType: "",
      currentNum: 1,
      auditLists: [],
      idCardList: [], //身份证信息
      curCardObj: {}, //当前分页的合同数据
      auditOptsByCase: {},
      currentUrl: "",
      audit_state: 0,
      pview_state: 0,
      rb_state: 0,
      pager: {
        currentNum: 1,
        pageSize: 20,
        count: 0
      },
      scrollList: [
        {
          name: "借款协议"
        },
        {
          name: "借款咨询服务协议"
        },
        {
          name: "收款证明单"
        },
        {
          name: "打款凭证"
        },
        {
          name: "债权转让协议"
        },
        {
          name: "债转通知"
        }
      ]
    };
  },
  watch: {
    auditStatus(val) {
      console.log("cur:: ", val);
      this.HandleQuery(val);
    }
  },
  methods: {
    scrollbarClick(e) {
      console.log(e);
      this.currentUrl = e.eviFileurl;
    },
    FooPassCheck() {
      // 批量通过
      this.pview_state = 1;
    },
    FooPassCheckCBK() {
      this.isSubmit = true;
    },
    FooRebak() {
      // 批量退回
      this.rb_state = 1;
    },
    FooAuditReason(card) {
      // 审核意见
      this.audit_state = 1;
      this.HandleShow(card);
    },
    HandleQuery(_val) {
      // if (_val != 0) {
      this.currentNum = 1;
      this.$http
        .post(URL_JSON["queryRecheckDetailView"], {
          pageSize: 1,
          currentNum: this.currentNum,
          subBatchNo: this.subBatchId,
          auditStatus: _val
        })
        .then(res => {
          console.log("newQuery>>>", res.result);
          if (res.code === "0000") {
            this.idCardList = res.result.list;
            this.count = res.result.count;
            this.pager.total = res.result.count;
            // console.log('this.idCardList: ',this.idCardList);
            // this.idCardList.forEach(it => {
            //   console.log('-----');
            //   it.sign.signList.reverse();
            // });
          }
        });
      // } else {
      //   this.getRecheckDetail();
      // }
    },
    HandleShow(card) {
      //意见审核
      this.$http
        .post(URL_JSON["queryAllReasonList"], {
          caseId: card.caseId
        })
        .then(res => {
          console.log("queryAllReasonList:: ", res.result);
          if (res.code === "0000") {
            console.log("所有审核原因", res);
            this.audit_state = 1;
            this.auditLists = res.result.suggestions;
            console.log("auditLists:", this.auditLists);
            let reasonIds = res.result.suggestions
              .filter(v => {
                return v.isChecked === 1;
              })
              .map(v => {
                return v.reasonId;
              });
            console.log(reasonIds);
            this.$refs.audit.reasonIds = reasonIds;
            // 人审-审核意见
            // card.evi.checkAuditList//证据链
            // card.sign.checkSignList//签名
            // card.idCard.failReasonList//身份证
            let _person = card.evi.checkAuditList.length;
            let _csign = card.sign.checkSignList.length;
            let _idcard = card.idCard.failReasonList.length;
            _person === 0 && _csign === 0 && _idcard === 0
              ? (this.$refs.audit.status = 1)
              : "";
            // 传入当前页数据card-对象
            this.curCardObj = card;
            this.auditOptsByCase = res.result;
            console.log("auditOptsByCase:: ", this.auditOptsByCase);
          }
        });
    },
    gotoPrevPage(card) {
      if (this.currentNum != 1) {
        this.currentNum--;
        this.getRecheckDetail();
      } else {
        this.$message.warning("已经是第一条数据了！");
      }
    },
    gotoNextPage(card) {
      //@2018-07-04 wait-fixed todo bug
      // card.totalCount != 0
      if (this.currentNum != 0 && this.currentNum != card.totalCount) {
        console.log("currentNum:: ", this.currentNum);
        //获取分页最大值做比较
        this.currentNum++;
        this.getRecheckDetail();
      } else {
        this.$message.warning("已经是最后一条数据了！");
      }
    },
    getRecheckDetail() {
      this.$http
        .post(URL_JSON["queryRecheckDetailView"], {
          pageSize: 1,
          currentNum: this.currentNum,
          subBatchNo: this.subBatchId,
          auditStatus: this.auditStatus
        })
        .then(res => {
          console.log("detail>->", res.result);
          if (res.code === "0000") {
            this.idCardList = res.result.list;
            console.log("len-idCardList.length:: ", this.idCardList.length);
            this.count = res.result.count;
            this.pager.total = res.result.count;
            this.$nextTick(() => {
              console.log("piczoom :", this.$refs.picZoom);
              setTimeout(() => {
                this.$refs.picZoom.forEach(it => {
                  it.initTime();
                });
              }, 300);
            });

            this.idCardList.forEach(it => {
              console.log(it);
              it.sign.signAuditList.reverse();
            });
          }
        });
    },
    scrollFunc() {
      this.$refs.picZoom.forEach(it => {
        setTimeout(() => {
          it.initTime();
        }, 300);
      });
    }
  },
  mounted() {
    console.log("---", this.$route.query.subBatchId);
    this.subBatchId = this.$route.query.subBatchId;
    this.subViewType = this.$route.query.subViewType;
    this.auditStatus = 0;
    this.getRecheckDetail();
    if (document.addEventListener) {
      document.addEventListener("DOMMouseScroll", this.scrollFunc);
    }
    //IE及其他浏览器
    window.onmousewheel = document.onmousewheel = this.scrollFunc;
  },
  created() {},
  components: {
    PicZoom,
    scrollY,
    audit,
    passview,
    reback,
    closeDig,
    backTop
  }
};
</script>

<style lang="scss" scoped>
$themeColor: #193b8c;
.body_container {
  background: #f7f7f7;
  padding-bottom: 20px;
  .header_container {
    height: 76px;
    background: #fff;
    .header {
      width: 1200px;
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
    width: 1200px;
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
        width: 370px;
        height: 225px;
        border: 1px solid #e5eaee;
        border-radius: 10px;
        overflow: hidden;
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
          margin-right: 17px;
        }
        &.fan {
          margin-right: 28px;
        }
      }
      .img_desc {
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
  content: "";
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
    top: 50%;
    left: 16%;
    width: 120px;
    height: 120px;
    &:after {
      margin: 16px 0 0 16px;
      content: "";
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
    top: 50%;
    right: 16%;
    width: 120px;
    height: 120px;
    &:after {
      margin: 16px 0 0 16px;
      content: "";
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
  display: table;
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
      width: 130px;
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
    width: 220px;
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
      font-size: 14px;
      padding-right: 30px;
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
      width: 565px;
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
</style>
