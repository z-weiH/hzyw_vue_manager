<template>
  <div class="hear-case-list">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">预审案件库</a>
    </div>
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label=" " prop="keyWords">
          <el-input @keyup.native.enter="handleSearch" style="width:470px;" v-model.trim="ruleForm.keyWords" placeholder="请输入互金企业、产品名称、模板号、借款单号、被申请人姓名、手机"></el-input>
        </el-form-item>


        <el-form-item label="" prop="clientCode">
          <el-select
            filterable
            clearable
            style="width:170px;"
            v-model="ruleForm.clientCode"
            placeholder="请选择企业"
            @change="handleClientCodeChange"
          >
            <el-option
              :label="item.clientName"
              :value="item.clientCode"
              v-for="(item,index) in companyOptions"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="productName">
          <el-select
            filterable
            clearable
            style="width:170px;"
            v-model="ruleForm.productName"
            placeholder="请选择产品"
            @change="handleProductCodeChange"
          >
            <el-option
              :label="item.productName"
              :value="item.productName"
              v-for="(item,index) in productOptions"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="proTempId">
          <el-select
            filterable
            clearable
            style="width:170px;"
            v-model="ruleForm.proTempId"
            placeholder="请选择模板"
          >
            <el-option
              :label="item.proTempId"
              :value="item.proTempId"
              v-for="(item,index) in templateOptions"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" " prop="accountPeriodType">
          <el-select clearable style="width:120px;" v-model="ruleForm.accountPeriodType" placeholder="请选择账龄">
            <el-option label="1~30天" value="M0"></el-option>
            <el-option label="31~60天" value="M1"></el-option>
            <el-option label="61~90天" value="M2"></el-option>
            <el-option label="91~120天" value="M3"></el-option>
            <el-option label="121~150天" value="M4"></el-option>
            <el-option label="151~180天" value="M5"></el-option>
            <el-option label="181~210天" value="M6"></el-option>
            <el-option label="211~240天" value="M7"></el-option>
            <el-option label="241~270天" value="M8"></el-option>
            <el-option label="271~300天" value="M9"></el-option>
            <el-option label="301~330天" value="M10"></el-option>
            <el-option label="331~360天" value="M11"></el-option>
            <el-option label="360天以上" value="M12"></el-option>
          </el-select>
        </el-form-item>




        <!-- 推送时间 -->
        <timeFrame
          :startDate.sync="ruleForm.pushStartDate"
          :endDate.sync="ruleForm.pushEndDate"
          startPlaceholder="推送开始"
          endPlaceholder="推送结束"
        >
        </timeFrame>

        <!--<br />-->

        <!-- 预审时间 -->
        <timeFrame
          :startDate.sync="ruleForm.queryStartDate"
          :endDate.sync="ruleForm.queryEndDate"
          startPlaceholder="预审开始"
          endPlaceholder="预审结束"
          class="ml-10"
        >
        </timeFrame>

        <el-form-item label=" " prop="status">
          <el-select clearable style="width:150px;" v-model="ruleForm.status" placeholder="请选择状态">
            <el-option label="待分配" :value="0"></el-option>
            <el-option label="待初审" :value="1"></el-option>
            <el-option label="待复审" :value="2"></el-option>
            <el-option label="退回重审" :value="3"></el-option>
            <el-option label="审核通过" :value="4"></el-option>
            <el-option label="审核未通过" :value="5"></el-option>
            <el-option label="立案申请成功" :value="6"></el-option>
            <el-option label="立案申请失败" :value="7"></el-option>
          </el-select>
        </el-form-item>
        <!--<customer-button @click="">导入</customer-button>-->
        <el-upload
          class="upload-box"
          style="display: inline-block"
          :action="`${$host}/preCaseLib/importExcelLoanBillNos.htm`"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          accept=".xlsx,.xls"
          :disabled="ruleForm.loanBillNos && ruleForm.loanBillNos.length > 0"
          :before-upload="beforeUpload"
          :data="{
              token : token,
            }"
        >
          <div class="importBtn">
            <customer-button type="primary">{{ (ruleForm.loanBillNos && ruleForm.loanBillNos.length > 0) ? `已导入${ruleForm.loanBillNos.length}件` : '导入' }}</customer-button>
            <customer-button class="copy_button" :class="{'active': ruleForm.loanBillNos && ruleForm.loanBillNos.length}" @click="cancelUpload" size="mini" >取消</customer-button>
          </div>

        </el-upload>
        <customer-button @click="handleSearch" type="warning">查询</customer-button>

      </el-form>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">案件列表</span>
      <div class="fr">
        <customer-button @click="handleExport" type="primary">导出</customer-button>
        <customer-button @click="handleDistributionCases" type="primary">分配案件</customer-button>
      </div>
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
        <el-table-column prop="platName" label="互金企业" align="center">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.platName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="prodTempCode" label="模板">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.prodTempCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="loanBillNo" label="案件订单编号"></el-table-column>
        <el-table-column prop="respondents" label="被申请人"></el-table-column>
        <el-table-column prop="resPhone" label="被申请人手机"></el-table-column>
        <el-table-column prop="amtCase" label="净标的"></el-table-column>
        <el-table-column prop="subjectAmt" label="仲裁标的"></el-table-column>
        <el-table-column prop="aging" label="账龄"></el-table-column>
        <el-table-column prop="pushTime" label="推送时间">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.pushTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="finishDate" label="预审完成时间" width="150px">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.finishDate}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="150px">
          <template slot-scope="scope">
            {{
              scope.row.status === 0 ? '待分配' :
              scope.row.status === 1 ? '待初审' :
              scope.row.status === 2 ? '待复审' :
              scope.row.status === 3 ? '退回重审' :
              scope.row.status === 4 ? '审核通过' :
              scope.row.status === 5 ? '审核未通过' :
              scope.row.status === 6 ? '立案申请成功' :
              scope.row.status === 7 ? '立案申请失败' : ''
            }}
          </template>
        </el-table-column>

        <el-table-column align="center" prop="status" label="操作" width="150px">
          <template slot-scope="scope">
            <customer-button type="text" @click="gotoDetail(scope.row)">详情</customer-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="mt-10 mb-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <!-- 分配案件 dialog -->
      <CaseDialog @successCBK="successCBK" ref="CaseDialog"></CaseDialog>
    </div>
  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import CaseDialog from './modules/dialog.vue'
  import exportFile from "@/assets/js/exportFile";
  export default {
    components : {
      timeFrame,
      CaseDialog,
    },
    data() {

      let token = 0;
        try{
          token =  JSON.parse(localStorage.getItem('loginInfo')).token
        }catch (e) {

        }

      return {
          token: token,
        ruleForm : {
          // 互金企业
          clientCode: "",
          // 产品名称
          productName: "",
          // 模板号
          proTempId: "",
          // 互金企业
          keyWords : '',
          // 账龄
          accountPeriodType : '',
          // 推送开始时间
          pushStartDate : '',
          // 推送结束时间
          pushEndDate	 : '',
          // 预审完成开始查询日期
          queryStartDate : '',
          // 预审完成结束查询日期
          queryEndDate : '',
          // 状态 0:待分配,1:待初审,2:待复审,3:退回重审,4：审核通过,5：审核未通过,6:立案申请成功,7:立案申请失败
          status : '',
        },
        rules : {},

        // 表格数据
        tableData : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
        loading: null,
        tableLoading: false,
        // 所属企业 options
        companyOptions: [
          /* {
              merchantName : '青岛鲁金所股权投资基金有限公司',
              code : '1',
            } */
        ],
        // 所属产品 options
        productOptions: [
          /* {
              prodName : '闪来钱',
              prodCode : '30',
            } */
        ],
        // 所属模板 options
        templateOptions: [
          /* '3001', */
        ],
      }
    },
    mounted() {
      this.initTableList();
    },
    created() {
      this.optsCompanyListView();
    },
    methods : {
      // 互金企业 change
      handleClientCodeChange(val) {
        // 清空旧数据
        this.ruleForm.productName = "";
        this.ruleForm.proTempId = "";
        this.productOptions = [];
        this.templateOptions = [];
        // 拉取产品列表
        val && this.optsPduListView();
      },
      // 产品名称 change
      handleProductCodeChange(val) {
        // 清空旧数据
        this.ruleForm.proTempId = "";
        this.templateOptions = [];
        // 拉取模板列表
        val && this.optsTemplateCode();
      },

      optsCompanyListView() {
        this.$http.post("/preCaseLib/queryPreClientName.htm ").then(res => {
          this.companyOptions = res.result;
        });
      },
      optsPduListView(params) {
        this.$http
          .post("/preCaseLib/queryPreProductName.htm", {
            clientCode: this.ruleForm.clientCode
          })
          .then(res => {
            this.productOptions = res.result;
          });
      },
      optsTemplateCode(params) {
        this.$http
          .post("/preCaseLib/queryPreProTempCode.htm", {
            clientCode: this.ruleForm.clientCode,
            productId: this.productOptions.find(it => it.productName === this.ruleForm.productName).productId
          })
          .then(res => {
            console.log(res);
            // this.templateOptions = res.result;
              this.templateOptions = res.result;
            console.log(this.templateOptions);
          });
      },
      cancelUpload(){
        console.log(this.ruleForm)
        // this.ruleForm.loanBillNos = null;
        this.ruleForm = {};
        this.handleSearch();
      },
      //上传前
      beforeUpload(){
        this.loading = this.$loading({
          lock: true,
          text: '正在载入',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
      },

      // 文件上传成功
      uploadSuccess(res, file, fileList) {
        this.loading.close();
        // 上传成功
        if (res.code === "0000") {
          console.log("导入成功:", res, file, fileList);
          if(res.result.length > 0){
            this.ruleForm = {loanBillNos: res.result};
          }
          this.handleSearch();
          this.$message.success("导入成功");
        } else {
          this.$message.error(res.description);
        }
      },
      // 文件上传失败
      uploadError() {
        this.$message.error("文件上传失败，请稍后重试");
      },

      gotoDetail(row){
        window.open(this.$router.resolve({ path: '/hearCaseListDetail', query: {caseId: row.caseId}}).href,"_blank");
      },


      handleExport () {
        exportFile({ url: "/preCaseLib/exeportCaseInfoByCondition.htm", data: this.ruleForm })
      },

      // 点击搜索
      handleSearch() {
        this.currentPage = 1;
        this.initTableList();
      },
      // 点击分配案件
      handleDistributionCases() {
        this.$refs.CaseDialog.show();
      },
      // 分配案件 成功回调
      successCBK() {
        this.currentPage = 1;
        this.initTableList();
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        // this.tableLoading = true;
        this.$http({
          url : '/preCaseLib/queryCaseListByCondition.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            loanBillNos: this.ruleForm.loanBillNos,
            keyWords : this.ruleForm.keyWords,
            accountPeriodType : this.ruleForm.accountPeriodType,
            pushStartDate : this.ruleForm.pushStartDate,
            pushEndDate : this.ruleForm.pushEndDate,
            queryStartDate : this.ruleForm.queryStartDate,
            queryEndDate : this.ruleForm.queryEndDate,
            status : this.ruleForm.status,
            clientCode: this.ruleForm.clientCode,
            productName: this.ruleForm.productName,
            proTempId: this.ruleForm.proTempId,
          },
        }).then((res) => {
          this.total = res.result.count;
          res.result.list.forEach(it => {
            it.resPhone = it.resPhone.substr(0,3) + "****" + it.resPhone.substr(7);
          })
          this.tableData = res.result.list;
        });
      },
      // 页数 change
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.initTableList();
      },
      // 分页 change
      handleCurrentChange(val) {
        this.currentPage = val;
        this.initTableList();
      },

      // 表格相关 end
    },
  }
</script>

<style lang="scss" scoped>
.importBtn{
  position: relative;
  &:hover{
    .copy_button.active{
      display: block;
    }
  }
  .copy_button{
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }
}

.hear-case-list{
  .item-title{
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .item-title-sign{
    margin-top: 12px;
    display: inline-block;
  }
}

</style>
