<template>
    <div class="caseDetail_1">
      <div class="tm-head">
        <div class="fl">
          <span>案件详情</span>
        </div>
        <div class="fr">
          <customer-button type="primary" v-if="checkAduitButton()" @click="gotoAudit">去审核</customer-button>
        </div>
      </div>
      <div class="colseTip" v-if="colseTipFlag">
        <span>本案已整合失败</span>
        <span class="colLink" style="text-decoration: none;" @click="showCaseFailReasonList">查看原因</span>
      </div>
      <!--v-if="baseInfoObject.caseStatus == 13"-->

      <el-alert
        type="error"
        title=""
        v-if="baseInfoObject.status === 0 && !colseTipFlag"
        center
        @close="handleAlertClose"
        :show-icon="false">
        <slot name="title">
          <span>本案已整合失败</span>
          <span class="colLink" style="text-decoration: none;" @click="showCaseFailReasonList">查看原因</span>
        </slot>
      </el-alert>

      <div class="tm-body">
        <div class="fl" >
          <scrollTop :text="text"></scrollTop>
          <div style="margin-top: 123px;height: calc(100vh - 123px);border-right: 1px solid #ccc;position: relative;">
            <div class="btn" style="text-align: center;position: absolute;bottom: 160px; width: 100%;">
              <customer-button  v-if="baseInfoObject.logStatus === 1" :plain="true" size="mini" @click="showLogDialog">{{!logFlag ? '查看日志' : '关闭日志'}}</customer-button>
            </div>
          </div>
        </div>
        <el-scrollbar style="height: calc(100vh - 50px);">
          <div class="fr">


            <div class="failedReason" v-if="baseInfoObject.failedReasons && baseInfoObject.failedReasons.length >0">
              <p >审核意见</p>
              <ul>
                <li v-for="(item,idx) in baseInfoObject.failedReasons">
                  {{`${idx+1}.${item.negReasonMsg}`}}
                </li>
              </ul>

            </div>


            <div class="baseInfo scroll-top-item">
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
                        {{baseInfoObject.caseInfo.caseName}}
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="desc">
                      <div class="label fl">
                        推送时间
                      </div>
                      <div class="value fl">
                        {{baseInfoObject.caseInfo.pushTime}}
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="desc">
                      <div class="label fl">
                        案件编号
                      </div>
                      <div class="value fl">
                        {{baseInfoObject.caseInfo.caseId}}
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="desc">
                      <div class="label fl">
                        借款单号
                      </div>
                      <div class="value fl">
                        {{baseInfoObject.caseInfo.loanBillNo}}
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="desc">
                      <div class="label fl">
                        互金企业
                      </div>
                      <div class="value fl">
                        {{baseInfoObject.caseInfo.clientName}}
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="desc">
                      <div class="label fl">
                        产品模版
                      </div>
                      <div class="value fl">
                        {{baseInfoObject.caseInfo.productTemple}}
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="desc">
                      <div class="label fl">
                        标的金额
                      </div>
                      <div class="value fl">
                        {{baseInfoObject.caseInfo.amtCase}}
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="desc">
                      <div class="label fl">
                        预审状态
                      </div>
                      <div class="value fl">
                        {{caseStatusName(baseInfoObject.caseInfo.caseStatus)}}
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="desc">
                      <div class="label fl">
                        初审人
                      </div>
                      <div class="value fl">
                        {{baseInfoObject.caseInfo.dispatcherName}}
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="desc">
                      <div class="label fl">
                        复审人
                      </div>
                      <div class="value fl">
                        {{baseInfoObject.caseInfo.reviewUserName}}
                      </div>
                    </div>
                  </el-col>
                </el-row>
            </div>

            <div class="eviInfo scroll-top-item">
              <div class="title">
                文书与证据
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
                  :span-method="getObjectSpanMethod(eviInfoObject.eviList)"
                >
                  <el-table-column prop="groupNum" label="组别" width="50px"></el-table-column>
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
                      <customer-button type="text" @click="gotosqs(scope.row.fileUrl)">查看</customer-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="paramsValue scroll-top-item" v-if="judgeFlag">
              <div class="title">
                参数值
              </div>
              <div class="paramsValue-content" v-for="(item,idx) in paramsList" :key="idx">
                <div class="desc">
                  {{item.categoryDesc}}
                </div>

                <div class="" v-if="item.categoryCode <= 4 || item.categoryCode === 7">
                    <table
                      class="m-primordial-table mt-10
                      no_hover
              el-table el-table--fit el-table--border
              el-table--enable-row-hover"
                      v-if="!item.hasGroupNum"
                    >
                      <tr class="self_table_tr" v-for="(n,idx) in item.params.length ">
                        <template v-if="n <= (item.params.length + 1)/2">
                          <td>
                            <div>
                              {{item.params[2 * idx].paramName}}
                            </div>
                            </td>
                          <td>
                            <div>
                              <customer-button type="text" v-if="item.params[2 * idx ].paramValue && item.params[2 * idx].paramValue.indexOf('http') === 0" @click="openValue(item.params[2 * idx].paramValue)">打开链接</customer-button>
                              <span v-else>{{( item.params[2 * idx ].paramValue && item.params[2 * idx].paramValue !== 'null')  ? item.params[2 * idx ].paramValue : '-'}}</span>
                              <!--{{item.params[2 * idx].paramValue === 'null' ? '-' : item.params[2 * idx].paramValue}}-->
                            </div>
                            </td>
                            <template  v-if="2 * idx + 1 <= item.params.length -1">
                              <td>
                                <div>
                                  {{item.params[2 * idx + 1].paramName}}
                                </div>
                                </td>
                              <td >
                                <div>
                                  <customer-button type="text" v-if="item.params[2 * idx + 1].paramValue && item.params[2 * idx + 1].paramValue.indexOf('http') === 0" @click="openValue(item.params[2 * idx + 1].paramValue)">打开链接</customer-button>
                                  <span v-else>{{(item.params[2 * idx + 1].paramValue && item.params[2 * idx + 1].paramValue !== 'null') ? item.params[2 * idx + 1].paramValue : '-'}}</span>
                                  <!--{{// item.params[2 * idx + 1].paramValue === 'null' ? '-' : item.params[2 * idx + 1].paramValue}}-->
                                </div>
                                </td>
                            </template>
                            <template v-else>
                              <td></td>
                              <td></td>
                            </template>

                        </template>

                      </tr>
                    </table>

                  <template v-else>
                    <div v-for="(group,idx) in item.swtichData">
                      <p style="font-size: 16px;font-weight: 600;color: #666;line-height: 24px;">{{item.categoryDesc + (idx + 1)}}</p>
                      <table
                        class="m-primordial-table mt-10
                      no_hover
              el-table el-table--fit el-table--border
              el-table--enable-row-hover"

                      >
                        <tr class="self_table_tr" v-for="(n,idx) in group.data.length ">
                          <template v-if="n <= (group.data.length + 1)/2">
                            <td>
                              <div>
                                {{group.data[2 * idx].paramName}}
                              </div>
                            </td>
                            <td>
                              <div>
                                <customer-button type="text" v-if="group.data[2 * idx ].paramValue &&group.data[2 * idx].paramValue.indexOf('http') === 0" @click="openValue(group.data[2 * idx].paramValue)">打开链接</customer-button>
                                <span v-else>{{( group.data[2 * idx ].paramValue && group.data[2 * idx].paramValue !== 'null')  ? group.data[2 * idx ].paramValue : '-'}}</span>
                                <!--{{item.params[2 * idx].paramValue === 'null' ? '-' : item.params[2 * idx].paramValue}}-->
                              </div>
                            </td>
                            <template  v-if="2 * idx + 1 <= group.data.length -1">
                              <td>
                                <div>
                                  {{group.data[2 * idx + 1].paramName}}
                                </div>
                              </td>
                              <td >
                                <div>
                                  <customer-button type="text" v-if="group.data[2 * idx + 1].paramValue && group.data[2 * idx + 1].paramValue.indexOf('http') === 0" @click="openValue(group.data[2 * idx + 1].paramValue)">打开链接</customer-button>
                                  <span v-else>{{(group.data[2 * idx + 1].paramValue && group.data[2 * idx + 1].paramValue !== 'null') ? group.data[2 * idx + 1].paramValue : '-'}}</span>
                                  <!--{{// item.params[2 * idx + 1].paramValue === 'null' ? '-' : item.params[2 * idx + 1].paramValue}}-->
                                </div>
                              </td>
                            </template>
                            <template v-else>
                              <td></td>
                              <td></td>
                            </template>

                          </template>

                        </tr>
                      </table>
                    </div>
                  </template>
                </div>



                <template v-else>
                  <div class="table" v-if="!item.hasGroupNum">

                  </div>

                  <div class="table" v-else>
                    <el-table
                      :data="item.columnData"
                      border
                    >
                      <el-table-column prop="date" label="序号" width="50px">
                        <template slot-scope="scope">
                          {{scope.$index + 1}}
                        </template>
                      </el-table-column>
                      <el-table-column v-for="(obj,idx) in item.columns" :key="idx" :prop="obj.prop" :label="obj.label">
                          <template slot-scope="scope">
                            <customer-button type="text" v-if="scope.row[obj.prop] && scope.row[obj.prop].indexOf('http') === 0" @click="openValue(scope.row[obj.prop])">打开链接</customer-button>
                            <span v-else>{{scope.row[obj.prop] ? scope.row[obj.prop] : '-'}}</span>
                          </template>
                      </el-table-column>

                    </el-table>

                  </div>

                </template>

              </div>
            </div>

            <div class="writInfo scroll-top-item" v-if="!judgeFlag">
              <div class="title">主体证明材料</div>
              <div class="bsqr" v-for="(item,idx) in litigantList.applicants" :key="idx">
                <div class="desc">
                  {{`申请人 (${item.name}) ${item.type === 0 ? '身份证照片' : '申请人营业执照'}`}}
                </div>
                <div class="sfz" v-if="item.type == 0">
                  <img :src="item.img01" alt="">
                  <img :src="item.img02" alt="">

                </div>
                <div class="yyzz" v-else >
                  <img :src="item.img01" alt="">
                </div>
              </div>
              <div class="sqr" v-for="(item,idx) in litigantList.respondents" :key="item.img01+idx">
                <div class="desc">
                  {{`被申请人(${item.name})${item.type === 0 ? '身份证照片' : '申请人营业执照'}`}}
                </div>
                <div class="sfz" v-if="item.type == 0">
                  <img :src="item.img01" alt="">
                  <img :src="item.img02" alt="">
                </div>
                <div class="yyzz" v-else>
                  <img :src="item.img01" alt="">
                </div>
              </div>

            </div>

          </div>
          </div>
        </el-scrollbar>
        <transition name="fade" >
          <div class="log_warpar" :class="{'active': logFlag}" >
            <steps ref="steps"></steps>
          </div>
        </transition>

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



      <!--审核弹窗-->
      <el-dialog title="去审核"   :visible.sync="auditFlag" width="535px">
        <p style="line-height: 40px;">当前案件处于待初审状态，请选择希望跳转的模块。</p>
        <ul class="auditmodules">
          <li @click="gotoPage('/idCardHearDetail')">身份证审核</li>
          <li @click="gotoPage('/signatureHearDetail')">签名审核</li>
          <li @click="gotoPage('/evidenceWireHear')">证据链审核</li>
        </ul>
        <span slot="footer">
        <customer-button @click="auditFlag = false" type="primary"  :plain="true">取消</customer-button>
      </span>
      </el-dialog>

    </div>
</template>

<script>
  import steps from './steps'
  import scrollTop from '@/components/scrollTop'
  export default {
    name: 'caseDetail',
    components: {
      scrollTop,
      steps
    },
    data() {
      return {
        text: [],
        eviInfoObject: {},
        eviInfoObjectClone: {},
        paramsList: [],
        logFlag: false,
        colseTipFlag: false,
        baseInfoObject: {caseInfo: {}}, //基本信息
        reasonFlag: false,
        caseFailReasonList: [],
        judgementTime: '2019-03-08',  //判断新旧版本的时间
        judgeFlag: false,
        litigantList: [],
        auditFlag: false
      }
    },
    methods: {

      openValue(url){
        window.open(url,'_blank')
      },

      //跳转
      gotoPage(str){
        let href = '';
        if(this.baseInfoObject.caseInfo.caseStatus !== 2){
           href = this.$router.resolve({path: str, query:{batchNo: this.baseInfoObject.caseInfo.batchNo, subBatchNo: this.baseInfoObject.caseInfo.subBatchNo,caseId: this.baseInfoObject.caseInfo.caseId, markflag: 0}}).href;
        }
       else{
          href = this.$router.resolve({path: 'redoHearChildDetail', query:{subBatchId: this.baseInfoObject.caseInfo.subBatchNo, subViewType: 1, caseId: this.baseInfoObject.caseInfo.caseId}}).href;
        }
        // console.log(href);
        window.open(href, '_blank');
      },

      //去审核
      gotoAudit(){
        if(this.baseInfoObject.caseInfo.caseStatus === 1 || this.baseInfoObject.caseInfo.caseStatus === 3) {
          this.auditFlag = true;
        }
        else if(this.baseInfoObject.caseInfo.caseStatus === 2) {
          if(this.baseInfoObject.caseInfo.reviewUserName === '无'){
            this.updateReviewUserName(this.baseInfoObject.caseInfo.batchNo).then(res => {
              if(res){
                //跳转复审
                this.gotoPage()
              }
            })
          }
          else if (this.baseInfoObject.caseInfo.reviewUserName === JSON.parse(window.localStorage.getItem('loginInfo')).userName){
            //跳转复审
            this.gotoPage()

          }
          else{
            this.$msgbox({
              title: '提示',
              message:`是否将复审人由${this.baseInfoObject.caseInfo.reviewUserName}变更为${JSON.parse(localStorage.getItem('loginInfo')).userName}？`,
              center: true,
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              this.updateReviewUserName(this.baseInfoObject.caseInfo.batchNo).then(() => {
                //跳转复审
                this.baseInfoObject.caseInfo.reviewUserName = JSON.parse(localStorage.getItem('loginInfo')).userName;
                this.gotoPage()
              })
            })
          }
        }
      },

      //更新复审人
      updateReviewUserName(batchNo) {
        return this.$http.post("/againAudit/updateReviewUserNameByBatchNo.htm", {batchNo: batchNo}).then(res => {
          return Promise.resolve(true);
        }).catch(() => {
          return Promise.reject(false);
        })
      },

      //判断去审核按钮
      checkAduitButton() {
        let loginName = JSON.parse(window.localStorage.getItem('loginInfo')).userName;
        if(this.baseInfoObject.caseInfo.caseStatus === 1 || this.baseInfoObject.caseInfo.caseStatus === 3){
          if( loginName ===  this.baseInfoObject.caseInfo.dispatcherName){
            return true;
          }
        }
        else if(this.baseInfoObject.caseInfo.caseStatus === 2){
            return true;
        }
        return false;
      },


      handleAlertClose(){
        this.colseTipFlag= true;
      },

      caseStatusName(status){
        // 0-待分配，1-待初审，2-待复审，3-退回重审，4-预审通过，5-预审未通过，6-立案申请成功，7-立案申请失败
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

      showCaseFailReasonList(){
        this.$http.post("/caseInfo/queryCaseFailReasonList.htm",{caseOrderId: this.$route.query.caseId}).then(res => {
           this.reasonFlag = true;
           this.caseFailReasonList =  res.result;
        })
      },


      showLogDialog(){
        this.logFlag = !this.logFlag;
        if(this.logFlag){
          this.$refs.steps.init(this.$route.query.caseId);
        }
      },

      //单元格合并
      getObjectSpanMethod(items){
        const currentList = items;
        return ({row, column, rowIndex, columnIndex ,property}) => {
          if ((columnIndex === 0 && column.property === 'groupNum') || (columnIndex === 7 && column.property === 'eviContent')) {
            property = 'groupNum';
            if (rowIndex === 0 || (currentList[rowIndex] && row[property] !== currentList[rowIndex - 1][property])) {
              let idx = -1;
              for (let i = currentList.length - 1; i > rowIndex; i--) {
                if (currentList[i][property] === row[property]) {
                  idx = i;
                  break;
                }
              }

              if (idx !== -1) {
                return {
                  rowspan: idx - rowIndex + 1,
                  colspan: 1
                }
              } else {
                return {
                  rowspan: 1,
                  colspan: 1
                };
              }
            } else {
              return {
                rowspan: 1,
                colspan: 0
              };
            }
          }else {
            return {
              rowspan: 1,
              colspan: 1
            };
          }
        }
      },

      gotosqs(url){
        window.open(url,"_blank");
      },

      //参数值
      queryParamsList(){
        this.$http.post("/caseInfo/queryCaseParamList.htm",{caseOrderId: this.$route.query.caseId}).then(res => {
          this.paramsList = res.result;
          this.paramsList.forEach(it => {
            if(it.params && it.params.length > 0 && it.params.find(i => i.groupNum)){
              it.params.forEach(i => {
                if(!i.groupNum && i.groupNum !== 0){
                  i.groupNum = '-';
                }
              });
              it.hasGroupNum = true;
              let arr1 = it.params.filter(i => i.groupNum !== '-').sort((a,b) => a.groupNum - b.groupNum);
              let arr2 = it.params.filter(i => i.groupNum === '-');
              it.params = arr1.concat(arr2);
              it.columns = [];
              it.params.forEach(ii => {
                if(!it.columns.find(i =>　i.label === ii.paramName && i.prop === ii.paramCode)){
                    it.columns.push({label: ii.paramName, prop:ii.paramCode})
                }
              })
              it.columnData = [];

              it.params.forEach(ii => {
                let item = it.columnData.find(i => i.groupNum === ii.groupNum);
                if(item){
                    item[ii.paramCode] = (ii.evidenceName ? ii.evidenceName : ii.paramValue);
                }else{
                  let obj = {};
                  obj[ii.paramCode] = (ii.evidenceName ? ii.evidenceName : ii.paramValue);
                  obj.groupNum = ii.groupNum;
                  it.columnData.push(obj)
                }
              })
              it.swtichData = [];
              it.params.forEach(ii => {
                let item = it.swtichData.find(i => i.groupNum === ii.groupNum);
                if(item){
                  item.data.push(ii);
                }else{
                  it.swtichData.push({groupNum: ii.groupNum, data: [ii]})
                }
              })
              console.log(it);
            }
          })

        })
      },

      //文書与证据
      queryEviInfo(){
        this.$http.post("/caseInfo/getEviInfoByCaseOrderId.htm",{caseOrderId: this.$route.query.caseId}).then(res => {
          this.eviInfoObjectClone  =  JSON.parse(JSON.stringify(res.result));
          let obj = this.eviInfoObjectClone.eviList.pop();
          this.eviInfoObjectClone.eviList.unshift(obj);
          // console.error(this.eviInfoObjectClone.eviList);

          res.result.eviList = res.result.eviList.filter(it => it.eviTitle  !== '证据目录').sort((a,b) => {
            if(a.groupNum - b.groupNum !== 0){
              return a.groupNum - b.groupNum;
            }
            return a.sortNum - b.sortNum;
          });
          this.eviInfoObject = res.result;
          console.log(this.eviInfoObject);
        })
      },
      //基本信息
      queryBaseInfo() {
        this.$http.post('/preCaseLib/queryPreCaseInfoByCaseId.htm', { caseId: this.$route.query.caseId }).then(res => {
          console.log(res);
          this.baseInfoObject = res.result;
          this.judgeFlag = new Date(this.baseInfoObject.templateDate).valueOf() >= new Date(this.judgementTime).valueOf();
          if(this.judgeFlag){//新版
            this.text = ['基本信息','文书与证据', '参数值'];
            this.queryParamsList();
          }else{//
            this.text = ['基本信息','文书与证据', '主体证明材料'];
            this.queryLitigantList();
          }
        })
      },
      //主体证明材料
      queryLitigantList(){
        this.$http.post("/caseInfo/queryLitigantList.htm",{caseOrderId: this.$route.query.caseId}).then(res => {
          this.litigantList = res.result;
        })
      },




    },
     created(){
      this.queryEviInfo();
      this.queryBaseInfo();
      console.error(new Date().valueOf(), new Date(this.judgementTime).valueOf());


     }
  }
</script>

<style lang="scss">
.caseDetail_1{

  .auditmodules{
    li{
      float: left;
      border: 2px solid #6BC4E1;
      box-sizing: border-box;
      width: 145px;
      height: 80px;
      margin: 0 10px 20px;
      color: #6BC4E1;
      cursor: pointer;
      line-height: 80px;
      font-size: 18px;
      text-align: center;
      font-weight: 600;
    }
  }

  .m-primordial-table.no_hover tr{
    &:hover{

    }
  }
  .self_table_tr{
    td{
      padding: 12px 0;
      box-sizing: border-box;
      text-overflow: ellipsis;
      vertical-align: middle;
      position: relative;
      &:nth-child(2n-1){
        background-color: rgba(242, 242, 242, 0.6);
      }
      div{
        white-space: normal;
        word-break: break-all;
        line-height: 23px;
        padding: 0 10px;
      }
    }
  }
  .colseTip{
    position: absolute;
    right: 0;
    top: 78px;
    height: 40px;
    font-size: 14px;
    color: #FF9900;
    border: 1px solid #FF9900;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    padding: 0 30px;
    z-index: 888;

    &:hover{
      span.colLink{
        display: inline-block;
      }
    }
    span{
      line-height: 40px;
      &.colLink{
        display: none;
      }
    }
  }
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
      margin-top: 7px;
      margin-right: 45px;
    }
  }
  .tm-body {
    position: relative;

    div.failedReason{
      margin-top: 50px;
      border: 2px solid #CCCCCC;
      background: #FAFAFA;
      padding: 5px 10px;
      >p{
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        line-height: 40px;
      }
      >ul{
        li{
          font-size: 14px;
          line-height: 30px;
          color: #333;
        }
      }
    }

    .fl {
      width: 200px;
    }
    .fr {
      box-sizing: border-box;
      padding: 0 30px 50px;
      width: calc(100vw - 200px);
      .title {
        margin-top: 55px;
        font-family: 'Arial Negreta', 'Arial';
        font-weight: 700;
        font-style: normal;
        font-size: 36px;
      }
      .desc{
        margin: 40px 0 20px;
        font-weight: 700;
        font-style: normal;
        font-size: 18px;
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
            width: calc(100% - 100px);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }

      .eviInfo{
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
              background-image: url('../../../../assets/img/2_u950.png');
            }
          }
          .img{
            width: 40px;
            height: 46px;
            margin: 0 auto;
            background-image: url('../../../../assets/img/2_u944.png');
          }

        }

      }
    }
  }


  .log_warpar{
    position: fixed;
    bottom: calc(50px - 100vh);
    right: calc(200px - 100vw);
    width: calc(100vw - 200px);
    height: calc(100vh - 50px);
    z-index: 99;
    background: #fff;
    transition: all 1s;
    &.active{
      bottom: 0;
      right: 0;
    }
  }
  .sfz{
    img{
      width: 400px;
      height: 250px;
      &:first-child{
        margin-right: 10px;
      }
    }

  }
  .yyzz{
    img{
      width: 660px;
    }
  }
}
</style>
