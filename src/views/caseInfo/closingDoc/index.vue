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
          <el-form-item label=" " prop="accountAge">
            <el-select clearable v-model="ruleForm.accountAge" placeholder="请选择">
              <el-option label="1~30天" value="M1"></el-option>
              <el-option label="31~60天" value="M2"></el-option>
            </el-select>
          </el-form-item>

          <span class="form-item">文书类型：</span>
          <el-form-item label=" " prop="accountAge">
            <el-select clearable v-model="ruleForm.accountAge" placeholder="请选择">
              <el-option label="裁决书" value="M1"></el-option>
              <el-option label="撤回决定书" value="M2"></el-option>
              <el-option label="调解书" value="M3"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="mt-10">
          <span class="form-item">结案日期：</span>

          <timeFrame
            :startDate.sync="ruleForm.startDate"
            :endDate.sync="ruleForm.endDate"
            startPlaceholder="预审开始"
            endPlaceholder="预审结束"
          >
          </timeFrame>

          <span class="form-item">文书申请日期：</span>

          <timeFrame
            :startDate.sync="ruleForm.startDate"
            :endDate.sync="ruleForm.endDate"
            startPlaceholder="预审开始"
            endPlaceholder="预审结束"
          >
          </timeFrame>
        </div>

        <div class="mt-10">
          

          <span class="form-item" style="margin-top:0;">申请状态：</span>
          <el-form-item label=" " prop="accountAge">
            <el-select clearable v-model="ruleForm.accountAge" placeholder="请选择">
              <el-option label="已申请" value="M1"></el-option>
              <el-option label="未申请" value="M2"></el-option>
            </el-select>
          </el-form-item>

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
				<el-table-column prop="respondents" label="仲裁案号"></el-table-column>
        <el-table-column prop="respondents" label="申请人"></el-table-column>
        <el-table-column prop="respondents" label="被申请人"></el-table-column>
        <el-table-column prop="respondents" label="被申请人电话"></el-table-column>
        <el-table-column prop="respondents" label="结案时间"></el-table-column>
        <el-table-column prop="respondents" label="文书类型"></el-table-column>
        <el-table-column prop="respondents" label="文书申请时间"></el-table-column>
        <el-table-column prop="respondents" label="申请份数"></el-table-column>
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
import { setTimeout } from 'timers';
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
					// 开始时间
					startDate : '',
					// 结束时间
					endDate : '',
				},
				rules : {},

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
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/preCaseLib/queryCaseListByCondition.htm',
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