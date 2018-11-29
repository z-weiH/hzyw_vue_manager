<template>
  <div style="height: 100%;background: #F7F7F7">
    <el-scrollbar style="height: 100%">
      <div class="body_container">
        <div class="header_container">
          <div class="header">
            <el-button type="primary" class="fr mr-10 mt-20" @click="HandleAudit" v-if="!disabled">审核完成</el-button>
            <span class="header_title">签名审核</span>
            <!--<el-checkbox v-if="!disabled" class="header_checkbox" v-model="auditStatus">显示全部案件</el-checkbox>-->
            <!--<template v-if="disabled">-->
            <!--<el-radio v-model="passStatus" :label="0">全部</el-radio>-->
            <!--<el-radio v-model="passStatus" :label="1">已通过</el-radio>-->
            <!--<el-radio v-model="passStatus" :label="2">未通过</el-radio>-->
            <!--</template>-->
            <selectQuery ref="query" :disabled="disabled" :queryConfig="queryConfig" style="display: inline-block;"></selectQuery>
          </div>
        </div>
        <div class="noCase_panel" v-if="signatureItems.length == 0">
          <div class="search_ico"></div>
          <div>没有符合要求的案件</div>
        </div>
        <div class="card"  v-for="(sign, index) in signatureItems" :key="index" :ref="sign.subSortNo">
          <div class="card_header" style="overflow: hidden;position: relative;">
            <div class="fr mt-5" style="position: relative;" v-if="!disabled">
              <transition name="addmark" >
                <el-button class="addmark" type="text" v-if="mark !== sign.subSortNo" @click="HandleAddmark(sign)">添加书签</el-button>
              </transition>
              <transition name="bookmark" >
                <img  v-if="mark === sign.subSortNo" src="@/assets/img/bookmark.png" class="bookmark" alt="" >
              </transition>
              <el-button type="primary"  plain @click="HandleShow(sign)">审核意见</el-button>
            </div>
            <!--<div class="mt-5 rule_res" :style="{right: disabled ? '25px' : '185px'}">-->
              <!--<el-button type="text" @click="HandleRuleRes(sign)">机审规则</el-button>-->
            <!--</div>-->
            <span class="header_title">{{sign.subSortNo}}/{{sign.totalCount}} {{sign.lender}}与{{sign.respondents}}的借款合同纠纷</span>
            <div class="header_img">
              <img src="@/assets/img/idCard.png" alt="">
              <img class="icon" src="@/assets/img/success.png" v-if="sign.idStatus === 1" alt="">
              <img class="icon" src="@/assets/img/error.png"  v-if="sign.idStatus === 2 " alt="">
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
            <div class="mockTable fl" >
              <div class="cellTr" v-for="(cellTr,index) in sign.signList">
                <div class="cell">签名时间</div>
                <div class="cell">{{cellTr.signTime}}</div>
                <div class="cell">签名实体</div>
                <div class="cell">
                  {{cellTr.signDesc}}
                </div>
              </div>
              <div class="cellTr">
                <div class="cell">实际打款日期</div>
                <div class="cell">{{sign.borrowStartDate}}</div>
                <div class="cell">借款合同</div>
                <div class="cell"><a class="btn_link" :href="sign.borrowContractUrl" target="_blank">点击查看</a></div>
              </div>
            </div>
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
                <li v-for="(check, ii) in sign.checkSignList" :key="ii">{{ii+1+"."+check.reasonMsg}}</li>
              </ul>
            </div>
          </div>


        </div>

        <div class="pagination" v-if="signatureItems.length > 0">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pager.currentNum"
            :page-size="20"
            layout="prev, pager, next, jumper, total"
            :total="pager.total">
          </el-pagination>
        </div>

      </div>
    </el-scrollbar>
    <audit :selValue="selValue" :caseId="currentCaseId" :type="1"></audit>
    <closeDlg :message="'已完成签名审核，请关闭本页'" v-if="showCloseDlg"></closeDlg>
    <!--<rule></rule>-->
    <ruleResult ref="ruleResult"></ruleResult>
  </div>
