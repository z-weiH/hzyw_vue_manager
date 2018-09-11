<template>
  <div
    class="body_container"
  >
    <div class="header_container">
      <div class="header">
        <el-button type="primary" class="fr mr-10 mt-20" @click="HandleAudit" v-if="!disabled">审核完成</el-button>
        <span class="header_title">身份证审核</span>

        <span></span>


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
    <div class="noCase_panel" v-if="idCardList.length == 0">
      <div class="search_ico"></div>
      <div>没有符合要求的案件</div>
    </div>
    <!-- end -->

    <div class="card" :ref="card.subSortNo" v-for="(card, index) in idCardList" :key="index">
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
        <div class="img zhen fl">
          <!--<pic-zoom ref="picZoom" :url="card.respondentInfo.image02" :scale="3" :scroll="true"></pic-zoom>-->
          <img-zoom :src="card.respondentInfo.image02+ '?x-oss-process=image/resize,h_250/auto-orient,1/rotate,0'" width="400" height="250" :bigsrc="card.respondentInfo.image02+'?x-oss-process=image/resize,h_1227/auto-orient,1/rotate,0'" :configs="configs"></img-zoom>
          <!--<img :src="card.respondentInfo.image02" alt="" @mouseenter="mouseenterHandle" @mousemove="mousemoveHandle" @mouseleave="mouseleaveHandle">-->
        </div>
        <div class="img fan fl">
          <img-zoom :src="card.respondentInfo.image01+ '?x-oss-process=image/resize,h_250/auto-orient,1/rotate,0'" width="400" height="250" :bigsrc="card.respondentInfo.image01+'?x-oss-process=image/resize,h_1227/auto-orient,1/rotate,0'" :configs="configs"></img-zoom>

          <!--<pic-zoom ref="picZoom" :url="card.respondentInfo.image01" :scale="3" :scroll="true"></pic-zoom>-->
        </div>
        <div class="img_desc fl" style="max-width: 380px">
          <ul>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.nameStatus === 0 || card.checkName"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.nameStatus === 1 && !card.checkName" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.nameStatus === 2 && !card.checkName" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resName}}
            </li>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.sexStatus === 0 || card.checkGENDER"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.sexStatus === 1 && !card.checkGENDER" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.sexStatus === 2 && !card.checkGENDER" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resSex === 0 ? '女' : '男'}}
            </li>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.nationStatus === 0 || card.checkNATION"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.nationStatus === 1 && !card.checkNATION" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.nationStatus === 2 && !card.checkNATION" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resNation}}
            </li>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.idaddressStatus === 0 || card.checkADDRESS"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.idaddressStatus === 1 && !card.checkADDRESS" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.idaddressStatus === 2 && !card.checkADDRESS" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resIdaddress}}
            </li>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.idcardStatus === 0 || card.checkIDCARD"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.idcardStatus === 1 && !card.checkIDCARD" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.idcardStatus === 2 && !card.checkIDCARD" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resIdcard}}
            </li>
            <li>
              <img class="mr-10" v-if="card.auditInfoWrap.effctDateStatus === 0 || card.checkEFFECT"  src="@/assets/img/error_tag.png" alt="">
              <img class="mr-5" v-if="card.auditInfoWrap.effctDateStatus === 1 && !card.checkEFFECT" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-15" v-if="card.auditInfoWrap.effctDateStatus === 2 && !card.checkEFFECT" src="@/assets/img/warning_tag.png" alt="">
              {{card.auditInfoWrap.resEffctDate}}
            </li>
          </ul>
        </div>
        <div class="audit clear" v-if="card.auditListWrap && card.auditListWrap.length > 0">
          <p class="audit_title">审核意见:</p>
          <ul>
            <li v-for="(msg,index) in card.auditListWrap">
              {{index +1 +"."+msg.reasonMsg}}
            </li>
          </ul>
        </div>
      </div>

    </div>
    <div class="pagination" v-if="idCardList.length > 0">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pager.currentNum"
        :page-size="20"
        layout="prev, pager, next, jumper, total"
        :total="pager.total">
      </el-pagination>
    </div>

    <audit :caseId="currentCaseId" :selValue="selValue" :type="0"></audit>
    <closeDlg :message="'已完成身份证审核，请关闭本页'" v-if="showCloseDlg"></closeDlg>
  </div>
</template>

<script>
  import selectQuery from './../signatureHearDetail/modules/selectQuery'
