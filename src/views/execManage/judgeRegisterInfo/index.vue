<template>
	<div class="judge-register-info-box">
		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label=" " prop="keyWords">
					<span>查询：</span>
          <el-input v-model.trim="ruleForm.keyWords" placeholder="法院姓名/手机号/座机号/进行查询" style="width:200px;"></el-input>
        </el-form-item>

        <el-form-item label=" " prop="accountAge">
          <el-select @change="handleTimeChange" clearable v-model="ruleForm.accountAge" placeholder="请选择" style="width:120px;">
            <el-option label="操作日期" value="M1"></el-option>
            <el-option label="提交日期" value="M2"></el-option>
          </el-select>
        </el-form-item>

				<timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
          startPlaceholder="开始时间"
          endPlaceholder="结束时间"
        >
        </timeFrame>

				<el-button @click="handleSearch" type="warning">查询</el-button>

				<br />
				
				<el-form-item label=" " prop="accountAge">
					<span>状态：</span>
					<el-select clearable v-model="ruleForm.accountAge2" placeholder="请选择" style="width:120px;">
						<el-option label="待审核" value="M1"></el-option>
						<el-option label="已通过" value="M2"></el-option>
						<el-option label="已拒绝" value="M3"></el-option>
					</el-select>
				</el-form-item>

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
				<el-table-column prop="respondents" label="法院"></el-table-column>
				<el-table-column prop="respondents" label="姓名"></el-table-column>
				<el-table-column prop="respondents" label="手机号"></el-table-column>
				<el-table-column prop="respondents" label="座机号"></el-table-column>
				<el-table-column prop="respondents" label="提交时间"></el-table-column>
				<el-table-column prop="respondents" label="操作时间"></el-table-column>
				<el-table-column prop="respondents" label="操作人"></el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<el-button type="text" @click="handleExamine(scope.row)">待审核</el-button>
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

      <!-- 审核 dialog -->
      <examineDialog ref="examineDialog"></examineDialog>

    </div>
	</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import examineDialog from './modules/examineDialog.vue'
	export default {
		components : {
      timeFrame,
      examineDialog,
		},
		data() {
			return {
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

			// 选择操作日期 ， 提交日期 change
			handleTimeChange() {
				this.ruleForm.startDate = '';
				this.ruleForm.endDate = '';
      },
      // 点击审核
      handleExamine(row) {
        this.$refs.examineDialog.show(row);
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

.judge-register-info-box{
	
}

</style>