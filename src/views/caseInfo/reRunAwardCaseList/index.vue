<template>
	<div class="re-run-award-case-list">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a>重跑裁决书案件列表</a>
    </div>
		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <span style="display:inline-block;margin-top:15px;">案件查询：</span>
        <el-form-item label=" " prop="keyWords">
          <el-input @keyup.native.enter="isSearch && handleSearch()" style="width:300px;" v-model.trim="ruleForm.keyWords" placeholder="仲裁案号、申请人、被申请人"></el-input>
        </el-form-item>

        <span style="display:inline-block;margin-top:15px;">日期类型：</span>
        <el-form-item label=" " prop="dateType">
          <el-select clearable v-model="ruleForm.dateType" placeholder="请选择日期类型">
            <el-option label="提交日期" :value="1"></el-option>
          </el-select>
        </el-form-item>

				<timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
          startPlaceholder="开始日期"
          endPlaceholder="结束日期"
        >
        </timeFrame>

        <div class="mt-10"></div>

        <span style="display:inline-block;margin-top:15px;">互金企业：</span>
        <el-form-item label=" " prop="clientCode">
          <el-select @change="handleClientCodeChange" filterable style="width:300px;" clearable v-model="ruleForm.clientCode" placeholder="请选择互金企业">
            <el-option :label="item.merchantName" :value="item.code" v-for="(item,index) in clientCodeOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <span style="display:inline-block;margin-top:15px;">产品名称：</span>
        <el-form-item label=" " prop="productCode">
          <el-select @change="handleProductCodeChange" filterable clearable v-model="ruleForm.productCode" placeholder="请选择产品名称">
            <el-option :label="item.prodName" :value="item.prodName + '-----' + item.prodCode" v-for="(item,index) in productCodeOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <span style="display:inline-block;margin-top:15px;">模板编码：</span>
        <el-form-item label=" " prop="templateCode">
          <el-select filterable style="width:236px;" clearable v-model="ruleForm.templateCode" placeholder="请选择模板编码">
            <el-option :label="item" :value="item" v-for="(item,index) in templateCodeOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <div class="mt-10">
          <span style="display:inline-block;margin-top:15px;">案件状态：</span>
          <el-form-item label=" " prop="statusThree">
            <el-select filterable style="width:300px;" clearable v-model="ruleForm.statusThree" placeholder="请选择案件状态">
              <el-option :label="item.desc" :value="item.status" v-for="(item,index) in statusOptions" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-button :disabled="!isSearch" @click="handleSearch" type="warning">查询</el-button>
          <el-button :disabled="!isSearch" @click="handleGetAward" type="primary">重新获取裁决书</el-button>
        </div>
      </el-form>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign" style="margin-top: 5px;display: inline-block;">案件列表</span>
      <span class="m-total">（总条数：{{total}}条）</span>
      <div class="fr">
        <el-button @click="handleHistori" type="primary" size="small">历史记录</el-button>
      </div>
    </div>

		<div class="item-table">
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="date" label="序号" width="50px">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
				<el-table-column prop="caseNoWz" label="仲裁案号"></el-table-column>
        <el-table-column prop="clientName" label="互金企业"></el-table-column>
        <el-table-column prop="applicants" label="申请人"></el-table-column>
        <el-table-column prop="respondents" label="被申请人"></el-table-column>
        <el-table-column prop="productId" label="模板编码"></el-table-column>
        <el-table-column prop="statusThreeWz" label="案件状态"></el-table-column>
        <el-table-column prop="submitTime" label="提交日期"></el-table-column>
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

    </div>

    <historiDialog ref="historiDialog"></historiDialog>
	</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import historiDialog from './modules/historiDialog.vue'
	export default {
		components : {
      timeFrame,
      historiDialog,
    },
    computed : {
      // 判断查询条件是否为空
      isSearch() {
        return !(!this.ruleForm.keyWords && !this.ruleForm.dateType && !this.ruleForm.startDate && !this.ruleForm.endDate && !this.ruleForm.clientCode && !this.ruleForm.productCode && !this.ruleForm.templateCode && !this.ruleForm.statusThree);
      },
    },
    watch : {
      isSearch(val) {
        !val && this.reset();
      },
    },
		data() {
			return {
				ruleForm : {
					// 关键字 互金企业
          keyWords : '',
          // 日期类型 1:提交日期，2：立案日期，3：组庭日期，4：结案日期，5：应裁日期
          dateType : '',
					// 开始时间
					startDate : '',
					// 结束时间
          endDate : '',
          // 互金企业
          clientCode : '',
          // 产品名称
          productCode : '',
          // 模板号
          templateCode : '',
          // 案件状态
          statusThree : '',
				},
				rules : {
        },

        // 互金企业 options
        clientCodeOptions : [
          /* {
            merchantName : '青岛鲁金所股权投资基金有限公司',
            code : '1',
          } */
        ],
        // 产品名称 options
        productCodeOptions : [
          /* {
            prodName : '闪来钱',
            prodCode : '30',
          } */
        ],
        // 模板号 options
        templateCodeOptions : [
          /* '3001', */
        ],
        // 案件状态 options
        statusOptions : [],

				// 表格数据
        tableData : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
        // 表格选中数据
        multipleSelection : [],
				
			}
    },
    mounted() {
      // this.initTableList();
      this.getClientCodeOptions();
      this.getStatusOptions();
    },
		methods : {
			// 点击搜索
			handleSearch() {
				this.currentPage = 1;
        this.initTableList();
      },
      // 重新获取裁决书
      handleGetAward() {
        this.$confirm("是否重新获取选中行裁决书内容？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonClass: "cancel",
          confirmButtonClass: "confirm",
          center: true
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: '处理中，请稍后',
          });
          this.$http({
            method : 'post',
            url : '/award/overload.htm',
            data : {
              ...this.ruleForm,

              productCode : this.ruleForm.productCode.split('-----')[1],

              caseIds : this.multipleSelection.map(v => v.caseId),
            },
          }).then(() => {
            loading.close();
            this.$message.success('操作成功');
            this.reset();
            this.productCodeOptions = [];
            this.templateCodeOptions = [];
          }).catch(() => {
            loading.close();
          });
        }).catch(() => {
        });
      },
      // 历史记录
      handleHistori() {
        this.$refs.historiDialog.show();
      },
      // 互金企业 change
      handleClientCodeChange(val) {
        // 清空数据
        this.ruleForm.productCode = '';
        this.ruleForm.templateCode = '';
        this.productCodeOptions = [];
        this.templateCodeOptions = [];
        val && this.getProductCodeOptions();
      },
      // 产品名称 change
      handleProductCodeChange(val) {
        this.ruleForm.templateCode = '';
        this.templateCodeOptions = [];
        val && this.getTemplateCodeOptions();
      },
      
      // 获取 互金企业
      getClientCodeOptions() {
        this.$http({
          method : 'post',
          url : '/merchant/queryMerchants.htm',
        }).then((res) => {
          this.clientCodeOptions = res.result.list;
        });
      },
      // 获取 产品名称
      getProductCodeOptions() {
        this.$http({
          method : 'post',
          url : '/case/queryProducts.htm',
          data : {
            merchantCode : this.ruleForm.clientCode,
          },
        }).then((res) => {
          this.productCodeOptions = res.result;
        });
      },
      // 获取 模板编码
      getTemplateCodeOptions() {
        this.$http({
          method : 'post',
          url : '/case/queryTemplatesByProductCode.htm',
          data : {
            merchantCode : this.ruleForm.clientCode,
            prodCode : this.ruleForm.productCode.split('-----')[1],
          },
        }).then((res) => {
          this.templateCodeOptions = res.result;
        });
      },
      // 获取案件状态 options
      getStatusOptions() {
        this.$http({
          method : 'post',
          url : '/caseStatus/queryCaseStatusThreeLevel.htm',
          data : {
            status : '3',
          },
        }).then((res) => {
          this.statusOptions = res.result.list;
        });
      },
      // 重置 搜索条件 以及 表格相关数据
      reset() {
        for(let key in this.ruleForm) {
          this.ruleForm[key] = '';
        }
        this.currentPage = 1;
        this.total = 0;
        this.multipleSelection = [];
        this.$nextTick(() => {
          this.tableData = [];
        });
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/award/queryAwardListByBaseQuery.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,

            ...this.ruleForm,

            productCode : this.ruleForm.productCode.split('-----')[1],
          },
        }).then((res) => {
          this.total = res.result.count;
          this.tableData = res.result.list;
        });
      },
      // 页数 change
      handleSizeChange(val) {
        this.pageSize = val;
        if(!this.isSearch) {
          return;
        }
        this.currentPage = 1;
        this.initTableList();
      },
      // 分页 change
      handleCurrentChange(val) {
        this.currentPage = val; 
        this.initTableList();
      },
      // 表格 多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }

      // 表格相关 end
		},
	}
</script>

<style lang="scss" scoped>

.re-run-award-case-list{
	.item-title{
    
  }
  .m-total{
    font-size: 14px;
    margin-right: 20px;
  }
}

</style>

<style lang="scss">

.re-run-award-case-list{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>