</template>

<script>
  import ruleResult from './../idCardHearDetail/modules/ruleResult'
import rule from "./modules/rule";
import audit from "./modules/audit";
import Mixins from "@/components/script/_mixin";
import closeDlg from "@/components/closeDlg";
import selectQuery from './modules/selectQuery'
export default {
  extends: Mixins,
  data() {
    return {
      //查询条件
      queryConfig:{},
      auditStatus: 0,
      passStatus: 0,//查看状态
      keyWords:'',
      editState: 0,
      markflag: 0,
      selfflag: null,
      signatureItems: [],
      count: 0,
      batchNo: "",
      auditLists: [],
      correctionStatus: '',//修証書
      currentCaseId: "", //当前案件
      disabled: false, //控制编辑状态     true为查看， false为审核
      showCloseDlg: false,
      pager: {
        currentNum: 1,
        total: 1,
        pageSize: 20
      },
      selValue: null
    };
  },
  computed: {
    mark() {
      if (!this.selfflag) return this.markflag;
      return this.selfflag;
    }
  },
  watch: {
    // auditStatus(val, oldVal) {
    //   this.HandleQuery();
    // },
    // passStatus(val, oldVal){
    //   this.HandleQuery();
    // }

  },
  methods: {
    //意见审核
    HandleShow(sign) {
      this.$http
        .post("/firstAudit/queryAuditInfoByCaseId.htm", {
          caseId: sign.caseId,
          type: 1
        })
        .then(res => {
          if (res.code === "0000") {
            this.activeItem = {mmmType : 'qm' , ...sign};
            console.log(res);
            this.auditLists = res.result;
            this.editState = 1;
            this.currentCaseId = sign.caseId;
            this.selValue = sign.signStatus;
          }
        });
    },
    openWindow(url) {
      window.open(url, "_blank");
    },
    HandleAudit() {
      console.log( window.opener);
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h("div", null, [
          h("p", null, "即将提交签名初审结果。提交后将无法修改。"),
          h("p", null, "确定提交?")
        ]),
        center: true,
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(res => {
          this.$http
            .post("/firstAudit/idCardFirstAuditFinished.htm", {
              subBatchNo: this.subBatchNo,
              type: 1
            })
            .then(r => {
              if (r.code === "0000") {
                this.showCloseDlg = true;
                // window.opener.history.go(0);
                window.opener.location.reload();

                // this.$store.dispatch('updateAuditItems',{batchNo: this.batchNo});
              }
            });
        })
        .catch(() => {});
    },
    HandleAddmark(sign) {
      //接口调用
      console.log(this.selfflag, this.mark);
      this.$http
        .post("/firstAudit/addMark.htm", {
          subBatchNo: this.subBatchNo,
          subSortNo: sign.subSortNo,
          type: 1
        })
        .then(res => {
          if (res.code === "0000") {
            console.log(res);
            this.selfflag = sign.subSortNo;
            this.$message.success("书签添加成功");

            //改变url
            let baseUrl = this.$router.currentRoute.fullPath.split('markflag')[0] + 'markflag='+sign.subSortNo;
            console.log(baseUrl);
            this.$router.push(baseUrl);
            // window.opener.history.go(0);
            window.opener.location.reload();

          }
        });
    },
    handleCurrentChange(page) {
      this.pager.currentNum = page;
      this.HandleQuery();
    },
    HandleQuery(mark) {
      const loading =this.$loading({
        lock: true,
        text: '拼命加载中',
        fullscreen: true,
        background: "hsla(0,0%,100%,.9)"
      });
      let obj={};
      if(!this.disabled){
        Object.assign(obj,
          { subBatchNo: this.subBatchNo, auditStatus: +this.auditStatus,keyWords: this.keyWords,passStatus: +this.passStatus ,correctionStatus: this.correctionStatus},
          this.pager
        )
      }else{
        Object.assign(obj,
          { subBatchNo: this.subBatchNo, passStatus: +this.passStatus,keyWords: this.keyWords,correctionStatus:this.correctionStatus },
          this.pager
        )
      }
      this.$http
        .post(
          "/firstAudit/querySignInfoByBatchNo.htm",
         obj
        )
        .then(res => {
          if (res.code === "0000") {
            this.signatureItems = res.result.list;
            this.signatureItems.forEach(it => {
              it.signAuditList.reverse();
            });
            this.$set(this.queryConfig,'count',res.result.count);

            console.log(this.signatureItems);
            this.count = res.result.totalCount;
            this.pager.total = res.result.count;
            if (mark) {
              setTimeout(() => {
                if(this.$refs[this.markflag])
                  document.documentElement.querySelector('.body_container').scrollTo(0,this.$refs[this.markflag][0].offsetTop)
              }, 500);
            }else{
              document.documentElement.querySelector('.body_container').scrollTo(0,0);
            }
          }
          loading.close();

        });
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
    },
    //机审规则
    HandleRuleRes(card){
      // this.$http.post("/againAudit/machineWhoseRules.htm",{caseId:card.caseId}).then(res => {
      this.$refs.ruleResult.show(card.caseId);

    },
  },
  components: {
    audit,
    closeDlg,
    selectQuery,
    rule,
    ruleResult
  },
  mounted() {
    this.subBatchNo = this.$route.query.subBatchNo;
    this.markflag = +this.$route.query.markflag;
    this.disabled = Boolean(this.$route.query.disabled);
    this.batchNo = this.$route.query.batchNo;
    this.handleCountQuery({check: this.disabled ? 0 : 1,subBatchNo:this.subBatchNo, type: 2 });
    //查询 和  标签定位
    this.pager.currentNum = Math.ceil(this.markflag/20);
    if(this.pager.currentNum === 0)
      this.pager.currentNum = 1;
    this.HandleQuery(true);
  }
};
</script>

