<template>
	<div class="em-enforcement-cases">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">强制执行案件</a>
    </div>
		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">

        <el-row>
          <el-col :span="24">
            <span class="search-span">案件查询：</span>
            <el-form-item label=" " prop="keyWords">
              <el-input @keyup.native.enter="handleSearch" v-model.trim="ruleForm.keyWords" placeholder="案号、申请人、被申请人、手机号" style="width:456px;"></el-input>
            </el-form-item>

            <el-form-item label="是否债转：" prop="zqzrStatus" label-width="90px">
              <el-select clearable v-model="ruleForm.zqzrStatus" placeholder="请选择" style="width:197px;">
                <el-option label="全部" value=""></el-option>
                <el-option label="债转" :value="1"></el-option>
                <el-option label="非债转" :value="2"></el-option>
                <el-option label="未定义" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="mt-10">
          <el-col :span="24">
            <span class="search-span">日期选择：</span>
            <el-form-item label=" " prop="dateType">
              <el-select clearable v-model="ruleForm.dateType" placeholder="请选择" style="width:120px;">
                <el-option label="借款时间" :value="1"></el-option>
                <el-option label="逾期时间" :value="2"></el-option>
                <el-option label="提交时间" :value="3"></el-option>
                <el-option label="裁决时间" :value="4"></el-option>
              </el-select>
            </el-form-item>

            <timeFrame
              :startDate.sync="ruleForm.startDate"
              :endDate.sync="ruleForm.endDate"
            >
            </timeFrame>
          </el-col>
        </el-row>

        <el-row class="mt-10">
          <el-col :span="24">
            <span class="search-span">所在地区：</span>
            <el-form-item label=" " prop="provinceCode">
              <cityCascader
                :provinceCode.sync="ruleForm.provinceCode"
                :cityCode.sync="ruleForm.cityCode"
                :districtCode.sync="ruleForm.districtCode"  
                ref="cityCascader"
                @finish="cityFinish"
                @cancel="cityCancel"
                :secondLevel="cityFinish"
              >
              </cityCascader>
            </el-form-item>

            <el-form-item label=" " prop="courtId">
              <el-select clearable v-model="ruleForm.courtId" placeholder="请选择法院" style="width:145px;margin-left:-20px;">
                <el-option 
                  v-for="(item,index) in courtOptions" 
                  :key="index" 
                  :label="item.courtName" 
                  :value="item.courtId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="mt-10">
          <el-col :span="24">
            <span class="search-span" style="width: 70px;">客户：</span>
            <el-form-item label=" " prop="merchantCode">
              <el-select @change="handleCustomerChange" clearable filterable  v-model="ruleForm.merchantCode" placeholder="请选择" class="chang-item">
                <el-option :label="item.merchantName" :value="item.code" v-for="(item,index) in customerOptions" :key="index"></el-option>
              </el-select>
            </el-form-item>

            <span class="search-span">产品名称：</span>
            <el-form-item label=" " prop="productId">
              <el-select @change="handleProductChange" clearable filterable  v-model="ruleForm.productId" placeholder="请选择" class="chang-item">
                <el-option :label="item.prodName" :value="item.prodCode" v-for="(item,index) in productOptions" :key="index"></el-option>
              </el-select>
            </el-form-item>

            <span class="search-span">模板编码：</span>
            <el-form-item label=" " prop="templateCode">
              <el-select clearable filterable  v-model="ruleForm.templateCode" placeholder="请选择" class="chang-item">
                <el-option :label="item" :value="item" v-for="(item,index) in templateOptions" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="mt-10">
          <el-col :span="24">
            <!-- <span class="search-span">下载状态：</span>
            <el-form-item label=" " prop="downloadStatus">
              <el-select clearable v-model="ruleForm.downloadStatus" placeholder="请选择" style="width:197px;">
                <el-option label="已处理" :value="0"></el-option>
                <el-option label="未处理" :value="1"></el-option>
              </el-select>
            </el-form-item> -->

            <!-- <span class="search-span">配置状态：</span>
            <el-form-item label=" " prop="configurationStatus">
              <el-select clearable v-model="ruleForm.configurationStatus" placeholder="请选择" style="width:197px;">
                <el-option label="已完成" :value="0"></el-option>
                <el-option label="未完成" :value="1"></el-option>
              </el-select>
            </el-form-item> -->

            <span class="search-span">还款情况：</span>
            <el-form-item label=" " prop="repaymentStatus">
              <el-select clearable v-model="ruleForm.repaymentStatus" placeholder="请选择" style="width:197px;">
                <el-option label="有还款" :value="1"></el-option>
                <el-option label="无还款" :value="2"></el-option>
                <el-option label="有仲裁后还款" :value="3"></el-option>
                <el-option label="无仲裁后还款" :value="4"></el-option>
              </el-select>
            </el-form-item>

            <span class="search-span">执行状态：</span>
            <el-form-item label=" " prop="execStatus">
              <el-select clearable v-model="ruleForm.execStatus" placeholder="请选择" style="width:197px;">
                <el-option label="未执行" :value="0"></el-option>
                <el-option label="已执行" :value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-button @click="handleSearch" type="warning">查询</el-button>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <div class="item-title of-hidden">
      <div class="fl">
        <span class="item-title-sign">已选{{multipleSelection.length}}个案件</span>
        <el-radio-group v-if="importQueryState" @change="handleImportDebtTransfer" v-model="importIsDebtTransfer" class="m-zz">
          <el-radio :label="1">债转</el-radio>
          <el-radio :label="2">非债转</el-radio>
        </el-radio-group>
      </div>
      <div class="fr">
        <div class="handle-box">
          <span @click="handleExportList">导出列表</span>
          <span class="handle-line">|</span>
          <el-dropdown @command="handleTableTemplateDownload" trigger="click">
            <span>表格模板下载</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="1">强制执行案件导入模板</el-dropdown-item>
              <el-dropdown-item :command="2">批量录入债转类型模板</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="handle-line">|</span>
          <el-upload
            class="upload-box"
            :action="`${$host}/forceManager/queryForceCaseListByExcelImplort.htm`"
            :show-file-list="false"
            :before-upload="uploadBefore"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :data="{
              token : token,
            }"
          >
            <span>批量导入查询</span>
          </el-upload>
          <span class="handle-line">|</span>
          <el-upload
            class="upload-box"
            :action="`${$host}/forceManager/batchDualCaseZzlx.htm`"
            :show-file-list="false"
            :before-upload="uploadBefore"
            :on-success="uploadSuccess2"
            :on-error="uploadError"
            :data="{
              token : token,
            }"
          >
            <span>批量录入债转类型</span>
          </el-upload>
          <span class="handle-line">|</span>
          <span @click="handleBatchDownload" :class="{'handle-disabled' : multipleSelection.length === 0}">批量下载</span>
        </div>
      </div>
    </div>

		<div class="item-table">
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="caseNo" label="案号" width="210">
          <template slot-scope="scope">
            <span>{{scope.row.caseNo}}</span>  
          </template>
        </el-table-column>
        <el-table-column prop="executedBorrowAmt" label="债转"></el-table-column>
        <el-table-column prop="applicants" label="仲裁申请人" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.applicants}}</span>  
          </template>
        </el-table-column>
        <el-table-column prop="executedBorrowAmt" label="执行标的"></el-table-column>
        <el-table-column prop="fixedAmount" label="固定金额"></el-table-column>
        <el-table-column prop="respondents" label="仲裁被申请人" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.respondents}}</span>  
          </template>
        </el-table-column>
        <el-table-column prop="resPhone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="dateOfBorrowing" label="借款日期" min-width="120"></el-table-column>
        <el-table-column prop="lateStartDate" label="逾期开始日" min-width="120"></el-table-column>
        <el-table-column prop="repaymentStatus" label="还款情况" width="120">
          <template slot-scope="scope">
            {{
              scope.row.repaymentStatus === 1 ? '有还款' :
              scope.row.repaymentStatus === 2 ? '无还款' :
              scope.row.repaymentStatus === 3 ? '有仲裁后还款' :
              scope.row.repaymentStatus === 4 ? '无仲裁后还款' : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="closeTime" label="裁决时间" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.closeTime}}</span>  
          </template>
        </el-table-column>
        <el-table-column prop="courtName" label="法院" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.courtName}}</span>  
          </template>
        </el-table-column>
        <el-table-column prop="templateCode" label="模板编码"></el-table-column>
        <el-table-column prop="configurationStatus" label="材料配置状态" min-width="120">
          <template slot-scope="scope">
            {{scope.row.configurationStatus === 1 ? '未完成' : '已完成'}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="downloadStatus" label="下载状态">
          <template slot-scope="scope">
            {{scope.row.downloadStatus === 1 ? '未处理' : '已处理'}}
          </template>
        </el-table-column> -->
        <el-table-column prop="execStatus" label="执行状态" min-width="120">
          <template slot-scope="scope">
            {{scope.row.execStatus === 0 ? '未执行' : '已执行'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="120">
          <template slot-scope="scope">
            <el-button @click="handlePreview(scope.row)" type="text">预览</el-button>
            <el-button @click="handleDownload(scope.row)" type="text">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-if="importQueryState === false"
        class="mt-10 mb-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 100 , 200 , 500 , 1000]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </div>

    <setDialog ref="setDialog"></setDialog>
    <timeDialog @successCBK="timeSuccess" ref="timeDialog"></timeDialog>
    <batchImportDialog ref="batchImportDialog"></batchImportDialog>
    <zzErrorDialog ref="zzErrorDialog"></zzErrorDialog>
	</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import exportFile from '@/assets/js/exportFile.js'
  import exportFileForm from '@/assets/js/exportFileForm.js'
  import cityCascader from '@/components/cityCascader.vue'
  // 未配置校验 dialog
  import setDialog from '../emBatchDownload/modules/setDialog.vue'
  // 时间选择 dialog
  import timeDialog from '../emBatchDownload/modules/timeDialog.vue'
  // 批量导入异常 dialog
  import batchImportDialog from './modules/batchImportDialog.vue'
  // 录入债转类型 error dialog
  import zzErrorDialog from './modules/zzErrorDialog.vue'
	export default {
		components : {
      timeFrame,
      cityCascader,
      setDialog,
      timeDialog,
      batchImportDialog,
      zzErrorDialog,
		},
		data() {
			return {
        // 用户token
        token : (() => {
          try{
            return JSON.parse(localStorage.getItem('loginInfo')).token;
          }catch(err) {
            return '';
          }
        })(),
        // 判断当前 批量导入查询 状态
        importQueryState : false,

				ruleForm : {
					// 关键字
          keyWords : '',
          // 日期选择 1：借款日期；2：逾期日期；3：提交日期；4：裁决日期
          dateType : '',
					// 开始时间
					startDate : '',
					// 结束时间
          endDate : '',
          // 配置状态 0：已经配置；1：未配置
          configurationStatus : '',
          // 下载状态 0：已处理；1：未处理
          downloadStatus : '',
          // 还款情况
          repaymentStatus : '',

          // 省
          provinceCode : '',
          // 市
          cityCode : '',
          // 区
          districtCode : '',
          // 法院
          courtId : '',

          // 客户id
          customerId : '',
          // 产品id
          productId : '',
          // 模板id
          templateCode : '',
          // 执行状态
          execStatus: '',

          // 是否债转（普通查询） 	0：未定义；1：是；2：否
          zqzrStatus : '',
        },
        // 是否债转（批量导入查询）
        importIsDebtTransfer : '',
        rules : {},
        // 表格选中数据
        multipleSelection : [],
        // 法院 options
        courtOptions : [
          /* {courtName : '法院1' , courtId : '1'},
          {courtName : '法院2' , courtId : '2'},
          {courtName : '法院3' , courtId : '3'},
          {courtName : '法院4' , courtId : '4'}, */
        ],
        // 客户options
        customerOptions : [],
        // 产品options
        productOptions : [],
        // 模板options
        templateOptions : [],

				// 表格数据
        tableData : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
        
        checkList : {
          qzzxsqs: true,
          yyzz: true,
          frsfzzfm: true,
          frdbrsfzms: true,
          sqwts: true,
          zxkyhzhqds: true,
          jkxy: true,
          fwxy: true,
          sfzzfm: true,
          cczksm: true,
          zqzrxy: true,
          zqzrqrs: true,
          cjs: true,
          xzgxfsms: true,
          xgmdsqs: true,
          sxmdsqs: true,
          ldhtsmj : true,
        },
        
        pageLoading : '',
			}
    },
    mounted() {
      //this.initTableList();

      // 获取客户 options
      this.$http({
        method : 'post',
        url : '/case/queryCustomerList.htm',
      }).then((res) => {
        this.customerOptions = res.result;
      });
    },
		methods : {
			// 点击搜索
			handleSearch() {
        this.importQueryState = false;
				this.currentPage = 1;
        this.initTableList();

        this.importIsDebtTransfer = '';
      },
      // 地区 选择完成回调
      cityFinish(val) {
        console.log('选择成功',val);
        // val存在表示当前选到市 ， 不存在表示选择到区
        if(!val) {
          this.$http({
            url : '/court/queryCourtInfoByDistrictCode.htm',
            method : 'post',
            data : {
              districtCode : this.ruleForm.districtCode,
            },
          }).then((res) => {
            this.courtOptions = res.result;
            this.ruleForm.courtId = '';
          });
        }else{
          this.$http({
            url : '/court/queryCourtInfoByCityCode.htm',
            method : 'post',
            data : {
              cityCode : val,
            },
          }).then((res) => {
            this.courtOptions = res.result;
            this.ruleForm.courtId = '';
          });
        }
      },
      // 地区 取消回调
      cityCancel() {
        this.courtOptions = [];
        this.ruleForm.courtId = '';
      },
      // 客户 change
      handleCustomerChange(val) {
        this.productOptions = [];
        this.templateOptions = [];
        this.ruleForm.productId = '';
        this.ruleForm.templateCode = '';

        if(val) {
          this.$http({
            method : 'post',
            url : '/case/queryProducts.htm',
            data : {
              merchantCode : val,
            },
          }).then((res) => {
            this.productOptions = res.result;
          });
        }
      },
      // 产品 change
      handleProductChange(val) {
        this.templateOptions = [];
        this.ruleForm.templateCode = '';

        if(val) {
          this.$http({
            method : 'post',
            url : '/case/queryTemplatesByProductCode.htm',
            data : {
              merchantCode: this.ruleForm.merchantCode,
              prodCode: val,
            },
          }).then((res) => {
            this.templateOptions = res.result;
          });
        }
      },

      // 点击 导出列表
      handleExportList() {
        // 当前是  批量导入查询
        if(this.importQueryState) {
          exportFileForm({
            url : '/forceManager/excelExportByExportImport.htm',
            method : 'post',
            data : {
              caseNos : this.tableData.map(v => v.caseNo).join(','),
            },
          });
        }else{
          exportFileForm({
            url : '/forceManager/excelExportByBaseQuery.htm',
            method : 'post',
            data : {
              ...this.ruleForm,
            },
          });
        }
      },
      // 点击 表格模板下载
      handleTableTemplateDownload(val) {
        // 强制执行案件导入模板
        if(val === 1) {
          exportFile({
            url : '/forceManager/moduleExcelDownload.htm',
          });
        // 批量录入债转类型模板
        }else{
          exportFile({
            url : '/forceManager/exceOutZzlxTemplate.htm',
          });
        }
      },
      // 批量导入相关事件

      // 文件上传前回调
      uploadBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['xlsx','xls'];
        if(arr.indexOf(fileType) === -1){
          this.$message.warning('文件格式有误');
          return false;
        }
        this.pageLoading = this.$loading();
        return true;
      },
      // 文件上传成功
      uploadSuccess(res, file, fileList) {
        this.importIsDebtTransfer = '';
        this.pageLoading.close();
        this.importQueryState = true;
        this.tableData = res.result.caseInfos;
        this.tableDataDefault = res.result.caseInfos;
        
        this.$refs.batchImportDialog.show({
          total : res.result.caseNum,
          errorList : res.result.noResultCaseList,
          duplicateNum : res.result.duplicateNum,
          data : res.result.caseInfos,
          duplicateCaseList : res.result.duplicateCaseList,
          execCaseList: res.result.execCaseList
        });
      },
      // 文件上传成功（批量录入债转类型）
      uploadSuccess2(res, file, fileList) {
        this.importIsDebtTransfer = '';
        this.pageLoading.close();
        if(res.result.isok === false) {
          this.$refs.zzErrorDialog.show(res.result);
        }else{
          this.$message.success('操作成功');
        }
      },
      // 文件上传失败
      uploadError() {
        this.pageLoading.close();
        this.$message.error('文件上传失败，请稍后重试');
      },

      // 批量导入相关事件
      // 点击 批量下载
      handleBatchDownload() {
        if(this.multipleSelection.length === 0) {
          return;
        }
        if(!this.zzVerify('batch')) {
          return;
        }
        this.$router.push({
          path : 'emBatchDownload',
          query : {
            caseIds : this.multipleSelection.map(v => v.caseId).join(','),
            type : '2',
            disabled : this.zzDisabled('batch'),
          },
        });
      },

      // 点击 预览
      handlePreview(row) {
        if(!this.zzVerify('single',row)) {
          return;
        }
        // 预览前校验
        this.$http({
          method : 'post',
          url : '/forceManager/previewCaseDocPre.htm',
          data : {
            ...this.checkList,

            caseId : row.caseId,
          },
        }).then((res) => {
          // 未配置
          if(res.result.settingIsOk === false) {
            this.$refs.setDialog.show(res.result);
          // 已配置选择预览时间
          }else{
            this.$refs.timeDialog.show({...row,mtype:'yulan'});
          }
        });
      },
      // 点击 下载
      handleDownload(row) {
        if(!this.zzVerify('single',row)) {
          return;
        }
        this.$router.push({
          path : 'emBatchDownload',
          query : {
            caseIds : row.caseId + '',
            type : '2',
            disabled : this.zzDisabled('single',row),
          },
        });
      },
      // 债转校验逻辑
      zzVerify(type,row) {
        // 批量下载 校验
        if(type === 'batch') {
          let und = [];
          let zz = [];
          let fzz = [];
          this.multipleSelection.map(v => {
            if(v.zqzrStatus === 0) {
              und.push(v);
            }else if(v.zqzrStatus === 1) {
              zz.push(v);
            }else if(v.zqzrStatus === 2) {
              fzz.push(v);
            }
          });
          if(und.length > 0) {
            this.$message.warning('选择了未定义债转类型的案件');
            return false;
          }
          if( !(zz.length === 0 || fzz.length === 0) ) {
            this.$message.warning('选择了多种债转类型的案件！');
            return false;
          }
        // 单个校验
        }else{
          if(row.zqzrStatus === 0) {
            this.$message.warning('选择了未定义债转类型的案件');
            return false
          }
        }
        return true;
      },
      // 处理业务 非债转类型 ，债转协议等相关文书不可选
      zzDisabled(type,row) {
        let disabled = false;
        // 批量
        if(type === 'batch') {
          if(this.multipleSelection[0].zqzrStatus === 2){
            disabled = true;
          }
        // 单个
        }else{
          if(row.zqzrStatus === 2){
            disabled = true;
          }
        }
        return disabled;
      },
      
      // 时间dialog 回调
      timeSuccess(time,row) {
        let win = window.open('');
        let loading = this.$loading({
          text : '预览生成中'
        });
        // 处理业务
        let checkList = {...this.checkList};
        if(this.zzDisabled('single',row) === true) {
          delete checkList.zqzrxy;
          delete checkList.zqzrqrs;
        }
        // 预览逻辑
        if(row.mtype === 'yulan') {
          this.$http({
            method : 'post',
            url : '/forceManager/previewCaseDocPost.htm',
            data : {
              ...checkList,

              caseId : row.caseId,
              docDate : time,
            },
          }).then((res) => {
            loading.close();
            win.location.href = res.result;
          }).catch(() => {
            loading.close();
            win.close();
          });
        // 下载逻辑
        }/* else{
          this.$http({
            method : 'post',
            url : '/forceManager/downloadDocsPost.htm',
            data : {
              ...this.checkList,

              caseIds : row.caseId,
              docDate : time,
            },
          }).then((res) => {
            this.$message.success('操作成功');
            this.$router.push('emDownloadTask');
          });
        } */
      },
      // 批量导入 债转change
      handleImportDebtTransfer(val) {
        // 过滤逻辑
        this.tableData = this.tableDataDefault.filter(v => v.zqzrStatus === val);
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/forceManager/queryForceCaseListByBaseQuery.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,

            ...this.ruleForm,
          },
        }).then((res) => {
          this.total = res.result.count;
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
      // 表格 多选 change
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }

      // 表格相关 end
		},
	}
</script>

<style lang="scss" scoped>

.em-enforcement-cases{
	.handle-box{
    padding-top: 5px;
    font-size: 14px;
    color: #666666;
    .handle-line{
      margin: 0 5px;
    }
    span{
      cursor: pointer;
    }
    .handle-disabled{
      color: #ccc;
      cursor: auto;
    }
  }
  .search-span{
    display: inline-block;
    margin-top: 15px;
    text-align: right;
  }
  .upload-box{
    display: inline-block;
  }
  .chang-item{
    width: 197px;
  }
}

</style>

<style lang="scss">

.em-enforcement-cases{
  .m-zz{
    .el-radio:focus:not(.is-focus):not(:active) .el-radio__inner{
      box-shadow: none;
    }
    .el-radio+.el-radio{
      margin-left: 10px;
    }
  }
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
    .city-cascader-box{
      .el-select{
        /* width: 100px!important; */
      }
    }
  }
}

</style>
