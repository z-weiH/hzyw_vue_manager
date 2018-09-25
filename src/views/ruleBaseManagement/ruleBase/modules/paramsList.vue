<template>
    <div class="paramList">
      <div class="parameter-list-title">
        <div class="width-1200">参数列表</div>
      </div>
      <div class="content">
        <div class="m-left">
          <el-menu
            default-active="1-1"
            background-color="#fff"
            text-color="#7C7C7C"
            active-text-color="#13367D"
            >
            <el-submenu index="1" >
              <span slot="title">字段列表</span>

              <el-menu-item-group>
                <el-menu-item v-for="(item,idx) in numList"  :index="'1-'+ (idx+ 1)" :key="idx" @click="showFieldList(idx)">案件样例{{idx + 1}}</el-menu-item>
              </el-menu-item-group>

            </el-submenu>
            <el-submenu index="2" >
              <span slot="title">证据列表</span>

              <el-menu-item-group>
                <el-menu-item v-for="(item,idx) in numList"  :index="'2-'+ (idx+ 1)" :key="idx" @click="showEviList(idx)">案件样例{{idx + 1}}</el-menu-item>
              </el-menu-item-group>

            </el-submenu>

            <el-menu-item index="3" @click="returnCodeList()">
              <span slot="title" >返回编码</span>
            </el-menu-item>

          </el-menu>
        </div>
        <div class="m-right">
          <div class="m-header">{{currentTitle}}</div>
          <div class="fieldList" v-if="tab === 0">
            <el-table  :data="currentList"  border  style="width: 100%" key="fieldList"
                       :header-cell-style="getRowStyle"
                       @cell-click="cellClick"
            >
              <el-table-column prop="fieldName" label="字段名称" width="283"> </el-table-column>
              <el-table-column prop="fieldCode" label="英文名称" width="283"> </el-table-column>
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
              <el-table-column prop="eviCode" label="英文名称" width="180"> </el-table-column>
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
              <el-table-column prop="returnCode" label="返回编码" width="283"> </el-table-column>
              <el-table-column prop="desc" label="含义（审核意见）" width="283"> </el-table-column>
            </el-table>
          </div>

        </div>
        <div class="clear"></div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'paramsList',
      data(){
          return{
            //当前的激活的tab 0-字段列表, 1-证据列表,2-返回编码
            tab: 0,
            //案列数量
            numList: [],
            //字段列表
            result: {},
            //当前字段列表
            currentList: [],
            //当前title
            currentTitle:''

          }
      },
      mounted(){
        let sampleId = this.$route.query.sampleId;
        if(!sampleId){
          this.initParamterList();
        }
        else{
          this.initParamterListBySampleId(sampleId);
        }
      },
      methods:{
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
              this.initList();
            }
          })
        },
        openView(url){
          window.open(url,"_blank");
        },
        //修改值
        cellClick(row, column, cell, event){
          console.log(row);
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
          this.currentTitle = '字段列表（案件样例'+ (idx+1) + ')';

        },
        //切换证据列表
        showEviList(idx){
          this.tab = 1;
          this.currentList = this.result.eviList[idx];
          console.log(this.currentList);
          this.currentTitle = '字段列表（证据列表'+ (idx+1) + ')';

        },
        //切换返回编码
        returnCodeList(){
          this.tab = 2;
          this.currentList = this.result.returnCodeList;
          console.log(this.currentList);
          this.currentTitle = '返回编码';
        },
        //initList
        initList(){
          this.tab = 0;
          this.currentList = this.result.fieldList[0];

          this.currentTitle = '字段列表（案件样例1）';
        },
        initParamterList(){
          this.$http.post('/paramsList/queryParamsList.htm').then(res => {
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


</style>
