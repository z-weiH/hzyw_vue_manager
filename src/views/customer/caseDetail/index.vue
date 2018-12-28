<template>
  <div class="template-joint-caseDetail">
    <div class="tm-head">
      <div class="fl">
        <span v-if="!toggleScreenView">案件详情</span>
        <customer-button type="primary" :plain="true" v-else @click="exitScreenView">退出全屏</customer-button>
      </div>
      <div class="fr">
        <customer-button type="primary" :plain="true">联调意见</customer-button>
        <customer-button type="primary">联调完成</customer-button>
      </div>
    </div>
    <div class="tm-body">
      <el-alert
        v-if="!baseInfoObject.failFlag"
        type="error"
        center
        :show-icon="false">
        <slot name="title">
          <span>本案已整合失败</span>
          <span class="colLink" style="text-decoration: none;" @click="showCaseFailReasonList">查看原因</span>
        </slot>
      </el-alert>
      <div class="fl" >
        <scrollTop :text="text"></scrollTop>
        <div style="margin-top: 164px;height: calc(100vh - 214px);border-right: 1px solid #ccc;position: relative;">
          <div class="btn" style="text-align: center;position: absolute;top: 50%; width: 100%;">
            <p style="font-size: 16px;line-height: 32px;">联调状态: {{}}</p>
            <customer-button :plain="true" size="mini" @click="showLogDialog">查看联调日志</customer-button>
          </div>
        </div>
      </div>
      <el-scrollbar  style="height: calc(100vh - 50px);">
      <div class="fr">

          <div class="baseInfo">
            <div class="title">
              基本信息
            </div>
            <div class="baseInfo-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="desc">
                    <div class="label fl">
                      案件名称
                    </div>
                    <div class="value fl">
                      {{baseInfoObject.caseName}}
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="desc">
                    <div class="label fl">
                      推送时间
                    </div>
                    <div class="value fl">
                      {{baseInfoObject.pushTime}}
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="desc">
                    <div class="label fl">
                      案件编号
                    </div>
                    <div class="value fl">
                      {{baseInfoObject.caseOrderId}}
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="desc">
                    <div class="label fl">
                      借款单号
                    </div>
                    <div class="value fl">
                      {{baseInfoObject.loanBillNo}}
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="paramsValue">
            <div class="title">
              参数值
            </div>
            <div class="paramsValue-content" v-for="(item,idx) in paramsList" :key="idx">
              <div class="desc">
                {{item.categoryDesc}}
              </div>
              <div class="table">
                <el-table
                  :data="item.params"
                  border
                  @row-click="tableRowClick"
                >
                  <el-table-column prop="date" label="序号" width="50px">
                    <template slot-scope="scope">
                      {{scope.$index + 1}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="caseParam" label="参数"></el-table-column>
                  <el-table-column prop="paramDesc" label="中文">
                    <!--<template slot-scope="scope">-->
                    <!--<span v-ellipsis.20>{{scope.row.productName  + '' + scope.row.prodCode}}</span>-->
                    <!--</template>-->
                  </el-table-column>
                  <el-table-column prop="valueType" label="类型"></el-table-column>
                  <el-table-column prop="paramValue" label="值"></el-table-column>
                  <el-table-column prop="dataType" label="数据来源">
                    <template slot-scope="scope">
                      <!--0-接口 1-脚本 2-公式-->
                      <span>{{scope.row.dataType === 0 ? '接口' : scope.row.dataType === 1 ? '脚本' : scope.row.dataType === 2 ? '公式' : '--'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="isCorrect" label="正确性">
                    <template slot-scope="scope">
                      <!--0-错误 1-正确-->
                      <span>
                        <img class="mr-10" v-if="scope.row.isCorrect === 0"  src="@/assets/img/error_tag_01.png" alt="">
                         <img class="mr-5" v-if="scope.row.isCorrect === 1" src="@/assets/img/success_tag.png" alt="">
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="errorReason" label="错误原因">
                    <template slot-scope="scope">
                      <!--0-错误 1-正确-->
                      <span>
                        {{scope.row.errorReason  }}
                        <!--{{scope.row.errorReason ? scope.row.errorReason : '&#45;&#45;' }}-->
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>


          </div>
          <div class="mainPart">
            <div class="title">
              主体证明材料
            </div>
            <div class="bsqr" v-for="(item,idx) in litigantList.applicants" :key="idx">
              <div class="desc">
                {{`申请人(${item.name})${item.type}`}}
              </div>
              <div class="sfz">

              </div>
              <div class="yyzz">
                <img :src="item.img01" alt="">
              </div>
            </div>
            <div class="sqr" v-for="(item,idx) in litigantList.respondents" :key="idx">
              <div class="desc">
                {{`被请人(${item.name})${item.type}`}}
              </div>
              <div class="sfz">

              </div>
              <div class="yyzz">
                <img :src="item.img01" alt="">
              </div>
            </div>
          </div>
          <div class="eviInfo">
            <div class="title">
              文书与证据
              <el-button type="primary" @click="handleScreenView" style="float: right"  :plain="true">全屏查看</el-button>

            </div>
            <div class="desc">
              文书信息
            </div>
            <div class="wenshu" @click="gotosqs(eviInfoObject.applicationUrl)">
              <div class="img"></div>
              <p>仲裁申请书</p>
            </div>

            <div class="desc">
              证据列表
            </div>
            <div class="table">
              <el-table
                :data="eviInfoObject.eviList"
                border
                @row-click="tableRowClick"
              >
                <el-table-column prop="sortNum" label="序号" width="50px">
                </el-table-column>
                <el-table-column prop="eviTitle" label="证据名称"></el-table-column>
                <el-table-column prop="eviSource" label="证据来源">
                  <!--<template slot-scope="scope">-->
                  <!--<span v-ellipsis.20>{{scope.row.productName  + '' + scope.row.prodCode}}</span>-->
                  <!--</template>-->
                </el-table-column>
                <el-table-column prop="eviFormat" label="形式"></el-table-column>
                <el-table-column prop="eviPage" label="页数"></el-table-column>
                <el-table-column prop="eviStatus" label="是否已传">
                  <template slot-scope="scope">
                    <!--0-接口 1-脚本 2-公式-->
                    <span>
                        <img class="mr-10" v-if="scope.row.eviStatus === 0"  src="@/assets/img/error_tag_01.png" alt="">
                        <img class="mr-5" v-if="scope.row.eviStatus === 1" src="@/assets/img/success_tag.png" alt="">
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="eviContent" label="证明对象">
                </el-table-column>
                <el-table-column prop="" label="操作">
                  <template slot-scope="scope">
                    <customer-button type="text" @click="openEvi(scope.row.fileUrl)">查看</customer-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

      </div>
      </el-scrollbar>

    </div>


    <!--原因弹窗-->
    <el-dialog title="整合失败原因"   :visible.sync="reasonFlag" width="535px">
      <ul>
        <li v-for="(item,idx) in caseFailReasonList" :key="idx" style="line-height: 32px;font-size: 16px;">{{(idx + 1) + '.' + item.reasonMsg}}</li>
      </ul>
      <span slot="footer">
        <customer-button @click="reasonFlag = false" type="primary"  :plain="true">关闭</customer-button>
      </span>
    </el-dialog>

    <!--日志弹窗-->
    <log-dialog ref="logDialog"></log-dialog>

    <!--全屏查看-->
    <screen-view ref="screenView"></screen-view>
  </div>
</template>

<script>
  import ScreenView from './module/screenView'
  import LogDialog from '../templateJoint/module/logDialog'
  import scrollTop from '@/components/scrollTop'
  export default {
    name: 'caseDetail',
    components: {
      scrollTop,
      LogDialog,
      ScreenView
    },
    data(){
      return {
        reasonFlag: false,
        text: ['基本信息','参数值','主体证明材料','文书与证据'],
        caseOrderId: '',
        baseInfoObject: {},
        paramsList: [],
        litigantList: {},
        eviInfoObject: {},
        caseFailReasonList: [],
        toggleScreenView: false
      }
    },
    methods: {

      gotosqs(url){
        window.open(url,"_blank");
      },

      showCaseFailReasonList(){
        this.$http.post('/caseInfo/queryCaseFailReasonList.htm',{caseOrderId: this.caseOrderId}).then(res => {
          this.reasonFlag= true;
          this.caseFailReasonList = res.result;
        })
      },

      showLogDialog(){
        this.$refs.logDialog.show(this.$route.query.prodTempId);
      },
      gototitle(title){

      },
      exitScreenView(){
        this.$refs.screenView.toggleShow();
        this.toggleScreenView = false;
      },

      //全屏查看
      handleScreenView(){
        this.$refs.screenView.toggleShow(this.eviInfoObject);
        this.toggleScreenView = true;
      },
      openEvi(url){
        window.open(url,'_blank');
      },
      queryBaseInfo(){
        this.$http.post("/caseInfo/queryCaseBasicInfo.htm",{caseOrderId: this.caseOrderId}).then(res => {
          this.baseInfoObject = res.result;
        })
      },
      queryParamsList(){
        this.$http.post("/caseInfo/queryCaseParamList.htm",{caseOrderId: this.caseOrderId}).then(res => {
          this.paramsList = res.result;
        })
      },
      //主体证明材料
      queryLitigantList(){
        this.$http.post("/caseInfo/queryLitigantList.htm",{caseOrderId: this.caseOrderId}).then(res => {
            this.litigantList = res.result;
        })
      },

      queryEviInfo(){
        this.$http.post("/caseInfo/getEviInfoByCaseOrderId.htm",{caseOrderId: this.caseOrderId}).then(res => {
          this.eviInfoObject = res.result;
        })
      }
    },
    created(){
      this.caseOrderId = this.$route.query.caseOrderId;
      this.queryBaseInfo();
      this.queryParamsList();
      this.queryLitigantList();
      this.queryEviInfo();

    }
  }
</script>

<style lang="scss" >
  .template-joint-caseDetail{
    .tm-head{
      background-color: #fff;
      height: 50px;
      box-sizing: border-box;
      border-bottom: 1px solid #e0e4e8;
      .fl{
        color: #0f357f;
        padding-left: 18px;
        line-height: 50px;
        font-size: 26px;
      }
      .fr{
        margin-top: 10px;
        margin-right: 45px;
      }
    }
    .tm-body{
      .fl{
        width: 200px;
      }
      .fr{
        box-sizing: border-box;
        padding: 0 30px 50px;
        width: calc(100vw - 200px);
        .title{
          margin-top: 55px;
          font-family: 'Arial Negreta', 'Arial';
          font-weight: 700;
          font-style: normal;
          font-size: 36px;
        }
        .baseInfo-content{
          margin-top: 40px;
          .desc{
            margin: 0;
            font-weight: 400;
            font-style: normal;
            font-size: 16px;
            color: #666666;
            line-height: 36px;
            .label{
              width: 80px;
            }
            .value{
              margin-left: 20px;
              color: #1E1E1E;
              width: auto;
            }
          }
        }
        .desc{
          margin: 40px 0 20px;
          font-weight: 700;
          font-style: normal;
          font-size: 18px;
        }
        .paramsValue-content{

        }
      }
    }

    .wenshu{
      width: 120px;
      height: 120px;
      border: 1px solid #159ACA;
      text-align: center;
      padding-top: 22px;
      box-sizing: border-box;
      cursor: pointer;
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: #0099CC;
      line-height: 40px;
      &:hover{
        background: #159ACA;
        color: #fff;
        .img{
          background-image: url('../../../assets/img/2_u950.png');
        }
      }
      .img{
        width: 40px;
        height: 46px;
        margin: 0 auto;
        background-image: url('../../../assets/img/2_u944.png');
      }

    }
  }
</style>
