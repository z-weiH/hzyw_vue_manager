<template>
    <div class="paramList">
      <div class="parameter-list-title">
        <div class="width-1200">
          <!--<span v-if="$route.query.sampleName">{{$route.query.sampleName}}</span>-->
          <el-popover
            placement="bottom"
            class="fr"
            ref="popover"
            width="120"
            style="margin:0;"
            trigger="click">
            <div class="dropdown-content" :style="{'height': (result.paramsList && result.paramsList .length > 10 ) ? '280px' : 'auto'}">
                <el-scrollbar style="height: 100%">
                  <div class="content" style="width: 120px;">
                    <ul>
                      <li style="line-height: 30px;font-size: 14px;cursor: pointer;width: 115px;margin: 0;"  v-for="(item,idx) in result.paramsList" :key="idx" @click="paramChange(item,idx)">{{item.sampleName}}</li>
                    </ul>
                  </div>
                </el-scrollbar>


            </div>
            <span slot="reference" class="el-dropdown-link" style="font-size: 14px;line-height: 30px;cursor: pointer;">
              {{paramName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </el-popover>
          参数列表
        </div>
      </div>
      <div class="content">
        <div class="m-left">
          <el-menu
            default-active="1"
            background-color="#fff"
            text-color="#7C7C7C"
            active-text-color="#13367D"
            >
            <el-menu-item index="1" @click="tabChange(0)">
              <span slot="title" >字段列表 <b v-if="numList.length === 0">(暂无样例)</b></span>
              <!--<el-menu-item-group>-->
                <!--<el-menu-item v-for="(item,idx) in numList"  :index="'1-'+ (idx+ 1)" :key="idx" @click="showFieldList(idx)">案件样例{{idx + 1}}</el-menu-item>-->
              <!--</el-menu-item-group>-->

            </el-menu-item>
            <el-menu-item index="2" @click="tabChange(1)">
              <span slot="title" >证据列表 <b v-if="numList.length === 0">(暂无样例)</b></span>

              <!--<el-menu-item-group>-->
                <!--<el-menu-item v-for="(item,idx) in numList"  :index="'2-'+ (idx+ 1)" :key="idx" @click="showEviList(idx)">案件样例{{idx + 1}}</el-menu-item>-->
              <!--</el-menu-item-group>-->

            </el-menu-item>

            <el-menu-item index="3" @click="selfReturnCodeList()">
              <span slot="title" >返回编码(当前客户)</span>
            </el-menu-item>
            <el-menu-item index="4" @click="returnCodeList()">
              <span slot="title" >返回编码(公共)</span>
            </el-menu-item>

          </el-menu>
        </div>
        <div class="m-right">
          <div class="m-header">
            <div class="fr add_btn" v-if="tab >= 2">
              <span @click="addCode">+添加</span>
            </div>
            {{currentTitle}}
          </div>
          <div class="fieldList" v-if="tab === 0">
            <el-table  :data="currentList"  border  style="width: 100%" key="fieldList"
                       :header-cell-style="getRowStyle"
                       @cell-click="cellClick"
                       :cell-style="styleFun"


            >
              <el-table-column prop="fieldName" label="字段名称" width="283"> </el-table-column>
              <el-table-column prop="fieldCode" label="英文名称" width="283">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="right" width="80">
                    <el-button type="primary" @click="copyStr(scope.row.fieldCode)">复制</el-button>
                    <span slot="reference" class="name-wrapper">
                      {{ scope.row.fieldCode }}
                    </span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="fieldValue" label="值" width="283"> </el-table-column>

            </el-table>

          </div>
          <div class="fieldList" v-if="tab === 1">

            <el-table
              :data="currentList"
              :span-method="objectSpanMethod1"
              :header-cell-style="getRowStyle"

              border
              style="width: 100%; margin-top: 20px" key="eviList">
              <el-table-column prop="type" label="序号" width="130"> </el-table-column>
              <el-table-column prop="eviName" label="证据名称" width="189"> </el-table-column>
              <el-table-column prop="eviCode" label="英文名称" width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="right" width="80">
                    <el-button type="primary" @click="copyStr(scope.row.eviCode)">复制</el-button>
                    <span slot="reference" class="name-wrapper">
                      {{ scope.row.eviCode }}
                    </span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="eviFormat" label="格式" width="170"> </el-table-column>
              <el-table-column  label="操作" width="180">
                <template slot-scope="scope">
                  <div style="text-align: center;">
                    <span class="colLink" @click="openView(scope.row.eviUrl)">查看</span>
                  </div>
                </template>
              </el-table-column>

            </el-table>
          </div>
          <div class="fieldList" v-if="tab === 2">
            <el-table
              :data="currentList"
              :span-method="objectSpanMethod2"
              :header-cell-style="getRowStyle"
              border
              key="returnCodeList"
              style="width: 100%; margin-top: 20px">
              <el-table-column prop="module" label="模块" width="283">
                <template slot-scope="scope">
                  <div style="text-align: center;">
                    <span>{{getModuleName(scope.row.module)}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="returnCode" label="返回编码" width="283">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="right" width="80">
                    <el-button type="primary" @click="copyStr(scope.row.returnCode)">复制</el-button>
                    <span slot="reference" class="name-wrapper">
                      {{ scope.row.returnCode }}
                    </span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="desc" label="含义（审核意见）" width="283"> </el-table-column>
            </el-table>
          </div>

          <div class="fieldList" v-if="tab === 3">
            <el-table
              :data="currentList"
              :span-method="objectSpanMethod2"
              :header-cell-style="getRowStyle"
              border
              key="returnCodeList"
              style="width: 100%; margin-top: 20px">
              <el-table-column prop="module" label="模块" width="283">
                <template slot-scope="scope">
                  <div style="text-align: center;">
                    <span>{{getModuleName(scope.row.module)}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="returnCode" label="返回编码" width="283">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="right" width="80">
                    <el-button type="primary" @click="copyStr(scope.row.returnCode)">复制</el-button>
                    <span slot="reference" class="name-wrapper">
                      {{ scope.row.returnCode }}
                    </span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="desc" label="含义（审核意见）" width="283"> </el-table-column>
            </el-table>
          </div>

        </div>
        <div class="clear"></div>
      </div>

      <el-dialog
        :visible.sync="editFlag"
        v-dialogDrag
        title="修改字段值"
        width="545px"
        :close-on-click-modal="false"
        center>
        <el-form  :inline="true" class="form-box" :rules="rules" ref="fieldForm" :model="fieldForm">
        <el-form-item   :label="fieldForm.fieldName" prop="fieldValue" class="mt-30">
          <el-input style="width: 320px;"
            v-model.trim="fieldForm.fieldValue">
          </el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="saveParamter">确认修改</el-button>
            <el-button @click="editFlag = false;">取 消</el-button>
          </span>
      </el-dialog>

      <addCodeDialog ref="addCodeDialog"></addCodeDialog>
    </div>
</template>

<script>
  import addCodeDialog from './addCodeDialog'
  import copy from '@/assets/js/copy.js'
    export default {
      name: 'paramsList',
      components: {
        addCodeDialog
      },
      data(){
          return{
            currentObj: {},
            //参数列表名字
            paramName: '参数列表',
            //当前的激活的tab 0-字段列表, 1-证据列表,2-返回编码 3-私有编码
            tab: 0,
            //案列数量
            numList: [],
            //字段列表
            result: {},
            //当前字段列表
            currentList: [],
            //当前title
            currentTitle:'',
            editFlag: false,
            fieldForm: {},
            rules : {
              fieldValue : [
                { required : true , message : '请输入内容' , trigger : 'blur'},
              ],

            },

          }
      },
      mounted(){
        let sampleId = this.$route.query.sampleId;
        if(!sampleId){
          let levelId = this.$route.query.levelId;
          this.initParamterList(levelId);
        }
        else{
          this.initParamterListBySampleId(sampleId);
        }
      },
      methods:{

        tabChange(tab){
          this.tab = tab;
          if(this.tab === 0){
            this.currentList = this.currentObj.field;
            this.currentTitle = '字段列表（'+  this.currentObj.sampleName  + ')';
          }
          else if(this.tab === 1){
            this.currentList = this.currentObj.evi;
            this.currentTitle = '字段列表（'+  this.currentObj.sampleName  + ')';
          }
          console.log(tab, this.currentList)

        },

        paramChange(item,idx){
          this.paramName = item.sampleName;
          this.currentObj = this.result.paramsList[idx];
          if(this.tab === 0){
            this.currentList = this.result.paramsList[idx].field;
            this.currentTitle = '字段列表（'+  this.currentObj.sampleName  + ')';
          }
          else if(this.tab === 1){
            this.currentList = this.result.paramsList[idx].evi;
            this.currentTitle = '字段列表（'+  this.currentObj.sampleName  + ')';

          }
          this.$refs.popover.showPopper = false;
        },

        addCode(){
          let obj = {clientCode: this.result.clientCode, clientName: this.result.clientName, codeIndex: this.result.codeIndex};
          if(this.tab === 2){
            obj.clientCode = '0';
            obj.codeIndex = '100';
            obj.clientName = '公共';
          }
          this.$refs.addCodeDialog.init(obj);
        },

        styleFun({row, column, rowIndex, columnIndex}){
          if(columnIndex === 2){
            return {'cursor':'pointer'};
          }
          return null;
        },
        //复制参数
        copyStr(str){
          copy(str,() => {this.$message.success(`已成功复制${str}`);});
        },
        //修改参数
        saveParamter(){
          console.log(this.$refs);
          this.$refs.fieldForm.validate(res => {
            if(res){
              this.$http.post("/paramsList/saveParamsList.htm",{...this.fieldForm,levelId: this.$route.query.levelId,sampleId: this.$route.query.sampleId}).then(res => {
                if(res.code === '0000'){
                  this.$message.success("修改成功");
                  this.editFlag = false;
                  let item = this.currentList.find(it => it.fieldCode === this.fieldForm.fieldCode);
                  if(item)
                    this.$set(item,'fieldValue',this.fieldForm.fieldValue);
                }
              })
            }
          })
        },

        initParamterListBySampleId(sampleId){
          this.$http.post("/caseSample/queryParamListBySampleId.htm",{sampleId: sampleId}).then(res => {
            if(res.code === '0000'){
              this.numList = new Array(res.result.fieldList.length);
              this.result = res.result;
              let compare = (a,b) => a.type-b.type;
              this.result.eviList.forEach(it => {
                it.sort(compare);
              });
              let compare2 = (a,b) => {
                if(a.module != b.module){
                  return a.module - b.module;
                }else{
                  return Number(a.returnCode) - Number(b.returnCode);
                }
              }
              this.result.returnCodeList.sort(compare2);
              // this.paramChange(this.result.fieldList[0], 0)

              let  result = [];
              this.result.eviList.forEach(it => {
                if(it[0]){
                  let obj = {evi:it};
                  obj.sampleName = this.$route.query.sampleName;
                  result.push(obj);
                  let item = this.result.fieldList.find(ii => ii.find(i => i.sampleId === it[0].sampleId));
                  if(item){
                    obj.field = item;
                  }
                }
              })
              this.result.paramsList = result;
              console.log(this.result,'result');
              this.paramChange(this.result.paramsList[0], 0)

              this.initList();
            }
          })
        },
        openView(url){
          window.open(url.replace('http','https'),"_blank");
        },
        //修改值
        cellClick(row, column, cell, event){
          console.log(row, column, cell, event);
          if(column.property === 'fieldValue'){
            this.editFlag = true;
            this.fieldForm = {...row};
            console.log(this.fieldForm);
          }
        },
        getRowStyle(){
          return {'background':'#EEF3FF','font-weight':'bold'};
        },
        //获取module名称
        getModuleName(module){
          // 0-身份证意见，1-签名意见，2-证据意见，3-系统意见，4-其他意见
          if(module === 0){
            return '身份证意见';
          }
          if(module === 1){
            return '签名意见';
          }
          if(module === 2){
            return '证据意见';
          }
          if(module === 3){
            return '系统意见';
          }
          if(module === 4){
            return '其他意见';
          }
        },
        //单元格合并
        objectSpanMethod({ row, column, rowIndex, columnIndex ,property}) {
          if (columnIndex === 0) {
            if(rowIndex === 0 ||  (this.currentList[rowIndex] && row[property] !== this.currentList[rowIndex-1][property])){
              let idx = -1;
              for(let i = this.currentList.length -1 ;i> rowIndex; i--){
                if(this.currentList[i][property] === row[property]){
                  idx = i;
                  break;
                }
              }

              if(idx!= -1){
                console.log(rowIndex,idx-rowIndex + 1);
                return {
                  rowspan: idx - rowIndex + 1,
                  colspan: 1
                }
              }else{
                  return {
                    rowspan: 1,
                    colspan: 1
                  };
              }
            }else{
              return {
                rowspan: 1,
                colspan: 0
              };
            }

          }
        },

        objectSpanMethod1({ row, column, rowIndex, columnIndex }){
          return this.objectSpanMethod({row, column, rowIndex, columnIndex, property: 'type'});
        },
        objectSpanMethod2({ row, column, rowIndex, columnIndex }){
          return this.objectSpanMethod({row, column, rowIndex, columnIndex, property: 'module'});
        },
        //切换字段列表
        showFieldList(idx){
          this.tab= 0;
          this.currentList = this.result.fieldList[idx];
          console.log(this.currentList);
          this.currentTitle = '字段列表（案件样例'+  this.result.paramsList[0].sampleName  + ')';

        },
        //切换证据列表
        showEviList(idx){
          this.tab = 1;
          this.currentList = this.result.eviList[idx];
          console.log(this.currentList);
          this.currentTitle = '字段列表（证据列表'+  this.result.paramsList[0].sampleName  + ')';

        },
        //切换返回编码
        returnCodeList(){
          this.tab = 2;
          this.currentList = this.result.returnCodeList;
          console.log(this.currentList);
          this.currentTitle = '返回编码(公共)';
        },
        //私有返回编码
        selfReturnCodeList() {
          this.tab = 3;
          console.log(this.result);
          this.currentList = this.result.reasonList;
          this.currentTitle = '返回编码（当前客户）';
        },


        //initList
        initList(){
          if(this.numList.length > 0){
            this.tab = 0;
            this.currentList = this.result.fieldList[0];
            this.currentTitle = '字段列表（'+ this.result.paramsList[0].sampleName +'）';
          }else{
            this.tab = 2;
            this.currentList = this.result.returnCodeList;
            this.currentTitle = '返回编码';
          }

        },
        initParamterList(levelId){
          this.$http.post('/paramsList/queryParamsList.htm',{levelId: levelId}).then(res => {
            if(res.code === '0000'){
              this.numList = new Array(res.result.fieldList.length);
              this.result = res.result;
              this.result.fieldList.forEach(it => {
                it.forEach(i => {
                  if(i.fieldValue == 'null'){
                    i.fieldValue = '';
                  }
                })
              })
              let compare = (a,b) => a.type-b.type;
              this.result.eviList.forEach(it => {
                it.sort(compare);
              });
              let compare2 = (a,b) => {
                if(a.module != b.module){
                  return a.module - b.module;
                }else{
                  return Number(a.returnCode) - Number(b.returnCode);
                }
              }
              this.result.returnCodeList.sort(compare2);

              let  result = [];
              this.result.eviList.forEach(it => {
                if(it[0]){
                  let obj = {evi:it};
                  obj.sampleName = it[0].sampleName;
                  result.push(obj);
                  let item = this.result.fieldList.find(ii => ii.find(i => i.sampleId === it[0].sampleId));
                  if(item){
                    obj.field = item;
                  }
                }
              })
              this.result.paramsList = result;
              console.log(this.result,'result');
              this.paramChange(this.result.paramsList[0], 0)

              this.initList();
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">


  .paramList{
    background:#f7f7f7;
    height: 100%;
    overflow: auto;

  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
    height:1px;
  }
  .router-slid-enter, .router-slid-leave-active {
    height: auto;
  }

  .m-header{
    line-height: 50px;
    font-size: 18px;
    background: #EEF3FF;
    padding-left:20px;
  }
  .parameter-list-title {
    height: 75px;
    background-color: #fff;
    box-sizing: border-box;
    .width-1200 {
      width: 1200px;
      margin: 0 auto;
      font-size: 30px;
      color: #0f357f;
      padding-top: 21px;
    }
  }

  .content{
    width: 1200px;
    margin: 10px auto 0 ;

    .m-left{
      float: left;
      width: 300px;
      box-sizing: border-box;
      border: 1px solid #EBEFF1;
      border-right: none;
      li{
        .li_ul{
          background:#fff;
          li{
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            text-align: center;
            color: #878787;
          }
        }
      }
      .m-header{
        cursor: pointer;
        text-align: center;
      }

    }
    .m-right{
      float: left;
      margin-left: 10px;
      box-sizing: border-box;
      width: 890px;
      background: #fff;
      .fieldList{
        padding: 20px 25px 30px 15px;
      }
    }
  }
  .add_btn{
    font-size: 16px;
    margin-right: 20px;
    cursor: pointer;
  }


</style>
