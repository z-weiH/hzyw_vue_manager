<template>
  <div class="data-management">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">数据管理</a>
    </div>


    <template v-if="editState === 0">
      <div class="item-search">
        <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl"></searchs>
      </div>
      <div class="item-title of-hidden">
        <span class="item-title-sign">数据列表</span>
      </div>
      <div class="item-table">
        <table-component ref="table" :needSingleCheck="true" :pager="pager"  :noPager="true" :table-data="tableData" :column-define="columnDefine">
          <el-table-column label="操作"  slot="defineCol" >
            <template slot-scope="scope">
              <span class="colLink" @click="editHandle(scope.row)">修改</span>
              <span @click="deleteHandle(scope.row)" class="colLink" style="color: #3A3A3A;margin-left: 10px;" >删除</span>
            </template>
          </el-table-column>
        </table-component>

        <div class="center mt-20 mb-20">
          <el-button type="primary" @click="createHandle">新增数据</el-button>
        </div>

      </div>
    </template>
    <template v-if="editState === 1">
      <div class="parameter-page">
        <div class="m-c1">
          <div class="fl global-parameters" :class="{active : paramLevel === 0}">
            <span @click="paramLevel = 0;" class="cursor">全局参数</span>
          </div>
          <div class="fl business-parameters" :class="{active : paramLevel === 1}">
            <span @click="paramLevel = 1;" class="cursor">业务参数</span>
          </div>
        </div>

        <div v-if="paramLevel === 1" class="m-c2">
          <el-select style="width:268px;" v-model="bizType" placeholder="请选择业务类型">
            <el-option label="现金贷" value="10"></el-option>
            <el-option label="消费分期" value="20"></el-option>
            <el-option label="融资租赁" value="30"></el-option>
          </el-select>
        </div>

        <div class="m-c3 mt-10">
          <el-table  :data="tableData1" border>
            <el-table-column prop="respondents" label="参数">
              <template slot-scope="scope">
                <span class="parameter-text">{{scope.row.paramCode}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="paramName" label="中文"></el-table-column>
            <el-table-column prop="paramValue" label="值">
              <template slot-scope="scope">
                <el-input v-model="scope.row.paramValue" ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </template>

    <el-dialog
      ref="dialog"
      :visible.sync="showDailog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="新增数据"
      width="640px"
      center>
      <div style="margin: 0 100px;">
        <edits class="item-edits" formname="changePwd" ref="edits" :editItems="editItems" :item="item" :labelWidth="'100px'"></edits>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary"   @click="saveHandle" :disabled="isDisabled">保 存</el-button>
          <el-button @click="showDailog= false;">取 消</el-button>
        </span>
    </el-dialog>

    <div class="footerBtn" v-if="editState === 1">
      <div class="btns-container">
        <div class="btns">
          <el-button type="primary" @click="saveParametersHandle" :disabled="isDisabled">保 存</el-button>
          <el-button @click="editState = 0;">取 消</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Edits from '@/components/edits'
  import Searchs from "@/components/searchs";
  import Mixins from "@/components/script/_mixin";
  import TableComponent from "@/components/table";
  import formCheck from '@/components/script/formCheck'
  export default {
    name:'dataManagement',
    mixins: [Mixins,formCheck],
    data() {
      return {
        currentDataRow : null,
        paramLevel : 0,
        bizType : '',
        tableData1 : [{respondents : '就飞快的接口'}],
        editState: 0,
        queryUrl: '/templateData/queryTemplateDataByBaseQuery.htm',
        searchItems: [
          {
            type: "text",
            placeholder: "请输入数据名称",
            property: "dataName",
            colSpan: 6
          },
          {type: 'date',placeholder: '请输入开始时间', property: 'startDate', colSpan: 4, lt: 'endDate'},
          {type: 'date',placeholder: '请输入结束时间', property: 'endDate', colSpan: 4, gt: 'startDate'},
        ],
        searchItem:{},
        columnDefine:[
          { label: "数据名称", property: "dataName"},
          { label: "创建日期", property: "startDate"},
          { label: "备注", property: "remark"},
        ],
        //控制弹窗
        showDailog: false,
        item: {},
        editItems: [
          {label: '数据名称：', property: 'dataName', type : 'text',placeholder:'请输入数据名称',rule:'require'},
          {label: '备注：', property: 'remark', type : 'textarea',placeholder:'请勿超过30个数字'}
        ],
        isDisabled: false //控制保存按钮
      }
    },
    watch:{
      'bizType':function (val,oldval) {
        this.changeHandle(this.currentDataRow);
      },
      'paramLevel': function (val,oldval) {
        if(val === 0){
          this.bizType = '';
        }
        this.changeHandle(this.currentDataRow);
      },
    },
    methods:{
      //新增操作
      createHandle(){
        this.showDailog = true;
        this.item = {};
        this.$nextTick(() => {
          this.resetForm();
        })
      },
      saveParametersHandle(){
        if(!this.isDisabled) {
          this.isDisabled = true;

          this.$http.post('/templateData/saveTemplateDataById.htm', {list: this.tableData1}, {mheaders: true})
            .then(res => {
              if (res.code === '0000') {
                this.$message.success(res.description);
                setTimeout(() => {
                  this.isDisabled = false;
                },200)
              }
            })
        }
      },
      editHandle(row){
        this.$http.post('/templateData/queryTemplateDataByDataId.htm',{dataId: row.dataId})
          .then(res => {
            if(res.code === '0000'){
              this.currentDataRow = row;
              this.tableData1 = res.result.list;
              if(!this.editState)
                this.editState = 1;

            }
          })
      },
      changeHandle(row){
        this.$http.post('/templateData/queryTemplateDataByDataId.htm',{bizType: this.bizType,dataId: row.dataId,paramLevel: this.paramLevel})
          .then(res => {
            if(res.code === '0000'){
              this.currentDataRow = row;
              this.tableData1 = res.result.list;
              if(!this.editState)
                this.editState = 1;

            }
          })
      },
      //新增数据保存
      saveHandle(){
        if(!this.isDisabled){
          this.isDisabled = true;
          this.checkbeforeSave().then(() => {
            let obj = this.$refs.table.selectedRow ? {dataId : this.$refs.table.selectedRow.dataId} : {};
            this.$http.post("/templateData/saveTemplateDataByDataId.htm",Object.assign(obj,this.item))
              .then(res => {
                if(res.code === '0000'){
                  this.showDailog = false;
                  this.doQuery(this.queryUrl,this.searchItem);
                  this.changeHandle({dataId:res.result});
                  setTimeout(() => {
                    this.isDisabled = false;
                  },200)
                }
              })
          }).catch(()=>{})
        }


      },
      HandleCreate(){

      },
      deleteHandle(row){
        this.showConfirm().then((r) => {
          if(r){
            this.$http.post('/templateData/deleteTemplateDataByDataId.htm',{dataId: row.dataId})
              .then(res => {
                console.log(res);
                if(res.code === '0000'){
                  this.$message.success("删除成功");
                  this.doQuery(this.queryUrl,this.searchItem);
                }
              })
          }

        }).catch(() => {})
      },
      doQuery(url,searchItem) {
        this.$http.post(this.queryUrl, this.searchItem)
          .then(res => {
            if(res.code === '0000'){
              this.tableData = res.result;
            }
          })
      }
    },
    components:{
      TableComponent,
      Searchs,
      Edits
    },
    created() {
      this.doQuery(this.queryUrl,this.searchItem);
    }
  }
</script>

<style lang="scss" scoped>

.data-management{
  .footerBtn{
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    height: 70px;
    .btns-container{
      width:1200px;
      margin: 0 auto;
      height: 100%;
    }
    .btns{
        margin-left: 240px;
        height: 100%;
        text-align: center;

    }
  }
  .parameter-page{
    padding-bottom: 80px;
    .m-c1{
      position: relative;
      height: 50px;
      background-color: #EEF3FF;
      line-height: 50px;
      font-size: 16px;
      border: 1px solid #ddd;
      .active{
        color: #0f357f;
      }
      .global-parameters{
        width: 50%;
        box-sizing: border-box;
        text-align: center;
      }
      .business-parameters{
        border-left: 1px solid #ddd;
        width: 50%;
        box-sizing: border-box;
        text-align: center;
      }
    }
    .m-c2{
      border: 1px solid #ddd;
      border-top: none;
      padding: 10px;
      background-color: #fff;
    }
    .el-table td{
      cursor: pointer;
    }
  }
}


</style>
