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
              <el-input v-model.trim="ruleForm.keyWords" placeholder="案号、申请人、被申请人、手机号" style="width:306px;"></el-input>
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
              <el-select clearable v-model="ruleForm.courtId" placeholder="请选择法院" style="width:145px;">
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
            <el-form-item label=" " prop="customerId">
              <el-select @change="handleCustomerChange" clearable filterable  v-model="ruleForm.customerId" placeholder="请选择" class="chang-item">
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
            <span class="search-span">下载状态：</span>
            <el-form-item label=" " prop="downloadStatus">
              <el-select clearable v-model="ruleForm.downloadStatus" placeholder="请选择" style="width:197px;">
                <el-option label="已处理" :value="0"></el-option>
                <el-option label="未处理" :value="1"></el-option>
              </el-select>
            </el-form-item>

            <span class="search-span">配置状态：</span>
            <el-form-item label=" " prop="settingStatus">
              <el-select clearable v-model="ruleForm.settingStatus" placeholder="请选择" style="width:197px;">
                <el-option label="已完成" :value="1"></el-option>
                <el-option label="未完成" :value="2"></el-option>
              </el-select>
            </el-form-item>

            <span class="search-span">还款情况：</span>
            <el-form-item label=" " prop="aaaaa">
              <el-select clearable v-model="ruleForm.aaaaa" placeholder="请选择" style="width:197px;">
                <el-option label="有还款" :value="1"></el-option>
                <el-option label="无还款" :value="2"></el-option>
                <el-option label="有仲裁后还款" :value="3"></el-option>
                <el-option label="无仲裁后还款" :value="4"></el-option>
              </el-select>
            </el-form-item>

            <el-button @click="handleSearch" type="warning">查询</el-button>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">已选{{multipleSelection.length}}个案件</span>
      <div class="fr">
        <div class="handle-box">
          <span @click="handleExportList">导出列表</span>
          <span class="handle-line">|</span>
          <span @click="handleTableTemplateDownload">表格模板下载</span>
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
				<el-table-column prop="caseNo" label="案号"></el-table-column>
        <el-table-column prop="applicants" label="仲裁申请人" min-width="120"></el-table-column>
        <el-table-column prop="executedBorrowAmt" label="执行标的"></el-table-column>
        <el-table-column prop="fixedAmount" label="固定金额"></el-table-column>
        <el-table-column prop="respondents" label="仲裁被申请人" min-width="120"></el-table-column>
        <el-table-column prop="resPhone" label="手机号"></el-table-column>
        <el-table-column prop="dateOfBorrowing" label="借款日期"></el-table-column>
        <el-table-column prop="lateStartDate" label="逾期开始日" min-width="120"></el-table-column>
        <el-table-column prop="timeOfAdjudication" label="裁决时间"></el-table-column>
        <el-table-column prop="courtName" label="法院"></el-table-column>
        <el-table-column prop="templateCode" label="模板编码"></el-table-column>
        <el-table-column prop="settingStatus" label="材料配置状态" min-width="120">
          <template slot-scope="scope">
            {{scope.row.settingStatus === 1 ? '已完成' : '未完成'}}
          </template>
        </el-table-column>
        <el-table-column prop="downloadStatus" label="下载状态">
          <template slot-scope="scope">
            {{scope.row.downloadStatus === 1 ? '未处理' : '已处理'}}
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </div>

    <setDialog ref="setDialog"></setDialog>
    <timeDialog @successCBK="timeSuccess" ref="timeDialog"></timeDialog>
    <batchImportDialog ref="batchImportDialog"></batchImportDialog>
	</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import exportFile from '@/assets/js/exportFile.js'
  import cityCascader from '@/components/cityCascader.vue'
  // 未配置校验 dialog
  import setDialog from '../emBatchDownload/modules/setDialog.vue'
  // 时间选择 dialog
  import timeDialog from '../emBatchDownload/modules/timeDialog.vue'
  // 批量导入异常 dialog
  import batchImportDialog from './modules/batchImportDialog.vue'
	export default {
		components : {
      timeFrame,
      cityCascader,
      setDialog,
      timeDialog,
      batchImportDialog,
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
          // 配置状态 1:已完成；2：未完成
          settingStatus : '',
          // 下载状态 0：已处理；1：未处理
          downloadStatus : '',
          // 还款情况
          aaaaa : '',

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
				},
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
        tableData : [{caseId : 'lalala'}],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
        
        checkList : {
          bsqbccns : true,
          cczksm : true,
          fwxy : true,
          jkxy : true,
          qzzxsqs : true,
          sfzzfm : true,
          sqwts : true,
          xzgxfsms : true,
          zxkyhzhqds : true,
          zqzrxy : true,
        },
				
			}
    },
    mounted() {
      this.initTableList();

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
      },
      // 地区 选择完成回调
      cityFinish(val) {
        console.log('选择成功',val);
        // val存在表示当前选到市 ， 不存在表示选择到区
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
      },
      // 地区 取消回调
      cityCancel() {
        this.courtOptions = [];
        this.ruleForm.courtId = '';
      },
      // 客户 change
      handleCustomerChange(val) {
        if(!val) {
          this.productOptions = [];
          this.templateOptions = [];
          this.ruleForm.productId = '';
          this.ruleForm.templateCode = '';
        }else{
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
        if(!val) {
          this.templateOptions = [];
          this.ruleForm.templateCode = '';
        }else{
          this.$http({
            method : 'post',
            url : '/case/queryTemplatesByProductCode.htm',
            data : {
              merchantCode: this.ruleForm.customerId,
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
          exportFile({
            url : '/forceManager/excelExportByExportImport.htm',
            data : {
              caseNos : this.tableData.map(v => v.caseNo).join(','),
            },
          });
        }else{
          exportFile({
            url : '/forceManager/excelExportByBaseQuery.htm',
            data : {
              ...this.ruleForm,
            },
          });
        }
      },
      // 点击 表格模板下载
      handleTableTemplateDownload() {
        exportFile({
          url : '/execution/moduleExcelDownload.htm',
        });
      },
      // 批量导入相关事件

      // 文件上传前回调
      uploadBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['xlsx'];
        if(arr.indexOf(fileType) === -1){
          this.$message.warning('文件格式有误');
          return false;
        }
        return true;
      },
      // 文件上传成功
      uploadSuccess(res, file, fileList) {
        this.importQueryState = true;
        this.tableData = res.result.list;
      },
      // 文件上传失败
      uploadError() {
        this.$message.error('文件上传失败，请稍后重试');
      },

      // 批量导入相关事件
      // 点击 批量下载
      handleBatchDownload() {
        if(this.multipleSelection.length === 0) {
          return;
        }
        this.$router.push({
          path : 'emBatchDownload',
          query : {
            caseIds : this.multipleSelection.map(v => v.caseId).join(','),
          },
        });
      },

      // 点击 预览
      handlePreview(row) {
        this.$refs.timeDialog.show({...row,mtype:'yulan'});
        return;
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
        this.$refs.timeDialog.show({...row,mtype:'xiazai'});
        return;
        // 预览前校验
        this.$http({
          method : 'post',
          url : '/forceManager/downloadDocsPre.htm',
          data : {
            ...this.checkList,

            caseIds : row.caseId,
          },
        }).then((res) => {
          // 未配置
          if(res.result.settingIsOk === false) {
            this.$refs.setDialog.show(res.result);
          // 已配置选择预览时间
          }else{
            this.$refs.timeDialog.show({...row,mtype:'xiazai'});
          }
        });
      },
      // 时间dialog 回调
      timeSuccess(time,row) {
        // 预览逻辑
        if(row.mtype === 'yulan') {
          this.$http({
            method : 'post',
            url : '/forceManager/previewCaseDocPost.htm',
            data : {
              ...this.checkList,

              caseId : row.caseId,
              docDate : time,
            },
          }).then((res) => {
            window.open(res.result);
          });
        // 下载逻辑
        }else{
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
        }
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