<template>
    <div class="caseDetail_1">
      <div class="tm-head">
        <div class="fl">
          <span>案件详情</span>
        </div>
        <div class="fr">
          <customer-button type="primary">去审核</customer-button>
        </div>
      </div>
      <div class="tm-body">
        <div class="fl" >
          <scrollTop :text="text"></scrollTop>
          <div style="margin-top: 123px;height: calc(100vh - 123px);border-right: 1px solid #ccc;position: relative;">
            <div class="btn" style="text-align: center;position: absolute;bottom: 80px; width: 100%;">
              <customer-button :plain="true" size="mini" @click="showLogDialog">查看联调日志</customer-button>
            </div>
          </div>
        </div>
        <el-scrollbar style="height: calc(100vh - 50px);">
          <div class="fr">
            <div class="baseInfo scroll-top-item">
              <div class="title">
                基本信息
              </div>
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
                        <span >{{scope.row.valueType === 1 ? 'Integer' : scope.row.valueType === 2 ? 'String' : scope.row.valueType === 3 ? 'Date' : scope.row.valueType === 4 ? 'Decimal' : '--'}}</span>
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
                        <span>{{scope.row.dataSource === 0 ? '接口' : scope.row.dataSource === 1 ? '脚本' : scope.row.dataSource === 2 ? '公式' : '--'}}</span>
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
          </div>

        </el-scrollbar>

      </div>
    </div>
</template>

<script>
  import scrollTop from '@/components/scrollTop'
  export default {
    name: 'caseDetail',
    components: {
      scrollTop
    },
    data() {
      return {
        text: ['基本信息','文书与证据', '参数值'],
        eviInfoObject: {},
        eviInfoObjectClone: {},
        paramsList: []
      }
    },
    methods: {

      showLogDialog(){

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
            }
          })
          console.log(this.paramsList);

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
    },
     created(){
      this.queryEviInfo();
      this.queryParamsList();
     }
  }
</script>

<style lang="scss">
.caseDetail_1{
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
}
</style>
