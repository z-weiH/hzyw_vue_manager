<template>
  <div class="template-joint-caseDetail">
    <div class="tm-head">
      <div class="fl">
        <span v-if="!toggleScreenView">案件详情</span>
        <customer-button type="primary" :plain="true" v-else @click="exitScreenView" style="margin-left: calc(50vw - 703px); ">退出全屏</customer-button>
      </div>
      <div class="fr">
        <!--<customer-button type="primary" @click="setStorageHandle">测试</customer-button>-->
        <customer-button type="primary" :plain="true" @click="jointOpinions" v-if="roleType === 1">联调意见</customer-button>
        <customer-button type="primary" @click="jointOver(0)" :plain="true" v-if="roleType === 2 && debugStatus === 3">联调不通过</customer-button>
        <customer-button type="primary" @click="jointOver(1)" v-if="roleType === 2 && debugStatus === 3">联调通过</customer-button>
        <customer-button type="primary" @click="jointOver(2)" v-if="roleType === 1 && debugStatus === 2">联调完成</customer-button>
      </div>
    </div>
    <div class="tm-body">

      <div class="colseTip" v-if="colseTipFlag">
        <span>本案已整合失败</span>
        <span class="colLink" style="text-decoration: none;" @click="showCaseFailReasonList">查看原因</span>
      </div>

      <el-alert
        v-if="baseInfoObject.caseStatus == 13"
        type="error"
        title=""
        center
        @close="handleAlertClose"
        :show-icon="false">
        <slot name="title">
          <span>本案已整合失败</span>
          <span class="colLink" style="text-decoration: none;" @click="showCaseFailReasonList">查看原因</span>
        </slot>
      </el-alert>
      <div class="fl" >
        <scrollTop :text="text"></scrollTop>
        <div style="margin-top: 164px;height: calc(100vh - 214px);border-right: 1px solid #ccc;position: relative;">
          <div class="btn" style="text-align: center;position: absolute;bottom: 80px; width: 100%;">
            <p style="font-size: 16px;line-height: 32px;">联调状态: {{debugStatusObject[debugStatus]}}</p>
            <customer-button :plain="true" size="mini" @click="showLogDialog">查看联调日志</customer-button>
          </div>
        </div>
      </div>
      <el-scrollbar  style="height: calc(100vh - 50px);">
      <div class="fr">

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
          <div class="paramsValue scroll-top-item">
            <div class="title">
              参数值
            </div>
            <div class="paramsValue-content" v-for="(item,idx) in paramsList" :key="idx">
              <div class="desc">
                {{item.categoryDesc}}
              </div>


              <div class="table" v-if="!item.hasGroupNum">
                <el-table
                  :data="item.params"
                  border

                >
                  <el-table-column prop="date" label="序号" width="50px">
                    <template slot-scope="scope">
                      {{scope.$index + 1}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="paramCode" label="参数"></el-table-column>
                  <el-table-column prop="paramName" label="中文">
                    <!--<template slot-scope="scope">-->
                    <!--<span v-ellipsis.20>{{scope.row.productName  + '' + scope.row.prodCode}}</span>-->
                    <!--</template>-->
                  </el-table-column>
                  <el-table-column prop="valueType" label="类型">
                    <!--1:数字,2:字符串,3:日期,4:金额-->
                    <template slot-scope="scope">
                      <span >
                        {{
                          scope.row.valueType === 1 ? 'Integer' :
                          scope.row.valueType === 2 ? 'String' :
                          scope.row.valueType === 3 ? 'Date' :
                          scope.row.valueType === 4 ? 'Decimal' :
                          scope.row.valueType === 5 ? 'JSON' : '--'
                        }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="paramValue" label="值">
                    <template slot-scope="scope">
                      <el-button type="text" v-if="scope.row.paramValue && scope.row.paramValue.indexOf('http') === 0" @click="openValue(scope.row.paramValue)">打开链接</el-button>
                      <span v-else>{{(scope.row.paramValue && scope.row.paramValue != 'null')  ? scope.row.paramValue : '-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dataSource" label="数据来源">
                    <template slot-scope="scope">
                      <!--0-接口 1-脚本 2-公式-->
                      <span>{{scope.row.dataSource === 0 ? '接口' : scope.row.dataSource === 1 ? '脚本' : scope.row.dataSource === 2 ? '公式' :  scope.row.dataSource === 3 ? '其他' : '--'}}</span>
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

              <div class="table" v-else>
                <el-table
                  :data="item.params"
                  border
                  :span-method="getObjectSpanMethod(item.params)"
                >
                  <el-table-column prop="groupNum" label="组别" width="50px"></el-table-column>
                  <el-table-column prop="date" label="序号" width="50px">
                    <template slot-scope="scope">
                      {{scope.$index + 1}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="paramCode" label="参数"></el-table-column>
                  <el-table-column prop="paramName" label="中文">
                    <!--<template slot-scope="scope">-->
                    <!--<span v-ellipsis.20>{{scope.row.productName  + '' + scope.row.prodCode}}</span>-->
                    <!--</template>-->
                  </el-table-column>
                  <el-table-column prop="valueType" label="类型">
                    <!--1:数字,2:字符串,3:日期,4:金额-->
                    <template slot-scope="scope">
                      <span >
                        {{
                          scope.row.valueType === 1 ? 'Integer' :
                          scope.row.valueType === 2 ? 'String' :
                          scope.row.valueType === 3 ? 'Date' :
                          scope.row.valueType === 4 ? 'Decimal' :
                          scope.row.valueType === 5 ? 'JSON' :  '--'
                        }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="paramValue" label="值">
                    <template slot-scope="scope">
                      <el-button type="text" v-if="scope.row.paramValue && scope.row.paramValue.indexOf('http') === 0" @click="openValue(scope.row.paramValue)">打开链接</el-button>
                      <span v-else>{{scope.row.paramValue}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dataSource" label="数据来源">
                    <template slot-scope="scope">
                      <!--0-接口 1-脚本 2-公式-->
                      <span>{{scope.row.dataSource === 0 ? '接口' : scope.row.dataSource === 1 ? '脚本' : scope.row.dataSource === 2 ? '公式' : scope.row.dataSource === 3 ? '其他' : '--'}}</span>
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
                <div class="button" style="text-align: center;margin-top: 25px;">
                  <el-button size="mini" plain v-if="item.hasGroupNum && !item.showAll" @click="toggleShowAll(item)">查看全部</el-button>
                  <el-button size="mini" plain v-if="item.hasGroupNum && item.showAll" @click="toggleShowAll(item)">收起</el-button>
                </div>

              </div>
            </div>


          </div>
          <div class="mainPart">
            <div class="title scroll-top-item">
              主体证明材料
            </div>
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
          <div class="eviInfo">
            <div class="title scroll-top-item">
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


    <!--联调意见-->
    <joint-opinion ref="jointOpinion"></joint-opinion>

    <!--联调状态变化-->
    <joint-status ref="jointStatus" @close="refreshStatus($event)"></joint-status>

  </div>
</template>

<script>
  import jointOpinion from './module/jointOpinion'
  import jointStatus from './module/jointStatus'
  import ScreenView from './module/screenView'
  import LogDialog from '../templateJoint/module/logDialog'
  import scrollTop from '@/components/scrollTop'
  import imgEvi from '@/components/script/imgEvi';
  export default {
    name: 'caseDetail',
    mixins:[imgEvi],
    components: {
      scrollTop,
      LogDialog,
      ScreenView,
      jointOpinion,
      jointStatus
    },
    data(){
      return {
        // 1-待设置 2-联调中 3-待法务确认 4-联调通过
        debugStatusObject: {1: '待设置', 2: '联调中', 3: '待确认' , 4: '联调通过' },
        roleNames: '',
        debugStatus: 0,
        reasonFlag: false,
        text: ['基本信息','参数值','主体证明材料','文书与证据'],
        caseOrderId: '',
        baseInfoObject: {},
        paramsList: [],
        litigantList: {},
        eviInfoObject: {eviList: []},
        caseFailReasonList: [],
        toggleScreenView: false,
        colseTipFlag: false,
        eviInfoObjectClone: {}
      }
    },
    computed:{
      roleType(){
        if(this.roleNames.indexOf("运营") !== -1){
          return 1;
        }
        else if(this.roleNames.indexOf("法务") !== -1){
          return 2;
        }
        return 0;
      }
    },
    methods: {

      openValue(url){
        window.open(url,'_blank')
      },
      jointOver(type){
        this.$refs.jointStatus.show(type, this.$route.query.prodTempId);

      },

      jointOpinions(){
        this.$refs.jointOpinion.show(this.caseOrderId);
      },




      getObjectSpanMethod(items){
          const currentList = items;
          console.error(currentList);
          return ({row, column, rowIndex, columnIndex ,property}) => {
            if ((columnIndex === 0 && column.property === 'groupNum') || (columnIndex === 7 && column.property === 'eviContent')) {
              console.log({row, column, rowIndex, columnIndex, property});
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


      //单元格合并
      objectSpanMethod({row, column, rowIndex, columnIndex ,property}) {
        const currentList = this.eviInfoObject.eviList;
        if (columnIndex === 0 || columnIndex === 6) {
          property = 'sortNum';
          if (rowIndex === 0 || (currentList[rowIndex] && row[property] !== currentList[rowIndex - 1][property])) {
            let idx = -1;
            for (let i = currentList.length - 1; i > rowIndex; i--) {
              if (currentList[i][property] === row[property]) {
                idx = i;
                break;
              }
            }

            if (idx != -1) {
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
        }
        else {
          return {
            rowspan: 1,
            colspan: 1
          };
        }

      },

      handleAlertClose(){
        this.colseTipFlag= true;
      },

      gotosqs(url){
        window.open(url+"?timestamp=" + new Date().valueOf(),"_blank");
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
        this.$refs.screenView.toggleShow(this.eviInfoObjectClone);
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

          // this.paramsList = [
          //   {categoryCode: 53777,
          //     params: [
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 1, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 2, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 2, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 2, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 3, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 3, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 4, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 5, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 6, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 6, isCorrect: 1, paramValue: "张三风"},
          //    ],
          //     categoryDesc: "测试内容o461"},
          //   {categoryCode: 53777,
          //     params: [
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人",  isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人",  isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人",  isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人",  isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人",  isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人",  isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人",  isCorrect: 1, paramValue: "张三风"},
          //    ],
          //     categoryDesc: "參數列表"},
          //   {categoryCode: 53777,
          //     params: [
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 1, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 2, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 2, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 2, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 3, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 3, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 4, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 5, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 6, isCorrect: 1, paramValue: "张三风"},
          //       {dataType: 2, errorReason: "必传项未传值", paramDesc: "出借人", groupNum: 6, isCorrect: 1, paramValue: "张三风"},
          //     ],
          //     categoryDesc: "基本信息"},
          //
          // ];
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
              console.error(arr1,arr2,it.params,'params');
              this.toggleShowAll(it);
            }
          })
          console.log(this.paramsList);

        })
      },

      arrayClone(arr){
        let newArr = [];
        arr.forEach(it => {
          newArr.push({...it});
        })
        return  newArr;
      },

      toggleShowAll(it){
          if(!it.paramsCopy){
            it.paramsCopy = this.arrayClone(it.params);
            it.params = it.params.filter(it => it.groupNum <= 2);
            this.$set(it,'showAll', false);
          }
          else{
            if(it.showAll){
              it.params = it.paramsCopy.filter(it => it.groupNum <= 2);
              it.showAll = false;
            }else{
              it.params = it.paramsCopy;
              it.showAll = true;
            }
          }

      },


      //设置storage.触发监听
      setStorageHandle(){
        localStorage.setItem("templateJointRefreshFlag", new Date().valueOf());
      },


      //主体证明材料
      queryLitigantList(){
        this.$http.post("/caseInfo/queryLitigantList.htm",{caseOrderId: this.caseOrderId}).then(res => {
            this.litigantList = res.result;
        })
      },

      queryEviInfo(){
        this.$http.post("/caseInfo/getEviInfoByCaseOrderId.htm",{caseOrderId: this.caseOrderId}).then(res => {
          this.eviInfoObjectClone  =  JSON.parse(JSON.stringify(res.result));
          let obj = this.eviInfoObjectClone.eviList.pop();
          this.eviInfoObjectClone.eviList.unshift(obj);
          console.error(this.eviInfoObjectClone.eviList);

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

      refreshStatus(e){
          console.log(e);
          if(e=== 2){
            this.$router.push({path: '/tmCaseDetail',query: {caseOrderId: this.$route.query.caseOrderId, prodTempId: this.$route.query.prodTempId, productId: this.$route.query.productId , debugStatus: 3}})
            this.debugStatus = 3;
          }else if(e === 0){
            this.$router.push({path: '/tmCaseDetail',query: {caseOrderId: this.$route.query.caseOrderId, prodTempId: this.$route.query.prodTempId, productId: this.$route.query.productId , debugStatus: 2}})
            this.debugStatus = 2;
          }else if(e === 1){
            this.$router.push({path: '/tmCaseDetail',query: {caseOrderId: this.$route.query.caseOrderId, prodTempId: this.$route.query.prodTempId, productId: this.$route.query.productId , debugStatus: 4}})
            this.debugStatus = 4;
          }
          this.setStorageHandle();
      }
    },
    created(){
      this.caseOrderId = this.$route.query.caseOrderId;
      this.roleNames = JSON.parse(localStorage.getItem('loginInfo')).roleNames;
      this.debugStatus = +this.$route.query.debugStatus;

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
      position: relative;
      .colseTip{
        position: absolute;
        right: 0;
        top: 50px;
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
              width: calc(100% - 100px);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
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