<style lang="scss" scoped>
  .rule_res{
    position: absolute;
    top: 0;

  }
.bookmark-enter-active,
.addmark-enter-active {
  transition: all 0.6s ease;
}
.bookmark-leave-active,
.addmark-leave-active {
  transition: all 0.6s ease;
}
.addmark-enter,
.addmark-lwave-to {
  opacity: 0;
}
.bookmark-enter, .bookmark-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-45px);
}
.addmark {
  position: absolute;
  right: 110px;
}
.bookmark {
  height: 40px;
  vertical-align: text-top;
  margin-top: -10px;
  margin-right: 20px;
}
.body_container {
  background: #f7f7f7;
  height: 100%;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
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
      .header_checkbox {
        margin-left: 20px;
      }
    }
  }
  .card {
    overflow: hidden;
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
      .header_title {
        font-size: 16px;
        line-height: 50px;
        color: #13367d;
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
    }
    .card_body {
      padding: 30px 0 30px 22px;
      overflow: hidden;
      table,
      tr,
      td {
        border: 1px solid #e5eaee;
        text-align: center;
      }
      .card_table {
        color: #363636;
        float: left;
        width: 868px;
        max-height: 400px;
        overflow: auto;
        border-collapse: collapse;
        tr {
          height: 49px;
          &:hover {
            background-color: #f5f7fa;
          }
          td {
            &:nth-child(odd) {
              color: #7a7a7a;
            }
          }
        }
      }
      .img_desc {
        margin: 50px;
        margin-right: 70px;
        ul {
          li {
            line-height: 38px;
            font-size: 14px;
            color: #363636;
            min-width:325px;
          }
        }
      }
    }
    .audit {
      padding-top: 28px;
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
  .pagination {
    margin: 20px auto;
    box-sizing: border-box;
    border: 1px solid #e5eaee;
    width: 1366px;
    padding: 10px 20px;
    background: #fff;
  }
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

</style>