import audit from "../signatureHearDetail/modules/audit";
import Mixins from "@/components/script/_mixin";
import PicZoom from "@/components/Piczoom";
import closeDlg from "@/components/closeDlg";
import imgZoom from "@/components/v-zoom"
export default {
  extends: Mixins,
  data() {
    return {
      //查询条件
      queryConfig:{},
      keyWords:'',
      auditStatus: 0,
      passStatus:0,//查看状态
      editState: 0,
      markflag: false,
      subBatchNo: "",
      idCardList: [],
      batchNo: "",
      currentCaseId: "", //当前案件
      disabled: false, //能否编辑
      selfflag: 0, //新书签
      showCloseDlg: false, //
      auditLists: [],
      timer: null,
      pager: {
        currentNum: 1,
        pageSize: 20,
        count: 0
      },
      selValue: null,

      //放大鏡涉案hi之
      configs: {
        width:400,
        height:250,
        maskWidth:133.5,
        maskHeight:83.5,
        maskColor:'#fff',
        maskOpacity:0.2
      },



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
    // passStatus(val,oldVal){
    //   this.HandleQuery();
    // },
    'pager.currentNum':function(val,oldval){
      console.log(val);
      this.$set(this.pager,'currentNum',val);
    }
  },
  methods: {

    //审核意见
    HandleShow(card) {
      console.log(window.opener)
      // window.opener.location.href=window.opener.location.href;

      this.$http
        .post("/firstAudit/queryAuditInfoByCaseId.htm", {
          caseId: card.caseId,
          type: 0
        })
        .then(res => {
          if (res.code === "0000") {
            this.activeItem = {mmmType : 'sfz' , ...card};
            this.auditLists = res.result;
            this.editState = 1;
            this.currentCaseId = card.caseId;
            this.selValue = card.idStatus;
          }
        });
    },
    HandleAudit() {
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h("div", null, [
          h("p", null, "即将提交身份证初审结果。提交后将无法修改。"),
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
              type: 0
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


    //添加书签
    HandleAddmark(card) {
      //接口调用
      this.$http
        .post("/firstAudit/addMark.htm", {
          subBatchNo: this.subBatchNo,
          subSortNo: card.subSortNo,
          type: 0
        })
        .then(res => {
          if (res.code === "0000") {
            console.log(res);
            this.selfflag = card.subSortNo;
            this.$message.success("书签添加成功");

            //改变url
            let baseUrl = this.$router.currentRoute.fullPath.split('markflag')[0] + 'markflag='+card.subSortNo;
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
          { subBatchNo: this.subBatchNo, auditStatus: +this.auditStatus,passStatus: +this.passStatus,keyWords: this.keyWords},
          this.pager
        )
      }else{
        Object.assign(obj,
          { subBatchNo: this.subBatchNo, passStatus: +this.passStatus ,keyWords: this.keyWords},
          this.pager
        )
      }
      this.$http
        .post(
          "/firstAudit/queryIdcardsBySubBatchNo.htm",
          obj
        )
        .then(res => {
          console.log(res);
          if (res.code === "0000") {
            this.idCardList = res.result.list;
            this.count = res.result.count;
            this.pager.total = res.result.count;
            // this.queryConfig.count = res.result.count;
            this.$set(this.queryConfig,'count',res.result.count);
            // Object.keys(this.queryConfig).forEach(key => {
            //   this.$set(this.queryConfig,key,this.queryConfig[key]);
            // })
            this.idCardList.forEach(item => {
              Object.defineProperty(item, "checkName", {
                get: () => {
                  return !!item.auditListWrap.find(it => it.code === "NAME");
                }
              });
              Object.defineProperty(item, "checkNATION", {
                get: () => {
                  return !!item.auditListWrap.find(it => it.code === "NATION");
                }
              });
              Object.defineProperty(item, "checkGENDER", {
                get: () => {
                  return !!item.auditListWrap.find(it => it.code === "GENDER");
                }
              });
              Object.defineProperty(item, "checkADDRESS", {
                get: () => {
                  return !!item.auditListWrap.find(it => it.code === "ADDRESS");
                }
              });
              Object.defineProperty(item, "checkIDCARD", {
                get: () => {
                  return !!item.auditListWrap.find(it => it.code === "IDCARD");
                }
              });
              Object.defineProperty(item, "checkEFFECT", {
                get: () => {
                  return !!item.auditListWrap.find(it => it.code === "EFFECT");
                }
              });

            });
            if (mark) {
              setTimeout(() => {
                if(this.$refs[this.markflag]){
                  console.log(this.$refs[this.markflag][0].offsetTop);
                  document.documentElement.querySelector('.body_container').scrollTo(0,this.$refs[this.markflag][0].offsetTop)
                }

              }, 500);
            }else{
              document.documentElement.querySelector('.body_container').scrollTo(0,0);
            }
            // setTimeout(()=>{
            //   this.scrollFunc();
            // },300)
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
          // Object.keys(this.queryConfig).forEach(key => {
          //   this.$set(this.queryConfig,key,this.queryConfig[key]);
          // })
        }
      })
    }
    // scrollFunc() {
    //   this.$refs.picZoom.forEach(it => {
    //     // this.pager.currentNum = Math.ceil(this.markflag/20);
    //     // if(this.pager.currentNum === 0)
    //     //   this.pager.currentNum = 1;
    //     setTimeout(()=> {
    //       it.initTime()
    //     },300)
    //   })
    // }
  },
  components: {
    audit,
    PicZoom,
    closeDlg,
    imgZoom,
    selectQuery
  },
  mounted() {
    this.subBatchNo = this.$route.query.subBatchNo;
    this.markflag = this.$route.query.markflag;
    this.disabled = Boolean(this.$route.query.disabled);
    this.batchNo = this.$route.query.batchNo;
    this.pager.currentNum = Math.ceil(this.markflag/20);
    if(this.pager.currentNum === 0)
      this.pager.currentNum = 1;

    this.handleCountQuery({check: this.disabled ? 0 : 1,subBatchNo:this.subBatchNo, type: 1 });
    this.HandleQuery(true);
    console.log(window.opener);
    // window.onscroll = this.scrollFunc
//     if(document.addEventListener){
//       document.addEventListener('DOMMouseScroll',this.scrollFunc,);
//     }
// //IE及其他浏览器
//     window.onmousewheel = document.onmousewheel=this.scrollFunc;
  }
};
</script>

<style lang="scss" scoped>
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
    padding-bottom: 20px;
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
      padding: 30px 0 0 22px;
      .img {
        float: left;
        width: 400px;
        height: 250px;
        /*width: 370px;*/
        /*height: 225px;*/
        border: 1px solid #e5eaee;
        border-radius: 5px;
        &.zhen {
          margin-right: 27px;

        }
        &.fan {
          margin-right: 38px;
        }
        img{
          height:225px;
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
</style>
