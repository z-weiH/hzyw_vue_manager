<template>
    <div class="templateJoint">
      <div class="wsbodyhead">
        <a>所在位置</a>
        <a>客户管理 </a>
        <a href="javascript:;" class="aside_tit">模板联调</a>
      </div>

      <div class="item-search">
        <el-form :inline="true" ref="searchItem" :model="searchItem" label-width="80px">
          <el-form-item label="" prop="keyWords" style="margin-bottom: 0;">
            <el-input style="width: 400px;" v-model.trim="searchItem.keyWords" placeholder="请输入客户名称、产品名称、模板号"></el-input>
          </el-form-item>
          <el-form-item label="" prop="debugStatus" style="margin-bottom: 0;">
            <el-select clearable v-model="searchItem.debugStatus" placeholder="联调状态">
              <el-option v-for="(value,key,idx) in debugStatusObject" :label="value" :value="key" :key="idx"></el-option>
            </el-select>
          </el-form-item>

          <customer-button @click="handleSearch" type="warning">查询</customer-button>
        </el-form>
      </div>

      <div class="item-title of-hidden">
        <span class="item-title-sign">模板列表</span>
      </div>

      <div class="item-table">
        <el-table
          :data="tableData"
          border
        >
          <el-table-column prop="date" label="序号" width="50px">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="clientName" label="客户名称" >
          </el-table-column>
          <!--0:进行中；1：已完成；2：失败-->
          <el-table-column prop="productName" label="产品名称">
          </el-table-column>
          <el-table-column prop="prodTempCode" label="模板号" ></el-table-column>
          <el-table-column prop="debugStatus" label="联调状态">
            <template slot-scope="scope">
              <span>{{debugStatusObject[scope.row.debugStatus]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="pushTime" label="最新案件推送时间"></el-table-column>

          <el-table-column prop="respondents" label="操作">
            <template slot-scope="scope">
              <customer-button @click="handleCaseClick(scope.row)" v-if="scope.row.debugStatus != 1"  type="text">案件</customer-button>
              <customer-button @click="handleApiClick(scope.row)"  type="text">接口</customer-button>
              <customer-button @click="handleLogClick(scope.row)"  type="text">日志</customer-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          class="mt-10 mb-10"
          @size-change="handleSizeChange($event,1)"
          @current-change="handleCurrentChange($event,1)"
          :current-page="pager.currentNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pager.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pager.count">
        </el-pagination>

      </div>



      <!--案件列表-->
      <el-dialog
        :visible.sync="caseFlag"
        v-dialogDrag
        :title="currentProduct"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="500"
      >
        <el-form :inline="true" >
          <el-form-item label="" prop="keyWords" >
            <el-input style="width: 400px;" v-model.trim="casekeyWords" placeholder="借款单号、被申请人姓名"></el-input>
          </el-form-item>
          <customer-button @click="handlecaseSearch" type="warning">查询</customer-button>
        </el-form>
        <el-table
          :data="caseList"
          border
        >
          <el-table-column prop="date" label="序号" width="50px">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="loanBillNo" label="借款单号" >
          </el-table-column>
          <!--0:进行中；1：已完成；2：失败-->
          <el-table-column prop="respondents" label="被申请人姓名">
          </el-table-column>
          <el-table-column prop="pushTime" label="推送时间" ></el-table-column>
          <el-table-column prop="debugCount" label="联调意见">
            <template slot-scope="scope">
              <span>{{scope.row.debugCount + '条'}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="respondents" label="操作">
            <template slot-scope="scope">
              <customer-button @click="handleProductCaseView(scope.row)"  type="text">查看</customer-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class="mt-10 mb-10"
          @size-change="handleSizeChange($event,0)"
          @current-change="handleCurrentChange($event,0)"
          :current-page="casePager.currentNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="casePager.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="casePager.count">
        </el-pagination>

      </el-dialog>


      <!--日志弹窗-->
      <log-dialog ref="logDialog"></log-dialog>

    </div>
</template>

<script>
  import LogDialog from './module/logDialog'
    export default {
      name: 'templateJoint',
      components: {
        LogDialog
      },
      data() {
        return {
          searchItem: {},
          // 1-待设置 2-联调中 3-待法务确认 4-联调通过
          debugStatusObject: {1: '待设置', 2: '联调中', 3: '待法务确认' , 4: '联调通过' },

          currentProduct: '',
          caseFlag: false,
          //案件搜索關鍵字
          casekeyWords: '',
          caseList: [],
          currentTm: {},
          tableData: [],
          pager:{
            currentNum:1 ,
            pageSize: 10,
            count: 0
          },
          casePager: {
            currentNum:1 ,
            pageSize: 10,
            count: 0
          }
        }
      },
      methods: {
        doQuery(){
          this.$http.get('/productTemplate/queryTemplateListByBaseQuery.htm',{params:{...this.searchItem, ...this.pager}}).then(res => {
            console.log(res);
            this.pager.count = res.result.count;
            this.tableData = res.result.list;
          })
        },
        handleSearch(){
          this.pager.currentNum = 1;
          this.doQuery();
        },

        docaseQuery(){
          this.$http.post('/caseInfo/queryCaseInfoListByBaseQuery.htm',{keyWords: this.casekeyWords, ...this.pager}).then(res => {
            console.log(res);
            this.casePager.count = res.result.count;
            this.caseList = res.result.list;
          })
        },
        handlecaseSearch(){
          this.casePager.currentNum = 1;
          this.docaseQuery();
        },
        handleSizeChange(val,type){
          if(type === 1){
            this.pager.currentNum = 1;
            this.pager.pageSize = val;
            this.doQuery();
          }else{
            this.casePager.currentNum = 1;
            this.casePager.pageSize = val;
            this.docaseQuery();
          }
        },
        handleCurrentChange(val,type){
          if(type === 1){
            this.pager.currentNum = val;
            this.doQuery();
          }else{
            this.casePager.currentNum = val;
            this.docaseQuery();
          }
        },
        handleCaseClick(row){
          this.currentProduct = row.productName + '-' + row.prodTempCode;
          this.currentTm = row;
          this.caseFlag = true;
          this.docaseQuery();
        },
        handleProductCaseView(row){
          let path = this.$router.resolve({path: '/tmCaseDetail',query: {caseOrderId: row.caseOrderId, prodTempId: this.currentTm.prodTempId}});
          window.open(path.href, '_blank');
        },

        handleApiClick(row){
          let path = this.$router.resolve({path: '/tmCaseInterface',query: {prodTempId: row.prodTempId, prodTempName: row.productName + '-' + row.prodTempCode}});
          window.open(path.href, '_blank');
        },
        handleLogClick(row){
          this.$refs.logDialog.show(row.prodTempId);
        },
      },
      created(){
        this.doQuery();

      }
    }
</script>

<style scoped>

</style>
