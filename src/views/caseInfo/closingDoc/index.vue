<template>
	<div class="caseInfo-closing-coc">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">结案文书管理</a>
    </div>
    <div class="item-title of-hidden">
      <span class="item-title-sign">结案文书申请记录</span>
    </div>
		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <div>
          <span class="form-item">结案文书查询：</span>
          <el-form-item label=" " prop="keyWords">
            <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入仲裁案号、申请人、被申请人姓名" style="width:282px;"></el-input>
          </el-form-item>

          <span class="form-item">客户名称：</span>
          <el-form-item label=" " prop="clientCode">
            <el-select clearable v-model="ruleForm.clientCode" placeholder="请选择">
              <template v-for="(item,index) in merchantOptions">
                <el-option :key="item.code + index" :label="item.merchantName" :value="item.code"></el-option>
              </template>
            </el-select>
          </el-form-item>

          <span class="form-item">文书类型：</span>
          <el-form-item label=" " prop="docType">
            <el-select clearable v-model="ruleForm.docType" placeholder="请选择">
              <el-option label="裁决书" :value="1"></el-option>
              <el-option label="撤回决定书" :value="2"></el-option>
              <el-option label="调解书" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="mt-10">
          <span>结案日期：</span>

          <timeFrame
            :startDate.sync="ruleForm.closeStartDate"
            :endDate.sync="ruleForm.closeEndDate"
            startPlaceholder="预审开始"
            endPlaceholder="预审结束"
          >
          </timeFrame>

          <span>文书申请日期：</span>

          <timeFrame
            :startDate.sync="ruleForm.applyStartDate"
            :endDate.sync="ruleForm.applyEndDate"
            startPlaceholder="预审开始"
            endPlaceholder="预审结束"
          >
          </timeFrame>

          <el-button @click="handleSearch" type="warning">查询</el-button>
          <el-button @click="handleExport" type="primary" :disabled="exportDisabled">导出</el-button>
        </div>

      </el-form>
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
				<el-table-column prop="caseNoZw" label="仲裁案号"></el-table-column>
        <el-table-column prop="applicants" label="申请人"></el-table-column>
        <el-table-column prop="respondents" label="被申请人"></el-table-column>
        <el-table-column prop="resPhone" label="被申请人电话"></el-table-column>
        <el-table-column prop="closeTime" label="结案时间"></el-table-column>
        <el-table-column prop="docType" label="文书类型">
          <template slot-scope="scope">
            {{
              scope.row.docType === 1 ? '裁决书' :
              scope.row.docType === 2 ? '撤回决定书' :
              scope.row.docType === 3 ? '调解书' : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="applyTime" label="文书申请时间"></el-table-column>
        <el-table-column prop="applyCount" label="申请份数"></el-table-column>
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
	</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import exportFile from '@/assets/js/exportFile.js'
	export default {
		components : {
			timeFrame,
		},
		data() {
			return {
        exportDisabled : false,
				ruleForm : {
					// 关键字
					keyWords : '',
          // 客户 id
          clientCode : '',
          // 文书类型  1裁决书2撤回决定书3调解书
          docType : '',
          // 结案日期 开始
          closeStartDate : '',
          // 结案日期 结束
          closeEndDate : '',
          // 文书申请日期 开始
          applyStartDate : '',
          // 文书申请如期 结束
          applyEndDate : '',
				},
        rules : {},
        
        // 客户options
        merchantOptions : [
          /* {merchantName : '李四' , code : '李四'} */
        ],

				// 表格数据
        tableData : [],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
				pageSize : 10,
				
			}
    },
    mounted() {
      this.initTableList();

      // 获取所有 商户
      this.$http({
        method : 'post',
        url : '/merchant/queryMerchants.htm',
      }).then((res) => {
        this.merchantOptions = res.result.list;
      });
    },
		methods : {
			// 点击搜索
			handleSearch() {
				this.currentPage = 1;
        this.initTableList();
      },
      // 点击导出
      handleExport() {
        this.exportDisabled = true;
        setTimeout(() => {
          this.exportDisabled = false;
        },2000);

        exportFile({
          url : '/caseSettle/exportExcel.htm',
          data : {
            ...this.ruleForm,
          },
        });
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/caseSettle/queryCaseSettleApplyList.htm',
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

      // 表格相关 end
		},
	}
</script>

<style lang="scss" scoped>

.caseInfo-closing-coc{
	
}

</style>

<style lang="scss">

.caseInfo-closing-coc{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
    .form-item{
      display: inline-block;
      vertical-align: middle;
      margin-top: 15px;
    }
  }
}

</style>